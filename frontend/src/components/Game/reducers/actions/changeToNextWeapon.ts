import { ActionForReducer } from "../gameStateReducer";

export const changeToNextWeapon: ActionForReducer = (state, payload) => {
  if (state.player.activeWeaponIndex === state.player.weapons.length - 1) {
    return { ...state, player: { ...state.player, activeWeaponIndex: 0 } };
  } else {
    return {
      ...state,
      player: {
        ...state.player,
        activeWeaponIndex: state.player.activeWeaponIndex + 1,
      },
    };
  }
};
