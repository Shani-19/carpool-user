const reviews = [
  {
    title: "Comfort",
    rating: 5.0,
    remark: "Excellent",
  },
  {
    title: "Performance",
    rating: 5.0,
    remark: "Excellent",
  },
  {
    title: "Exterior styling",
    rating: 5.0,
    remark: "Excellent",
  },
  {
    title: "Interior design",
    rating: 5.0,
    remark: "Excellent",
  },
  {
    title: "Value for the money",
    rating: 5.0,
    remark: "Excellent",
  },
  {
    title: "Reliability",
    rating: 5.0,
    remark: "Excellent",
  },
];
const firstThreeReviews = reviews.slice(0, 3);
const lastThreeReviews = reviews.slice(3);

export default function Review() {
  return (
    <>
      <h4 className="title">Customer Reviews</h4>
      <div className="review-box">
        <div className="rating-box">
          <div className="content-box">
            <span>Overall Rating</span>
            <h3 className="title">4.8</h3>
            <small>Out Of 5</small>
          </div>
        </div>
        <ul className="review-list two">
          {firstThreeReviews.map((review, index) => (
            <li key={index}>
              <div className="review-title">
                <span>{review.title}</span>
                <small>{review.remark}</small>
              </div>
              <sub>
                <i className="fa fa-star" />
                {review.rating}
              </sub>
            </li>
          ))}
        </ul>
        <ul className="review-list">
          {lastThreeReviews.map((review, index) => (
            <li key={index}>
              <div className="review-title">
                <span>{review.title}</span>
                <small>{review.remark}</small>
              </div>
              <sub>
                <i className="fa fa-star" />
                {review.rating}
              </sub>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
