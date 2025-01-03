//! UNIVERSAL
const sections = document.querySelectorAll('section');
const navLinks = Array.from(document.querySelectorAll('.header .container .nav .nav-links li a'));

function findElementWithHashAttribute(nodes, dataToSearch) {
 for (let i = 0; i < nodes.length; i++) {
  const node = nodes[i];

  if (node.attributes['data-goto'].value == dataToSearch) {
   // console.log(node.attributes['data-goto'].value, dataToSearch)
   return i;
  }
 }
 return -1;
}

function scrollToSection(id) {
 if (id == "#") {
  smoothScrollTo(0, 1000, id);
  return;
 }

 const element = document.querySelector(id);

 if (element) {
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - (window.innerHeight / 2) + (element.clientHeight / 2);

  smoothScrollTo(offsetPosition, 500, id);
 }
}

function smoothScrollTo(targetY, duration, id) {
 const startY = window.pageYOffset;
 const differenceY = targetY - startY;
 let startTime = null;

 function animationStep(currentTime) {
  const targetLink = navLinks.find(link => link.dataset.goto === id);
  if (targetLink) navLinks.forEach(link => link.parentElement.classList.remove('active'));
  targetLink && targetLink.parentElement.classList.add('active');

  if (startTime === null) startTime = currentTime;
  const timeElapsed = currentTime - startTime;
  const progress = Math.min(timeElapsed / duration, 1);
  const easeInOutQuad = progress < 0.5
   ? 2 * progress * progress
   : -1 + (4 - 2 * progress) * progress;

  window.scrollTo(0, startY + differenceY * easeInOutQuad);

  if (timeElapsed < duration) {
   window.requestAnimationFrame(animationStep);
  }
 }

 window.requestAnimationFrame(animationStep);
}

//! NAVBAR
const list = document.querySelectorAll('.list');
var indexActiveNavbar;

function activeLink() {
 const thisNavbarItemLI = this.querySelector('a');

 list.forEach((item, index) => {
  if (item.className.includes('active')) indexActiveNavbar = index;
  item.classList.remove('active');
 })
 this.classList.add('active');

 if (thisNavbarItemLI.dataset.backtocurrent) {
  list.forEach((item, index) => {
   item.classList.remove('active');
   if (index == indexActiveNavbar) item.classList.add('active')
  })
 }

 if (this.querySelector('a').dataset.goto) {
  setTimeout(() => {
   scrollToSection(this.querySelector('a').dataset.goto)
   // location.href = `${this.querySelector('a').dataset.goto}`
  }, 500);
 }
}

list.forEach((item) => {
 item.addEventListener('click', activeLink);
})

//! NAVBAR UPDATE ITEM <a></a>
window.onscroll = () => {
 const top = window.scrollY;
 let foundMatch = false;

 sections.forEach(section => {
  // const offset = section.offsetTop - 150;
  const offset = section.offsetTop - 190;
  const height = section.offsetHeight;
  const id = section.getAttribute('id');

  if (top >= offset && top < offset + height) {
   const targetLink = navLinks.find(link => link.dataset.goto === `#${id}`);
   if (targetLink) navLinks.forEach(link => link.parentElement.classList.remove('active'));
   targetLink && targetLink.parentElement.classList.add('active');
   (targetLink) ? foundMatch = true : '';
  }
 });

 setTimeout(() => {
  if (!foundMatch) {
   const activeLink = navLinks.find(link => link.dataset.goto === '#');
   navLinks.forEach(link => link.parentElement.classList.remove('active'));
   activeLink && activeLink.parentElement.classList.add('active');
  }
 }, 50);
};