import { ActionForReducer } from "../gameStateReducer";

export const movePlayerTo: ActionForReducer = (state, payload) => {
  return { ...state, player: { ...state.player, position: payload } };
};
