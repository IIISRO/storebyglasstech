function addBasket(productid, quantity){
	jQuery(".loader_wait_response").show();
	fetch(addBasketAPI,{
		method:"POST",
		headers: {
			"X-CSRFToken": csrf,
			"Accept": "application/json",
			'Content-Type': 'application/json'
		  },
		body:JSON.stringify({
			'product':  parseInt(productid),
			'size':  parseInt(productid),
			'frame':  parseInt(productid),
			'quantity':  parseInt(quantity),

		})
	})
	.then((response)=>{
		if (response.status === 201){
			notfSuccessAddBasket()
		}
		return response.json()
	})
	.then((data)=>{
		jQuery(".loader_wait_response").hide();
		updateBasketCount()
	})
}

function removeBasket(itemid){
	jQuery(".loader_wait_response").show();
	fetch(`/api/v1/order/basket/remove/${itemid}/`,{
		method:"DELETE",
		headers: {
			"X-CSRFToken": csrf,
			"Accept": "application/json",
			'Content-Type': 'application/json'
		  },
	})
	.then((response)=>{
		return response
	})
	.then((data)=>{
		jQuery(".loader_wait_response").hide();
		updateBasketCount()
		getBasketItems()
	})
}

function updateBasket(itemid, quantity){
	jQuery(".loader_wait_response").show();
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
	.then((response)=>{
		return response
	})
	.then((data)=>{
		jQuery(".loader_wait_response").hide();
		getBasketItems()
	})
}