import React from 'react';
import { List, Button } from 'antd';
import Link from 'next/link';

const EventList = ({ filteredEventsList, handleDelete }) => {
  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={filteredEventsList}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button key="edit">Edit</Button>,
            <Button key="delete" onClick={() => handleDelete(item.id)}>Delete</Button>,
            <Button key="view">View Details</Button>
          ]}
        >
          <List.Item.Meta
            title={item.name}
            description={`Starts: ${item.startTime} - ${item.endTime} | Category: ${item.category}`}
          />
        </List.Item>
      )}
    />
  );
};

export default EventList;
