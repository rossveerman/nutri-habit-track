
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

// Helper to check if we're running in a Capacitor environment
const isCapacitorAvailable = (): boolean => {
  return typeof (window as any)?.Capacitor !== 'undefined';
};

export class CapacitorService {
  /**
   * Take a photo using the device camera
   */
  static async takePhoto() {
    if (!isCapacitorAvailable()) {
      console.warn('Camera functionality is only available on native mobile devices');
      throw new Error('Camera not available in browser');
    }

    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
      
      return image;
    } catch (error) {
      console.error('Camera error:', error);
      throw new Error('Failed to take photo');
    }
  }

  /**
   * Start barcode scanning
   */
  static async startBarcodeScanning() {
    if (!isCapacitorAvailable()) {
      console.warn('Barcode scanning is only available on native mobile devices');
      throw new Error('Barcode scanner not available in browser');
    }

    try {
      // Request camera permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      
      if (status.granted) {
        // Make background transparent to show the scanner
        document.querySelector('body')?.classList.add('barcode-scanner-active');
        
        // Start the scanner
        await BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan();
        
        // Reset UI when done
        document.querySelector('body')?.classList.remove('barcode-scanner-active');
        
        if (result.hasContent) {
          return result.content;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Barcode scanner error:', error);
      document.querySelector('body')?.classList.remove('barcode-scanner-active');
      throw new Error('Failed to scan barcode');
    }
  }

  /**
   * Stop ongoing barcode scanning
   */
  static async stopBarcodeScanning() {
    if (!isCapacitorAvailable()) {
      return; // No-op in browser
    }

    try {
      await BarcodeScanner.stopScan();
      document.querySelector('body')?.classList.remove('barcode-scanner-active');
    } catch (error) {
      console.error('Error stopping scanner:', error);
    }
  }
}
