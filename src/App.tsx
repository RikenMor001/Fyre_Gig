import Dashboard from "./components/Dashboard"
import { mockAccounts, mockQuickActions, mockTransactions, mockUser } from "./data/mockData"

function App(){
  return(
    <Dashboard
    user = {mockUser}
    accounts = {mockAccounts}
    transactions = {mockTransactions}
    quickActions = {mockQuickActions}
    />
  )
}

export default App
