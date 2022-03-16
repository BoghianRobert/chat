import React, {useState, useEffect} from 'react';
import Friends from "./Friends";
import ChatRoom from "./ChatRoom";
import capitalize from "../utils/capitalize";

const Home = () => {
    const [currentChatter, setCurrentChatter] = useState([])
    const [showChatRoom, setShowChatRoom] = useState(false)
    const [groupFriends, setGroupFriends] = useState([])
    const [user, setUser] = useState('user')
    const [isChangingName, setIsChangingName] = useState(false)


    useEffect(() => {
        let id = JSON.parse(localStorage.getItem('id')) || ''
        if (id === '') {
            localStorage.setItem('id', JSON.stringify(Math.random()))
        }
        let user = JSON.parse(localStorage.getItem('user')) || ''
        if (user !== '') {
            setUser(user)
        }
    }, [])

    const switchChatter = (item) => {
        setShowChatRoom(true)
        setCurrentChatter(item)
    }

    const changeName = () => {
        localStorage.setItem('user', JSON.stringify(user))
        setIsChangingName(false)
    }

    return (
        <div style={{ height: '100vh' }}>
            <h1 style={{textAlign: 'center', marginBottom: 0, paddingTop: 24}}>Chat App</h1>

            <div style={{ marginLeft: 24 }}>
                {isChangingName ?
                    <div>
                        <input
                            className= 'inputUserName'
                            type="text" value={user}
                            onChange={event => setUser(event.target.value)}/>
                        <button onClick={() => changeName()}>Change</button>
                    </div>
                    :
                    <div style={{ display: 'flex'}}>
                        <h2 style={{ margin: '0 0 8px 0' }}>{capitalize(user)}</h2>
                        <button style={{marginLeft: '50px'}} onClick={() => setIsChangingName(true)}>Change user</button>
                    </div>

                }

            </div>

            <div style={{display: 'flex', height: '88%'}}>
                <Friends
                    switchChatter={switchChatter}
                    setGroupFriends={setGroupFriends}
                />
                {showChatRoom && <ChatRoom chatter={currentChatter} groupFriends={groupFriends} user={user}/>}
            </div>
        </div>
    );
};

export default Home;
