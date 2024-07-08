function getDetail(){
    var api_url = productDetailAPI
    async function Products(api_url=api_url) {
        const response = await fetch(api_url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
        
        return response.json(); // parses JSON response into native JavaScript objects
    }
    
    
    Products(api_url)
    .then((data) => {
        if(data.type==="MDF"){
            $("#prod-selected").html(`<img src="/static/images/mdf.png">MDF Tablo Seçildi`);
        }else{
            $("#prod-selected").html(`<img src="/static/images/glassico.png">Glass Tablo Seçildi`);
        }

        $("#main-frame-img").attr('src',data.image);
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
        $("#prod-title").html(`${data.title}  <small>| ${data.type}</small>`)
        $("#prod-desc").text(data.description)
        for(let size of data.sizes){
            $("#size-list").append(`<li><button data-size="200*300">${size.height}x${size.width}</button></li>`)
        }
        if (data.has_discount){
            $("#prod-price").html(
                `
                <div class="discount-section py-2 px-4">
                    ${    
                        (function checkDiscountType() {
                        if(data.discount_type === 'Precent'){
                            
                            return `${data.discount_amount}%`
                        }else{
                            return `-${data.discount_amount} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i>`
                        }
                        })()
                    }
                </div>
                <div class="price-sec d-flex align-items-center">
                    <del>${data.price} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i></del>
                    <span>${data.actual_price} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i></span>
                </div>
                `
            )
        }else{
            $("#prod-price").html(
                `
                <div class="price-sec d-flex align-items-center">
                    <span>${data.actual_price} <i class="font-weight-bold fas fa-xs fa-solid fa-manat-sign"></i></span>
                </div>`
            )
        }
        $("#prod-detail").html(data.detail)
        likeBtn.dataset.prod_id=data.id
        if(data.in_wish){
            likeBtn.classList.toggle("active")
            likeIcon.style.filter="grayscale(0)"
        }

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
