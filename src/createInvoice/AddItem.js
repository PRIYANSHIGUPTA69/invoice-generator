import React, { useState, memo } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import {nanoid} from 'nanoid';
function AddItem(props) {
 const [form, setForm] = useState({ itemName: '', rate: '', disc: 0, qty: 1  });
  const updateFrom = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
let amount = (form.rate * form.qty * (1 - form.disc / 100)).toFixed(2)
   const currency = props.currency === 'usd' ? '$' : '₹';
  const handleSubmit = (e) =>{
    e.preventDefault();
   
    let data = {
      id: nanoid(4),
     itemName : form.itemName,
      rate : form.rate,
      disc : form.disc,
      qty : form.qty,
      amount:amount
    }
     props.handleAdd(data);
  }
  return (
    <form  onSubmit = {handleSubmit} >
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
          required
          error={form.rate== "" && true}
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
        />
      </Grid>
      <Grid item xs={12} md={2} lg={2}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ height: '100%' }}
        >
          <button type="submit" className="secondary">
            ADD
          </button>
        </Grid>
      </Grid>
    </Grid>
    </form>
  );
}

export default AddItem
