'use client'

import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, DatePicker, Form, Input, InputNumber, message } from 'antd';
import { useData } from '../dataFactory';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/contexts/storeContext';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const VisitorForm = ({onClose}) => {
  const {addDocument, allIndividuals, formatAllIndividuals} = useStore()
  const router = useRouter()
  const [form] = Form.useForm()
  const [referrerOptions, setReferrerOptions] = useState([])

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
    const newVisitor = {
      firstName: values.firstName,
      lastName: values.lastName || ' ',
      email: values.email || " ",
      contact: values.contact || " ",
      occupation: values.occupation || " ",
      dob: values.dob || " ",
      age: values.age || 0,
      residentialArea: values.residentialArea || " ",
      notes: values.notes || " ",
    }
    addDocument('visitors', values)
    router.push('/dashboard/visitors')
    message.success('Visitor added successfully')
    form.resetFields()
  };

  useEffect(() => {
    const data = formatAllIndividuals()
    const referrers = data
    setReferrerOptions(referrers)
  }, []);
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
        name={ 'age'}
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
      <Form.Item name={'residentialArea'} label="residentialArea">
        <Input />
      </Form.Item>
      <Form.Item name={'referrer'} label="Referrer">
      <AutoComplete
          style={{
            width: 200,
          }}
          options={referrerOptions}
          placeholder="Add person"
          filterOption={(inputValue, option) =>
            option.name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
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

export default VisitorForm
