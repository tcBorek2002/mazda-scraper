const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false})

nightmare
	.goto('https://www.mazda.nl/services/handleidingen/')
    .click('#onetrust-accept-btn-handler')
	.wait('.dropdown__option-caption-3RkJ1')
	.evaluate(
		() =>
        Array.from(document.querySelectorAll('.dropdown__option-caption-3RkJ1')).map(element => element.innerText)
	)
	.end()
	.then((list) => {
		console.log('List:', list)
	})
	.catch((error) => {
		console.error('Search failed:', error)
	})