import React, { useMemo } from 'react';
import style from './Chats.module.scss';
import Img from '../common/Img/Img';
import Chat from './Chat/Chat';
import {useState,useRef} from 'react';


function Chats(props) {

  let className = style.contacts;

  const inputSearchRef = useRef();

  let [currentChats,setCurrentChats] = useState(props.chatsList);

  useMemo(()=>{
    setCurrentChats(props.chatsList)
  },[props.chatsList])

  let chatsWithNewMessages = [];
  let chatsWithoutNewMessages = [];

  currentChats.map((chat)=>{
              
    for(let id in props.newMessages)
    {
      if(parseInt(id)===chat.id){
        chatsWithNewMessages.unshift(<Chat setshowChats={props.setshowChats} setNewMessages={props.setNewMessages} key={chat.id} hasNewMessages={true}chat={chat} setSelectedContact={props.setSelectedContact} />)
        return ;
      };
    }
    
     chatsWithoutNewMessages.push(<Chat setshowChats={props.setshowChats} key={chat.id} chat={chat} setSelectedContact={props.setSelectedContact} />);
  })

  function findChats()
  {
    
    setCurrentChats(currentChats.filter((chat)=>chat.contact.indexOf(inputSearchRef.current.value)==0)); 
    if(inputSearchRef.current.value=="")
    {
      setCurrentChats(props.chatsList);
    }
  }

  return (
    <div className={className}>
      <div className={style.header}>
        <Img isOnline="true" avatar={`/myAvatar.jpg`}/>
        <div className={style.input}>
          <input ref={inputSearchRef} type="text" onChange={findChats} className={style.search} placeholder="Search or start new chat"/>
          <img className={style.lupa} src={`/lupa.png`} />
        </div>
      </div>
        <h2 className={style.chats}>Chats</h2>
          
          {chatsWithNewMessages}
          {chatsWithoutNewMessages}

    </div>
    
  )
}

export default Chats