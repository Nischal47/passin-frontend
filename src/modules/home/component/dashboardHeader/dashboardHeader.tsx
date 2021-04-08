import React from 'react';

interface DashboardHeader{
    firstName:string
}

const DashboardHeader:React.FC<DashboardHeader> = (props) => {

    const {firstName} = props

    return (
        <>
            <div className='flex full-width justify-end pl-xl pr-xl'>
                <div className='user-name mr-md'>
                    <p className='sub-title text'>{props.firstName}</p>
                </div>
                <div className='profile-pic align-center mr-md'>
                    <img className='cover-center' src="https://picsum.photos/200/300" alt=""/>
                </div>
            </div>
        </>
    )
}

export default DashboardHeader;