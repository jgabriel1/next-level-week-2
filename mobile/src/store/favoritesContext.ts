import { createContext } from 'react'
import { FavoritesContext } from './types'

const favoritesContext = createContext<FavoritesContext>({} as FavoritesContext)

export default favoritesContext