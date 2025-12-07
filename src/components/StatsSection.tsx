import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Industries Covered" },
  { value: 1000, suffix: "+", label: "Interview Questions" },
  { value: 95, suffix: "%", label: "Success Rate" },
  { value: 24, suffix: "/7", label: "AI Support" },
];

const useCountUp = (end: number, duration: number = 2000, startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
    }
  }, [startOnView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, ref };
};

const StatsSection = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-border/50">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => {
              const { count, ref } = useCountUp(stat.value, 2000);
              
              return (
                <div
                  key={stat.label}
                  ref={ref}
                  className="text-center group"
                >
                  <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-2">
                    {count}
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
