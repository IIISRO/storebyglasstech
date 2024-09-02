$(document).ready(function () {
    var loader_L = document.getElementById('loading-spinner3');
    loader_L.style.display = 'none';
    var imageList = [
        '000000.png',
        'ffffff.png',
        '0000ff.png',
        '980000.png',
        '00ff00.png',
        '00ffff.png',
        '1c4587.png',
        '3c78d8.png',
        '3d85c6.png',
        '4a86e8.png',
        '4c1130.png',
        '5b0f00.png',
        '6aa84f.png',
        '6d9eeb.png',
        '6fa8dc.png',
        '7f6000.png',
        '8e7cc3.png',
        '9fc5e8.png',
        '76a5af.png',
        '93c47d.png',
        '274e0a.png',
        '674ea7.png',
        '783f04.png',
        '9900ff.png',
        '20124d.png',
        '45818e.png',
        '073763.png',
        '434343.png',
        '660000.png',
        '666666.png',
        'a2c4c9.png',
        'a4c2f4.png',
        'a61c00.png',
        'a64d79.png',
        'b4a7d6.png',
        'b6d7a8.png',
        'c9daf8.png',
        'c27ba0.png',
        'cc0000.png',
        'cc4125.png',
        'cfe2f3.png',
        'd0e0e3.png',
        'd5a6bd.png',
        'd9d2e9.png',
        'd9d9d9.png',
        'd9ead3.png',
        'dd7e6b.png',
        'e1ff00.png',
        'e6b8af.png',
        'e06666.png',
        'e10000.png',
        'e19900.png',
        'e69138.png',
        'ea9999.png',
        'ead1dc.png',
        'f1c232.png',
        'f4cccc.png',
        'f6b26b.png',
        'f9cb9c.png',
        'fce5cd.png',
        'ff00ff.png',
        'ffd966.png',
        'ffe599.png',
        'fff2cc.png',
        'ffff00.png',

    ];
    function initializeSpectrum() {
        $("#preferredHex").spectrum({
            preferredFormat: "hex",
            showInput: false,
            showPalette: true,
            palette: [
                [
                    '#000000',
                    '#ffffff',
                    '#0000ff',
                    '#980000',
                    '#00ff00',
                    '#00ffff',
                    '#1c4587',
                    '#3c78d8',
                    '#3d85c6',
                    '#4a86e8',
                    '#4c1130',
                    '#5b0f00',
                    '#6aa84f',
                    '#6d9eeb',
                    '#6fa8dc',
                    '#7f6000',
                    '#8e7cc3',
                    '#9fc5e8',
                    '#76a5af',
                    '#93c47d',
                    '#274e0a',
                    '#674ea7',
                    '#783f04',
                    '#9900ff',
                    '#20124d',
                    '#45818e',
                    '#073763',
                    '#434343',
                    '#660000',
                    '#666666',
                    '#a2c4c9',
                    '#a4c2f4',
                    '#a61c00',
                    '#a64d79',
                    '#b4a7d6',
                    '#b6d7a8',
                    '#c9daf8',
                    '#c27ba0',
                    '#cc0000',
                    '#cc4125',
                    '#cfe2f3',
                    '#d0e0e3',
                    '#d5a6bd',
                    '#d9d2e9',
                    '#d9d9d9',
                    '#d9ead3',
                    '#dd7e6b',
                    '#e1ff00',
                    '#e6b8af',
                    '#e06666',
                    '#e10000',
                    '#e19900',
                    '#e69138',
                    '#ea9999',
                    '#ead1dc',
                    '#f1c232',
                    '#f4cccc',
                    '#f6b26b',
                    '#f9cb9c',
                    '#fce5cd',
                    '#ff00ff',
                    '#ffd966',
                    '#ffe599',
                    '#fff2cc',
                    '#ffff00',

                ]],

            move: function(color) {
             
                
                var colorVal = color.toHexString().replace('#', '');
            
                let element = document.getElementById('sofaImage');
                
            
                let newImage = `${colorVal}.png`;
                
            
                if (imageList.includes(newImage)) {
                    // Show the loader
                    loader_L.style.display = 'block';
                    
                    // Set the image source
                    element.src = `${location.origin}/static/images/${colorVal}.png`;
                    tabContent.style.display="none"
            
                    // Listen for the image load event to hide the loader
                    element.onload = function () {
                        loader_L.style.display = 'none';
                        tabContent.style.display = 'block';
                    };
            
                    // Handle any error if the image fails to load
                    element.onerror = function () {
                        loader_L.style.display = 'none';
                        console.error("Failed to load image:", newImage);
                    };
            
                } else {
                    console.warn("Image not found in the list for the selected color:", colorVal);
                }
            }
        });
    }

    initializeSpectrum();

    $(window).resize(function () {
        $("#preferredHex").spectrum("destroy");
        initializeSpectrum();
    });
});
$(document).ready(function () {
    $("#preferredHex1").spectrum({
        preferredFormat: "hex",
        showInput: true,
        showPalette: true,
        palette: [
            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)"],
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
        ],
        move: function(color) {
            var colorVal = color.toHexString(); // Get the selected color in hex format
            let element2 = document.querySelector('.wall-overlay');
            if (element2) {
                element2.style.background = colorVal; // Update the background color
            } else {
                console.warn("Element with class 'wall-overlay' not found.");
            }
        }
    });
});



let likeBtn = document.getElementById("like")
let likeIcon = document.querySelector("#like img")
likeBtn.addEventListener("click", () => {
    let result = likeBtn.classList.toggle("active")
    if (result) {
        likeIcon.style.filter = "grayscale(0)"
        addWish(likeBtn.dataset.prod_id)
    }
    else {
        likeIcon.style.filter = "grayscale(1)"
        removeWish(likeBtn.dataset.prod_id)

    }
})



document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.frame-list li button');
    const sizes = document.querySelectorAll('.size-element');
    const mainFrame = document.getElementById("main-frame");
    let mainFrame1 = document.getElementById("main-frame1")
    let mainImage1 = document.querySelector("#main-frame1 img")
    let mainImage = document.querySelector("#main-frame img")

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


});

let mainFrameImg = document.getElementById('main-frame-img')
mainFrameImg.onload = function () {

    document.getElementById('loading-spinner').style.display = 'none';
    this.style.display = 'block';

};
let tabContent = document.getElementById('tab-content2');
let sofaImg = document.getElementById('sofaImage');
let frameImg = document.getElementById('main-frame-image');
let loadingSpinner = document.getElementById('loading-spinner2');

document.addEventListener('DOMContentLoaded', function () {
    const profileTab = document.getElementById('pills-profile-tab');

    profileTab.addEventListener('shown.bs.tab', function () {
        loadingSpinner.style.display = 'block';
        tabContent.style.display = 'none';

        const checkImagesLoaded = () => {
            if (sofaImg.complete && frameImg.complete) {
                loadingSpinner.style.display = 'none';
                tabContent.style.display = 'block';
            }
        };

        setTimeout(() => {
            checkImagesLoaded();
        }, 1000);

        if (!sofaImg.complete) {
            sofaImg.onload = checkImagesLoaded;
        }
        if (!frameImg.complete) {
            frameImg.onload = checkImagesLoaded;
        }
    });

   
});
