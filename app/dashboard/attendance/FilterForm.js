import React from 'react';
import { Form, DatePicker, Select, Input, Button, AutoComplete } from 'antd';

const FilterForm = ({ handleFilter, nameSuggestions, handleNameSearch, eventCategoriesDatabase }) => {
  return (
    <Form layout="inline" onFinish={handleFilter} style={{ marginBottom: '16px' }}>
      <Form.Item name="name">
        <AutoComplete
          options={nameSuggestions}
          onSearch={handleNameSearch}
          placeholder="Event Name"
        />
      </Form.Item>
      <Form.Item name="dateRange">
        <DatePicker.RangePicker />
      </Form.Item>
      <Form.Item name="category">
        <Select placeholder="Category" style={{ width: 200 }}>
          <Select.Option value="None">None</Select.Option>
          {eventCategoriesDatabase.map(category => (
            <Select.Option key={category.id} value={category.name}>{category.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Filter</Button>
      </Form.Item>
    </Form>
  );
};

export default FilterForm;
