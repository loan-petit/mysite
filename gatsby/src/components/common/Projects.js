import React from "react";
import WaveShapedCanvas from "./WaveShapedCanvas";

/**
 * Projects component
 */
const Projects = () => {
    return (
        <div className="relative pt-20 pb-32 lg:pb-56 bg-gray">
            <WaveShapedCanvas fillStyle="#e2e8f0" />

            <h2 className="text-center text-4xl font-semibold text-gray-800">
                My Projects
            </h2>

            <div class="container mx-auto p-12">
                <div
                    class="relative rounded-lg block md:flex items-center bg-gray-100 shadow-xl"
                    style={{ "min-height": "19rem" }}
                >
                    {/* Header */}
                    <div
                        class="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                        style={{ "min-height": "19rem" }}
                    >
                        <img
                            class="absolute inset-0 w-full h-full object-cover object-center"
                            src="https://stripe.com/img/v3/payments/overview/photos/missguided.jpg"
                            alt=""
                        />
                        <div class="absolute inset-0 w-full h-full bg-indigo-900 opacity-75" />
                        <h5 class="absolute inset-0 w-full h-full flex items-center justify-center text-white">
                            Missguided
                        </h5>
                    </div>

                    {/* Body */}
                    <div class="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg">
                        <svg
                            class="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-gray-100 -ml-12"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>
                        <div class="p-12 md:px-16">
                            <p class="text-gray-600">
                                <span class="text-gray-900">Missguided</span> is
                                a UK-based fashion retailer that has nearly
                                doubled in size since last year. They integrated
                                Stripe to deliver seamless checkout across
                                mobile and web for customers in 100+ countries,
                                all while automatically combating fraud.
                            </p>
                            <a
                                class="flex items-baseline mt-3 text-indigo-600 hover:text-indigo-900 focus:text-indigo-900"
                                href=""
                            >
                                <span>Learn more</span>
                            </a>
                        </div>
                    </div>

                    {/* Previous and next navigation buttons */}
                    <button class="projects-navigation-button left-0 -ml-6 hover:text-indigo-400 focus:outline-none">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <button class="projects-navigation-button right-0 -mr-6 hover:text-indigo-400 focus:outline-none">
                        <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Projects;
