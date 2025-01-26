import { Link } from "react-router-dom";
import { Home } from "lucide-react";

function Header({ componentCount }: { componentCount: number }) {
    return (
        <header className="bg-gray-800 p-4 shadow-md top-0 left-0 right-0 z-10">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-white hover:text-gray-400 transition duration-300">
                    <Home size={28} />
                </Link>

                <div className="text-white text-lg font-medium">
                    Components: {componentCount}
                </div>
            </div>
        </header>
    );
}

export default Header;
