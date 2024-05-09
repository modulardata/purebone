const input = require('sync-input');
const fsPromises = require('node:fs/promises');
const fName = 'coffee_machine.json';

class Ingr {
	constructor(water = 0, milk = 0, beans = 0, cups = 1) {
		this.water = water;
		this.milk = milk;
		this.beans = beans;
		this.cups = cups;
	} // Ingr constructor
} // class Ingr

class MoneyAndIngr extends Ingr {
	constructor(money = 0, ...ingr) {
		super(...ingr);
		this.money = money;
	} // MoneyAndIngr constructor
} // class MoneyAndIngr

class Coffee extends MoneyAndIngr {
	constructor(name, ...moneyAndIngr) {
		super(...moneyAndIngr);
		this.name = name;
	} // Coffee constructor
} // class Coffee

class Machine {
	constructor(money = 550, water = 400, milk = 540, beans = 120, cups = 9) {
		this.offer = [
			new Coffee('espresso', 4, 250, 0, 16),
			new Coffee('latte', 7, 350, 75, 20),
			new Coffee('cappuccino', 6, 200, 100, 12),
			new Coffee('extra white', 10, 210, 300, 20),
		];
		this.storage = new MoneyAndIngr(money, water, milk, beans, cups);
	} // Machine constructor

	showState = () => {
		console.log(`
The coffee machine has:
    ${this.storage.water} ml of water
    ${this.storage.milk} ml of milk
    ${this.storage.beans} g of coffee beans
    ${this.storage.cups} disposable cups
    $${this.storage.money} of money
`);
	}; // showState()

	mainMenu = async () => {
		let cmd;
		while (
			(cmd = input(`
Write action (buy, fill, compose, take, remaining, save, load, exit):
`).toLowerCase()) !== 'exit'
		) {
			switch (cmd) {
				case 'buy': // buy some coffee
					this.buy();
					break;
				case 'fill': // fill the ingredients containers
					this.fill();
					break;
				case 'compose': // compose new coffee flavour
					this.compose();
					break;
				case 'take': // take all the money
					this.take();
					break;
				case 'remaining': // show the machine state
					this.showState();
					break;
				case 'save': // save the machine state to the file as json
					await this.save();
					break;
				case 'load': // load the machine state from json file
					await this.load();
					break;
				// case "exit": return;
				default:
					console.log('Unknown command!');
			} // switch
		} // while (true)
	}; // mainMenu()

	save = async () => {
		// let json = JSON.stringify(this, null, 4);
		let json = JSON.stringify(this);
		console.log('JSON data to be saved:\n', json);
		try {
			await fsPromises.writeFile(fName, json, { encoding: 'utf8', flag: 'w' });
			console.log(
				`Current state of the Coffee Machine is saved as JSON file: ${fName}`
			);
		} catch (err) {
			console.log('JSON file write ERROR!!! ');
			console.log(err.message);
		}
	}; // save()

	load = async () => {
		let parsedJson;
		try {
			const readData = await fsPromises.readFile(fName, { encoding: 'utf8' });
			// console.log("JSON data read from file:\n", readData);
			parsedJson = JSON.parse(readData.toString());
			// console.log("Parsed JSON:\n", parsedJson);
			if (parsedJson.offer && parsedJson.offer.length > 0)
				this.offer = parsedJson.offer;
			if (parsedJson.storage) this.storage = parsedJson.storage;
			console.log(
				'New state of the Coffee Machine was read from the JSON file.'
			);
		} catch (err) {
			console.log('ERROR reading machine state from JSON file!!!');
			console.log(err.message);
		}
	}; // load()

	take = () => {
		console.log(`I gave you $${this.storage.money}`);
		this.storage.money = 0;
	}; // take()

	fill = () => {
		const msg1 = 'Write how many ';
		const msg2 = ' do you want to add:\n';
		this.storage.water += Number(input(msg1 + 'ml of water' + msg2));
		this.storage.milk += Number(input(msg1 + 'ml of milk' + msg2));
		this.storage.beans += Number(input(msg1 + 'grams of coffee beans' + msg2));
		this.storage.cups += Number(input(msg1 + 'disposable coffee cups' + msg2));
	}; // fill()

	compose = () => {
		let name = input(
			"Write the name of the coffee you'd like to compose:\n"
		).trim();
		if (!name) {
			console.log('No name of new coffee provided...');
			return;
		}
		if (this.offer.map((coffee) => coffee.name).includes(name)) {
			console.log('This name already exists!');
			return;
		}
		const msg1 = 'Write how many ';
		const msg2 = ' this coffee should contain:\n';
		//  the '~~' are indirect conversions and roundings to Integers
		let water = ~~input(msg1 + 'ml of water' + msg2);
		let milk = ~~input(msg1 + 'ml of milk' + msg2);
		let beans = ~~input(msg1 + 'grams of coffee beans' + msg2);
		let money = ~~input(msg1 + '$ this coffee should cost:\n');
		let ingredients = [water, milk, beans];
		if (ingredients.every((ingr) => ingr < 1)) {
			console.log('None of ingredients were provided!');
			return;
		}
		if (money < 1) {
			console.log("The price wasn't provided!");
			return;
		}
		this.offer.push(new Coffee(name, money, ...ingredients));
	}; // compose()

	buy = () => {
		let ans;
		while (true) {
			console.log('What do you want to buy?');
			this.offer.forEach((c, i) => {
				console.log(
					`\t${i + 1} - ${c.name}, for $${c.money}, ` +
						`made of ${c.water} ml of water, ${c.milk} ml of milk,` +
						` and ${c.beans} grams of coffee beans`
				);
			});
			console.log('\tback - to main menu');

			ans = input().trim().toLowerCase();
			if (ans === 'back') return;

			ans = Number(ans);
			if (!ans || ans < 1 || ans > this.offer.length) {
				console.log('Sorry, wrong order...');
				continue;
			}
			break;
		} // while (true)

		const coffee = this.offer[ans - 1];
		const coffeeIngredients = Object.keys(new Ingr()); // only ingredients - without 'money' and 'name'
		const cupsAvailableByIngredients = coffeeIngredients.map((ingr) => {
			const ingrRequiredAmount = coffee[ingr];
			const ingrAvailableAmount = this.storage[ingr];
			return ingrRequiredAmount === 0
				? Number.MAX_SAFE_INTEGER
				: (ingrAvailableAmount / ingrRequiredAmount) & -1; // a bit tricky but works as integer division
		});
		const availCups = Math.min(...cupsAvailableByIngredients);

		if (availCups === 0) {
			console.log(
				`I'm sorry... I can't make any ${coffee.name} coffee right now,`
			);
			console.log(
				'Please add / fill some:',
				coffeeIngredients
					.filter((ingr, indx) => cupsAvailableByIngredients[indx] === 0)
					.join(' and ')
			);
			return;
		}

		// indirect conversion and rounding to Integer
		let nCups = ~~input(
			`How many cup(s) of ${coffee.name} would you like to buy?\n`
		);
		if (nCups > availCups) {
			console.log(
				`Sorry, I can make only ${availCups} cup(s) of ${coffee.name}.`
			);
			ans = input(
				`Would you like to buy that number of cups of ${coffee.name} (y/n)?\n`
			).toLowerCase();
			if (!ans.startsWith('y')) {
				console.log('OK, Bye for now...');
				return;
			} // inner if
			nCups = availCups;
		} // outer if

		console.log(`Making you ${nCups} cup(s) of ${coffee.name} coffee!`);
		this.storage.water -= coffee.water * nCups;
		this.storage.milk -= coffee.milk * nCups;
		this.storage.beans -= coffee.beans * nCups;
		this.storage.cups -= coffee.cups * nCups;
		this.storage.money += coffee.money * nCups;
	}; // buy
} // class Machine

const m = new Machine();

// m.showState();
m.mainMenu();
