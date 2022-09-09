import React from 'react';
import Img from '../../common/Img/Img';
import style from './Message.module.scss';

function Message(props) {

    let avatar;
    let className = style.myMessage;
    if(props.avatar){
        avatar = <Img avatar={props.avatar}/>;
        className= style.contactMessage;
    }

  return (
    <div className={className}>
      <div className={style.content}>
        {avatar}
        <p className={style.text}>{props.text}</p>
      </div>
        <p className={style.date}>{props.date}</p>
    </div>
  )
}

export default Message;