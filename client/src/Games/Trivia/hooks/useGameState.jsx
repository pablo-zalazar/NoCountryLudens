import { useReducer } from "react";
// utils
import { ACTIONS } from "../triviaUtils/constants/actionsReducer";

export default function useGameState() {
  const YOU_LOST = "Perdistes";
  const YOU_WIN = "Ganastes";

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.RESET_GAME:
        return {
          ...state,
          questionNumberCurrent: 0,
          isSelectAnswer: false,
          successNumber: 0,
          faildNumber: 0,
          showModal: false
        };
      case ACTIONS.NEXT_QUESTION:
        return {
          ...state,
          questionNumberCurrent: state.questionNumberCurrent + 1,
          isSelectAnswer: false
        };
      case ACTIONS.GAME_OVER:
        return {
          ...state,
          showModal: true,
          toasText: action.payload
        };
      case ACTIONS.YOU_LOST:
        return {
          ...state,
          faildNumber: state.faildNumber + 1,
          toasText: YOU_LOST
        };
      case ACTIONS.YOU_WIND:
        return {
          ...state,
          successNumber: state.successNumber + 1,
          toasText: YOU_WIN
        };
      case ACTIONS.SELECT_ANSWER:
        return {
          ...state,
          isSelectAnswer: true
        };

      default:
        break;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    questionNumberCurrent: 0,
    isSelectAnswer: false,
    successNumber: 0,
    faildNumber: 0,
    toasText: "",
    showModal: false
  });

  const { questionNumberCurrent, isSelectAnswer, successNumber, faildNumber, toasText, showModal } =
    state;

  return {
    questionNumberCurrent,
    isSelectAnswer,
    successNumber,
    faildNumber,
    toasText,
    showModal,
    dispatch
  };
}
