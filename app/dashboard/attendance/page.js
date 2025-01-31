'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useData } from '../dataFactory'
import { Divider, Space, Table } from 'antd';


const Children = () => {
  const [tableData, setTableData] = useState(null)
  const {attendanceDatabase, eventsDatabase, childrensDatabase, membersDatabase, visitorsDatabase} = useData();
  const columns = [
    {
      title: 'Event ID',
      dataIndex: 'eventId',
      filters: [{text: 'event 1',value: 1}],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',
    },
    {
      title: 'Event Name',
      dataIndex: 'event',
      filters: [{text: 'event 1',value: 1}],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',
    },
    {
      title: 'Date',
      dataIndex: 'eventDate',
      render: (text, record) => {
        return (
          <span>{new Date(text).toLocaleDateString()}</span>
        )
      },
      filters: [],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',
    },
    {
      title: 'Total Attendance',
      dataIndex: 'numberInAttendance',
      filters: [{text: 'event 1',value: 1}],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',
    },
    {
      title: 'Action',
      dataIndex: '',
      filters: [],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',
      render: (text, record) => {
        
        return (
          <Button><Link href={`/dashboard/attendance/${text.eventId}`}>View Details</Link></Button>
        )
      },
    },
  ];
  
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  
  useEffect(()=>{
    setTableData(attendanceDatabase)
  },[attendanceDatabase])
  return (
    <>
      <Divider />
      <Space className='px-4' size='middle'>
        <Button><Link href={'/dashboard/attendance/new'}>Add New Attendance Record</Link></Button>
      </Space>
      <Divider />
      <Table columns={columns} dataSource={tableData} onChange={onChange} scroll={{x:true}}/>
    </>
  )
}

export default Children