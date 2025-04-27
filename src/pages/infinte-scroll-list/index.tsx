import ProductCard from "../frontend-pagination/components/ProductCard";
import { Product } from "../frontend-pagination/types";
import { useState, useEffect, useRef, useCallback } from "react";
import { fetchProducts as fetchProductsAPI } from "./utils/fetchProducts";
import Loader from "./components/Loader";

const InfiniteScrollList = () => {
	const limit = 12;

	const [products, setProducts] = useState<Product[]>([]);
	const [page, setPage] = useState<number>(0);
	const [maxPage, setMaxPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);


	const loaderRef = useRef<HTMLDivElement | null>(null);


	const fetchProducts = useCallback(async () => {
		if (page > maxPage) return;

		setLoading(true);
		setError(null);

		try {
			const newProducts = await fetchProductsAPI(page, limit);

			if (newProducts?.total && newProducts.limit) {
				const totalPages = Math.ceil(newProducts.total / limit);
				if (totalPages !== maxPage) {
					setMaxPage(totalPages);
				}
			}

			if (newProducts !== undefined) {
				setProducts((prev) => [...prev, ...newProducts.products]);
			}
		} catch (err) {
			setError("Failed to fetch products. Please try again later.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	}, [page, maxPage]);


	useEffect(() => {
		fetchProducts();
	}, [page, fetchProducts]);

	useEffect(() => {

		if (products.length === 0) return;
		const observer = new IntersectionObserver(
			(entries) => {
				const firstEntry = entries[0];
				if (firstEntry.isIntersecting && !loading && page < maxPage) {
					console.log("Loading more products...");
					setPage((prevPage) => prevPage + 1);
				}
			},
			{
				root: null,
				rootMargin: window.innerHeight + "px",
				threshold: 0,
			}
		);

		const loader = loaderRef.current;
		if (loader) {
			observer.observe(loader);
		}

		return () => {
			if (loader) {
				observer.unobserve(loader);
			}
		};
	}, [loading, page, maxPage]);

	return (
		<div className="infinite-scroll-list container mx-auto min-h-screen p-6">
			<div className="header mb-10">
				<h1 className="text-center text-5xl font-bold text-blue-700">Infinite Scroll List 🚀</h1>
				<p className="text-center text-gray-500 mt-2">Scroll down to load more products automatically</p>
			</div>


			<div className="component  rounded-lg   p-2 ">
				<div className="component-content">
					<div className="flex flex-wrap justify-center gap-6">
						{products.map((product, idx) => (
							<ProductCard key={idx} product={product} />
						))}
					</div>


					<div ref={loaderRef} className="flex justify-center mt-8">
						{loading && <Loader />}
						{!loading && page >= maxPage && (
							<p className="text-center text-gray-400 text-lg mt-4">🎉 You have reached the end!</p>
						)}
					</div>


					{error && (
						<p className="text-red-500 text-center mt-6 font-medium">{error}</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default InfiniteScrollList;
