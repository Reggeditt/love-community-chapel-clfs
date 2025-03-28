'use client'

import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/contexts/storeContext"
import { Users, FileText, AlertTriangle, MessageSquare } from "lucide-react"

export default function Page() {
  const { members, visitors, users } = useStore()
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stat Cards */}
        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-cyan-100 rounded-md flex items-center justify-center mb-3">
            <Users className="h-8 w-8 text-cyan-500" />
          </div>
          <div className="text-4xl font-bold">{members?.length ?? 0}</div>
          <div className="text-gray-500">Members</div>
        </Card>

        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-orange-50 rounded-md flex items-center justify-center mb-3">
            <FileText className="h-8 w-8 text-orange-400" />
          </div>
          <div className="text-4xl font-bold">{visitors?.length ?? 0}</div>
          <div className="text-gray-500">Visitors</div>
        </Card>

        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-amber-50 rounded-md flex items-center justify-center mb-3">
            <AlertTriangle className="h-8 w-8 text-amber-400" />
          </div>
          <div className="text-4xl font-bold">0</div>
          <div className="text-gray-500">Birthdays</div>
        </Card>

        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-green-50 rounded-md flex items-center justify-center mb-3">
            <MessageSquare className="h-8 w-8 text-green-400" />
          </div>
          <div className="text-4xl font-bold">12</div>
          <div className="text-gray-500">Events</div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="flex justify-center">
            <DynamicDonutChart
              data={[
                { label: "Admin", value: 2, color: "#4fd1c5" },
                { label: "Data Entry", value: 2, color: "#ed64a6" },
                // { label: "Management", value: 0, color: "#a0aec0" },
                // { label: "Family Member", value: 10, color: "#b7791f" },
                // { label: "Volunteer Member", value: 15, color: "#d6bcfa" },
              ]}
              total={users?.length}
              centerLabel="Users"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <div className="flex justify-center">
            <DynamicDonutChart
              data={[
                { label: "Income", value: 60, color: "#90cdf4" },
                // { label: "Net Profit", value: 30, color: "#68d391" },
                { label: "Expense", value: 40, color: "#fbb6ce" },
              ]}
              total={100}
              centerLabel="Payment"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

function DynamicDonutChart({ data, total, centerLabel }) {
  const circumference = 251.2
  let offset = 0

  return (
    <div className="relative w-48 h-48">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="20" />
        {data.map((segment, index) => {
          const dashArray = (segment.value / total) * circumference
          const dashOffset = circumference - offset - dashArray
          offset += dashArray
          console.log(segment)
          return (
            <circle
              key={index+1}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={segment.color}
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform={`rotate(${index * 30 - 90} 50 50)`}
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold">{total}</div>
        <div className="text-gray-500">{centerLabel}</div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-6 w-full">
        {data.map((segment, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: segment.color }}></div>
            <span className="text-sm text-gray-600">{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

