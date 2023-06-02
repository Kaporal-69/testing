import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContactForm from '../src/components/ContactForm';
import {vi} from "vitest";

describe('ContactForm', () => {
    const mockDispatch = vi.fn();
    const mockToggleModal = vi.fn();
  
    const mockDataToEdit: Commentaire = {
      id: 1,
      titre: 'Titre de la note',
      note: 5,
      commentaire: 'Ceci est un commentaire',
    };
  
    const mockProps: ContactFormProps = {
      dispatch: mockDispatch,
      dataToEdit: mockDataToEdit,
      toggleModal: mockToggleModal,
    };
  
    test('renders the contact form with correct data', () => {
      render(<ContactForm {...mockProps} />);
  
      expect(screen.getByLabelText('Titre')).toHaveValue('Titre de la note');
      expect(screen.getByTestId('note-input')).toHaveValue(mockDataToEdit.note.toString());
      //expect(screen.getByLabelText('Note')).toHaveValue('5');
      expect(screen.getByLabelText('Commentaire')).toHaveValue('Ceci est un commentaire');
    });
  
    test('calls dispatch function on form submit with updated data', () => {
      const updatedTitre = 'Nouveau titre';
  
      render(<ContactForm {...mockProps} />);
  
      fireEvent.change(screen.getByLabelText('Titre'), { target: { value: updatedTitre } });
      fireEvent.change(screen.getByLabelText('Note'), { target: { value: '9' } });
      fireEvent.change(screen.getByLabelText('Commentaire'), { target: { value: 'Updated Comment' } });
  
      fireEvent.submit(screen.getByTestId('contact-form'));
  
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'UPDATE_COM',
        payload: {
          id: 1,
          updates: {
            id: expect.any(Number),
            titre: updatedTitre,
            note: '9',
            commentaire: 'Updated Comment',
          },
        },
      });
      expect(mockToggleModal).toHaveBeenCalled();
    });
  });