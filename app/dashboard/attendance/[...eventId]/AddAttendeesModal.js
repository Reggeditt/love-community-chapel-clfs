import React from 'react';
import { Modal } from 'antd';
import AttendeeForm from './AttendeeForm';

const AddAttendeesModal = ({ isModalOpen, handleModalCancel, handleModalSubmit, form, attendeeOptions, setIsDrawerOpen, setIsModalOpen }) => {
  return (
    <Modal
      title="Add Attendees"
      open={isModalOpen}
      onCancel={handleModalCancel}
      footer={null}
    >
      <AttendeeForm
        form={form}
        attendeeOptions={attendeeOptions}
        setIsDrawerOpen={setIsDrawerOpen}
        setIsModalOpen={setIsModalOpen}
        handleModalSubmit={handleModalSubmit}
      />
    </Modal>
  );
};

export default AddAttendeesModal;
