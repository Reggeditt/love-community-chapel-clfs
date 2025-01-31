'use client'
import { createContext, useContext, useState } from "react"

const dataFactory = createContext()

const DataProvider = ({children}) => {
  const [membersDatabase, setMembersDatabase] = useState([])
  const [visitorsDatabase, setVisitorsDatabase] = useState([])
  const [childrensDatabase, setChildrensDatabase] = useState([])
  const [staffDatabase, setStaffDatabase] = useState([])
  const [youthsDatabase, setYouthsDatabase] = useState([])
  const [eventsDatabase, setEventsDatabase] = useState([])
  const [groupsDatabase, setGroupsDatabase] = useState([])
  const [financialDatabase, setFinancialDatabase] = useState([])
  const [attendanceDatabase, setAttendanceDatabase] = useState([])
  const [assetsDatabase, setAssetsDatabase] = useState([])
  const [communicationsDatabase, setCommunicationsDatabase] = useState([])
  const [usersDatabase, setUsersDatabase] = useState([])

  return (
    <dataFactory.Provider value={{
      membersDatabase, setMembersDatabase
      ,visitorsDatabase, setVisitorsDatabase
      ,childrensDatabase, setChildrensDatabase
      ,staffDatabase, setStaffDatabase
      ,youthsDatabase, setYouthsDatabase
      ,eventsDatabase, setEventsDatabase
      ,groupsDatabase, setGroupsDatabase
      ,financialDatabase, setFinancialDatabase
      ,attendanceDatabase, setAttendanceDatabase
      ,assetsDatabase, setAssetsDatabase
      ,communicationsDatabase, setCommunicationsDatabase,
      usersDatabase, setUsersDatabase
      }}>
      {children}
    </dataFactory.Provider>
  )
}

export const useData = () => useContext(dataFactory)

export default DataProvider


