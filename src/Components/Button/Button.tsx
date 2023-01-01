type PropsType = {
    name: string
    callBack: () => void
    class:string
    disabled?: boolean
}

const Button = (props: PropsType) => {
    const {name,callBack,disabled} = props

    const onClickHandler = () => {
      callBack()
    }

  return(
      <button  onClick={onClickHandler} className={props.class} disabled={disabled}>{name}</button>
  )
}

export default Button