import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes JobGeniusAI unique as a career development tool?",
    answer: "JobGeniusAI combines advanced AI technology with personalized career coaching to provide tailored guidance. Unlike generic tools, we analyze your specific industry, experience level, and career goals to deliver customized recommendations for resume building, interview preparation, and career advancement.",
  },
  {
    question: "How does JobGeniusAI create tailored content?",
    answer: "Our AI analyzes your professional background, target industry, and job descriptions to generate highly personalized content. We use advanced natural language processing to ensure your resumes and cover letters are not only ATS-optimized but also compelling to human recruiters.",
  },
  {
    question: "How accurate and up-to-date are JobGeniusAI's industry insights?",
    answer: "Our industry insights are updated regularly using real-time market data from multiple sources. We track salary trends, job market demands, skill requirements, and industry growth patterns to provide you with the most current and accurate information for your career decisions.",
  },
  {
    question: "Is my data secure with JobGeniusAI?",
    answer: "Absolutely. We employ enterprise-grade encryption and security measures to protect your personal and professional information. Your data is never shared with third parties without your explicit consent, and you have full control over your information at all times.",
  },
  {
    question: "How can I track my interview preparation progress?",
    answer: "Our platform provides detailed analytics on your mock interview performance, including response quality scores, timing analysis, and personalized improvement suggestions. You can track your progress over time and see exactly where you're improving.",
  },
  {
    question: "Can I edit the AI-generated content?",
    answer: "Yes! All AI-generated content is fully editable. We believe in giving you complete control over your professional documents. Our AI provides a strong foundation, and you can customize every aspect to match your personal voice and style.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our platform
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl border border-border/50 px-6 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-display font-medium text-foreground hover:text-primary transition-colors py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
