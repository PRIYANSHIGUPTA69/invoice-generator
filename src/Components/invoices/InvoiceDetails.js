import React from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import SendIcon from "@material-ui/icons/Send";
import GetAppIcon from "@material-ui/icons/GetApp";
import PrintIcon from "@material-ui/icons/Print";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Header from "../header/Header";
import "./invoiceDetails.css"
import InvoiceData from "./InvoiceData";
export default function InvoiceDetails() {
  return (
    <div className="invoice-details">
      <Header title={"Invoice Details"} />
<InvoiceData></InvoiceData>
      <div className="ButtonDiv">
        <button className="Yellow">
          <CheckCircleOutlineIcon></CheckCircleOutlineIcon>   <span>Mark Paid</span>
        </button>

        <button className="primary">
          <SendIcon></SendIcon>  <span>Send Email</span>
        </button>

        <button className="secondary">
          <GetAppIcon></GetAppIcon> <span>Download</span>
        </button>

        <button className="secondary">
          <PrintIcon></PrintIcon> <span>Print</span>
        </button>
        <button className="danger">
          <DeleteOutlineIcon></DeleteOutlineIcon> <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
