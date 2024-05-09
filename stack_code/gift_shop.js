const input = require('sync-input');
const data = require('./gift_shop_data.json');

const giftShop = {
	welcomeMessage: function () {
		for (let i = 0; i < data['welcome_message'].length; i++) {
			console.log(data['welcome_message'][i]);
		}
		console.log('\r');
	},
	showGiftsList: function () {
		if ('gifts_list' in data) {
			for (let i = 0; i < data['gifts_list'].length; i++) {
				console.log(
					`${data['gifts_list'][i].id}- ${data['gifts_list'][i].name}, Cost: ${data['gifts_list'][i].price} tickets`
				);
			}
			console.log('\r');
		} else {
			console.log("I don't have any gifts list to show you.");
		}
	},
	chose: function () {
		console.log('What do you want to do?');
		let question = input(
			'1-Buy a gift 2-Add tickets 3-Check tickets 4-Show gifts 5-Exit the shop\n'
		);
		if (isNaN(question) || parseInt(question) < 1 || parseInt(question) > 5) {
			console.log('Please enter a valid number!\n');
			// console.log(typeof question);
		}
		// console.log(typeof question);
		switch (parseInt(question)) {
			case 1:
				giftShop.buy();
				break;
			case 2:
				giftShop.addTickets();
				break;
			case 3:
				giftShop.checkTickets(data['tickets']);
				break;
			case 4:
				giftShop.showGifts();
				break;
			case 5:
				giftShop.out();
				break;
			// default:
			//     console.log('Unknown command!');
		} // switch
	},
	buy: function () {
		let chooseGift = input('Enter the number of the gift you want to get:\n');

		if (isNaN(chooseGift)) {
			console.log('Please enter a valid number!\n');
		} else if (
			parseInt(chooseGift) < 1 ||
			parseInt(chooseGift) >
				(data['gifts_list'] ? data['gifts_list'].length : 0)
		) {
			console.log('Wow! There are no gifts to buy.\n');
		} else {
			for (let i = 0; i < data['gifts_list'].length; i++) {
				// console.log(
				// 	parseInt(chooseGift) === parseInt(data['gifts_list'][i].id)
				// );
				if (parseInt(chooseGift) === parseInt(data['gifts_list'][i].id)) {
					if (data['tickets'] < data['gifts_list'][chooseGift - 1].price) {
						console.log(`You don't have enough tickets to buy this gift.`);
						console.log(`Total tickets: ${data['tickets'] + '\n'}`);
					} else {
						let total = data['tickets'] - data['gifts_list'][i].price;
						console.log(`Here you go, one ${data['gifts_list'][i].name}!`);
						console.log(`Total tickets: ${total + '\n'}`);
						data['gifts_list'].splice(i, 1);
						continue;
					}
				} else {
					console.log('There is no gift with that number!');
					// giftShop.showGiftsList();
					continue;
				}
			}
		}
	},
	addTickets: function () {
		let amount = input('Enter the ticket amount:\n');
		if (isNaN(amount) || Number(amount) < 0 || Number(amount) > 1000) {
			console.log(`Please enter a valid number between 0 and 1000.\n`);
		} else {
			data['tickets'] += parseInt(amount);
			console.log(`Total tickets: ${data['tickets']}\n`);
		}
	},
	checkTickets: function (amount) {
		console.log(`Total tickets: ${amount + '\n'}Have a nice day!`);
	},
	showGifts: function () {
		console.log("Here's the list of gifts:" + '\n');
		giftShop.showGiftsList();
	},
	out: function () {
		console.log('Have a nice day!');
		process.exit();
	},
};

const __main__ = () => {
	giftShop.welcomeMessage();
	giftShop.showGiftsList();
	do {
		giftShop.chose();
	} while (true);
};

__main__();
