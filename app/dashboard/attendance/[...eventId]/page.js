'use client'

import React, { useEffect, useState } from 'react';
import { Button, Divider, Table, Space, Statistic, Modal, Form, Select, Drawer, Input, message } from 'antd';
import { useData } from '../../dataFactory';
import { usePathname } from 'next/navigation';

const EventAttendanceDetails = () => {
  const pathSegments = usePathname().split('/');
  const attendanceId = pathSegments[pathSegments.length - 1];
  const { attendanceDatabase, eventsDatabase, membersDatabase, visitorsDatabase, childrensDatabase, setAttendanceDatabase, setVisitorsDatabase } = useData();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [drawerForm] = Form.useForm();
  const [attendeeOptions, setAttendeeOptions] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
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
    form.resetFields()
  };

  const handleModalSubmit = (values) => {
    const newAttendees = values.attendees.map(attendee => attendee.id);
    const updatedAttendanceDatabase = attendanceDatabase.map(record => {
      if (record.eventID === eventDetails.id) {
        return {
          ...record,
          attendees: [...record.attendees, ...newAttendees]
        };
      }
      return record;
    });
    setAttendanceDatabase(updatedAttendanceDatabase);
    console.log(values)
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDrawerSubmit = (values) => {
    const newVisitor = { id: Date.now().toString(), ...values };
    setVisitorsDatabase((prev) => [...prev, newVisitor]);
    message.success('First-timer added successfully!');
    drawerForm.resetFields();
    setIsDrawerOpen(false);
    setIsModalOpen(true);
  };

  const handleSearch = (value) => {
    console.log('search triggered')
  }

  useEffect(() => {
    const allIndividuals = [
      ...membersDatabase.map(member => ({ value: member.id, name: `${member.firstName} ${member.lastName}`, label: `${member.firstName} ${member.lastName}`, status: 'Member' })),
      ...visitorsDatabase.map(visitor => ({ value: visitor.id, name: `${visitor.firstName} ${visitor.lastName}`, label: `${visitor.firstName} ${visitor.lastName}`, status: 'Visitor' })),
      ...childrensDatabase.map(child => ({ value: child.id, name: `${child.firstName} ${child.lastName}`, label: `${child.firstName} ${child.lastName}`, status: 'Child' }))
    ]
    setAttendeeOptions(allIndividuals)

    if (attendanceId && allIndividuals) {
      const attendanceRecord = attendanceDatabase.find(record => record.id === attendanceId);
      const event = eventsDatabase.find(event => event.id === attendanceRecord.eventID);
      const attendeesArray = attendanceRecord.attendees.map(attendeeId => {
        const attendee = allIndividuals?.find(individual => individual.id === attendeeId)
        return attendee
      })
      console.log(attendeesArray)
      setEventDetails(event);
      setAttendanceRecords(attendeesArray);
    };
  }, [attendanceDatabase, eventsDatabase, membersDatabase, visitorsDatabase, childrensDatabase]);
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
                      rules={[{ required: true, message: 'Please select an attendee' }]}
                    >
                      <Select
                        showSearch
                        placeholder="Select Attendee"
                        onSearch={handleSearch}
                        options={attendeeOptions}
                        style={{ width: 200 }}
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
      <Drawer
        title="Add First-timer"
        width={360}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        <Form form={drawerForm} onFinish={handleDrawerSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter the email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contact"
            label="Contact"
            rules={[{ required: true, message: 'Please enter the contact' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default EventAttendanceDetails;
