import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
          title : "Invalid input",
          message: "please, write your name and age(non-empty)"
      });
        return;
    }
    if (+enteredUserAge < 1) {
        setError({
            title : "Invalid age",
            message: "please, write your age properly(An age should be greater than 0)"
        });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };
  
  const errorHandler = () =>{
      setError(null);
  }
  return (
    <div>
      {error && <ErrorModal onError={errorHandler} title={error.title} message={error.message}/>}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref = {nameInputRef}
          ></input>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            ref = {ageInputRef}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
