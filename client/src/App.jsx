import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import Profile from "./pages/student/Profile";
import MyLearning from "./pages/student/MyLearning";
import Courses from "./pages/student/Courses";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: (
                    <>
                        <HeroSection />
                        <Courses/>
                    </>
                ),
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/my-learning",
                element: <MyLearning />,
            },
        ],
    },
]);

function App() {
    return (
        <main>
            <RouterProvider router={appRouter} />
        </main>
    );
}

export default App;
