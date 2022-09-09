import styles from '../styles/Home.module.css'
import {useState} from 'react';
import Chats from '../components/Chats/Chats';
import Messages from '../components/Messages/Messages';
import { getChats } from '../data/RestApi';

export default function Home({chats}) {
  const [chatsList, setChatsList]=useState(chats);
  const [selectedContact, setSelectedContact] = useState(chatsList[0]);
  const [newMessages, setNewMessages] = useState({});
  const [showChats, setshowChats] = useState();

  return (
    <div className={styles.app} >
      <Chats  chatsList={chatsList} selectedContact={selectedContact} setSelectedContact={setSelectedContact} setChatsList={setChatsList}
        newMessages={newMessages} setNewMessages={setNewMessages} showChats={showChats} setshowChats={setshowChats} />
      <Messages selectedContact={selectedContact} setSelectedContact={setSelectedContact} setChatsList={setChatsList}
        setNewMessages={setNewMessages} newMessages={newMessages} showChats={showChats} setshowChats={setshowChats} />
    </div>
  )
}

export async function getStaticProps(){
  let chats = getChats();
  return { props:{chats} };

}