import * as actionTypes from "./toasterType"
import {ToasterStateInterface} from "../interface/toasterInterface";

export const setToasterState = ( toasterData:ToasterStateInterface) => {
    return {
        type    :   actionTypes.SET_TOASTER,
        appear  :   toasterData.appear,
        title   :   toasterData.title,
        name    :   toasterData.name,
        message :   toasterData.message ,
    };
};
