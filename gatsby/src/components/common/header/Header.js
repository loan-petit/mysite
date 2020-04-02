import React from "react";
import PropTypes from "prop-types";

import Navbar from "./Navbar";

import useCurrentSize from "../../../utils/useCurrentSize";

/**
 * Header component
 */
const Header = ({ data, isHome }) => {
    // Setup curved shaped overlay for cover image
    const canvasRef = React.useRef(null);
    const canvasContainerRef = React.useRef(null);

    // Redraw the background and its overlay on screen resize
    const screenSize = useCurrentSize();
    console.log(screenSize);

    if (isHome) {
        React.useEffect(() => {
            const canvas = canvasRef.current;
            canvas.width = canvasContainerRef.current.offsetWidth;
            canvas.height = canvasContainerRef.current.offsetHeight;
            var ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#cbd5e0';
            ctx.beginPath();

            ctx.moveTo(0, canvas.height * 0.85);
            ctx.quadraticCurveTo(
                canvas.width * 0.5,
                canvas.height,
                canvas.width,
                canvas.height * 0.7
            );
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);

            ctx.fill();
        });
    }

    return (
        <header>
            <Navbar data={data} />
            {isHome ? (
                <div
                    className="w-full bg-center bg-cover"
                    style={{
                        backgroundImage: `url(${data.cover_image})`,
                        height: `${screenSize.height / 4}px`
                    }}
                    ref={canvasContainerRef}
                >
                    <canvas ref={canvasRef} />
                </div>
            ) : null}
        </header>
    );
};

Header.propTypes = {
    data: PropTypes.shape({
        cover_image: PropTypes.string,
        logo: PropTypes.string,
        title: PropTypes.string.isRequired,
        navigation: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired
            }).isRequired
        ).isRequired
    }).isRequired,
    isHome: PropTypes.bool
};

export default Header;
