import React from "react";
import Course from "./Course";

const MyLearning = () => {
    const isLoading = false;
    const course = [1,1,11,1];
    return (
        <div className="max-w-5xl mx-auto mt-10">
            <h1 className="font-bold text-xl md:text-2xl text-center md:text-start">
                My Learning
            </h1>
            <div>
                {isLoading ? (
                    <MyLearningSkeleton />
                ) : course.length === 0 ? (
                    <p className="mt-4">You haven't enrolled in any course.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 mt-5 md:mt-10">
                        {course.map((_, index) => (
                            <Course key={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyLearning;

const MyLearningSkeleton = () => {
    return <div>Skeleton</div>;
};
