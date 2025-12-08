import { Brain, FileText, Target, TrendingUp, Sparkles, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Career Guidance",
    description: "Get personalized career advice and insights powered by advanced AI technology tailored to your goals.",
  },
  {
    icon: Target,
    title: "Interview Preparation",
    description: "Practice with role-specific questions and get instant feedback to improve your performance.",
  },
  {
    icon: TrendingUp,
    title: "Industry Insights",
    description: "Stay ahead with real-time industry trends, salary data, and comprehensive market analysis.",
  },
  {
    icon: FileText,
    title: "Smart Resume Creation",
    description: "Generate ATS-optimized resumes with AI assistance that highlight your strengths effectively.",
  },
  {
    icon: Sparkles,
    title: "Cover Letter Generator",
    description: "Create compelling, personalized cover letters that capture recruiters' attention instantly.",
  },
  {
    icon: Shield,
    title: "Career Path Planning",
    description: "Map out your career trajectory with AI-driven recommendations and milestone tracking.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(173_80%_50%_/_0.03)_0%,_transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Powerful Features for{" "}
            <span className="gradient-text">Career Growth</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to accelerate your professional journey with AI-powered tools.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl glass-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
