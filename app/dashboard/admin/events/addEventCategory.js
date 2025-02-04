import { Button, Form, Input, message } from 'antd'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import { useData } from '../../dataFactory';

const AddEventCategory = () => {
  const [form] = Form.useForm()
  const { eventCategoriesDatabase, setEventCategoriesDatabase } = useData()

  const handleSubmit = async (values) => {
    const newCategories = values.eventCategories.map((category, index) => ({
      id: eventCategoriesDatabase.length + index + 1,
      ...category
    }));

    const uniqueCategories = newCategories.filter(newCategory => 
      !eventCategoriesDatabase.some(existingCategory => existingCategory.name === newCategory.name)
    );

    setEventCategoriesDatabase([...eventCategoriesDatabase, ...uniqueCategories]);
    message.success('Categories submitted successfully!');
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
      >
        <Form.List
          name="eventCategories"
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <React.Fragment key={field.key}>
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    name={[field.name, 'name']}
                    label="Category Name"
                    rules={[{ required: true, message: 'Category Name is required' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    name={[field.name, 'description']}
                    label="Description"
                  >
                    <Input />
                  </Form.Item>
                </React.Fragment>
              ))}
              <Form.Item>
                <Button
                  onClick={() => add()}
                  icon={<PlusIcon />}
                >
                  Add Event Category
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Input type='submit' value='Submit' />
        </Form.Item>
      </Form>
    </>
  )
}

export default AddEventCategory