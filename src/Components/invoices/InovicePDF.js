import React from "react";
import moment from "moment";
import { Page, Text, View, Document, Font  , StyleSheet} from "@react-pdf/renderer";
import "./invoicePDF.css";
const styles = StyleSheet.create({
billPage :{
  backgroundColor: '#E4E4E4',
    padding: "80px 40px",
    fontFamily: 'Noto Sans',
    maWidth: "850px",
      width: "850px",
      overflow: "auto",
      margin: "2rem auto",
      padding: "6rem 4rem",
      boxShadow:"4px 4px 28px 10px rgb(240 240 240 / 9)"
  },
  billDetails:{
    display: "flex",
    width: "auto",
    margin: "0 auto",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  
  billColumnLeft: {
    width: "50%",
    paddingRight: "50px",
    paddingLeft: "0px",
    textAlign: "left"
  },
  billColumnRight: {
    paddingLeft: "50px",
    paddingRight: "0px",
    textAlign: "right"
  },
  invoiceHeading :{
    fontSize: "30px",
    fontWeight: "bolder",
    textTransform: "uppercase",
    letterSpacing: "2px",
    textAlign: "right",
    width: "100%"
  },
  invoiceNumber:{
    color: "#444",
    fontSize: "12px",
    textTransform: "uppercase",
    fontWeight: "bolder",
    marginBottom: "1rem"
  },
  details:{
    fontSize: "12px",
    padding: "5px 0",
    lineHeight: 0
  },
  textt:{
    padding: "5px 0"
  },
  billTable:{
    display: "table",
    width: "100%"
  },
  billRow:{
    display: "flex",
    justifContent: "space-around",
    alignItems: "center",
    fontWeight: "500",
    marginTop: "10px",
    marginBottom: "40px"
  },
  billRowHead:{
    backgroundColor: "#333",
    fontSize: "15px",
    borderRadius: "2px",
    color:"white"
  },
  billDataText:{
    width: "50%",
    padding: "0 5px",
    fontSize: "12px"
  },
  billDataNum:{
    width: "15%",
    textAlign: "center",
    padding: "0 5px",
    fontSize: "20px"
  },
  billDataSerial:{
    width: "5%"
  },
  billTotal:{
    padding: 0
  }
});
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
      <Page size="A4" style={styles.billPage}>
        <View  style={styles.billDetails}>
          <View  style={styles.billCoulmnnLeft}>
            <Text style={styles.textt}>{companyName}</Text>
            <Text style={styles.details}>{companyAddress}</Text>
            <Text  style={styles.invoiceNumber}>{invoiceNumber}</Text>
            <Text  style={styles.details}>
              Invoice Date : {moment(invoiceDate.toDate()).format("DD-MM-YYYY")}
            </Text>
            <Text  style={styles.details}>
              Due Date : {moment(dueDate.toDate()).format("DD-MM-YYYY")}
            </Text>
            <Text  style={styles.details}>
              Due Date : {moment(dueDate.toDate()).format("DD-MM-YYYY")}
            </Text>
          </View>

          <View className="billCoulmnnRight">
            <Text className="invoiceHeading">INVOICE</Text>
            <Text className="invoiceNumber"># Inv/{invoiceNumber}</Text>
            <Text style={styles.details} style={{ marginTop: "20px" }}>
              Bill To
            </Text>
            <Text className="textt">{customerName}</Text>
            <Text style={styles.details}>{customerAddress}</Text>
            <Text style={styles.details}>Email: {email}</Text>
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
              <Text style={styles.details} style={{ marginTop: '50px' }}>Note : {note}</Text>
            )}
          </View>
          <View className="billCoulmnnRight">
            <View className="billDetails" >
              <View className="BillTotal">
              <Text style={styles.details}>Sub Total:</Text>
                {taxType === 'exc' && <Text style={styles.details}> GST {taxPercent}% : </Text>}

                <Text style={styles.details}>Total: </Text>

                {taxEnable === 'true' && taxType === 'inc' && (
                  <Text style={styles.details} style={{ marginLeft: '-50%' }}>
                    Includes GST {taxPercent}%:{' '}
                  </Text>
                )}
              </View>
              <View View className="BillTotal">
                <Text style={styles.details}>
                  {currencySign}{' '}
                  {totalAmount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </Text>
                {taxType === 'exc' && (
                  <>
                    <Text style={styles.details}>
                      {totalExclusiveTax.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </Text>
                    <Text style={styles.details}>
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
                    <Text style={styles.details}>
                      {currencySign}{' '}
                      {totalAmount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </Text>

                    <Text style={styles.details}>
                      {currencySign}{' '}
                      {totalInclusiveTax.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </Text>
                  </>
                )}
                {taxEnable === 'false' && (
                  <Text style={styles.details}>
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
