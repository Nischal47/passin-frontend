import React from 'react';
import './tableComponent.scss';

import EditIcon from '../../assets/images/edit.svg';
import DeleteIcon from '../../assets/images/delete.svg';
import DecryptIcon from '../../assets/images/decrypt.svg';

const TableComponent = (props: any) => {

    const {rows, columns} = props;

    const hasActions = () => {
        return props.downloadAction ||
            props.editAction ||
            props.decryptAction ||
            props.deleteAction;
    }

    return (
        <>
            <table className="content-table">
                <thead>
                <tr>
                    {columns.map((column: string, key: number) => (
                        <th key={key}>{column}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {
                    rows.map((row: any, key: number) => (
                        <tr key={key}>
                            <td>{row.hostName}</td>
                            <td>{row.email}</td>
                            <td>{row.password}</td>
                            <td>{row.updatedOn}</td>
                            <td>
                                {
                                    hasActions() &&
                                    (
                                        <div className="actions table-body-items flex">
                                            {props.editAction ? <div className='pointer outlined pa-sm ml-sm mr-sm'
                                                onClick={() => props.editAction(rows.id)}
                                            >
                                                <img src={EditIcon} alt=""/>
                                            </div> : ''}
                                            {props.decryptAction ? <div  className='pointer outlined pa-sm ml-sm mr-sm'
                                                                         onClick={() => props.decryptAction(rows.id)}
                                            >
                                                <img src={DecryptIcon} alt=""/>
                                            </div> : ''}
                                            {props.deleteAction ? <div  className='pointer outlined pa-sm ml-sm mr-sm'
                                                                        onClick={() => props.deleteAction(rows.id)}
                                            >
                                                <img src={DeleteIcon} alt=""/>
                                            </div> : ''}
                                        </div>
                                    )
                                }
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

export default TableComponent;
