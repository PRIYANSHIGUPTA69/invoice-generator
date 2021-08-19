import React from 'react';
import Header from "../header/Header"
import Table from '../table/Table';

function Invoices() {

  return (
    <div>
      <Header title={'Invoices'} />
      <div style={{ padding: '1rem' }}>
        <Table ></Table>
      </div>
    </div>
  );
}

export default Invoices;
