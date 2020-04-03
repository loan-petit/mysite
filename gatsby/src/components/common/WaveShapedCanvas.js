import React from "react";
import PropTypes from "prop-types";

import Navbar from "./navbar/Navbar";

import useCurrentSize from "../../utils/useCurrentSize";

/**
 * Wave Shaped Canvas component
 */
const WaveShapedCanvas = ({ fillStyle }) => {
    // Setup curved shaped overlay for cover image
    const canvasRef = React.useRef(null);

    // Redraw the background and its overlay on screen resize
    var screenSize = useCurrentSize();
    console.log(screenSize);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = screenSize.width;
        canvas.height = screenSize.height / 15;
        var ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = fillStyle;
        ctx.beginPath();

        ctx.moveTo(0, canvas.height * 0.5);
        ctx.quadraticCurveTo(
            canvas.width * 0.5,
            canvas.height * 0.6,
            canvas.width,
            0
        );
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);

        ctx.fill();
    });

    return <canvas className="z-0 absolute bottom-0" ref={canvasRef} />;
};

WaveShapedCanvas.propTypes = {
    fillStyle: PropTypes.string.isRequired
};

export default WaveShapedCanvas;
