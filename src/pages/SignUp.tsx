import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Hexagon, Brain } from "lucide-react";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-12">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(173_80%_50%_/_0.1)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(173_80%_50%_/_0.1)_0%,_transparent_50%)]" />
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(173 80% 50% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(173 80% 50% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 group mb-8">
            <div className="relative">
              <Hexagon className="w-10 h-10 text-primary transition-transform group-hover:rotate-90 duration-500" />
              <Brain className="w-5 h-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="font-display font-bold text-2xl text-foreground">
              JobGenius<span className="gradient-text">AI</span>
            </span>
          </Link>

          {/* Clerk Sign Up Component */}
          <ClerkSignUp 
            routing="path"
            path="/signup"
            signInUrl="/signin"
            afterSignUpUrl="/dashboard"
            appearance={{
              baseTheme: undefined,
              variables: {
                colorPrimary: 'hsl(173, 80%, 50%)',
                colorBackground: 'hsl(222, 47%, 8%)',
                colorInputBackground: 'hsl(222, 30%, 12%, 0.5)',
                colorInputText: 'hsl(210, 40%, 98%)',
                colorText: 'hsl(210, 40%, 98%)',
                colorTextSecondary: 'hsl(215, 20%, 55%)',
                colorDanger: 'hsl(0, 84%, 60%)',
                borderRadius: '0.75rem',
                fontFamily: 'Inter, sans-serif',
                fontFamilyButtons: 'Sora, sans-serif',
              },
              elements: {
                rootBox: 'w-full',
                card: 'bg-[hsl(222,30%,12%,0.6)] backdrop-blur-[20px] border border-[hsl(222,30%,25%,0.3)] rounded-3xl shadow-xl p-8',
                headerTitle: 'font-[Sora] text-3xl font-bold text-[hsl(210,40%,98%)] mb-2',
                headerSubtitle: 'text-[hsl(215,20%,55%)] text-base',
                socialButtons: 'flex flex-col gap-3',
                socialButtonsBlockButton: 'bg-transparent border border-[hsl(222,30%,25%,0.3)] hover:bg-[hsl(173,80%,50%,0.05)] hover:border-[hsl(173,80%,50%,0.3)] transition-all h-12 rounded-xl text-[hsl(210,40%,98%)] font-medium',
                socialButtonsBlockButtonText: 'text-[hsl(210,40%,98%)] font-medium',
                dividerLine: 'bg-[hsl(222,30%,25%,0.3)]',
                dividerText: 'text-xs text-[hsl(215,20%,55%)] uppercase font-medium',
                formButtonPrimary: 'bg-[hsl(173,80%,50%)] hover:bg-[hsl(173,80%,45%)] text-[hsl(222,47%,5%)] font-semibold h-12 rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_hsl(173,80%,50%,0.3)]',
                formFieldLabel: 'text-sm font-medium text-[hsl(210,40%,98%)] mb-2',
                formFieldInput: 'bg-[hsl(222,30%,12%,0.5)] border border-[hsl(222,30%,25%,0.3)] focus:border-[hsl(173,80%,50%,0.5)] h-12 rounded-xl text-[hsl(210,40%,98%)] transition-all',
                formFieldInputShowPasswordButton: 'text-[hsl(215,20%,55%)] hover:text-[hsl(210,40%,98%)]',
                footerActionLink: 'text-[hsl(173,80%,50%)] hover:text-[hsl(173,80%,45%)] font-medium transition-colors',
                identityPreviewText: 'text-[hsl(215,20%,55%)]',
                identityPreviewEditButton: 'text-[hsl(173,80%,50%)] hover:text-[hsl(173,80%,45%)]',
                formHeaderTitle: 'font-[Sora] text-2xl font-bold text-[hsl(210,40%,98%)]',
                formHeaderSubtitle: 'text-[hsl(215,20%,55%)]',
                footer: 'hidden',
                otpCodeFieldInput: 'bg-[hsl(222,30%,12%,0.5)] border border-[hsl(222,30%,25%,0.3)] text-[hsl(210,40%,98%)]',
              }
            }}
          />

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
