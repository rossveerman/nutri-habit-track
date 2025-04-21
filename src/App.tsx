
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AddFood from "./pages/AddFood";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import FoodDetail from "./pages/food-detail/FoodDetail";
import CameraPage from "./pages/CameraPage";
import SplashScreen from "./pages/SplashScreen";
import WelcomeScreen from "./pages/WelcomeScreen";
import LanguageSelection from "./pages/LanguageSelection";
import AuthScreen from "./pages/AuthScreen";
import BarcodeScannerPage from "./pages/BarcodeScanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/language" element={<LanguageSelection />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/add-food" element={<Layout><AddFood /></Layout>} />
          <Route path="/profile" element={<Layout />} />
          <Route path="/food/:id" element={<FoodDetail />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/barcode" element={<BarcodeScannerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
