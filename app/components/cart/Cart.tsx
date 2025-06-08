'use client'
import { useMutation, useQuery } from "@apollo/client";
import { CART_PRODUCTS } from "../../../graphql/query";
import { useState , useEffect } from "react";
import css from "./cart.module.css"
import Image from "next/image";
import Link from "next/link";
import { CLEAR_CART } from "../../../graphql/mutations";


const Cart = () => {
    
    const [cartItems, setCartItems] = useState([])
    const [loaidng, setLoading] = useState(false)

    const {data , error}=useQuery(CART_PRODUCTS)

    const [clearCart] = useMutation(CLEAR_CART)
    
    useEffect(()=>{
        setCartItems(data?.order)
    },[data])

    const confirmOrder = async () => {
        setLoading(true)
        await clearCart({
            refetchQueries: [{ query: CART_PRODUCTS }]
        })
        setLoading(false);
    }

    console.log("Cart Items:", cartItems);

    

    return (
        <div>
           <div className={css.mainBox}> 
               <div>
               <h1 className="text-center text-[50px] tracking-[2px] mb-[50px]">Your Cart</h1>
               

                {cartItems?.length === 0 ? (
                     <div className="text-center text-[20px] flex justify-center items-center gap-2 mt-[100px]"><p>Your cart is empty, </p> <Link style={{borderBottom:'1px solid #4CAF50'}} href={'/all-products'}>add products now</Link></div>
                ) : (
                    <div style={{overflowY:'auto',overflowX:"hidden"}}>
                    {cartItems?.map((item)=>(
    
                        
                        <Link href={`/product/${item.id}`} key={item.id} style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px",backgroundColor:"#f1f1f1",padding:10}}>
                            <Image src={item.mainImg}  alt="image" width={100} height={100} className="w-[150px] h-[150px]" />
                            <div className={css.cartDetails}>
                                <h2 className="text-[20px]">{item.name}</h2>
                                <p className="text-[16px]">Price: ${item.price}</p>
                            </div>
                        </Link>
                    ))}
                   </div>
                )}


               </div>
           </div>
           {cartItems?.length > 0 && <button onClick={confirmOrder} className={css.confirmButton}>{loaidng?"confirming...":'Confirm Order'}</button>}
        </div>
    );
};

export default Cart;  