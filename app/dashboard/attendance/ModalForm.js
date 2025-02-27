import React from 'react';
import { Modal, Form, Button, AutoComplete, Space } from 'antd';

const ModalForm = ({ isModalOpen, handleModalCancel, handleModalSubmit, form, attendeeOptions, setIsDrawerOpen }) => {
  return (
    <Modal
      title="Add Attendees"
      open={isModalOpen}
      onCancel={handleModalCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleModalSubmit}>
        <Form.List name="attendees">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    {...field}
                    name={[field.name, 'id']}
                    rules={[{ required: true, message: 'Please select an attendee' }]}
                  >
                    <AutoComplete
                      style={{
                        width: 200,
                      }}
                      options={attendeeOptions}
                      placeholder="Add person"
                      filterOption={(inputValue, option) =>
                        option.name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                      }
                    />
                  </Form.Item>
                  <div>
                    <Button type="link" onClick={() => remove(field.name)}>Remove</Button>
                    <Button type="link" onClick={() => { setIsDrawerOpen(true); setIsModalOpen(false); }}>First-timer</Button>
                  </div>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add Attendee
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
