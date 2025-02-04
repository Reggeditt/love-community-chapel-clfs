'use client'

import React, { useEffect, useState } from 'react';
import { Button, Divider, Table, Space, Statistic, Modal, Form, Select } from 'antd';
import { useData } from '../../dataFactory';
import { usePathname } from 'next/navigation';

const EventAttendanceDetails = () => {
  const router = usePathname().split('/');
  const eventId = router[router.length-1];
  const { attendanceDatabase, eventsDatabase, membersDatabase, visitorsDatabase, childrensDatabase, setAttendanceDatabase } = useData();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (eventId) {
      const event = eventsDatabase.find(event => event.id === eventId);
      setEventDetails(event);

      const records = attendanceDatabase
        .filter(record => record.eventID === eventId)
        .map(record => {
          const attendees = record.attendees.map(attendeeId => {
            const member = membersDatabase.find(member => member.id === attendeeId);
            const visitor = visitorsDatabase.find(visitor => visitor.id === attendeeId);
            const child = childrensDatabase.find(child => child.id === attendeeId);
            return {
              id: attendeeId,
              name: member?.name || visitor?.name || child?.name || 'Unknown',
              type: member ? 'Member' : visitor ? 'Visitor' : child ? 'Child' : 'Unknown'
            };
          });
          return attendees;
        }).flat();
      setAttendanceRecords(records);
    }
  }, [eventId, attendanceDatabase, eventsDatabase, membersDatabase, visitorsDatabase, childrensDatabase]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Member', value: 'Member' },
        { text: 'Visitor', value: 'Visitor' },
        { text: 'Child', value: 'Child' },
      ],
      onFilter: (value, record) => record.type === value,
    },
  ];

  const totalAttendees = attendanceRecords.length;

  const handleAddAttendees = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (values) => {
    const newAttendees = values.attendees.map(attendee => attendee.id);
    const updatedAttendanceDatabase = attendanceDatabase.map(record => {
      if (record.eventID === eventId) {
        return {
          ...record,
          attendees: [...record.attendees, ...newAttendees]
        };
      }
      return record;
    });
    setAttendanceDatabase(updatedAttendanceDatabase);
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div style={{ padding: '16px' }}>
      <Divider />
      <Space className='px-4' size='middle'>
        <Statistic title="Total Attendees" value={totalAttendees} />
        <Button type="primary" onClick={handleAddAttendees}>Add Attendees</Button>
      </Space>
      <Divider />
      <Table
        columns={columns}
        dataSource={attendanceRecords}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
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
                      fieldKey={[field.fieldKey, 'id']}
                      rules={[{ required: true, message: 'Please select an attendee' }]}
                    >
                      <Select placeholder="Select Attendee" style={{ width: 200 }}>
                        {membersDatabase.map(member => (
                          <Select.Option key={member.id} value={member.id}>{member.name} (Member)</Select.Option>
                        ))}
                        {visitorsDatabase.map(visitor => (
                          <Select.Option key={visitor.id} value={visitor.id}>{visitor.name} (Visitor)</Select.Option>
                        ))}
                        {childrensDatabase.map(child => (
                          <Select.Option key={child.id} value={child.id}>{child.name} (Child)</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Button type="link" onClick={() => remove(field.name)}>Remove</Button>
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
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventAttendanceDetails;