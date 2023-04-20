export const stringToBase64 = (data: string) => {
	return Buffer.from(new TextEncoder().encode(data)).toString('base64');
};

export const stringFromBase64 = (data: string) => {
	return new TextDecoder().decode(Buffer.from(data, 'base64'));
};
