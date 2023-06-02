export interface Commentaire {
  id: number;
  titre: string;
  note: number;
  commentaire: string;
}

export interface Update {
  id: number;
  updates?: Commentaire;
}

export interface Action {
  type: 'ADD_COM' | 'UPDATE_COM' | 'DELETE_COM'
  payload: Commentaire | Update;
}

export interface State {
  coms: Commentaire[];
}

export const comReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_COM':
      return {
        ...state,
        coms: [...state.coms, action.payload as Commentaire]
      };
    case 'UPDATE_COM':
      const { id, updates } = action.payload as Update;
      return {
        ...state,
        coms: state.coms.map((comm) => {
          if (comm.id === id) {
            return {
              ...comm,
              ...updates
            };
          }
          return comm;
        })
      };
    case 'DELETE_COM': {
      const { id } = action.payload;
      return {
        ...state,
        coms: state.coms.filter((comm) => comm.id !== id)
      };
    }
    default:
      return state;
  }
};