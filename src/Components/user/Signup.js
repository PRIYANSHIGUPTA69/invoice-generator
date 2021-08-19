import React from "react";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import {useForm} from "react-hook-form"
import {signUp} from "../../redux/actions/authAction"
import "./signup.css"
export default function Signup() {
   const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.loadingState.registerBtn);
  const errorState = useSelector(
    (state) => state.auth.authError && state.auth.authError.message
  );
  const { register, handleSubmit, formState:{errors} } = useForm();
  console.log(errors)
  const handleRegister = (data, e) => {
  
    e.preventDefault();
    dispatch(signUp(data));
  };
  return (
    <div>
      <div className="greeting">Create an Account</div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="twoField">
          <div className={errors.length > 0   && errors.firstName ? "error" :""}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Regina"
              {...register("firstName" , {
                required: true,
                minLength:2,
              })}
            />
          </div>
          <div className={errors.length && errors.lastName ? "error":""}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Phalange"
             {...register("LastName" ,{
                required: true,
                minLength: 2,
              })}
            />
          </div>
        </div>
        {errors.length>0 && (errors.firstName || errors.lastName) && (
          <div className="error-text">
           <ErrorOutlineIcon /> Please enter a valid name
          </div>
        )}
        <div className={errors.email && 'error'}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="regina@email.com"
            {...register("email" ,{
              required: true,
              minLength: 2,
              pattern: /\S+@\S+\.\S+/
            })}
          />
          {errors.length>0 && errors.email ? (
            <div className="error-text">
             <ErrorOutlineIcon/> Please enter a valid email
            </div>
          ):<></>}
         
        </div>
        <div className={errors.length>0 && errors.password ? 'error' : ""}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Hunter2"
            {...register("password" ,{
              required: true,
              minLength: 6
            })}
          />
          {errors.length>0 && errors.password ?(
            <div className="error-text">
             <ErrorOutlineIcon /> Password should be at least
              6 characters long
            </div>
          ):<></>}
        </div>
        {errorState && (
          <div className="error-text">
            <ErrorOutlineIcon /> {errorState}
          </div>
        )}
         <button type="submit" disabled={loadingState}>
          Create Your Account{' '}
          {loadingState && <AutorenewIcon></AutorenewIcon>}
        </button>
      </form>
      <p className="footer-text">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

