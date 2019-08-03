import React from "react";

import "./product.sass";

const Product = () => {
  return (
    <section>
      <h4 className="green red">Заголовок объявления</h4>
      <img
        src="https://loremflickr.com/cache/resized/65535_32694223137_804c67ec90_z_400_400_nofilter.jpg"
        alt="#"
      />
      <span>1000$</span>
      <span>Саша Алексеев</span>
      <span>12</span>
    </section>
  );
};

export default Product;
