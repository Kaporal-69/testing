import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { Action, Commentaire } from '../reducer/comReducer';
import ContactForm from './ContactForm';

interface EditModalProps {
  showModal: boolean;
  dataToEdit: Commentaire | undefined;
  toggleModal: () => void;
  dispatch: React.Dispatch<Action>;
}

const EditModal: FC<EditModalProps> = ({
  toggleModal,
  dataToEdit,
  showModal,
  dispatch
}) => {
  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton  data-testid="modal-close-button">
        <Modal.Title>Update Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContactForm
          dispatch={dispatch}
          dataToEdit={dataToEdit}
          toggleModal={toggleModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
