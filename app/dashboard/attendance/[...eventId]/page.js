'use client'

import React, { useEffect, useState } from 'react';
import { Button, Divider, Space, Statistic, Form, message } from 'antd';
import { useData } from '../../dataFactory';
import { usePathname } from 'next/navigation';
import AttendeesTable from './AttendeesTable';
import AddAttendeesModal from './AddAttendeesModal';
import AddFirstTimerDrawer from './AddFirstTimerDrawer';

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
      onFilter: (value, record) => record.status === value,
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

  // Handle submitting the drawer form
  const handleDrawerSubmit = (values) => {
    const newVisitor = { id: Date.now().toString(), ...values };
    setVisitorsDatabase((prev) => [...prev, newVisitor]);
    message.success('First-timer added successfully!');
    drawerForm.resetFields();
    setIsDrawerOpen(false);
    setIsModalOpen(true);
  };

  // Fetch data and set state when component mounts or dependencies change
  useEffect(() => {
    const allIndividuals = [
      ...membersDatabase.map(member => ({ value: member.id, name: `${member.firstName} ${member.lastName}`, label: `${member.firstName} ${member.lastName}`, status: 'Member' })),
      ...visitorsDatabase.map(visitor => ({ value: visitor.id, name: `${visitor.firstName} ${visitor.lastName}`, label: `${visitor.firstName} ${visitor.lastName}`, status: 'Visitor' })),
      ...childrensDatabase.map(child => ({ value: child.id, name: `${child.firstName} ${child.lastName}`, label: `${child.firstName} ${child.lastName}`, status: 'Child' }))
    ]
    setAllIndividualsData(allIndividuals);
    setAttendeeOptions(allIndividuals)

    if (attendanceId && allIndividuals) {
      const attendanceRecord = attendanceDatabase.find(record => record.id === attendanceId);
      const event = eventsDatabase.find(event => event.id === attendanceRecord.eventID);
      const attendeesArray = attendanceRecord.attendees ? attendanceRecord.attendees.map(attendeeId => {
        const attendee = allIndividuals?.find(individual => individual.value === attendeeId)
        return attendee
      }) : [];
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
      <AttendeesTable columns={columns} dataSource={attendanceRecords} />
      <AddAttendeesModal
        isModalOpen={isModalOpen}
        handleModalCancel={handleModalCancel}
        handleModalSubmit={handleModalSubmit}
        form={form}
        attendeeOptions={attendeeOptions}
        setIsDrawerOpen={setIsDrawerOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <AddFirstTimerDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        handleDrawerSubmit={handleDrawerSubmit}
        drawerForm={drawerForm}
      />
    </div>
  );
};

export default EventAttendanceDetails;
