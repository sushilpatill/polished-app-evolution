import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Rishabh Saini",
    role: "Software Developer Engineer",
    company: "Capgemini",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    quote: "The AI-powered interview prep was a game-changer. Landed my dream job at a top tech company! The personalized questions helped me prepare for exactly what I faced.",
  },
  {
    name: "Aditya Ranjan",
    role: "Program Director",
    company: "SwapSo",
    image: "https://randomuser.me/api/portraits/men/72.jpg",
    quote: "The industry insights helped me pivot my career successfully. The salary data was spot-on! I negotiated a 40% raise thanks to the market analysis.",
  },
  {
    name: "Ujjawal Pratap Singh",
    role: "Web Developer",
    company: "Cognizant",
    image: "https://randomuser.me/api/portraits/men/81.jpg",
    quote: "My resume's ATS score improved significantly. Got more interviews in two weeks than in six months! The AI suggestions were incredibly relevant.",
  },
  {
    name: "Priya Sharma",
    role: "Data Analyst",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "JobGeniusAI transformed my job search completely. The career path recommendations were exactly what I needed to advance in my field.",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(173_80%_50%_/_0.03)_0%,_transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            What Our <span className="gradient-text">Users Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of professionals who transformed their careers
          </p>
        </div>

        {/* Testimonials carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main testimonial card */}
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-border/50">
              <Quote className="w-12 h-12 text-primary/30 mb-6" />
              
              <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-light">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/30"
                />
                <div>
                  <h4 className="font-display font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {testimonials[currentIndex].role} at{" "}
                    <span className="text-primary">{testimonials[currentIndex].company}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="glass"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="glass"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
