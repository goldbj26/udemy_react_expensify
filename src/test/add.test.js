const add = (a,b) => a+b;
const HelloWorld= (name = 'Anonymous') => `Hello ${name}`

test('add 2 numbers', () => {
	const result = add(3,4);
	expect(result).toBe(7);

	const result2 = add(2,20);
	expect(result2).toBe(22);

	const HelloYisroel = HelloWorld('Yisroel');
	expect(HelloYisroel).toBe("Hello Yisroel");

	const HelloAnonymous = HelloWorld();
	expect(HelloAnonymous).toBe("Hello Anonymous");
	/*
	if (result!==7) {
		throw new Error(`add 2 numbers: add(3,4) was ${result} not 7`);
	}*/
});