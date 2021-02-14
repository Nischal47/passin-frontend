import React from "react";
import './navigationMenuCard.scss'
import {NavigationCardInterface} from "../../interface/homeInterfaces";
import {NavLink} from "react-router-dom";

const NavigationMenuCard: React.FC<NavigationCardInterface> = (props) => {

    const {name, link, icon} = props;

    return (
        <>
            <NavLink className='nav-link' to={link}>
                <div className='flex pointer card-menu justify-start pl-md pr-md'>
                    <div className='icon flex-centered'>
                        <img src={icon} alt=""/>
                    </div>
                    <div className='ml-md link-name flex-centered'>
                       <p className='text-center sub-title bold text-capitalize'>{name}</p>
                    </div>
                </div>
            </NavLink>
        </>
    )
}

export default NavigationMenuCard;