

function notfSuccessAddBasket() {
	let n = document.createElement("div");
	let id = Math.random().toString(36).substr(2, 10);
	n.setAttribute("id", id);
	n.classList.add("notification", 'success');
	n.innerHTML = `<i style="border-right: 1px solid white; padding-right:5px;margin-right:5px;" class="fas  fa-solid fa-cart-plus"></i> ${notfAddedBasketMessage}`;
	document.getElementById("notification-area").appendChild(n);
	setTimeout(() => {
		var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
		for (let i = 0; i < notifications.length; i++) {
			if (notifications[i].getAttribute("id") == id) {
				notifications[i].remove();
				break;
			}
		}
	}, 2000);
}

function notfSuccess(message) {
	let n = document.createElement("div");
	let id = Math.random().toString(36).substr(2, 10);
	n.setAttribute("id", id);
	n.classList.add("notification", 'success');
	n.innerHTML = `<i style="border-right: 1px solid white; padding-right:5px;margin-right:5px;" class="fas fa-solid fa-circle-check"></i> ${message}`;
	document.getElementById("notification-area").appendChild(n);
	setTimeout(() => {
		var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
		for (let i = 0; i < notifications.length; i++) {
			if (notifications[i].getAttribute("id") == id) {
				notifications[i].remove();
				break;
			}
		}
	}, 2000);
}

function notfWrong(message) {
	let n = document.createElement("div");
	let id = Math.random().toString(36).substr(2, 10);
	n.setAttribute("id", id);
	n.classList.add("notification", 'wrong');
	n.innerHTML = `<i style="border-right: 1px solid white; padding-right:5px;margin-right:5px;" class="fas fa-solid fa-circle-xmark"></i> ${message}`;
	document.getElementById("notification-area").appendChild(n);
	setTimeout(() => {
		var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
		for (let i = 0; i < notifications.length; i++) {
			if (notifications[i].getAttribute("id") == id) {
				notifications[i].remove();
				break;
			}
		}
	}, 2000);
}