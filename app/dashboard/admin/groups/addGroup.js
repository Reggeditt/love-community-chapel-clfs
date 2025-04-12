import { Form, Input, Button, Select } from 'antd';
import React from 'react';
import { useStore } from '../../../../hooks/contexts/storeContext';

const AddGroup = ({setOpenGroupModal}) => {
  const { addDocument, groupCategories, groupsCollection } = useStore();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    addDocument('groups', values);
    form.resetFields();
    setOpenGroupModal(false);
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
        label="Group Name"
        rules={[{ required: true, message: 'Please input the group name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'categoryID'}
        label="Select Group Category"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select options={groupCategories.map(category => ({
          label: category.name,
          value: category.id
        }))} />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddGroup;
