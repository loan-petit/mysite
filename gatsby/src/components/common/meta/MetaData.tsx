import React from "react";
import { StaticQuery, graphql } from "gatsby";
import url from "url";
import * as GhostContentApi from "tryghost__content-api";

import config from "../../../utils/siteConfig";
import ArticleMeta from "./ArticleMeta";
import WebsiteMeta from "./WebsiteMeta";

interface GraphqlNodeSetting {
  node: GhostContentApi.Setting;
}

interface SettingsProp {
  allGhostSettings: {
    edges: Array<GraphqlNodeSetting>;
  };
}

type MetaDataProps = {
  data: {
    ghostPost?: object;
    ghostTag?: object;
    ghostAuthor?: object;
    ghostPage?: object;
  };
  settings: SettingsProp | GhostContentApi.Setting;
  location: {
    pathname: string;
  };
  title?: string;
  description?: string;
  image?: string;
};

/**
 * MetaData will generate all relevant meta data information incl.
 * JSON-LD (schema.org), Open Graph (Facebook) and Twitter properties.
 *
 */
const MetaData: React.FunctionComponent<MetaDataProps> = ({
  data,
  settings,
  title,
  description,
  image,
  location,
}) => {
  const canonical = url.resolve(config.siteUrl, location.pathname);
  const { ghostPost, ghostTag, ghostAuthor, ghostPage } = data;
  settings = (settings as SettingsProp).allGhostSettings.edges[0].node;

  if (ghostPost) {
    return <ArticleMeta data={ghostPost} canonical={canonical} />;
  } else {
    title = title || config.siteTitleMeta || settings.title;
    description =
      description || config.siteDescriptionMeta || settings.description;
    image = image || settings.cover_image || null;
    image = image ? url.resolve(config.siteUrl, image) : null;

    return (
      <WebsiteMeta
        data={{}}
        canonical={canonical}
        title={title}
        description={description}
        image={image}
        type="WebSite"
      />
    );
  }
};

MetaData.defaultProps = {
  data: {},
};

const MetaDataQuery = (props) => (
  <StaticQuery
    query={graphql`
      query GhostSettingsMetaData {
        allGhostSettings {
          edges {
            node {
              title
              description
            }
          }
        }
      }
    `}
    render={(data) => <MetaData settings={data} {...props} />}
  />
);

export default MetaDataQuery;
