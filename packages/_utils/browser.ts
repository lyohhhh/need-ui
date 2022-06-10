const toHEX = (i: number): string => {
	let result = i.toString(16);
	let j = 0;
	while (j + result.length < 4) {
		result = '0' + result;
		j++;
	}
	return result;
};

const binToHex = (str: string) => {
	let result = '';
	for (let i = 0; i < str.length; i++) {
		result += toHEX(str.charCodeAt(i));
	}
	return result;
};

const getBrowserId = (): string => {
	const cvs = document.createElement('canvas');
	const ctx = cvs.getContext('2d') as CanvasRenderingContext2D;
	const txt = 'blog';
	ctx.font = '12px';
	ctx.fillStyle = '#f60';
	ctx.fillText(txt, 10, 10);
	const base64 = cvs.toDataURL('image/png').replace('data:image/png;base64,', '');
	const b = atob(base64);
	const browserId = binToHex(b.slice(-16, -12));
	return browserId;
};

export default getBrowserId;
