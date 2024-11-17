import { TbLetterX } from "react-icons/tb";
import css from './menu.module.css'

function Menu() {
    return(
        <div className={css.maindiv}>
            <div>
            <TbLetterX className={css.icon} />
            </div>

            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Fashion</a></li>
                <li><a href="#">Electronics</a></li>
                <li><a href="#">Jewellery</a></li>
            </ul>
        </div>
    )
}

export default Menu