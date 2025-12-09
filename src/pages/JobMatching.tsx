import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { 
  Brain, 
  Hexagon, 
  ArrowLeft,
  LogOut,
  Settings,
  Bell,
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Bookmark,
  ExternalLink,
  Filter,
  Sparkles,
  TrendingUp
} from "lucide-react";

const JobMatching = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  // Sample job data - in production, this would come from your API
  const recommendedJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$150k - $200k",
      matchScore: 95,
      postedDays: 2,
      description: "Join our team building next-generation cloud solutions...",
      skills: ["React", "Node.js", "AWS", "TypeScript"]
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $160k",
      matchScore: 88,
      postedDays: 5,
      description: "We're looking for passionate developers to help build our platform...",
      skills: ["JavaScript", "Python", "PostgreSQL", "Docker"]
    },
    {
      id: 3,
      title: "Frontend Engineer",
      company: "DesignHub",
      location: "New York, NY",
      type: "Full-time",
      salary: "$130k - $170k",
      matchScore: 82,
      postedDays: 7,
      description: "Create beautiful user experiences for millions of users...",
      skills: ["React", "TypeScript", "CSS", "Figma"]
    }
  ];

  const savedJobs = [
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudFirst",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$140k - $180k",
      savedDays: 3
    }
  ];

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
              AI Job <span className="gradient-text">Matching</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Find jobs that match your skills and career goals
            </p>
          </div>

          {/* Search Bar */}
          <Card className="glass-card border-border/50 mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for jobs, companies, or keywords..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
                <Button variant="hero" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Match
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Job Recommendations */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Recommended for You
              </h2>
              <Badge className="bg-primary/20 text-primary">
                {recommendedJobs.length} matches
              </Badge>
            </div>

            <div className="space-y-4">
              {recommendedJobs.map((job) => (
                <Card key={job.id} className="glass-card border-border/50 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-xl mb-1">{job.title}</h3>
                            <p className="text-muted-foreground">{job.company}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Posted {job.postedDays} days ago
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="bg-primary/5">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="ml-4 text-right">
                        <div className="mb-4">
                          <div className="text-3xl font-bold text-primary mb-1">
                            {job.matchScore}%
                          </div>
                          <p className="text-xs text-muted-foreground">Match Score</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="hero" className="flex-1 gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Apply Now
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Bookmark className="w-4 h-4" />
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Saved Jobs */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-primary" />
              Saved Jobs
            </h2>

            {savedJobs.length === 0 ? (
              <Card className="glass-card border-border/50">
                <CardContent className="py-12 text-center">
                  <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">No saved jobs yet</p>
                  <p className="text-muted-foreground">
                    Save jobs you're interested in to review later
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {savedJobs.map((job) => (
                  <Card key={job.id} className="glass-card border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-muted-foreground">
                            Saved {job.savedDays} days ago
                          </div>
                          <Button variant="outline" size="sm" className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            View Job
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

export default JobMatching;
