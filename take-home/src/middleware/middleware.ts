import data from '../mock-data/MOCK_DATA.json';

// This is a tester function to show the intended flow of data from middleware to frontend.
export const fetchData = () => {
	return data;
};

export const fetchByProperty = (property: 'color' | 'language', value: string) => {
	return data.filter((item) => item[property] === value)
}

export const fetchCountryData = () => {
	return data.reduce((acc, item) => {
		if (item.country) {
			acc[item.country] = acc[item.country] || [];
			acc[item.country].push(item);
		}
		return acc;
	}, {} as Record<string, typeof data>)
}

export const fetchNullData = (property: 'color' | 'language') => {
	return data.filter((item) => item[property] === null)
}

