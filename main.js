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
let changed = false;

console.log('Starting execution');
lists.listNL = await ScrapeWebsite(MazdaWebsites.nl, false);
lists.listDE = await ScrapeWebsite(MazdaWebsites.de, false);
lists.listUK = await ScrapeWebsite(MazdaWebsites.uk, true);

if(lists.listNL.length !== 8) {
    if(lists.listNL.length === 0) {
        error = true;
        title = 'Mazda scraper NL failed.';
    }
    else {
        changed = true;
    }
}
if(lists.listDE.length !== 9) {
    if(lists.listDE.length === 0) {
        if(error) {
            title = 'Mazda scraper NL and DE failed';
        }
        else {
            title = 'Mazda scraper DE failed';
        }
        error = true;
    }
    else {
        changed = true;
    }
}
if(lists.listUK.length !== 9) {
    if(lists.listUK.length === 0) {
        if(error) {
            title = 'Multiple Mazda scrapers failed';
        }
        else {
            title = 'Mazda scraper UK failed';
        }
        error = true;
    }
    else {
        changed = true;
    }
}
if(!error) {
    if(changed) {
        title = 'At least one of the Mazda manual lists has changed!';
    }
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
SendEmail(title, description);