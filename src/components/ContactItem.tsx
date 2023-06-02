import React from 'react';
import { FC } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Action, Commentaire } from '../reducer/comReducer';

export interface ExtraProps {
    handleEdit: (id: number) => void;
    dispatch: React.Dispatch<Action>;
    backgroundColor: string;
}

const ContactItem: FC<Commentaire & ExtraProps> = ({
    id,
    titre,
    note,
    commentaire,
    handleEdit,
    dispatch,
    backgroundColor
    }) => {
    return (
        <tr style={{ backgroundColor }}>
            <td>{titre}</td>
            <td>{note}</td>
            <td>{commentaire}</td>
            <td>
                <AiFillEdit size={20} onClick={() => handleEdit(id)} className="icon" data-testid="edit-icon" />
            </td>
            <td>
                <AiFillDelete
                    size={20}
                    onClick={() => {
                        const confirmDelete = window.confirm(
                            `Are you sure you want to delete this note ? ${titre} ${note}?`
                        );
                        if (confirmDelete) {
                            dispatch({
                                type: 'DELETE_COM',
                                payload: { id }
                            });
                        }
                    }}
                    className="icon"
                    data-testid="delete-icon"
                />
            </td>
        </tr>
    );
};

export default ContactItem;