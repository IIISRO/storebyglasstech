$(document).ready(function() {
    function initializeSpectrum() {
        $("#preferredHex").spectrum({
            preferredFormat: "hex",
            showInput: true,
            showPalette: true,
            palette: [
                ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)"],
                ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
                ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)", "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)", "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)", "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
            ]
        });
    }

    // Initialize Spectrum on page load
    initializeSpectrum();

    // Reinitialize Spectrum on window resize to handle responsive changes if necessary
    $(window).resize(function() {
        $("#preferredHex").spectrum("destroy");
        initializeSpectrum();
    });
});

$("#preferredHex1").spectrum({
    preferredFormat: "hex",
    showInput: true,
    showPalette: true,
    palette: [
        ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
        "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
        "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
        "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
        "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
        "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
        "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
        "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
        "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
        "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
        "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
        "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
    ]
});
 
$( document ).ready(function() {
    $("#preferredHex").on('change', function(){
        var colorVal =  $("#preferredHex").val();
        let element2=document.querySelectorAll('.product-detail svg g path')
       
        for(let i=0;i<element2.length;i++){
            element2[i].style.fill=`${colorVal}`
        }
      });
          
})
$( document ).ready(function() {
    $("#preferredHex1").on('change', function(){
        var colorVal =  $("#preferredHex1").val();
        let element2=document.querySelector('.wall-overlay')
        element2.style.background=`${colorVal}`
       
      });
          
})

let btns=document.querySelectorAll(".frame-item")
let frame1=document.getElementById("main-frame1")
let frame1Img=document.querySelector("#main-frame1 img")
let frame=document.getElementById("main-frame")
let frameImg=document.querySelector("#main-frame img")
for(let i=0;i<btns.length;i++){
btns[i].addEventListener("click", () => {
    btns.forEach((btn) => btn.classList.remove("frameactive")); // Remove 'active' class from all buttons
    btns[i].classList.add("frameactive");
    console.log(btns[i].getAttribute("data-frame"));
    if(btns[i].getAttribute("data-frame")!=="none"){
    frame1.style.backgroundImage = `url(${btns[i].getAttribute("data-frame")})`;
    frame1.style.backgroundRepeat = "no-repeat";
    frame1.style.backgroundPosition = "center center";
    // Optionally, set the background size
    frame1.style.backgroundSize = "cover";
    }
    else{
        frame1.style.background="none"
    }

})}

for(let i=0;i<btns.length;i++){
    btns[i].addEventListener("click", () => {
        btns.forEach((btn) => btn.classList.remove("frameactive")); // Remove 'active' class from all buttons
        btns[i].classList.add("frameactive");
        console.log(btns[i].getAttribute("data-frame"));
        if(btns[i].getAttribute("data-frame")!=="none"){
        frame.style.backgroundImage = `url(${btns[i].getAttribute("data-frame")})`;
        frame.style.backgroundRepeat = "no-repeat";
        frame.style.backgroundPosition = "center center";
        // Optionally, set the background size
        frame.style.backgroundSize = "cover";
        }
        else{
            frame.style.background="none"
        }
    
    })}


let effects=document.querySelectorAll(".effect-item")    
for(let i=0;i<effects.length;i++){
    effects[i].addEventListener("click", () => {
        effects.forEach((btn) => btn.classList.remove("effectactive")); // Remove 'active' class from all buttons
        effects[i].classList.add("effectactive");
    frame1Img.style.filter = `grayscale(${effects[i].getAttribute("data-value")})`;
    
})}

for(let i=0;i<effects.length;i++){
    effects[i].addEventListener("click", () => {
        effects.forEach((btn) => btn.classList.remove("effectactive")); // Remove 'active' class from all buttons
        effects[i].classList.add("effectactive");
    frameImg.style.filter = `grayscale(${effects[i].getAttribute("data-value")})`;
    
      
    }
    )}


