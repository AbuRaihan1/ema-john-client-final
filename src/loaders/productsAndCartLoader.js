import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
  // get Products
  const productsData = await fetch("http://localhost:5000/products");
  const {product} = await productsData.json();

  // get cart
  const savedCart = getStoredCart();
  const initialCart = [];

  for (const id in savedCart) {
    const addedProduct = product.find((product) => product._id === id);
    if (addedProduct) {
      const quantity = savedCart[id];
      addedProduct.quantity = quantity;
      initialCart.push(addedProduct);
    }
  }

  return { products: product, initialCart: initialCart };
};
