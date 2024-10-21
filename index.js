// create an object class for the product to store the properties for id,name and price
const TOTAL_CART_ITEMS = document.getElementById("total-cart-items");
const DISPLAY_CART_ITEMS = document.getElementById("display-cart-items");
const TOAL_PRICE = document.getElementById("total-price");
console.log(TOTAL_CART_ITEMS);
console.log(DISPLAY_CART_ITEMS);
console.log(TOAL_PRICE);

// product class
class product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
// ******

// create an object class for the shopping cart item to store the properties for the product and its quantity

// a sub-class for the product
class productinfo extends product {
  constructor(id, name, price, quantity) {
    super(id, name, price);
    this.quantity = quantity;
  }
  calculateProductTotal() {
    return this.price * this.quantity;
  }
}
// *******

// create another object class for the shopping cart which contains an array of shoppin items

class shoppingCartItem {
  constructor(cartItem) {
    this.cartItem = cartItem;
  }

  // get total items in cart
  getNumberOfItemInCart() {
    TOTAL_CART_ITEMS.innerText = this.cartItem.length;
  }
  //   get the total amount of everything in cart
  calculateTotalOfItemsInCart() {
    let total = 0;
    this.cartItem.forEach((item) => {
      total += item.quantity * item.price;
    });
    TOAL_PRICE.innerText = total;
  }

  // a method for increasing product quantity
  increaseQuantity(productId) {
    this.cartItem.forEach((item) => {
      if (item.id === productId) {
        item.quantity += 1;
      }
      this.displayCartItems();
      this.calculateTotalOfItemsInCart();
    });
  }

  // a method for decreasing product quantity
  decreaseQuantity(productId) {
    this.cartItem.forEach((item) => {
      if (item.id === productId && item.quantity > 1) {
        item.quantity -= 1;
      }
      this.displayCartItems();
      this.calculateTotalOfItemsInCart();
    });
  }

  // a method for removing cart items
  removeCartItems(productId) {
    let updatedCartItem = this.cartItem.filter((item) => item.id != productId);
    this.cartItem = updatedCartItem;
    this.displayCartItems();
    this.getNumberOfItemInCart();
    this.calculateTotalOfItemsInCart();
  }
  // a method to display cart items
  displayCartItems() {
    let product = this.cartItem.map((item) => {
      return `        <div class="product-card flex gap-10">
          <h2>${item.name}</h2>
          <h3>${item.price}</h3>
          <div>
            <button id=${
              item.id
            } class="decrease-btn  bg-red-500 rounded-md p-2 text-white" >
              decrease
            </button>
            <p>${item.quantity}</p>
            <button id=${
              item.id
            } class="increase-btn bg-green-500 rounded-md p-2 text-white">
              increase
            </button>
          </div>
          <p>${item.calculateProductTotal()}</p>
            <button id=${
              item.id
            } class="remove-btn bg-blue-500 rounded-md p-2 text-white">
              Remove
            </button>
        </div>
`;
    });
    DISPLAY_CART_ITEMS.innerHTML = product.join();

    // get all the buttons for decreasing
    const decreaseBTN = document.querySelectorAll(".decrease-btn");
    const increaseBTN = document.querySelectorAll(".increase-btn");
    const removeBTN = document.querySelectorAll(".remove-btn");

    decreaseBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.decreaseQuantity(parseInt(e.target.getAttribute("id")));
      });
    });
    increaseBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.increaseQuantity(parseInt(e.target.getAttribute("id")));
      });
    });
    removeBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.removeCartItems(parseInt(e.target.getAttribute("id")));
      });
    });
  }
}

// our cart items
let cartItem = [
  new productinfo(1, "iphone 6", 10000, 1),
  new productinfo(2, "samsung", 50000, 1),
  new productinfo(3, "infinix", 20000, 1),
];

// create an instance of the shopping cart
const shoppingCart = new shoppingCartItem(cartItem);

// display all the cart items
shoppingCart.displayCartItems();
shoppingCart.calculateTotalOfItemsInCart();
shoppingCart.getNumberOfItemInCart();
