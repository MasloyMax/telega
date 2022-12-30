import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {MessagesType} from "../App";
import StyleChat from './chat.module.css'

type PropsType = {
    addMessages: (tx: string) => void
    messages: MessagesType[]
    deleteFirstMessages: () => void
}

const Chat = (props: PropsType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>('')
    const [counter, setCounter] = useState(5)

    const {addMessages, messages, deleteFirstMessages} = props

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        if (error) {
            setError('')
        }
    }

    const onClickInputHandler = () => {
        if (value.trim() !== '' && counter <= 5) {
            if (counter <= 5 && counter > 0) {
                addMessages(value.trim())
                setCounter(counter - 1)
                setValue('')
            } else {
                setError('more than 5 is not allowed')
            }
        } else if (value.trim() === '') {
            setError('You can`t just spaces')
        }
    }

    const onKeyPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      e.key === 'Enter' && onClickInputHandler()
    }

    const onClickDeleteHandler = () => {
        deleteFirstMessages()
        if (counter < 5 && counter >= 0) {
            setCounter(counter + 1)
            setError('')
        }
    }

    const disabledDelete = counter === 5 ? true : false
    const classDisable = disabledDelete === true ? StyleChat.disabled : StyleChat.button
    const classInput = error ? StyleChat.input_error : StyleChat.input

    const newArr = messages.length
        ? messages.map((t) => {
            return (
                <p key={t.id}>{t.messages}</p>
            )
        }) : <p>No messages</p>
    return (
        <div>
            <span>
                {error ? <p className={StyleChat.error_message}>{error}</p> :
                    <p className={StyleChat.continue}>Continue {counter} messages</p>}
                <input className={classInput} value={value}
                       onChange={onChangeInputHandler}
                       onKeyDown={onKeyPressEnterHandler}/>
                <button className={StyleChat.button}
                        onClick={onClickInputHandler}>Add</button>
                <button className={classDisable}
                        onClick={onClickDeleteHandler}
                        disabled={disabledDelete}>FirstDelete</button>
            </span>
            <div>
                {newArr}
            </div>
        </div>
    )
}

export default Chat