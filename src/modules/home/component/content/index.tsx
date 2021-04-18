import React, {useEffect, useState} from "react";
import DashboardHeader from "../dashboardHeader/dashboardHeader";
import TableComponent from "../../../../common/tableComponent";
import {useDispatch, useSelector} from "react-redux";
import {
    AddPasswordInterface,
    DecryptPasswordInterface,
    DeletePasswordInterface,
    PasswordInterface
} from "../../interface/homeInterfaces";
import * as actions from '../../../../store/action'
import Modal from "../../../../common/modal";
import EditPassword from "../EditPassword";
import DecryptPassword from "../DecryptPassword";
import DeletePassword from "../DeletePassword";
import store from "../../../../store/store";


const Content = () => {
    const [passwords, setPasswords] = useState<PasswordInterface[]>([]);
    const [showAddOrEditPasswordModal, setShowAddOrEditPasswordModal] = useState(false);
    const [showDecryptPasswordModal, setShowDecryptPasswordModal] = useState(false);
    const [editPasswordObj, setEditPasswordObj] = useState<PasswordInterface>({
        id: 0,
        hostName: '',
        email: '',
        password: '',
        updatedOn: '',
        userId: 0,
    });
    const [passwordId, setPasswordId] = useState<number>(0);
    const [modalMode, setModalMode] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const dispatch = useDispatch();
    const firstName = store.getState().authReducer?.user?.firstName ?? '';

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
    const decryptedPassword = useSelector((state: any) => state.homeReducer.decryptedPassword);

    useEffect(() => {
        setPasswords(passwordsList)
        // eslint-disable-next-line
    }, [passwordsList])

    useEffect(() => {
        passwords.filter((password) => {
            if (decryptedPassword && password.id === decryptedPassword.id) {
                password.password = decryptedPassword.password;
            }
            return 0;
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [decryptedPassword])

    const addAction = () => {
        setModalMode('add');
        setShowAddOrEditPasswordModal(true);
    }

    const addPassword = async (payload: AddPasswordInterface) => {
        await dispatch(actions.addPassword(payload));
        dispatch(actions.getPasswords());
    }

    const editPassword = async (payload: AddPasswordInterface) => {
        await dispatch(actions.updatePassword(payload));
        dispatch(actions.getPasswords());
    }

    const editAction = (obj: any) => {
        setModalMode('edit');
        setEditPasswordObj(obj);
        setShowAddOrEditPasswordModal(true);
    }
    const deleteAction = (obj: any) => {
        setShowConfirmation(true);
        setPasswordId(obj.id);
    }

    const decryptAction = (obj: any) => {
        setEditPasswordObj(obj);
        setShowDecryptPasswordModal(true);
    }

    const decryptPassword = async (payload: DecryptPasswordInterface) => {
        dispatch(actions.decryptPassword(payload));
    }

    const deletePassword = async (payload: DeletePasswordInterface) => {
        await dispatch(actions.deletePassword(payload));
        dispatch(actions.getPasswords());
    }

    return (
        <>
            <div className='column full-height'>
                <div className='dashboard-header'>
                    <DashboardHeader firstName={firstName}/>
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
                <Modal show={showDecryptPasswordModal} title='Decrypt Password'
                       closeModal={() => setShowDecryptPasswordModal(false)}>
                    <DecryptPassword decryptPasswordObj={editPasswordObj} decryptPassword={decryptPassword}
                                     closeModal={() => setShowDecryptPasswordModal(false)}/>
                </Modal>
                <DeletePassword title="Confirm" content="Are you sure you want to delete this item?"
                                passwordId={passwordId}
                                show={showConfirmation}
                                deletePassword={deletePassword}
                                closeModal={() => setShowConfirmation(false)}/>

            </div>
        </>

    )
}

export default Content;