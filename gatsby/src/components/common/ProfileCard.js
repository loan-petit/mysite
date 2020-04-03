import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { WaveShapedCanvas } from ".";
import SocialButtons from "./SocialButtons";

/**
 * Author Card component
 */
const ProfileCard = ({ data }) => {
    return (
        <div className="relative py-20 bg-gray-300">
            <div className="container mx-auto px-4">
                <div className="relative w-full flex flex-col items-center px-6 mb-6 break-words bg-white shadow-xl rounded-lg -v-mt-40 lg:-v-mt-24">
                    {/* Profile picture */}
                    <img
                        alt={data.name}
                        src={data.profile_image}
                        className="shadow-xl rounded-full h-auto border-none -mt-20"
                        style={{ maxWidth: "150px" }}
                    />

                    <div className="text-center mt-6">
                        {/* General informations */}
                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                            {data.name}
                        </h3>
                        <div className="text-base leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                            Freelance developer
                        </div>

                        {/* Social links */}
                        <SocialButtons data={data} />

                        {/* Location */}
                        {data.location && (
                            <div className="mt-6 mb-2 text-gray-700">
                                <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                                {data.location}
                            </div>
                        )}
                    </div>

                    {/* Profile summary */}
                    <div className="mt-10 py-10 border-t border-gray-300 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-9/12 px-4">
                                <p className="mb-4 text-lg leading-relaxed text-gray-800">
                                    {data.bio}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfileCard.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        cover_image: PropTypes.string,
        profile_image: PropTypes.string,
        website: PropTypes.string,
        bio: PropTypes.string,
        location: PropTypes.string,
        facebook: PropTypes.string,
        twitter: PropTypes.string
    }).isRequired,
    isOwner: PropTypes.bool
};

const ProfileCardQuery = props => {
    return (
        <StaticQuery
            query={graphql`
                query GhostOwnerQuery {
                    ghostAuthor(slug: { eq: "loanpetit" }) {
                        ...GhostAuthorFields
                    }
                }
            `}
            render={data => <ProfileCard data={data.ghostAuthor} {...props} />}
        />
    );
};

export default ProfileCardQuery;
