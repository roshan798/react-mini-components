import { Link } from "react-router-dom";

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
                    {/* Add buttons for each page here */}
                    <Link
                        to="/nested-commments"
                        className="group block bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-center rounded-lg shadow-md p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300"
                    >
                        Nested Comments Component
                    </Link>
                    {/* <Link
                        to="/component2"
                        className="group block bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold text-center rounded-lg shadow-md p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300"
                    >
                        Component 2
                    </Link>
                    <Link
                        to="/component3"
                        className="group block bg-gradient-to-r from-pink-400 to-red-500 text-white font-semibold text-center rounded-lg shadow-md p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300"
                    >
                        Component 3
                    </Link> */}
                    {/* Add more links as needed */}
                </div>
            </div>
        </div>
    );
}

export default Home;
