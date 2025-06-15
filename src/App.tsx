import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EstimateCostPage from "./pages/EstimateCostPage";
import NearbyKiosksPage from "./pages/NearbyKiosksPage";
import ProfilePage from "./pages/ProfilePage";
import ScanQRCodePage from "./pages/ScanQRCodePage";
import UploadDocumentPage from "./pages/UploadDocumentPage";
import SetPrintPreferencesPage from "./pages/SetPrintPreferencesPage";
import PaymentPage from "./pages/PaymentPage";
import PrintingInProgressPage from "./pages/PrintingInProgressPage";
import PrintConfirmationPage from "./pages/PrintConfirmationPage";
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Splash and Onboarding routes */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Index />} />
          {/* Main app routes */}
          <Route path="/estimate" element={<EstimateCostPage />} />
          <Route path="/kiosks" element={<NearbyKiosksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/scan" element={<ScanQRCodePage />} />
          <Route path="/upload" element={<UploadDocumentPage />} />
          <Route path="/set-print-preferences" element={<SetPrintPreferencesPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/printing" element={<PrintingInProgressPage />} />
          <Route path="/print-confirmation" element={<PrintConfirmationPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
