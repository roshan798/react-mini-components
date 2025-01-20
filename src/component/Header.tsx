import { Link } from "react-router-dom";
import { Home } from "lucide-react";

function Header() {
    return (
        <header className="bg-gray-800 p-4 shadow-md  top-0 left-0 right-0 z-10">
            <div className="container mx-auto flex items-center justify-start">
                <Link to="/" className="text-white hover:text-gray-400 transition duration-300">
                    <Home size={28} />
                </Link>
            </div>
        </header>
    );
}

export default Header;
