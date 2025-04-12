import React, { useEffect, useState } from 'react';
import { Form, Button, AutoComplete, Space } from 'antd';

const FormListItem = ({ field, remove, setIsDrawerOpen, setIsModalOpen, attendeeOptions, selectedAttendees }) => {
  const [filteredOptions, setFilteredOptions] = useState(attendeeOptions);

  useEffect(() => {
    const selectedIds = selectedAttendees?.map(attendee => attendee.id);
    const newOptions = attendeeOptions?.filter(option => !selectedIds?.includes(option?.value));
    newOptions? setFilteredOptions(newOptions) : setFilteredOptions(attendeeOptions);
  }, [selectedAttendees, attendeeOptions]);

  return (
    <Space key={field.key} align="baseline">
      <Form.Item
        {...field}
        key={field.key}
        name={[field.name, 'id']}
        rules={[{ required: true, message: 'Please select an attendee' }]}
      >
        <AutoComplete
          style={{
            width: 200,
          }}
          options={filteredOptions}
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
