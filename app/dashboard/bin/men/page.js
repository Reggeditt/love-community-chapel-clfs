'use client'

import React, { useEffect, useState } from 'react'
import { useData } from '../../dataFactory'
import { Table, Button, Divider, Space } from 'antd'
import Link from 'next/link'

const Men = () => {
  const [tableData, setTableData] = useState(null)
  const { menDatabase } = useData()
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
    setTableData(menDatabase)
  }, [menDatabase])

  return (
    <>
      <Divider />
      <Space className='px-4' size='middle'>
        <Button><Link href={'/dashboard/men/new'}>Add New Man</Link></Button>
      </Space>
      <Divider />
      <Table columns={columns} dataSource={tableData} rowKey="id" />
    </>
  )
}

export default Men
