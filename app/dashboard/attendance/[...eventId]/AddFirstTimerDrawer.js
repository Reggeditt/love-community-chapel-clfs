import React from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import VisitorForm from '../../visitors/VisitorForm';

const AddFirstTimerDrawer = ({ isDrawerOpen, setIsDrawerOpen, setIsModalOpen }) => {
  return (
    <Drawer
      title="Add First-timer"
      width={360}
      onClose={() => setIsDrawerOpen(false)}
      open={isDrawerOpen}
    >
      <VisitorForm onClose={() => setIsDrawerOpen(false)} setIsModalOpen={setIsModalOpen} attendance={true} />
    </Drawer>
  );
};

export default AddFirstTimerDrawer;
