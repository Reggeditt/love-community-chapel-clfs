'use client'

import React, { useEffect, useState } from 'react';
import { Button, Divider, Table, Space, Statistic, Modal, Form, Select, Drawer, Input, message, AutoComplete } from 'antd';
import { useData } from '../../dataFactory';
import { usePathname } from 'next/navigation';

const EventAttendanceDetails = () => {
  const pathSegments = usePathname().split('/');
  const attendanceId = pathSegments[pathSegments.length - 1];
  const [form] = Form.useForm();
  const [drawerForm] = Form.useForm();
  const { attendanceDatabase, eventsDatabase, membersDatabase, visitorsDatabase, childrensDatabase, setAttendanceDatabase, setVisitorsDatabase } = useData();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [allIndividualsData, setAllIndividualsData] = useState([]);
  const [attendeeOptions, setAttendeeOptions] = useState([]);
  const [currentAttendanceRecord, setCurrentAttendanceRecord] = useState(null);

  // Define table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Member', value: 'Member' },
        { text: 'Visitor', value: 'Visitor' },
        { text: 'Child', value: 'Child' },
      ],
      onFilter: (value, record) => record.type === value,
    },
  ];

  const totalAttendees = attendanceRecords.length;

  // Handle opening the modal to add attendees
  const handleAddAttendees = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };

  // Handle submitting the modal form
  const handleModalSubmit = (values) => {
    const newAttendees = values.attendees.map(attendee => attendee.id);
    const newFilteredAttendanceData = attendanceDatabase.filter(att => att.id !== attendanceId)
    const newAttendanceData = { 
      id: currentAttendanceRecord.id, 
      eventID: currentAttendanceRecord.eventID, 
      date: currentAttendanceRecord.date || null, 
      attendees: currentAttendanceRecord.attendees ? [...currentAttendanceRecord.attendees, ...newAttendees] : newAttendees 
    }
    console.log(values, newAttendanceData, newFilteredAttendanceData, 'new data: ', [...newFilteredAttendanceData, newAttendanceData]);
    setAttendanceDatabase([...newFilteredAttendanceData, newAttendanceData]);
    console.log(values)
    setIsModalOpen(false);
    form.resetFields();
  };

  // Handle submitting the drawer form
  const handleDrawerSubmit = (values) => {
    const newVisitor = { id: Date.now().toString(), ...values };
    setVisitorsDatabase((prev) => [...prev, newVisitor]);
    message.success('First-timer added successfully!');
    drawerForm.resetFields();
    setIsDrawerOpen(false);
    setIsModalOpen(true);
  };

  const handleDelete = (record) => { }

  const handleEdit = (record) => { }

  const handleFormatAttendees = (attendanceId, allIndividuals) => {
    const currentAttRec = attendanceDatabase.find(record => record.id === attendanceId);
    setCurrentAttendanceRecord(currentAttRec)
    if (attendanceId && allIndividuals) {
      const attendanceRecord = attendanceDatabase.find(record => record.id === attendanceId);
      const event = eventsDatabase.find(event => event.id === attendanceRecord.eventID);
      if (attendanceRecord.attendees) {
        const attendeesArray = attendanceRecord.attendees.map(attendeeId => {
          const attendee = allIndividuals?.find(individual => individual.value === attendeeId)
          return attendee
        });
        setAttendanceRecords(attendeesArray);
      } else setAttendanceRecords([]);
      setEventDetails(event);
    };
  }

  // Fetch data and set state when component mounts or dependencies change
  useEffect(() => {
    const allIndividuals = [
      ...membersDatabase.map(member => ({ value: member.id, name: `${member.firstName} ${member.lastName}`, label: `${member.firstName} ${member.lastName}`, status: 'Member' })),
      ...visitorsDatabase.map(visitor => ({ value: visitor.id, name: `${visitor.firstName} ${visitor.lastName}`, label: `${visitor.firstName} ${visitor.lastName}`, status: 'Visitor' })),
      ...childrensDatabase.map(child => ({ value: child.id, name: `${child.firstName} ${child.lastName}`, label: `${child.firstName} ${child.lastName}`, status: 'Child' }))
    ]
    setAllIndividualsData(allIndividuals);
    setAttendeeOptions(allIndividuals)

    handleFormatAttendees(attendanceId, allIndividuals);

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
