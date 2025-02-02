import { useEffect, useState } from "react";
import { Product } from "./types";
import ProductCard from "./components/ProductCard";

const API_URL = "https://dummyjson.com/products?limit=0";

export interface DummyProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

function ProductPagination({ products }: { products: Product[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const currentProducts = products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const getPaginationNumbers = () => {
        const pages: number[] = [];
        const totalDisplayedPages = 5; 
        let startPage = Math.max(1, currentPage - Math.floor(totalDisplayedPages / 2));
        const endPage = Math.min(totalPages, startPage + totalDisplayedPages - 1);
        
        if (endPage - startPage + 1 < totalDisplayedPages) {
            startPage = Math.max(1, endPage - totalDisplayedPages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="m-6">
            <div className="flex flex-wrap justify-center gap-4">
                {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="mt-6 flex justify-center items-center space-x-2">
                <button
                    className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-800 disabled:opacity-50"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                {currentPage > 3 && (
                    <button
                        className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-800"
                        onClick={() => setCurrentPage(1)}
                    >
                        1
                    </button>
                )}
                {getPaginationNumbers().map((page) => (
                    <button
                        key={page}
                        className={`px-4 py-2 rounded-lg text-white ${currentPage === page ? "bg-blue-800" : "bg-blue-600 hover:bg-blue-800"}`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}
                {currentPage < totalPages - 2 && (
                    <button
                        className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-800"
                        onClick={() => setCurrentPage(totalPages)}
                    >
                        {totalPages}
                    </button>
                )}
                <button
                    className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-800 disabled:opacity-50"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

const getStoredProducts = (): DummyProductResponse | null => {
    const storedData = localStorage.getItem("productResponse");
    return storedData ? JSON.parse(storedData) : null;
};

function ProductPaginationComponent() {
    const [productData, setProductData] = useState<DummyProductResponse>({ products: [], total: 0, skip: 0, limit: 0 });

    useEffect(() => {
        const fetchProducts = async () => {
            const cachedData = getStoredProducts();
            if (cachedData) {
                setProductData(cachedData);
                return;
            }
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Failed to fetch products");
                const data = (await response.json()) as DummyProductResponse;
                localStorage.setItem("productResponse", JSON.stringify(data));
                setProductData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-center text-4xl font-bold mb-6">Product Pagination</h1>
            <ProductPagination products={productData.products} />
        </div>
    );
}

export default ProductPaginationComponent;