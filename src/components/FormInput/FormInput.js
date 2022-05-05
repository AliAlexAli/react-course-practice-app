import classes from './FormInput.module.css'

const FormInput = ({ value, valid, changeHandler, blurHandler, type, id, label }) => {
    return <div className={`${classes.container} ${valid === false ? classes.invalid : ''}`}>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} onChange={changeHandler} onBlur={blurHandler} value={value}></input>
        {valid === false ? <pre className={classes.warning}>A mező kitöltése kötelező</pre> : ''}
    </div>
}

export default FormInput;