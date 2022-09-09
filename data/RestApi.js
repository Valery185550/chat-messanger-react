import data from "../data.json";

export function postMessage (chatId, text, fromMe){
    let newMessage = {text,fromMe, date:new Date()};
    data.chats[chatId-1].messages.push(newMessage);
    console.log(newMessage);
    return newMessage;
}

export function getChats() {
    return data.chats;
  }