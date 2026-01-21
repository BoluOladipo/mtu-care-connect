import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Users,
  Pill,
  Syringe,
  FileDown,
  Calendar,
  Activity,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const visitData = [
  { month: "Jan", visits: 420 },
  { month: "Feb", visits: 380 },
  { month: "Mar", visits: 510 },
  { month: "Apr", visits: 450 },
  { month: "May", visits: 390 },
  { month: "Jun", visits: 480 },
];

const diagnosisData = [
  { name: "Malaria", count: 145, color: "hsl(var(--primary))" },
  { name: "Typhoid", count: 89, color: "hsl(var(--info))" },
  { name: "Respiratory", count: 76, color: "hsl(var(--success))" },
  { name: "Gastritis", count: 54, color: "hsl(var(--warning))" },
  { name: "Others", count: 120, color: "hsl(var(--muted-foreground))" },
];

const drugUsageData = [
  { drug: "Paracetamol", usage: 850 },
  { drug: "Amoxicillin", usage: 620 },
  { drug: "Artemether", usage: 480 },
  { drug: "Omeprazole", usage: 390 },
  { drug: "Metronidazole", usage: 320 },
];

const weeklyTrendData = [
  { day: "Mon", patients: 45 },
  { day: "Tue", patients: 52 },
  { day: "Wed", patients: 48 },
  { day: "Thu", patients: 61 },
  { day: "Fri", patients: 55 },
];

const chartConfig = {
  visits: { label: "Visits", color: "hsl(var(--primary))" },
  patients: { label: "Patients", color: "hsl(var(--primary))" },
  usage: { label: "Usage", color: "hsl(var(--primary))" },
};

const Reports = () => {
  return (
    <AppLayout title="Reports & Analytics" subtitle="View clinic performance metrics and trends">
      <div className="space-y-6">
        {/* Report Controls */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <Select defaultValue="this-month">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="this-quarter">This Quarter</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="general">General Medicine</SelectItem>
                    <SelectItem value="laboratory">Laboratory</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
                <Button variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Export Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Visits</p>
                  <p className="text-2xl font-bold">2,630</p>
                  <p className="text-xs text-success">+12% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-info/10">
                  <Activity className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Daily Visits</p>
                  <p className="text-2xl font-bold">87</p>
                  <p className="text-xs text-muted-foreground">Based on 30 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                  <Syringe className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vaccinations</p>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-success">+8% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                  <Pill className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Drugs Dispensed</p>
                  <p className="text-2xl font-bold">3,420</p>
                  <p className="text-xs text-muted-foreground">Units this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Monthly Visits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monthly Visit Trends
              </CardTitle>
              <CardDescription>Patient visits over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={visitData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Common Diagnoses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Common Diagnoses
              </CardTitle>
              <CardDescription>Top diagnoses this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {diagnosisData.map((item) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">{item.name}</div>
                    <div className="flex-1">
                      <div className="h-3 rounded-full bg-muted">
                        <div
                          className="h-3 rounded-full"
                          style={{
                            width: `${(item.count / 145) * 100}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm font-medium">{item.count}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Weekly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Patient Flow
              </CardTitle>
              <CardDescription>Patients per day this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Drug Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Top Drug Usage
              </CardTitle>
              <CardDescription>Most dispensed medications</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={drugUsageData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="drug" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="usage" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Reports</CardTitle>
            <CardDescription>Generate common reports with one click</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                <Users className="h-6 w-6" />
                <span>Daily Summary</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                <Pill className="h-6 w-6" />
                <span>Inventory Report</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                <Syringe className="h-6 w-6" />
                <span>Vaccination Stats</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                <Activity className="h-6 w-6" />
                <span>Staff Performance</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Reports;
