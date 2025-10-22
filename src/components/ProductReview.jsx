import React, { useState } from 'react';

export default function ProductReview({ productId, reviews }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmitReview = (e) => {
        e.preventDefault();
        // Simpan review ke state/localStorage/API
        console.log({ productId, rating, comment });
        setRating(0);
        setComment('');
    };

    return (
        <div className="product-reviews">
            <h3>Ulasan Produk</h3>
            
            {/* Form Review */}
            <form onSubmit={handleSubmitReview} className="review-form">
                <div className="rating-input">
                    <label>Rating:</label>
                    {[1, 2, 3, 4, 5].map(star => (
                        <button
                            key={star}
                            type="button"
                            className={`star-btn ${star <= rating ? 'active' : ''}`}
                            onClick={() => setRating(star)}
                        >
                            ⭐
                        </button>
                    ))}
                </div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Bagikan pengalaman Anda..."
                    className="review-textarea"
                />
                <button type="submit" className="submit-review-btn">
                    Kirim Ulasan
                </button>
            </form>

            {/* List Reviews */}
            <div className="reviews-list">
                {reviews?.map(review => (
                    <div key={review.id} className="review-item">
                        <div className="review-header">
                            <span className="reviewer-name">{review.user}</span>
                            <span className="review-rating">{"⭐".repeat(review.rating)}</span>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                        <span className="review-date">{review.date}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}