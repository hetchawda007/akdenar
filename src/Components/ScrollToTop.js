import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Force scroll to top on route change
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant" // Using "instant" instead of "smooth" prevents issues on mobile
        });

        // Fallback for older browsers
        setTimeout(() => {
            if (window.pageYOffset > 0) {
                window.scrollTo(0, 0);
            }
        }, 100);
    }, [pathname]);

    return null;
}

export default ScrollToTop;