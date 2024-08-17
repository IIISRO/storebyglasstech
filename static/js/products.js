let mdf=document.getElementById("mdf")
let glass=document.getElementById("glass")
let mdfText=document.querySelector("#mdf span")
let glassText=document.querySelector("#glass span")

mdf.addEventListener("click",()=>{
    if(mdf.classList.contains("col-6")){
        mdf.classList.add("col-10")
        mdf.classList.add("bg-light")
    mdf.classList.remove("col-6")
    glass.classList.add("col-2")
    glass.classList.remove("col-6")
    glassText.classList.add("d-none")
    }
    else{
        mdf.classList.add("col-10")
        mdf.classList.add("bg-light")
        glass.classList.remove("bg-light")
    mdf.classList.remove("col-2")
    glass.classList.add("col-2")
    glass.classList.remove("col-10")
    mdfText.classList.remove("d-none")
    glassText.classList.add("d-none")
    }
    
})
glass.addEventListener("click",()=>{
    if(glass.classList.contains("col-6")){
        glass.classList.add("col-10")
        glass.classList.add("bg-light")
        glass.classList.remove("col-6")
    mdf.classList.add("col-2")
    mdf.classList.remove("col-6")
    
    mdfText.classList.add("d-none")
    }
    else{
        glass.classList.add("col-10")
    glass.classList.remove("col-2")
    mdf.classList.add("col-2")
    mdf.classList.remove("bg-light")
    glass.classList.add("bg-light")
    mdf.classList.remove("col-10")
    glassText.classList.remove("d-none")
    mdfText.classList.add("d-none")
    }
})



// function createPagination(totalPages, currentPage) {
//     const paginationContainer = document.getElementById('pagination');
//     paginationContainer.innerHTML = '';

//     const ul = document.createElement('ul');
//     ul.className = 'pagination';

//     // Previous Button
//     const prevLi = document.createElement('li');
//     prevLi.innerHTML = '<i class="fa fa-chevron-left"></i>';
//     prevLi.className = currentPage === 1 ? 'disabled' : '';
//     prevLi.addEventListener('click', () => {
//         if (currentPage > 1) {
//             createPagination(totalPages, currentPage - 1);
//         }
//     });
//     ul.appendChild(prevLi);

//     // First Page
//     const firstPageLi = document.createElement('li');
//     firstPageLi.innerHTML = '1';
//     firstPageLi.className = currentPage === 1 ? 'active' : '';
//     firstPageLi.addEventListener('click', () => {
//         createPagination(totalPages, 1);
//     });
//     ul.appendChild(firstPageLi);

//     // Dots before currentPage if necessary
//     if (currentPage > 3) {
//         const dotsLi = document.createElement('li');
//         dotsLi.innerHTML = '...';
//         ul.appendChild(dotsLi);
//     }

//     // Pages around currentPage
//     for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
//         const pageLi = document.createElement('li');
//         pageLi.innerHTML = i;
//         pageLi.className = currentPage === i ? 'active' : '';
//         pageLi.addEventListener('click', () => {
//             createPagination(totalPages, i);
//         });
//         ul.appendChild(pageLi);
//     }

//     // Dots after currentPage if necessary
//     if (currentPage < totalPages - 2) {
//         const dotsLi = document.createElement('li');
//         dotsLi.innerHTML = '...';
//         ul.appendChild(dotsLi);
//     }

//     // Last Page
//     if (totalPages > 1) {
//         const lastPageLi = document.createElement('li');
//         lastPageLi.innerHTML = totalPages;
//         lastPageLi.className = currentPage === totalPages ? 'active' : '';
//         lastPageLi.addEventListener('click', () => {
//             createPagination(totalPages, totalPages);
//         });
//         ul.appendChild(lastPageLi);
//     }

//     // Next Button
//     const nextLi = document.createElement('li');
//     nextLi.innerHTML = '<i class="fa fa-chevron-right"></i>';
//     nextLi.className = currentPage === totalPages ? 'disabled' : '';
//     nextLi.addEventListener('click', () => {
//         if (currentPage < totalPages) {
//             createPagination(totalPages, currentPage + 1);
//         }
//     });
//     ul.appendChild(nextLi);

//     paginationContainer.appendChild(ul);
// }

// // Initialize Pagination with total pages and current page
// createPagination(10, 1);

document.addEventListener('DOMContentLoaded', function() {
    // Function to adjust overlay height
    function adjustOverlayHeight() {
        const mainFrameImgs = document.querySelectorAll('.main-frame-img');
        const glassOverlays = document.querySelectorAll('.glass-overlay');

        mainFrameImgs.forEach((img, index) => {
            const glassOverlay = glassOverlays[index];  // Match the corresponding overlay with the image
            if (glassOverlay && img) {
                glassOverlay.style.height = img.clientHeight + 'px';  // Adjust overlay height
                console.log(`Adjusted height to ${img.clientHeight}px for overlay ${index}`);
            } else {
                console.log(`No matching overlay for image ${index}`);
            }
        });
    }

    // Function to handle image loading
    function handleImages() {
        const mainFrameImgs = document.querySelectorAll('.main-frame-img');

        const loadImages = Array.from(mainFrameImgs).map(img => 
            new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                }
            })
        );

        Promise.all(loadImages).then(() => {
            adjustOverlayHeight();
            console.log("All images loaded, overlays adjusted");
        });
    }

    // Call the handleImages function to adjust heights
    handleImages();

    // Adjust height when the window is resized
    window.addEventListener('resize', adjustOverlayHeight);

    // Observe changes in the DOM if images or overlays are added dynamically
    const observer = new MutationObserver(() => {
        handleImages();
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
