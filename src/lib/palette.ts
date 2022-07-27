export type Palette = string[];

export const autumn = [
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

export const endsega32 = [
	'#ffffff',
	'#181425',
	'#be4a2f',
	'#d77643',
	'#ead4aa',
	'#e4a672',
	'#b86f50',
	'#733e39',
	'#3e2731',
	'#a22633',
	'#e43b44',
	'#f77622',
	'#feae34',
	'#fee761',
	'#63c74d',
	'#3e8948',
	'#265c42',
	'#193c3e',
	'#124e89',
	'#0099db',
	'#2ce8f5',
	'#c0cbdc',
	'#8b9bb4',
	'#5a6988',
	'#3a4466',
	'#262b44',
	'#ff0044',
	'#68386c',
	'#b55088',
	'#f6757a',
	'#e8b796',
	'#c28569'
];

export function randomColor(palette: Palette) {
	return palette[Math.floor(Math.random() * palette.length)];
}

export function getPaletteColor(palette: Palette, index: number) {
	return palette[index];
}
