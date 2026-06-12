import { useState, useEffect } from 'react'

const KEY = 'stockmovement-records'

export default function StockMovementPage() {
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({movement_id: '', tenant_id: '', movement_type: '', sku_id: '', lot_serial_id: ''})
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem(KEY) || '[]'))
  }, [])

  function persist(next) {
    setItems(next)
    localStorage.setItem(KEY, JSON.stringify(next))
  }

  function save() {
    if (editing) {
      persist(items.map(i => i.id === editing ? { ...form, id: editing } : i))
    } else {
      persist([...items, { ...form, id: Date.now().toString(36) }])
    }
    setShowForm(false); setEditing(null); setForm({movement_id: '', tenant_id: '', movement_type: '', sku_id: '', lot_serial_id: ''})
  }

  function remove(id) {
    if (!confirm('Delete this record?')) return
    persist(items.filter(i => i.id !== id))
  }

  function edit(item) {
    setForm({ ...item }); setEditing(item.id); setShowForm(true)
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">StockMovement</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage StockMovement records</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({movement_id: '', tenant_id: '', movement_type: '', sku_id: '', lot_serial_id: ''}) }} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          + Add StockMovement
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md max-h-[85vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{editing ? 'Edit' : 'New'} StockMovement</h2>
            <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">movement_id</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.movement_id || ''} onChange={e => setForm(p => ({...p, movement_id: e.target.value}))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">tenant_id</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.tenant_id || ''} onChange={e => setForm(p => ({...p, tenant_id: e.target.value}))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">movement_type</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.movement_type || ''} onChange={e => setForm(p => ({...p, movement_type: e.target.value}))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">sku_id</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.sku_id || ''} onChange={e => setForm(p => ({...p, sku_id: e.target.value}))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">lot_serial_id</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.lot_serial_id || ''} onChange={e => setForm(p => ({...p, lot_serial_id: e.target.value}))} />
            </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Save</button>
              <button onClick={() => { setShowForm(false); setEditing(null) }} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-400 text-sm">No StockMovement records yet.</p>
          <button onClick={() => setShowForm(true)} className="mt-3 text-blue-600 text-sm font-medium hover:underline">Add the first one</button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto">
          <table className="w-full min-w-[480px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">movement_id</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">tenant_id</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">movement_type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">sku_id</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">lot_serial_id</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.movement_id ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.tenant_id ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.movement_type ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.sku_id ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.lot_serial_id ?? '')}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => edit(item)} className="text-blue-600 hover:text-blue-800 text-xs font-medium mr-3">Edit</button>
                    <button onClick={() => remove(item.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}