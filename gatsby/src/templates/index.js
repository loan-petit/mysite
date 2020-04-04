import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import {
    ProfileCard,
    Layout,
    Services,
    ProjectCard,
    WaveShapedCanvas,
    Contact
} from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ data, location }) => {
    const projects = data.allGhostPost.edges;
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <>
            <MetaData location={location} />

            <Layout isHome={true}>
                <ProfileCard />

                <Services />

                <section className="relative pt-20 pb-32 lg:pb-56 bg-gray">
                    <WaveShapedCanvas fillStyle="#1a202c" />

                    <h2 className="text-center text-4xl font-semibold text-gray-800">
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
                                    (index == activeIndex
                                        ? " bg-indigo-400"
                                        : " bg-gray-300")
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

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    pageContext: PropTypes.object
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
