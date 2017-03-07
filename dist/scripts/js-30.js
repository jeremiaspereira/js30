
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
var day02 = function() {
  const secondHand = document.querySelector('.hand-second');
  const minsHand = document.querySelector('.hand-min');
  const hourHand = document.querySelector('.hand-hour');

  function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;
    
    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    console.log(now);
  }

  setInterval(setDate, 1000);
}