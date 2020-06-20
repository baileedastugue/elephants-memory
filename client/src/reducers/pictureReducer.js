import {
     GET_PICTURES_SUCCESS,
     GET_PICTURES_FAIL,
     ADD_PICTURE_SUCCESS,
     ADD_PICTURE_FAIL,
     DELETE_PICTURE_SUCCESS,
     DELETE_PICTURE_FAIL,
} from '../actions/types';

const initialState = {
     pictures: [],
     picture: {},
     album: null,
     isLoading: true,
     error: {},
};

export default function (state = initialState, action) {
     switch (action.type) {
          case DELETE_PICTURE_SUCCESS:
          case ADD_PICTURE_SUCCESS:
          case GET_PICTURES_SUCCESS:
               return {
                    ...state,
                    pictures: action.payload,
                    album: action.payload.album,
                    isLoading: false,
               };
          case DELETE_PICTURE_FAIL:
          case ADD_PICTURE_FAIL:
          case GET_PICTURES_FAIL:
               return {
                    ...state,
                    error: action.payload,
                    isLoading: false,
               };
          default:
               return state;
     }
}
