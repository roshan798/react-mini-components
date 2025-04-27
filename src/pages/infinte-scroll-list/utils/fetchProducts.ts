import { DummyProductResponse } from "../../frontend-pagination";
//https://dummyjson.com/products?page=1&limit=10
const API_URL = "https://dummyjson.com/products";

const DELAY = 1000; // 1 second delay for simulating network latency
const getRandomDelay = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getFromLocalStorage = (key: string) => {
	return new Promise<DummyProductResponse | null>((resolve) => {
		const data = localStorage.getItem(key);
		if (data) {
			setTimeout(() => {
				resolve((JSON.parse(data) as DummyProductResponse));
			}, getRandomDelay(100, 3 * DELAY));
		} else {
			resolve(null);
		}
	});
}
export async function fetchProducts(page: number = 0, limit: number = 10) {
	// const API_URL = "https://dummyjson.com/products"cont
	const cachedData = await getFromLocalStorage("page-" + page.toString());
	if (cachedData) {
		console.log("Using cached data for page", page);
		return cachedData;
	}

	try {
		const response = await fetch(API_URL + `?page=${page}&limit=${limit}&skip=${page * limit}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) throw new Error("Failed to fetch products");

		const data = (await response.json()) as DummyProductResponse;
		localStorage.setItem("page-" + page.toString(), JSON.stringify(data));
		return data;
	} catch (error) {
		console.error(error);
	}
};



