import { Form, Select, Input, TimePicker, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../../../hooks/contexts/storeContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import moment from 'moment';

const EditEvent = ({ eventData }) => {
  const { eventCategories } = useStore();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues({
      categoryID: eventData.categoryID,
      name: eventData.name,
      startTime: eventData.startTime ? moment(eventData.startTime) : moment(new Date().getTime()),
      endTime: eventData.endTime ? moment(eventData.endTime) : moment(new Date().getTime()),
      description: eventData.description
    });
    form.resetFields(); // Reset form fields when eventData changes
  }, [eventData, form]);

  const onFinish = async (values) => {
    const updatedEvent = {
      ...values,
      startTime: values.startTime.toISOString(),
      endTime: values.endTime.toISOString(),
    };
    await updateDoc(doc(db, 'events', eventData.id), updatedEvent);
    form.resetFields();
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={initialValues}
      form={form}
      style={{
        maxWidth: 600,
        width: '100%',
      }}
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
      <Form.Item name={'endTime'} label="End Time" rules={[{ required: true, message: 'Please select the end time!' }]}>
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
  );
};

export default EditEvent;
