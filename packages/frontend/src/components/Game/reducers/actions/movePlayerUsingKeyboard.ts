import { ActionForReducer } from "../gameStateReducer";

export const movePlayerUsingKeyboard: ActionForReducer = (state, payload) => {
  const { x, y } = state.player.position;
  const {
    speed,
    size: { width, height },
  } = state.player;
  const { up, down, left, right } = payload.movementKeys;
  const newPosition = { x, y };
  //TODO: fix quicker moving diagonally
  if (up && y - height / 2 > 0) {
    newPosition.y -= speed;
  }
  if (down && y + height / 2 < payload.windowSize.height) {
    newPosition.y += speed;
  }
  if (left && x - width / 2 > 0) {
    newPosition.x -= speed;
  }
  if (right && x + width / 2 < payload.windowSize.width) {
    newPosition.x += speed;
  }

  return {
    ...state,
    player: {
      ...state.player,
      position: { x: newPosition.x, y: newPosition.y },
    },
  };
};
