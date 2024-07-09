async function fetchAndDisplayResults() {
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
        wishlistTable.innerHTML = `
     <thead>
                    <tr>
                        <th class="product-name" colspan="3">
                            <span class="nobr">
                                Product Name </span>
                        </th>
                       
                        <th class="product-add-to-cart">
                            <span class="nobr">
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody class="wishlist-items-wrapper" id="wishlist">`
        let wishlist = document.querySelector("#wishlist");
        wishlist.innerHTML = "";

        for (const item of results.items) {
            wishlist.innerHTML += `
      <tr>
                        <td class="product-thumbnail">
                            <a href="${item.product.url}">
                                <div class="frame-wishlist">
                                <img fetchpriority="high" decoding="async" 
                                    src="${item.product.image}"
                                    class="product-thumb" alt=""></div> </a>
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
                                <img
                                    src="${item.product.image}"
                                    class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt=""/> </div></a>
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

        wishlistTable.innerHTML += `<div class=" alert alert-danger mx-2 my-2 text-center text-md">Sevimlilər siyahınız boşdur</div>`
        wishlistMobile.innerHTML = `<div class=" alert alert-danger mx-2 my-2 text-center text-md">Sevimlilər siyahınız boşdur</div>`


    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayResults()

})
function removeWish(productid) {
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
        })

}
