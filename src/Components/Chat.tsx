import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {lengthMessages, MessagesType, minMessages,} from "../App";
import StyleChat from './chat.module.css'
import Button from "./Button/Button";

type PropsType = {
    addMessages: (tx: string) => void
    messages: MessagesType[]
    deleteFirstMessages: () => void
}

const Chat = (props: PropsType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>('')
    const [counter, setCounter] = useState(lengthMessages)
    const disabledDelete = counter === lengthMessages ? true : false
    const classDisable = disabledDelete === true ? StyleChat.disabled : StyleChat.button
    const classInput = error ? StyleChat.input_error : StyleChat.input


    const {addMessages, messages, deleteFirstMessages} = props

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        if (error) {
            setError('')
        }
    }

    const onClickInputHandler = () => {
        if (value.trim() !== '' && counter <= lengthMessages) {
            if (counter <= lengthMessages && counter > minMessages) {
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
        if (counter < lengthMessages && counter >= minMessages) {
            setCounter(counter + 1)
            setError('')
        }
    }

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
                <Button name={'Add'} callBack={onClickInputHandler}
                        class={StyleChat.button}/>
                <Button name={'FirstDelete'}
                        callBack={onClickDeleteHandler}
                        class={classDisable}
                        disabled={disabledDelete}/>
            </span>
            <div>
                {newArr}
            </div>
        </div>
    )
}

export default Chat