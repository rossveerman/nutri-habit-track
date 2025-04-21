
import axios from 'axios';

// OpenFoodFacts API base URL
const OPEN_FOOD_FACTS_API = 'https://world.openfoodfacts.org/api/v0';

// Local cache for previously fetched products
const productCache: Record<string, any> = {};

/**
 * Service for looking up food products by barcode
 */
class BarcodeDatabaseService {
  /**
   * Look up a product by barcode
   * @param barcode - The product barcode (UPC, EAN, etc.)
   * @returns Promise with product data or null if not found
   */
  async lookupBarcode(barcode: string): Promise<any | null> {
    try {
      // Check cache first
      if (productCache[barcode]) {
        console.log('Retrieved from cache:', barcode);
        return productCache[barcode];
      }

      // Call OpenFoodFacts API
      const response = await axios.get(`${OPEN_FOOD_FACTS_API}/product/${barcode}.json`);

      // Check if product was found
      if (response.data.status === 0) {
        console.log('Product not found:', barcode);
        return null;
      }

      // Extract and format product data
      const product = this.formatProductData(response.data.product);

      // Cache the result
      productCache[barcode] = product;

      return product;
    } catch (error) {
      console.error('Error looking up barcode:', error);
      throw new Error('Failed to look up product information');
    }
  }

  /**
   * Format the raw API response into our app's product format
   * @param rawProduct - Raw product data from API
   * @returns Formatted product data or null if incomplete
   */
  formatProductData(rawProduct: any): any | null {
    // If product data is incomplete, return null
    if (!rawProduct.product_name || !rawProduct.nutriments) {
      return null;
    }

    // Extract serving size information
    let servingSize = '100';
    let servingSizeUnit = 'g';

    if (rawProduct.serving_size) {
      const servingMatch = rawProduct.serving_size.match(/(\d+\.?\d*)\s*([a-zA-Z]+)/);
      if (servingMatch && servingMatch.length >= 3) {
        servingSize = servingMatch[1];
        servingSizeUnit = servingMatch[2];
      }
    }

    // Extract brand name
    const brand = rawProduct.brands ? rawProduct.brands.split(',')[0].trim() : 'Unknown Brand';

    // Format the nutritional information
    const nutriments = rawProduct.nutriments;

    return {
      name: rawProduct.product_name,
      brand: brand,
      servingSize: servingSize,
      servingSizeUnit: servingSizeUnit,
      calories: nutriments['energy-kcal_serving'] || nutriments['energy-kcal_100g'] || 0,
      protein: nutriments.proteins_serving || nutriments.proteins_100g || 0,
      carbs: nutriments.carbohydrates_serving || nutriments.carbohydrates_100g || 0,
      fat: nutriments.fat_serving || nutriments.fat_100g || 0,
      sugar: nutriments.sugars_serving || nutriments.sugars_100g || 0,
      fiber: nutriments.fiber_serving || nutriments.fiber_100g || 0,
      sodium: nutriments.sodium_serving || nutriments.sodium_100g || 0,
      image: rawProduct.image_url || null,
      ingredients: rawProduct.ingredients_text || null,
      nutritionGrade: rawProduct.nutrition_grade_fr || null,
      // Store the original data for reference
      originalData: rawProduct
    };
  }

  /**
   * Submit a product to the OpenFoodFacts database (placeholder)
   * @param productData - The product data to submit
   * @param barcode - The barcode of the product
   * @returns Promise<boolean> - Always true (placeholder)
   */
  async contributeProduct(productData: any, barcode: string): Promise<boolean> {
    // This would be implemented with proper API calls in a production app
    console.log(`Would contribute product data for ${barcode}`);
    return true;
  }

  /**
   * Clear the local cache
   */
  clearCache() {
    Object.keys(productCache).forEach(key => delete productCache[key]);
  }
}

export default new BarcodeDatabaseService();
