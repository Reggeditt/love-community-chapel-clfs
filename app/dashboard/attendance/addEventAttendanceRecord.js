import React, { useState } from 'react';
import AddFirstTimerDrawer from './AddFirstTimerDrawer';
import AddAttendeesModal from './AddAttendeesModal';
import { useData } from '../dataFactory';

const AddEventAttendanceRecord = ({ setIsModalOpen, form, attendeeOptions, isDrawerOpen, setIsDrawerOpen, drawerForm }) => {
  const { setAttendanceDatabase } = useData();
  const [selectedAttendees, setSelectedAttendees] = useState([]);

  // Handle opening the modal to add attendees
  const handleAddAttendees = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // Handle submitting the modal form
  const handleModalSubmit = (values) => {
    const newAttendees = values.attendees.map(attendee => attendee.id);
    const updatedAttendanceDatabase = attendanceDatabase.map(record => {
      if (record.eventID === eventDetails.id) {
        return {
          ...record,
          attendees: [...record.attendees, ...newAttendees]
        };
      }
      return record;
    });
    setAttendanceDatabase(updatedAttendanceDatabase);
    setSelectedAttendees(values.attendees);
    setIsModalOpen(false);
    form.resetFields();
  };

  // Handle submitting the drawer form
  const handleDrawerSubmit = (values) => {
    const newVisitor = { id: Date.now().toString(), ...values };
    setVisitorsDatabase((prev) => [...prev, newVisitor]);
    message.success('First-timer added successfully!');
    drawerForm.resetFields();
    setIsDrawerOpen(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <AddAttendeesModal
        isModalOpen={isModalOpen}
        handleModalCancel={handleModalCancel}
        handleModalSubmit={handleModalSubmit}
        form={form}
        attendeeOptions={attendeeOptions}
        setIsDrawerOpen={setIsDrawerOpen}
        setIsModalOpen={setIsModalOpen}
        selectedAttendees={selectedAttendees}
      />
      <AddFirstTimerDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        handleDrawerSubmit={handleDrawerSubmit}
        drawerForm={drawerForm}
      />
    </>
  );
};

export default AddEventAttendanceRecord;
