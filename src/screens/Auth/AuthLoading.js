import { connect } from 'react-redux';

const mapStateToProps = state => ({ loggedIn: state.authReducer.loggedIn });

let AuthLoadingScreen = ({loggedIn, navigation}) => {
    navigation.navigate(loggedIn ? 'App' : 'Auth');
    return null;
};

export default AuthLoadingScreen = connect(mapStateToProps)(AuthLoadingScreen);

