import React from 'react';
import {useRef} from 'react';
import Message from "./Message/Message";
import style from "./Messages.module.scss";
import {getDataForMessage} from "../../helpers/helpers";
import Img from '../common/Img/Img';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

async function postMessage (url,props){
  let newMessageRes = await fetch(url,{method:"POST"});
    let newMessage = await newMessageRes.json();
    props.setChatsList((prevState)=>{ 
       let newChat;
       debugger;
       prevState.map((chat)=>{
        if(chat.id === props.selectedContact.id){

            newChat={...chat,messages:[...chat.messages,newMessage]};
            props.setSelectedContact(newChat);
            debugger;
        }
       })
       let newState = prevState.filter((chat)=>chat.id!==props.selectedContact.id);
       newState.unshift(newChat);
       return newState;
      });
}

export default function Messages(props) {

  const divChats = useRef(null);
  useEffect(()=>{  divChats.current.scrollTop=divChats.current.scrollHeight}); /*скролл донизу*/ 

  let currentChat = props.selectedContact;

  const { register, handleSubmit, setValue} = useForm();

  const onSubmit=async(data)=>{

    setValue("text","");

    postMessage(`/api/createMessage?id=${currentChat.id}&text=${data.text}&fromMe=${true}`,props);
    setTimeout(async()=>{
    let jokeRes = await fetch("https://api.chucknorris.io/jokes/random");
    let jokeJson = await jokeRes.json();
    
    postMessage(`/api/createMessage?id=${currentChat.id}&text=${jokeJson.value}&fromMe=${false}`,props);

      let idCurrentChat= currentChat.id;
      let lastMessages=[];
      
      props.setNewMessages((prevState)=>{
        if(prevState[idCurrentChat]){
          lastMessages= prevState[idCurrentChat];
        }
        return {...prevState, [`${idCurrentChat}`]:[...lastMessages,jokeJson.value]}}
      );
      

    }, 10000);
    
  }

  let className = style.messages

  if(props.showChats){
    className=style.hidden;
  }

  return (
    <div className={className}>
      <div className={style.header}>
        <img className={style.arrow} src="/arrow.png" onClick={()=>{
          props.setshowChats(true); }} />
        <Img avatar = {currentChat.avatar} isOnline={currentChat.isOnline}/>
        <p className={style.contactName}>{currentChat.contact}</p>
      </div>
      <div className={style.chat} ref={divChats}>
        {currentChat.messages.map((message)=>{
          let dateString = getDataForMessage(message.date);
          if(message.fromMe==="true"){
            return <Message key={Math.random()} text={message.text} date={dateString}/>
          }
          return <Message key={Math.random()} text={message.text} avatar={currentChat.avatar} date={dateString}/>
        })}
      </div>
      <form className={style.input} onSubmit={handleSubmit(onSubmit)}>
        <input  {...register("text")} placeholder='Type your message'/>
        <button type='submit'><img src={`/send.png`}/></button>
      </form>
          
      </div>
  )
}

