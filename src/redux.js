import { createStore } from "redux";

const initialState = {
    movies: []
}

export const store = createStore(
    reducer,
    initialState
);

function reducer(state, { type, payload }) {
    switch (type) {
        case 'ADD_MOVIES':
            return {
                ...state,
                movies: [
                    ...state.movies,
                    ...payload
                ]
            }
        default:
            return state
    }
}

export const addMovies = (movies) => ({
    type: 'ADD_MOVIES',
    payload: movies
});