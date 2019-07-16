import { createStackNavigator, StackNavigator } from 'react-navigation';
import AuthOrigin from './AuthOrigin'
import Login from './Login'

AuthOrigin.navigationOptions = {
    header: null,
};


export default AuthStack  = createStackNavigator({
    AuthOrigin: AuthOrigin,
    Login: Login,
}); 
