import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

function ProductListItem(props) {
   const { disc, id, itemName, qty, rate  } = props.item;
  const [isEditing, setEditing] = useState(false);
  const currency = props.currency === 'usd' ? '$' : '₹';
 const [form, setForm] = useState({ itemName: itemName, rate: rate, disc: disc, qty: qty  });

let amount = (form.rate * form.qty * (1 - form.disc / 100)).toFixed(2)
     const updateFrom = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleEdit = (data) => {
       data = { amount:amount, ...data };
    setEditing(!isEditing);
    props.handleEdit(data, id);
  };

  const handleItemDelete = () => {
    props.handleDelete(id);
  };

  const handleCancel = () => {
    setForm({
      itemName: itemName,
      rate: rate,
      disc: disc,
      qty: qty
    });
    setEditing(!isEditing);
  };
  return (
    <form   >
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} lg={4}>
        <TextField
          size="small"
          fullWidth
          label="Item Name"
          name="itemName"
          variant="outlined"
          margin="dense"
          value = {form.itemName}
          onChange={updateFrom}
          required
          disabled={!isEditing}
          error={form.itemName == "" && true}
        />
      </Grid>
      <Grid item xs={8} md={2} lg={2}>
        <TextField
          size="small"
          variant="outlined"
          margin="dense"
          label="Rate"
          name="rate"
           fullWidth
            value = {form.rate}
          onChange={updateFrom}
          disabled={!isEditing}
          required
          error={form.rate == "" && true}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <b>{currency}</b>
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item xs={4} md={1} lg={1}>
        <TextField
          size="small"
          
          variant="outlined"
          margin="dense"
          label="Disc"
          name="disc"
          fullWidth
           value = {form.disc}
          onChange={updateFrom}
          disabled={!isEditing}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <b>%</b>
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item xs={4} md={1} lg={1}>
        <TextField
          size="small"
          type="number"
          label="Qty"
          name="qty"
          variant="outlined"
          margin="dense"
          fullWidth
           value = {form.qty}
          onChange={updateFrom}
          disabled={!isEditing}
        />
      </Grid>
      <Grid item xs={8} md={2} lg={2}>
        <TextField
          size="small"
          variant="outlined"
          margin="dense"
          label="Amount"
          name="amount"
          fullWidt
           value={(form.rate * form.qty * (1 - form.disc / 100)).toFixed(2)}
           InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <b>{currency}</b>
              </InputAdornment>
            )
          }}
          disabled={!isEditing}
        />
      </Grid>
      <Grid item xs={12} md={2} lg={2}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ height: '100%' }}
        >
        {isEditing ? (
            <>
              <button  onClick={handleEdit}>
                SAVE
              </button>
              <button  onClick={handleCancel}>
                CANCEL
              </button>
            </>
          ) : (
            <>
              <button  onClick={setEditing} className="secondary">
                EDIT
              </button>
              <button color="#FD5665" className="primary" onClick={handleItemDelete}>
                DELETE
              </button>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
    </form>
  );
}

export default ProductListItem;
