import React from 'react'
import AddFirstTimerDrawer from './[...eventId]/AddFirstTimerDrawer';
import AddAttendeesModal from './[...eventId]/AddAttendeesModal';
import { useData } from '../dataFactory';

const AddEventAttendanceRecord = ({ setIsModalOpen, form, attendeeOptions, isDrawerOpen, setIsDrawerOpen, drawerForm }) => {
  const { setAttendanceDatabase } = useData();

  // Handle opening the modal to add attendees
  const handleAddAttendees = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
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
    console.log(values)
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
      <AddAttendeesModal isModalOpen handleModalCancel handleModalSubmit form attendeeOptions setIsDrawerOpen setIsModalOpen />
      <AddFirstTimerDrawer isDrawerOpen setIsDrawerOpen handleDrawerSubmit drawerForm />
    </>
  )
}

export default AddEventAttendanceRecord
