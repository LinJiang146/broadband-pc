import Vue from 'vue'
import VueRouter from 'vue-router'



import Index from '../views/Index.vue'
import Commission from '../components/main/Commission.vue'
import ExceptionData from '../components/main/ExceptionData.vue'
import Map from '../components/main/Map.vue'
import RunData from '../components/main/RunData.vue'
import Sign from '../components/main/Sign.vue'
import CusData from '../components/main/CusData.vue'
import Welcome from '../components/main/Welcome.vue'
import ComponentIndex from '../components/main/Index.vue'
import CommissionEstimates from '../components/main/CommissionEstimates.vue'
import WalletManagement from '../components/main/WalletManagement.vue'
import OperationalOverview from '../components/main/OperationalOverview.vue'
import MissionLobby from '../components/main/MissionLobby.vue'
import UserData from '../components/main/UserData.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/welcome',

  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children:[
      {
        name: 'Commission',
        path: 'Commission',
        component: Commission
      },
      {
        name: 'exceptionData',
        path: 'exceptionData',
        component: ExceptionData
      },
      {
        name: 'map',
        path: 'map',
        component: Map
      },
      {
        name: 'runData',
        path: 'runData',
        component: RunData
      },
      {
        name: 'userData',
        path: 'userData',
        component: UserData
      },
      {
        name: 'cusData',
        path: 'cusData',
        component: CusData
      },
      {
        name: 'componentIndex',
        path: 'componentIndex',
        component: ComponentIndex
      },
      {
        name: 'commissionEstimates',
        path: 'commissionEstimates',
        component: CommissionEstimates
      },
      {
        name: 'walletManagement',
        path: 'walletManagement',
        component: WalletManagement
      },
      {
        name: 'operationalOverview',
        path: 'operationalOverview',
        component: OperationalOverview
      },
      {
        name: 'missionLobby',
        path: 'missionLobby',
        component: MissionLobby
      },
    ]
  },
  {
    name: 'sign',
    path: '/sign',
    component: Sign
  },
  {
    name: 'welcome',
    path: '/welcome',
    component: Welcome
  }
]

const router = new VueRouter({
  routes
})

export default router
