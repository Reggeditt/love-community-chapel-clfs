import React from 'react';
import { Form, Button } from 'antd';
import FormListItem from './[...eventId]/FormListItem';

const AttendeeForm = ({ form, attendeeOptions, setIsDrawerOpen, setIsModalOpen, handleModalSubmit }) => {
  return (
    <Form form={form} onFinish={handleModalSubmit}>
      <Form.List name="attendees">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <FormListItem
                key={field.key}
                field={field}
                remove={remove}
                setIsDrawerOpen={setIsDrawerOpen}
                setIsModalOpen={setIsModalOpen}
                attendeeOptions={attendeeOptions}
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
        <Button type="primary" htmlType="submit" block>Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default AttendeeForm;
