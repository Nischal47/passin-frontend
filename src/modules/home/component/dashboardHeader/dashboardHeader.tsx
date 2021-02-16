import React from 'react';

const DashboardHeader = () => {
    return (
        <>
            <div className='flex full-width justify-end pl-xl pr-xl'>
                <div className='user-name mr-md'>
                    <p className='sub-title text'>Nischal Babu Bohara</p>
                </div>
                <div className='profile-pic align-center mr-md'>
                    <img className='cover-center' src="https://picsum.photos/200/300" alt=""/>
                </div>
            </div>
        </>
    )
}

export default DashboardHeader;