import css from './feedback.module.css'

function FeedbackError(){
    return(
        <div className={css.diverror}>
            <h1>Error!</h1>
            <p>Check Your Input!!!</p>
        </div>
    )
}

export default FeedbackError