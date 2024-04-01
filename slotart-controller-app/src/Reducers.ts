import { combineReducers } from 'redux';
import {ActionTypes} from "./GameActions";


const initialState = {
    credit: 100,
    bet: 1,
};

const gameReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.SETTINGS_CLICKED:
            return state;
        case ActionTypes.SOUND_CLICKED:
            return state;
        case ActionTypes.INFO_CLICKED:
            return state;
        case ActionTypes.SPIN_CLICKED:
            return state;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    game: gameReducer,
});

export default rootReducer;
