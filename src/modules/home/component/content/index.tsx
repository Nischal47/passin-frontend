import React, {useEffect, useState} from "react";
import DashboardHeader from "../dashboardHeader/dashboardHeader";
import TableComponent from "../../../../common/tableComponent";
import {useDispatch, useSelector} from "react-redux";
import {AddPasswordInterface, DecryptPasswordInterface, PasswordInterface} from "../../interface/homeInterfaces";
import * as actions from '../../../../store/action'
import Modal from "../../../../common/modal";
import Confirmation from "../../../../common/modal/Confirmation";
import EditPassword from "../EditPassword";
import DecryptPassword from "../DecryptPassword";

const Content = () => {
    const [passwords, setPasswords] = useState<PasswordInterface[]>([]);
    const [showAddOrEditPasswordModal, setShowAddOrEditPasswordModal] = useState(false);
    const [showDecryptPasswordModal, setShowDecryptPasswordModal] = useState(false);
    const [editPasswordObj, setEditPasswordObj] = useState<PasswordInterface>({
        id: 0,
        hostName: '',
        email: '',
        password: '',
        updatedOn:'',
        userId: 0,
    });
    const [modalMode, setModalMode] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
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
    const decryptedPasswords = useSelector((state: any) => state.homeReducer.decryptedPassword);

    useEffect(() => {
        setPasswords(passwordsList)
        // eslint-disable-next-line
    }, [passwordsList])

    useEffect(() => {
        let mixedArray:PasswordInterface[] = passwords;

        // decryptedPasswords.filter

        mixedArray.map((password:PasswordInterface) => (
            decryptedPasswords.map((decryptedPassword:PasswordInterface) => (
                decryptedPassword.id === password.id ? password.password = decryptedPassword.password : password.password = password.password
            ))
        ))

        setPasswords(mixedArray);
    },[decryptedPasswords])

    const addAction = () => {
        setModalMode('add');
        setShowAddOrEditPasswordModal(true);
    }

    const addPassword = async (payload: AddPasswordInterface) => {
       await dispatch(actions.addPassword(payload));
       dispatch(actions.getPasswords());
    }

    const editPassword = async (payload: AddPasswordInterface) => {
        dispatch(actions.addPassword(payload));
    }

    const editAction = (obj: any) => {
        setModalMode('edit');
        setEditPasswordObj(obj);
        setShowAddOrEditPasswordModal(true);
    }
    const deleteAction = (obj: any) => {
        setShowConfirmation(true);
        // setEditProjectObj(obj);
    }

    const deleteConfirmation = async () => {
        // await dispatch(actions.deleteProject(editProjectObj.id));
        setShowConfirmation(false);
    }

    const decryptAction = (obj: any) => {
        setEditPasswordObj(obj);
        setShowDecryptPasswordModal(true);

    }

    const decryptPassword = async (payload:DecryptPasswordInterface) => {
        dispatch(actions.decryptPassword(payload));
    }

    return (
        <>
            <div className='column full-height'>
                <div className='dashboard-header'>
                    <DashboardHeader/>
                </div>
                <div className='dashboard-content pa-md'>
                    <header className={'flex justify-between items-center mb-md'}>
                        <div className="ml-xl title bold text-primary">Passwords</div>
                        <button className="btn primary" onClick={addAction}>Add Password</button>
                    </header>
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
                <Modal show={showAddOrEditPasswordModal} title={modalMode === 'add' ? 'Add Password' : 'Edit Password'}
                       closeModal={() => setShowAddOrEditPasswordModal(false)}>
                    <EditPassword addPassword={addPassword}
                                  editPassword={editPassword}
                                  editPasswordObj={editPasswordObj}
                                  closeModal={() => setShowAddOrEditPasswordModal(false)} mode={modalMode}/>
                </Modal>
                <Modal show={showDecryptPasswordModal} title='Decrypt Password'  closeModal={() => setShowDecryptPasswordModal(false)}>
                    <DecryptPassword decryptPasswordObj={editPasswordObj} decryptPassword={decryptPassword} closeModal={() => setShowDecryptPasswordModal(false)}/>
                </Modal>
                <Confirmation title="Confirm" content="Are you sure you want to delete this item?"
                              show={showConfirmation}
                              confirm={deleteConfirmation}
                              closeModal={() => setShowConfirmation(false)}/>

            </div>
        </>

    )
}

export default Content;