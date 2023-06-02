import { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Action, Commentaire } from '../reducer/comReducer';

interface ContactFormProps {
  dispatch: React.Dispatch<Action>;
  dataToEdit: Commentaire | undefined;
  toggleModal: () => void;
}

const ContactForm: FC<ContactFormProps> = ({
  dispatch,
  dataToEdit,
  toggleModal
}) => {
  const [com, setCom] = useState({
    titre: dataToEdit?.titre ? dataToEdit.titre : '',
    note: dataToEdit?.note ? dataToEdit.note : 0,
    commentaire: dataToEdit?.commentaire ? dataToEdit.commentaire : ''
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCom((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { titre, note, commentaire } = com;

    if (
        titre.trim() === '' ||
        note === 0 ||
        commentaire.trim() === ''
    ) {
      setErrorMsg('All the fields are required.');
      return;
    }

    if (!dataToEdit) {
      dispatch({
        type: 'ADD_COM',
        payload: {
          id: Date.now(), // returns current timestamp
          ...com
        }
      });
      setCom({
        titre: '',
        note: 0,
        commentaire: ''
      });
      setErrorMsg('');
    } else {
      dispatch({
        type: 'UPDATE_COM',
        payload: {
          id: dataToEdit.id,
          updates: {
            id: Date.now(),
            ...com
          }
        }
      });
      toggleModal();
    }
  };

  return (
    <Form onSubmit={handleOnSubmit} className='contact-form'>
      {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
      <Form.Group controlId='titre'>
        <Form.Label>Titre</Form.Label>
        <Form.Control
          className='titre'
          name='titre'
          value={com.titre}
          type='text'
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId='note'>
        <Form.Label>Note</Form.Label>
        <Form.Control
          className='note'
          name='note'
          value={com.note}
          type='number'
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId='commentaire'>
        <Form.Label>Commentaire</Form.Label>
        <Form.Control
          className='commentaire'
          name='commentaire'
          value={com.commentaire}
          type='text'
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId='submit'>
        <Button variant='primary' type='submit' className='submit-btn'>
          {dataToEdit ? 'Mise à jour' : 'Ajouter'}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ContactForm;