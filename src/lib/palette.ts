export const colors = [
	'#ffffff',
	'#000000',
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

export function randomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}

export function getPaletteColor(index: number) {
	return colors[index];
}
