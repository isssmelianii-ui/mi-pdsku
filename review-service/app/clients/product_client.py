import os
import requests
from app.exceptions import ExternalServiceError, NotFoundError

class ProductClient:
    @staticmethod
    def check_product_exists(product_id):
        product_service_url = os.getenv("PRODUCT_SERVICE_URL", "http://localhost:3000")
        url = f"{product_service_url}/products/{product_id}"
        
        try:
            response = requests.get(url, timeout=5)
            
            if response.status_code == 404:
                raise NotFoundError(f"Produk dengan ID {product_id} tidak ditemukan di product-service.")
            elif response.status_code != 200:
                raise ExternalServiceError("Gagal memvalidasi produk ke layanan eksternal.")
                
            return response.json()
        except requests.exceptions.RequestException:
            raise ExternalServiceError("Tidak dapat terhubung ke product-service.")