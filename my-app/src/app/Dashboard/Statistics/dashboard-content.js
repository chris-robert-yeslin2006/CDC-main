"use client"

import { useState } from "react"
import {
  BarChartIcon,
  Building2,
  ChevronDown,
  Users,
} from "lucide-react"
import { Button } from "src/app/Dashboard/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Dashboard/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Dashboard/components/ui/select"

import { StudentLanguageChart } from "./student-language-chart"
import { LanguagePassChart } from "./language-pass-chart"
import { DynamicBarChart } from "./dynamic-bar-chart"
import { RecentActivity } from "./recent-activity"


import "./StatisticsSection.css"

export default function DashboardContent() {
  const [selectedOrg, setSelectedOrg] = useState("All Organizations")

  return (
    <>
        <div className="content-area">
          <header className="dashboard-header">
            <div className="header-title">
              <h1>Dashboard</h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="org-selector">
                  {selectedOrg}
                  <ChevronDown className="dropdown-icon" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Organizations</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedOrg("All Organizations")}>
                  All Organizations
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedOrg("University A")}>University A</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedOrg("College B")}>College B</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedOrg("Institute C")}>Institute C</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="dashboard-main">
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="card-header">
                  <h3 className="card-title">Total Students</h3>
                  <Users className="card-icon" />
                </div>
                <div className="card-content">
                  <div className="metric-value">12,345</div>
                  <p className="metric-change">+15% from last month</p>
                </div>
              </div>
              <div className="metric-card">
                <div className="card-header">
                  <h3 className="card-title">Organizations</h3>
                  <Building2 className="card-icon" />
                </div>
                <div className="card-content">
                  <div className="metric-value">24</div>
                  <p className="metric-change">+2 new this month</p>
                </div>
              </div>
              <div className="metric-card">
                <div className="card-header">
                  <h3 className="card-title">Average Pass Rate</h3>
                  <BarChartIcon className="card-icon" />
                </div>
                <div className="card-content">
                  <div className="metric-value">78.5%</div>
                  <p className="metric-change">+2.5% from last semester</p>
                </div>
              </div>
            </div>
            <div className="charts-grid">
              <div className="chart-card language-chart">
                <div className="card-header">
                  <h3 className="card-title">Students by Language</h3>
                  <p className="card-description">Distribution of students across 6 programming languages</p>
                </div>
                <div className="card-content">
                  <StudentLanguageChart />
                </div>
              </div>
              <div className="chart-card activity-card">
                <div className="card-header">
                  <h3 className="card-title">Recent Activity</h3>
                  <p className="card-description">Latest actions across the platform</p>
                </div>
                <div className="card-content">
                  <RecentActivity />
                </div>
              </div>
            </div>
            <div className="charts-grid">
              <div className="chart-card dynamic-chart">
                <div className="card-header">
                  <h3 className="card-title">Dynamic Metrics</h3>
                  <p className="card-description">Customize the chart axes to view different metrics</p>
                </div>
                <div className="card-content">
                  <DynamicBarChart />
                </div>
              </div>
              <div className="chart-card pass-chart">
                <div className="card-header">
                  <h3 className="card-title">Pass Percentage by Language</h3>
                  <p className="card-description">Success rates across programming languages</p>
                  <div className="org-select-container">
                    <Select defaultValue="all">
                      <SelectTrigger className="org-select">
                        <SelectValue placeholder="Select organization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Organizations</SelectItem>
                        <SelectItem value="university-a">University A</SelectItem>
                        <SelectItem value="college-b">College B</SelectItem>
                        <SelectItem value="institute-c">Institute C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="card-content">
                  <LanguagePassChart />
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
  )
}
