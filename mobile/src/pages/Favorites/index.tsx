import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

import styles from './styles'

const Favorites = () => {
    const [favorites, setFavorites] = useState<Teacher[]>([])

    async function loadFavorites() {
        await AsyncStorage.getItem('favorites').then(stored => {
            if (stored) {
                const favoritedTeachers: Teacher[] = JSON.parse(stored)

                setFavorites(favoritedTeachers)
            }
        })
    }

    useFocusEffect(() => {
        loadFavorites()
    })

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
