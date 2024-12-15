import { LogOut, Menu, NotebookPen, School, User } from "lucide-react";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "./DarkMode";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/features/Apis/authApi";

const NavBar = () => {
    const [logout, { data, error, isLoading, isSuccess }] = useLogoutMutation();
    const user = true;
    const role = "instructor";
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        if(data?.successful){
            navigate("/login");
        }
    };

    return (
        <div className="dark:bg-[#0A0A0A] flex justify-between items-center border-b-gray-200 dark:border-b-gray-800 mx-4 md:mx-20 my-4">
            <div className="flex items-center gap-2">
                <School size={"30"} />
                <h1 className="block text-xl font-extrabold md:text-2xl">
                    LearnSphere
                </h1>
            </div>
            <div className="hidden md:flex gap-2 md:gap-8 items-center">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="hover:cursor-pointer">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="user"
                                />
                                <AvatarFallback>User</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <Link to="profile">
                                    <DropdownMenuItem>
                                        <User />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                </Link>
                                <Link to="my-learning">
                                    <DropdownMenuItem>
                                        <NotebookPen />
                                        <span>My Learning</span>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <div className="flex justify-center items-center ">
                                <Button className="m-2 w-full">
                                    Dashboard
                                </Button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex gap-2">
                        <Button variant="outline">Login</Button>
                        <Button>Signup</Button>
                    </div>
                )}
                <DarkMode />
            </div>
            <div className="md:hidden">
                <MobileNavBar user={user} role={role} handleLogout={handleLogout} />
            </div>
        </div>
    );
};

export default NavBar;

const MobileNavBar = ({ user, role, handleLogout }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="flex flex-row items-center justify-around">
                    <SheetTitle className="text-xl">LearnSphere</SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <DropdownMenuSeparator />
                {user ? (
                    <nav className="flex flex-col gap-2">
                        <Link to="profile">
                            <span>Profile</span>
                        </Link>
                        <Link to="my-learning">
                            <span>My Learning</span>
                        </Link>
                        <span onClick={handleLogout}>Log out</span>
                    </nav>
                ) : (
                    <nav className="flex flex-col gap-2">
                        <button>Login</button>
                        <button>Signup</button>
                    </nav>
                )}
                <DropdownMenuSeparator />

                {role === "instructor" && (
                    <SheetFooter className="mt-4">
                        <SheetClose asChild>
                            <Button type="submit">Dashboard</Button>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};
