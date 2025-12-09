import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { 
  Brain, 
  Hexagon, 
  ArrowLeft,
  LogOut,
  Settings,
  Bell,
  Loader2,
  Mic,
  MicOff,
  Play,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  Clock
} from "lucide-react";

const InterviewPrep = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const [isRecording, setIsRecording] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const interviewTopics = [
    {
      title: "Behavioral Questions",
      description: "Practice STAR method responses",
      duration: "15 min",
      questions: 12,
      difficulty: "Medium"
    },
    {
      title: "Technical Interview",
      description: "Coding and problem-solving",
      duration: "30 min",
      questions: 8,
      difficulty: "Hard"
    },
    {
      title: "System Design",
      description: "Architecture discussions",
      duration: "45 min",
      questions: 5,
      difficulty: "Hard"
    },
    {
      title: "Leadership Questions",
      description: "Management scenarios",
      duration: "20 min",
      questions: 10,
      difficulty: "Medium"
    }
  ];

  const recentSessions = [
    {
      topic: "Behavioral Questions",
      date: "2 days ago",
      score: 85,
      duration: "15 min"
    },
    {
      topic: "Technical Interview",
      date: "1 week ago",
      score: 78,
      duration: "30 min"
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
              Interview <span className="gradient-text">Practice</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Practice with AI-powered interview simulations
            </p>
          </div>

          {/* Quick Start */}
          <Card className="glass-card border-border/50 mb-8 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Ready to practice?</h3>
                  <p className="text-muted-foreground mb-4">
                    Start a mock interview session with AI feedback
                  </p>
                  <Button variant="hero" size="lg" className="gap-2">
                    <Play className="w-5 h-5" />
                    Start Quick Practice
                  </Button>
                </div>
                <div className="hidden md:block">
                  <MessageSquare className="w-32 h-32 text-primary/20" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interview Topics */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Practice Topics</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {interviewTopics.map((topic, index) => (
                <Card key={index} className="glass-card border-border/50 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{topic.title}</CardTitle>
                        <CardDescription>{topic.description}</CardDescription>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          topic.difficulty === "Hard" 
                            ? "border-red-500/50 text-red-500" 
                            : "border-yellow-500/50 text-yellow-500"
                        }
                      >
                        {topic.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {topic.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {topic.questions} questions
                      </span>
                    </div>
                    <Button variant="outline" className="w-full gap-2">
                      <Sparkles className="w-4 h-4" />
                      Start Practice
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Sessions */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Sessions</h2>
            {recentSessions.length === 0 ? (
              <Card className="glass-card border-border/50">
                <CardContent className="py-12 text-center">
                  <Mic className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">No practice sessions yet</p>
                  <p className="text-muted-foreground">
                    Start your first interview practice to see your progress
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {recentSessions.map((session, index) => (
                  <Card key={index} className="glass-card border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{session.topic}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{session.date}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {session.duration}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{session.score}%</p>
                            <p className="text-xs text-muted-foreground">Score</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
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

export default InterviewPrep;
