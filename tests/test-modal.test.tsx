import { vi } from 'vitest';
import { render, fireEvent, screen} from '@testing-library/react';
import EditModal from '../src/components/EditModal';
import React from 'react';
import { expect } from 'chai';

describe('EditModal', () => {
    const mockDataToEdit = {
      id: 1,
      titre: 'Titre de la note',
      note: 5,
      commentaire: 'Ceci est un commentaire',
    };
  
    const mockToggleModal = vi.fn();
    const mockDispatch = vi.fn();
  
    const mockProps: EditModalProps = {
      showModal: true,
      dataToEdit: mockDataToEdit,
      toggleModal: mockToggleModal,
      dispatch: mockDispatch,
    };
  
    test('renders the EditModal with the ContactForm', () => {
      render(<EditModal {...mockProps} />);
  
      // Vérifier que le modal est affiché
      expect(screen.getByText('Update Note')).to.exist;
  
      // Vérifier que le ContactForm est rendu avec les bonnes props
      const contactForm = screen.getByLabelText('Titre');
      expect(contactForm).to.exist;
    });
  
    test('calls toggleModal function when the modal is closed', () => {
        render(<EditModal {...mockProps} />);
      
        const closeButton = screen.getByLabelText('Close');
        fireEvent.click(closeButton);
      
        expect(mockToggleModal).toHaveBeenCalled();
      });
  });