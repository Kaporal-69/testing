import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactList from '../src/components/ContactList';
import { Action, Commentaire } from '../src/reducer/comReducer';
import {vi} from "vitest";

test('renders a list of contacts', () => {
    const mockComms: Commentaire[] = [
      {
        id: 1,
        titre: 'Note 1',
        note: 8,
        commentaire: 'Commentaire 1',
      },
      {
        id: 2,
        titre: 'Note 2',
        note: 10,
        commentaire: 'Commentaire 2',
      },
      {
        id: 3,
        titre: 'Note 3',
        note: 12,
        commentaire: 'Commentaire 3',
      },
    ];
  
    const mockHandleEdit = vi.fn();
    const mockDispatch = vi.fn();
  
    render(
      <ContactList comms={mockComms} handleEdit={mockHandleEdit} dispatch={mockDispatch} />
    );
  
    expect(screen.getByText('List of Notes')).toBeTruthy();
  
    expect(screen.getByText('Note 1')).toBeTruthy();
    expect(screen.getByText('Note 2')).toBeTruthy();
    expect(screen.getByText('Note 3')).toBeTruthy();
  
  });