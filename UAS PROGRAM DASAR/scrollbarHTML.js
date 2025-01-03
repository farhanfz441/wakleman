// Target root element untuk mengatur CSS variables
const root = document.documentElement;

// Tambahkan event listener untuk hover pada HTML
document.addEventListener("mouseenter", () => {
 root.style.setProperty(
  "--scrollbar-thumb-bg",
  "linear-gradient(45deg,rgb(128, 26, 51),rgb(141, 132, 141))"
 );
 root.style.setProperty(
  "--scrollbar-thumb-box-shadow",
  "0 0 15px #ff0040"
 );
});

// Kembalikan ke warna default saat tidak di-hover
document.addEventListener("mouseleave", () => {
 root.style.setProperty(
  "--scrollbar-thumb-bg",
  "linear-gradient(145deg, #800000, #797979)"
 );
 root.style.setProperty(
  "--scrollbar-thumb-box-shadow",
  "0 0 10px #800000"
 );
});
