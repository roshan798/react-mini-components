import { Link } from "react-router-dom";
import pagesData from "./routingData";

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Welcome to My React Showcase
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Explore different components and features by clicking on the buttons below.
                </p>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {pagesData.map((page, index) => {
                        return <Link
                            key={index}
                            to={page.path}
                            className="group block bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-l text-white font-semibold text-center rounded-lg shadow-md p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300"
                        >
                            {page.name}
                        </Link>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
