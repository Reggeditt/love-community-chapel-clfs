'use client'

import React, { useEffect, useState } from 'react';
import { List, message } from 'antd';
import { Button, Divider, Form, Modal, Space, Select, Input, AutoComplete } from 'antd';
import dynamic from 'next/dynamic';
const AddGroupCategory = dynamic(() => import('./addGroupCategory'), { loading: () => <p>Loading...</p> });
const AddGroup = dynamic(() => import('./addGroup'), { loading: () => <p>Loading...</p> });
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EditGroup from './editGroup';
import { useStore } from '@/lib/contexts/storeContext';

const GroupsPage = () => {
  const { groups, groupCategories, setGroups, deleteDocument } = useStore();
  const [groupsList, setGroupsList] = useState([]);
  const [filteredGroupsList, setFilteredGroupsList] = useState([]);
  const [openGroupCategoryModal, setOpenGroupCategoryModal] = useState(false);
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const groupsWithCategoryNames = groups.length? groups.map(group => {
      const category = groupCategories.find(cat => cat.id === group.categoryID);
      return { ...group, category: category ? category.name : 'Unknown' };
    }): [];
    setGroupsList(groupsWithCategoryNames);
    setFilteredGroupsList(groupsWithCategoryNames);
    setOpenGroupCategoryModal(false);
    setOpenGroupModal(false);
  }, [groups, groupCategories]);

  const handleGroupCategoryModalClose = () => {
    setOpenGroupCategoryModal(false);
  };

  const handleGroupCategoryModalCancel = () => {
    setOpenGroupCategoryModal(false);
  };

  const handleGroupModalClose = () => {
    setOpenGroupModal(false);
  };

  const handleGroupModalCancel = () => {
    setOpenGroupModal(false);
  };

  const handleNameSearch = (value) => {
    if (value) {
      const suggestions = groupsList
        .filter(group => group.name.toLowerCase().includes(value.toLowerCase()))
        .map(group => ({ value: group.name }));
      setNameSuggestions(suggestions);
    } else {
      setNameSuggestions([]);
    }
  };

  const handleFilter = (values) => {
    const { name, category } = values;
    let filteredList = groupsList;

    if (name) {
      filteredList = filteredList.filter(group => group.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (category && category !== "None") {
      filteredList = filteredList.filter(group => group.category === category);
    }

    setFilteredGroupsList(filteredList);
  };

  const handleEdit = (item) => {
    setSelectedGroup(item);
    setOpenGroupModal(true);
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
      <Divider className='m-0' />
      <Space className='px-4' size='middle' style={{ marginBottom: '4px' }}>
        <Button onClick={() => setOpenGroupCategoryModal(!openGroupCategoryModal)}>Add Group Category</Button>
        <Button onClick={() => setOpenGroupModal(!openGroupModal)}>Add New Group</Button>
      </Space>
      <Divider className='m-0'/>
      <Form layout="inline" onFinish={handleFilter} style={{ marginBottom: '16px' }}>
        <Form.Item name="name">
          <AutoComplete
            options={nameSuggestions}
            onSearch={handleNameSearch}
            placeholder="Group Name"
          />
        </Form.Item>
        <Form.Item name="category">
          <Select placeholder="Category" style={{ width: 200 }}>
            <Select.Option value="None">None</Select.Option>
            {groupCategories.map(category => (
              <Select.Option key={category.id} value={category.name}>{category.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Filter</Button>
        </Form.Item>
      </Form>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={filteredGroupsList}
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
              description={`Category: ${item.category} | Description: ${item.description}`}
            />
          </List.Item>
        )}
      />
      <Modal
        open={openGroupCategoryModal}
        onClose={handleGroupCategoryModalClose}
        onCancel={handleGroupCategoryModalCancel}
        footer={null}
      >
        <AddGroupCategory setOpenGroupCategoryModal />
      </Modal>
      <Modal
        open={openGroupModal}
        onClose={handleGroupModalClose}
        onCancel={handleGroupModalCancel}
        okButtonProps={null}
        footer={null}
      >
        {!selectedGroup ? <AddGroup setOpenGroupModal={setOpenGroupModal}/> : <EditGroup groupData={selectedGroup} />}
      </Modal>
      <FloatButton.Group shape="circle" style={{ right: 24, bottom: 24 }}>
        <FloatButton icon={<PlusOutlined />} onClick={() => setOpenGroupModal(true)} tooltip="Add New Group" />
        <FloatButton icon={<PlusOutlined />} onClick={() => setOpenGroupCategoryModal(true)} tooltip="Add Group Category" />
      </FloatButton.Group>
    </div>
  );
};

export default GroupsPage;
