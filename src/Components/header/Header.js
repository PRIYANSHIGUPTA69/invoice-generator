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
     setFirstName(values[0].firstName.toUpperCase())
     setLastName(values[0].lastName.toUpperCase())

     
    })
    
   }, [])
  return (
    <div >
      <nav className="appbar">
        <h2 style={{textDecoration:"none" ,fontSize:"2rem" , color:"black"}}>{title}</h2>
        <div className="right-header-part">
          <Link to="/settings" style={{textDecoration:"none" ,fontSize:"2rem" , color:"black"}}>{firstName} {lastName}</Link>
          <button onClick={handleLogout}>Logout</button>

        </div>
      </nav>
    </div>
  );
}

export default Header;
