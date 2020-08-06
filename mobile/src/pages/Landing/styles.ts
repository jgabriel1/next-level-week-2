import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257e5',
        justifyContent: 'center',
        padding: 40,
    },

    banner: {
        width: '100%',

        /* 
        makes the image resize according to the width, otherwise it would just
        cut off the sides in case of overflowing: 
        */
        resizeMode: 'contain',
    },

    title: {
        fontFamily: 'Poppins_400Regular',
        color: '#fff',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 80,
    },

    titleBold: {
        fontFamily: 'Poppins_600SemiBold',
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between',
    },

    button: {
        height: 150,

        /*
        New Thing learned!!!
        This will make the buttons occupy a little bit less than half of the space
        available, giving them a little gab inbetween. The container's justify-
        content will position them accordingly for that to happen. This way, it
        will avoid needing to set different styles for marginLeft and marginRight
        accroding to the buttons relative position.
        */
        width: '48%',

        backgroundColor: '#333',
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-between',
    },

    buttonPrimary: {
        backgroundColor: '#9871f5',
    },

    buttonSecondary: {
        backgroundColor: '#04d361',
    },

    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#fff',
        fontSize: 18,
    },

    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#d4c2ff',
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 280,
        marginTop: 20,
        marginBottom: 20,
    },
})

export default styles
