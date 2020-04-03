import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

/**
 * Navigation Button component
 */
const NavigationButton = ({ url, label }) => {
    const navClass =
        "px-3 py-2 lg:py-2 flex items-center text-xs uppercase font-bold text-gray-800 hover:text-gray-600";

    if (url.match(/^\s?http(s?)/gi)) {
        return (
            <li className="flex items-center">
                <a
                    className={navClass}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {label}
                </a>
            </li>
        );
    } else {
        return (
            <li className="flex items-center">
                <Link className={navClass} to={url}>
                    {label}
                </Link>
            </li>
        );
    }
};

NavigationButton.propTypes = {
        url: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
};

export default NavigationButton;
