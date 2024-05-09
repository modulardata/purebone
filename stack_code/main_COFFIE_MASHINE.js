const input = require('sync-input');

const coffeeMachine = {
	water: 400,
	milk: 540,
	coffeeBeans: 120,
	cups: 9,
	money: 550,
	chose: '',
	option: '',
	remaining: function () {
		console.log(`The coffee machine has:
    ${this.water} ml of water
    ${this.milk} ml of milk
    ${this.beans} g of coffee beans
    ${this.cups} of disposable cups
    $${this.money} of money\n`)
	},
	buy: function () {
		this.chose = parseInt(
			input(
				'\nWhat do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:\n'
			)
		);
		if (this.chose === 1) {
			if (this.water >= 250 && this.beans >= 15 && this.cups >= 1) {
				this.water -= 250;
				this.beans -= 16;
				this.cups -= 1;
				this.money += 4;
				console.log(`I have enough resources, making you a coffee!\n`);
			} else if (this.water < 250) {
				console.log(`Sorry, not enough water!`);
			} else if (this.beans < 15) {
				console.log(`Sorry, not enough beans!`);
			} else if (this.cups < 1) {
				console.log(`Sorry, not enough cups!`);
			}
		} else if (this.chose === 2) {
			if (
				this.water >= 350 &&
				this.milk >= 75 &&
				this.beans >= 20 &&
				this.cups >= 1
			) {
				this.water -= 350;
				this.milk -= 75;
				this.beans -= 20;
				this.cups -= 1;
				this.money += 7;
				console.log(`I have enough resources, making you a coffee!\n`);
			} else if (this.water < 350) {
				console.log(`Sorry, not enough water!`);
			} else if (this.milk < 75) {
				console.log(`Sorry, not enough milk!`);
			} else if (this.beans < 20) {
				console.log(`Sorry, not enough beans!`);
			} else if (this.cups < 1) {
				console.log(`Sorry, not enough cups!`);
			}
		} else if (this.chose === 3) {
			if (
				this.water >= 200 &&
				this.milk >= 100 &&
				this.beans >= 12 &&
				this.cups >= 1
			) {
				this.water -= 200;
				this.milk -= 100;
				this.beans -= 12;
				this.cups -= 1;
				this.money += 6;
				console.log(`I have enough resources, making you a coffee!\n`);
			} else if (this.water < 200) {
				console.log(`Sorry, not enough water!`);
			} else if (this.milk < 100) {
				console.log(`Sorry, not enough milk!`);
			} else if (this.beans < 12) {
				console.log(`Sorry, not enough beans!`);
			} else if (this.cups < 1) {
				console.log(`Sorry, not enough cups!`);
			}
		} else if (this.chose === 4) {
			console.log(`Back to main menu!\n`);
		} else {
			console.log(`Wrong input!\n`);
		}
	},
	fill: function () {
		this.water += parseInt(
			input('Write how many ml of water do you want to add:\n')
		);
		this.milk += parseInt(
			input('Write how many ml of milk do you want to add:\n')
		);
		this.beans += parseInt(
			input('Write how many grams of coffee beans do you want to add:\n')
		);
		this.cups += parseInt(
			input('Write how many disposable cups of coffee do you want to add:\n')
		);
	},
	take: function () {
		console.log(`I gave you $${this.money}\n`);
		this.money = 0;
	},
};

while (true) {
	coffeeMachine.option = parseInt(
		input('Write action (buy, fill, take, remaining, exit):\n')
	);
	// console.log(coffeeMachine.option);
	if (coffeeMachine.option === 'fill') {
		coffeeMachine.fill();
	} else if (coffeeMachine.option === 'take') {
		coffeeMachine.take();
	} else if (coffeeMachine.option === 'remaining') {
		coffeeMachine.remaining();
	} else if (coffeeMachine.option === 'buy') {
		coffeeMachine.buy();
	} else if (coffeeMachine.option === 'exit') {
		console.log(`Goodbye!\n`);
		break;
	} else {
		console.log(`Wrong input!\n`);
	}
}
