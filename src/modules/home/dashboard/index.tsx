import React from "react";
import '../home.scss'
import NavigationBar from "../component/navigationBar/navigationBar";
import Content from "../component/content";

const Dashboard = () => {
    return (
        <>
            <div className='dashboard flex'>
                <div className='nav-bar'>
                    <NavigationBar/>
                </div>
                <div className='content'>
                    <Content/>
                </div>
            </div>
        </>
    )
}

export default Dashboard;