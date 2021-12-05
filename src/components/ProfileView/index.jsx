import React from 'react';
import style from "./index.module.scss";
import {Grid, Image} from 'semantic-ui-react';
import {BiEditAlt} from "react-icons/bi";


const ProfileView = ({user, toggleEditMode}) => {

    return <Grid>
        <Grid.Row>
            <Grid.Column className={style.avatarColumn} width={4}>
                <Image circular className={style.avatar}
                       src='https://cdn-icons-png.flaticon.com/512/660/660611.png'/>
            </Grid.Column>
            <Grid.Column width={6}>
                <p className={style.userName}>{user.nickname}</p>
                <p className={style.role}>{user.email}</p>
            </Grid.Column>
            <Grid.Column className={style.infoColumn} width={6}>
                <div className={style.profileActions}>
                    <BiEditAlt onClick={toggleEditMode} className={style.actionIcon}/>
                </div>
            </Grid.Column>
        </Grid.Row>
    </Grid>
}

export default ProfileView;
