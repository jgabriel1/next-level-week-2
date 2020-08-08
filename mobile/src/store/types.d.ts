import { Dispatch } from 'react'

import { Teacher } from '../components/TeacherItem';

export interface FavoritesState {
    favorites: Array<Teacher>
}

export interface Action {
    type: 'SET_ALL_FAVORITES' | 'ADD_FAVORITE' | 'REMOVE_FAVORITE' | 'SYNC_DATA'
    payload?: Array<Teacher> | Teacher | number
}

export interface FavoritesContext {
    state: FavoritesState
    dispatch: Dispatch<Action>
}