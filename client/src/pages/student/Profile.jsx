import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React from "react";
import Course from "./Course";
import { useProfileQuery } from "@/features/Apis/authApi";

const Profile = () => {
    const {data, isLoading} = useProfileQuery();

    return (
        <div className="max-w-5xl mx-auto mt-10 px-6 md:px-0">
            <h2 className="text-lg md:text-2xl font-semibold text-center md:text-start md:font-bold my-2 md:my-8">
                PROFILE
            </h2>
            <div className="flex items-center gap-8">
                <Avatar className="h-32 w-32">
                    <AvatarImage
                        src={data?.user?.photoUrl || "https://github.com/shadcn.png"}
                        alt="user"
                    />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-4">
                    <div>
                        <div className="font-semibold">
                            <span>Name : </span>
                            <span className="font-normal">{data?.user?.name}</span>
                        </div>
                        <div className="font-semibold">
                            Email :{" "}
                            <span className="font-normal">
                                {data?.user?.email}
                            </span>
                        </div>
                        <div className="font-semibold">
                            Role : <span className="font-normal">{data?.user?.role}</span>
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click
                                    save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <form action="" className="grid gap-4 py-4">
                                <div className="grid grid-cols-3 items-center">
                                    <Label>Update name</Label>
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        className="col-span-2"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center">
                                    <Label>Profile photo</Label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="col-span-2"
                                    />
                                </div>
                            </form>
                            <DialogFooter>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" />{" "}
                                            Please Wait
                                        </>
                                    ) : (
                                        "Save changes"
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="mt-10">
                <h3 className="text-lg font-semibold">
                    Courses you're enrolled in
                </h3>
                <div className="mt-4">
                    {data?.user?.enrolledCourses.length === 0 ? (
                        <p>You haven't enrolled yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {data?.user?.enrolledCourses.map((_, index) => (
                                <Course key={index} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
