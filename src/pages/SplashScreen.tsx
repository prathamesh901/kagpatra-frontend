
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-white animate-fade-in">
      <img
        src="/lovable-uploads/57451aa9-cb3c-403c-a748-1ea6f34fe8b2.png"
        alt="Kagpatra Logo"
        className="object-contain w-60 max-w-full"
      />
    </div>
  );
};

export default SplashScreen;
