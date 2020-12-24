import { types } from "../../types/types";

// const initialState = {
//   uid: "",
//   chatActivo: null, //UID del user al que quiero enviar msg
//   usuarios: [], // Todos los users de la db
//   mensajes: [], // El chat seleccionado
// };

export const chatReducer = (state, action) => {
  switch (action.type) {
    case types.usuariosCargados:
      return {
        ...state,
        usuarios: action.payload,
      };
    case types.activarChat:
      if (state.chatActivo === action.payload) return state;

      return {
        ...state,
        chatActivo: action.payload,
        mensajes: [],
      };

    default:
      return state;
  }
};
