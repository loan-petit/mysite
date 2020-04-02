import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

/**
 * Navigation Button component
 */
const NavigationButton = ({ data }) => {
    const navClass =
        "px-3 py-2 lg:py-2 flex items-center text-xs uppercase font-bold text-gray-800";

    if (data.url.match(/^\s?http(s?)/gi)) {
        return (
            <li className="flex items-center">
                <a
                    className={navClass}
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {data.label}
                </a>
            </li>
        );
    } else {
        return (
            <li className="flex items-center">
                <Link className={navClass} to={data.url}>
                    {data.label}
                </Link>
            </li>
        );
    }
};

NavigationButton.propTypes = {
    data: PropTypes.shape({
        url: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    }).isRequired
};

export default NavigationButton;
