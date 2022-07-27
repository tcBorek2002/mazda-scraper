const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false})
var nodemailer = require('nodemailer');

console.log('Starting execution');
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
		let title = 'The Mazda list has been checked, no changes';

		if(list.length !== 8) {
			console.log('The Mazda car list has changed!');
			title = 'The Mazda manual list has changed!';
		}
		else {
			console.log('The car list still appears the same.');
		}
		list.forEach((car) => {
			if(car.includes('60')) {
				title = 'Mazda CX-60 has been spotted in the car list!'
			}
		})

		console.log('Car list:', list);

		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: 'borekbandell@gmail.com',
			  pass: 'nwylphinruoakmnc'
			}
		  });
		  
		  var mailOptions = {
			from: 'borekbandell@gmail.com',
			to: 'borekbandell@gmail.com',
			subject: title,
			text: 'This is the list: ' + list.toString()
		  };
		  
		  transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			  console.log(error);
			} else {
			  console.log('Email sent: ' + info.response);
			}
		  });

	})
	.catch((error) => {
		console.error('Search failed:', error)
	})