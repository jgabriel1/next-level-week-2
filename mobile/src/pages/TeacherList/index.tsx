import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import api from '../../services/api'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

import styles from './styles'

const TeacherList = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [favorites, setFavorites] = useState<number[]>([])
    const [isFiltersVisible, setIsFiltersVisible] = useState(false)

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    useFocusEffect(() => {
        loadFavorites()
    })

    async function loadFavorites() {
        await AsyncStorage.getItem('favorites').then(stored => {
            if (stored) {
                const favoritedTeachers: Teacher[] = JSON.parse(stored)
                const favoritedTeachersIds = favoritedTeachers.map(({ id }) => id)

                setFavorites(favoritedTeachersIds)
            }
        })
    }

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit() {
        await loadFavorites()

        const params = {
            subject,
            week_day,
            time,
        }

        const response = await api.get('classes', { params })

        setIsFiltersVisible(false)
        setTeachers(response.data)
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title='Proffys Disponíveis'
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name='filter' size={30} color='#fff' />
                    </BorderlessButton>
                )}
            >
                {
                    isFiltersVisible && (
                        <View style={styles.searchForm}>
                            <Text style={styles.label}>Matéria</Text>
                            <TextInput
                                style={styles.input}
                                value={subject}
                                onChangeText={text => setSubject(text)}
                                placeholder='Qual a matéria?'
                                placeholderTextColor='#c1bccc'
                            />

                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Dia da semana</Text>

                                    <TextInput
                                        style={styles.input}
                                        value={week_day}
                                        onChangeText={text => setWeekDay(text)}
                                        placeholder='Qual o dia?'
                                        placeholderTextColor='#c1bccc'
                                    />
                                </View>

                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Horário</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={time}
                                        onChangeText={text => setTime(text)}
                                        placeholder='Qual horário?'
                                        placeholderTextColor='#c1bccc'
                                    />
                                </View>
                            </View>

                            <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                                <Text style={styles.submitButtonText}>Filtrar</Text>
                            </RectButton>
                        </View>
                    )
                }
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
                showsVerticalScrollIndicator={false}
            >
                {
                    teachers.map(teacher => (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            isFavorite={favorites.includes(teacher.id)}
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default TeacherList
