import React from "react";
import Course from "./Course";

const Courses = () => {
    const courses = [1,2];
    const isLoading = false;
    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-center my-8">
                Our Courses
            </h1>
            <div className="max-w-6xl mx-auto">
                {isLoading ? (
                    <CoursesSkeleton />
                ) : courses.length === 0 ? (
                    <div>No courses available to show</div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 mx-8">
                        {courses.map((_, index) => (
                            <Course key={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;

const CoursesSkeleton = () => {
    return <div>skeleton</div>;
};
