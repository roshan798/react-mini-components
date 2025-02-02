// generated using GPT
import React from "react";
import { Product } from "../types";
import { Star } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 max-w-sm border border-gray-200">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg"
            />
            <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-900">{product.title}</h2>
                <p className="text-sm text-gray-600 truncate">{product.description}</p>
                <div className="flex items-center mt-2">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.discountPercentage > 0 && (
                        <span className="ml-2 text-sm text-red-500">
                            -{product.discountPercentage}%
                        </span>
                    )}
                </div>
                <div className="flex items-center mt-2">
                    <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, index) => (
                            <Star
                                key={index}
                                className={`w-4 h-4 ${index < Math.round(product.rating) ? "fill-current" : "stroke-current"}`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                </div>
                <div className="mt-4">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
