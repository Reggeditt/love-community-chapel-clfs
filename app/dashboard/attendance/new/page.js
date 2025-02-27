'use client'

import React from 'react';
import { Button, DatePicker, Form, Input, message, Select } from 'antd';
import { useData } from '../../dataFactory';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { useStore } from '../../../../lib/contexts/storeContext';

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
  const { addDocument, attendance, events } = useStore();
  const [form] = Form.useForm();
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
    const formattedDate = moment(values.date).format('YYYY/MM/DD');
    const newAttendanceRecord = {
      eventID: values.eventID,
      description: values.description,
      date: formattedDate,
      numberInAttendance: 0,
    };
    const isDuplicate = attendance.find(record => record.eventID === newAttendanceRecord.eventID && record.date === newAttendanceRecord.date);
    if (isDuplicate) return message.error('Attendance record for this event on this date already exists!');
    console.log('submit fired with values:', values, 'new record:', newAttendanceRecord);
    addDocument('attendance', newAttendanceRecord);
    router.push('/dashboard/attendance')
  };

  return (
    <div className='flex justify-center items-center h-full w-full'>
      <Form
        form={form}
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
          <Select options={events.map(event => ({
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
