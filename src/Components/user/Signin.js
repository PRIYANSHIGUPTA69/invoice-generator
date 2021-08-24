import React , {useEffect} from 'react'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import {useForm} from "react-hook-form"
import {signIn} from "../../redux/actions/authAction"
function Signin() {
     const { register, handleSubmit, formState:{errors} } = useForm();

  const loadingState = useSelector((state) => state.loadingState.loginBtn);
  const errorState = useSelector(
    (state) => state.auth.authError && state.auth.authError.message
  );

  const handleLogin = (data, e) => {
    e.preventDefault();
    console.log(data)
    dispatch(signIn(data));
  };
     const dispatch = useDispatch();
    useEffect(() => {
    return () => {
      dispatch({ type: 'RESET_AUTH_ERROR' });
    };
  }, []);

    return (
        <div>
             <div>
      <div className="greeting">Create an Account</div>
      <form onSubmit={handleSubmit(handleLogin)}>
       <div className={errors.length >0 &&errors.email ? 'error' :""}>
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
          Continue{' '}
          {loadingState && <AutorenewIcon></AutorenewIcon>}
        </button>
      </form>
      <p className="footer-text">
        New User? <Link to="/register">Create An Account</Link>
      </p>
    </div>
        </div>
    )
}

export default Signin
