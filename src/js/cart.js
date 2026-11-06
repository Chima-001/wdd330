import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const imageUrls = import.meta.glob("../images/tents/*", {
  eager: true,
  import: "default",
  query: "?url",
});

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function getCartImageUrl(imagePath) {
  return imageUrls[imagePath] || imagePath;
}

function cartItemTemplate(item, index) {
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
  <span class="cart-card_remove" data-id="${item.Id}" data-index="${index}">&#10062</span>
</li>`;

  return newItem;
}

function removeProductFromCart(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  const updatedCartItems = cartItems;
  setLocalStorage("so-cart", updatedCartItems);
  renderCartContents();
}

renderCartContents();

document.querySelector(".product-list").addEventListener("click", (event) => {
  const removeButton = event.target.closest(".cart-card_remove");
  if (removeButton) {
    removeProductFromCart(Number(removeButton.dataset.index));
  }
});
