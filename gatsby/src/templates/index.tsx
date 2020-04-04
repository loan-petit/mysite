import React from "react";
import { graphql } from "gatsby";
import * as GhostContentApi from "tryghost__content-api"

import { ProfileCard, Services, ProjectCard, Contact } from "../components";
import { Layout, WaveShapedCanvas } from "../components/common";
import { MetaData } from "../components/common/meta";

interface GraphqlNodePost {
  node: GhostContentApi.PostOrPage
}

type IndexProps = {
  data: {
    allGhostPost: {
      edges: Array<GraphqlNodePost>
    }
  },
  location: {
    pathname: string
  },
  pageContext?: object
};

/**
 * Main index page (home page)
 */
const Index: React.FunctionComponent<IndexProps> = ({ data, location }) => {
  const projects = data.allGhostPost.edges;
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <>
      <MetaData location={location} />

      <Layout isHome={true}>
        <ProfileCard />

        <Services />

        <section className="relative pt-20 pb-32 lg:pb-56">
          <WaveShapedCanvas fillStyle="#1a202c" />

          <h2 className="text-4xl font-semibold text-center text-gray-800">
            My Projects
          </h2>

          <ProjectCard
            key={projects[activeIndex].node.id}
            project={projects[activeIndex].node}
            isFirst={!activeIndex}
            isLast={activeIndex == projects.length - 1}
            goPrev={() => setActiveIndex(activeIndex - 1)}
            goNext={() => setActiveIndex(activeIndex + 1)}
          />

          <div className="flex flex-wrap justify-center">
            {projects.map((_, index) => (
              <button
                key={index}
                className={
                  "w-4 h-4 mx-1 rounded-full shadow-lg focus:outline-none" +
                  (index == activeIndex ? " bg-indigo-400" : " bg-gray-300")
                }
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </section>

        <Contact />
      </Layout>
    </>
  );
};

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostProjectQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { tags: { elemMatch: { slug: { eq: "hash-project" } } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`;
