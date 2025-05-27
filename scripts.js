// Display page sections
function switchPage(page) {
  const sections = ['home', 'menu', 'contact', 'order', 'checkout'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = (page === id) ? (id === 'home' ? 'grid' : 'block') : 'none';
  });
}

// Simulated cart for demo purposes
const cart = [];

const prices = {
  homerun: { shortstop: 2.5, basehit: 4.0, doubleplay: 5.5 },
  rockies: { shortstop: 2.5, basehit: 4.5, doubleplay: 6.0 },
  everywhereas: { shortstop: 2.5, basehit: 4.5, doubleplay: 6.0 },
  stevechristmas: { shortstop: 2.5, basehit: 5.0, doubleplay: 6.5 },
};

const promoCodes = {
  SUMMER10: 0.10,
  SCOOP5: 0.05
};

// Update cart when selection changes
document.querySelectorAll('input[type="radio"]').forEach(input => {
  input.addEventListener("change", () => {
    const flavor = input.name;
    const portion = input.value;

    const existing = cart.find(item => item.flavor === flavor);
    if (existing) {
      existing.portion = portion;
      existing.price = prices[flavor][portion];
    } else {
      cart.push({
        flavor,
        portion,
        price: prices[flavor][portion]
      });
    }

    renderCart();
  });
});

function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  container.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement("div");
    div.textContent = `${formatFlavor(item.flavor)} (${formatPortion(item.portion)}) - $${item.price.toFixed(2)}`;
    container.appendChild(div);
  });

  updateTotal();
}

function updateTotal() {
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  const code = document.getElementById("promo")?.value?.toUpperCase();
  if (promoCodes[code]) {
    total *= (1 - promoCodes[code]);
  }

  const totalDisplay = document.getElementById("total");
  if (totalDisplay) totalDisplay.textContent = total.toFixed(2);
}

function formatFlavor(flavor) {
  return {
    homerun: "A HomeRun",
    rockies: "The Rockies",
    everywhereas: "Everywhere A's",
    stevechristmas: "Steve Christmas"
  }[flavor] || flavor;
}

function formatPortion(p) {
  return {
    shortstop: "Shortstop",
    basehit: "Base Hit",
    doubleplay: "Double Play"
  }[p] || p;
}

// Promo code input triggers recalculation
const promoInput = document.getElementById("promo");
if (promoInput) {
  promoInput.addEventListener("input", updateTotal);
}

// Price map and price update logic moved outside the submit handler
const priceMap = {
  homerun: { shortstop: 2.50, basehit: 4.00, doubleplay: 5.50 },
  rockies: { shortstop: 2.50, basehit: 4.50, doubleplay: 6.00 },
  everywhereas: { shortstop: 2.50, basehit: 4.50, doubleplay: 6.00 },
  stevechristmas: { shortstop: 2.50, basehit: 5.00, doubleplay: 6.50 },
};

function updatePrice() {
  const flavorEl = document.getElementById("flavor");
  const sizeEl = document.getElementById("size");
  const priceDisplay = document.getElementById("priceDisplay");

  if (!flavorEl || !sizeEl || !priceDisplay) return;

  const flavor = flavorEl.value;
  const size = sizeEl.value;

  if (flavor && size && priceMap[flavor] && priceMap[flavor][size]) {
    const price = priceMap[flavor][size];
    priceDisplay.textContent = `Total: $${price.toFixed(2)}`;
  } else {
    priceDisplay.textContent = "";
  }
}

// Add select event listener outside the function to avoid multiple bindings
const select = document.querySelector('select');
if (select) {
  select.addEventListener('change', (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const price = selectedOption && selectedOption.dataset ? selectedOption.dataset.price : undefined;
    if (price !== undefined) {
      console.log(`Selected price: $${price}`);
    }
  });
}

const checkoutForm = document.getElementById("checkout-form");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const emailEl = document.getElementById("email");
    const addressEl = document.getElementById("address");
    const promoEl = document.getElementById("promo");

    if (!emailEl || !addressEl) {
      alert("Form elements missing.");
      return;
    }

    const email = emailEl.value;
    const address = addressEl.value;

    if (!email.includes("@") || address.length < 5) {
      alert("Please enter a valid email and address.");
      return;
    }

    alert("Order placed successfully! 🍦");
    cart.length = 0;
    renderCart();
    this.reset();
    if (promoEl) promoEl.value = '';
    updateTotal();
  });
}

// Optionally, remove these unused functions to avoid "declared but its value is never read" errors:
 // function switchPage(page) { ... }
 // function updatePrice() { ... }

// Or, if you want to keep them for future use, you can ignore the warnings or call them somewhere in your code.

// Example of how to use the expressions
const expressions = [
  { text: "Welcome to Sweet Treats!", expression: "smile" },
  { text: "Would you like to try our new flavors?", expression: "wink" }
];