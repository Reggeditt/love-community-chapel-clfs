import React from 'react';
import { Modal, Form, Button } from 'antd';
import FormListItem from './FormListItem';

const AddAttendeesModal = ({ isModalOpen, handleModalCancel, handleModalSubmit, form, attendeeOptions, setIsDrawerOpen, setIsModalOpen, selectedAttendees }) => {
  return (
    <Modal
      title="Add Attendees"
      open={isModalOpen}
      onCancel={handleModalCancel}
      onClose={handleModalCancel}
      onOk={handleModalSubmit}
      footer={null}
    >
      <Form form={form} onFinish={handleModalSubmit}>
        <Form.List name="attendees">
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <FormListItem
                  key={field.key}
                  field={field}
                  remove={remove}
                  setIsDrawerOpen={setIsDrawerOpen}
                  setIsModalOpen={setIsModalOpen}
                  attendeeOptions={attendeeOptions}
                  selectedAttendees={selectedAttendees}
                />
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAttendeesModal;
