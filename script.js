{{const menuToggle = document.querySelector('.menu-toggle');
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
 if (cartContainer.classList.contains('openCart')) return;
 cartContainer.classList.add("openCart");
 nav.classList.add("cartOpen");

 const cartBox = document.querySelectorAll(".cart-content .cart-box");

 setTimeout(() => {
  cartBox.forEach(box => {
   box.classList.add('show');
  });
 }, 500);
};

closeCart.onclick = () => {
 if (!cartContainer.classList.contains('openCart')) return;

 const cartBox = document.querySelectorAll(".cart-content .cart-box");

 if (cartBox.length > 0) {
  cartBox.forEach(box => {
   box.classList.remove('show');
  });
  
  setTimeout(() => {
   cartContainer.classList.remove("openCart");
   nav.classList.remove("cartOpen");
  }, 500);
 } else {
  cartContainer.classList.remove("openCart");
  nav.classList.remove("cartOpen");
 };
};}}