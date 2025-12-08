/**
 * Document Parser - Extracts text from PDF and DOCX files
 * Uses pdf.js-extract for PDFs and mammoth for DOCX
 */

import { PDFExtract, PDFExtractOptions } from 'pdf.js-extract';
import mammoth from 'mammoth';

const pdfExtract = new PDFExtract();

interface ParseResult {
  text: string;
  wordCount: number;
  pageCount?: number;
  error?: string;
}

/**
 * Extract text from PDF buffer using pdf.js-extract
 */
async function extractTextFromPDF(buffer: Buffer): Promise<ParseResult> {
  try {
    const options: PDFExtractOptions = {};
    
    // Convert buffer to Uint8Array for pdf.js-extract
    const uint8Array = new Uint8Array(buffer);
    
    const data = await pdfExtract.extractBuffer(uint8Array as any, options);
    
    // Combine all text from all pages
    let fullText = '';
    for (const page of data.pages) {
      const pageText = page.content
        .map(item => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    // Clean up text
    fullText = fullText
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim();
    
    const wordCount = fullText.split(/\s+/).filter(w => w.length > 0).length;
    
    return {
      text: fullText,
      wordCount,
      pageCount: data.pages.length,
    };
  } catch (error: any) {
    console.error('PDF extraction error:', error);
    return {
      text: '',
      wordCount: 0,
      error: `Failed to parse PDF: ${error.message}`,
    };
  }
}

/**
 * Extract text from DOCX buffer using mammoth
 */
async function extractTextFromDOCX(buffer: Buffer): Promise<ParseResult> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    
    const text = result.value
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim();
    
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
    
    return {
      text,
      wordCount,
    };
  } catch (error: any) {
    console.error('DOCX extraction error:', error);
    return {
      text: '',
      wordCount: 0,
      error: `Failed to parse DOCX: ${error.message}`,
    };
  }
}

/**
 * Main function to extract text from document based on MIME type
 */
export async function extractDocumentText(
  buffer: Buffer,
  mimeType: string
): Promise<ParseResult> {
  console.log(`📄 Parsing document with MIME type: ${mimeType}`);
  
  try {
    let result: ParseResult;
    
    if (mimeType === 'application/pdf') {
      result = await extractTextFromPDF(buffer);
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'application/msword'
    ) {
      result = await extractTextFromDOCX(buffer);
    } else {
      return {
        text: '',
        wordCount: 0,
        error: `Unsupported file type: ${mimeType}. Only PDF and Word documents are supported.`,
      };
    }
    
    // Validate extracted content
    if (result.error) {
      return result;
    }
    
    if (result.wordCount < 20) {
      return {
        ...result,
        error: 'Document appears to be empty or contains very little text. Please upload a complete resume.',
      };
    }
    
    console.log(`✅ Extracted ${result.wordCount} words from document`);
    return result;
    
  } catch (error: any) {
    console.error('Document parsing error:', error);
    return {
      text: '',
      wordCount: 0,
      error: `Failed to process document: ${error.message}`,
    };
  }
}

/**
 * Validate resume content has expected sections
 * Optimized for student and entry-level resumes
 */
export function validateResumeContent(text: string): {
  isValid: boolean;
  warnings: string[];
  sections: {
    hasContact: boolean;
    hasExperience: boolean;
    hasEducation: boolean;
    hasSkills: boolean;
    hasProjects: boolean;
  };
} {
  const warnings: string[] = [];
  const lowerText = text.toLowerCase();
  
  // Check for common resume sections (more lenient for students)
  const hasContact = /email|phone|@|linkedin|github|contact/i.test(text);
  const hasExperience = /experience|work|employment|position|role|job|company|intern/i.test(text);
  const hasEducation = /education|university|college|degree|bachelor|master|school|gpa|major/i.test(text);
  const hasSkills = /skills|technologies|tools|expertise|proficient|languages|programming|technical/i.test(text);
  const hasProjects = /project|portfolio|github|built|developed|created|implemented/i.test(text);
  
  // For students/entry-level, projects can substitute for work experience
  const hasRelevantExperience = hasExperience || hasProjects;
  
  // Generate helpful warnings (not errors)
  if (!hasContact) {
    warnings.push('Consider adding contact information (email, phone, LinkedIn)');
  }
  if (!hasExperience && !hasProjects) {
    warnings.push('Add work experience, internships, or personal/academic projects to showcase your abilities');
  }
  if (!hasEducation) {
    warnings.push('Include your education details (degree, major, GPA if above 3.0)');
  }
  if (!hasSkills) {
    warnings.push('Add a skills section to highlight your technical and soft skills');
  }
  
  // Check for common student resume elements
  if (!hasProjects && lowerText.includes('student') && !hasExperience) {
    warnings.push('💡 TIP: Academic projects, hackathons, and personal projects are valuable for your resume');
  }
  
  // Check for portfolio links (important for students)
  const hasPortfolio = /github\.com|linkedin\.com|portfolio|behance|dribbble/i.test(text);
  if (!hasPortfolio) {
    warnings.push('💡 TIP: Add links to your GitHub, LinkedIn, or portfolio to stand out');
  }
  
  // Resume is valid if it has at least education + (experience OR projects OR skills)
  // More lenient than before - students may not have all sections
  const hasMinimumSections = hasEducation && (hasRelevantExperience || hasSkills);
  const isValid = hasMinimumSections;
  
  if (!isValid) {
    warnings.push('Your resume should include: Education + (Experience/Projects OR Skills). Don\'t worry - as a student or entry-level candidate, academic projects and coursework are valuable!');
  }
  
  return {
    isValid,
    warnings,
    sections: { hasContact, hasExperience, hasEducation, hasSkills, hasProjects },
  };
}
