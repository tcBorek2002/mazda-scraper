import Nightmare from 'nightmare';
const nightmare = Nightmare({ show: false})
import {MazdaWebsites} from './config.js';

export async function ScrapeWebsite (website) {
	try {
		console.log('Starting scraping');
		const list = await nightmare
			.goto(website)
			.click('#onetrust-accept-btn-handler')
			.wait('.dropdown__option-caption-3RkJ1')
			.evaluate(
				() =>
				Array.from(document.querySelectorAll('.dropdown__option-caption-3RkJ1')).map(element => element.innerText)
			)
			.end();
			// list.forEach((car) => {
			// 	if(car.includes('60')) {
			// 		title = 'Mazda CX-60 has been spotted in the car list!'
			// 	}
			// })

			console.log('Car list:', list);
			return (list);
	}
	catch (e) {
		console.error(e);
		return [];
	}
}