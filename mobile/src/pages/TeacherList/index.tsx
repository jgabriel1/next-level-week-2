import React from 'react'
import { View, Text } from 'react-native'

import PageHeader from '../../components/PageHeader'

import styles from './styles'

const TeacherList = () => {
    return (
        <View style={styles.container}>
            <PageHeader title='Proffys Disponíveis' />
            <Text>TeacherList</Text>
        </View>
    )
}

export default TeacherList
