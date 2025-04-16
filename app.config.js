export const Appconfig = {
  routes: {
    index: '/',
    login: '/login',
    dashboard: {
      index: '/dashboard',
      attendance: {
        index: '/dashboard/attendance',
        record: '/dashboard/attendance/'
      },
      members:{
        index: '/dashboard/members',
        new: '/dashboard/members/new'
      },
      visitors: {
        index: 'dashboard/visitors',
        new: 'dashboard/visitors/new'
      }
      
    }
  },
  constants: {
    appName: 'Maura'
  },
  literals: {}
}