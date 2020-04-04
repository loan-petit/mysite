import React from "react";

type SocialButtonsProps = {
  data: {
    website?: string,
    facebook?: string,
    twitter?: string
  }
};

/**
 * Social Buttons component
 */
const SocialButtons: React.FunctionComponent<SocialButtonsProps> = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-center mt-6">
      {/* LinkedIn or personal website */}
      {data.website && (
        <a href={data.website} target="_blank" rel="noopener noreferrer">
          {data.website.match(/^http(s?):\/\/(www)*\.?linkedin/gi) ? (
            <button
              className="social-button focus:outline-none"
              style={{ color: "#2867b2" }}
            >
              <i className="fab fa-linkedin" />
            </button>
          ) : (
            <button className="text-red-400 social-button focus:outline-none">
              <i className="fas fa-globe" />
            </button>
          )}
        </a>
      )}

      {/* Twitter */}
      {data.twitter && (
        <a href={data.twitter} target="_blank" rel="noopener noreferrer">
          <button
            className="social-button focus:outline-none"
            style={{ color: "#1DA1F2" }}
          >
            <i className="fab fa-twitter" />
          </button>
        </a>
      )}

      {/* Facebook */}
      {data.facebook && (
        <a href={data.facebook} target="_blank" rel="noopener noreferrer">
          <button
            className="social-button focus:outline-none"
            style={{ color: "#1877F2" }}
          >
            <i className="fab fa-facebook" />
          </button>
        </a>
      )}

      {/* GitHub */}
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

export default SocialButtons;
