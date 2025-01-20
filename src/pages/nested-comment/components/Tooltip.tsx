import React, { useState } from "react";
interface TooltipProps {
    children: React.ReactNode;
    tooltipText: string;
    position?: "top" | "right" | "bottom" | "left";
}

const Tooltip: React.FC<TooltipProps> = ({ children, tooltipText, position = "top" }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const showTooltip = () => setIsVisible(true);
    const hideTooltip = () => setIsVisible(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            {isVisible && (
                <div
                    className={`absolute p-2 text-white bg-black rounded-md text-sm whitespace-nowrap z-10 ${getTooltipPosition(
                        position
                    )}`}
                    style={{ left: "50%", transform: "translateX(-50%)" }}
                >
                    {tooltipText}
                </div>
            )}
        </div>
    );
};

// Helper function to determine tooltip position
const getTooltipPosition = (position: "top" | "right" | "bottom" | "left") => {
    switch (position) {
        case "top":
            return "bottom-full mb-2";
        case "right":
            return "left-full ml-2";
        case "bottom":
            return "top-full mt-2";
        case "left":
            return "right-full mr-2";
        default:
            return "bottom-full mb-2";
    }
};

export default Tooltip;
