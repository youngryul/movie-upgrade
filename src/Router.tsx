import { createBrowserRouter } from "react-router-dom";
import ComingSoon from "./Pages/ComingSoon";
import Home from "./Pages/Home";
import NowPlaying from "./Pages/NowPlaying";
import Header from "./Components/Header";

interface LayoutProps {
    children: React.ReactNode;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Header />
                <Home />
            </>

        )
    },
    {
        path: "/coming-soon",
        element: (
           <>
               <Header />
               <ComingSoon />
           </>
        )
    },
    {
        path:"/now-playing",
        element: (
            <>
                <Header />
                <NowPlaying />
            </>
        )
    },
    {
        path: "popular/:id",
        element: (
            <>
                <Header />
                <Home />
            </>
        ),
    },
])

export default router;