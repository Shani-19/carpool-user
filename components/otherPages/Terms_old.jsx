import Link from "next/link";
import React from "react";

export default function Terms() {
  return (
    <section className="tabs-section layout-radius">
      <div className="boxcar-container">
        <div className="boxcar-title-three">
          <ul className="breadcrumb">
            <li>
              <Link href={`/`}>Home</Link>
            </li>
            <li>
              <span>Cars for Sale</span>
            </li>
          </ul>
          <h2>Terms and Conditions</h2>
        </div>
        <div className="row">
          <div className="tabs-column col-lg-3 col-md-4 col-sm-12">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="Account&Payments-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Account&Payments"
                  type="button"
                  role="tab"
                  aria-controls="Account&Payments"
                  aria-selected="true"
                >
                  Account &amp; Payments
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="ManageOrders-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#ManageOrders"
                  type="button"
                  role="tab"
                  aria-controls="ManageOrders"
                  aria-selected="false"
                >
                  Manage Orders
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="COVID-19-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#COVID-19"
                  type="button"
                  role="tab"
                  aria-controls="COVID-19"
                  aria-selected="false"
                >
                  COVID-19
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="Other-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Other"
                  type="button"
                  role="tab"
                  aria-controls="Other"
                  aria-selected="false"
                >
                  Other
                </button>
              </li>
            </ul>
          </div>
          <div className="content-column col-lg-9 col-md-8 col-sm-12">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="Account&Payments"
                role="tabpanel"
                aria-labelledby="Account&Payments-tab"
              >
                <div className="right-box">
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">1. Introduction</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">2. Your Use of the Boxcar Sites</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">3. Content and Ideas</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="ManageOrders"
                role="tabpanel"
                aria-labelledby="ManageOrders-tab"
              >
                <div className="right-box">
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">1. Introduction</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">2. Your Use of the Boxcar Sites</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">3. Content and Ideas</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="COVID-19"
                role="tabpanel"
                aria-labelledby="COVID-19-tab"
              >
                <div className="right-box">
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">1. Introduction</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">2. Your Use of the Boxcar Sites</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">3. Content and Ideas</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Other"
                role="tabpanel"
                aria-labelledby="Other-tab"
              >
                <div className="right-box">
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">1. Introduction</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">2. Your Use of the Boxcar Sites</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">3. Content and Ideas</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
