// Dark/Light mode toggle
const themeBtn = document.getElementById("theme-toggle");
function setTheme(dark) {
  document.body.classList.toggle("dark-mode", dark);
  themeBtn.textContent = dark ? "🌙" : "☀️";
  localStorage.setItem("oldmoney-theme", dark ? "dark" : "light");
}
themeBtn.onclick = () => setTheme(!document.body.classList.contains("dark-mode"));
(function() {
  const saved = localStorage.getItem("oldmoney-theme");
  setTheme(saved === "dark");
})();