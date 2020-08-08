import { Dispatch } from 'react'

import { Teacher } from '../components/TeacherItem';

export interface FavoritesState {
    favorites: Array<Teacher>
}

export interface Action {
    type: 'SET_ALL_FAVORITES' | 'ADD_FAVORITE'
    payload: Teacher | Array<Teacher>
}

export interface FavoritesContext {
    state: FavoritesState
    dispatch: Dispatch<Action>
}