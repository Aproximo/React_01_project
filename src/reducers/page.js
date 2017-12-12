// import {
//   GET_PHOTOS_REQUEST,
//     GET_PHOTOS_SUCCESS
// } from '../constants/Page'

const initialState = [
    {
        id: 1,
        taskName: 'Task 1',
        taskBody: 'This is first task',
        entries: 0,
        fetching: false
    },
    {
        id: 2,
        taskName: 'Task 2',
        taskBody: 'This is ololo task',
        entries: 0,
        fetching: false
    },{
        id: 3,
        taskName: 'Task 1',
        taskBody: 'This is last taaaaaaassk',
        entries: 0,
        fetching: false
    },
  ];

export default function page(state = initialState, action) {

  // switch (action.type) {
  //   case GET_PHOTOS_REQUEST:
  //     return { ...state, year: action.payload, fetching: true }
  //
  //   case GET_PHOTOS_SUCCESS:
  //     return { ...state, photos: action.payload, fetching: false }
  //
  //   default:
      return state;
  // }

}
