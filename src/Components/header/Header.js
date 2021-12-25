import React , {useState , useEffect} from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/actions/authAction';
import { getFirebase } from 'react-redux-firebase';
import "./header.css";
import AppLoader from "../Loaders/appLoader/AppLoader";
function Header({ title }) {
  const auth = useSelector((state) => state.firebase.auth.uid);
  const [firstName , setFirstName] = useState() 
  const [lastName , setLastName] = useState()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const firestore = getFirebase().firestore();
  const handleLogout = () => {
   
    dispatch((signOut()));
  };
  useEffect(async () => {
    let obj;
    let inv = firestore.collection('users').get().then(snapshot => {
     let values = snapshot.docs.map(doc => {
       if(doc.id == auth){
         obj = {data:doc.data() , id:doc.id}
       }
     return doc.data()
     });
    setFirstName(obj.data.firstName.toUpperCase())
      setLastName(obj.data.lastName.toUpperCase())
   })
    
   }, [])
   if(firstName ==undefined || lastName ==undefined){
     return (
     <p>Loading!!</p>
     )
   }
  return (
    <div >
      <nav className="appbar">
        <h2 style={{textDecoration:"none" ,fontSize:"38px" , color:"black" , width:"300px"}}>{title}</h2>
        <div className="right-header-part">
          <div className="left">
          <Link to="/settings" className="link">
            <img 
              src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&color=2e5bff&background=e0e7ff`}
              alt="User Logo"
            />
          </Link>
          <Link className="link" to="/settings" style={{textDecoration:"none" ,fontSize:"20px" , marginLeft:"70px" , color:"black"}}>{firstName} {lastName}</Link>
          </div>
       <div className="right">
       <button onClick={handleLogout} >Logout</button>
       </div>
          

        </div>
      </nav>
    </div>
  );
}

export default Header;
