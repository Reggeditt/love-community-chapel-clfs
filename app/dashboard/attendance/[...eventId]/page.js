'use client'

import React, { useEffect, useState } from 'react';
import { Button, Divider, Space, Statistic, Form, message } from 'antd';
import { useData } from '../../dataFactory';
import { usePathname } from 'next/navigation';
import AttendeesTable from '../AttendeesTable';
import AddAttendeesModal from '../AddAttendeesModal';
import AddFirstTimerDrawer from '../AddFirstTimerDrawer';
import { useStore } from '@/hooks/contexts/storeContext';

const EventAttendanceDetails = () => {
  const pathSegments = usePathname().split('/');
  const attendanceId = pathSegments[pathSegments?.length - 1];
  const [form] = Form.useForm();
  const { attendance, events, members, visitors, allIndividuals, updateDocument, formatAllIndividuals } = useStore();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

  const totalAttendees = attendanceRecords?.length || 0;

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
    const newAttendees = attendanceRecords?.map(record => ({id: record?.value} || null))
    newAttendees.push(values.attendees)
    console.log('attendanceRecords: ', attendanceRecords, 'values:', values, 'newAttendees:', newAttendees.flat());
    updateDocument('attendance', attendanceId, {attendees: newAttendees.flat(), numberInAttendance: newAttendees.length})
    setIsModalOpen(false);
    form.resetFields();
  };

  // Fetch data and set state when component mounts or dependencies change
  useEffect(() => {
    setAttendeeOptions(formatAllIndividuals())

    if (attendanceId && allIndividuals) {
      const attendanceRecord = attendance?.find(record => record.id === attendanceId);
      console.log('1. attendanceRecord:', attendanceRecord);
      const event = events?.find(event => event.id === attendanceRecord?.eventID);
      const attendeesArray = attendanceRecord?.attendees?.map(attendeeData => {
        console.log('attendeeData:', attendeeData);
        const attendee = allIndividuals?.find(individual => individual.value === attendeeData.id)
        return attendee
      }) || [];
      console.log('2. allIndividuals:', allIndividuals);
      setEventDetails(event);
      console.log('3. attendeesArray:', attendeesArray);
      setAttendanceRecords(attendeesArray);
    };
  }, [attendance, events, members, visitors]);

  return (
    <div style={{ padding: '16px' }}>
      <Divider />
      <Space className='px-4' size='middle'>
        <Statistic title="Total Attendees" value={attendanceRecords.length} />
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
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default EventAttendanceDetails;
