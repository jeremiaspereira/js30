
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
var day03 = function () {
  const inputs = document.querySelectorAll('.controls input');

  function handleUpdate () {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  }

  inputs.forEach(input => input.addEventListener('change', handleUpdate));
  inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
}
var day04 = function () {
   // Get your shorts on - this is an array workout!
    // ## Array Cardio Day 1

    // Some data we can work with

    const inventors = [
      { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
      { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
      { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
      { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
      { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
      { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
      { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
      { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
      { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
      { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
      { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
      { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
    ];

    const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

    // Array.prototype.filter()
    // 1. Filter the list of inventors for those who were born in the 1500's

    const fifteen = inventors.filter(inventor =>(inventor.year >= 1500 && inventor.year < 1600));
    console.table(fifteen);

    // Array.prototype.map()
    // 2. Give us an array of the inventors' first and last names

    const fullNames = inventors.map(inventor =>  `${inventor.first} ${inventor.last}`);
    console.log(fullNames);

    // Array.prototype.sort()
    // 3. Sort the inventors by birthdate, oldest to youngest

/*    const ordered = inventors.sort(function(a,b){
      if(a.year > b.year){
        return 1
      } else {
        return -1;
      }
    });*/

    const ordered = inventors.sort((a,b) => a.year > b.year ? 1 : -1);

    console.table(ordered);

    // Array.prototype.reduce()
    // 4. How many years did all the inventors live?

    const totalYears = inventors.reduce((total, inventor) => {
      return total + (inventor.passed - inventor.year)
    },0);
    console.log(totalYears);

    // 5. Sort the inventors by years lived

    const oldest = inventors.sort(function(a,b){
      const lastGuy = a.passed - b.year;
      const nextGuy = b.passed - b.year;
      return lastGuy > nextGuy ? -1 : 1;
    })

    console.table(oldest);

    // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
    // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

   /* const category = document.querySelector('.mw-category');
    const links = Array.from(category.querySelectorAll('a'));
    const de = links
                  .map(link => link.textContent)
                  .filter(streetName => streetName.includes('de'));*/


    // 7. sort Exercise
    // Sort the people alphabetically by last name

    const alpha = people.sort(function(lasOne, nextOne) {
      const [aLast, aFirst] = lasOne.split(' , ');
      const [bLast, bFirst] = nextOne.split(' , ');
      return aLast > bLast ? 1 : -1;
    });
    console.log(alpha);

    // 8. Reduce Exercise
    // Sum up the instances of each of these
    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

    const transp = data.reduce(function(obj, item) {
      if(!obj[item]) {
        obj[item] = 0;
      }

      obj[item]++;
      return obj;
    }, {});

    console.log(transp);
}
var day05 = function () {
  const panels = document.querySelectorAll('.panel');

  function toggleOpen() {
    this.classList.toggle('open');
  }

  function toggleActive(e) {
    if (e.propertyName.includes('flex')) {
      this.classList.toggle('open-active');
    }
  } 

  panels.forEach(panel => panel.addEventListener('click', toggleOpen));
  panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
}
var day06 = function () {
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

  const cities = [];
  fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

  function findMatches(wordToMatch, cities) {
    return cities.filter(place => {

      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex)
    });
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
      return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(place.population)}</span>
        </li>
      `;
    }).join('');
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);
}



