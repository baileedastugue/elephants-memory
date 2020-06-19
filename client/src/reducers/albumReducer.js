import {
     ADD_ALBUM_SUCCESS,
     ADD_ALBUM_FAIL,
     GET_ALBUMS_SUCCESS,
     GET_ALBUMS_FAIL,
     GET_ALBUM_SUCCESS,
     GET_ALBUM_FAIL,
     //  DELETE_ALBUM_SUCCESS,
     //  DELETE_ALBUM_FAIL,
} from '../actions/types';

const initialState = {
     albums: [],
     album: null,
     isLoading: true,
     error: {},
};

export default function (state = initialState, action) {
     switch (action.type) {
          case ADD_ALBUM_SUCCESS:
               return {
                    ...state,
                    ...action.payload,
                    isLoading: false,
               };
          case GET_ALBUMS_SUCCESS:
               return {
                    ...state,
                    albums: action.payload,
                    isLoading: false,
               };
          case GET_ALBUM_SUCCESS:
               return {
                    ...state,
                    album: action.payload,
                    isLoading: false,
               };
          case ADD_ALBUM_FAIL:
          case GET_ALBUM_FAIL:
          case GET_ALBUMS_FAIL:
               return {
                    ...state,
                    error: action.payload,
                    loading: false,
               };
          default:
               return state;
     }
}