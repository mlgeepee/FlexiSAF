const productGrid = document.getElementById('product-grid');
const cartTitle = document.getElementById('cart-title');
const emptyCart = document.getElementById('empty-cart');
const cartContent = document.getElementById('cart-content');
const cartItemsList = document.getElementById('cart-items');
const orderTotal = document.getElementById('order-total');
const confirmOrderBtn = document.getElementById('confirm-order-btn');
const modalBackdrop = document.getElementById('modal-backdrop');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalItems = document.getElementById('modal-items');
const modalTotal = document.getElementById('modal-total');
const startNewOrderBtn = document.getElementById('start-new-order-btn');

let products = [];
const cart = new Map();

const formatCurrency = (value) => `$${value.toFixed(2)}`;

const getCartCount = () => {
  let total = 0;
  for (const quantity of cart.values()) {
    total += quantity;
  }
  return total;
};

const getOrderTotal = () => {
  return products.reduce((sum, product, index) => {
    const quantity = cart.get(index) || 0;
    return sum + quantity * product.price;
  }, 0);
};

const buildProductCard = (product, index) => {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.index = String(index);

  card.innerHTML = `
    <div class="product-media">
      <picture>
        <source media="(min-width: 761px)" srcset="${product.image.desktop}">
        <source media="(min-width: 481px)" srcset="${product.image.tablet}">
        <img src="${product.image.mobile}" alt="${product.name}">
      </picture>
      <button type="button" class="add-cart" aria-label="Add ${product.name} to cart">
        <img src="./assets/images/icon-add-to-cart.svg" alt="" aria-hidden="true">
        Add to Cart
      </button>
      <div class="qty-control" hidden>
        <button type="button" class="decrease" aria-label="Decrease ${product.name} quantity"></button>
        <span class="qty-value">1</span>
        <button type="button" class="increase" aria-label="Increase ${product.name} quantity"></button>
      </div>
    </div>
    <p class="product-category">${product.category}</p>
    <h3 class="product-name">${product.name}</h3>
    <p class="product-price">${formatCurrency(product.price)}</p>
  `;

  return card;
};

const renderProducts = () => {
  productGrid.innerHTML = '';

  products.forEach((product, index) => {
    productGrid.appendChild(buildProductCard(product, index));
  });

  updateProductControls();
};

const updateProductControls = () => {
  document.querySelectorAll('.product-card').forEach((card) => {
    const index = Number(card.dataset.index);
    const quantity = cart.get(index) || 0;

    const addButton = card.querySelector('.add-cart');
    const qtyControl = card.querySelector('.qty-control');
    const qtyValue = card.querySelector('.qty-value');

    if (quantity > 0) {
      card.classList.add('in-cart');
      addButton.hidden = true;
      qtyControl.hidden = false;
      qtyValue.textContent = String(quantity);
    } else {
      card.classList.remove('in-cart');
      addButton.hidden = false;
      qtyControl.hidden = true;
    }
  });
};

const renderCart = () => {
  const count = getCartCount();
  const total = getOrderTotal();

  cartTitle.textContent = `Your Cart (${count})`;
  orderTotal.textContent = formatCurrency(total);

  if (count === 0) {
    emptyCart.hidden = false;
    cartContent.hidden = true;
    cartItemsList.innerHTML = '';
    return;
  }

  emptyCart.hidden = true;
  cartContent.hidden = false;

  cartItemsList.innerHTML = '';

  products.forEach((product, index) => {
    const quantity = cart.get(index) || 0;
    if (quantity === 0) return;

    const subtotal = quantity * product.price;
    const item = document.createElement('li');
    item.className = 'cart-item';
    item.innerHTML = `
      <div class="cart-item-main">
        <img src="${product.image.thumbnail}" alt="">
        <div class="cart-item-details">
          <h3>${product.name}</h3>
          <div class="cart-meta">
            <span class="cart-qty">${quantity}x</span>
            <span class="cart-unit">@ ${formatCurrency(product.price)}</span>
            <span class="cart-subtotal">${formatCurrency(subtotal)}</span>
          </div>
        </div>
      </div>
      <button type="button" class="remove-item" data-index="${index}" aria-label="Remove ${product.name} from cart">
        <img src="./assets/images/icon-remove-item.svg" alt="" aria-hidden="true">
      </button>
    `;

    cartItemsList.appendChild(item);
  });
};

const openModal = () => {
  modalItems.innerHTML = '';

  products.forEach((product, index) => {
    const quantity = cart.get(index) || 0;
    if (quantity === 0) return;

    const subtotal = quantity * product.price;
    const item = document.createElement('li');
    item.className = 'modal-item';
    item.innerHTML = `
      <div class="modal-item-info">
        <img src="${product.image.thumbnail}" alt="">
        <div>
          <h3>${product.name}</h3>
          <div class="modal-item-meta">
            <span class="cart-qty">${quantity}x</span>
            <span class="cart-unit">@ ${formatCurrency(product.price)}</span>
          </div>
        </div>
      </div>
      <span class="modal-item-total">${formatCurrency(subtotal)}</span>
    `;

    modalItems.appendChild(item);
  });

  modalTotal.textContent = formatCurrency(getOrderTotal());
  modalBackdrop.hidden = false;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modalBackdrop.hidden = true;
  document.body.style.overflow = '';
};

const closeModalAndReset = () => {
  cart.clear();
  closeModal();
  updateProductControls();
  renderCart();
};

productGrid.addEventListener('click', (event) => {
  const target = event.target;
  const card = target.closest('.product-card');
  if (!card) return;

  const index = Number(card.dataset.index);

  if (target.closest('.add-cart')) {
    cart.set(index, 1);
  }

  if (target.closest('.increase')) {
    const quantity = cart.get(index) || 0;
    cart.set(index, quantity + 1);
  }

  if (target.closest('.decrease')) {
    const quantity = cart.get(index) || 0;
    if (quantity <= 1) {
      cart.delete(index);
    } else {
      cart.set(index, quantity - 1);
    }
  }

  updateProductControls();
  renderCart();
});

cartItemsList.addEventListener('click', (event) => {
  const button = event.target.closest('.remove-item');
  if (!button) return;

  const index = Number(button.dataset.index);
  cart.delete(index);

  updateProductControls();
  renderCart();
});

confirmOrderBtn.addEventListener('click', () => {
  if (getCartCount() === 0) return;
  openModal();
});

startNewOrderBtn.addEventListener('click', closeModalAndReset);

closeModalBtn.addEventListener('click', closeModal);

modalBackdrop.addEventListener('click', (event) => {
  if (event.target === modalBackdrop) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modalBackdrop.hidden) {
    closeModal();
  }
});

fetch('./data.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load product data.');
    }
    return response.json();
  })
  .then((data) => {
    products = data;
    renderProducts();
    renderCart();
  })
  .catch((error) => {
    productGrid.innerHTML = '<p>Unable to load products.</p>';
    console.error(error);
  });
