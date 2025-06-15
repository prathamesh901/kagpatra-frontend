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
  return <div className="h-screen w-full flex items-center justify-center bg-white animate-fade-in">
      <img alt="Kagpatra Logo" className="object-contain w-60 max-w-full" src="/lovable-uploads/29476744-1920-42d3-bc0c-8b5af45e3f46.png" />
    </div>;
};
export default SplashScreen;