'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  db, membersCollection, visitorsCollection, childrenCollection, staffCollection, youthCollection, menCollection, womenCollection,
  eventsCollection, eventCategoriesCollection, groupsCollection, groupCategoriesCollection, financialCollection, attendanceCollection, assetsCollection, communicationsCollection, usersCollection,
  auth
} from '../../lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { message } from 'antd';
import { useAuth } from './authContext';
import { onAuthStateChanged } from 'firebase/auth';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const { user } = useAuth();
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
  const [currentUser, setCurrentUser] = useState(null);

  // const [children, setChildren] = useState([]);
  const fetchData = (collectionRef, setState) => {
    onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setState(data);
    });
  };

  const findUser = (email, uid) => {
    const data = users.find(userData => (userData?.email === email && userData?.uid === uid))
    if (data) {
      setCurrentUser(data)
    }
    console.log('current user is ', data)
    return data
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        findUser(currentUser.email, currentUser.uid)
      } else {
        setCurrentUser(null);
      }
    });
    !groups.length && fetchData(groupsCollection, setGroups);
    !groupCategories.length && fetchData(groupCategoriesCollection, setGroupCategories);
    !events.length && fetchData(eventsCollection, setEvents);
    !eventCategories.length && fetchData(eventCategoriesCollection, setEventCategories);
    !attendance.length && fetchData(attendanceCollection, setAttendance);
    !members.length && fetchData(membersCollection, setMembers);
    !visitors.length && fetchData(visitorsCollection, setVisitors);
    // fetchData(childrenCollection, setChildren);
    // fetchData(staffCollection, setStaff);
    // fetchData(youthCollection, setYouth);
    // fetchData(menCollection, setMen);
    // fetchData(womenCollection, setWomen);
    // fetchData(financialCollection, setFinancial);
    // fetchData(assetsCollection, setAssets);
    // fetchData(communicationsCollection, setCommunications);
    !users.length && fetchData(usersCollection, setUsers);
    formatAllIndividuals()
  }, [members, visitors, user]);
  
  const formatAllIndividuals = () => {
    const allIndividualsData = [
      ...members?.map(member => ({ value: member.id, name: `${member.firstName} ${member.lastName}`, label: `${member.firstName} ${member.lastName}`, status: 'Member' })),
      ...visitors?.map(visitor => ({ value: visitor.id, name: `${visitor.firstName} ${visitor.lastName}`, label: `${visitor.firstName} ${visitor.lastName}`, status: 'Visitor' })),
    ]
    setAllIndividuals(allIndividualsData)
    return allIndividualsData
  }
  
  const addDocument = async (collectionReference, data) => {
    const collectionRef = collection(db, collectionReference)
    const doc = await addDoc(collectionRef, data)
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
      allIndividuals, members, visitors, staff, youth, men, women, events, eventCategories, groups, groupCategories, financial, attendance, assets, communications, users, currentUser,
      addDocument, updateDocument, deleteDocument, formatAllIndividuals
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
