import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const Course = () => {
    return (
        <div className="mx-8 my-4 md:m-0">
            <Card>
                <img
                    src="https://img-c.udemycdn.com/course/750x422/2222850_4f40.jpg"
                    alt="node"
                    className="rounded-t-lg"
                />
                <CardHeader>
                    <CardTitle className="font-medium truncate">
                        Nodejsd sjhdb sjehbdjw js best course
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="user"
                                    />
                                    <AvatarFallback>User</AvatarFallback>
                                </Avatar>
                                <h3 className="font-medium text-sm">
                                    Soumen Dey
                                </h3>
                            </div>
                            <Badge className={"text-xs font-light"}>Hard</Badge>
                        </div>
                        <span className="font-bold">$ 299</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Course;
