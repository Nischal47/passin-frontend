import React, {useEffect, useState} from "react";
import DashboardHeader from "../dashboardHeader/dashboardHeader";
import TableComponent from "../../../../common/tableComponent";
import {useDispatch, useSelector} from "react-redux";
import {PasswordInterface} from "../../interface/homeInterfaces";
import * as actions from '../../../../store/action'

const Content = () => {

    const [passwords,setPassword] = useState<PasswordInterface[]>([]);
    const dispatch = useDispatch();

    const [columns] = useState([
        "Host Name",
        "Username",
        "Password",
        "Updated On",
        "Actions"
    ]);

    useEffect(() => {
       dispatch(actions.getPasswords())
        // eslint-disable-next-line
    }, [])

    const passwordsList = useSelector((state: any) => state.homeReducer.passwords);

    useEffect(() => {
        setPassword(passwordsList)
        // eslint-disable-next-line
    },[passwordsList])

    // const deleteConfirmation = async () => {
    //     await dispatch(deleteClientUser(editUserObj.id, id));
    //     setShowConfirmation(false);
    // }
    //
    // const inviteAction = () => {
    //     setModalMode('invite');
    //     setShowModal(true);
    // }

    const editUser = async (payload: any) => {
        // await dispatch(editClientUser(editUserObj.id, payload, id));
        console.log('hello')
    }

    const editAction = (obj: any) => {
        console.log('edit')
    }
    const deleteAction = (obj: any) => {
        console.log('delete')
    }

    const decryptAction = (obj: any) => {
        console.log('decrypt')
    }

    return (
        <>
           <div className='column full-height'>
               <div className='dashboard-header'>
                   <DashboardHeader/>
               </div>
               <div className='dashboard-content'>
                   <div className="pa-xl table-container">
                       <TableComponent
                           rows={passwords}
                           columns={columns}
                           editAction={editAction}
                           deleteAction={deleteAction}
                           decryptAction={decryptAction}
                       />
                   </div>
               </div>
           </div>
        </>
    )
}

export default Content;