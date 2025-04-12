import React from 'react';
import { Drawer, Form, Input, Button } from 'antd';

const FirstTimerDrawer = ({ isDrawerOpen, setIsDrawerOpen, handleDrawerSubmit, drawerForm }) => {
  return (
    <Drawer
      title="Add First-timer"
      width={360}
      onClose={() => setIsDrawerOpen(false)}
      open={isDrawerOpen}
    >
      <Form form={drawerForm} onFinish={handleDrawerSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please enter the email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="contact"
          label="Contact"
          rules={[{ required: true, message: 'Please enter the contact' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FirstTimerDrawer;
