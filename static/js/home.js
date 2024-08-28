// document.addEventListener('DOMContentLoaded', function() {
//     // Function to adjust overlay height
//     function adjustOverlayHeight() {
//         const mainFrameImgs = document.querySelectorAll('.main-frame-img');
//         const glassOverlays = document.querySelectorAll('.glass-overlay');

//         mainFrameImgs.forEach((img, index) => {
//             const glassOverlay = glassOverlays[index];  // Match the corresponding overlay with the image
//             if (glassOverlay && img) {
//                 glassOverlay.style.height = img.clientHeight + 'px';  // Adjust overlay height
//                 console.log(`Adjusted height to ${img.clientHeight}px for overlay ${index}`);
//             } else {
//                 console.log(`No matching overlay for image ${index}`);
//             }
//         });
//     }

//     // Function to handle image loading
//     function handleImages() {
//         const mainFrameImgs = document.querySelectorAll('.main-frame-img');

//         const loadImages = Array.from(mainFrameImgs).map(img => 
//             new Promise((resolve) => {
//                 if (img.complete) {
//                     resolve();
//                 } else {
//                     img.onload = resolve;
//                 }
//             })
//         );

//         Promise.all(loadImages).then(() => {
//             adjustOverlayHeight();
//             console.log("All images loaded, overlays adjusted");
//         });
//     }

//     // Call the handleImages function to adjust heights
//     handleImages();

//     // Adjust height when the window is resized
//     window.addEventListener('resize', adjustOverlayHeight);

//     // Observe changes in the DOM if images or overlays are added dynamically
//     const observer = new MutationObserver(() => {
//         handleImages();
//     });

//     observer.observe(document.body, { childList: true, subtree: true });
// });


// function adjustImages() {
//     setTimeout(() => {
//         const frameMains = document.querySelectorAll('.frame-main');
        
//         frameMains.forEach(frameMain => {
//             const imgs = frameMain.querySelectorAll('.main-frame-img');
            
//             imgs.forEach(img => {
//                 if (img.complete) {
//                     adjustFrameHeight(frameMain, img);
//                 } else {
//                     img.onload = function() {
//                         adjustFrameHeight(frameMain, img);
//                     };
//                 }
//             });
//         });
//     }, 100); // Delay to allow the DOM to update
// }

// // Call this function whenever the page is loaded or navigated to
// adjustImages();


//     function adjustFrameHeight(frameMain, img) {
//         const frameMainHeight = frameMain.clientHeight;
//         const imgHeight = img.clientHeight;
//         console.log(frameMainHeight,imgHeight);

//         if (imgHeight < frameMainHeight-50) {
            
//             frameMain.style.height = 'unset';  // Unset height if image is smaller
//         } else {
            
//             frameMain.style.height = '100%';  // Set height to 100% if image is larger
//         }
//     }