export default function ProductReview({ reviews }) {
  return (
    <div className="reviews-section w-75 mx-auto my-5">
      <h3 className="fw-bold mb-4">Customer Reviews</h3>
      {reviews && reviews.length === 0 && <p className="text-muted">No reviews yet.</p>}

      {reviews && reviews.map(review => (
        <div key={review._id} className="review-card p-3 mb-4 shadow-sm rounded">
          <div className="d-flex align-items-center mb-2">
            <div className="rating-outer me-2">
              <div className="rating-inner" style={{ width: `${review.rating / 5 * 100}%` }}></div>
            </div>
            <span className="review-user text-muted">by {review.user.name}</span>
          </div>
          <p className="review-comment">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
