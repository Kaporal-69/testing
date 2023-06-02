import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContactItem, { ExtraProps } from '../src/components/ContactItem';
import {Commentaire} from "../src/reducer/comReducer";
import {vi} from "vitest";
describe('ContactItem', () => {
    const mockCommentaire: Commentaire = {
        id: 1,
        titre: 'Titre de la note',
        note: 5,
        commentaire: 'Ceci est un commentaire',
    };

    const mockExtraProps: ExtraProps = {
        handleEdit: vi.fn(),
        dispatch: vi.fn(),
        backgroundColor: 'red',
    };

    test('renders the contact item with correct data', () => {
       const {queryByText} = render(<ContactItem {...mockCommentaire} {...mockExtraProps} />);

        expect(queryByText('Titre de la note')).toBeInTheDocument();
        expect(queryByText('5')).toBeInTheDocument();
        expect(queryByText('Ceci est un commentaire')).toBeInTheDocument();
    });

    test('calls handleEdit function on edit icon click', () => {
        const { getByTestId } = render(<ContactItem {...mockCommentaire} {...mockExtraProps} />);
        const editIcon = getByTestId('edit-icon');

        fireEvent.click(editIcon);

        expect(mockExtraProps.handleEdit).toHaveBeenCalledWith(1);
    });

    test('calls dispatch function on delete icon click', () => {
        const { getByTestId } = render(<ContactItem {...mockCommentaire} {...mockExtraProps} />);
        const deleteIcon = getByTestId('delete-icon');

        window.confirm = vi.fn(() => true);
        fireEvent.click(deleteIcon);

        expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this note ? Titre de la note 5?');
        expect(mockExtraProps.dispatch).toHaveBeenCalledWith({
            type: 'DELETE_COM',
            payload: { id: 1 },
        });
    });
});