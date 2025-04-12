"use client"

import { Clock } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/Dashboard/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    action: "enrolled in Python Advanced Course",
    time: "2 minutes ago",
  },
  {
    id: 2,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    action: "completed JavaScript Fundamentals",
    time: "15 minutes ago",
  },
  {
    id: 3,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    action: "joined University A organization",
    time: "45 minutes ago",
  },
  {
    id: 4,
    user: {
      name: "Emily Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EW",
    },
    action: "achieved 95% in Java Assessment",
    time: "1 hour ago",
  },
  {
    id: 5,
    user: {
      name: "Robert Taylor",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RT",
    },
    action: "registered for C++ Workshop",
    time: "2 hours ago",
  },
]

export function RecentActivity() {
  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <Avatar className="activity-avatar">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="activity-content">
            <p className="activity-text">
              <span className="activity-user">{activity.user.name}</span> {activity.action}
            </p>
            <div className="activity-time">
              <Clock className="time-icon" />
              {activity.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
