(function() {
	var loading = 70;
	var id = setInterval(frame, 64);
	function frame() {
		if(loading == 100) {
			clearInterval(id);
			window.open("indexapp.html", "_self");
			
		}
		else {
			loading = loading + 1;
			console.log(loading);
			if(loading == 90) {
				document.querySelectorAll(".preload").forEach(
					elemento => elemento.style.animation = "fadeout 1.5s ease"
					
					);
				console.log("aqui deberia pasar aglo");
			}
		}
	}
})();

