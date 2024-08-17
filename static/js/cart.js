function getBasketItems(){
    loader.show()
    var api_url = basketAPI

    async function Products(api_url=api_url) {
        const response = await fetch(api_url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
        
        return response.json(); // parses JSON response into native JavaScript objects
    }
    
    
    Products(api_url)
    .then((data) => {
        if (data.items.length > 0){
            const itemsArea = $("#productsStartLine")
            itemsArea.html('');
            let items = data.items
            for(let item of items){
                itemHTML = `  
                <tr class="cart_item">
                    <td class="product-thumbnail">
                        <a href="${item.product.url}">
                            <div class="frame-cart">
                            ${    
                                (function checkType() {
                                if(item.product.type==='MDF'){
                                    let framInfo = 
                                    `
                                     <img fetchpriority="high" 
                                src="${item.product.image}"
                                class="cart-thumbnail main-frame-img"  alt="">
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
                          </div></a>
                    </td>

                    <td class="product-name" data-title="Product">
                        <a
                            href="${item.product.url}" class="mb-3 d-block">
                            ${item.product.title} | ${item.product.type}</a>
                        <dl class="variation">
                            <dt class="variation-PosterSize">${transSize}:</dt>
                            <dd class="variation-PosterSize">
                                <p>${item.size.height}x${item.size.width}</p>
                            </dd>
                            ${    
                                (function checkFrame() {
                                if(item.frame.id){
                                    let framInfo = 
                                    `
                                    <dt class="variation-PosterFrame">${transFrame}:</dt>
                                    <dd class="variation-PosterFrame">
                                        <p>${item.frame.title}</p>
                                    </dd>
                                    `
                                    return framInfo

                                }
                                return ''
                                })()
                            }
                            <dt class="variation-PosterFinish">${transMaterial}:</dt>
                            <dd class="variation-PosterFinish">
                            <p>${item.product.type}</p>
                            </dd>
                           
                        </dl>
                    </td>

                    <td class="product-price" data-title="Price">
                        <span class="price_code"><span class="price-amount amount"><bdi>${item.item_actual_price.toFixed(2)}<span
                                        class="currencySymbol"> <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i></span></bdi></span></span>
                    </td>

                    <td class="product-quantity" data-title="Quantity">
                        <div class="quantity">
                            <label  class="posterlaab-label" for="quantity_662f3c794bc3a">
                                <span class="sr-only">3d Grassy Blue Hills Poster quantity</span>
                                <span aria-hidden="true">Qty</span>
                            </label>
                            <label class="screen-reader-text" for="quantity_662f3c794bc3a">3d Grassy
                                Blue Hills Poster quantity</label>


                            <input  data-itemid="${item.id}" id="product-${item.id}-count" type="text"  class="number-product input-text qty text"
                                name="" value="${item.quantity}" title="Qty" autocomplete="off"><span onclick="increaseCount('${item.id}')"
                                class="plus">+</span><span id="product-${item.id}-deacrease"  onclick="decreaseCount('${item.id}')" class="minus">-</span>
                        </div>
                    </td>

                    <td class="product-subtotal" data-title="Subtotal">
                        <span class="price_code">
                            <span class="price-amount amount">
                                <bdi>
                                    ${    
                                        (function subtotal() {
                                            return `${(item.item_actual_price * item.quantity).toFixed(2)} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i>`
                                        })()
                                    }
                                </bdi>
                            </span>
                        </span>
                    </td>

                    <td onclick="removeBasket(${item.id})" class="product-remove">
                        <span><i class="fa fa-trash"></i></span>
                    </td>

                </tr>

               
                `
                itemsArea.append(itemHTML)
            }

            if(data.coupon && data.coupon.is_valid[0]){
                $("#coupon_code").attr("disabled",true);
                $("#coupon_code").val(data.coupon.code);
                $(`<button type="button" id="remove_coupon_btn" onclick="removeCoupon()" class="button" name="apply_coupon" value="Apply coupon"><i class="fa fa-trash"></i></button>`).insertAfter("#apply_coupon_btn")
                $("#apply_coupon_btn").remove();
                if(!$("#cart-coupon").length){
                    $(
                    `
                    <tr id="cart-coupon" class="cart-coupon">
                        <th>${data.coupon.code}</th>
                        <td data-title="Kupon">
                            <span class="price_code">
                                <span class="price-amount amount">
                                    <bdi id="">${data.coupon.discount_precent}% endirim</bdi>
                                </span>
                            </span>
                        </td>
                    </tr>
                    `
                    ).insertAfter('#cart-subtotal')
                }

            }

            $("#basketActualPrice").html(`${data.basket_price.toFixed(2)} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i>`)
            
            if(data.basket_actual_price != data.basket_price){
                $("#basketPrice").html(`${data.basket_price.toFixed(2)} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i>`)
            }else{
                $("#basketPrice").html('')
            }

            $("#basketTotal").html(`${data.basket_actual_price.toFixed(2)} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i>`)

         
            

            // quantity validator
            $('.number-product').each(function() {
                let num = parseInt($(this).val());
                if(num === 0 || isNaN(num)||$(this).val().substring(0,1)==0){
                    $(this).val(1)
                }else if(num >= 1){
                    $(`#product-${$(this).data('itemid')}-deacrease`).prop('disabled', false);
                }
                if($(this).val() == 1){
                    $(`#product-${$(this).data('itemid')}-deacrease`).prop('disabled', true);
                }
                $(this).on('input', function() {
                    let quantity = $(this).val()
                    quantity = quantity.replace(/[^0-9]/g, '');
                    $(this).val(quantity)
                    let num = parseInt($(this).val());
                    if(num === 0 || isNaN(num)||$(this).val().substring(0,1)==0){
                        $(this).val(1)
                    }else if(num >= 1){
                        $(`#product-${$(this).data('itemid')}-deacrease`).prop('disabled', false);
                    }
                    if($(this).val() == 1){
                        $(`#product-${$(this).data('itemid')}-deacrease`).prop('disabled', true);
                    }
                    });
                });
                $('.number-product').each(function() {
                    $(this).on('change', function() {
                        let quantity = $(this).val()
                        updateBasket($(this).data('itemid'),  quantity)
                    });
                });
        }else{
            const emptyBasket = 
            `
            <div class="emptydiv">
                <div class="alert alert-danger justify-content-center has-cart d-flex align-items-center"><i class="fa fa-info"></i> ${transEmptyBasket}</div>
            </div>
            `
            $("#basket_container").html(emptyBasket)
            

        }
    })
    .finally(() => {
        loader.hide()
    })
}

getBasketItems()

var num;
function increaseCount(itemid){
    num = parseInt($(`#product-${itemid}-count`).val());
    $(`#product-${itemid}-count`).val(num + 1);

    if (num >= 1) {
        $(`#product-${itemid}-deacrease`).prop('disabled', false);
    }
    updateBasket(itemid,  $(`#product-${itemid}-count`).val())
}
function decreaseCount(itemid){
    num = parseInt($(`#product-${itemid}-count`).val());
    if (num > 1) {
        $(`#product-${itemid}-count`).val(num - 1);
    }
    if (num == 2) {
        $(`#product-${itemid}-deacrease`).prop('disabled', true);
    }
    updateBasket(itemid,  $(`#product-${itemid}-count`).val())
    
}
function applyCoupon(){
    loader.show();

    fetch(couponAPI,{
        method:"POST",
        headers: {
            "X-CSRFToken": csrf,
            "Accept": "application/json",
            'Content-Type': 'application/json'
          },
        body:JSON.stringify({

            'action': 'apply',
            'code': $("#coupon_code").val()

        })
    })
    .then((response)=>{
        return response.json()

    })
    .then((data)=>{
       if (data === 'You are have applied coupon'){
            notfWrong(transCouponHas);
       }else if(data == 'Coupon applied!'){
            notfSuccess(transCouponApplied);
        }else{
            notfWrong(transCouponNotFind);
        }
  
    })
    .finally(() => {
        getBasketItems()
        loader.hide();
    });
}

function removeCoupon(){
    loader.show();

    fetch(couponAPI,{
        method:"POST",
        headers: {
            "X-CSRFToken": csrf,
            "Accept": "application/json",
            'Content-Type': 'application/json'
          },
        body:JSON.stringify({

            'action': 'remove',

        })
    })
  
    .finally(() => {
        $("#coupon_code").attr("disabled",false);
        $("#coupon_code").val('');
        $(`<button type="button" id="apply_coupon_btn" onclick="applyCoupon()" class="button" name="apply_coupon" value="Apply coupon">${transAdd}</button>`).insertAfter("#remove_coupon_btn")
        $("#remove_coupon_btn").remove();
        $("#cart-coupon").remove();

        getBasketItems()
        loader.hide();
    });
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

