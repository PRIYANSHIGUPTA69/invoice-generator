import React from "react";
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import {useForm} from "react-hook-form"
import {signUp} from "../../redux/actions/authAction"
import "./signup.css"
import waves from "../../images/waves.svg"
export default function Signup() {
   const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.loadingState.registerBtn);
  const errorState = useSelector(
    (state) => state.auth.authError && state.auth.authError.message
  );
  const { register, handleSubmit, formState:{errors} } = useForm();
  const handleRegister = (data, e) => {
  
    e.preventDefault();
    dispatch(signUp(data));
  };
  return (
    <Grid container justify="center" alignItems="center" className="signupPage" style={{ overFlow:"hidden", backgroundImage:`url(${waves})`}}>
    <Hidden mdDown>
      <Grid item md={6} lg={6} className="signup-display">
        <h1 className="title">
          Create, <br /> Save & <br />
          Send Invoices <br />
          at Warp Speed.
        </h1>
 
      </Grid>
    </Hidden>
    <Grid item xs={12} md={6} lg={6} className="signup-form">
    <div className="form" style={{width: '550px',margin: '80px auto' , boxShadow:"  0 3px 9px 1px rgba(50, 50, 93, 0.15)"}}>
    
      <div className="greeting">Create an Account</div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="twoField">
          <div className={errors.length > 0   && errors.firstName ? "error" :""}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="fName"
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
              placeholder="lName"
             {...register("lastName" ,{
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
        <div className={errors.email && 'error'} style={{ width: "80%", marginLeft: "2rem"}}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="abc@email.com"
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
        <div style={{ width: "80%", marginLeft: "2rem"}} className={errors.length>0 && errors.password ? 'error' : ""}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
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
         <button className="button" type="submit" disabled={loadingState} >
          Create Your Account{' '}
          {!loadingState && <AutorenewIcon className="loading"></AutorenewIcon>}
        </button>
        
      </form>
     
      <p className="footer-text">
        Already have an account? <Link to="/login" className="login-link">Login</Link>
      </p>
    </div>
    </Grid>
      </Grid>
  );
}

