import React from 'react'
import { Button, View, Text } from 'react-native'

export default function AuthOrigin ({navigation}) {
    const _goToLogin = () => {
        navigation.navigate('Login')
    }
    return(<Button title='Login Here!'onPress={_goToLogin}></Button>)
}

