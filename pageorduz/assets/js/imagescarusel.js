console.log('entro')
const carusel = document.querySelector(".carousel"),
firstImg = carusel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevPageX, prevScrollLeft;
let firstImgWidth = firstImg.clientWidth + 14;
let scrollWidth = carusel.scrollWidth - carusel.clientWidth;
const showHideIcons = ()=>{
    arrowIcons[0].style.display = carusel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carusel.scrollLeft == scrollWidth ? "none" : "block";
}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () =>{
        carusel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => {
            showHideIcons();
        }, 60);
    })
})

const dragStart = (e) =>{
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carusel.scrollLeft;
}
const dragging = (e) =>{
    if(!isDragStart) return;
    e.preventDefault();
    carusel.classList.add("dragging")
    let positionDiff = e.pageX - prevPageX;
    carusel.scrollLeft = prevScrollLeft -positionDiff;
    showHideIcons();
}

const dragStop = () =>{
    isDragStart = false;
    carusel.classList.remove("dragging")
}
carusel.addEventListener("mousedown", dragStart);
carusel.addEventListener("mousemove", dragging);
carusel.addEventListener("mouseup", dragStop);