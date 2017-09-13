import types from "./actionTypes";
export function dispatchLogin(user)
{
    return dispatch => {
        dispatch({
            type : types.LOG_USER_IN,
            user
        });
    }
}

export function dispatchLogout()
{
    return dispatch => {
        dispatch({
            type : types.LOG_USER_OUT
        });
    }
}

