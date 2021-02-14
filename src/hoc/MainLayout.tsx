import React from "react";
import MainRoute from "../routes";
import Toaster from "../common/toaster";

const MainLayout = () => {

    return (
        <>
            <MainRoute/>
            <Toaster/>
        </>
    )
}

export default MainLayout;
