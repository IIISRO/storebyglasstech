
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