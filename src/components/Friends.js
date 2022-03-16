import React, {useState, useEffect} from 'react';
import Input from '@mui/material/Input';
import capitalize from "../utils/capitalize";
import '../style/Friends.css';

const Friends = ({switchChatter, setGroupFriends}) => {
    const [isAddingFriend, setIsAddingFriend] = useState(false)
    const [friend, setFriend] = useState('')
    const [friends, setFriends] = useState([])
    const [groups, setGroups] = useState([])
    const [isCreatingGroup, setIsCreatingGroup] = useState(false)
    const [newGroup, setNewGroup] = useState({
        groupName: '',
        invitedGroupFriends: []
    })
    const [showDeleteFriend, setShowDeleteFriend] = useState('')
    const [showDeleteGroup, setShowDeleteGroup] = useState('')


    useEffect(() => {
        let friends = JSON.parse(localStorage.getItem('friends')) || []
        setFriends(friends)
        let groups = JSON.parse(localStorage.getItem('groups')) || []
        setGroups(groups)
    }, [isAddingFriend, isCreatingGroup])

    const addFriend = () => {
        let friends = JSON.parse(localStorage.getItem('friends')) || []
        if (friends.includes(friend)) {
            alert('You already have this person in your friend list!')
        }
        else if (friend === '') {
            alert('Please enter a name for this person!')
        }
        else {
            friends.push(friend)
            localStorage.setItem('friends', JSON.stringify(friends))
        }
        setFriend('')
        setIsAddingFriend(false)
    }

    const inviteFriend = (friend) => {
        let newFriend = {...newGroup}
        if (!newFriend.invitedGroupFriends.includes(friend)) {
            newFriend.invitedGroupFriends.push(friend)
        }
        setNewGroup(newFriend)
    }

    const finishGroup = () => {
        if (newGroup.groupName === '') {
            alert('Please enter a name for the group!')
        }
        else if (newGroup.invitedGroupFriends.length < 2) {
            alert('The group has to have at least 3 members!')
        }
        else {
            let groups = JSON.parse(localStorage.getItem('groups')) || []
            const exists = groups.find((group) => (group.groupName === newGroup.groupName))
            if (!exists) {
                groups.push(newGroup)
            } else {
                alert('A group with the same name already exists!')
            }
            localStorage.setItem(`groups`, JSON.stringify(groups))
            setIsCreatingGroup(false)
            setNewGroup({...newGroup, groupName: '', invitedGroupFriends: []})
        }
    }

    const removeFromGroup = (friend) => {
        const index = newGroup.invitedGroupFriends.indexOf(friend)
        let group = newGroup.invitedGroupFriends
        group.splice(index, 1)
        setNewGroup({...newGroup, invitedGroupFriends: group})
    }

    const deleteFriend = (e, index) => {
        e.stopPropagation()
        let friends = JSON.parse(localStorage.getItem('friends'))
        friends.splice(index, 1)
        localStorage.setItem('friends', JSON.stringify(friends))
        setFriends(friends)
    }

    const deleteGroup = (e, index) => {
        e.stopPropagation()
        let localGroups = JSON.parse(localStorage.getItem('groups'))
        localGroups.splice(index, 1)
        localStorage.setItem('groups', JSON.stringify(localGroups))
        setGroups(localGroups)
    }

    return (
        <div className='friendsContainer'>
            <h2>Friends</h2>
            {isAddingFriend &&
                <div>
                    <Input
                        className='inputFriend'
                        color={"primary"}
                        placeholder={'Type here...'}
                        onChange={event => setFriend(event.target.value)}
                        endAdornment={
                            <button onClick={() => addFriend()} style={{marginRight: -32}}>Add</button>
                        }
                    />
                </div>
            }
            {friends.map((friend, index) => {
                const friendName = capitalize(friend)
                return (
                    <div
                        className='friendList'
                        key={index}
                        onMouseEnter={() => setShowDeleteFriend(friendName)}
                        onMouseLeave={() => setShowDeleteFriend('')}
                        onClick={() => {
                            switchChatter(friendName)
                            setGroupFriends([])
                        }}
                    >
                        {isCreatingGroup ?
                            <div style={{display: 'flex'}}>
                                <div key={index}>{friendName}</div>
                                <button style={{ marginLeft: 'auto', marginTop: 4, width: 'fit-content' }} onClick={() => inviteFriend(friendName)}>Invite</button>
                            </div>
                            :
                            <div style={{
                                display: 'flex'
                            }}>
                                <div>
                                    {friendName}
                                </div>
                                {showDeleteFriend === friendName &&
                                    <button
                                        className='deleteButton'
                                        onClick={(e) => deleteFriend(e, index)}
                                    >
                                        X
                                    </button>
                                }
                            </div>
                        }
                    </div>
                )
            })}
            {isCreatingGroup &&
                <div style={{ marginTop: 16 }}>
                    <div>Group name</div>

                    <Input
                        className='inputGroup'
                        color={"primary"}
                        placeholder={'Type here...'}
                        onChange={event => setNewGroup({...newGroup, groupName : event.target.value})}
                    />

                    <button onClick={() => finishGroup()}>Finnish group</button>
                    <button onClick={() => {
                        setIsCreatingGroup(false)
                        setNewGroup({...newGroup, groupName: '', invitedGroupFriends: []})}}
                    >
                        Cancel
                    </button>
                    {newGroup.invitedGroupFriends.map((groupFriend, index) => {
                        return(
                            <div style={{ display: 'flex', width: 'fit-content' }}>
                                <div key={index} style={{ lineHeight: '40px', marginRight: 24 }}>{capitalize(groupFriend)}</div>
                                <button
                                    className='deleteButton'
                                    onClick={() => removeFromGroup(groupFriend)}
                                >X</button>
                            </div>
                        )
                    })}
                </div>
            }
            <h2>Groups</h2>
            {groups.map((group,index) => {
                return(
                    <div
                        key={index}
                        className='friendList'
                        onMouseEnter={() => setShowDeleteGroup(group.groupName)}
                        onMouseLeave={() => setShowDeleteGroup('')}
                        onClick={() => {
                            switchChatter(group.groupName)
                            setGroupFriends(group.invitedGroupFriends)
                        }}
                        style={{ display: 'flex' }}
                    >
                       <div>
                           {capitalize(group.groupName)}
                       </div>
                        {showDeleteGroup === group.groupName && <button
                            onClick={(e) => deleteGroup(e, index)}
                            className='deleteButton'
                        >
                            X
                        </button>}
                    </div>
                )
            })}
            <div style={{ marginTop: 16 }}>
                <button onClick={() => setIsAddingFriend(true)}>Add friend</button>
                <button onClick={() => {setIsCreatingGroup(true)}}>Create Group</button>
            </div>
        </div>

    );
};

export default Friends;
