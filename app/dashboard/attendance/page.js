'use client'

import { Button, Divider, List, Space, Form, DatePicker, Select, Input } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useData } from '../dataFactory';

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const { attendanceDatabase, eventsDatabase, eventCategoriesDatabase } = useData();
  const [filteredAttendanceList, setFilteredAttendanceList] = useState([]);

  useEffect(() => {
    const listWithEventDetails = attendanceDatabase.map(record => {
      const event = eventsDatabase.find(event => event.id === record.eventID);
      const category = event ? eventCategoriesDatabase.find(cat => cat.id === event.categoryID) : null;
      return {
        ...record,
        eventName: event ? event.name : 'Unknown Event',
        eventDate: event ? event.date : 'Unknown Date',
        eventCategory: category ? category.name : 'Unknown Category'
      };
    });
    setAttendanceList(listWithEventDetails);
    setFilteredAttendanceList(listWithEventDetails);
  }, [attendanceDatabase, eventsDatabase, eventCategoriesDatabase]);

  const handleFilter = (values) => {
    const { event, dateRange, category } = values;
    let filteredList = attendanceList;

    if (event) {
      filteredList = filteredList.filter(record => record.eventName.toLowerCase().includes(event.toLowerCase()));
    }

    if (dateRange && dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      filteredList = filteredList.filter(record => new Date(record.eventDate) >= startDate && new Date(record.eventDate) <= endDate);
    }

    if (category && category !== "None") {
      filteredList = filteredList.filter(record => record.eventCategory === category);
    }

    setFilteredAttendanceList(filteredList);
  };

  return (
    <>
      <Divider />
      <Space className='px-4' size='middle'>
        <Button><Link href={'/dashboard/attendance/new'}>Add New Attendance Record</Link></Button>
      </Space>
      <Divider />
      <Form layout="inline" onFinish={handleFilter} style={{ marginBottom: '16px' }}>
        <Form.Item name="event">
          <Input placeholder="Event Name" />
        </Form.Item>
        <Form.Item name="dateRange">
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item name="category">
          <Select placeholder="Category" style={{ width: 200 }}>
            <Select.Option value="None">None</Select.Option>
            {eventCategoriesDatabase.map(category => (
              <Select.Option key={category.id} value={category.name}>{category.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Filter</Button>
        </Form.Item>
      </Form>
      <List
        itemLayout="horizontal"
        dataSource={filteredAttendanceList}
        renderItem={item => (
          <List.Item
            actions={[
              <Button key="add"><Link href={`/dashboard/attendance/add/${item.id}`}>Add Records</Link></Button>,
              <Button key="view"><Link href={`/dashboard/attendance/${item.id}`}>View Attendance Details</Link></Button>
            ]}
          >
            <List.Item.Meta
              title={item.eventName}
              description={`Date: ${new Date(item.eventDate).toLocaleDateString()} | Category: ${item.eventCategory}`}
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default Attendance;