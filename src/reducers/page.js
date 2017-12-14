import {
    STOP_TIMER,
    ADD_TASK
} from '../constants/Page'

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
    },{
        id: 3,
        taskName: 'Task 12',
        taskBody: 'This is last taaaaaaassk',
        entries: 0,
        fetching: false,
        isStart: false,
        elapsed: 0,
        diff: 0,
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
                        text: action.text,
                        timer: undefined,
                        isStart: false,
                        diff: action.diff,
                        entries: task.entries++
                    } :
                    task
            )
        default:
            return state;
   }

}
