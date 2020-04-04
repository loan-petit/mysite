import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

/**
 * ProjectCard component
 */
const ProjectCard = ({ project, isFirst, isLast, goPrev, goNext }) => {
    const url = `/${project.slug}/`;

    return (
        <div className="container mx-auto p-12">
            <div
                className="relative rounded-lg block md:flex items-center bg-gray-100 shadow-xl"
                style={{ minHeight: "19rem" }}
            >
                {/* Header */}
                <header
                    className="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                    style={{ minHeight: "19rem" }}
                >
                    <Link to={url}>
                        <img
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            src={project.feature_image}
                            alt=""
                        />
                        <div className="absolute inset-0 w-full h-full bg-indigo-900 opacity-75" />
                        <h5 className="absolute inset-0 w-full h-full flex items-center justify-center text-white">
                            {project.title}
                        </h5>
                    </Link>
                </header>

                {/* Body */}
                <div className="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg">
                    <svg
                        className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-gray-100 -ml-12"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>
                    <div className="p-12 md:px-16">
                        <p className="text-gray-600">{project.excerpt}</p>
                        <Link
                            className="flex items-baseline mt-3 text-indigo-600 hover:text-indigo-900 focus:text-indigo-900"
                            to={url}
                        >
                            <span>Learn more</span>
                        </Link>
                    </div>
                </div>

                {/* Previous and next navigation buttons */}
                {!isFirst ? (
                    <button
                        className="projects-navigation-button left-0 -ml-6 hover:text-indigo-400 focus:outline-none"
                        onClick={goPrev}
                    >
                        <i className="fas fa-arrow-left"></i>
                    </button>
                ) : null}
                {!isLast ? (
                    <button
                        className="projects-navigation-button right-0 -mr-6 hover:text-indigo-400 focus:outline-none"
                        onClick={goNext}
                    >
                        <i className="fas fa-arrow-right"></i>
                    </button>
                ) : null}
            </div>
        </div>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        excerpt: PropTypes.string.isRequired
    }).isRequired,
    isFirst: PropTypes.bool.isRequired,
    isLast: PropTypes.bool.isRequired,
    goPrev: PropTypes.func.isRequired,
    goNext: PropTypes.func.isRequired
};

export default ProjectCard;
