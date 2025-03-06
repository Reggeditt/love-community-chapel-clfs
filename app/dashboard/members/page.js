'use client'

import React, { useEffect, useState } from 'react';
import { Divider, Table, Modal, Form, Space } from 'antd';
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useStore } from '@/lib/contexts/storeContext';
import MemberForm from './MemberForm';
import { Button } from '@/components/ui/button';

const Members = () => {
  const [tableData, setTableData] = useState(null);
  const { members } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
        },
        {
          text: 'Category 2',
          value: 'Category 2',
        }],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
        },
        {
          text: 'Category 2',
          value: 'Category 2',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
        },
        {
          text: 'Category 2',
          value: 'Category 2',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
        },
        {
          text: 'Category 2',
          value: 'Category 2',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',
    },
    {
      title: 'Occupation',
      dataIndex: 'occupation',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
        },
        {
          text: 'Category 2',
          value: 'Category 2',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      render: (text, record) => {
        return (
          <span>{new Date(text).toLocaleDateString()}</span>
        )
      },
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
        },
        {
          text: 'Category 2',
          value: 'Category 2',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',
    },
    {
      title: 'Residential Area',
      dataIndex: 'residentialArea',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
        },
        {
          text: 'Category 2',
          value: 'Category 2',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
      width: '40%',
    }
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  useEffect(() => {
    setTableData(members)
  }, [members])

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Divider className='m-0' />
      <Space className='px-4' size='middle'>
        <Button onClick={handleModalOpen}>Add New Member</Button>
      </Space>
      <Divider className='m-1' />
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        scroll={{ x: true }}
        pagination={{ responsive: true }}
      />
      <FloatButton.Group
        shape="circle"
        style={{ right: 24, bottom: 24 }}
        className="float-button-group"
      >
        <FloatButton icon={<PlusOutlined />} tooltip="Add New Member" onClick={handleModalOpen} />
      </FloatButton.Group>
      <Modal
        title="Add New Member"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <MemberForm form={form} onClose={handleModalClose} />
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

export default Members