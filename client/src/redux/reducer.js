import { combineReducers } from "redux";

function dummy(state={},action)
{
    if(action.type="DUMMY")
    {
        return action.payload;
    }
    else return state
}

const rootReducer=combineReducers(
{
    dummy,
});

export default rootReducer;