'use client'

import React from 'react';
import { Button, DatePicker, Form, Input, Select, TimePicker } from 'antd';
import { useData } from '../../dataFactory';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const AddEvent = () => {
  const { setEventsDatabase, eventsDatabase, eventCategoriesDatabase } = useData();
  
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinish = (values) => {
    const newEvent = {
      id: eventsDatabase.length + 1,
      ...values
    };

    const isDuplicate = eventsDatabase.some(event => event.name === newEvent.name && event.date === newEvent.date);

    if (!isDuplicate) {
      setEventsDatabase([...eventsDatabase, newEvent]);
    }
  };

  return (
    <div className='flex justify-center items-center h-full w-full'>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 1000,
          width: 1000
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={'eventCategoryId'}
          label="Select Event Category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={eventCategoriesDatabase.map(category => ({
            label: category.name,
            value: category.id
          }))} />
        </Form.Item>
        <Form.Item
          name={'eventName'}
          label="Event Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={'eventDate'} label="Event Date">
          <DatePicker />
        </Form.Item>
        <Form.Item name={'eventStartTime'} label="Start Time">
          <TimePicker />
        </Form.Item>
        <Form.Item name={'eventEndTime'} label="End Time">
          <TimePicker />
        </Form.Item>
        <Form.Item name={'description'} label={"Description"}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddEvent
