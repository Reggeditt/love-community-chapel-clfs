'use client'

import React, { useEffect, useState } from 'react';
import { List, message } from 'antd';
import { Button, Divider, Form, Modal, Space, Select, Input, AutoComplete } from 'antd';
import dynamic from 'next/dynamic';
const AddNewUser = dynamic(() => import('./NewUserForm'), {ssr: false, loading: () => <p>Loading...</p> });
const EditUserInfo = dynamic(() => import('./EditUserInfo'), {ssr: false, loading: () => <p>Loading...</p> });
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useStore } from '@/lib/contexts/storeContext';

const UsersPanel = () => {
  const { users, deleteDocument } = useStore();
  const [usersList, setUsersList] = useState([]);
  const [filteredUsersList, setFilteredUsersList] = useState([]);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const currentUsers = users?.map(user => ({
      name: user.username, email:user.email, role:user.role
    }))  
    setUsersList(currentUsers);
    setFilteredUsersList(currentUsers);
  }, [users]);

  const handleGroupCategoryModalClose = () => {
    setOpenUserModal(false);
  };

  const handleGroupCategoryModalCancel = () => {
    setOpenUserModal(false);
  };

  const handleGroupModalClose = () => {
    setOpenGroupModal(false);
  };

  const handleGroupModalCancel = () => {
    setOpenGroupModal(false);
  };

  const handleNameSearch = (value) => {
    if (value) {
      const suggestions = usersList
        .filter(user => user.username.toLowerCase().includes(value.toLowerCase()))
        .map(user => ({ value: user.username }));
      setNameSuggestions(suggestions);
    } else {
      setNameSuggestions([]);
    }
  };

  const handleFilter = (values) => {
    const { name, role } = values;
    let filteredList = usersList;

    if (name) {
      filteredList = filteredList.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (category && category !== "None") {
      filteredList = filteredList.filter(user => user.category === category);
    }

    setFilteredUsersList(filteredList);
  };

  const handleEdit = (item) => {
    setSelectedUser(item);
    setOpenEditUserModal(true);
  };

  const handleDelete = (id) => {
    try {
      deleteDocument('groups', id);
      message.success('Group deleted successfully!');
    } catch (error) {
      message.error('Failed to delete group!');
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <Space className='px-4' size='middle' style={{ marginBottom: '4px' }}>
        <Button onClick={() => setOpenUserModal(true)}>Add New User</Button>
      </Space>
      <Divider className='m-0'/>
      <Form layout="inline" onFinish={handleFilter} style={{ marginBottom: '16px' }}>
        <Form.Item name="name">
          <AutoComplete
            options={nameSuggestions}
            onSearch={handleNameSearch}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item name="role">
          <Select placeholder="Role" style={{ width: 200 }}>
            <Select.Option value="None">None</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="data_entry">Data Entry</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Filter</Button>
        </Form.Item>
      </Form>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={filteredUsersList}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Button key="edit" onClick={()=>handleEdit(item)}>Edit</Button>,
              <Button key="delete" onClick={() => handleDelete(item.id)}>Delete</Button>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={`Email: ${item.email} | Role: ${item.role}`}
            />
          </List.Item>
        )}
      />
      <Modal
        open={openUserModal}
        onClose={handleGroupCategoryModalClose}
        onCancel={handleGroupCategoryModalCancel}
        footer={null}
      >
        <AddNewUser setOpenUserModal={setOpenUserModal} />
      </Modal>
      <Modal
        open={openEditUserModal}
        onClose={handleGroupModalClose}
        onCancel={handleGroupModalCancel}
        okButtonProps={null}
        footer={null}
      >
        {!selectedUser ? <AddNewUser setOpenUserModal={setOpenUserModal}/> : <EditUserInfo groupData={selectedUser} />}
      </Modal>
      <FloatButton.Group shape="circle" style={{ right: 24, bottom: 24 }}>
        <FloatButton icon={<PlusOutlined />} onClick={() => setOpenUserModal(true)} tooltip="Add New User" />
      </FloatButton.Group>
    </div>
  );
};

export default UsersPanel;
