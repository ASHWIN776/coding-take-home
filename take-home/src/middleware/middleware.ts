import data from '../mock-data/MOCK_DATA.json';
import { groupDataByCountry } from '../lib/utils';

// This is a tester function to show the intended flow of data from middleware to frontend.
export const fetchData = () => {
	console.log(data);
};

export const fetchByProperty = (property: 'color' | 'language', value: string) => {
	return data.filter((item) => item[property] === value)
}

export const fetchCountryData = () => {
	return groupDataByCountry(data)
}

export const fetchNullData = (property: 'color' | 'language') => {
	return data.filter((item) => item[property] === null)
}

