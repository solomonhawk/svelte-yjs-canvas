const adjectives = [
	'Curious',
	'Determined',
	'Eager',
	'Enthusiastic',
	'Excited',
	'Focused',
	'Grateful'
];

const animals = [
	'Dolphin',
	'Penguin',
	'Turtle',
	'Lobster',
	'Shark',
	'Whale',
	'Otter',
	'Fox',
	'Cat',
	'Dog'
];

const colors = [
	'#043D38',
	'#004D40',
	'#406230',
	'#87A30D',
	'#FFA000',
	'#FF6F00',
	'#E65100',
	'#B71C1C',
	'#880E4F',
	'#750D5E',
	'#600E69',
	'#4B0C56',
	'#350942',
	'#200730',
	'#0B0317',
	'#020105'
];

export function randomName() {
	return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
		animals[Math.floor(Math.random() * animals.length)]
	}`;
}

export function randomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}
