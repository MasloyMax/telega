import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from "./Components/Chat";
import {v1} from "uuid";

export type MessagesType = {
    id: string
    messages: string
}

function App() {
    const [messages, setMessages] = useState<Array<MessagesType>>([])


    const addMessages = (tx: string) => {
        if (messages.length !== 5) {
            let newMessages = {id: v1(), messages: tx}
            setMessages([newMessages, ...messages])
        }
    }

    const deleteFirstMessages = () => {
        const deleteArr = [...messages]
        setMessages(deleteArr.slice(0, -1))
    }

    return (
        <div className={"App"}>

            <Chat addMessages={addMessages}
                  messages={messages}
                  deleteFirstMessages={deleteFirstMessages}
                  />
        </div>
    );
}

export default App;
