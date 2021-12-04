import React, {useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import style from "./index.module.scss";
import {Grid} from 'semantic-ui-react';
import {login, register} from './actions';
import LoginForm from "../../components/LoginForm";
import RegistrationForm from "../../components/RegistrationForm";
import {
    LOGIN_WORD,
    REGISTRATION_WORD,
} from "../../utils/loginPageConstants";


const LandingPage = ({
                         login: signIn,
                         register: signUp
                     }) => {
    const [activeCard, setActiveCard] = useState(LOGIN_WORD);
    const [isLoading, setIsLoading] = useState(false);

    const toggle = (card) => {
        if (isLoading) {
            return
        }
        setActiveCard(card);
    }

    return <Grid textAlign="center" verticalAlign="middle" className="fill">
        <Grid.Column className={style.formContainerColumn}>
            <LoginForm login={signIn} toggle={toggle} setIsLoading={setIsLoading} isLoading={isLoading}
                    isVisible={activeCard === LOGIN_WORD}/>
            <RegistrationForm register={signUp} toggle={toggle} setIsLoading={setIsLoading} isLoading={isLoading}
                    isVisible={activeCard === REGISTRATION_WORD}/>
        </Grid.Column>
    </Grid>
}

const mapStateToProps = rootState => ({
    user: rootState.profile.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
    login,
    register,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
