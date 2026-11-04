import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs"; 

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

//function addProductToCart(product) {
//  setLocalStorage("so-cart", product);
//}

// Original code - to be corrected
// function addProductToCart(product) {
//   setLocalStorage("so-cart", product);
// }

// Jesse edits
function addProductToCart(product) {
  const cartContents = getLocalStorage("so-cart") || [];
  cartContents.push(product);
  setLocalStorage("so-cart", cartContents);
}

// add to cart button event handler
//async function addToCartHandler(e) {
//  const product = await dataSource.findProductById(e.target.dataset.id);
//  addProductToCart(product);
//}

// add listener to Add to Cart button
// document
//  .getElementById("addToCart")
//  .addEventListener("click", addToCartHandler);
