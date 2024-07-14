let showBtn=document.querySelector('.showcoupon')
let coupon_form=document.querySelector('.form-coupon')

showBtn.addEventListener('click',()=>{
    let result=showBtn.classList.toggle('active')
    if(result){
        coupon_form.classList.remove('d-none')
    }
    else{
        coupon_form.classList.add('d-none')
    }
})

function addNewAddress(){
    $("#new_address_inputs").html(
        `
        <div class="billing-fields">
            <h3>Ünvan Məlumatları</h3>
            <input type="text" hidden id="new_address">
            <div class="row mb-4 mt-4">
                <div class="col-md-6 d-flex flex-column">
                    <label class="">Ad
                        &nbsp;<abbr class="required" title="required">*</abbr></label><input
                        id="addressfirstname" type="text" class="input-text " placeholder="" value="">
                </div>
                <div class="col-md-6 d-flex flex-column">
                    <label>Soyad
                        &nbsp;<abbr class="required" title="required">*</abbr></label><input
                        id="addresslastname" type="text" class="input-text " placeholder="" value="">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-12">
                    <label class="">Ünvan başlığı
                        &nbsp;<abbr class="required" title="required">*</abbr></label><input type="text" class="input-text "
                        id="addressline" placeholder="" value="">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-12 d-flex flex-column">
                    <label>Ünvan
                        &nbsp;<abbr class="required" title="required">*</abbr></label><input
                        id="addressregion" type="text" class="input-text " placeholder="Rayon"
                        value="">
                </div>
                <div class="col-md-12 mt-4 d-flex flex-column">
                    <input type="text" class="input-text "
                    id="addressstreet" placeholder="Küçə/Məhəllə" value="">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-6 d-flex flex-column">
                    <label class="">Bina/Ev&nbsp;<abbr class="required" title="required">*</abbr></label><input
                    id="addressbuilding" type="text" class="input-text " placeholder="" value="">
                </div>
                <div class="col-md-6 d-flex flex-column">
                    <label>Mənzil&nbsp;<abbr class="required" title="required">*</abbr></label><input
                    id="addressflat" type="text" class="input-text " placeholder="" value="">
                </div>
            </div>
        </div>
    
        <button type="button" data-toggle="modal" data-target="#addressListModal" class="mt-3 mb-5 ml-2 button">Ünvanlarım</button>
    
        `
    )
    $("#default_address").html('')
    $("#addressSelectClose").click();
}

$( ".address_cart_small" ).each(function(index) {
    $(this).on("click", function(){
        loader.show();
        
        fetch(`/api/v1/account/set_default/address/${$(this).data('addressid')}/`,{
            method:"post",
            headers: {
                "X-CSRFToken": csrf,
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
            
        })
        .then((response)=>{
            
            return response.json()
        })
        .then((data)=>{

            if(data){
                if($('#new_address_inputs').html() != '') {
                    $('#new_address_inputs').html('')
                }
                for(let address of data){
                    if(address.is_default){
                        $("#default_address").html(`
                        <div class="address_cart card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="fas fa-solid fa-location-dot"></i> ${address.address_line}</h5>
                                <h6 class="card-subtitle mb-3 ml-3 mt-2 text-muted">${address.first_name} ${address.last_name}, ${address.region}, ${address.street}, ${address.building}, ${address.flat}</h6>
                                <button type="button" data-toggle="modal" data-target="#addressListModal" class="mt-3 button">Başqa ünvan</button>
                            </div>
                        </div>
                        `)
                    }
                }
            }

        })
        .finally(()=>{
            $("#addressSelectClose").click();
            return loader.hide();


        })
    }); 
});

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
            notfWrong('Artıq kupon var!');
       }else if(data == 'Coupon applied!'){
            notfSuccess('Kupon əlavə edildi!');
        }else{
            notfWrong('Kupon tapılmadı!');
        }
  
    })
    .finally(() => {
        getItems();
        $("#checkout_coupon").remove();
        loader.hide();
    });
}

let checkoutTotal = 0.00;
let checkoutActualTotal = 0.00;
let delvFee = 0.00;

function getItems(){
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
        const itemsArea = $("#productsStartLine")
        itemsArea.html('');
        let items = data.items
        for(let item of items){
            itemHTML = 
            `  
            <tr class="cart_item">
                <td class="product-name">${item.product.title}&nbsp; <strong
                        class="product-quantity">×&nbsp;${item.quantity}</strong>
                        <dl class="variation">
                        <dt class="variation-PosterSize">Poster Size:</dt>
                        <dd class="variation-PosterSize">
                            <p>${item.size.height}x${item.size.width}</p>
                        </dd>
                        ${    
                            (function checkFrame() {
                            if(item.frame.id){
                                let framInfo = 
                                `
                                <dt class="variation-PosterFrame">Çərçivə:</dt>
                                <dd class="variation-PosterFrame">
                                    <p>${item.frame.title}</p>
                                </dd>
                                `
                                return framInfo

                            }
                            return ''
                            })()
                        }
                        <dt class="variation-PosterFinish">Material:</dt>
                        <dd class="variation-PosterFinish">
                        <p>${item.product.type}</p>
                        </dd>
                        
                    </dl>
                </td>
                <td class="product-total">
                    <span class="woocs_special_price_code">
                        <span class="Price-amount amount">
                            <bdi>${(item.item_actual_price * item.quantity).toFixed(2)} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i></bdi>
                        </span>
                    </span>
                </td>
            </tr>

            
            `
            itemsArea.append(itemHTML)
        }
        // kupon
        if(data.coupon && data.coupon.is_valid[0]){
            $("#coupon-notice").css("display",'none');
            if(!$("#cart-coupon").length){
                itemsArea.append(
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
                )
            }

        }
        // catdirilma
        itemsArea.append(
            `
            <tr id="cart-coupon" class="cart-coupon">
                <th>Çatdırılma</th>
                <td data-title="Kupon">
                    <span class="price_code">
                        <span class="price-amount amount">
                            ${    
                                (function checkDelvFee() {
                                if(delvFee > 0.00){
                                    
                                    return `<bdi id="">${delvFee.toFixed(2)} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i></bdi>`

                                }else{

                                }
                                return `<bdi id="">Pulsuz</bdi>`
                                })()
                            }
                            
                        </span>
                    </span>
                </td>
            </tr>
            `
            )

        // total price
        checkoutTotal = data.basket_price + delvFee
        checkoutActualTotal = data.basket_actual_price + delvFee

        if(checkoutTotal != checkoutActualTotal){
            $("#checkout-total").html(`${checkoutTotal.toFixed(2)} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i></bdi>`)
        }

        $("#checkout-actual_total").html(`${checkoutActualTotal.toFixed(2)} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i></bdi>`)

         
            

          
    })
    .finally(() => {
        loader.hide()
    })
}

getItems()


function placeOrder(){
    checkAddress()
}






// check address
function checkAddress(){
    loader.show();
    if($("#new_address").length){
        const addressFirstname = $("#addressfirstname");
        const addressLastname = $("#addresslastname");
        const addressLine = $("#addressline");
        const addressRegion = $("#addressregion");
        const addressStreet = $("#addressstreet");
        const addressBuilding = $("#addressbuilding");
        const addressFlat = $("#addressflat");

        if(!addressFirstname.val() || !addressLastname.val() ||
        !addressLine.val() || !addressRegion.val() ||
        !addressStreet.val() || !addressBuilding.val() || !addressFlat.val()){
            loader.hide();
            return notfWrong(notfDatasMiss);
        }
        
        fetch(addAddressAPI,{
            method:"POST",
            headers: {
                "X-CSRFToken": csrf,
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
            'first_name': addressFirstname.val(),
            'last_name': addressLastname.val(),
            'address_line': addressLine.val(),
            'region': addressRegion.val(),
            'street': addressStreet.val(),
            'building': addressBuilding.val(),
            'flat': addressFlat.val(),
            'is_default': true
            })
        })
        .then((response)=>{
            if(response.status == 201){
                getAmount();
                return response.json()
            }else{
                return checkoutErrorDetect()
            }
        })

    }else{
        getAmount();
    }
}


// createOrder
function createOrder(payAmount, payDiscount, payDelv){
    if(payAmount){
        if(langCode==='az'){
            var approveURL = `${window.location.origin}/order/checkout/approved/${userBasketID}/${payAmount}/${payDelv}/${payDiscount}/${payMethod}/`
        }else{
            var approveURL = `${window.location.origin}/${langCode}/order/checkout/approved/${userBasketID}/${payAmount}/${payDelv}/${payDiscount}/${payMethod}/`
        }
        if(payMethod === 'cash'){
            fetch(approveURL,{
                method:"POST",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                },
            })
      
            .then((response) => {
                if(response.ok){
                    window.location.href = approveURL
                }else{
                    return checkoutErrorDetect()
                }

            })
            
        }else{
            fetch('https://api.payriff.com/api/v2/createOrder',{
                method:"POST",
                headers: {
                    "Authorization": "BD5FDA7C86A14CE4A987FE5F97C260BF",
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "body": {
                    "amount": payAmount,
                    "approveURL": approveURL,
                    "cancelURL": window.location.href,
                    "currencyType": "AZN",
                    "declineURL": window.location.origin+payDeclineURL,
                    "description": "Satish",
                    "directPay": true,
                    "language": "AZ",
                    },
                    "merchant": "ES1092714"
                }),
            
            })
      
            .then((response) => {
                return response.json()
    
            })
            .then((data) => {
                window.location.href = data.payload.paymentUrl
            
            });
        }
     

    }else{
        return checkoutErrorDetect()
    }
}

function checkoutErrorDetect(){
    loader.hide();
    notfWrong(notfError);
    setTimeout(function(){
        window.location.href = window.location.href;
    },1500);

}


    