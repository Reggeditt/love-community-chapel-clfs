'use client'

import React from 'react';
import { Button, DatePicker, Form, Input, message, Select } from 'antd';
import { useData } from '../dataFactory';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { useStore } from '../../../lib/contexts/storeContext';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const AddNewAttendance = ({handleClose}) => {
  const { setAttendanceDatabase, attendanceDatabase, eventsDatabase } = useData();
  const { addDocument, attendance, events } = useStore();
  const [form] = Form.useForm();
  const router = useRouter()

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinish = (values) => {
    const newAttendanceRecord = {
      eventID: values.eventID,
      description: values.description || ' ',
      date: values.date.format('YYYY/MM/DD'),
      numberInAttendance: 0,
    };
    const isDuplicate = attendance?.find(record => record.eventID === newAttendanceRecord.eventID && record.date === newAttendanceRecord.date);
    if (isDuplicate) {
      console.log(attendance, newAttendanceRecord, isDuplicate);
      form.resetFields()
      return message.error('Attendance record for this event on this date already exists!')};
    addDocument('attendance', newAttendanceRecord);
    form.resetFields()
    router.push('/dashboard/attendance')
  };

  return (
    <div className='flex justify-center items-center h-full w-full'>
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          width: '100%',
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={'eventID'}
          label="Select Event"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={events.map(event => ({
            label: event.name,
            value: event.id
          }))} />
        </Form.Item>
        <Form.Item
          name={'date'}
          label="Event Date"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker format={'YYYY/MM/DD'}/>
        </Form.Item>
        <Form.Item name={'description'} label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddNewAttendance



// import React from 'react';
// import { DatePicker, Space } from 'antd';
// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// dayjs.extend(customParseFormat);
// const { RangePicker } = DatePicker;
// const dateFormat = 'YYYY/MM/DD';
// const weekFormat = 'MM/DD';
// const monthFormat = 'YYYY/MM';

// /** Manually entering any of the following formats will perform date parsing */
// const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
// const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
// const customWeekStartEndFormat = (value) =>
//   `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
//     .endOf('week')
//     .format(weekFormat)}`;
// const App = () => (
//   <Space direction="vertical" size={12}>
//     <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={dateFormat} />
//     <DatePicker defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} />
//     <DatePicker defaultValue={dayjs('2015/01', monthFormat)} format={monthFormat} picker="month" />
//     <DatePicker defaultValue={dayjs()} format={customWeekStartEndFormat} picker="week" />
//     <RangePicker
//       defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
//       format={dateFormat}
//     />
//     <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={customFormat} />
//   </Space>
// );
// export default App;