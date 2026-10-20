from flask import Blueprint
from app.controllers.review_controller import ReviewController

review_bp = Blueprint("reviews", __name__)

@review_bp.route("/reviews", methods=["POST"])
def create_review():
    return ReviewController.create_review()

@review_bp.route("/reviews", methods=["GET"])
def get_all_reviews():
    return ReviewController.get_all_reviews()

@review_bp.route("/reviews/<string:review_id>", methods=["GET"])
def get_review_by_id(review_id):
    return ReviewController.get_review_by_id(review_id)

@review_bp.route("/reviews/product/<string:product_id>", methods=["GET"])
def get_reviews_by_product(product_id):
    return ReviewController.get_reviews_by_product(product_id)

@review_bp.route("/reviews/<string:review_id>", methods=["PUT"])
def update_review(review_id):
    return ReviewController.update_review(review_id)

@review_bp.route("/reviews/<string:review_id>", methods=["DELETE"])
def delete_review(review_id):
    return ReviewController.delete_review(review_id)