import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import * as GhostContentApi from "tryghost__content-api";

import Navbar from "./navbar/Navbar";

// Styles
import "../../styles/app.scss";
import WaveShapedCanvas from "./WaveShapedCanvas";

interface GraphqlNodeSetting {
  node: GhostContentApi.Setting & { codeinjection_styles: string };
}

type DefaultLayoutProps = {
  bodyClass?: string;
  isHome?: boolean;
  data: {
    file?: object;
    allGhostSettings: {
      edges: Array<GraphqlNodeSetting>;
    };
  };
};

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout: React.FunctionComponent<DefaultLayoutProps> = ({
  data,
  children,
  bodyClass,
  isHome,
}) => {
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
          <figure
            className="relative w-full bg-center bg-cover vh-48 lg:vh-32"
            style={{
              backgroundImage: `url(${site.cover_image})`,
            }}
          />
        )}
      </header>

      <main>
        {/* All the main content gets inserted here, index.js, post.js, etc. */}
        {children}
      </main>

      {!isHome && (
        <div className="relative mt-20 lg:mt-32">
          <WaveShapedCanvas fillStyle="#1a202c" />
        </div>
      )}

      <div className="flex flex-col flex-wrap justify-center bg-gray-900">
        <small className="pb-4">
          Copyright © {new Date().getFullYear()} Loan PETIT. All rights
          reserved.
        </small>
      </div>
    </>
  );
};

const DefaultLayoutSettingsQuery = (props) => (
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
    render={(data) => <DefaultLayout data={data} {...props} />}
  />
);

export default DefaultLayoutSettingsQuery;
