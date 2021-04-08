import React from "react";
import logo from "../../../../assets/images/pass-in-logo.svg";
import NavigationMenuCard from "../NavigationMenuCard/NavigationMenuCard";
import {NavigationCardInterface} from "../../interface/homeInterfaces";
import PasswordsIcon from "../../../../assets/images/passwords.svg"
import SettingIcon from "../../../../assets/images/settings.svg"
import logout from "../../../../assets/images/logout.svg";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import * as actions from "../../../../store/action";

const NavigationBar = () => {

    const navigationItems:NavigationCardInterface[] = [
        {icon:PasswordsIcon,link:'',name:'passwords'},
        {icon:SettingIcon,link:'',name:'Settings'},
    ]

    const dispatch = useDispatch();
    const history = useHistory();

    const logoutUser = async ()=>{
        await dispatch(actions.logout());
        history.push("/");
    }

    return (
        <div className='flex navigation column pt-md pb-md'>
            <div className='logo mt-md'>
                <img src={logo} alt={'logo'}/>
            </div>
            <div className='navigations'>
                {
                    navigationItems.map((item,key:number)=>(
                        <NavigationMenuCard link={item.link} name={item.name} icon={item.icon} key={key}/>
                    ))
                }
            </div>
            <div className='flex justify-start logout pointer pa-md' onClick={logoutUser}>
                <div className='icon mr-md align-center'>
                    <img src={logout} alt=""/>
                </div>
                <div className='sub-title text-center bold'>Logout</div>
            </div>
        </div>
    )
}

export default NavigationBar;