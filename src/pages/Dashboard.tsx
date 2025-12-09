import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { 
  Brain, 
  Hexagon, 
  FileText, 
  Target, 
  TrendingUp, 
  Calendar,
  Sparkles,
  Award,
  MessageSquare,
  BarChart3,
  ArrowRight,
  LogOut,
  Settings,
  Bell,
  Loader2
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { profile, stats, interviews, loading, error, refetch } = useDashboardData();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6 text-destructive" />
          </div>
          <h2 className="font-display text-2xl font-bold">Unable to Load Dashboard</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={refetch} variant="hero">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Calculate profile strength
  const profileStrength = profile?.profileStrength || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Hexagon className="w-8 h-8 text-primary transition-transform group-hover:rotate-90 duration-500" />
              <Brain className="w-4 h-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              JobGenius<span className="gradient-text">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/dashboard/profile")} 
              className="gap-2"
            >
              <Settings className="w-4 h-4" />
              Profile
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
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
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-4xl font-bold mb-2">
                Welcome back, <span className="gradient-text">{user?.firstName || user?.username || "there"}!</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Let's continue your career journey
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Award className="w-5 h-5" />
              <span className="font-semibold">Pro Member</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="glass-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="w-8 h-8 text-primary" />
                  <Badge variant="secondary">
                    {stats.applicationsCount > 0 ? `+${stats.applicationsCount}` : 'Start'}
                  </Badge>
                </div>
                <h3 className="font-display text-2xl font-bold">{stats.applicationsCount}</h3>
                <p className="text-sm text-muted-foreground">Applications Sent</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-8 h-8 text-primary" />
                  <Badge variant="secondary">
                    {stats.interviewsCount > 0 ? 'Active' : 'None'}
                  </Badge>
                </div>
                <h3 className="font-display text-2xl font-bold">{stats.interviewsCount}</h3>
                <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  <Badge variant="secondary">
                    {stats.atsScore > 80 ? 'Excellent' : stats.atsScore > 60 ? 'Good' : 'Improve'}
                  </Badge>
                </div>
                <h3 className="font-display text-2xl font-bold">{stats.atsScore}%</h3>
                <p className="text-sm text-muted-foreground">ATS Score</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <MessageSquare className="w-8 h-8 text-primary" />
                  <Badge variant="secondary">
                    {stats.aiSessionsToday > 0 ? 'Active' : 'Start'}
                  </Badge>
                </div>
                <h3 className="font-display text-2xl font-bold">{stats.aiSessionsToday}</h3>
                <p className="text-sm text-muted-foreground">AI Sessions Today</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Career Progress */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-display text-2xl">Career Progress</CardTitle>
                    <CardDescription>Your journey to landing your dream job</CardDescription>
                  </div>
                  <Badge className="bg-primary/20 text-primary">{profileStrength}% Complete</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Profile Completion</span>
                    <span className="text-sm text-primary font-semibold">{profileStrength}%</span>
                  </div>
                  <Progress value={profileStrength} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Resume Optimization</span>
                    <span className="text-sm text-primary font-semibold">{stats.atsScore}%</span>
                  </div>
                  <Progress value={stats.atsScore} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Applications Submitted</span>
                    <span className="text-sm text-primary font-semibold">
                      {Math.min(100, stats.applicationsCount * 4)}%
                    </span>
                  </div>
                  <Progress value={Math.min(100, stats.applicationsCount * 4)} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Interview Preparation</span>
                    <span className="text-sm text-primary font-semibold">
                      {Math.min(100, stats.interviewsCount * 12)}%
                    </span>
                  </div>
                  <Progress value={Math.min(100, stats.interviewsCount * 12)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Quick Actions</CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto py-6 flex-col gap-3 hover:bg-primary/5 hover:border-primary/30 transition-all"
                  onClick={() => navigate("/dashboard/resume")}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Optimize Resume</div>
                    <div className="text-xs text-muted-foreground">AI-powered improvements</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="h-auto py-6 flex-col gap-3 hover:bg-primary/5 hover:border-primary/30 transition-all"
                  onClick={() => navigate("/dashboard/interview")}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Practice Interview</div>
                    <div className="text-xs text-muted-foreground">Mock interview session</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="h-auto py-6 flex-col gap-3 hover:bg-primary/5 hover:border-primary/30 transition-all"
                  onClick={() => navigate("/dashboard/jobs")}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Job Matching</div>
                    <div className="text-xs text-muted-foreground">Find perfect opportunities</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="h-auto py-6 flex-col gap-3 hover:bg-primary/5 hover:border-primary/30 transition-all"
                  onClick={() => navigate("/dashboard/insights")}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Career Insights</div>
                    <div className="text-xs text-muted-foreground">View detailed analytics</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Assistant */}
            <Card className="glass-card border-border/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary/10 to-transparent" />
              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-display">AI Career Coach</CardTitle>
                    <CardDescription>Always here to help</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Ready to optimize your resume, practice interviews, or strategize your job search?
                </p>
                <Button variant="hero" className="w-full gap-2 group">
                  Start AI Session
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {interviews.length > 0 ? (
                  interviews.slice(0, 2).map((interview: any, index: number) => {
                    const date = new Date(interview.scheduledAt);
                    return (
                      <div key={interview.id || index} className="flex gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-xs text-muted-foreground">
                            {date.toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                          <span className="text-lg font-bold text-primary">
                            {date.getDate()}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{interview.title || 'Interview'}</h4>
                          <p className="text-xs text-muted-foreground">{interview.company || interview.type}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6">
                    <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No upcoming interviews</p>
                    <p className="text-xs text-muted-foreground mt-1">Schedule your first interview</p>
                  </div>
                )}

                <Button variant="outline" className="w-full" size="sm">
                  View All Events
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile ? (
                  <>
                    {profile.updatedAt && (
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                        <div>
                          <p className="text-sm font-medium">Profile created</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(profile.updatedAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                    {stats.applicationsCount === 0 && stats.interviewsCount === 0 && (
                      <div className="text-center py-6">
                        <TrendingUp className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">No recent activity</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Start by uploading your resume or updating your profile
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground">Loading activity...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
