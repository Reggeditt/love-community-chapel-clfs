'use client'

import React, { useEffect, useState } from 'react';
import { Avatar, List, Skeleton, message } from 'antd';
import { Button, Divider, Form, Modal, Space, DatePicker, Select, Input, AutoComplete } from 'antd'
import Link from 'next/link'
import { useData } from '../../dataFactory'
import dynamic from 'next/dynamic'
const AddEventCategory = dynamic(() => import('./addEventCategory'), { loading: () => <p>Loading...</p> })
const AddEvent = dynamic(() => import('./addEvent'), { loading: () => <p>loading...</p> })
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const eventsPage = () => {
  const { eventsDatabase, eventCategoriesDatabase, setEventsDatabase } = useData();
  const [eventsList, setEventsList] = useState([]);
  const [filteredEventsList, setFilteredEventsList] = useState([]);
  const [openEventCategoryModal, setOpenEventCategoryModal] = useState(false);
  const [openEventModal, setOpenEventModal] = useState(false);
  const [nameSuggestions, setNameSuggestions] = useState([]);

  useEffect(() => {
    const eventsWithCategoryNames = eventsDatabase.map(event => {
      const category = eventCategoriesDatabase.find(cat => cat.id === event.categoryID);
      return { ...event, category: category ? category.name : 'Unknown' };
    });
    setEventsList(eventsWithCategoryNames);
    setFilteredEventsList(eventsWithCategoryNames);
    setOpenEventCategoryModal(false)
    setOpenEventModal(false )
  }, [eventsDatabase, eventCategoriesDatabase]);

  const handleEventCategoryModalClose = () => {
    setOpenEventCategoryModal(false);
  };

  const handleEventCategoryModalCancel = () => {
    setOpenEventCategoryModal(false);
  };

  const handleEventModalClose = () => {
    setOpenEventModal(false);
  };

  const handleEventModalCancel = () => {
    setOpenEventModal(false);
  };

  const handleNameSearch = (value) => {
    if (value) {
      const suggestions = eventsList
        .filter(event => event.name.toLowerCase().includes(value.toLowerCase()))
        .map(event => ({ value: event.name }));
      setNameSuggestions(suggestions);
    } else {
      setNameSuggestions([]);
    }
  };

  const handleFilter = (values) => {
    const { name, dateRange, category } = values;
    let filteredList = eventsList;

    if (name) {
      filteredList = filteredList.filter(event => event.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (dateRange && dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      filteredList = filteredList.filter(event => new Date(event.date) >= startDate && new Date(event.date) <= endDate);
    }

    if (category && category !== "None") {
      filteredList = filteredList.filter(event => event.category === category);
    }

    setFilteredEventsList(filteredList);
  };

  const handleDelete = (id) => {
    setEventsDatabase((prev) => prev.filter(event => event.id !== id));
    message.success('Event deleted successfully!');
  };

  return (
    <div style={{ padding: '16px' }}>
      <Divider className='m-0' />
      <Space className='px-4' size='middle' style={{ marginBottom: '4px' }}>
        <Button onClick={() => setOpenEventCategoryModal(!openEventCategoryModal)}>Add Event Category</Button>
        <Button onClick={() => setOpenEventModal(!openEventModal)}>Add New Event</Button>
      </Space>
      <Divider className='m-0'/>
      <Form layout="inline" onFinish={handleFilter} style={{ marginBottom: '16px' }}>
        <Form.Item name="name">
          <AutoComplete
            options={nameSuggestions}
            onSearch={handleNameSearch}
            placeholder="Event Name"
          />
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
      <Modal
        open={openEventCategoryModal}
        onClose={handleEventCategoryModalClose}
        onCancel={handleEventCategoryModalCancel}
        footer={null}
      >
        <AddEventCategory />
      </Modal>
      <Modal
        open={openEventModal}
        onClose={handleEventModalClose}
        onCancel={handleEventModalCancel}
        okButtonProps={null}
        footer={null}
      >
        <AddEvent />
      </Modal>
      <FloatButton.Group shape="circle" style={{ right: 24, bottom: 24 }}>
        <FloatButton icon={<PlusOutlined />} onClick={() => setOpenEventModal(true)} tooltip="Add New Event" />
        <FloatButton icon={<PlusOutlined />} onClick={() => setOpenEventCategoryModal(true)} tooltip="Add Event Category" />
      </FloatButton.Group>
    </div>
  );
};

export default eventsPage;
