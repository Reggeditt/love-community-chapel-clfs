'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  db, membersCollection, visitorsCollection, childrenCollection, staffCollection, youthCollection, menCollection, womenCollection, 
  eventsCollection, eventCategoriesCollection, groupsCollection, groupCategoriesCollection, financialCollection, attendanceCollection, assetsCollection, communicationsCollection, usersCollection 
} from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { message } from 'antd';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [allIndividuals, setAllIndividuals] = useState([])
  const [members, setMembers] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [staff, setStaff] = useState([]);
  const [youth, setYouth] = useState([]);
  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupCategories, setGroupCategories] = useState([]);
  const [financial, setFinancial] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [assets, setAssets] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [users, setUsers] = useState([]);
  // const [children, setChildren] = useState([]);

  const fetchData = (collectionRef, setState) => {
    onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setState(data);
    });
  };

  useEffect(() => {
    fetchData(groupsCollection, setGroups);
    fetchData(groupCategoriesCollection, setGroupCategories);
    fetchData(eventsCollection, setEvents);
    fetchData(eventCategoriesCollection, setEventCategories);
    fetchData(attendanceCollection, setAttendance);
    fetchData(membersCollection, setMembers);
    fetchData(visitorsCollection, setVisitors);
    // fetchData(childrenCollection, setChildren);
    // fetchData(staffCollection, setStaff);
    // fetchData(youthCollection, setYouth);
    // fetchData(menCollection, setMen);
    // fetchData(womenCollection, setWomen);
    // fetchData(financialCollection, setFinancial);
    // fetchData(assetsCollection, setAssets);
    // fetchData(communicationsCollection, setCommunications);
    // fetchData(usersCollection, setUsers);
  }, []);
  
  const formatAllIndividuals = () => {
    const allIndividualsData = [
      ...members?.map(member => ({ value: member.id, name: `${member.firstName} ${member.lastName}`, label: `${member.firstName} ${member.lastName}`, status: 'Member' })),
      ...visitors?.map(visitor => ({ value: visitor.id, name: `${visitor.firstName} ${visitor.lastName}`, label: `${visitor.firstName} ${visitor.lastName}`, status: 'Visitor' })),
    ]
    setAllIndividuals(allIndividualsData)
  }

  const addDocument = async (collectionReference, data) => {
    const collectionRef = collection(db, collectionReference)
    const doc = await addDoc(collectionRef, data)
    console.log('add document fired', doc.id);
    message.success('Document successfully written!');
  };

  const updateDocument = async (collectionRef, id, data) => {
    const docRef = doc(db, collectionRef, id);
    await updateDoc(docRef, data);
  };

  const deleteDocument = async (collectionRef, id) => {
    const docRef = doc(db, collectionRef, id);
    await deleteDoc(docRef);
  };

  return (
    <StoreContext.Provider value={{
      allIndividuals, members, visitors, staff, youth, men, women, events, eventCategories, groups, groupCategories, financial, attendance, assets, communications, users,
      addDocument, updateDocument, deleteDocument,
      formatAllIndividuals
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
