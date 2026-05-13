const features = [
  {
    title: "Interior",
    items: [
      "Air Conditioner",
      "Digital Odometer",
      "Leather Seats",
      "Heater",
      "Tachometer",
    ],
  },
  {
    title: "Exterior",
    items: [
      "Fog Lights Front",
      "Rain Sensing Wipe",
      "Rear Spoiler",
      "Sun Roof",
    ],
  },
  {
    title: "Safety",
    items: [
      "Brake Assist",
      "Child Safety Locks",
      "Traction Control",
      "Power Door Locks",
      "Driver Air Bag",
    ],
  },
];

export default function Features() {
  return (
    <>
      <h4 className="title">Features</h4>
      <div className="row">
        {/* list-column */}
        {features.map((feature, index) => (
          <div className="list-column col-lg-3 col-md-6 col-sm-12" key={index}>
            <div className="inner-column">
              <h6 className="title">{feature.title}</h6>
              <ul className="feature-list">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <i className="fa-solid fa-check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        {/* list-column */}
        <div className="list-column col-lg-3 col-md-6 col-sm-12">
          <div className="inner-column">
            <h6 className="title">Comfort &amp; Convenience</h6>
            <ul className="feature-list">
              <li>
                <i className="fa-solid fa-check" />
                Power Steering
              </li>
              <li>
                <i className="fa-solid fa-check" />
                Vanity Mirror
              </li>
              <li>
                <i className="fa-solid fa-check" />
                Trunk Light
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
