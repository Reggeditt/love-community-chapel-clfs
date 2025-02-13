'use client'

import React from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { useData } from '../../dataFactory';
import { useRouter } from 'next/navigation';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const AddNewAttendance = () => {
  const { setAttendanceDatabase, attendanceDatabase, eventsDatabase } = useData();
  const router = useRouter()

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
    const newAttendanceRecord = {
      id: attendanceDatabase.length + 1,
      ...values,
      eventDate: values.eventDate.toISOString(),
      numberInAttendance: 0,
    };
    setAttendanceDatabase([...attendanceDatabase, newAttendanceRecord]);
    router.push('/dashboard/attendance')
  };

  return (
    <div className='flex justify-center items-center h-full w-full'>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          width: '100%',
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={'eventID'}
          label="Select Event"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={eventsDatabase.map(event => ({
            label: event.name,
            value: event.id
          }))} />
        </Form.Item>
        <Form.Item
          name={'date'}
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
