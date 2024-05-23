import classes from './ChatsPage.module.css'
import React, { useState, useEffect } from "react";
import chatImage from '../../assets/chat-image.png'
import NavigationFooter from "../NavigationFooter/NavigationFooter";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ChatRow from '../Chat/ChatRow';
import { fetchChats } from '../../services/api-services/chatsService';

const ChatsPage = ({ userId }) => {
    const [chats, setChats] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {

        // const user = localStorage.getItem('user')

        // const token = JSON.parse(user).token
        
        const fetchData = async () => {
            if (userId) {
                try {
                    const chats = await fetchChats(userId)

                    setChats(chats)
                } catch (error) {
                    setErrorMessage(error.message)
                }
            }
        }

        fetchData()
    }, [userId])

    let chatElements = <h3 className={classes.title}>Start messaging now!</h3>

    if (chats.length > 0) {
        chatElements = chats.map((chat) => {
            chat.chatImage = chatImage
            return (
                <div key={chat.id}>
                    <ChatRow chat={chat} />
                </div>
            )
        })
    }

    return (
        <div>
            <h2 className={classes.title}>Messages</h2>
            {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : chatElements}
            <NavigationFooter />
        </div>
    )
}

export default ChatsPage;