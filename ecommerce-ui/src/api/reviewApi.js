// src/api/reviewApi.js
import { request } from './http'

const BASE_URL = import.meta.env.VITE_REVIEW_URL

export const getProductReviews = (productId) => 
  request(BASE_URL, `/api/reviews/product/${productId}`).then((res) => res.data)

export const createReview = ({ productId, userId, rating, comment }) => 
  request(BASE_URL, '/api/reviews', {
    method: 'POST',
    body: {
      product_id: productId,
      user_id: userId,
      rating: rating,
      comment: comment,
    },
  }).then((res) => res.data)