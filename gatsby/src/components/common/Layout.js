import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import { Navbar, WaveShapedCanvas } from ".";

// Styles
import "../../styles/app.scss";

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node;

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=3.0, minimum-scale=1"
                />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <header>
                <Navbar data={site} />
                {isHome && (
                    <div
                        className="relative w-full bg-center bg-cover vh-48 lg:vh-32"
                        style={{
                            backgroundImage: `url(${site.cover_image})`
                        }}
                    />
                )}
            </header>

            <main>
                {/* All the main content gets inserted here, index.js, post.js, etc. */}
                {children}
            </main>
        </>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired
    }).isRequired
};

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: { eq: "ghost-icon.png" }) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
);

export default DefaultLayoutSettingsQuery;
