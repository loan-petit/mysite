import { useState, useEffect } from "react";

const getWidth = () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

const getHeight = () =>
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

export function useCurrentSize() {
    // Save current screen width and height
    let [size, setSize] = useState({ width: getWidth(), height: getHeight() });

    // In this case useEffect will execute only once because
    // it does not have any dependencies.
    useEffect(() => {
        // Debounce mechanism
        let timeoutId = null;

        const resizeListener = () => {
            // Prevent execution of previous setTimeout
            clearTimeout(timeoutId);
            // Change width and height from the state object after 150 milliseconds
            timeoutId = setTimeout(
                () => setSize({ width: getWidth(), height: getHeight() }),
                150
            );
        };

        // Set resize listener
        window.addEventListener("resize", resizeListener);

        // Clean up function
        return () => {
            // remove resize listener
            window.removeEventListener("resize", resizeListener);
        };
    }, []);

    return size;
}

export default useCurrentSize;
