import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AuthOrigin ({navigation}) {
    const _goToLogin = () => {
        navigation.navigate('Login')
    }
    return(
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={_goToLogin}>
                <Text style={styles.loginButton}>Login</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={_goToLogin}>
                <Text style={styles.loginButton}>Signup</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignContent: 'center', 
      justifyContent: 'center',
      backgroundColor: 'black'
    },
    buttonContainer:{
        borderColor: 'black',
        borderLeftWidth: 50,
        borderRightWidth: 50,
        borderBottomWidth: 10,
        borderTopWidth: 10,
    },
    loginButton: {
        color: 'black',
        backgroundColor: '#5DBCD2',
        borderColor: 'white',
        fontWeight: 'bold',
        borderRadius: 10,
        fontSize: 18,
        overflow: 'hidden',
        padding: 8,
        textAlign:'center',
      },
});
  

