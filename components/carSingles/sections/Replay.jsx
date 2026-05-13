const ratings = [
  {
    title: "Interior Design",
    stars: 5,
  },
  {
    title: "Value For The Money",
    stars: 5,
  },
  {
    title: "Reliability",
    stars: 5,
  },
];
const ratings2 = [
  {
    title: "Comfort",
    stars: 5,
  },
  {
    title: "Exterior Styling",
    stars: 5,
  },
  {
    title: "Performance",
    stars: 5,
  },
];

export default function Replay() {
  return (
    <>
      {" "}
      <h6 className="title">Leave a Reply</h6>
      <div className="text">
        Your email address will not be published. Required fields are marked *
      </div>
      <div className="right-box">
        <div className="rating-list two">
          {ratings2.map((rating, index) => (
            <div className="list-box" key={index}>
              <span>{rating.title}</span>
              <ul className="list">
                {Array.from({ length: rating.stars }, (_, starIndex) => (
                  <li key={starIndex}>
                    <i className="fa fa-star" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="rating-list">
          {ratings.map((rating, index) => (
            <div className="list-box" key={index}>
              <span>{rating.title}</span>
              <ul className="list">
                {Array.from({ length: rating.stars }, (_, starIndex) => (
                  <li key={starIndex}>
                    <i className="fa fa-star" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
