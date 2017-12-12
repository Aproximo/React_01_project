import {
    SHOW_TASK_BODY
} from '../constants/Page'

export function ShowTask(year) {

    return (dispatch) => {
        dispatch({
            type: SHOW_TASK_BODY,
            payload: true
        });
    };
}

