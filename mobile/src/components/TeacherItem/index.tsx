import React, { useState } from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles'
import api from '../../services/api'

export interface Teacher {
    id: number
    avatar: string
    bio: string
    cost: number
    name: string
    subject: string
    whatsapp: string
}

interface TeacherItemProps {
    teacher: Teacher
    isFavorite: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, isFavorite }) => {
    const {
        avatar,
        bio,
        cost,
        name,
        subject,
        whatsapp
    } = teacher

    const [favorited, setFavorited] = useState(isFavorite)

    function handleLinkToWhatsapp() {
        api.post('connections', {
            user_id: teacher.id
        })

        Linking.openURL(`whatsapp://send?phone=${whatsapp}`)
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites')

        const favoritesArray: Teacher[] = favorites ? JSON.parse(favorites) : []

        if (favorited) {
            const favoriteIndex = favoritesArray.findIndex(item => {
                return item.id === teacher.id
            })

            favoritesArray.splice(favoriteIndex, 1)

            setFavorited(false)
        } else {
            favoritesArray.push(teacher)

            setFavorited(true)
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: avatar }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.subject}>{subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>{bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ {cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton,
                            favorited && styles.favorited
                        ]}
                    >
                        {
                            favorited ?
                                <Image source={unfavoriteIcon} />
                                :
                                <Image source={heartOutlineIcon} />
                        }
                    </RectButton>

                    <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>

                </View>
            </View>
        </View>
    )
}

export default TeacherItem
