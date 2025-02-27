import React from 'react';
import { Table } from 'antd';

const AttendeesTable = ({ columns, dataSource }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};

export default AttendeesTable;
