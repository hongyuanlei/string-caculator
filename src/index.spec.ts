
it("Should return '0' when args are ''", () => {
	expect(stringCaculator("")).toEqual("0");
})

it("Should return '1' when args are '1'", () => {
	expect(stringCaculator("1")).toEqual("1");
})

it("Should return '1' when args are '', '1'", () => {
	expect(stringCaculator("", "1")).toEqual("1");
})

it("Should return 6 when args are '', '1', '2,3'", () => {
	expect(stringCaculator("0", "1", "2,3")).toEqual("6");
})

it("Should return 6 when args are '1\n2,3'", () => {
	expect(stringCaculator("1\n2,3")).toEqual("6");
});

it("Should return error message when input is invalid", () => {
	expect(() => stringCaculator("175,\n35")).toThrow("Number expected but '\n' found at position 4.");	
})

it("Should return error message 'Number expected but EOF found' when args is '1,3,'", () => {
	expect(() => stringCaculator("1,3,")).toThrow("Number expected but EOF found.");
});

it("Should allow the add method to handle a different delimiter", () => {
	expect(stringCaculator("//;\n1;2")).toEqual("3");
	expect(stringCaculator("//|\n1|2|3")).toEqual("6");
	expect(stringCaculator("//sep\n2sep3")).toEqual("5");
});

const split = (value: string): string[] => { 
	const regex = /\/\/(?<delimiter>.+)\n(?<numbers>.*)/
	const match = regex.exec(value);
	if (match) {
		const {delimiter, numbers} = match.groups;
		return numbers.split(delimiter);
	}
	return value.split(/,|\n/);
}

function stringCaculator(...values: string[]): string {
	values.forEach(value => {
		const index = value.indexOf(",\n");
		if (index !== -1) {
			throw Error(`Number expected but '\n' found at position ${index + 1}.`)
		}
		if (value.endsWith(",")) {
			throw Error("Number expected but EOF found.")
		}
	});

	const sumValue = values.flatMap(split).map((value): number => {
		if (value === "") {
			return 0;
		}
		return parseInt(value, 10);
	}).reduce((sum, value) => {
		return sum + value;
	}, 0);

	return sumValue.toString();
}
