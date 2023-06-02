import {comReducer, State, Action, Commentaire, Update} from "../src/reducer/comReducer";

describe('comReducer', () => {
    let initialState: State;

    beforeEach(() => {
        initialState = {
            coms: [
                { id: 1, titre: 'Note 1', note: 10, commentaire: 'Commentaire 1' },
                { id: 2, titre: 'Note 2', note: 12, commentaire: 'Commentaire 2' },
            ],
        };
    });

    it('should add a new commentaire to the state', () => {
        const newCom: Commentaire = {
            id: 3,
            titre: 'Note 3',
            note: 15,
            commentaire: 'Commentaire 3',
        };

        const addAction: Action = {
            type: 'ADD_COM',
            payload: newCom,
        };

        const newState = comReducer(initialState, addAction);

        expect(newState.coms.length).toBe(3);
        expect(newState.coms).toContainEqual(newCom);
    });

    it('should update an existing commentaire in the state', () => {
        const updatedCom: { id: number; updates: { note: number; titre: string; commentaire: string } } = {
            id: 1,
            updates: {
                titre: 'Note 1 - Updated',
                note: 11,
                commentaire: 'Commentaire 1 - Updated',
            },
        };

        const updateAction: { payload: { id: number; updates: { note: number; titre: string; commentaire: string } }; type: string } = {
            type: 'UPDATE_COM',
            payload: updatedCom,
        };

        const newState = comReducer(initialState, updateAction);

        expect(newState.coms.length).toBe(2);
        expect(newState.coms[0]).toEqual({
            id: 1,
            titre: 'Note 1 - Updated',
            note: 11,
            commentaire: 'Commentaire 1 - Updated',
        });
    });

    it('should delete a commentaire from the state', () => {
        const deleteAction: Action = {
            type: 'DELETE_COM',
            payload: { id: 2 },
        };

        const newState = comReducer(initialState, deleteAction);

        expect(newState.coms.length).toBe(1);
        expect(newState.coms).toEqual([
            { id: 1, titre: 'Note 1', note: 10, commentaire: 'Commentaire 1' },
        ]);
    });

    it('should return the current state for unknown action types', () => {
        const unknownAction: Action = {
            type: 'UNKNOWN_ACTION',
            payload: { id: 0, updates: undefined },
        };

        const newState = comReducer(initialState, unknownAction);

        expect(newState).toEqual(initialState);
    });
});