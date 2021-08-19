import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

function ProductListItem(props) {
  const isEditing = false
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} lg={4}>
        <TextField
          size="small"
          fullWidth
          label="Item Name"
          variant="outlined"
          margin="dense"
          name="itemName"
        />
      </Grid>
      <Grid item xs={6} md={2} lg={2}>
        <TextField
          size="small"
          type="number"
          variant="outlined"
          margin="dense"
          label="Rate"
          fullWidth
          name="rate"
        />
      </Grid>
      <Grid item xs={6} md={1} lg={1}>
        <TextField
          size="small"
          type="number"
          variant="outlined"
          margin="dense"
          label="Disc"
          fullWidth
          name="disc"
        />
      </Grid>
      <Grid item xs={6} md={1} lg={1}>
        <TextField
          size="small"
          type="number"
          label="Qty"
          variant="outlined"
          margin="dense"
          fullWidth
          name="qty"
        />
      </Grid>
      <Grid item xs={6} md={2} lg={2}>
        <TextField
          size="small"
          type="number"
          variant="outlined"
          margin="dense"
          label="Amount"
          fullWidth
          name="amount"
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
              <Button secondary >
                SAVE
              </Button>
              <Button color="#FDA734">
                CANCEL
              </Button>
            </>
          ) : (
            <>
              <Button secondary >
                EDIT
              </Button>
              <Button color="#FD5665" >
                DELETE
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductListItem;
