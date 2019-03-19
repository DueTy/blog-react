/*
 * @Author: DueTy.du 
 * @Date: 2019-03-19 23:16:43 
 * @Last Modified by: DueTy.du
 * @Last Modified time: 2019-03-19 23:50:21
 */

const LIST_LOADED_SUCCESS = "LOADED_SUCCESS";
const LIST_LOADED_FAILED = "LOADED_FAILED";

const defaultState = {
    list: [],
    msg: ""
};

export function list(state = defaultState, action) {
    switch(action.type) {
        case LIST_LOADED_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                msg: action.payload.msg
            };
        case LIST_LOADED_FAILED:
            return action.payload;
        default:
            return state;
    }
}

export function listFetchedSuccess(data) {
    return {
        type: LIST_LOADED_SUCCESS,
        payload: {
            msg: "success",
            list: data
        }
    };
}

export function listFetchedFailed() {
    return {
        type: LIST_LOADED_SUCCESS,
        payload: {
            msg: "failed",
            list: []
        }
    };
}

export default {
    list, listFetchedSuccess, listFetchedFailed
};