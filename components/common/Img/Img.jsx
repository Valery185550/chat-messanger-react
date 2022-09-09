import React from 'react';
import style from "./Img.module.scss";

function Img(props) {

    let online;
    if(props.isOnline){
        online = <img className={style.avatar__online} src={`/online.png`}/>;
    }
    if(props.avatar){
        console.log(props.avatar.src);
    }
    return (
        <div className={style.avatar}>
            <img className={style.avatar__photo} src={`${props.avatar}`} />
            {online}
        </div>
    )
}

export default Img