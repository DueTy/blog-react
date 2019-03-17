
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT = "LOGOUT";

const defaultState = {
    user: "",
    msg: "",
    refresh: 1
};

export function user(state = defaultState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                msg: action.payload.msg
            };
        case LOGOUT:
            return {
                user: "",
                msg: "",
                refresh: 0
            };
        case LOGIN_FAILURE:
        default:
            return state;
    }
}

// 登录成功
export function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    };
}
// 登录失败
export function loginFailure(data) {
    return {
        type: LOGIN_FAILURE,
        payload: data
    };
}
// 登出成功
export function logout() {
    return {
        type: LOGOUT
    };
}

export default {
    user, loginSuccess, loginFailure, logout
};