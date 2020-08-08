import { useReducer } from 'react'

import { FavoritesState, Action } from './types'
import { Teacher } from '../components/TeacherItem'

import AsyncStorage from '@react-native-community/async-storage'

const reducer = (state: FavoritesState, action: Action): FavoritesState => {
    switch (action.type) {
        case 'SET_ALL_FAVORITES':
            return {
                ...state,
                favorites: action.payload as Array<Teacher>,
            }
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: [
                    ...state.favorites,
                    action.payload as Teacher
                ]
            }
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(teacher => {
                    return teacher.id !== action.payload
                })
            }
        case 'SYNC_DATA':
            AsyncStorage.setItem(
                'favorites',
                JSON.stringify(state.favorites)
            )

            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}

const initialFavoritesState: FavoritesState = {
    favorites: []
}

const useFavoritesState = () => {
    const [state, dispatch] = useReducer(reducer, initialFavoritesState)

    return { state, dispatch }
}

export default useFavoritesState