import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import style from "./index.module.scss";
import { Carousel } from 'react-responsive-carousel';

const HomePage = () => {
    return <div className={style.homeContainer}>
        {/* <Carousel className={style.gallery} width={600}>
            <div>
                    <img src="https://robohash.org/iustonesciuntlibero.png?size=400x400&set=set1"/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://robohash.org/iustonesciuntlibero.png?size=500x500&set=set1" />
                    <p className="legend">Legend 2</p>
                </div>
        </Carousel> */}
    </div>
}

const mapStateToProps = rootState => ({
    user: rootState.profile.user
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);