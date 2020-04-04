import React from "react";

/**
 * Contact component
 */
const Contact = () => {
    return (
        <div className="relative px-6 py-24 bg-gray-900">
            <div className="container flex flex-col w-full min-w-0 px-4 mx-auto break-words bg-gray-300 rounded-lg shadow-lg lg:w-5/12">
                <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                        Want to work with us?
                    </h4>
                    <p className="mt-1 mb-4 leading-relaxed text-gray-600">
                        Complete this form and we will get back to you in 24
                        hours.
                    </p>

                    {/* Full Name field */}
                    <div className="relative w-full mt-8 mb-3">
                        <label
                            className="block mb-2 text-xs font-bold text-gray-700 uppercase"
                            htmlFor="full-name"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white rounded shadow focus:outline-none focus:shadow-outline"
                            placeholder="Full Name"
                            style={{ transition: "all .15s ease" }}
                        />
                    </div>

                    {/* Email field */}
                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold text-gray-700 uppercase"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-3 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white rounded shadow focus:outline-none focus:shadow-outline"
                            placeholder="Email"
                            style={{ transition: "all .15s ease" }}
                        />
                    </div>

                    {/* Message field */}
                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold text-gray-700 uppercase"
                            htmlFor="message"
                        >
                            Message
                        </label>
                        <textarea
                            rows="4"
                            cols="80"
                            className="w-full px-3 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white rounded shadow focus:outline-none focus:shadow-outline"
                            placeholder="Type a message..."
                        />
                    </div>

                    {/* Submit */}
                    <div className="mt-6 text-center">
                        <button
                            className="px-6 py-3 text-sm font-bold text-white uppercase bg-gray-900 rounded shadow outline-none focus:outline-none"
                            type="button"
                        >
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
