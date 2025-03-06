'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useData } from '../dataFactory'
import { Divider, Space, Table, message, Tag, Modal } from 'antd';
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic'
import { useStore } from '@/lib/contexts/storeContext'

const VisitorForm = dynamic(() => import('./VisitorForm'), { ssr: false, loading: () => <p>Loading...</p> })

const Visitors = () => {
  const [tableData, setTableData] = useState(null)
  const { visitors, members, addDocument, allIndividuals } = useStore();
  const [openModal, setOpenModal] = useState(false);

  const transferToMembers = (record) => {
    const discipledMember = {
      firstName: record.firstName,
      lastName: record.lastName,
      dob: formattedDate || ' ',
      email: record.email || " ",
      contact: record.contact || ' ',
      occupation: record.occupation || ' ',
      age: record.age || ' ',
      residentialArea: record.residentialArea || ' ',
      notes: record.notes || ' ',
    }
    addDocument('members', discipledMember)
    message.success('Visitor transferred to members database!');
  };

  const onClose = () => setOpenModal(false);

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      filters: Array.from(new Set(visitors?.map(visitor => visitor.firstName))).map(name => ({ text: name, value: name })),
      onFilter: (value, record) => record.firstName.includes(value),
      width: '20%',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      filters: Array.from(new Set(visitors.map(visitor => visitor.lastName))).map(name => ({ text: name, value: name })),
      onFilter: (value, record) => record.lastName.includes(value),
      width: '20%',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
      width: '10%',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      filters: Array.from(new Set(visitors.map(visitor => visitor.contact))).map(contact => ({ text: contact, value: contact })),
      onFilter: (value, record) => record.contact.includes(value),
      width: '20%',
    },
    {
      title: 'Residential Area',
      dataIndex: 'residentialArea',
      filters: Array.from(new Set(visitors.map(visitor => visitor.residentialArea))).map(area => ({ text: area, value: area })),
      onFilter: (value, record) => record.residentialArea.includes(value),
      width: '20%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: Array.from(new Set(visitors.map(visitor => visitor.address))).map(address => ({ text: address, value: address })),
      onFilter: (value, record) => record.address.includes(value),
      width: '30%',
    },
    {
      title: 'Status',
      key: 'status',
      render: (text, record) => {
        const isMember = members.some(member => member.email === record.email);
        return (
          <Tag color={isMember ? 'green' : 'blue'}>
            {isMember ? 'Discipled' : 'Active Visitor'}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const isMember = members.some(member => member.email === record.email);
        return (
          <Space size="middle">
            <Button onClick={() => transferToMembers(record)} disabled={isMember}>Discipled</Button>
          </Space>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  useEffect(() => {
    setTableData(visitors)
  }, [visitors])

  return (
    <>
      <Space className='px-4' size='middle'>
        <Button onClick={()=>setOpenModal(true)}>Add New Visitor</Button>
      </Space>
      <Divider className='m-1'/>
      <Table columns={columns} dataSource={tableData} onChange={onChange} scroll={{ x: true }} />
      <FloatButton.Group 
        shape="circle" 
        style={{ right: 24, bottom: 24 }} 
        className="float-button-group"
      >
        <FloatButton icon={<PlusOutlined />} tooltip="Add New Visitor" onClick={()=> setOpenModal(true)} />
      </FloatButton.Group>
      <Modal
        open={openModal}
        footer={null}
        onCancel={onClose}
        title="Add new visitor"
      >
        {openModal && <VisitorForm onClose={onClose}/>}
      </Modal>
      <style jsx>{`
        @media (max-width: 768px) {
          .float-button-group {
            right: 16px;
            bottom: 16px;
          }
        }
      `}</style>
    </>
  )
}

export default Visitors
