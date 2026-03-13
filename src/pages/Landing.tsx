import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";

const HEALTH_QUOTES = [
  "\"Health is not valued till sickness comes.\" — Thomas Fuller",
  "\"The greatest wealth is health.\" — Virgil",
  "\"Take care of your body. It's the only place you have to live.\" — Jim Rohn",
  "\"An ounce of prevention is worth a pound of cure.\" — Benjamin Franklin",
  "\"Good health is not something we can buy. However, it can be an extremely valuable savings account.\" — Anne Wilson Schaef",
  "\"To keep the body in good health is a duty... otherwise we shall not be able to keep the mind strong and clear.\" — Buddha",
  "\"Health is a state of complete harmony of the body, mind and spirit.\" — B.K.S. Iyengar",
];

const Landing = () => {
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % HEALTH_QUOTES.length);
        setFadeIn(true);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left - Logo side */}
      <div className="relative flex-1 flex items-center justify-center bg-background overflow-hidden min-h-[40vh] md:min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <img
          src="/mtu-logo.png"
          alt="Mountain Top University"
          className="w-[60%] max-w-[400px] object-contain opacity-60 blur-[1px] select-none animate-[pulse_4s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-3 px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight drop-shadow-lg">
              MTU Health Centre
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto">
              Clinic Management System
            </p>
          </div>
        </div>
      </div>

      {/* Right - Quotes & Actions */}
      <div className="flex-1 flex flex-col items-center justify-center bg-primary/95 text-primary-foreground p-8 md:p-16 min-h-[60vh] md:min-h-screen">
        <div className="max-w-md w-full space-y-12 text-center">
          {/* Quote area */}
          <div className="space-y-6">
            <Stethoscope className="h-12 w-12 mx-auto opacity-80" />
            <p
              className={`text-lg md:text-xl italic leading-relaxed min-h-[80px] transition-opacity duration-500 ${
                fadeIn ? "opacity-100" : "opacity-0"
              }`}
            >
              {HEALTH_QUOTES[quoteIndex]}
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <p className="text-sm opacity-80 font-medium uppercase tracking-wider">
              Get Started
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="w-full gap-3 text-base h-14"
              onClick={() => navigate("/signup/student")}
            >
              <GraduationCap className="h-5 w-5" />
              Sign Up as Student
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full gap-3 text-base h-14 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={() => navigate("/signup/staff")}
            >
              <Stethoscope className="h-5 w-5" />
              Sign Up as Staff
            </Button>
            <p className="text-sm opacity-70 pt-4">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="underline font-medium hover:opacity-100"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
