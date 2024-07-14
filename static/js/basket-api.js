function addBasket(productid, selectedSize, selectedFrame){
	loader.show();
	fetch(addBasketAPI,{
		method:"POST",
		headers: {
			"X-CSRFToken": csrf,
			"Accept": "application/json",
			'Content-Type': 'application/json'
		  },
		body:JSON.stringify({
			'product':  parseInt(productid),
			'size':  parseInt(selectedSize),
			'frame':  selectedFrame,
			'quantity':  1,

		})
	})
	.then((response)=>{
		if (response.status === 201){
			notfSuccessAddBasket()
		}else if(response.status === 403){
            location.href = `${signinURL}?next=${location.href}`
        }else{ notfWrong(); }
		return response.json()
	})
	.finally(()=>{
		loader.hide();
        basketCounter();

	})
}
function removeBasket(itemid){
	loader.show();
	fetch(`/api/v1/order/basket/remove/${itemid}/`,{
		method:"DELETE",
		headers: {
			"X-CSRFToken": csrf,
			"Accept": "application/json",
			'Content-Type': 'application/json'
		  },
	})
	.finally(()=>{
		loader.hide();
		getBasketItems()
		basketCounter()
	})
}

function updateBasket(itemid, quantity){
	fetch(`/api/v1/order/basket/update/${itemid}/`,{
		method:"PATCH",
		headers: {
			"X-CSRFToken": csrf,
			"Accept": "application/json",
			'Content-Type': 'application/json'
		  },
		body:JSON.stringify({
			'quantity':  parseInt(quantity)
		})
	})
	
	.finally(()=>{
		getBasketItems()
	})
}


