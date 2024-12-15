import { Button } from "@/components/ui/button";
import { Input } from "postcss";
import React from "react";

const HeroSection = () => {
    return (
        <div className="relative py-12 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 px-10 md:px-0">
            <div className="text-center mx-auto">
                <h1 className="text-white text-2xl md:text-4xl font-bold mb-4">Find the best courses for you</h1>
                <p className="text-gray-200 dark:text-gray-400 mb-8">Discover, Learn and Upskill with our wide range of courses</p>

                <form action="" className="flex items-center dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-md md:max-w-xl mx-auto mb-6">
                    <input type="text" className="w-full px-4 py-3 outline-none dark:text-gray-100 dark:placeholder-gray-500 placeholder-gray-400" placeholder="Search courses" />
                    <button className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800">Search</button>
                </form>
                <Button className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200">Explore courses</Button>
            </div>
        </div>
    );
};

export default HeroSection;
