import React from 'react'
import { useEffect } from 'react';
import Img from '../../common/Img/Img';
import style from "./Chat.module.scss";

function Chat(props) {
  let lastMessage = props.chat.messages[props.chat.messages.length-1];
  let date = new Date(Date.parse(lastMessage.date)).toLocaleString("en-US",{year:'numeric',month:'short', day:'numeric'});
  let avatar=props.chat.avatar;
 
  let isOnline=props.chat.isOnline;
  let title=props.chat.contact;
  let text=lastMessage.text;

  let className = style.chat;

  if(props.hasNewMessages){
    className += " "+style.chatWithNewMessages;
  }

  function deleteFromNewMessages(){
    props.setNewMessages((prevState)=>{
      let newMessages ={...prevState};
      delete newMessages[`${props.chat.id}`];
      debugger;
      return newMessages;
    })
  }

  return (
    <div className={className}  onClick={()=>{props.setSelectedContact(props.chat); /*Якщо чат має нові новідомлення при натисканні потрібно викликати функцію, яка видалить з нових повідомлень чат*/
      props.hasNewMessages?deleteFromNewMessages():null;
      if(document.documentElement.clientWidth<580){
        props.setshowChats(false);
      }
      }} >
        <Img avatar={avatar} isOnline={isOnline}/>
        <div className={style.content}>
            <h2 className={style.content__title}>{title}</h2>
            <p className={style.content__text}>{
            text.length>30?text.substring(0,29)+"...":text}</p>
        </div>
        <p className={style.date}>{date}</p>
    </div>
  )
}

export default Chat;