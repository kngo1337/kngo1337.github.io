const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */
for (var i=1;i<=5;i++){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/pic'+i+'.jpg');
    thumbBar.appendChild(newImage);
    newImage.addEventListener("click", onClickImage);    
}

function onClickImage(newImage){
    const image = newImage.target.getAttribute("src");
    displayedImage.setAttribute("src", image);
}

/* Wiring up the Darken/Lighten button */
btn.onclick = function(){
    const darkNLight = btn.getAttribute("class")
    if (darkNLight === "light") {
        btn.setAttribute("class", "dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgba(0, 0 , 0, 0)";
      } else {
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgba(0, 0 , 0, 0.5)";
      }
}