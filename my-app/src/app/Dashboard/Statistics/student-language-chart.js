"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Dashboard/components/ui/chart"

const data = [
  { name: "JavaScript", value: 4500, color: "hsl(var(--chart-1))" },
  { name: "Python", value: 3800, color: "hsl(var(--chart-2))" },
  { name: "Java", value: 2500, color: "hsl(var(--chart-3))" },
  { name: "C++", value: 1500, color: "hsl(var(--chart-4))" },
  { name: "Ruby", value: 1200, color: "hsl(var(--chart-5))" },
  { name: "Go", value: 850, color: "hsl(var(--chart-6))" },
]

export function StudentLanguageChart() {
  return (
    <ChartContainer
      config={{
        javascript: { label: "JavaScript", color: "hsl(var(--chart-1))" },
        python: { label: "Python", color: "hsl(var(--chart-2))" },
        java: { label: "Java", color: "hsl(var(--chart-3))" },
        cpp: { label: "C++", color: "hsl(var(--chart-4))" },
        ruby: { label: "Ruby", color: "hsl(var(--chart-5))" },
        go: { label: "Go", color: "hsl(var(--chart-6))" },
      }}
      className="chart-container"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
