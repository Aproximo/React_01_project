import {
    STOP_TIMER,
    ADD_TASK,
    START_TIMER,
    DELETE_TASK,
    ARRAY_MOVE,
    DONE
} from '../constants/Page'
import { arrayMove } from "react-sortable-hoc";

const initialState = [
    {
        id: 1,
        taskName: 'Task 1',
        taskBody: 'This is first task',
        entries: 0,
        fetching: false,
        isStart: false,
        elapsed: 0,
        diff: 0,
        done: false,
    },
    {
        id: 2,
        taskName: 'Task 2',
        taskBody: 'This is ololo task',
        entries: 0,
        fetching: false,
        isStart: false,
        elapsed: 0,
        diff: 0,
        done: false,
    },{
        id: 3,
        taskName: 'Task 12',
        taskBody: 'This is last taaaaaaassk',
        entries: 0,
        fetching: false,
        isStart: false,
        elapsed: 0,
        diff: 0,
        done: false,
    },
  ];

export default function page(state = initialState, action) {

    switch (action.type) {
        case ADD_TASK:
            return [
                ...state,
                {
                    id: action.id,
                    taskName: action.payload,
                    entries: 0,
                    isStart: false,
                    elapsed: 0,
                    diff: 0,
                    completed: false
                }
            ];
        case STOP_TIMER:
            return state.map(task =>
                task.id === action.id ?
                    {
                        ...task,
                        timer: undefined,
                        isStart: false,
                        diff: action.diff,
                        entries: ++task.entries
                    } :
                    task
            );
        case START_TIMER:
            return state.map(task =>
                task.id === action.id ?
                    {
                        ...task,
                        diff: action.diff,
                        isStart: true,
                    } :
                    task
            );
        case DELETE_TASK:
            state.splice(action.payload, 1);
              return  [...state,];

        case ARRAY_MOVE:
            return arrayMove(state, action.oldIndex, action.newIndex);

        case DONE:
            return state.map(task =>
                task.id === action.id ?
                    {
                        ...task,
                        done: !task.done
                    } :
                    task
            );
        default:
            return state;
   }

}
