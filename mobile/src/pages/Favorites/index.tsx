import React, { useState, useContext } from 'react'
import { View, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

import styles from './styles'
import favoritesContext from '../../store/favoritesContext'

const Favorites = () => {
    const { state } = useContext(favoritesContext)
    const [favorites, setFavorites] = useState<Teacher[]>([])

    useFocusEffect(loadFavorites)

    function loadFavorites() {
        setFavorites(state.favorites)
    }

    return (
        <View style={styles.container}>
            <PageHeader title='Meus Proffys favoritos' />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
                showsVerticalScrollIndicator={false}
            >
                {
                    favorites &&
                    favorites.map(teacher => (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            isFavorite
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default Favorites
