import React from 'react';
import { Form, Button, AutoComplete, Space } from 'antd';

const FormListItem = ({ field, remove, setIsDrawerOpen, setIsModalOpen, attendeeOptions }) => {
  return (
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
  );
};

export default FormListItem;
