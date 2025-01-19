'use client'
import Image from "next/image";
import css from './dash.module.css'
function Dash(){
    return(
        <div className={css.div}>
            <Image className={css.img} src="/dashimg1.png" alt="dashboard" width={1000} height={100} />
        </div>
    )
}

export default Dash;