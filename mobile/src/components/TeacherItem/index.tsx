import React, { useState, useContext } from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles'
import api from '../../services/api'
import favoritesContext from '../../store/favoritesContext'

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

    const { dispatch } = useContext(favoritesContext)
    const [favorited, setFavorited] = useState(isFavorite)

    function handleLinkToWhatsapp() {
        api.post('connections', {
            user_id: teacher.id
        })

        Linking.openURL(`whatsapp://send?phone=${whatsapp}`)
    }

    async function handleToggleFavorite() {
        if (favorited) {
            dispatch({
                type: 'REMOVE_FAVORITE',
                payload: teacher.id,
            })

            setFavorited(false)
        } else {
            dispatch({
                type: 'ADD_FAVORITE',
                payload: teacher,
            })

            setFavorited(true)
        }

        dispatch({ type: 'SYNC_DATA' })
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
