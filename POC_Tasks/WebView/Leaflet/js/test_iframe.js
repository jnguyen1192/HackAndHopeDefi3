
window.onload = function() {
  let link = document.createElement("link");
  link.href = "../css/test_iframe.css";     
  link.rel = "stylesheet"; 
  link.type = "text/css"; 
  frames[0].document.head.appendChild(link); // 0 is an index of your iframe 
}