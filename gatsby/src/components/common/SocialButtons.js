import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

/**
 * Social Buttons component
 */
const SocialButtons = ({ data }) => {
    return (
        <div className="flex flex-wrap justify-center mt-6">
            {data.website && (
                <a
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {data.website.match(/^http(s?):\/\/(www)*\.?linkedin/gi) ? (
                        <button
                            className="social-button focus:outline-none"
                            style={{ color: "#2867b2" }}
                        >
                            <i className="fab fa-linkedin" />
                        </button>
                    ) : (
                        <button className="social-button text-red-400 focus:outline-none">
                            <i className="fas fa-globe" />
                        </button>
                    )}
                </a>
            )}
            {data.twitter && (
                <a
                    href={data.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button
                        className="social-button focus:outline-none"
                        style={{ color: "#1DA1F2" }}
                    >
                        <i className="fab fa-twitter" />
                    </button>
                </a>
            )}
            {data.facebook && (
                <a
                    href={data.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button
                        className="social-button focus:outline-none"
                        style={{ color: "#1877F2" }}
                    >
                        <i className="fab fa-facebook" />
                    </button>
                </a>
            )}
            <a
                href="https://github.com/loan-petit"
                target="_blank"
                rel="noopener noreferrer"
            >
                <button
                    className="social-button focus:outline-none"
                    style={{ color: "#171516" }}
                >
                    <i className="fab fa-github" />
                </button>
            </a>
        </div>
    );
};

SocialButtons.propTypes = {
    data: PropTypes.shape({
        website: PropTypes.string,
        facebook: PropTypes.string,
        twitter: PropTypes.string
    }).isRequired
};

export default SocialButtons;
