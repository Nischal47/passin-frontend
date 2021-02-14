import React, {Dispatch, useEffect} from 'react';
import './toaster.scss'
import {useDispatch, useSelector} from "react-redux";

import {ToasterPropsInterface, ToasterStateInterface} from "./interface/toasterInterface";
import {RootState} from "../../store/interface/storeInterface";

import * as actions from './services/toasterAction'

const Toaster: React.FC<ToasterPropsInterface> = () => {
    const dispatch = useDispatch<Dispatch<any>>()

    const {
        title,
        name,
        message,
        appear
    } = useSelector((state: RootState) => state.toasterReducer)

    useEffect(() => {
        const timer = setTimeout(() => {
            const toasterData: ToasterStateInterface = {
                appear  : false,
                title   : '',
                name    : '',
                message : '',
            }
            dispatch(actions.setToasterState(toasterData))
        }, 3000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appear]);


    return (
        <div
            className={`toaster ${
                appear ? "on" : "off"
            } ${title.toLowerCase()}`}
        >
            <div className="toaster-title bold">{name}</div>
            <div className="toaster-description">{message}</div>
        </div>

    );
};

export default Toaster;
