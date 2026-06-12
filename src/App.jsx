import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import DashboardPage from './pages/Dashboard.jsx'
import InvoicesPage from './pages/Invoices.jsx'
import EarningsPage from './pages/Earnings.jsx'
import TimeEntriesPage from './pages/TimeEntries.jsx'
import ERPSyncLogPage from './pages/ERPSyncLog.jsx'
import ShipmentPage from './pages/Shipment.jsx'
import OrderPage from './pages/Order.jsx'
import StockMovementPage from './pages/StockMovement.jsx'
import InventoryPage from './pages/Inventory.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/earnings" element={<EarningsPage />} />
          <Route path="/timeentries" element={<TimeEntriesPage />} />
          <Route path="/erpsynclog" element={<ERPSyncLogPage />} />
          <Route path="/shipment" element={<ShipmentPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/stockmovement" element={<StockMovementPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}