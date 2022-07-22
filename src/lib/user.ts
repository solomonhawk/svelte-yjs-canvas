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

export function randomName() {
	return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
		animals[Math.floor(Math.random() * animals.length)]
	}`;
}
