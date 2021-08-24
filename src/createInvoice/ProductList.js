import React, { useState, memo } from 'react';
import Button from '@material-ui/core/Button'
import ProductListItem from './ProductListItem';
import AddItem from './AddItem';
import TotalAmount from "./TotalAmount"
// Component
function ProductList(props) {
  console.log(props)
     const [items, setItems] = useState([]);
  const [showAddItemForm,setShowAddItemForm] = useState(true)
  const [toggleAddItemForm, setToggleAddItemForm] = useState(true)

  // ADD, DELETE, EDIT
  const handleAdd = (newItem) => {
    const newItems = [
      ...items,
      {
        ...newItem,
        rate: parseFloat(newItem.rate),
        amount: parseFloat(newItem.amount),
        disc: parseFloat(newItem.disc),
        qty: parseFloat(newItem.qty)
      }
    ];
    setItems(newItems);
    
    setToggleAddItemForm(!toggleAddItemForm)
  };

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleEdit = (newItem, id) => {
    const newItems = items.map((item) => {
      if (item.id === id)
        return {
          ...newItem,
          rate: parseFloat(newItem.rate),
          amount: parseFloat(newItem.amount),
          disc: parseFloat(newItem.disc),
          qty: parseFloat(newItem.qty)
        };
      return item;
    });
    setItems(newItems);
  };

  //Handle UPstreme Data
  const handleItemsData = (data) => {
    const itemsObj = { items: items, ...data };
    props.handleInvoiceSubmit(itemsObj);
  };

  return (

    <div className="table">
      <h2>Item Details</h2>
      {items.map((item) => (
        <ProductListItem
          key={item.id}
          item={item}
          handleDelete={handleDelete}
          currency={props.invoiceMeta.currency}
          handleEdit={handleEdit}
        />
      ))}
      {showAddItemForm && (
        <AddItem
          currency={props.invoiceMeta.currency}
          handleAdd={handleAdd}
        ></AddItem>
      )}
      <button onClick={() =>{setToggleAddItemForm(!toggleAddItemForm)}} className="addBtn">
        {showAddItemForm ? 'CANCEL' : 'ADD ITEM'}
      </button>
      {items.length !== 0 && (
        <TotalAmount
          handleItemsData={handleItemsData}
          items={items}
          invoiceMeta={props.invoiceMeta}
        />
      )}
    </div>
  );
}

export default ProductList
