export function getDataForMessage(stingDate){
    let date = new Date(Date.parse(stingDate));
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} , ${(date.getHours()>=12)? 
            date.getHours()-12 + ":" + date.getMinutes()+" PM":date.getHours()+ ":" + date.getMinutes()+" AM"}`;
}