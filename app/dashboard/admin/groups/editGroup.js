import { Form, Input, Button, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../../../lib/contexts/storeContext';

const EditGroup = ({ groupData }) => {
  const { updateDocument, groupsCollection, groupCategories } = useStore();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues({
      name: groupData.name,
      categoryID: groupData.categoryID,
      description: groupData.description,
    });
    form.resetFields();
  }, [groupData, form]);

  const onFinish = (values) => {
    const updatedGroup = {
      ...values,
      // members: values.members.split(',').map(member => member.trim()),
    };
    updateDocument('groups', groupData.id, updatedGroup);
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
      <Form.Item
        name={'description'}
        label="Description"
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

export default EditGroup;
