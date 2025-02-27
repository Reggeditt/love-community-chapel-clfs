import { useStore } from '@/lib/contexts/storeContext';
import { Form, Input, Button, message } from 'antd';
import React from 'react';

const AddGroupCategory = ({ setOpenGroupCategoryModal }) => {
  const { addDocument, groupCategoriesCollection } = useStore();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    addDocument('groupCategories', values)
    form.resetFields();
    // message.success('Group category added successfully!');
    setOpenGroupCategoryModal(false);
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
        label="Category Name"
        rules={[{ required: true, message: 'Please input the category name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'description'}
        label="Description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
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

export default AddGroupCategory;
