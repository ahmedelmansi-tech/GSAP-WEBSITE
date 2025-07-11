

const log = console.log;
/*-------------------------------------------------*/ 


// Declracion
let mouseCursur = document.getElementById("circle--pointer");
let hamburgerMenu = document.getElementById("hamburger");
let navigationPage = document.querySelector(".nav--site .nav-page")


// intial X and Y 
let currentX = 0 , currentY = 0;

// mouse Handling
document.addEventListener("mousemove", handleMuseMove)
hamburgerMenu.addEventListener("click", handleToggleClass)



// handdlig Active class 
function handleToggleClass(){
    let isActive = hamburgerMenu.classList.toggle("active");
    navigationPage.classList.toggle("active");

    gsap.to(".nav-page", {
        duration:1,
        display: isActive ? "block" : "none",
        opacity: isActive ? 1 : 0
    })

    let flashOverLay = document.createElement('div');
    flashOverLay.classList.add("flash");
    navigationPage.appendChild(flashOverLay);


    gsap.to(flashOverLay , {
        duration : 1,
        opacity:0,
        ease:"power3.in",
        onComplete: () => flashOverLay.remove()
    })


    gsap.from(".nav-page .about-work li a" , {
        duration: 1,
        y:99,
        opacity:0,
        stagger:.5
    })

    
}



// Handling Scrolling Effect on text 
const flexItems = document.querySelectorAll(".flex .flex-item");
// log(text)
flexItems.forEach((fItem)=>{
        gsap.timeline({
        scrollTrigger:{
            trigger:fItem,
            start:"top 90%",
            end:"bottom 50%",
            scrub:3
        }
    }).fromTo(fItem.querySelectorAll(".text span"),{
        yPercent:38,
        xPercent:21,
        rotate:-10,
        duration:3
    },{
        yPercent:-9,
        xPercent:5,
        rotate:0,
        
    }).to(fItem.querySelectorAll(".text span"),{
        y:-54.7862,
        x:193.563,
        scrub:1,
        ease:"power3.inOut"
    }, "-=.2")

})


// handling scrolling effect on hero Section 
// document.querySelector("hero-section")

let hero = document.querySelector(".title-hero-section");

gsap.to(".title-hero-section", {
    scrollTrigger:{
        trigger:".sec",
        start:"start bottom",
        end:"+=300",
        scrub:2,
        markers:{
            startColor:"red",
            endColor:"red",
            indent:20
        } 
    },
     y:-20,
    transform:"skew(1deg,-10deg)",
    ease:"power2.out"
})











function handleMuseMove (e){
    
let burgerStyles = hamburgerMenu.getBoundingClientRect();

function mouseMoving(){
    currentX = e.clientX;
    currentY = e.clientY;
    // define the cursur motion
    mouseCursur.style.top = `${currentY}px`;
    mouseCursur.style.left = `${currentX}px`;
}


// dimention of the menu
let offsetX = currentX - burgerStyles.left + (burgerStyles.width / 2);
let offsetY = currentY - burgerStyles.top + (burgerStyles.height / 2);
let theDistance = Math.hypot(offsetX, offsetY);
hamburgerMenu.style.transform = theDistance < 130 ? `translate(${offsetX / 5}px, ${offsetY / 5}px)` : `translate(0px,0px)`
// log(`theDistance is = ${theDistance}`)
requestAnimationFrame(mouseMoving);



function updateCursurAppearnce(){

let isClose = theDistance < 120;
let hideCursur = theDistance < 90;
let linkesWorkAbout = Array.from(document.querySelectorAll(".nav-page .about-work li a")).some((aTag) => aTag.matches(":hover"));

let h1Hovred = document.querySelector(".title-hero-section h1")?.matches(":hover");

mouseCursur.style.backgroundColor = (isClose || h1Hovred || linkesWorkAbout) ? `var(--white-color)` : ``;
mouseCursur.style.width =  mouseCursur.style.height =  (isClose || h1Hovred || linkesWorkAbout) ? "100px" : "60px";


// Hide The Cursur Arrow
hamburgerMenu.style.cursor = hideCursur ? "none" : "pointer"; 


// log(hideCursur , isClose)
} 
updateCursurAppearnce()

}






