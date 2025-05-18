import { TbLetterX } from "react-icons/tb";
import css from './menu.module.css'
import Link from "next/link";

function Menu() {
    return(
        <div className={css.maindiv}>
            <div>
            <TbLetterX className={css.icon} />
            </div>

            <ul>
                <li><Link href="#">Home</Link></li>
                <li><Link href="#">Fashion</Link></li>
                <li><Link href="#">Electronics</Link></li>
                <li><Link href="#">Jewellery</Link></li>
            </ul>
        </div>
    )
}

export default Menu