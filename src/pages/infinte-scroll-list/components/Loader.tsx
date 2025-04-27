import { FC } from "react";

const Loader: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            {/* Spinning circle */}
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            {/* Loading text */}
            <p className="text-blue-500 font-semibold">Loading...</p>
        </div>
    );
};

export default Loader;
