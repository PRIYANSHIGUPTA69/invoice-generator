import React, { useState, memo } from 'react';
import Button from '@material-ui/core/Button'
import ProductListItem from './ProductListItem';
import AddItem from './AddItem';
// Component
function ProductList(props) {
    const items = ["pen" , "fruits " , 'books']

  return (

    <div className="create-invoice">
      <h2>Item Details</h2>

      {items.map((item) => (
        <ProductListItem
         
          item={item}
          
        />
      ))}
     
        <AddItem
         
        ></AddItem>
      
      <Button  className="addBtn">
      </Button>
    </div>
  );
}

export default ProductList
