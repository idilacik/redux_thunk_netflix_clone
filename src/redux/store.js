import { applyMiddleware, combineReducers, createStore } from "redux";
import movieReducer from "./reducers/movieReducers";
import { thunk } from "redux-thunk";
import genreReducer from "./reducers/genreReducer";

const rootReducer = combineReducers({
  genres: genreReducer,
  movies: movieReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
