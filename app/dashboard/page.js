'use client'

import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/contexts/authContext"
import { useStore } from "@/lib/contexts/storeContext"
import { Users, FileText, AlertTriangle, MessageSquare } from "lucide-react"

export default function Page() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stat Cards */}
        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-cyan-100 rounded-md flex items-center justify-center mb-3">
            <Users className="h-8 w-8 text-cyan-500" />
          </div>
          <div className="text-4xl font-bold">9</div>
          <div className="text-gray-500">Member</div>
        </Card>

        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-orange-50 rounded-md flex items-center justify-center mb-3">
            <FileText className="h-8 w-8 text-orange-400" />
          </div>
          <div className="text-4xl font-bold">3</div>
          <div className="text-gray-500">Accountant</div>
        </Card>

        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-amber-50 rounded-md flex items-center justify-center mb-3">
            <AlertTriangle className="h-8 w-8 text-amber-400" />
          </div>
          <div className="text-4xl font-bold">5</div>
          <div className="text-gray-500">Notice</div>
        </Card>

        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-green-50 rounded-md flex items-center justify-center mb-3">
            <MessageSquare className="h-8 w-8 text-green-400" />
          </div>
          <div className="text-4xl font-bold">4</div>
          <div className="text-gray-500">Message</div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="flex justify-center">
            <UserDonutChart />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-teal-400 rounded"></div>
              <span className="text-sm text-gray-600">Members</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pink-400 rounded"></div>
              <span className="text-sm text-gray-600">Accountant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span className="text-sm text-gray-600">Management</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-700 rounded"></div>
              <span className="text-sm text-gray-600">Family Member</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-300 rounded"></div>
              <span className="text-sm text-gray-600">Volunteer Member</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <div className="flex justify-center">
            <PaymentDonutChart />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center">
                <div className="w-4 h-4 bg-blue-300 rounded"></div>
                <span className="text-sm text-gray-600">Income</span>
              </div>
              <div className="text-xl font-bold">$ 35542</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center">
                <div className="w-4 h-4 bg-pink-200 rounded"></div>
                <span className="text-sm text-gray-600">Expense</span>
              </div>
              <div className="text-xl font-bold">$ 15732</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center">
                <div className="w-4 h-4 bg-green-400 rounded"></div>
                <span className="text-sm text-gray-600">Net Profit</span>
              </div>
              <div className="text-xl font-bold">$ 19810</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function UserDonutChart() {
  return (
    <div className="relative w-48 h-48">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="20" />
        {/* Teal segment - Members */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#4fd1c5"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="188.4"
          transform="rotate(-90 50 50)"
        />
        {/* Pink segment - Accountant */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#ed64a6"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="213.52"
          transform="rotate(0 50 50)"
        />
        {/* Gray segment - Management */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#a0aec0"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="225.6"
          transform="rotate(30 50 50)"
        />
        {/* Brown segment - Family Member */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#b7791f"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="188.4"
          transform="rotate(60 50 50)"
        />
        {/* Purple segment - Volunteer Member */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#d6bcfa"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="225.6"
          transform="rotate(150 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold">21</div>
        <div className="text-gray-500">Users</div>
      </div>
    </div>
  )
}

function PaymentDonutChart() {
  return (
    <div className="relative w-48 h-48">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="20" />
        {/* Blue segment - Income */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#90cdf4"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="125.6"
          transform="rotate(-90 50 50)"
        />
        {/* Green segment - Net Profit */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#68d391"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="188.4"
          transform="rotate(30 50 50)"
        />
        {/* Pink segment - Expense */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#fbb6ce"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="213.52"
          transform="rotate(150 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold">$ 19810</div>
        <div className="text-gray-500">Payment</div>
      </div>
    </div>
  )
}

