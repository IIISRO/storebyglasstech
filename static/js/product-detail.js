$(document).ready(function() {
    function initializeSpectrum() {
        $("#preferredHex").spectrum({
            preferredFormat: "hex",
            showInput: false,
            showPalette: true,
            palette: [
                ["rgb(0,0,0)", "white", "red", "green", "blue"],
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
// ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)"],
// ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
// ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)", "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)", "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)", "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
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

// $( document ).ready(function() {
//     $("#preferredHex").on('change', function(){
//         var colorVal =  $("#preferredHex").val();
//         let element2=document.querySelectorAll('.sofa-section img')
       
//         for(let i=0;i<element2.length;i++){
//             element2[i].src=`${location.origin}/static/images/sofa-${colorVal}.png`
//         }
//       });
          
// })

$(document).ready(function() {
    // Predefined list of image filenames
    let imageList = [
        '000000.png',
        'ffffff.png',
        
    ];

    $("#preferredHex").on('change', function() {
        var colorVal = $("#preferredHex").val().replace('#', ''); 
        console.log(colorVal);
        
        let elements = document.querySelectorAll('.sofa-section img');

        // Construct the new image filename based on the selected color value
        let newImage = `${colorVal}.png`;
        console.log(newImage);
        
        // Check if the new image exists in the predefined list
        if (imageList.includes(newImage)) {
            elements.forEach(function(element) {
                element.src = `${location.origin}/static/images/${colorVal}.png`;
            });
        } else {
            console.warn("Image not found in the list for the selected color:", colorVal);
        }
    });
});


$( document ).ready(function() {
    $("#preferredHex1").on('change', function(){
        var colorVal =  $("#preferredHex1").val();
        let element2=document.querySelector('.wall-overlay')
        element2.style.background=`${colorVal}`
       
      });
          
})

// // let btns=document.querySelectorAll(".frame-item")
// // let frame1=document.getElementById("main-frame1")
// let mainImage1=document.querySelector("#main-frame1 img")
// let sizeSelector=document.querySelector(".selectpicker2")
// // let frame=document.getElementById("main-frame")
// let mainImage=document.querySelector("#main-frame img")
// document.addEventListener("DOMContentLoaded", function() {
//     const frameItems = document.querySelectorAll(".frame-item");
//     const mainFrame = document.getElementById("main-frame");
//     let mainFrame1=document.getElementById("main-frame1")

//     frameItems.forEach(item => {
//         item.addEventListener("click", function() {
//             // Remove active class from all frame items
//             frameItems.forEach(frame => frame.classList.remove("frameactive"));

//             // Add active class to the clicked frame item
//             this.classList.add("frameactive");

//             // Get the frame URL from the clicked frame item
//             const frameUrl = this.getAttribute("data-frame");

//             // Update the main frame background with the selected frame
//             if (frameUrl === "none") {
//                 mainFrame.style.backgroundImage = "none";
//                 mainFrame.style.background = "none"; 
//                 mainFrame1.style.backgroundImage = "none";
//                 mainFrame1.style.background = "none"; // Clear any background set by ::before
//             } else {
//                 mainFrame.style.background = `url(${frameUrl}) no-repeat center center`;
//                 mainFrame.style.backgroundSize = "cover";
//                 mainFrame1.style.background = `url(${frameUrl}) no-repeat center center`;
//                 mainFrame1.style.backgroundSize = "cover";
//             }
//         });
//     });
//     sizeSelector.addEventListener("change", function() {
//         const selectedSize = this.value.split("x");
//         const width = selectedSize[0];
//         const height = selectedSize[1];

//         // Update the main image size based on the selected option
//         mainFrame.style.width = width + "px";
//         mainFrame.style.height = height + "px";
//         mainFrame1.style.width = width + "px";
//         mainFrame1.style.height = height + "px";
//     });
// });



// let effects=document.querySelectorAll(".effect-item")    
// for(let i=0;i<effects.length;i++){
//     effects[i].addEventListener("click", () => {
//         effects.forEach((btn) => btn.classList.remove("effectactive")); // Remove 'active' class from all buttons
//         effects[i].classList.add("effectactive");
//     mainImage1.style.filter = `grayscale(${effects[i].getAttribute("data-value")})`;
    
// })}

// for(let i=0;i<effects.length;i++){
//     effects[i].addEventListener("click", () => {
//         effects.forEach((btn) => btn.classList.remove("effectactive")); // Remove 'active' class from all buttons
//         effects[i].classList.add("effectactive");
//     mainImage.style.filter = `grayscale(${effects[i].getAttribute("data-value")})`;
    
      
//     }
//     )}


let likeBtn=document.getElementById("like")
let likeIcon=document.querySelector("#like img")
likeBtn.addEventListener("click",()=>{
    let result=likeBtn.classList.toggle("active")
    if(result){
        likeIcon.style.filter="grayscale(0)"
        addWish(likeBtn.dataset.prod_id)
    }
    else{
        likeIcon.style.filter="grayscale(1)"
        removeWish(likeBtn.dataset.prod_id)

    }
})



document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.frame-list li button');
    const sizes = document.querySelectorAll('.size-element');
    const mainFrame = document.getElementById("main-frame");
    let mainFrame1=document.getElementById("main-frame1")
    let mainImage1=document.querySelector("#main-frame1 img")
    let mainImage=document.querySelector("#main-frame img")
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove the 'selected' class from all buttons
           
            buttons.forEach(btn => btn.classList.remove('selected'));

            // Add the 'selected' class to the clicked button
            button.classList.add('selected');
            
            const frameUrl = button.getAttribute("data-frame");

            // Update the main frame background with the selected frame
            if (frameUrl === "none") {
                mainFrame.style.backgroundImage = "none";
                mainFrame.style.background = "none"; 
                mainFrame.style.padding = "0"; 
                mainFrame1.style.backgroundImage = "none";
                mainFrame1.style.background = "none"; // Clear any background set by ::before
            } else {
                mainFrame.style.background = `url(${frameUrl}) no-repeat center center`;
                mainFrame.style.padding = `15px`;
                mainFrame.style.backgroundSize = "cover";
                mainFrame1.style.background = `url(${frameUrl}) no-repeat center center`;
                mainFrame1.style.backgroundSize = "cover";
            }
        });
    });

    
    
    // sizes.forEach(size => {
    //     console.log(size);
    //     size.addEventListener('click', () => {
    //         // Remove the 'selected' class from all buttons
    //         console.log(1);
    //         sizes.forEach(btn => btn.classList.remove('selected'));

    //         // Add the 'selected' class to the clicked button
    //         size.classList.add('selected');
    //         const selectedSize = size.getAttribute("data-size").split("*");
    //         const width = selectedSize[0];
    //         const height = selectedSize[1];

    //         // Update the main image size based on the selected option
    //         if(window.innerWidth<=767){
    //             // mainFrame.style.width = width*0.8 + "px";
    //             // mainFrame.style.height = height*0.8 + "px";
    //             mainFrame1.style.width = width*0.5 + "px";
    //             mainFrame1.style.height = height*0.5 + "px";
    //         }
    //         else{
    //             // mainFrame.style.width = width*0.8 + "px";
    //             // mainFrame.style.height = height*0.8 + "px";
    //             mainFrame1.style.width = width*0.8 + "px";
    //             mainFrame1.style.height = height*0.8 + "px";
    //         }
          
    //         console.log(width,height);
    //     });
    // });
   
});

let mainFrameImg=document.getElementById('main-frame-img')

let glassOverlay=document.getElementById("glass-overlay");
function adjustOverlayHeight() {
    glassOverlay.style.height = mainFrameImg.clientHeight + 'px';
  }
mainFrameImg.onload = function() {
    document.getElementById('loading-spinner').style.display = 'none';
    this.style.display = 'block';
    
    adjustOverlayHeight();
};
window.addEventListener('resize', adjustOverlayHeight);



