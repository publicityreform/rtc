const nav=document.getElementById("nav");
const info=document.getElementById("info");

function menu() {
  nav.classList.toggle("rotate");
  info.classList.toggle("hidden");
}

function hide() {
  if (!info.classList.contains("hidden")){
  menu();
}
}