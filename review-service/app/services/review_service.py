from app.models.review_model import ReviewModel
from app.clients.product_client import ProductClient
from app.exceptions import NotFoundError

class ReviewService:
    @staticmethod
    def create_review(data):
        # Validasi apakah produk ada di product-service sebelum membuat review
        ProductClient.check_product_exists(data["product_id"])
        return ReviewModel.create(data)

    @staticmethod
    def get_all_reviews():
        return ReviewModel.find_all()

    @staticmethod
    def get_review_by_id(review_id):
        review = ReviewModel.find_by_id(review_id)
        if not review:
            raise NotFoundError(f"Review dengan ID {review_id} tidak ditemukan.")
        return review

    @staticmethod
    def get_reviews_by_product(product_id):
        # Opsional: Bisa juga cek produk eksis dulu jika diperlukan
        ProductClient.check_product_exists(product_id)
        return ReviewModel.find_by_product(product_id)

    @staticmethod
    def update_review(review_id, data):
        # Pastikan review-nya ada terlebih dahulu
        ReviewService.get_review_by_id(review_id)
        updated = ReviewModel.update(review_id, data)
        if not updated:
            raise NotFoundError("Gagal memperbarui review atau tidak ada perubahan data.")
        return ReviewService.get_review_by_id(review_id)

    @staticmethod
    def delete_review(review_id):
        # Pastikan review-nya ada terlebih dahulu
        ReviewService.get_review_by_id(review_id)
        deleted = ReviewModel.delete(review_id)
        if not deleted:
            raise NotFoundError("Gagal menghapus review.")
        return True