'use client'

import React from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { useData } from '../../dataFactory';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const AddNewAttendance = () => {
const { setAttendanceDatabase, attendanceDatabase, eventsDatabase, childrensDatabase, membersDatabase, visitorsDatabase } = useData();

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
  console.log(values);
  setAttendanceDatabase((prev) => [...prev, {
    ...values,
    eventDate: new Date(values.eventDate).toISOString(),
    numberInAttendance: 0,
    eventName: eventsDatabase?.find((event) => event.id === values.eventId)?.name,
  }])
};

return (
  <div className='flex justify-center items-center h-full w-full'>
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={'eventId'}
        label="Select Event"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select options={[{
          label: 'Event 1',
          value: 1
        }]} />
      </Form.Item>
      <Form.Item
        name={'eventDate'}
        label="Event Date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item name={'description'} label="Description">
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

export default AddNewAttendance
