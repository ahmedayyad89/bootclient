import types from "../actions/actionTypes";
export default function(state = {user:{}}, action)
{
    switch(action.type)
    {
        case types.LOG_USER_IN:
            return {user : action.user};
        case types.LOG_USER_OUT:
            return {user:{}};
        default:
            return state;
    }
}