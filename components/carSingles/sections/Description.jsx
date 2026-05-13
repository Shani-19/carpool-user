import Image from "next/image";
import React from "react";

export default function Description() {
  return (
    <>
      <h4 className="title">Description</h4>
      <div className="text two">
        Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr
        convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel,
        dapibus lectus. Etiam ac suscipit eros, eget maximus
      </div>
      <div className="text">
        Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien.
        Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque.
        Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi
        aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et
        tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet.
        Ut rutrum risus et nunc pretium scelerisque.
      </div>
      <ul className="des-list">
        <li>
          <span>
            <Image
              src="/images/resource/book1-1.svg"
              width={22}
              height={22}
              alt=""
            />
            View Vin Report
          </span>
        </li>
        <li className="two">
          <span>
            <Image
              src="/images/resource/book1-2.svg"
              width={22}
              height={22}
              alt=""
            />
            Car Brochure
          </span>
        </li>
      </ul>
    </>
  );
}
