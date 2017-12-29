import {
    STOP_TIMER,
    ADD_TASK,
    START_TIMER,
    DELETE_TASK,
    ARRAY_MOVE,
    DONE,
    TICK
} from '../constants/Page';


export function PauseClick(id, elapsed) {
    return (dispatch) => {
        dispatch({
            type: STOP_TIMER,
            id: id,
            diff: elapsed,
        });
    };
}

export function StartClick(id){
    return (dispatch) => {
        dispatch({
            type: START_TIMER,
            id: id,
        });
    };
}

export function Tick(id, elepsed = 0){
    return (dispatch) => {
        dispatch({
            type: TICK,
            id: id,
            diff: elepsed
        });
    };
}

let id =4;
export function AddNewTask(text){
    return (dispatch) => {
        dispatch({
            type: ADD_TASK,
            payload: text,
            id: id++
        });
    };
}

export function DeleteClick(key){
    return (dispatch) => {
        dispatch({
            type: DELETE_TASK,
            payload: key,
        });
    };
}

export function ArrayMove(oldIndex, newIndex){
    return (dispatch) => {
        dispatch({
            type: ARRAY_MOVE,
            oldIndex,
            newIndex

        });
    };
}

export function taskDone(id){
    return (dispatch) => {
        dispatch ({
            type: DONE,
            id: id,
        });
    };
}

