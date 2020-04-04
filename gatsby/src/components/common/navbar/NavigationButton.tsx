import React from "react";
import { Link } from "gatsby";

type NavigationButtonProps = {
  url: string;
  label: string;
};

/**
 * Navigation Button component
 */
const NavigationButton: React.FunctionComponent<NavigationButtonProps> = ({ url, label }) => {
  const navClass =
    "px-3 py-2 lg:py-2 flex items-center text-xs uppercase font-bold text-gray-800 hover:text-gray-600";

  if (url.match(/^\s?http(s?)/gi)) {
    // External link
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
    // Internal navigation
    return (
      <li className="flex items-center">
        <Link className={navClass} to={url}>
          {label}
        </Link>
      </li>
    );
  }
};

export default NavigationButton;
