import { useEffect, useReducer, useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import EditModal from './components/EditModal';
import Header from './components/Header';
import { Commentaire, comReducer, State } from './reducer/comReducer';

const initialState: State = {
  coms: []
};

function App() {
  const [state, dispatch] = useReducer(comReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<Commentaire | undefined>(undefined);

  useEffect(() => {
    if (!showModal) {
      setDataToEdit(undefined);
    }
  }, [showModal]);

  const toggleModal = () => {
    setShowModal((show) => !show);
  };

  const handleEdit = (id: number) => {
    setDataToEdit(state.coms.find((com) => com.id === id));
    toggleModal();
  };

  return (
    <div className='App'>
      <Header />
      <div className='main-container'>
        <ContactForm
          dispatch={dispatch}
          dataToEdit={dataToEdit}
          toggleModal={toggleModal}
        />
        <hr />
        {state.coms.length > 0 && (
          <ContactList
            comms={state.coms}
            handleEdit={handleEdit}
            dispatch={dispatch}
          />
        )}
      </div>
      <EditModal
        showModal={showModal}
        dataToEdit={dataToEdit}
        toggleModal={toggleModal}
        dispatch={dispatch}
      />
    </div>
  );
}

export default App;
