
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { name: "Jan", value: 10000 },
  { name: "Feb", value: 10500 },
  { name: "Mar", value: 10200 },
  { name: "Apr", value: 10800 },
  { name: "May", value: 11200 },
  { name: "Jun", value: 11000 },
  { name: "Jul", value: 11500 },
  { name: "Aug", value: 12000 },
  { name: "Sep", value: 11800 },
  { name: "Oct", value: 12200 },
  { name: "Nov", value: 12100 },
  { name: "Dec", value: 12234 },
];

const chartConfig = {
  value: {
    label: "Portfolio Value",
    color: "hsl(var(--primary))",
  },
};

export function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
        <CardDescription>Your trading performance over the last 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              fillOpacity={0.6}
              fill="var(--color-value)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
