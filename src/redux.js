import { createStore } from "redux";

const initialState = {
    movies: [],
    chosen_movie: {},
    lang: "PL",
    main_movie: "",
    genres: [],
    curr_page: "MAIN"
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
            };
        case 'SET_CHOSEN':
            return {
                ...state,
                chosen_movie: payload
            };
        case 'SET_LANG':
            return {
                ...state,
                lang: payload
            };
        case 'SET_MAIN_MOVIE':
            return {
                ...state,
                main_movie: payload
            }
        case 'SET_GENRES':
            return {
                ...state,
                genres: payload
            }
        case 'SET_CURR_PAGE':
            return {
                ...state,
                curr_page: payload
            }
        default:
            return state
    }
}

export const addMoviesAction = (movies) => ({
    type: 'ADD_MOVIES',
    payload: movies
});

export const setChosenMovieAction = (chosen) => ({
    type: 'SET_CHOSEN',
    payload: chosen
});

export const setLangAction = (lang) => ({
    type: 'SET_LANG',
    payload: lang
});

export const setMainMovieAction = (movie) => ({
    type: 'SET_MAIN_MOVIE',
    payload: movie
});

export const setGenresAction = (genres) => ({
    type: 'SET_GENRES',
    payload: genres
});

export const setCurrPageAction = (new_page) => ({
    type: 'SET_CURR_PAGE',
    payload: new_page
});