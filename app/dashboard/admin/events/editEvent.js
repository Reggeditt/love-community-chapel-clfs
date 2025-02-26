import { Form, Select, Input, TimePicker, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useData } from '../../dataFactory';
import moment from 'moment';

const EditEvent = ({ eventData }) => {
  const { setEventsDatabase, eventsDatabase, eventCategoriesDatabase } = useData();
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

  const onFinish = (values) => {
    const filteredEventsData = eventsDatabase.filter(event => event.id !== eventData.id);

    const newEvent = {
      id: eventData.id,
      categoryID: values.categoryID || eventData.categoryID,
      name: values.name || eventData.name,
      startTime: values.startTime ? values.startTime.toISOString() : eventData.startTime,
      endTime: values.endTime ? values.endTime.toISOString() : eventData.endTime,
      description: values.description || eventData.description
    };

    setEventsDatabase([...filteredEventsData, newEvent]);
    form.resetFields();
  };

  return (
    <>
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
        >
          <Select options={eventCategoriesDatabase.map(category => ({
            label: category.name,
            value: category.id
          }))} 
          />
        </Form.Item>
        <Form.Item
          name={'name'}
          label="Event Name"
        >
          <Input />
        </Form.Item>
        <Form.Item name={'startTime'} label="Start Time">
          <TimePicker disabled={true} />
        </Form.Item>
        <Form.Item name={'endTime'} label="End Time">
          <TimePicker disabled={true} />
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
    </>
  )
}

export default EditEvent
