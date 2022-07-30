# Mazda-scraper
#### This script checks the Mazda website to check for new cars added to the list of user manuals.

## To run:
Make sure to have npm installed on your pc. Go to the config.js file. Change the EmailConfig class to contain your email address, the (app specific) email password and last email service (ex: gmail). For more information on the emailing take a look at nodemailer.
Then run the following commands:
- npm install
- npm start

## Some specifics:
After the web-scraping the script will send an email to let the user know the latest information. Personally I run the script using GitHub Actions.
Right now the script will check the websites: Mazda UK, DE and NL. In case the amount of cars changes on one of those lists the title of the email will show this. In case one of the lists contains the number 60 (from Mazda CX-60) the title of the email will change to indicate this.
#
The script makes use of the following two npm packages: nightmarejs for doing the web-scraping. Nodemailer for sending emails.
