'use client'

import { Button, Divider, List, Space, Form, DatePicker, Select, Input, Modal } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/lib/contexts/storeContext';
import AddEventAttendanceRecord from './addEventAttendanceRecord';
import AddNewAttendance from './NewAttendanceForm';

const Attendance = () => {
  const { attendance, events, eventCategories } = useStore()
  const [filteredAttendanceList, setFilteredAttendanceList] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedEventID, setSelectedEventID] = useState(null)
  const [openAddRecordModal, setOpenAddRecordModal] = useState(false)
  const [openAddAttendanceModal, setOpenAddAttendanceModal] = useState(false)
  const onClose = () => setOpenAddAttendanceModal(false)
  
  useEffect(() => {
    const listWithEventDetails = attendance?.map(record => {
      const event = events?.find(event => event.id === record.eventID);
      const category = event ? eventCategories.find(cat => cat.id === event.categoryID) : null;
      return {
        ...record,
        eventName: event ? event.name : 'Unknown Event',
        date: record.date || 'Unknown Date',
        eventCategory: category ? category.name : 'Unknown Category'
      };
    });
    setAttendanceList(listWithEventDetails);
    setFilteredAttendanceList(listWithEventDetails);
  }, [attendance, events, eventCategories]);

  const handleFilter = (values) => {
    const { event, dateRange, category } = values;
    let filteredList = attendanceList;

    if (event) {
      filteredList = filteredList.filter(record => record.eventName.toLowerCase().includes(event.toLowerCase()));
    }

    if (dateRange && dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      filteredList = filteredList.filter(record => new Date(record.eventDate) >= startDate && new Date(record.eventDate) <= endDate);
    }

    if (category && category !== "None") {
      filteredList = filteredList.filter(record => record.eventCategory === category);
    }

    setFilteredAttendanceList(filteredList);
  };

  return (
    <>
      <Divider className='my-1' />
      <div className='px-4 flex flex-wrap items-center' size='middle'>
        <Form layout="inline" onFinish={handleFilter} style={{ marginBottom: '16px', flex: '1 1 auto' }}>
          <Form.Item name="event">
            <Input placeholder="Event Name" />
          </Form.Item>
          <Form.Item name="dateRange">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item name="category">
            <Select placeholder="Category" style={{ width: 200 }}>
              <Select.Option value="None">None</Select.Option>
              {eventCategories?.map(category => (
                <Select.Option key={category.id} value={category.name}>{category.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Filter</Button>
          </Form.Item>
          <Button style={{ marginLeft: 0 }} onClick={()=>setOpenAddAttendanceModal(true)}>Add New Attendance</Button>
        </Form>
      </div>
      <Divider className='m-1' />
      <div className='px-4'>
        <List
          itemLayout="horizontal"
          dataSource={filteredAttendanceList}
          renderItem={item => (
            <List.Item
              actions={[
                <Button key="add" onClick={() => {
                  setSelectedEventID(item.id)
                  setOpenAddRecordModal(true)
                }}>Add Records</Button>,
                <Button key="view"><Link href={`/dashboard/attendance/${item.id}`}>View Attendance Details</Link></Button>
              ]}
            >
              <List.Item.Meta
                title={item.eventName}
                description={`Date: ${item.date} | Category: ${item.eventCategory}`}
              />
            </List.Item>
          )}
        />
      </div>
      <Modal
        open={openAddRecordModal}
        onCancel={() => setOpenAddRecordModal(!openAddRecordModal)}
        onClose={() => setOpenAddRecordModal(!openAddRecordModal)}
        footer={null}
      >
        <AddEventAttendanceRecord eventID={selectedEventID} isModalOpen={openAddRecordModal} setIsModalOpen={setOpenAddRecordModal} />
      </Modal>
      <Modal
        title="Add new attendance"
        open={openAddAttendanceModal}
        onCancel={onClose}
        onClose={onClose}
        footer={null}
      >
        <AddNewAttendance handleClose={onClose} />
      </Modal>
    </>
  );
}

export default Attendance;
