// Array untuk menyimpan item di keranjang
let cartItems = [];

// Biaya Admin
const adminFee = {
 id: 'admin-fee',
 image: 'img/biaya-admin.jpg', // Gambar biaya admin
 title: 'Biaya Admin Rp. 5.000',
 description: [
  'Biaya Admin ini untuk',
  'bantu saudara/i kita yang ada di Palestina.',
  'Jangan bersedih hati ya...... 😆'
 ],
 price: 5000,
 quantity: 1,
};

// Fungsi untuk memuat data dari LocalStorage dan SessionStorage
function loadCartFromStorage() {
 const savedSessionData = sessionStorage.getItem('cartItems');
 const savedLocalData = localStorage.getItem('cartItems');

 // Prioritaskan sessionStorage
 if (savedSessionData) {
  cartItems = JSON.parse(savedSessionData);
 } else if (savedLocalData) {
  cartItems = JSON.parse(savedLocalData);
  sessionStorage.setItem('cartItems', savedLocalData); // Simpan ke sessionStorage
 }


 // Perbarui tampilan keranjang
 updateCart();
}

// Fungsi untuk menyimpan data ke LocalStorage dan SessionStorage
function saveCartToStorage() {
 const cartData = JSON.stringify(cartItems);
 sessionStorage.setItem('cartItems', cartData);
 localStorage.setItem('cartItems', cartData);
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCart() {
 const cartContent = document.querySelector('.cart-content');
 const totalPriceElement = document.getElementById('total-harga');

 // Kosongkan konten keranjang sebelum diperbarui
 cartContent.innerHTML = '';

 let total = 0;

 cartItems.forEach(item => {
  total += item.price * item.quantity;

  // Buat elemen item di keranjang
  const cartBox = document.createElement('div');
  cartBox.classList.add('cart-box');

  if (item.new) {
   cartBox.classList.add('newItem')
   item.new = false;
  };

  cartBox.dataset.productId = item.id;

  // Generate HTML untuk biaya admin
  if (item.id === adminFee.id) {
   cartBox.innerHTML = `
                <img class="cart-img" src="${item.image}" alt="Biaya Admin">
                <div class="detail-box">
                    <div class="cart-product-title">${item.title}</div>
                    ${item.description.map(desc => `<div class="cart-type">${desc}</div>`).join('')}
                    <div class="cart-price">+ Rp. ${item.price.toLocaleString()}</div>
                </div>
            `;
  } else {
   // Generate HTML untuk item lain
   cartBox.innerHTML = `
                <img class="cart-img" src="${item.image}" alt="${item.title}">
                <div class="detail-box">
                    <div class="cart-product-title">${item.title}</div>
                    <div class="cart-price">Rp. ${(item.price * item.quantity).toLocaleString()}</div>
                    <div class="cart-quantity cart-quantity-adjust product-quantity">
                        <button class="cart-quantity-decrease" onclick="changeQuantity('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
                        <span class="cart-quantity-value">${item.quantity}</span>
                        <button class="cart-quantity-increase" onclick="changeQuantity('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <i class="fa-solid fa-trash-can cart-remove" onclick="removeCartItem('${item.id}')"></i>
            `;
  }

  cartContent.appendChild(cartBox);
 });

 // Tambahkan total harga ke elemen total
 totalPriceElement.textContent = `Rp. ${total.toLocaleString()}`;

 // Update jumlah total kuantitas di nav-item
 updateCartQuantity();
}

// Fungsi untuk menghitung total kuantitas produk di keranjang
function calculateTotalQuantity() {
 return cartItems.reduce((total, item) => total + item.quantity, 0);
}

// Fungsi untuk memperbarui tampilan jumlah kuantitas di cart icon
function updateCartQuantity() {
 const totalQuantity = calculateTotalQuantity();
 const cartQuantityElement = document.getElementById('open-cart');
 cartQuantityElement.textContent = ` ${totalQuantity}`; // Update jumlah kuantitas di cart
}

// Fungsi untuk menambahkan item ke keranjang
function addToCart(button) {
 const menuItem = button.closest('.menu-item');

 const itemId = menuItem.dataset.food || menuItem.dataset.drink;

 // Periksa apakah item sudah ada di keranjang
 const existingItem = cartItems.find(item => item.id === itemId);

 if (existingItem) {
  existingItem.quantity += 1;
 } else {
  const item = {
   id: itemId,
   image: menuItem.querySelector('.menu-img').src,
   title: menuItem.querySelector('.menu-title').textContent,
   price: parseInt(menuItem.querySelector('.menu-price').textContent.replace('Rp ', '').replace('.', '')),
   quantity: 1
  };

  // Tambahkan item baru ke array cartItems
  cartItems.push(item);
 }

 // Simpan perubahan ke storage
 saveCartToStorage();

 // Perbarui tampilan keranjang
 updateCart();
}

// Fungsi untuk mengubah kuantitas item di keranjang
function changeQuantity(itemId, change) {
 const item = cartItems.find(item => item.id === itemId);
 if (item) {
  item.quantity += change;

  // Jika kuantitas menjadi 0, hapus item dari keranjang
  if (item.quantity <= 0) {
   removeCartItem(itemId);
  } else {
   // Simpan perubahan ke storage
   saveCartToStorage();

   // Perbarui tampilan keranjang
   updateCart();
   animationCartLoad();
  }
 }
}

// Fungsi untuk menghapus item dari keranjang
async function removeCartItem(itemId) {
 if (itemId === adminFee.id) return; // Tidak bisa menghapus biaya admin

 cartItems = cartItems.filter(item => item.id !== itemId);

 // Simpan perubahan ke storage
 saveCartToStorage(itemId);

 await animationDeleteItems(itemId);

 setTimeout(() => {
  updateCart();
  animationCartLoad();
 }, 610);
}

async function animationDeleteItems(itemID) {
 const cartBox = document.querySelectorAll(".cart-content .cart-box");

 cartBox.forEach(box => {
  if (box.dataset.productId == itemID) {
   box.classList.add('delete');
   box.style = 'animation: pulse 0.5s ease-in-out infinite;';

   setTimeout(() => {
    box.style = '';
   }, 610)
  }
 });
}

// Event listener untuk tombol "Beli Sekarang"
document.querySelectorAll('.buy-button').forEach(button => {
 button.addEventListener('click', () => addToCart(button));
});

// Muat data saat halaman dimuat
window.addEventListener('load', loadCartFromStorage);

function createCartAnimation(button) {
 const menuItem = button.closest('.menu-item');
 const productImg = menuItem.querySelector('.menu-img');
 const buttonRect = button.getBoundingClientRect();
 const cartIcon = document.getElementById('open-cart');
 const cartRect = cartIcon.getBoundingClientRect();

 // Efek ripple pada tombol
 const ripple = document.createElement('div');
 ripple.className = 'ripple';
 button.appendChild(ripple);
 setTimeout(() => ripple.remove(), 500);

 // Buat elemen gambar untuk animasi
 const movingImg = document.createElement('img');
 movingImg.src = productImg.src;
 movingImg.className = 'moving-item';
 movingImg.style.opacity = '0';

 movingImg.style.zIndex = '2';

 // Set posisi awal
 movingImg.style.top = `${buttonRect.top}px`;
 movingImg.style.left = `${buttonRect.left}px`;
 document.body.appendChild(movingImg);

 // Animasi pop-up awal
 requestAnimationFrame(() => {
  movingImg.style.animation = 'addToCartPop 0.5s forwards';
  movingImg.style.opacity = '1';

  // Setelah animasi pop-up, mulai animasi ke keranjang
  setTimeout(() => {
   movingImg.style.top = `${cartRect.top + 10}px`;
   movingImg.style.left = `${cartRect.left - 20}px`;
   movingImg.style.transform = 'scale(0.3) rotate(360deg)';
   movingImg.style.opacity = '0';

   // Efek shake pada icon keranjang
   setTimeout(() => {
    cartIcon.classList.add('cart-shake');
    setTimeout(() => {
     cartIcon.classList.remove('cart-shake');
    }, 500);
   }, 600);

  }, 500);
 });

 // Hapus elemen setelah animasi selesai
 setTimeout(() => {
  movingImg.remove();
 }, 1300);
}

// Modifikasi fungsi addToCart
function addToCart(button) {
 const menuItem = button.closest('.menu-item');
 const itemId = menuItem.dataset.food || menuItem.dataset.drink;

 // Nonaktifkan tombol sementara
 button.disabled = true;
 button.style.opacity = '0.7';

 // Buat animasi
 createCartAnimation(button);

 // Delay penambahan item ke cart
 setTimeout(() => {
  const existingItem = cartItems.find(item => item.id === itemId);

  if (existingItem) {
   existingItem.quantity += 1;
  } else {
   const item = {
    id: itemId,
    image: menuItem.querySelector('.menu-img').src,
    title: menuItem.querySelector('.menu-title').textContent,
    price: parseInt(menuItem.querySelector('.menu-price').textContent.replace('Rp ', '').replace('.', '')),
    quantity: 1,
    new: true
   };
   cartItems.push(item);
  }

  // Aktifkan kembali tombol
  button.disabled = false;
  button.style.opacity = '1';

  saveCartToStorage();
  updateCart();
  animationCartLoad();
 }, 1300);
}

function animationCartLoad() {
 const cartBox = document.querySelectorAll(".cart-content .cart-box");

 cartBox.forEach(box => {
  if (!box.classList.contains('newItem')) {
   box.classList.add('show');
  } else {
   box.style = 'animation: moveRight 0.5s ease-out forwards, pulse 0.5s ease-in-out infinite;';

   setTimeout(() => {
    box.style = '';
    box.classList.add('show');
   }, 550);
  };
 });
}

// Tambahkan event listener untuk efek hover pada tombol
document.querySelectorAll('.buy-button').forEach(button => {
 button.addEventListener('mouseover', () => {
  button.style.transform = 'scale(1.05)';
  button.style.transition = 'transform 0.3s ease';
 });

 button.addEventListener('mouseout', () => {
  button.style.transform = 'scale(1)';
 });
});

