import { Link, useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useDashboardData } from "@/hooks/useDashboardData";
import { 
  Brain, 
  Hexagon, 
  ArrowLeft,
  LogOut,
  Settings,
  Bell,
  TrendingUp,
  Target,
  Award,
  BarChart3,
  PieChart,
  Calendar,
  Zap,
  Sparkles,
  Loader2
} from "lucide-react";

const CareerInsights = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { stats, profile, loading } = useDashboardData();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  // Calculate recommended jobs based on profile strength
  const recommendedJobs = Math.floor((profile?.profileStrength || 0) / 10) * 3;

  const insights = [
    {
      icon: TrendingUp,
      title: "Application Success Rate",
      value: stats.applicationsCount > 0 
        ? `${Math.round((stats.interviewsCount / stats.applicationsCount) * 100)}%`
        : "0%",
      description: "Applications leading to interviews",
      trend: "+12% from last month",
      color: "text-green-500"
    },
    {
      icon: Target,
      title: "Profile Completion",
      value: `${profile?.profileStrength || 0}%`,
      description: "Your profile is almost ready",
      trend: "Add 2 more skills",
      color: "text-blue-500"
    },
    {
      icon: Award,
      title: "ATS Optimization",
      value: `${stats.atsScore}%`,
      description: "Resume compatibility score",
      trend: "Above average",
      color: "text-purple-500"
    },
    {
      icon: Zap,
      title: "AI Interactions",
      value: stats.aiSessionsToday.toString(),
      description: "AI sessions today",
      trend: `${stats.aiSessionsToday} sessions this week`,
      color: "text-orange-500"
    }
  ];

  const skillGaps = [
    { skill: "Cloud Architecture", current: 60, target: 90 },
    { skill: "System Design", current: 75, target: 95 },
    { skill: "Leadership", current: 50, target: 80 },
  ];

  const monthlyActivity = [
    { month: "Jan", applications: 12, interviews: 3 },
    { month: "Feb", applications: 18, interviews: 5 },
    { month: "Mar", applications: 15, interviews: 4 },
    { month: "Apr", applications: 22, interviews: 7 },
  ];

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
              Career <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              AI-powered analytics to accelerate your career growth
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <Card key={index} className="glass-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5`}>
                        <Icon className={`w-6 h-6 ${insight.color}`} />
                      </div>
                    </div>
                    <div className="mb-1">
                      <p className="text-3xl font-bold">{insight.value}</p>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {insight.title}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {insight.description}
                    </p>
                    <Badge variant="outline" className="text-xs bg-primary/5">
                      {insight.trend}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Skill Gap Analysis */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Skill Gap Analysis
                </CardTitle>
                <CardDescription>
                  Areas to focus on for your target role
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skillGaps.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.skill}</span>
                      <span className="text-muted-foreground">
                        {item.current}% → {item.target}%
                      </span>
                    </div>
                    <div className="relative">
                      <Progress value={item.current} className="h-2" />
                      <div 
                        className="absolute top-0 h-2 w-1 bg-primary rounded"
                        style={{ left: `${item.target}%` }}
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full gap-2">
                  <Sparkles className="w-4 h-4" />
                  Get AI Recommendations
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Application Activity
                </CardTitle>
                <CardDescription>
                  Your job search trends over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyActivity.map((month, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium text-muted-foreground">
                        {month.month}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-primary h-full rounded-full transition-all"
                              style={{ width: `${(month.applications / 25) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-16">
                            {month.applications} apps
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-green-500 h-full rounded-full transition-all"
                              style={{ width: `${(month.interviews / 10) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-16">
                            {month.interviews} int.
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Recommendations */}
          <Card className="glass-card border-border/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI Career Recommendations
              </CardTitle>
              <CardDescription>
                Personalized insights based on your profile and activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border/50">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Optimize Your Resume</p>
                    <p className="text-sm text-muted-foreground">
                      Your ATS score is {stats.atsScore}%. Upload an updated resume to improve compatibility with applicant tracking systems.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-2" onClick={() => navigate("/dashboard/resume")}>
                      Upload Resume →
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border/50">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Practice Interview Skills</p>
                    <p className="text-sm text-muted-foreground">
                      Prepare for your upcoming interviews with AI-powered mock sessions. Focus on behavioral questions.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-2" onClick={() => navigate("/dashboard/interview")}>
                      Start Practice →
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border/50">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Explore Matched Opportunities</p>
                    <p className="text-sm text-muted-foreground">
                      We found {recommendedJobs} jobs that match your profile. Check them out to increase your chances.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-2" onClick={() => navigate("/dashboard/jobs")}>
                      View Jobs →
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CareerInsights;
