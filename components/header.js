'use client'

import React, { useState } from 'react';
import { Dropdown, Menu, Modal, Button } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '@/hooks/contexts/authContext';
import { Avatar } from 'antd';

const ProfileAvatar = () => {
  const { user, signOutUser } = useAuth();
  const [isAccountModalVisible, setIsAccountModalVisible] = useState(false);
  const [isPreferencesModalVisible, setIsPreferencesModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const handleMenuClick = ({ key }) => {
    if (key === 'account') {
      setIsAccountModalVisible(true);
    } else if (key === 'preferences') {
      setIsPreferencesModalVisible(true);
    } else if (key === 'logout') {
      setIsLogoutModalVisible(true);
    }
  };

  const handleLogout = () => {
    signOutUser();
    setIsLogoutModalVisible(false);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="account" icon={<UserOutlined />}>
        Account
      </Menu.Item>
      <Menu.Item key="preferences" icon={<SettingOutlined />}>
        Preferences
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header-container">
      <Dropdown menu={menu} trigger={['click']}>
        <Avatar
          src={'picsumphoto.com/200'}
          className="mr-4 cursor-pointer"
        />
      </Dropdown>

      <Modal
        title="Account"
        open={isAccountModalVisible}
        onCancel={() => setIsAccountModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsAccountModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {/* Account modal content */}
      </Modal>

      <Modal
        title="Preferences"
        open={isPreferencesModalVisible}
        onCancel={() => setIsPreferencesModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsPreferencesModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {/* Preferences modal content */}
      </Modal>

      <Modal
        title="Logout"
        open={isLogoutModalVisible}
        onCancel={() => setIsLogoutModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsLogoutModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="logout" type="primary" onClick={handleLogout}>
            Logout
          </Button>,
        ]}
      >
        Are you sure you want to logout?
      </Modal>
    </div>
  );
};

export default ProfileAvatar;