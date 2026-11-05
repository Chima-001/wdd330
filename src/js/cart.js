import { getLocalStorage } from "./utils.mjs";

const imageUrls = import.meta.glob("../images/tents/*", {
  eager: true,
  import: "default",
  query: "?url",
});

const deleteBtn = document.querySelector(".cart-card_remove");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function getCartImageUrl(imagePath) {
  return imageUrls[imagePath] || imagePath;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${getCartImageUrl(item.Image)}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card_remove" data-id="${item.Id}">&#10062</span>
</li>`;

  return newItem;
}

function removeProductFromCart(productId) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems = cartItems.filter((item) => item.Id !== ProductId);
  setLocalStorage("so-cart", cartItems);
}

renderCartContents();

deleteBtn.addEventListener("click", removeProductFromCart(item.Id));
