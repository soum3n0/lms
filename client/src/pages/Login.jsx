import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    useLoginUserMutation,
    useRegisterUserMutation,
} from "@/features/Apis/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
    const [signupInput, setSignupInput] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loginInput, setLoginInput] = useState({ email: "", password: "" });

    const [
        registerUser,
        {
            data: registerData,
            error: registerError,
            isLoading: registerIsLoading,
            isSuccess: registerIsSuccess,
        },
    ] = useRegisterUserMutation();
    const [
        loginUser,
        {
            data: loginData,
            error: loginError,
            isLoading: loginIsLoading,
            isSuccess: loginIsSuccess,
        },
    ] = useLoginUserMutation();

    const navigate = useNavigate();

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value });
        } else {
            setLoginInput({ ...loginInput, [name]: value });
        }
    };

    const handleClick = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput;
        const action = type === "signup" ? registerUser : loginUser;
        await action(inputData);
    };

    useEffect(() => {
        if (registerIsSuccess && registerData) {
            toast.success(registerData.message || "Signup successful");
        }
        if (loginIsSuccess && loginData) {
            toast.success(loginData.message || "Login successful");
            navigate("/");
        }
        if (registerError) {
            toast.error(registerError.data.error || "Signup failed");
        }
        if (loginError) {
            toast.error(loginError.data.error || "Login failed");
        }
    }, [
        registerIsLoading,
        registerData,
        registerError,
        loginData,
        loginError,
        loginIsLoading,
    ]);

    return (
        <div className="flex justify-center w-full mt-20 md:mt-16">
            <Tabs defaultValue="login" className="w-[280px] md:w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Create a new account and click signup when
                                you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={(e) =>
                                        changeInputHandler(e, "signup")
                                    }
                                    value={signupInput.name}
                                    placeholder="Enter Name"
                                    required={true}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={(e) =>
                                        changeInputHandler(e, "signup")
                                    }
                                    value={signupInput.email}
                                    placeholder="Enter Email"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={(e) =>
                                        changeInputHandler(e, "signup")
                                    }
                                    value={signupInput.password}
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                disabled={registerIsLoading}
                                onClick={() => handleClick("signup")}
                            >
                                {registerIsLoading ? (
                                    <>
                                        <Loader2 /> Please wait
                                    </>
                                ) : (
                                    "Signup"
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login your password here. After signup, you'll
                                be logged in.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={(e) =>
                                        changeInputHandler(e, "login")
                                    }
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={(e) =>
                                        changeInputHandler(e, "login")
                                    }
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                disabled={loginIsLoading}
                                onClick={() => handleClick("login")}
                            >
                                {loginIsLoading ? (
                                    <>
                                        <Loader2 /> Please wait
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Login;
