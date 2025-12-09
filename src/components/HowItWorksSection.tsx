import { User, FileText, Target, BarChart3 } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: User,
    title: "Professional Onboarding",
    description: "Share your industry, skills, and expertise for personalized AI-driven guidance tailored to your career goals.",
  },
  {
    step: "02",
    icon: FileText,
    title: "Craft Your Documents",
    description: "Create ATS-optimized resumes and compelling cover letters that make you stand out to recruiters.",
  },
  {
    step: "03",
    icon: Target,
    title: "Prepare for Interviews",
    description: "Practice with AI-powered mock interviews tailored to your role with real-time feedback.",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Track Your Progress",
    description: "Monitor your improvements with detailed performance analytics and personalized recommendations.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(173_80%_50%_/_0.05)_0%,_transparent_60%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Four simple steps to accelerate your career growth
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative group"
              >
                {/* Step number badge */}
                <div className="absolute -top-4 left-8 z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
                    Step {step.step}
                  </span>
                </div>

                <div className="p-8 pt-10 rounded-2xl glass-card border border-border/50 hover:border-primary/30 transition-all duration-300 h-full group-hover:-translate-y-2">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
