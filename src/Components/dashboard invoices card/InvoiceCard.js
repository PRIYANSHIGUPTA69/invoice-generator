import React from 'react'
import { Link } from 'react-router-dom';
function InvoiceCard(props) {
    const {Icon , type , number , color} = props
    let stylingObject = {
        div:{ 
            width:"270px",
            display: "flex",
         alignItems: "center",
         justifyContent: "space-around",
         boxShadow: `4px 4px 16px 4px ${color + '1a'}`,
         borderRadius: "15px",
         padding: "1.5rem 1rem",
         color: `${color}`,
         margin: "1.5rem",
         textDecoration:"none"
        },
         i: {
           display: "inline-block",
           fontSize: "62px",
           lineHeight: "62px",
           verticalAlign: "middle",
           color: `${color}`,
           padding: "1rem",
           borderRadius: "80px",
           background: `${color + '10'}`,
           boxShadow: `0px 0px 24px ${color+ '2a'}`
         },
         h2 :{
           color:  `${color}`,
           fontWeight:"bold",
           fontSize:"2rem",
           lineHeight: "12px",
         },
         p:{
             fontWeight:"bold",
             fontSize:"1.1rem",
             color: "black"
         }
      }
    return (
        <Link as={Link} to={'/create'} style={stylingObject.div} >
        <div className="icon">
            <Icon style ={stylingObject.i}></Icon>
        
        </div>
        <div className="widget-text">
          <h2 style ={stylingObject.h2}>{type}</h2>
          <p style ={stylingObject.p}>Total Invoices:{number} </p>
        </div>
      </Link>
    )
}

export default InvoiceCard
