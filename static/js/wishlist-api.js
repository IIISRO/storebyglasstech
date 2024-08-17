async function fetchAndDisplayResults() {
    loader.show()

    let apiUrl = new URL(`${location.origin}/api/v1/account/wishlist/`)

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    let results = await response.json();

    let wishlistTable = document.querySelector("#wishlist-table");
    let wishlistMobile = document.querySelector("#wishlist-mobile");


    if (results.items.length > 0) {
        wishlistMobile.innerHTML = ""
        wishlistTable.innerHTML = 
        `
            <thead>
                <tr>
                    <th class="product-name" colspan="3">
                        <span class="nobr">${transProduct} </span>
                    </th>
                    
                    <th class="product-add-to-cart">
                        <span class="nobr">
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody class="wishlist-items-wrapper" id="wishlist">
        `
        let wishlist = document.querySelector("#wishlist");
        wishlist.innerHTML = "";

        for (const item of results.items) {
            wishlist.innerHTML +=
            `
            <tr>
                <td class="product-thumbnail">
                    <a href="${item.product.url}">
                        <div class="frame-wishlist">
                        
                            
                            ${    
                                (function checkType() {
                                if(item.product.type==='MDF'){
                                    let framInfo = 
                                    `
                                        <img fetchpriority="high" decoding="async" 
                            src="${item.product.image}"
                            class="product-thumb main-frame-img" alt="">
                                    `
                                    return framInfo

                                }
                                else{
                                    let framInfo = 
                                    `
                                    <div class="frame-main">
                          <div class="glass-overlay"><img src="/static/images/shadow11.png" alt=""></div> 
                          <img fetchpriority="high" class="cart-thumbnail main-frame-img" id="" src="${item.product.image}" alt=""> 
                          </div>
                                  
                                    `
                                    return framInfo

                                }
                                return ''
                                })()
                            }
                            </div> </a>
                </td>
                <td class="product-name text-center">
                    <a class="" href="${item.product.url}">
                        ${item.product.title} </a>
                </td>
                
                <td class="product-add-to-cart">

                    <div class="view-btn-wrap d-flex justify-content-end">
                        <a href="${item.product.url}" class="button-view"><i class="fa fa-eye"></i><span class="tooltip">Quick
                                View</span></a>

                        <a href=""  data-id="${item.product.id}" class="add-to-cart removeFromWishlist"><i class="fa fa-trash text-white"></i></a>
                    </div>
                </td>
            </tr>
      `

            wishlistMobile.innerHTML += `
     <li>
                    <div class="item-wrapper">
                        <div class="product-thumbnail">
                            <a href="${item.product.url}">
                                <div class="frame-wishlist-mobile">
                                
                                 ${    
                                (function checkType() {
                                if(item.product.type==='MDF'){
                                    let framInfo = 
                                    `
                                        <img fetchpriority="high" decoding="async" 
                            src="${item.product.image}"
                            class="product-thumb" alt="">
                                    `
                                    return framInfo

                                }
                                else{
                                    let framInfo = 
                                    `
                                    <div class="frame-main">
                          <div class="glass-overlay" id="glass-overlay"><img src="/static/images/shadow11.png" alt=""></div> 
                          <img fetchpriority="high" class="cart-thumbnail" id="main-frame-img" src="${item.product.image}" alt=""> 
                          </div>
                                  
                                    `
                                    return framInfo

                                }
                                return ''
                                })()
                            }
                                     </div></a>
                        </div>

                        <div class="item-details">
                            <div class="product-name">
                                <h3>
                                    <a
                                        href="${item.product.url}">
                                        ${item.product.title} </a>
                                </h3>
                            </div>

                           
                        </div>
                    </div>

                    <div class="additional-info-wrapper">
                        
                        <!-- Add to cart button -->
                        <div class="product-add-to-cart">
                            <a href="#" class="button-view"><i class="fa fa-eye"></i><span class="tooltip">Quick
                                View</span></a>

                        <a href="" data-id=${item.product.id} class="add-to-cart removeFromWishlist"><i class="fa fa-trash"></i></a>
                        </div>

                       
                    </div>
                </li>`



        }
        wishlistTable.append(wishlist)
        wishlistTable.innerHTML += `
            
                </tbody>
         `
        let removeBtns = document.querySelectorAll('.removeFromWishlist')
        for (let i = 0; i < removeBtns.length; i++) {
            removeBtns[i].addEventListener('click', () => {
                removeWish(removeBtns[i].dataset.id)
            })
        }
    }
    else {

        wishlistTable.innerHTML += `<div class=" alert alert-danger mx-2 my-2 text-center text-md">${transEmptyWish}</div>`
        wishlistMobile.innerHTML = `<div class=" alert alert-danger mx-2 my-2 text-center text-md">${transEmptyWish}</div>`


    }
    loader.hide()
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayResults()

})
function removeWish(productid) {
    loader.show()
    fetch(`/api/v1/account/wishlist/remove/${productid}/`, {
        method: "post",
        headers: {
            "X-CSRFToken": csrf,
            "Accept": "application/json",
            'Content-Type': 'application/json'
        }
    })
        .finally(() => {
            wishCounter();
            loader.hide()
        })

}
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
