'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, membersCollection, visitorsCollection, childrenCollection, staffCollection, youthCollection, menCollection, womenCollection, eventsCollection, eventCategoriesCollection, groupsCollection, financialCollection, attendanceCollection, assetsCollection, communicationsCollection, usersCollection, groupCategoriesCollection } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [children, setChildren] = useState([]);
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

  const fetchData = (collectionRef, setState) => {
    onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setState(data);
    });
  };

  const formatAllIndividuals = () => {}
  useEffect(() => {
    fetchData(groupsCollection, setGroups);
    fetchData(groupCategoriesCollection, setGroupCategories);
    // fetchData(membersCollection, setMembers);
    // fetchData(visitorsCollection, setVisitors);
    // fetchData(childrenCollection, setChildren);
    // fetchData(staffCollection, setStaff);
    // fetchData(youthCollection, setYouth);
    // fetchData(menCollection, setMen);
    // fetchData(womenCollection, setWomen);
    // fetchData(eventsCollection, setEvents);
    // fetchData(eventCategoriesCollection, setEventCategories);
    // fetchData(financialCollection, setFinancial);
    // fetchData(attendanceCollection, setAttendance);
    // fetchData(assetsCollection, setAssets);
    // fetchData(communicationsCollection, setCommunications);
    // fetchData(usersCollection, setUsers);
  }, []);

  const addDocument = async (collectionRef, data) => {
    await addDoc(collectionRef, data);
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
      members, visitors, children, staff, youth, men, women, events, eventCategories, groups, financial, attendance, assets, communications, users,
      addDocument, updateDocument, deleteDocument
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
