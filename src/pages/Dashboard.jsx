import { Link } from 'react-router-dom'

const LINKS = [
  { path: '/invoices', label: 'Invoices', icon: '📦' },
  { path: '/earnings', label: 'Earnings', icon: '🛒' },
  { path: '/timeentries', label: 'Time Entries', icon: '👥' },
  { path: '/erpsynclog', label: 'ERPSyncLog', icon: '⚙️' },
  { path: '/shipment', label: 'Shipment', icon: '📋' },
  { path: '/order', label: 'Order', icon: '🔧' },
  { path: '/stockmovement', label: 'StockMovement', icon: '📈' },
  { path: '/inventory', label: 'Inventory', icon: '🏷️' },
]

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 max-w-5xl">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-6">Welcome to Sara WMS </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {LINKS.map(l => (
          <Link to={l.path} key={l.path} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-sm font-medium text-gray-700">
            <span className="text-2xl">{l.icon}</span>
            <span className="flex-1">{l.label}</span>
            <span className="text-gray-400">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}