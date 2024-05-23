import React from "react";
import classes from './ChatRow.module.css'

const ChatRow = ({ chat }) => (
    <div className={classes['chat-container']}>
        <div className={classes['image-container']}><img className={classes['chat-image']} src={chat.chatImage} alt='Chat profile' /></div>
        <div className={classes['chat-content-container']}>
            <div>{chat.name}</div>
            <div className={classes['sub-text']}>{chat.lastMessage}</div>
        </div>
        <div className={`${classes['last-message-time']} ${classes['sub-text']}`}>{chat.lastMessageTime}</div>
    </div>
)

export default ChatRow;