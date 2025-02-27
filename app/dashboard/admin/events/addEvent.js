'use client'

import React from 'react';
import { Button, Form, Input, message, Select, TimePicker } from 'antd';
import { useStore } from '../../../../lib/contexts/storeContext';

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const AddEvent = ({ setOpenEventModal }) => {
  const { eventCategories, events, addDocument } = useStore();
  const [form] = Form.useForm();

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

  const onFinish = async (values) => {
    const newEvent = {
      name: values.name,
      categoryID: values.categoryID,
      startTime: values.startTime.toISOString(),
      endTime: values.endTime ? values.endTime.toISOString() : '',
      description: values.description? values.description : '',
    }
    const isDuplicate = events?.find(event => event.name === newEvent.name);
    if (isDuplicate) {
      message.error('An event with the same name already exists!');
      return;
    } else {
      addDocument('events', newEvent);
      form.resetFields();
      setOpenEventModal(false);
    }
};

  return (
    <div className='flex justify-center items-center h-full w-full p-4'>
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          width: '100%',
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={'categoryID'}
          label="Select Event Category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select options={eventCategories.map(category => ({
            label: category.name,
            value: category.id
          }))} />
        </Form.Item>
        <Form.Item
          name={'name'}
          label="Event Name"
          rules={[{ required: true, message: 'Please input the event name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={'startTime'} label="Start Time" rules={[{ required: true, message: 'Please select the start time!' }]}>
          <TimePicker />
        </Form.Item>
        <Form.Item name={'endTime'} label="End Time">
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
