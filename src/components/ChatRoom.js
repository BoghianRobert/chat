import React, {useEffect, useState} from 'react';
import Input from '@mui/material/Input';
import capitalize from "../utils/capitalize";
import '../style/ChatRoom.css'


const ChatRoom = ({chatter, groupFriends, user}) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [id, setId] = useState('')

    useEffect(() => {
        let element = document.getElementById("scrollTo");
        element.scrollIntoView({behavior: 'smooth'});
    }, [messages])

    useEffect(() => {
        let messages = JSON.parse(localStorage.getItem(`${chatter}message`)) || []
        let id = JSON.parse(localStorage.getItem('id'))
        setMessages(messages)
        setId(id)
    }, [chatter, message])

    useEffect(() => {
        setMessage('')
    }, [chatter])

    const sendMessage = () => {
        let messages = JSON.parse(localStorage.getItem(`${chatter}message`)) || []
        messages.push({user: `${id}`, message: message})
        if (groupFriends.length === 0)
            messages.push({user: chatter , message: message + '\u2764'})
        else {
            groupFriends.map((friend) => {
                return(
                    messages.push({user: friend, message: message + '\u2764'})
                )
            })
        }
        localStorage.setItem(`${chatter}message`, JSON.stringify(messages))
        setMessage('')
    }

    return (
        <div className='chatRoom'>
           <h2 style={{ borderBottom: '1px solid #484848' , paddingLeft: 16, paddingBottom: 8}} >
               {capitalize(chatter)} ({groupFriends.map((friend) => {return friend+ ' '})} {user + ')'}
           </h2>
            <div className='scroller'>
                {messages.map((message, index) => {
                    return (
                        <div key={index}>
                            {message.user !== `${id}` && <div className='personName'>{
                                capitalize(message.user)}</div>}
                            <div className={
                                message.user === `${id}` ?
                                    'userMessage'
                                    :
                                    'groupMessage'
                            }>
                                {capitalize(message.message)}
                            </div>
                        </div>
                    )
                })}
                <div id='scrollTo' />
            </div>

            <Input
                className='messageInput'
                value={message}
                color={"primary"}
                onChange={event => setMessage(event.target.value)}
                endAdornment={
                    <button onClick={() => {sendMessage()}}>Send</button>
                }
            />
        </div>
    );
};

export default ChatRoom;
