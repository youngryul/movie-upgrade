import { createBrowserRouter } from "react-router-dom";
import ComingSoon from "./Pages/ComingSoon";
import Popular from "./Pages/Popular";
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
                <Popular />
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
        path: "/popular/:id",
        element: (
            <>
                <Header />
                <Popular />
            </>
        ),
    },
    {
        path: "/coming/:id",
        element: (
            <>
                <Header />
                <ComingSoon />
            </>
        )
    },
    {
        path:"/now/:id",
        element: (
            <>
                <Header />
                <NowPlaying />
            </>
        )
    },
])

export default router;