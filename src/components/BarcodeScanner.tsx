import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, X, FlashlightOff, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { CapacitorService } from '@/services/CapacitorService';

interface BarcodeScannerProps {
  onScan?: (barcode: string) => void;
  onClose?: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [flashActive, setFlashActive] = useState(false);
  const [detectedCode, setDetectedCode] = useState<string | null>(null);
  const [isCapacitor, setIsCapacitor] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    const checkCapacitor = async () => {
      try {
        const capacitorGlobal = (window as any).Capacitor;
        setIsCapacitor(!!capacitorGlobal?.isNative);
      } catch (err) {
        setIsCapacitor(false);
      }
    };
    
    checkCapacitor();
  }, []);

  useEffect(() => {
    if (isCapacitor) {
      handleCapacitorBarcodeScanning();
    } else {
      initializeWebScanner();
    }
    
    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
      
      if (isCapacitor) {
        CapacitorService.stopBarcodeScanning().catch(console.error);
      }
    };
  }, [isCapacitor, isScanning]);
  
  const handleCapacitorBarcodeScanning = async () => {
    if (!isScanning) return;
    
    try {
      const barcodeData = await CapacitorService.startBarcodeScanning();
      
      if (barcodeData) {
        setDetectedCode(barcodeData);
        setIsScanning(false);
        
        toast({
          title: "Barcode Detected",
          description: `Code: ${barcodeData}`,
        });
        
        if (onScan) {
          onScan(barcodeData);
        }
      }
    } catch (error) {
      console.error('Capacitor barcode error:', error);
      toast({
        title: "Scanner Error",
        description: "Failed to access barcode scanner",
        variant: "destructive",
      });
      setHasPermission(false);
    }
  };
  
  const initializeWebScanner = async () => {
    codeReaderRef.current = new BrowserMultiFormatReader();
    
    try {
      if (!navigator.mediaDevices) {
        setHasPermission(false);
        toast({
          title: "Camera Error",
          description: "Your browser doesn't support camera access.",
          variant: "destructive",
        });
        return;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setHasPermission(true);
      stream.getTracks().forEach(track => track.stop());
      
      if (videoRef.current && isScanning) {
        try {
          codeReaderRef.current?.decodeFromVideoDevice(
            undefined, 
            videoRef.current, 
            (result: Result | undefined, error: any) => {
              if (result && result.getText()) {
                setDetectedCode(result.getText());
                setIsScanning(false);
                toast({
                  title: "Barcode Detected",
                  description: `Code: ${result.getText()}`,
                });
                
                if (onScan) {
                  onScan(result.getText());
                }
              }
            }
          );
        } catch (error) {
          console.error("Error starting barcode scanner:", error);
          toast({
            title: "Scanner Error",
            description: "Failed to start the barcode scanner.",
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      console.error("Camera permission error:", err);
      setHasPermission(false);
      toast({
        title: "Camera Permission Denied",
        description: "Please allow camera access to scan barcodes.",
        variant: "destructive",
      });
    }
  };
  
  const handleCloseScanner = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };
  
  const toggleFlash = () => {
    setFlashActive(!flashActive);
    toast({
      description: flashActive 
        ? "Flash is not fully supported in web browsers" 
        : "Flash is not fully supported in web browsers",
    });
  };
  
  const handleScanAgain = () => {
    setDetectedCode(null);
    setIsScanning(true);
  };

  if (hasPermission === false) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-4 z-50">
        <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
          <h2 className="text-xl font-semibold mb-4">Camera Access Required</h2>
          <p className="mb-6 text-gray-600">
            Please enable camera access in your browser settings to use the barcode scanner.
          </p>
          <Button onClick={handleCloseScanner}>Back to Search</Button>
        </div>
      </div>
    );
  }
  
  if (hasPermission === null) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p>Requesting camera access...</p>
        </div>
      </div>
    );
  }

  if (isCapacitor && isScanning) {
    return (
      <div className="camera-placeholder">
        <Camera size={64} />
        <p className="text-center">Scanning barcode...</p>
        <Button variant="outline" className="text-white border-white mt-4" onClick={handleCloseScanner}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      <div className="p-4 flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white"
          onClick={handleCloseScanner}
        >
          <X size={24} />
        </Button>
        
        <h2 className="text-white text-lg font-medium">Scan Barcode</h2>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white"
          onClick={toggleFlash}
        >
          <FlashlightOff size={24} className={flashActive ? "text-yellow-400" : "text-white"} />
        </Button>
      </div>
      
      <div className="flex-1 relative">
        {!isCapacitor && (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            playsInline
          />
        )}
        
        {isScanning && !isCapacitor && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="border-2 border-white w-64 h-64 md:w-80 md:h-80 relative">
              <div className="absolute left-0 right-0 h-0.5 bg-nutritrack-teal animate-[scanLine_2s_ease-in-out_infinite]"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-2 text-center">
                <p className="text-white text-sm">Position barcode within frame</p>
              </div>
            </div>
          </div>
        )}
        
        {detectedCode && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full m-4">
              <h3 className="text-xl font-semibold mb-2">Barcode Detected</h3>
              <p className="mb-4 font-mono bg-gray-100 p-2 rounded overflow-x-auto">
                {detectedCode}
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleScanAgain}
                >
                  Scan Again
                </Button>
                <Button 
                  className="flex-1 bg-nutritrack-teal hover:bg-nutritrack-teal/90"
                  onClick={() => onScan && onScan(detectedCode)}
                >
                  <Check size={16} className="mr-2" />
                  Use This Code
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 flex justify-center">
        <Button variant="ghost" className="text-white" onClick={handleCloseScanner}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BarcodeScanner;
