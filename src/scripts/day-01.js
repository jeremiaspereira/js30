
// Day one
var day01 = function() {
	const keys = document.querySelectorAll('.key');
	
	function playSound(e){
		const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
		const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

		// Stop funcion
		if(!audio) return;

		// Rewind to the start
		audio.currentTime = 0;
		audio.play();

		key.classList.add('playing');
	}

	function removeTransition(e) {
		if(e.propertyName !== 'transform') return;
		this.classList.remove('playing');
	}

	keys.forEach(key => key.addEventListener('transitionend', removeTransition)); 
	
	window.addEventListener('keydown', playSound);
}