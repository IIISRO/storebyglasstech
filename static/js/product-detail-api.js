function getDetail(){
    loader.show()
    var api_url = productDetailAPI
    async function Products(api_url=api_url) {
        const response = await fetch(api_url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
        
        return response.json(); 
    }
    Products(api_url)
    .then((data) => {
        if(data.type==="MDF"){
            $("#prod-selected").html(`<img src="/static/images/mdf.png">MDF Tablo Seçildi`);
            $("#mdf-overlay").css('display', 'inline-block');
            $("#glass-overlay").css('display', 'none');
        }else{
            $("#prod-selected").html(`<img src="/static/images/glassico.png">Glass Tablo Seçildi`);
            $("#glass-overlay").css('display', 'inline-block');
            $("#mdf-overlay").css('display', 'none');

        }
        // sekil
        $("#main-frame-img").attr('src',data.image);

        // benzer mehsul
        for(let type of data.same_products){
            if(type.type==='MDF'){
                $("#prod-types").append(
                    `
                    <li>
                        <a href="${type.url}">
                            <div class="pti-in-icon" style="display: block;"><span><img
                                        src="/static/images/mdf.png"></span></div>
                            <div class="pti-in-info" style="display: block;">
                                <span class="product-color-6">MDF</span>
                            </div>
                        </a>
                    </li>
                    `
                )
            }
            if(type.type==='GLASS'){
                $("#prod-types").append(
                    `
                    <li>
                        <a href="${type.url}">
                            <div class="pti-in-icon" style="display: block;"><span><img
                                        src="/static/images/glassico.png"></span></div>
                            <div class="pti-in-info" style="display: block;">
                                <span class="product-color-5">GLASS</span>
                            </div>
                        </a>
                    </li>
                    `
                )
            }
        }
        // title, desc, detail
        $("#head-prod-title").text(`${data.title} | STOREGLASSTECH`)
        $("#prod-title").html(`${data.title}  <small>| ${data.type}</small>`)
        $("#prod-desc").html(data.description)
        $("#prod-detail").html(data.detail)

        // olculer
        for(let size of data.sizes){
            $("#size-list").append(
                `
                <li>
                    <button class="size-element" 
                    data-extra_price="${    
                        (function checkExtra() {
                        if(size.is_base){
                            return 0
                        }else if(data.type == 'GLASS'){
                            return size.price_glass
                        }else{return size.price_mdf}
                        })()
                    }" 
                    data-id=${size.id} data-size="${size.height}*${size.width}">${size.height}x${size.width}
                    </button>
                </li>`)
        }
        // qiymet
        if (data.has_discount){
            $("#prod-price").html(
                `<div class="d-flex align-items-center">
                <div class="discount-section py-2 px-4">
                    ${data.discount_amount}%
                </div>
                <del id="prod_base_price" class="mx-4" >${data.price.toFixed(2)} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i></del>
                </div>
                <div class="price-sec d-flex align-items-center">
                    
                    <span id="prod_actual_price">${data.actual_price.toFixed(2)} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i></span>
                </div>
                `
            )
        }else{
            $("#prod-price").html(
                `
                <div class="price-sec d-flex align-items-center">
                    <span id="prod_actual_price">${data.actual_price.toFixed(2)} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i></span>
                </div>`
            )
        }
        // wishbtn
        likeBtn.dataset.prod_id=data.id
        if(data.in_wish){
            likeBtn.classList.toggle("active")
            likeIcon.style.filter="grayscale(0)"
        }

        // in bassket message
        if(data.in_cart){
            $("#cartMessage").html(`<div class="d-flex alert alert-success has-cart align-items-center"><i class="fa fa-info"></i> Səbətinizdə bu məhsuldan var!</div>`);
        }
       

        // olcu selectoru
        const sizes = document.querySelectorAll('.size-element');
        const mainFrame1 = document.getElementById("main-frame1");

        sizes.forEach(size => {
            size.addEventListener('click', () => {
                sizes.forEach(btn => btn.classList.remove('selected'));
                size.classList.add('selected');
                const selectedSize = size.getAttribute("data-size").split("*");
                const width = selectedSize[0];
                const height = selectedSize[1];

                if (window.innerWidth <= 767) {
                    mainFrame1.style.width = width * 0.5 + "px";
                    mainFrame1.style.height = height * 0.5 + "px";
                } else {
                    mainFrame1.style.width = width * 0.8 + "px";
                    mainFrame1.style.height = height * 0.8 + "px";
                }
                // size gore extra  qiymet
                var extra_price = parseFloat(size.dataset.extra_price)
                if(data.has_discount){
                    $("#prod_base_price").html(`${(data.price + parseFloat(size.dataset.extra_price)).toFixed(2)} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i>`)
                    extra_price = extra_price - ((extra_price * data.discount_amount) / 100)
                }

                $("#prod_actual_price").html(`${(data.actual_price + extra_price).toFixed(2)} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i>`)
           
            });
        });

        // addtobasket duymesi
        var addBasketBTN = document.getElementById('basketadd');
        addBasketBTN.dataset.prod_id = data.id;


    })
    .finally(()=>{
        loader.hide();
    })
  
}

getDetail()



function addWish(productid){
	fetch(addWishAPI,{
		method:"POST",
		headers: {
			"X-CSRFToken": csrf,
			"Accept": "application/json",
			'Content-Type': 'application/json'
		  },
		body:JSON.stringify({
			'product':  parseInt(productid),
		})
	})

    .finally(()=>{
        wishCounter();
    })
	
}

function removeWish(productid){
	fetch(`/api/v1/account/wishlist/remove/${productid}/`,{
		method:"post",
		headers: {
			"X-CSRFToken": csrf,
			"Accept": "application/json",
			'Content-Type': 'application/json'
		  }
	})
    .finally(()=>{
        wishCounter();
    })
	
}


let basketAddButton = document.getElementById("basketadd")
    basketAddButton.addEventListener("click",()=>{
        if(!basketAddButton.classList.contains('clicked')){
            let selectedSize = $('.size-element.selected').data('id');
            let selectedFrame = null;
            
            if(!selectedSize){
                return notfWrong('Məhsul seçilməyib!');
            }
            
            addBasket(basketAddButton.dataset.prod_id, selectedSize, selectedFrame);

            basketAddButton.style.transition = "all 1s";
            basketAddButton.innerHTML=`<i class="fa-regular fa-circle-check"></i> Səbətə əlavə olundu`
            basketAddButton.style.backgroundColor="green"
            basketAddButton.classList.add("clicked")
            

        }
        
    })

