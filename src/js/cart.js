import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const imageUrls = import.meta.glob("../images/tents/*", {
  eager: true,
  import: "default",
  query: "?url",
});

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
  <div class="price-remove">
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="remove-item" data-id="${item.Id}">❌</span>
</div>
  
</li>`;

  return newItem;

}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const htmlItems = cartItems.map(
    (item) => cartItemTemplate(item)
  );

  document.querySelector(".product-list").innerHTML =
    htmlItems.join("");

  document
    .querySelectorAll(".remove-item")
    .forEach((button) => {
      button.addEventListener(
        "click",
        removeItemHandler
      );
    });
}

function removeItemHandler(event) {
  const id = event.target.dataset.id;

  removeItemFromCart(id);
}

function removeItemFromCart(id) {
  let cartItems = getLocalStorage("so-cart") || [];

  const index = cartItems.findIndex(
    (item) => item.Id === id
  );

  if (index > -1) {
    cartItems.splice(index, 1);
  }

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
}

renderCartContents();


