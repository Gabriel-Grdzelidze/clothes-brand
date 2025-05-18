import css from './feedback.module.css'

function Feedback({message}){
    return(
        <div className={css.div}>
            <h1>Success!</h1>
            <p>{message}</p>
        </div>
    )
}

export default Feedback;
