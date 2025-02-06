'use client'

import React from 'react';
import { Button, DatePicker, Form, Input, InputNumber, message } from 'antd';
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

const AddNewMember = () => {
  const { setMembersDatabase } = useData();
  const router = useRouter();
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

  const onFinish = (values) => {
    form.resetFields();
    message.success('Member added successfully!');
    router.push('/dashboard/members');
    setMembersDatabase((prev) => [...prev, values]);
  };

  return (
    <div className='flex justify-center items-center h-full w-full'>
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 1200,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={'firstName'}
          label="First name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'lastName'}
          label="Last name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'email'}
          label="Email"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'contact'}
          label="Contact"
          rules={[
            {
              type: 'text',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'occupation'}
          label="Occupation"
          rules={[
            {
              type: 'text',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'dob'}
          label="Date Of Birth"
          rules={[
            {
              type: 'date',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name={'age'}
          label="Age"
          rules={[
            {
              type: 'number',
              min: 0,
              max: 125,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={'residentialArea'} label="Residential Area">
          <Input />
        </Form.Item>
        <Form.Item name={'notes'} label="Notes">
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

export default AddNewMember
