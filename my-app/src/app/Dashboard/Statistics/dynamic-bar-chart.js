"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart"
import { Input } from "/src/app/Dashboard/components/ui/input"
import { Label } from "@/Dashboard/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Dashboard/components/ui/select"

const initialData = [
  { name: "Jan", students: 400, courses: 24, completion: 65 },
  { name: "Feb", students: 300, courses: 28, completion: 59 },
  { name: "Mar", students: 200, courses: 26, completion: 80 },
  { name: "Apr", students: 278, courses: 26, completion: 81 },
  { name: "May", students: 189, courses: 20, completion: 56 },
  { name: "Jun", students: 239, courses: 27, completion: 67 },
  { name: "Jul", students: 349, courses: 30, completion: 60 },
  { name: "Aug", students: 430, courses: 25, completion: 78 },
  { name: "Sep", students: 360, courses: 31, completion: 90 },
  { name: "Oct", students: 380, courses: 40, completion: 85 },
  { name: "Nov", students: 410, courses: 35, completion: 87 },
  { name: "Dec", students: 490, courses: 30, completion: 69 },
]

const metrics = [
  { value: "students", label: "Students" },
  { value: "courses", label: "Courses" },
  { value: "completion", label: "Completion Rate (%)" },
]

export function DynamicBarChart() {
  const [xAxis, setXAxis] = useState("name")
  const [yAxis, setYAxis] = useState("students")
  const [chartTitle, setChartTitle] = useState("Students by Month")

  return (
    <div className="dynamic-chart-container">
      <div className="chart-controls">
        <div className="control-group">
          <Label htmlFor="x-axis">X-Axis</Label>
          <Select defaultValue="name" onValueChange={(value) => setXAxis(value)}>
            <SelectTrigger id="x-axis">
              <SelectValue placeholder="Select X-Axis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="control-group">
          <Label htmlFor="y-axis">Y-Axis</Label>
          <Select defaultValue="students" onValueChange={(value) => setYAxis(value)}>
            <SelectTrigger id="y-axis">
              <SelectValue placeholder="Select Y-Axis" />
            </SelectTrigger>
            <SelectContent>
              {metrics.map((metric) => (
                <SelectItem key={metric.value} value={metric.value}>
                  {metric.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="control-group">
          <Label htmlFor="chart-title">Chart Title</Label>
          <Input
            id="chart-title"
            value={chartTitle}
            onChange={(e) => setChartTitle(e.target.value)}
            placeholder="Enter chart title"
          />
        </div>
      </div>
      <div className="chart-wrapper">
        <ChartContainer
          config={{
            [yAxis]: {
              label: metrics.find((m) => m.value === yAxis)?.label || yAxis,
              color: "hsl(var(--chart-1))",
            },
          }}
          title={chartTitle}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={initialData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey={yAxis} fill="var(--color-students)" radius={[4, 4, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
