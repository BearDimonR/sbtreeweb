import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import style from "./index.module.scss";
import { Carousel, Header } from 'rsuite';

const HomePage = () => {
    return <div className={style.homeContainer}>
        <Header as='h1' className={style.title}>Ми СБ і ми круті!</Header>
        <Carousel className={style.carousel} autoplay shape='bar'>
            <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=1" alt="First in carousel" />
            <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2" height="300" alt="Second in carousel" />
            <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3" height="300" alt="Third in carousel" />
            <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4" height="300" alt="Fourth in carousel" />
            <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5" height="300" alt="Fifth in carousel" />
        </Carousel>
    </div>
}

const mapStateToProps = rootState => ({
    user: rootState.profile.user
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);