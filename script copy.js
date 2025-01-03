const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.nav');

menuToggle.addEventListener('click', function () {
 navbar.classList.toggle('show-menu');
});

// SEND EMAIL
const nameMail = document.getElementById('name');
const emailMail = document.getElementById('email');
const numberMail = document.getElementById('number-call');
const msgMail = document.getElementById('msg');
const submitEmail = document.getElementsByClassName('contactForm')[0];

function isValidEmail(email) {
 const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
 return emailRegex.test(email);
}
function isValidPhoneNumber(phoneNumber) {
 const phoneRegex = /^(\+62|08)/;
 return phoneRegex.test(phoneNumber);
}

submitEmail.addEventListener('submit', async (e) => {
 e.preventDefault();
 const subjectCustomer = `Suara ke Coffe Wak Lekman yang anda berikan nih!`;
 const fromAddress = `test@mg-test.marsell.my.id`
 const messageDeveloper = `
      <html>
      <head>
          <style>
              p {
                  font-family: Arial, sans-serif; /* Ganti jenis font sesuai keinginan Anda */
                  font-size: 16px; /* Ganti ukuran font sesuai keinginan Anda */
                  color: #333; /* Ganti warna font sesuai keinginan Anda */
                  font-weight: bold; /* Ganti gaya teks sesuai keinginan Anda */
              }
          </style>
      </head>
      <body>
        <p>Dari ${emailMail.value}, no hp: ${numberMail.value}:</p>
        <p>${msgMail.value}</p>
      </body>
      </html>
    `;

 const dataToDeveloper = {
  from: `test@mg-test.marsell.my.id`,
  to: `231220108@unmuhpnk.ac.id`,
  subject: `Coffee Wak Lekman`,
  html: messageDeveloper,
 };
 const dataToCustomer = {
  from: fromAddress,
  to: emailMail.value,
  subject: subjectCustomer,
  text: `
        ${msgMail.value}
      `,
 };

 // DEVELOPER
 await fetch('https://api.mailgun.net/v3/mg-test.marsell.my.id/messages', {
  method: 'POST',
  headers: {
   'Authorization': 'Basic ' + btoa('api:272fc4b61804dd4d4419a79abbdbfb2b-2e68d0fb-5d6f0b85')
  },
  body: new URLSearchParams(dataToDeveloper)
 })
  .then(response => {
   if (response.ok) {
    alert('OK! Email Sent!')
    // showPopup("notif", "", "Email terkirim!", "Terimakasih buat kamu yang sudah mengirim feedback atau keluhan yang kamu alami");
   } else {
    alert('Gagal mengirim email. (Developer)');
   }
  })
  .catch(error => {
   console.error('Error:', error);
   alert('Terjadi kesalahan dalam mengirim email.');
  });

 // CUSTOMER
 await fetch('https://api.mailgun.net/v3/mg-test.marsell.my.id/messages', {
  method: 'POST',
  headers: {
   'Authorization': 'Basic ' + btoa('api:272fc4b61804dd4d4419a79abbdbfb2b-2e68d0fb-5d6f0b85')
  },
  body: new URLSearchParams(dataToCustomer)
 })
  .then(response => {
   if (response.ok) {
    console.log("OK")
   } else {
    console.log("Gabisa kirim email")
   }
  })
  .catch(error => {
   console.log('Terjadi kesalahan dalam mengirim email.');
   console.error('Error:', error);
  });
 // }
})

//! Shop Cart Open Button
const cartContainer = document.querySelector(".cart-container");
const nav = document.querySelector(".nav");
openCart = document.querySelector("#open-cart");
closeCart = document.querySelector("#close-cart");
openCart.onclick = () => {
 cartContainer.classList.add("openCart");
 nav.classList.add("cartOpen");
};
closeCart.onclick = () => {
 cartContainer.classList.remove("openCart");
 nav.classList.remove("cartOpen");
};

//! BELANJA
var hargaBajuOutput = [];
var hargaEstimasi, idEstimasi, hargaLayanan, idLayanan, hargaUkuran, idUkuran, hargaBajuDicuci, idBajuDicuci = 0;

function validate() {
 if (hargaBajuDicuci == undefined || hargaBajuDicuci == "") {
  hargaBajuDicuci = "0";
 }
 if (idBajuDicuci == 0) {
  idBajuDicuci = "";
 }
 if (hargaEstimasi == undefined) {
  hargaEstimasi = "";
 }
 if (idEstimasi == undefined) {
  idEstimasi = "";
 }
 if (hargaLayanan == undefined) {
  hargaLayanan = "";
 }
 if (idLayanan == undefined) {
  idLayanan = "";
 }
 if (hargaUkuran == undefined) {
  hargaUkuran = "";
 }
 if (idUkuran == undefined) {
  idUkuran = "";
 }
}

function getDataFromDropdown(id) {
 hargaEstimasi, idEstimasi, hargaLayanan, idLayanan, hargaUkuran, idUkuran, hargaBajuDicuci, idBajuDicuci = 0;
 // Estimation Section
 var est = document.querySelector(`#estimation${id}`);
 function estChange() {
  //if (est == null || est == undefined) return;
  var harga = est.options[est.selectedIndex].value;
  var tulisan = est.options[est.selectedIndex].text;
  //var id = est.options[est.selectedIndex].id;
  var id = est.options[est.selectedIndex].id.slice(est.options[est.selectedIndex].id.indexOf(">") + 1, est.options[est.selectedIndex].id.lastIndexOf("<"))
  //console.log(hargaEstimasii, tulisanEstimasii, idEstimasii);
  //console.log(est.options[est.selectedIndex].id.slice(id.indexOf(">")+1, id.lastIndexOf("<")))
  hargaEstimasi = harga;
  idEstimasi = id;
 }

 // Service/Layanan Section
 var service = document.querySelector(`#service-item${id}`);
 function serChange() {
  if (service == null || service == undefined) return;
  var harga = service.value;
  var tulisan = service.options[service.selectedIndex].text;
  var id = service.options[service.selectedIndex].id;
  //console.log(value, text, idtext);
  hargaLayanan = harga;
  idLayanan = id;
 }

 // Ukuran barang Section
 var sizeBaju = document.querySelector(`#ukuran-barang-dicuci${id}`);
 function ukuranChange() {
  if (sizeBaju == null || sizeBaju == undefined) return;
  var harga = sizeBaju.value;
  var tulisan = sizeBaju.options[sizeBaju.selectedIndex].text;
  var id = sizeBaju.options[sizeBaju.selectedIndex].id;
  //console.log(sizeBaju);
  hargaUkuran = harga;
  idUkuran = id;
 }

 // Baju Section
 var baju = document.querySelector(`#barang-dicuci${id}`);
 function bajuChange() {
  if (baju === null || baju == undefined) return;
  var harga = baju.value;
  var tulisan = baju.options[baju.selectedIndex].text;
  var id = baju.options[baju.selectedIndex].id;
  //console.log(value, text, idtext);
  hargaBajuDicuci = harga;
  idBajuDicuci = id;
 }

 validate()

 serChange();
 estChange();
 ukuranChange();
 bajuChange();
}

let hargaTotal = 0;
function confirm(id, key, customDataLaundry, dontSaveSesionStorage, dontGateDataFrmDropdown, quantityProduk) {
 if (!dontGateDataFrmDropdown) {
  getDataFromDropdown(id);
 }

 //console.log(hargaBajuDicuci, idBajuDicuci, hargaEstimasi, idEstimasi, hargaLayanan, idLayanan, hargaUkuran, idUkuran);

 // Pentotalan harga
 hargaTotal = 0;
 let mergeHarga = [Number(hargaEstimasi), Number(hargaBajuDicuci), Number(hargaLayanan), Number(hargaUkuran)];

 for (let i = 0; i < mergeHarga.length; i++) {
  hargaTotal += mergeHarga[i];
 } 
 const selectedOptions = {
  estimasi: `${idEstimasi}`,
  ukuran: `${idUkuran}`,
  layanan: `${idLayanan}`,
  bajudicuci: `${idBajuDicuci}`,
 }
 const hargaBaju = {
  hargaestimasi: `${hargaEstimasi}`,
  hargaukuran: `${hargaUkuran}`,
  hargalayanan: `${hargaLayanan}`,
  hargabajudicuci: `${hargaBajuDicuci}`,
 }

 hargaBajuOutput = hargaBaju;
 console.log(key, customDataLaundry, selectedOptions, hargaBajuOutput, dontSaveSesionStorage, quantityProduk)
 addToCart(key, customDataLaundry, selectedOptions, hargaBajuOutput, dontSaveSesionStorage, quantityProduk)
}

// function mergeDataBeforeToCart() {
//   var mergeDataDesc = "";
//   if (idBajuDicuci !== "") {
//     mergeDataDesc += `${idBajuDicuci}`;
//     mergeDataDesc += ",";
//   }
//   if (idEstimasi !== "") {
//     mergeDataDesc += `${idEstimasi},`;
//   }
//   if (idLayanan != "") {
//     mergeDataDesc += `${idLayanan}`;
//   }
//   if (idUkuran != "") {
//     mergeDataDesc += ",";
//     mergeDataDesc += `${idUkuran}`;
//   }

//   //console.log(mergeDataDesc);
// }

// Cart list
const cartList = [];
//{
// const keepQuantity = [
//   {
//     no: 0,
//     id: 0,
//     quantity: 1,
//   }
// ];
// const cartListTemp = [];
// let QuantityDatabase = 0;
// let countCheck = 0;
// let countAllProduct = 0;
// let countQuantitySubject = 0;
// let countQuantity = 1;

// const checkFunction = (a, b) => {
//   return JSON.stringify(a) === JSON.stringify(b);
// }
// function clearArray(array) {
//   while (array.length > 0) {
//     array.pop();
//   }
// }

// }

// ADD PRODUCT TO CART
// function addToCart(key, customDataLaundry) {
//   var result = cartList.find(({ id_penting }) => id_penting === `${key}`);
//   let cartCount = cartList.length;
//   countAllProduct = cartCount;

//   // CHECKER ARRAY
//   if (result != undefined) {
//     if ((customDataLaundry == 0)) {
//       keepQuan = keepQuantity.find(({ id }) => id === `${laundrydata[key]}`);
//       cartListTemp[0] = JSON.parse(JSON.stringify(laundrydata[key]));
//     } else {
//       keepQuan = keepQuantity.find(({ id }) => id === `${custom_product_laundry[key]}`);
//       cartListTemp[0] = JSON.parse(JSON.stringify(custom_product_laundry[0]));
//     }
//     cartListTemp[0].urutan = countAllProduct - 1;
//     cartListTemp[0].Estimasi = idEstimasi;
//     cartListTemp[0].idLayanan = idLayanan;
//     cartListTemp[0].idUkuran = idUkuran;
//     cartListTemp[0].hargaTotalDisplay = `Rp. ${hargaTotal}`;
//     cartListTemp[0].hargaTotal = hargaTotal;
//     cartListTemp[0].quantity = keepQuantity[0].quantity;
//     // console.log(cartListTemp, cartList, checkFunction(cartList, cartListTemp))
//     //console.log(sameMembers(`${result}`, `${cartListTemp[0]}`))

//     if (checkFunction(cartList, cartListTemp) == true) {
//       cartList[cartListTemp[0].urutan].quantity += 1
//       keepQuantity[0].no = 0;
//       keepQuantity[0].id = result.id;
//       keepQuantity[0].quantity = countQuantity + 1
//       console.log(keepQuantity)

//       countQuantity = cartList[countAllProduct].quantity
//       // console.log(result.id)
//       reloadCart()
//     }
//     console.log("cart list temp:", cartListTemp)
//     console.log(result.id)
//     console.log("Keep Quantity:", keepQuantity[0].id)
//     // if (result.id != keepQuantity[0].id) {
//     //   console.log("Woi ga sama")
//     // }
//     console.log(checkFunction(cartList, cartListTemp))
//   }

//   // TO CART
//   if (result != undefined) {
//     // console.log(result.urutan)

//     console.log(result);

//   } else {
//     if ((customDataLaundry == 0)) {
//       //console.log("Yea, 0")
//       cartList[countAllProduct] = JSON.parse(JSON.stringify(laundrydata[key]));
//     } else {
//       //console.log("Yea, 1")
//       cartList[countAllProduct] = JSON.parse(JSON.stringify(custom_product_laundry[0]));
//     }
//     cartList[countAllProduct].urutan = countAllProduct
//     cartList[countAllProduct].Estimasi = idEstimasi;
//     cartList[countAllProduct].idLayanan = idLayanan;
//     cartList[countAllProduct].idUkuran = idUkuran;
//     cartList[countAllProduct].hargaTotalDisplay = `Rp. ${hargaTotal}`;
//     cartList[countAllProduct].hargaTotal = hargaTotal;

//     if (idBajuDicuci != '') {
//       cartList[countAllProduct].product_name = `${idBajuDicuci}`
//     }
//     cartList[countAllProduct].quantity = 1;
//   console.log("cartlist", cartList)

//   //console.log(key, customDataLaundry, countAllProduct)
//   reloadCart();
//   }
// }

async function sesionStorageManager1(addOrremove, productId, productName, productPrice, productPriceDisplay, serviceType, quantity, processingTime, size, keyy, dataKey, productimg, selectedOptions, selectedOptionsPrice, realPrice, estimasiText) {
 if (addOrremove === "add") {
  const productToAdd = [];

  console.log(addOrremove, productId, productName, productPrice, productPriceDisplay, serviceType, quantity, processingTime, size, keyy, dataKey, productimg, selectedOptions, selectedOptionsPrice, realPrice, estimasiText)

  const productToAddd = {
   id: productId,
   key: keyy,
   dataKey: dataKey,
   productImage: productimg,
   name: productName,
   layanan: serviceType,
   berapaLama: processingTime,
   ukuran: size,
   price: productPrice,
   realPrice: realPrice,
   priceOnDisplay: productPriceDisplay,
   quantity: quantity,
   selectedOptions: selectedOptions,
   selectedOptionsPrice: selectedOptionsPrice,
  };

  productToAdd.push(productToAddd)

  // if (productimg) if (productimg.includes("biaya-admin")) {
  //  // const productToAddd = `
  //  //  id: productId,
  //  //  key: keyy,
  //  //  dataKey: dataKey,
  //  //  product_image: productimg,
  //  //  name: productName,
  //  //  layanan: serviceType,
  //  //  berapaLama: processingTime,
  //  //  ukuran: size,
  //  //  price: productPrice,
  //  //  realPrice: realPrice,
  //  //  priceOnDisplay: productPriceDisplay,
  //  //  quantity: quantity,
  //  //  selectedOptions: selectedOptions,
  //  //  selectedOptionsPrice: selectedOptionsPrice,
  //  // `;
  //  const productToAddd = {
  //   id: productId,
  //   key: keyy,
  //   dataKey: dataKey,
  //   productImage: productimg,
  //   name: productName,
  //   layanan: serviceType,
  //   berapaLama: processingTime,
  //   ukuran: size,
  //   price: productPrice,
  //   realPrice: realPrice,
  //   priceOnDisplay: productPriceDisplay,
  //   quantity: quantity,
  //   selectedOptions: selectedOptions,
  //   selectedOptionsPrice: selectedOptionsPrice,
  //  };
  //  // const jsonString = productToAddd.replace(/`/g, '"');
  //  // const jsonStringWithoutTrailingComma = jsonString.replace(/,\s*$/, '');
  //  // console.log(jsonString, jsonStringWithoutTrailingComma, `{${jsonStringWithoutTrailingComma}}`)
  //  // const test = JSON.parse(`{${jsonStringWithoutTrailingComma}}`)
  //  // productToAdd = productToAddd
  //  productToAdd.push(productToAddd)
  // } else {
  //  const productToAddd = {
  //   id: productId,
  //   key: keyy,
  //   dataKey: dataKey,
  //   productImage: productimg,
  //   name: productName,
  //   layanan: serviceType,
  //   berapaLama: processingTime,
  //   ukuran: size,
  //   price: productPrice,
  //   realPrice: realPrice,
  //   priceOnDisplay: productPriceDisplay,
  //   quantity: quantity,
  //   selectedOptions: selectedOptions,
  //   selectedOptionsPrice: selectedOptionsPrice,
  //  };
  //  // const productToAddd = `
  //  //  id: productId,
  //  //  key: keyy,
  //  //  dataKey: dataKey,
  //  //  product_image: productimg,
  //  //  name: productName,
  //  //  layanan: serviceType,
  //  //  berapaLama: processingTime,
  //  //  ukuran: size,
  //  //  price: productPrice,
  //  //  realPrice: realPrice,
  //  //  priceOnDisplay: productPriceDisplay,
  //  //  quantity: quantity,
  //  //  selectedOptions: selectedOptions,
  //  //  selectedOptionsPrice: selectedOptionsPrice,
  //  // `;
  //  // productToAdd = productToAddd
  //  productToAdd.push(productToAddd)
  // }

  let cartItems = JSON.parse(sessionStorage.getItem(`cart${productId}`)) || [];

  const existingProductIndex = cartItems.findIndex(
   (item) => item.id === productToAdd[0].id && item.layanan === productToAdd[0].layanan && item.berapaLama === productToAdd[0].berapaLama && item.ukuran === productToAdd[0].ukuran && item.name === productToAdd[0].name
  );
  // console.log(existingProductIndex, productToAdd, cartItems, cartItems.findIndex(item => item.id === productToAdd[0].id))

  console.log(existingProductIndex)
  // await wait(2)

  if (existingProductIndex !== -1) {
   cartItems[existingProductIndex].quantity = productToAdd[0].quantity;
   cartItems[existingProductIndex].price = productToAdd[0].quantity * cartItems[0].realPrice;
   // cartItems[existingProductIndex].realPrice = cartItems[existingProductIndex].price;
   cartItems[existingProductIndex].priceOnDisplay = cartItems[existingProductIndex].price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
   // console.log(cartItems[existingProductIndex])
  } else {
   cartItems.push(productToAdd[0]);
  }
  // console.log(cartItems)

  sessionStorage.setItem(`cart${productId}`, JSON.stringify(cartItems));
 }
 if (addOrremove === "remove") {
  let cartItems = JSON.parse(sessionStorage.getItem(`cart${productId}`)) || [];

  const productIndexToRemove = cartItems.findIndex(
   (item) => item.id === productId && item.key === keyy
  );

  if (productIndexToRemove !== -1) {
   cartItems.splice(productIndexToRemove, 1);
  }

  if (!cartItems.length) {
   sessionStorage.removeItem(`cart${productId}`)
  } else {
   sessionStorage.setItem(`cart${productId}`, JSON.stringify(cartItems));
  }
 }
}

function addToCart(key, customDataLaundry, selectedOptions, selectedOptionsPrice, dontSaveSesionStorage, quantityProduk) {
 let newItem;

 if (customDataLaundry === 0) {
  newItem = JSON.parse(JSON.stringify(laundrydata[key]));
 } else {
  newItem = JSON.parse(JSON.stringify(custom_product_laundry[0]));
 }

 newItem.keyKe = key;
 newItem.dataKey = customDataLaundry
 newItem.urutan = cartList.length;
 newItem.Estimasi = idEstimasi;
 newItem.idLayanan = idLayanan;
 newItem.idUkuran = idUkuran;
 // newItem.hargaTotalDisplay = `Rp. ${hargaTotal.toLocaleString()}`;
 newItem.hargaTotal = hargaTotal;
 newItem.product_price = hargaTotal
 if (!quantityProduk) {
  newItem.quantity = 1;
 } else {
  newItem.quantity = quantityProduk
 }

 if (idBajuDicuci != '') {
  newItem.product_name = `${idBajuDicuci}`
 }

 newItem.selectedOptions = selectedOptions;
 newItem.selectedOptionsPrice = selectedOptionsPrice;
 const totalProductPrice = calculateProductTotalPrice(newItem, newItem.selectedOptionsPrice);

 newItem.hargaTotalDisplay = `Rp. ${totalProductPrice.toLocaleString() || hargaTotal.toLocaleString()}`;

 const existingProductIndex = cartList.findIndex((item) => {
  if (item.id === newItem.id) {
   // Compare selected options to ensure they are the same
   return JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions);
  }
  return false;
 });

 if (existingProductIndex !== -1) {
  cartList[existingProductIndex].quantity += 1;
 } else {
  cartList.push(newItem);
 }

 const product = getProductById(newItem.id);
 updatePrices(newItem.id, product.quantity, hargaBajuOutput);

 // Reload the cart
 reloadCart();

 if (!dontSaveSesionStorage) {
  sesionStorageManager1("add", newItem.id, newItem.product_name, newItem.hargaTotal, newItem.hargaTotalDisplay, newItem.selectedOptions.layanan, product.quantity, newItem.Estimasi, newItem.idUkuran, key, customDataLaundry, newItem.product_image, selectedOptions, selectedOptionsPrice, newItem.product_price)
 }

}

function calculateTotalPrice() {
 let totalPrice = 0;
 cartList.forEach((product) => {
  totalPrice += product.hargaTotal;
 });

 // Simpan total harga keseluruhan ke dalam variabel hargaTotal
 hargaTotal = totalPrice;

 // Perbarui tampilan total harga di halaman Anda
 updateTotalPriceDisplay();
}

function changeQuantity(index, newQuantity) {
 if (newQuantity < 1) {
  return;
 }

 const product = cartList[index];

 product.quantity = newQuantity;
 const totalProductPrice = calculateProductTotalPrice(product, product.selectedOptionsPrice);

 product.hargaTotal = totalProductPrice;
 product.hargaTotalDisplay = `Rp. ${totalProductPrice.toLocaleString()}`;

 calculateTotalPrice();

 reloadCart();
 // console.log(product)
 sesionStorageManager1("add", product.id, product.product_name, product.hargaTotal, product.hargaTotalDisplay, product.selectedOptions.layanan, product.quantity, product.Estimasi, product.idUkuran)
}

function removeCartItem(productId, keyy) {
 const productIndex = cartList.findIndex((item) => item.id === productId);
 if (productIndex !== -1) {
  sesionStorageManager1("remove", productId, "", "", "", "", "", "", "", keyy)
  updatePrices(productId, 0, hargaBajuOutput)
  cartList.splice(productIndex, 1);
  reloadCart();
 }
}

function reloadCart() {
 const cartContent = document.querySelector(".cart-content");
 cartContent.innerHTML = "";
 // console.log(cartList)

 cartList.forEach((value, key) => {
  if (value != null) {
   const cartShopBox = document.createElement("div");
   cartShopBox.classList.add("cart-box");
   var behaviorProductName = "";

   if (value.product_name == "Sepatu") {
    behaviorProductName = "(2 Pasang Sepatu)"
   }
   // console.log(value)

   // console.log(value.product_image)
   if (!value.product_image.includes("biaya-admin")) {
    cartShopBox.innerHTML = `
        <img class="cart-img" src="/image/${value.product_image}" alt="">
        <div class="detail-box">
        <div class="cart-product-title">${value.product_name} <span style="font-size: 10px;">${behaviorProductName}</span></div>
        <div class="cart-type">Est: ${value.Estimasi}</div>
        <div class="cart-type">Service: ${value.idLayanan}</div>
        <div class="cart-type">Size: ${value.idUkuran}</div>
        <div class="cart-price">${value.hargaTotalDisplay}</div>
        <div class="product-quantity">
         <button onclick="changeQuantity(${key}, ${value.quantity - 1})"><i class="fa-solid fa-minus"></i></button>
         <div class="count-quantity">${value.quantity}</div>
          <button onclick="changeQuantity(${key}, ${value.quantity + 1})"><i class="fa-solid fa-plus"></i></button>
         </div>
        </div>
        <i class="fa-solid fa-trash-can cart-remove" onclick="removeCartItem(${value.id}, ${value.keyKe})"></i>
    `;
   } else {
    cartShopBox.innerHTML = `
        <img class="cart-img" src="/image/${value.product_image}" alt="">
        <div class="detail-box">
        <div class="cart-product-title">${value.product_name}</div>
        <div class="cart-type">${value.Estimasi}</div>
        <div class="cart-type">${value.idLayanan}</div>
        <div class="cart-type">${value.idUkuran}</div>
        <div class="cart-price">${value.hargaTotalDisplay}</div>
        <!-- <div class="product-quantity">
         <button onclick="changeQuantity(${key}, ${value.quantity - 1})"><i class="fa-solid fa-minus"></i></button>
         <div class="count-quantity">${value.quantity}</div>
          <button onclick="changeQuantity(${key}, ${value.quantity + 1})"><i class="fa-solid fa-plus"></i></button>
         </div>
        </div>
        <i class="fa-solid fa-trash-can cart-remove" onclick="removeCartItem(${value.id}, ${value.keyKe})"></i> -->
    `;
   }

   cartContent.appendChild(cartShopBox);
  }
 });

 updateTotalPriceDisplay();
}

if (!sessionStorage.getItem("pajak") || !localStorage.getItem("pajak")) {
 sessionStorage.setItem("pajak", 5000)
}

if (!sessionStorage.getItem("cart500")) {
 sesionStorageManager1("add", 500, "Biaya Admin Rp. 5.000,00", 5000, "+ Rp. 5.000,00", "membantu mengembangkan Blaundry lebih maju lagi. Jangan", 1, "", "", "0", "0", "biaya-admin.jpg", "", "", 5000)
}

if (sessionStorage.getItem("pajak") || localStorage.getItem("pajak")) {
 let newItemm;
 newItemm = JSON.parse(JSON.stringify(laundrydata[0]));
 newItemm.product_image = "biaya-admin.jpg"
 newItemm.product_name = "Biaya Admin Rp. 5.000,00"
 newItemm.Estimasi = "Biaya Admin ini untuk"
 newItemm.idLayanan = "membantu mengembangkan Blaundry lebih maju lagi. Jangan"
 newItemm.idUkuran = "bersedih hati ya...... 😆"
 newItemm.hargaTotalDisplay = "+ Rp. 5.000,00"
 newItemm.hargaTotal = 5000
 newItemm.id = 500
 newItemm.quantity = 1
 cartList.push(newItemm)
 console.log(cartList)
}

const cartItems_new = [];
const cartItems_extract = [];

for (let i = 0; i < sessionStorage.length; i++) {
 const key = sessionStorage.key(i);

 if (key.includes("cart")) {
  const itemValue = sessionStorage.getItem(key);
  const cartItem = itemValue ? JSON.parse(itemValue) : [];
  // console.log(cartItem[0])
  cartItems_new.push(cartItem)
  // parsedData.push(JSON.parse(itemValue))
  // cartItems.push({ key, value: itemValue });
 }
}

if (cartItems_new.length == 0) {
 for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);

  if (key.includes("cart")) {
   const itemValue = localStorage.getItem(key);
   const cartItem = itemValue ? JSON.parse(itemValue) : [];
   sessionStorage.setItem(key, itemValue)
   cartItems_new.push(cartItem)
   // parsedData.push(JSON.parse(itemValue))
   // cartItems.push({ key, value: itemValue });
  }
 }
} else {
 addToLocalStrg()
}

cartItems_new.forEach((value, key) => {
 cartItems_new[key].forEach((value, key) => {
  cartItems_extract.push(value)
  console.log(cartItems_extract)
 })
})

function pushToCartFromSesionStorage() {
 cartItems_extract.forEach((value, key) => {
  idEstimasi = value.selectedOptions.estimasi
  idUkuran = value.selectedOptions.ukuran
  idLayanan = value.selectedOptions.layanan
  idBajuDicuci = value.selectedOptions.bajudicuci
  hargaEstimasi = value.selectedOptionsPrice.hargaestimasi
  hargaUkuran = value.selectedOptionsPrice.hargaukuran
  hargaLayanan = value.selectedOptionsPrice.hargalayanan
  hargaBajuDicuci = value.selectedOptionsPrice.hargabajudicuci

  timerReloadCart(2)
  if (value.id == 500) return;
  validate()
  confirm(value.id, value.key, value.dataKey, "1", "1", value.quantity)
 });
}
window.addEventListener("load", pushToCartFromSesionStorage);

async function timerReloadCart(timer) {
 await wait(timer);
 reloadCart()
}

// *************************************

function updateTotalPriceDisplay() {
 const totalHargaElement = document.getElementById("total-harga"); // Ganti dengan ID elemen total harga yang sesuai
 totalHargaElement.textContent = `Rp. ${hargaTotal.toLocaleString()}`;
}

function getProductById(productId) {
 return cartList.find((product) => product.id === productId);
}

function updatePrices(productId, newQuantity, selectedOptions) {
 const product = getProductById(productId);

 if (product) {
  if (selectedOptions != undefined) {
   product.quantity = newQuantity
   product.hargaTotal = calculateProductTotalPrice(product, selectedOptions)
  } else {
   product.hargaTotal = product.product_price * newQuantity;
  }
  // if (selectedOptions !=)
  // Perbarui harga produk berdasarkan quantity baru

  // Perbarui harga keseluruhan dari semua produk dalam keranjang
  calculateTotalPrice();

  // Perbarui tampilan keranjang
  reloadCart();
 }
}

function calculateProductTotalPrice(product, selectedOptions) {
 // Dapatkan harga dasar produk dari properti product_price
 const basePrice = product.product_price;

 // Dapatkan harga opsi yang dipilih dari selectedOptions
 const estimasiPrice = selectedOptions.estimasi || 0;
 const ukuranPrice = selectedOptions.ukuran || 0;
 const layananPrice = selectedOptions.layanan || 0;
 const bajudicuciPrice = selectedOptions.bajudicuci || 0;

 // Hitung harga total produk berdasarkan kuantitas dan harga opsi yang dipilih
 const total = (basePrice + estimasiPrice + ukuranPrice + layananPrice + bajudicuciPrice) * product.quantity;

 return total;
}