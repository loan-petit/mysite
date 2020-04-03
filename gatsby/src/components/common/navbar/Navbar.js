import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import NavigationButton from "./NavigationButton";

/**
 * Navbar component
 *
 * The Navbar component is a responsive navigation bar.
 * The navigation items are taken as an array of your Ghost
 * navigation property that is fetched from the settings.
 * It differentiates between absolute (external) and relative link (internal).
 * You can pass it a custom class for your own styles, but it will always fallback
 * to a `site-nav-item` class.
 *
 */
const Navbar = ({ data }) => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    return (
        <>
            <nav className="flex flex-wrap items-center justify-between px-2 py-3 bg-white shadow">
                <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        {/* Title */}
                        <Link
                            to="/"
                            className="text-sm font-bold mr-4 py-2 whitespace-no-wrap uppercase text-gray-800"
                        >
                            {data.logo ? (
                                <img src={data.logo} alt={data.title} />
                            ) : (
                                data.title
                            )}
                        </Link>

                        {/* Menu Button */}
                        <button
                            className="cursor-pointer text-xl px-3 py-1 focus:outline-none lg:hidden"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <i className="text-gray-800 fas fa-bars" />
                        </button>
                    </div>

                    {/* Navigation Buttons */}
                    <div
                        className={
                            "bg-white lg:flex" + (!navbarOpen ? " hidden" : "")
                        }
                    >
                        <ul className="flex flex-col lg:flex-row list-none mr-auto">
                            {data.navigation.map((navItem, i) => (
                                <NavigationButton url={navItem.url} label={navItem.label} key={i} />
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

Navbar.propTypes = {
    data: PropTypes.shape({
        logo: PropTypes.string,
        title: PropTypes.string.isRequired,
        navigation: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired
            }).isRequired
        ).isRequired
    }).isRequired
};

export default Navbar;
