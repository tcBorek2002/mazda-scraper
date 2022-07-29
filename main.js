import { SendEmail } from './emailservice.js';
import { MazdaWebsites } from './config.js';
import { ScrapeWebsite } from './scraper.js';

let title = 'The Mazda list has been checked, no changes';
let lists = {
    listNL: [],
    listDE: [],
    listUK: [],
}
let error = false;

console.log('Starting execution');
lists.listNL = await ScrapeWebsite(MazdaWebsites.nl);
//lists.listDE = await ScrapeWebsite(MazdaWebsites.de);
// lists.listUK = await ScrapeWebsite(MazdaWebsites.uk);

if(lists.listNL.length !== 8) {
    if(lists.listNL.length === 0) {
        error = true;
        title = 'Mazda scraper NL failed.';
    }
    else {
        title = 'One of the Mazda lists has changed!';
    }
}
if(lists.listDE.length === 1) {
    if(error) {
        title = 'Mazda scraper NL and DE failed';
    }
    else {
        title = 'Mazda scraper DE failed';
    }
    error = true;
}
if(lists.listUK.length === 1) {
    if(error) {
        title = 'Multiple Mazda scrapers failed';
    }
    else {
        title = 'Mazda scraper UK failed'
    }
    error = true;
}
let listsString = 'NL: ' + lists.listNL.toString() + '\nDE: ' + lists.listDE.toString() + '\nUK: ' + lists.listUK.toString();
let description = error ? 'The Mazda scraper ran but experienced problems. These are all the lists:\n' + listsString : 'The Mazda scraper ran without any problems. These are all the lists:\n' + listsString;

for(const list in lists) {
    lists[list].forEach((car) => {
				if(car.includes('60')) {
					title = 'Mazda CX-60 has been spotted in the car list!'
				}
			})
};

console.log('Sending email with title: ', title);
console.log('and description: ', description);
//SendEmail(title, description);