import React , {useState , useEffect} from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/actions/authAction';
import { confirmLogoutAction } from '../../redux/actions/alertDialogActions';
import { getFirebase } from 'react-redux-firebase';
import "./header.css";
function Header({ title }) {
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
    let inv = firestore.collection('users').get().then(snapshot => {
     let values = snapshot.docs.map(doc => {
        let obj = {data:doc.data() , id:doc.id}
       
        return doc.data()
     });
     
     if(values[0] ){
      setFirstName(values[0].firstName.toUpperCase())
      setLastName(values[0].lastName.toUpperCase())
     }
    

     
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
          <Link to="/settings">
            <img
              src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&color=2e5bff&background=e0e7ff`}
              alt="User Logo"
            />
          </Link>
          <Link to="/settings" style={{textDecoration:"none" ,fontSize:"25px" , marginLeft:"80px" , color:"black"}}>{firstName} {lastName}</Link>
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
