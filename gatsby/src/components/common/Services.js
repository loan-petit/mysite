import React from "react";
import WaveShapedCanvas from "./WaveShapedCanvas";

/**
 * Services component
 */
const Services = () => {
    return (
        <div className="relative pb-32 lg:pb-56 bg-gray-300">
            <WaveShapedCanvas fillStyle="#ffffff" />

            <h2 className="text-center text-4xl font-semibold text-gray-800">
                My services
            </h2>

            <div className="flex flex-wrap justify-center">
                {/* Mobile and web applications */}
                <div className="w-full md:w-5/12 lg:w-3/12 px-4 mt-12 text-center">
                    <div className="service-icon-container">
                        <i className="fas fa-desktop text-xl"></i>
                    </div>
                    <h5 className="service-title">
                        Mobile and web applications
                    </h5>
                    <p className="service-summary">
                        I will develop both, with Flutter or React based on your
                        preferences.
                    </p>
                </div>
                {/* DevOps */}
                <div className="w-full md:w-5/12 lg:w-3/12 px-4 mt-12 text-center">
                    <div className="service-icon-container">
                        <i className="fas fa-cogs text-xl"></i>
                    </div>
                    <h5 className="service-title">DevOps</h5>
                    <p className="service-summary">
                        I will improve and automate the delivery of your
                        software using GitHub Actions, Docker and Ansible.
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap justify-center">
                {/* Backend */}
                <div className="w-full md:w-5/12 lg:w-3/12 px-4 mt-12 text-center">
                    <div className="service-icon-container">
                        <i className="fas fa-cogs text-xl"></i>
                    </div>
                    <h5 className="service-title">Backend</h5>
                    <p className="service-summary">
                        I will develop stable and efficient backend using
                        GraphQL, Prisma and Node.js.
                    </p>
                </div>
                {/* Chatbot */}
                <div className="w-full md:w-5/12 lg:w-3/12 px-4 mt-12 text-center">
                    <div className="service-icon-container">
                        <i className="fas fa-lightbulb text-xl"></i>
                    </div>
                    <h5 className="service-title">Chatbot</h5>
                    <p className="service-summary">
                        With Dialogflow, I will develop and deploy chatbots on
                        voice assistant or messaging platforms.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Services;
