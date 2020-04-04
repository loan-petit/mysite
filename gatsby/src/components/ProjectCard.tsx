import React from "react";
import { Link } from "gatsby";
import * as GhostContentApi from "tryghost__content-api"

type ProjectCardProps = {
  project: GhostContentApi.PostOrPage
  isFirst: boolean;
  isLast: boolean;
  goPrev: () => void;
  goNext: () => void;
};

/**
 * ProjectCard component
 */
const ProjectCard: React.FunctionComponent<ProjectCardProps> = ({
  project,
  isFirst,
  isLast,
  goPrev,
  goNext,
}) => {
  const url = `/${project.slug}/`;

  return (
    <div className="container p-12 mx-auto">
      <div
        className="relative items-center block bg-gray-100 rounded-lg shadow-xl md:flex"
        style={{ minHeight: "19rem" }}
      >
        {/* Header */}
        <header
          className="relative w-full h-full overflow-hidden rounded-t-lg md:w-2/5 md:rounded-t-none md:rounded-l-lg"
          style={{ minHeight: "19rem" }}
        >
          <Link to={url}>
            <img
              className="absolute inset-0 object-cover object-center w-full h-full"
              src={project.feature_image}
              alt=""
            />
            <div className="absolute inset-0 w-full h-full bg-indigo-900 opacity-75" />
            <h5 className="absolute inset-0 flex items-center justify-center w-full h-full text-white">
              {project.title}
            </h5>
          </Link>
        </header>

        {/* Body */}
        <div className="flex items-center w-full h-full bg-gray-100 rounded-lg md:w-3/5">
          <svg
            className="absolute inset-y-0 hidden w-24 h-full -ml-12 text-gray-100 fill-current md:block"
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
            className="left-0 -ml-6 projects-navigation-button hover:text-indigo-400 focus:outline-none"
            onClick={goPrev}
          >
            <i className="fas fa-arrow-left" />
          </button>
        ) : null}
        {!isLast ? (
          <button
            className="right-0 -mr-6 projects-navigation-button hover:text-indigo-400 focus:outline-none"
            onClick={goNext}
          >
            <i className="fas fa-arrow-right" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectCard;
