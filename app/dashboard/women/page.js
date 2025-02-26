'use client'

import React, { useEffect, useState } from 'react'
import { useData } from '../dataFactory'
import { Table, Button, Divider, Space } from 'antd'
import Link from 'next/link'

const Women = () => {
  const [tableData, setTableData] = useState(null)
  const { womenDatabase } = useData()
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },
  ]

  useEffect(() => {
    setTableData(womenDatabase)
  }, [womenDatabase])

  return (
    <>
      <Divider />
      <Space className='px-4' size='middle'>
        <Button><Link href={'/dashboard/women/new'}>Add New Woman</Link></Button>
      </Space>
      <Divider />
      <Table columns={columns} dataSource={tableData} rowKey="id" />
    </>
  )
}

export default Women
