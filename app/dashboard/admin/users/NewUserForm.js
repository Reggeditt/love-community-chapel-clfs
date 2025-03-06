import { Form, Input, Button, Select } from 'antd';
import React from 'react';
import { useStore } from '../../../../lib/contexts/storeContext';
import { useAuth } from '@/lib/contexts/authContext';

const AddNewUser = ({setOpenUserModal}) => {
  const { allIndividuals } = useStore();
  const {signupUser} = useAuth();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    signupUser(values.email, values.password, values.role, values.name);
    form.resetFields();
    setOpenUserModal(false);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        width: '100%',
      }}
    >
      <Form.Item
        name={'name'}
        label="User's Name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'email'}
        label="Add User's Email"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Input placeholder='e.g. user@mail.com' />
      </Form.Item>
      <Form.Item
        name={'password'}
        label="Password"
        rules={[{ required: true, message: 'Please enter password!' }]}
      >
        <Input type='password' />
      </Form.Item>
      <Form.Item
        name={'role'}
        label="Select User Role"
        rules={[{ required: true, message: 'Please define users role!' }]}
      >
        <Select options={[{
          label: 'Admin',
          value: 'admin'
        }, {
          label: 'Data entry',
          value: 'data_entry'
        }]} />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewUser;
