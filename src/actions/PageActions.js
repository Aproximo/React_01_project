import {
    STOP_TIMER,
    ADD_TASK
} from '../constants/Page'


export function PauseClick(id, elapsed) {
    return (dispatch) => {
        dispatch({
            type: STOP_TIMER,
            id: id,
            diff: elapsed,
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
    }
}

