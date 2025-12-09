import { useState, useCallback, useEffect, Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useUser, useClerk, useAuth } from "@clerk/clerk-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { resumeAPI } from "@/lib/api";
import { 
  Brain, 
  Hexagon, 
  Upload,
  FileText,
  Sparkles,
  ArrowLeft,
  LogOut,
  Settings,
  Bell,
  Download,
  Trash2,
  Loader2,
  CheckCircle2,
  Star,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ResumeErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Resume page error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-muted-foreground mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ResumeContent = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useAuth();
  const { resumes, loading, refetch } = useDashboardData();
  const { toast } = useToast();
  
  // Cache auth token on mount
  useEffect(() => {
    const cacheToken = async () => {
      try {
        console.log('🔐 Fetching Clerk auth token...');
        const token = await getToken();
        if (token) {
          (window as any).__CLERK_TOKEN__ = token;
          console.log('✅ Auth token cached successfully');
        } else {
          console.warn('⚠️ No token returned from getToken()');
        }
      } catch (error) {
        console.error('❌ Failed to get auth token:', error);
      }
    };
    cacheToken();
  }, [getToken]);
  
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf" || file.type.includes("word")) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Get fresh token right before upload
      const token = await getToken();
      if (!token) {
        throw new Error('Not authenticated. Please sign in again.');
      }
      // Cache the fresh token
      (window as any).__CLERK_TOKEN__ = token;
      
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 300);

      await resumeAPI.uploadResume(selectedFile);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      toast({
        title: "✅ Resume uploaded!",
        description: "Your resume has been analyzed by AI successfully.",
      });
      
      setSelectedFile(null);
      refetch();
    } catch (error: any) {
      console.error('Resume upload error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      let errorTitle = "Upload failed";
      let errorMessage = "Failed to upload resume";
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        // Handle structured error response
        if (errorData.error) {
          errorMessage = errorData.error;
        }
        
        if (errorData.details) {
          errorMessage += `\n${errorData.details}`;
        }
        
        if (errorData.warnings && errorData.warnings.length > 0) {
          errorMessage += `\n\nWarnings:\n${errorData.warnings.join('\n')}`;
        }
        
        // Specific error handling
        if (error.response.status === 401) {
          errorTitle = "Authentication Error";
          errorMessage = "Please refresh the page and sign in again.";
        } else if (error.response.status === 400) {
          errorTitle = "Invalid File";
        } else if (error.response.status === 500) {
          errorTitle = "Server Error";
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSetPrimary = async (resumeId: string) => {
    try {
      await resumeAPI.setPrimaryResume(resumeId);
      toast({
        title: "Primary resume updated",
        description: "This resume is now your default",
      });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to set primary resume",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (resumeId: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    
    try {
      await resumeAPI.deleteResume(resumeId);
      toast({
        title: "Resume deleted",
        description: "The resume has been removed",
      });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete resume",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Back to Dashboard
            </span>
          </Link>

          <Link to="/" className="flex items-center gap-2">
            <div className="relative">
              <Hexagon className="w-8 h-8 text-primary" />
              <Brain className="w-4 h-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              JobGenius<span className="gradient-text">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold mb-2">
              Resume <span className="gradient-text">Optimizer</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload and manage your resumes with AI-powered analysis
            </p>
          </div>

          {/* Upload Section */}
          <Card className="glass-card border-border/50 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload Resume
              </CardTitle>
              <CardDescription>
                Upload a PDF or Word document to get AI-powered feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border/50 hover:border-border"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  disabled={uploading}
                />
                
                {selectedFile ? (
                  <div className="space-y-4">
                    <FileText className="w-16 h-16 text-primary mx-auto" />
                    <div>
                      <p className="font-semibold text-lg">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    {uploading ? (
                      <div className="space-y-2">
                        <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
                        <p className="text-sm text-muted-foreground">
                          Uploading and analyzing... {uploadProgress}%
                        </p>
                      </div>
                    ) : (
                      <div className="flex gap-3 justify-center">
                        <Button onClick={handleUpload} variant="hero" className="gap-2">
                          <Sparkles className="w-4 h-4" />
                          Analyze with AI
                        </Button>
                        <Button onClick={() => setSelectedFile(null)} variant="outline">
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-16 h-16 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg font-semibold mb-1">
                        Drop your resume here, or{" "}
                        <label
                          htmlFor="resume-upload"
                          className="text-primary hover:underline cursor-pointer"
                        >
                          browse
                        </label>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports PDF and Word documents (max 5MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Resumes List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Resumes</h2>
            
            {resumes.length === 0 ? (
              <Card className="glass-card border-border/50">
                <CardContent className="py-12 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">No resumes yet</p>
                  <p className="text-muted-foreground">
                    Upload your first resume to get started with AI-powered optimization
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {resumes.map((resume) => (
                  <Card key={resume.id} className="glass-card border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <FileText className="w-8 h-8 text-primary" />
                            <div>
                              <h3 className="font-semibold text-lg">{resume.fileName}</h3>
                              <p className="text-sm text-muted-foreground">
                                Uploaded {new Date(resume.uploadedAt).toLocaleDateString()}
                              </p>
                            </div>
                            {resume.isPrimary && (
                              <Badge className="bg-primary/20 text-primary gap-1">
                                <Star className="w-3 h-3" />
                                Primary
                              </Badge>
                            )}
                          </div>

                          {resume.aiAnalysis && (
                            <div className="space-y-3 mt-4">
                              <div className="flex items-center gap-2">
                                <Progress value={resume.atsScore || 0} className="flex-1" />
                                <Badge variant="outline" className="gap-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  {resume.atsScore || 0}% ATS Score
                                </Badge>
                              </div>
                              
                              <div className="bg-muted/30 rounded-lg p-4">
                                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                                  <Sparkles className="w-4 h-4 text-primary" />
                                  AI Analysis
                                </p>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                  {typeof resume.aiAnalysis === 'string' 
                                    ? resume.aiAnalysis.substring(0, 200) 
                                    : JSON.stringify(resume.aiAnalysis, null, 2).substring(0, 200)
                                  }...
                                </p>
                              </div>

                              {resume.suggestions && resume.suggestions.length > 0 && (
                                <div className="space-y-2">
                                  <p className="text-sm font-semibold flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-primary" />
                                    Suggestions
                                  </p>
                                  <ul className="space-y-1">
                                    {resume.suggestions.slice(0, 3).map((suggestion, idx) => (
                                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>{suggestion}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          {!resume.isPrimary && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSetPrimary(resume.id)}
                              className="gap-2"
                            >
                              <Star className="w-4 h-4" />
                              Set Primary
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(resume.fileUrl, "_blank")}
                            className="gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(resume.id)}
                            className="gap-2 text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Resume = () => {
  return (
    <ResumeErrorBoundary>
      <ResumeContent />
    </ResumeErrorBoundary>
  );
};

export default Resume;
