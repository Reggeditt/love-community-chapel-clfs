'use client'
import { createContext, useContext, useState } from "react"

const dataFactory = createContext()

const DataProvider = ({children}) => {
  const [membersDatabase, setMembersDatabase] = useState([
    { id: 'm1', lastName: 'Doe', occupation: 'artisan', dob: '1994-01-01', firstName: 'John', email: 'john@example.com', residentialArea: 'patasi', address: 'AK-052-223232', age: 30, contact: '+233222222222' },
    { id: 'm2', lastName: 'Smith', occupation: 'artisan', dob: '1994-01-01', firstName: 'Jane', email: 'jane@example.com', residentialArea: 'patasi', address: 'AK-052-223232', age: 30, contact: '+233222222222' },
  ])
  const [visitorsDatabase, setVisitorsDatabase] = useState([
    { id: 'v1', lastName: 'Visitor', occupation: 'artisan', firstName: 'One', residentialArea: 'patasi', age: 27, contact: '++233222222222' },
    { id: 'v2', lastName: 'Visitor', occupation: 'artisan', firstName: 'Two', residentialArea: 'patasi', age: 30, contact: '+233111111111' },
  ])
  const [childrensDatabase, setChildrensDatabase] = useState([
    { id: 'c1', lastName: 'Child', occupation: 'student', dob: '2013-01-01', firstName: 'One', age: 10 },
    { id: 'c2', lastName: 'Child', occupation: 'student', dob: '2015-01-01', firstName: 'Two', age: 8 },
  ])
  const [staffDatabase, setStaffDatabase] = useState([
    { id: 's1', lastName: 'Staff', occupation: 'Manager', dob: '1980-01-01', firstName: 'One', position: 'Manager' },
    { id: 's2', lastName: 'Staff', occupation: 'Assistant', dob: '1985-01-01', firstName: 'Two', position: 'Assistant' },
  ])
  const [youthsDatabase, setYouthsDatabase] = useState([
    { id: 'y1', lastName: 'Youth', occupation: 'student', dob: '2005-01-01', firstName: 'One', age: 18 },
    { id: 'y2', lastName: 'Youth', occupation: 'student', dob: '2003-01-01', firstName: 'Two', age: 20 },
  ])
  const [eventsDatabase, setEventsDatabase] = useState([
    { id: 'e1', name: 'Event 1', date: '2023-10-01', categoryID: 'ec1' },
    { id: 'e2', name: 'Event 2', date: '2023-10-05', categoryID: 'ec2' },
    { id: 'e3', name: 'Event 3', date: '2023-10-10', categoryID: 'ec3' },
  ])
  const [eventCategoriesDatabase, setEventCategoriesDatabase] = useState([
    { id: 'ec1', name: 'Category A', description: 'A category called A' },
    { id: 'ec2', name: 'Category B', description: 'A category called B' },
    { id: 'ec3', name: 'Category C', description: 'A category called C' },
  ])
  const [groupsDatabase, setGroupsDatabase] = useState([
    { id: 'g1', name: 'Group One', members: ['m1', 'm2'] },
    { id: 'g2', name: 'Group Two', members: ['m2', 'm3'] },
  ])
  const [financialDatabase, setFinancialDatabase] = useState([
    { id: 'f1', amount: 1000, date: '2023-01-01' },
    { id: 'f2', amount: 2000, date: '2023-02-01' },
  ])
  const [attendanceDatabase, setAttendanceDatabase] = useState([
    { id: 'a1', eventID: 'e1', attendees: ['m1', 'm2'] },
    { id: 'a2', eventID: 'e2', attendees: ['m2', 'v2'] },
  ])
  const [assetsDatabase, setAssetsDatabase] = useState([
    { id: 'as1', name: 'Asset One', value: 1000 },
    { id: 'as2', name: 'Asset Two', value: 2000 },
  ])
  const [communicationsDatabase, setCommunicationsDatabase] = useState([
    { id: 'c1', type: 'Email', content: 'Welcome to our community!' },
    { id: 'c2', type: 'SMS', content: 'Event reminder!' },
  ])
  const [usersDatabase, setUsersDatabase] = useState([
    { id: 'u1', username: 'user1', password: 'pass1' },
    { id: 'u2', username: 'user2', password: 'pass2' },
  ])
  const [menDatabase, setMenDatabase] = useState([
    { id: 'mn1', name: 'Man One', age: 30 },
    { id: 'mn2', name: 'Man Two', age: 35 },
  ])
  const [womenDatabase, setWomenDatabase] = useState([
    { id: 'w1', name: 'Woman One', age: 28 },
    { id: 'w2', name: 'Woman Two', age: 32 },
  ])
  
  return (
    <dataFactory.Provider value={{
      membersDatabase, setMembersDatabase,
      visitorsDatabase, setVisitorsDatabase,
      childrensDatabase, setChildrensDatabase,
      staffDatabase, setStaffDatabase,
      youthsDatabase, setYouthsDatabase,
      eventsDatabase, setEventsDatabase,
      groupsDatabase, setGroupsDatabase,
      financialDatabase, setFinancialDatabase,
      attendanceDatabase, setAttendanceDatabase,
      assetsDatabase, setAssetsDatabase,
      communicationsDatabase, setCommunicationsDatabase,
      usersDatabase, setUsersDatabase,
      eventCategoriesDatabase, setEventCategoriesDatabase,
      menDatabase, setMenDatabase,
      womenDatabase, setWomenDatabase
    }}>
      {children}
    </dataFactory.Provider>
  )
}

export const useData = () => useContext(dataFactory)

export default DataProvider


