import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="hero-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(173_80%_50%_/_0.05)_0%,_transparent_50%)]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(173 80% 50% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(173 80% 50% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="fade-in-up opacity-0 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">AI-Powered Career Coaching</span>
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                New
              </span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="fade-in-up opacity-0 stagger-1 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Your AI Career Coach for{" "}
            <span className="gradient-text">Professional Success</span>
          </h1>

          {/* Subheading */}
          <p className="fade-in-up opacity-0 stagger-2 text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Advance your career with personalized guidance, AI-powered interview preparation, 
            and smart tools designed for your job success.
          </p>

          {/* CTAs */}
          <div className="fade-in-up opacity-0 stagger-3 flex flex-col sm:flex-row items-center gap-4 mb-16">
            <Link to="/signup">
              <Button variant="hero" size="xl" className="group">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="hero-outline" size="xl" className="group">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Hero image */}
          <div className="fade-in-up opacity-0 stagger-4 relative w-full max-w-4xl">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl blur-2xl" />
            <div className="relative glass-card rounded-2xl overflow-hidden border border-border/50">
              <img 
                src={heroImage} 
                alt="JobGeniusAI Dashboard Preview - AI Career Coaching Platform" 
                className="w-full h-auto"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
