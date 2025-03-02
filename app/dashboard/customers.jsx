"use client";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import css from "./customers.module.css";
import { GET_USERS } from "../../graphql/query";
import { MdDelete } from "react-icons/md";
import { DELETE_USER } from "../../graphql/mutations";

function Customers() {
  const [isDelete, setIsDelete] = useState(false);

  const { data, loading, error } = useQuery(GET_USERS);
  const users = data?.users;
  console.log(users)
  const [deleteUser] = useMutation(DELETE_USER,{
    refetchQueries:{query: GET_USERS}
  })

  const Card = (props) => {
    return (
      <div className="flex align-baseline">
        {" "}
        <div className={css.userCard}>
          <h1>{props.name}</h1>
          <h1>{props.email}</h1>
          <h1>{props.password}</h1>
        </div>
        <div>
          {isDelete && (
            <button onClick={props.onDelete}>
              <MdDelete/>
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return <p>Loading Users...</p>;
  }

  if(error){
    console.log(error)
  }
  return (
    <div>
      <h1 className={css.title}>Our Customers</h1>
      <button  className={css.deleteBut} 
        onClick={() => (isDelete ? setIsDelete(false) : setIsDelete(true))}
      >
        {isDelete ? "Cancle" : "Delete User"}
      </button>
      <div className={css.userCardTop}>
        <h1>Name</h1>
        <h1>email</h1>
        <h1>password</h1>
      </div>
      {users.map((user) => {
        return (
          <Card
            key={user.id}
            name={user.name}
            email={user.email}
            password={user.password}
            onDelete={()=>deleteUser({
              variables:{id:user.id}
            })}
          />
        );
      })}
    </div>
  );
}

export default Customers;
