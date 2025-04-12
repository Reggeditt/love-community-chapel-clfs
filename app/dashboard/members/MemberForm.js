import React from 'react';
import { Form, Input, DatePicker, InputNumber, Button, message, Select } from 'antd';
import { useStore } from '@/hooks/contexts/storeContext';
import moment from 'moment';

const MemberForm = ({ form, onClose }) => {
  const { addDocument } = useStore();

  const handleSubmit = (values) => {
    const formattedDate = moment(values.date).format('YYYY/MM/DD');
    const newMember = {
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender || 'unknown',
      dob: formattedDate,
      email: values.email,
      contact: values.contact,
      occupation: values.occupation,
      age: values.age,
      residentialArea: values.residentialArea,
      notes: values.notes || ' ',
    }
    addDocument('members', newMember);
    form.resetFields();
    onClose();
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
    >
      <Form.Item
        name={'firstName'}
        label="First name"
        rules={[{ required: true, message: 'Please input the first name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'lastName'}
        label="Last name"
        rules={[{ required: true, message: 'Please input the last name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'gender'}
        label="Gender"
      >
        <Select placeholder={'Select gender'} options={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}, {value: 'unknown', label: 'Other'}]} />
      </Form.Item>
      <Form.Item
        name={'email'}
        label="Email"
        rules={[{ type: 'email', message: 'Please input a valid email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'contact'}
        label="Contact"
        rules={[{ required: true, message: 'Please input the contact!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'occupation'}
        label="Occupation"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'dob'}
        label="Date Of Birth"
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name={'age'}
        label="Age"
        rules={[{ type: 'number', min: 0, max: 125, message: 'Please input a valid age!' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={'residentialArea'}
        label="Residential Area"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'notes'}
        label="Notes"
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MemberForm;
