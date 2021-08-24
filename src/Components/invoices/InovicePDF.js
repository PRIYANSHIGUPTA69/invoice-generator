import React from "react";
import moment from "moment";
import { Page, Text, View, Document, Font } from "@react-pdf/renderer";
import "./invoicePDF.css";
export default function InovicePDF(props) {
  const {
    companyName,
    gstNumber,
    companyAddress,
    customerName,
    customerAddress,
    email,
    invoiceDate,
    dueDate,
    invoiceNumber,
    billableType,
    currency,
    note,
    taxEnable,
    taxType,
    taxPercent,
    items,
    totalAmount,
    totalExclusiveTax,
    totalInclusiveTax,
    totalWithExclusiveTax,
  } = props.invoice;
  const currencySign = currency === "usd" ? "$" : "₹";
  const itemList = items.map(({ itemName, rate, qty, disc, amount, id }, i) => (
    <View className="billRow" key={id}>
      <Text className="billDataNum">{i + 1}</Text>
      <Text className="billDataText">{itemName}</Text>
      <Text className="billDataNum">{rate.toFixed(2)}</Text>
      <Text className="billDataNum">{disc}%</Text>
      <Text className="billDataNum">{qty}</Text>
      <Text className="billDataNum">{amount.toFixed(2)}</Text>
    </View>
  ));
  return (
    <Document>
      <Page className="billPage">
        <View className="billDetails">
          <View className="billCoulmnnLeft">
            <Text className="textt">{companyName}</Text>
            <Text className="details">{companyAddress}</Text>
            <Text className="invoiceNumber">{invoiceNumber}</Text>
            <Text className="details" style={{ marginTop: "40px" }}>
              Invoice Date : {moment(invoiceDate.toDate()).format("DD-MM-YYYY")}
            </Text>
            <Text className="details">
              Due Date : {moment(dueDate.toDate()).format("DD-MM-YYYY")}
            </Text>
            <Text className="details">
              Due Date : {moment(dueDate.toDate()).format("DD-MM-YYYY")}
            </Text>
          </View>

          <View className="billCoulmnnRight">
            <Text className="invoiceHeading">INVOICE</Text>
            <Text className="invoiceNumber"># Inv/{invoiceNumber}</Text>
            <Text className="details" style={{ marginTop: "20px" }}>
              Bill To
            </Text>
            <Text className="textt">{customerName}</Text>
            <Text className="details">{customerAddress}</Text>
            <Text className="details">Email: {email}</Text>
          </View>
        </View>
        <View className="billTable">
          <View  className="billRowHead"> 
          <Text className="billlDataSerial">#</Text>
          <Text className="illDataText">
              {billableType === 'product' ? 'Product Details' : 'Desription'}
            </Text>
          <Text className="billlDataNum">Rate</Text>
          <Text className="billlDataNum" style={{ width: '6%' }}>Disc</Text>
          <Text className="billlDataNum" style={{ width: '9%' }}>qty</Text>
          <Text className="billlDataNum" >Amount</Text>
          </View>
        </View>
        {itemList}
        < View className="billDetails" style={{ padding: '0 5px' }}>
          <View className="billCoulmnnLeft">
            {note.length> 0 && (
              <Text className="details" style={{ marginTop: '50px' }}>Note : {note}</Text>
            )}
          </View>
          <View className="billCoulmnnRight">
            <View className="billDetails" >
              <View className="BillTotal">
              <Text className="details">Sub Total:</Text>
                {taxType === 'exc' && <Text className="details"> GST {taxPercent}% : </Text>}

                <Text className="details">Total: </Text>

                {taxEnable === 'true' && taxType === 'inc' && (
                  <Text className="details" style={{ marginLeft: '-50%' }}>
                    Includes GST {taxPercent}%:{' '}
                  </Text>
                )}
              </View>
              <View View className="BillTotal">
                <Text className="details">
                  {currencySign}{' '}
                  {totalAmount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </Text>
                {taxType === 'exc' && (
                  <>
                    <Text className="details">
                      {totalExclusiveTax.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </Text>
                    <Text className="details">
                      {currencySign}{' '}
                      {totalWithExclusiveTax.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </Text>
                  </>
                )}

                {taxEnable === 'true' && taxType === 'inc' && (
                  <>
                    <Text className="details">
                      {currencySign}{' '}
                      {totalAmount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </Text>

                    <Text className="details">
                      {currencySign}{' '}
                      {totalInclusiveTax.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </Text>
                  </>
                )}
                {taxEnable === 'false' && (
                  <Text className="details">
                    {currencySign}{' '}
                    {totalAmount.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </Text>
                )}
              </View> 
            </View>
        </View>
      </View>
      </Page>
    </Document>
  );
}
