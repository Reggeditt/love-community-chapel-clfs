import { Button, Form, Input, message } from 'antd'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import { useStore } from '@/lib/contexts/storeContext';

const AddEventCategory = ({setOpenEventCategoryModal}) => {
  const [form] = Form.useForm()
  const { eventCategories, addDocument } = useStore();

  const handleSubmit = async (values) => {
    console.log('values', values);
    for (let i = 0; i < values.eventCategories.length; i++) {
      const newEventCategory = values.eventCategories[i];
      const isDuplicate = eventCategories.find(category => category.name.toLowerCase() === newEventCategory.name.toLowerCase());
      if (isDuplicate) {
        message.error('Event Category already exists');
      } else {
        addDocument('eventCategories', newEventCategory);
        setOpenEventCategoryModal(false);
      }
    }
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