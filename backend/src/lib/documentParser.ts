/**
 * Simple document parser - returns placeholder text
 * PDF parsing temporarily disabled to fix server crash
 */

export async function extractDocumentText(
  buffer: Buffer,
  mimeType: string
): Promise<{ text: string; wordCount: number; error?: string }> {
  // Placeholder - actual PDF parsing will be added later
  const placeholderText = "Resume content will be extracted here. For now, upload is working.";
  
  return {
    text: placeholderText,
    wordCount: 100,
  };
}

export function validateResumeContent(text: string): {
  isValid: boolean;
  warnings: string[];
} {
  // Always valid for now
  return { isValid: true, warnings: [] };
}
