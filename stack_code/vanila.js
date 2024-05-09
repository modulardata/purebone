class Media {
	constructor(title) {
		this._title = title;
		this._isCheckedOut = false;
		this._ratings = [];
	}

	get title() {
		return this.title;
	}

	get isCheckedOut() {
		return this.isCheckedOut;
	}

	get ratings() {
		return this.ratings;
	}

	set isCheckedOut(value) {
		this.isCheckedOut = value;
	}

	toggleCheckedOutStatus() {
		this.isCheckOut = !this.isCheckedOut;
	}

	gerAvailableRating() {
		let ratingsSum = this.ratings.reduce(
			(accumulator, rating) => accumulator + rating,
			0
		);
	}
}
