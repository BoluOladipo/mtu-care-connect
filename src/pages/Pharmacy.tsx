import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Plus,
  Package,
  AlertTriangle,
  Clock,
  TrendingDown,
  Filter,
  Download,
  Pill,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Drug {
  id: string;
  name: string;
  genericName: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  unitPrice: number;
  expiryDate: string;
  batchNumber: string;
  supplier: string;
}

const mockDrugs: Drug[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    genericName: "Acetaminophen",
    category: "Analgesics",
    currentStock: 12,
    minimumStock: 50,
    unitPrice: 50,
    expiryDate: "2025-06-15",
    batchNumber: "B2024-001",
    supplier: "PharmaCare Ltd",
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    genericName: "Amoxicillin",
    category: "Antibiotics",
    currentStock: 25,
    minimumStock: 30,
    unitPrice: 150,
    expiryDate: "2024-02-20",
    batchNumber: "B2024-002",
    supplier: "MediSupply Co",
  },
  {
    id: "3",
    name: "Ibuprofen 400mg",
    genericName: "Ibuprofen",
    category: "NSAIDs",
    currentStock: 180,
    minimumStock: 40,
    unitPrice: 75,
    expiryDate: "2025-12-01",
    batchNumber: "B2024-003",
    supplier: "PharmaCare Ltd",
  },
  {
    id: "4",
    name: "Metformin 500mg",
    genericName: "Metformin HCL",
    category: "Antidiabetics",
    currentStock: 95,
    minimumStock: 30,
    unitPrice: 120,
    expiryDate: "2025-09-30",
    batchNumber: "B2024-004",
    supplier: "DiabCare Pharma",
  },
  {
    id: "5",
    name: "Vitamin C 1000mg",
    genericName: "Ascorbic Acid",
    category: "Vitamins",
    currentStock: 0,
    minimumStock: 100,
    unitPrice: 45,
    expiryDate: "2025-03-15",
    batchNumber: "B2024-005",
    supplier: "VitaHealth",
  },
  {
    id: "6",
    name: "Omeprazole 20mg",
    genericName: "Omeprazole",
    category: "Gastrointestinal",
    currentStock: 67,
    minimumStock: 25,
    unitPrice: 200,
    expiryDate: "2025-08-20",
    batchNumber: "B2024-006",
    supplier: "MediSupply Co",
  },
  {
    id: "7",
    name: "Cetirizine 10mg",
    genericName: "Cetirizine HCL",
    category: "Antihistamines",
    currentStock: 45,
    minimumStock: 40,
    unitPrice: 80,
    expiryDate: "2025-11-10",
    batchNumber: "B2024-007",
    supplier: "PharmaCare Ltd",
  },
  {
    id: "8",
    name: "Diclofenac 50mg",
    genericName: "Diclofenac Sodium",
    category: "NSAIDs",
    currentStock: 88,
    minimumStock: 35,
    unitPrice: 90,
    expiryDate: "2025-07-25",
    batchNumber: "B2024-008",
    supplier: "MediSupply Co",
  },
];

const Pharmacy = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDrugs = mockDrugs.filter(
    (drug) =>
      drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drug.genericName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockDrugs = mockDrugs.filter((d) => d.currentStock <= d.minimumStock);
  const outOfStockDrugs = mockDrugs.filter((d) => d.currentStock === 0);
  const expiringDrugs = mockDrugs.filter((d) => {
    const expiryDate = new Date(d.expiryDate);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expiryDate <= thirtyDaysFromNow;
  });

  const getStockStatus = (current: number, minimum: number) => {
    if (current === 0) return { label: "Out of Stock", color: "bg-destructive text-destructive-foreground" };
    if (current <= minimum) return { label: "Low Stock", color: "bg-warning text-warning-foreground" };
    return { label: "In Stock", color: "bg-success/20 text-success" };
  };

  const getStockPercentage = (current: number, minimum: number) => {
    const target = minimum * 2;
    return Math.min((current / target) * 100, 100);
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expiry <= thirtyDaysFromNow;
  };

  return (
    <AppLayout title="Pharmacy" subtitle="Drug inventory and dispensing management">
      <div className="space-y-6">
        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockDrugs.length}</p>
                <p className="text-sm text-muted-foreground">Total Drugs</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-warning/30 bg-warning/5">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning text-warning-foreground">
                <TrendingDown className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{lowStockDrugs.length}</p>
                <p className="text-sm text-muted-foreground">Low Stock</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive text-destructive-foreground">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{outOfStockDrugs.length}</p>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-info/30 bg-info/5">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info text-info-foreground">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{expiringDrugs.length}</p>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="inventory" className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="inventory" className="gap-2">
                <Package className="h-4 w-4" />
                Inventory
              </TabsTrigger>
              <TabsTrigger value="dispense" className="gap-2">
                <Pill className="h-4 w-4" />
                Dispense
              </TabsTrigger>
              <TabsTrigger value="alerts" className="gap-2">
                <AlertTriangle className="h-4 w-4" />
                Alerts
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search drugs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Drug
              </Button>
            </div>
          </div>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Drug Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Drug Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Stock Level</TableHead>
                        <TableHead>Batch</TableHead>
                        <TableHead>Expiry</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDrugs.map((drug) => {
                        const stockStatus = getStockStatus(drug.currentStock, drug.minimumStock);
                        const stockPercentage = getStockPercentage(drug.currentStock, drug.minimumStock);

                        return (
                          <TableRow key={drug.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell>
                              <div>
                                <p className="font-medium">{drug.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {drug.genericName}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{drug.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="w-32 space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{drug.currentStock}</span>
                                  <span className="text-muted-foreground">
                                    / {drug.minimumStock * 2}
                                  </span>
                                </div>
                                <Progress
                                  value={stockPercentage}
                                  className={cn(
                                    "h-2",
                                    drug.currentStock === 0 && "[&>div]:bg-destructive",
                                    drug.currentStock <= drug.minimumStock && drug.currentStock > 0 && "[&>div]:bg-warning"
                                  )}
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              {drug.batchNumber}
                            </TableCell>
                            <TableCell>
                              <span
                                className={cn(
                                  "text-sm",
                                  isExpiringSoon(drug.expiryDate) && "text-destructive font-medium"
                                )}
                              >
                                {new Date(drug.expiryDate).toLocaleDateString()}
                                {isExpiringSoon(drug.expiryDate) && (
                                  <Badge variant="destructive" className="ml-2 text-xs">
                                    Expiring
                                  </Badge>
                                )}
                              </span>
                            </TableCell>
                            <TableCell>₦{drug.unitPrice.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge className={stockStatus.color}>{stockStatus.label}</Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dispense">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Pill className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">
                  Drug Dispensing
                </p>
                <p className="text-muted-foreground text-center max-w-md">
                  Scan prescription or enter patient ID to dispense drugs. All dispensing
                  activities are logged automatically.
                </p>
                <Button className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Start Dispensing
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <div className="space-y-4">
              {lowStockDrugs.map((drug) => (
                <Card key={drug.id} className="border-l-4 border-l-warning">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/20">
                        <TrendingDown className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-medium">{drug.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Only {drug.currentStock} units remaining (min: {drug.minimumStock})
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Reorder
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {expiringDrugs.map((drug) => (
                <Card key={drug.id} className="border-l-4 border-l-destructive">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/20">
                        <Clock className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <p className="font-medium">{drug.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Batch {drug.batchNumber} expires on{" "}
                          {new Date(drug.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="destructive" size="sm">
                      Flag for Review
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Pharmacy;
