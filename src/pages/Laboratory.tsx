import { useState, useMemo, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search, FlaskConical, Clock, CheckCircle, FileText, Printer,
  Loader2, TestTube, ClipboardCheck, AlertTriangle, ShieldCheck,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  useLabRequests, useCollectSample, useStartLabRequest,
  useSubmitForValidation, useValidateAndComplete, useRequestRepeat,
  LabRequestWithPatient,
} from "@/hooks/useLabRequests";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending:              { label: "Requisitioned",       color: "bg-muted text-foreground",           icon: ClipboardCheck },
  requested:            { label: "Requisitioned",       color: "bg-muted text-foreground",           icon: ClipboardCheck },
  sample_collected:     { label: "Sample Collected",    color: "bg-warning/20 text-warning",         icon: TestTube },
  in_progress:          { label: "Testing",             color: "bg-info/20 text-info",               icon: FlaskConical },
  awaiting_validation:  { label: "Awaiting Validation", color: "bg-accent/30 text-accent-foreground", icon: ShieldCheck },
  completed:            { label: "Reported",            color: "bg-success/20 text-success",         icon: CheckCircle },
};

const initials = (a?: string, b?: string) =>
  `${a?.[0] ?? "?"}${b?.[0] ?? ""}`.toUpperCase();

const Laboratory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  const { data: labRequests = [], isLoading } = useLabRequests(searchQuery);
  const collect = useCollectSample();
  const start = useStartLabRequest();
  const submit = useSubmitForValidation();
  const validate = useValidateAndComplete();
  const repeat = useRequestRepeat();

  const [selected, setSelected] = useState<LabRequestWithPatient | null>(null);
  const [collectOpen, setCollectOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [validateOpen, setValidateOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: { results: "", unit: "", reference_range: "", technician_notes: "", is_abnormal: false, is_critical: false },
  });

  const buckets = useMemo(() => ({
    requisitions:  labRequests.filter(r => r.status === "pending" || r.status === "requested"),
    collection:    labRequests.filter(r => r.status === "sample_collected"),
    testing:       labRequests.filter(r => r.status === "in_progress"),
    validation:    labRequests.filter(r => r.status === "awaiting_validation"),
    reports:       labRequests.filter(r => r.status === "completed"),
    critical:      labRequests.filter(r => r.is_critical && r.status !== "completed"),
  }), [labRequests]);

  const openCollect   = (r: LabRequestWithPatient) => { setSelected(r); setCollectOpen(true); };
  const openResults   = (r: LabRequestWithPatient) => {
    setSelected(r);
    reset({
      results: r.results ?? "",
      unit: r.unit ?? "",
      reference_range: r.reference_range ?? "",
      technician_notes: r.technician_notes ?? "",
      is_abnormal: r.is_abnormal ?? false,
      is_critical: r.is_critical ?? false,
    });
    setResultsOpen(true);
  };
  const openValidate  = (r: LabRequestWithPatient) => { setSelected(r); setValidateOpen(true); };
  const openReport    = (r: LabRequestWithPatient) => { setSelected(r); setReportOpen(true); };

  const submitResults = handleSubmit(async (data) => {
    if (!selected || !user?.id) return;
    await submit.mutateAsync({
      id: selected.id,
      results: data.results,
      unit: data.unit,
      reference_range: data.reference_range,
      technician_notes: data.technician_notes,
      is_abnormal: data.is_abnormal,
      is_critical: data.is_critical,
      completedBy: user.id,
    });
    setResultsOpen(false);
    setSelected(null);
  });

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = () => {
    if (!printRef.current) return;
    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) return;
    w.document.write(`<html><head><title>Lab Report</title>
      <style>body{font-family:system-ui,sans-serif;padding:32px;color:#111}
      h1{margin:0 0 4px;font-size:22px}h2{font-size:14px;color:#555;margin:0 0 16px}
      table{width:100%;border-collapse:collapse;margin:16px 0}
      th,td{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}
      th{background:#f5f5f5}.crit{color:#b91c1c;font-weight:700}
      .meta{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;margin:16px 0;font-size:13px}
      .sig{margin-top:48px;border-top:1px solid #999;padding-top:8px;width:280px}</style>
      </head><body>${printRef.current.innerHTML}</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const renderRow = (r: LabRequestWithPatient, actions: React.ReactNode) => {
    const s = statusConfig[r.status] ?? statusConfig.pending;
    const SIcon = s.icon;
    return (
      <TableRow key={r.id} className="hover:bg-muted/40">
        <TableCell className="font-mono text-xs">{r.accession_number ?? "—"}</TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {initials(r.patients.first_name, r.patients.last_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium leading-tight">{r.patients.first_name} {r.patients.last_name}</p>
              <p className="text-xs text-muted-foreground">{r.patients.student_id}</p>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <p className="font-medium">{r.test_type}</p>
          {r.category && <p className="text-xs text-muted-foreground capitalize">{r.category}</p>}
        </TableCell>
        <TableCell>
          <Badge variant={r.priority === "urgent" ? "destructive" : "secondary"}>{r.priority}</Badge>
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-1">
            <Badge className={`${s.color} flex w-fit items-center gap-1`}>
              <SIcon className="h-3 w-3" /> {s.label}
            </Badge>
            {r.is_critical && (
              <Badge variant="destructive" className="w-fit gap-1 animate-pulse">
                <AlertTriangle className="h-3 w-3" /> Critical
              </Badge>
            )}
          </div>
        </TableCell>
        <TableCell className="text-right">{actions}</TableCell>
      </TableRow>
    );
  };

  const TableShell = ({ rows, empty }: { rows: React.ReactNode; empty: string }) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Accession #</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Test</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{rows}</TableBody>
      </Table>
      {Array.isArray(rows) && rows.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
          <FlaskConical className="h-10 w-10 mb-2 opacity-40" />
          <p className="text-sm">{empty}</p>
        </div>
      )}
    </div>
  );

  return (
    <AppLayout title="Laboratory" subtitle="Full hospital lab workflow — requisition to report">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {[
            { label: "Requisitions",  count: buckets.requisitions.length, icon: ClipboardCheck, tone: "bg-muted text-foreground" },
            { label: "Collection",    count: buckets.collection.length,   icon: TestTube,       tone: "bg-warning text-warning-foreground" },
            { label: "Testing",       count: buckets.testing.length,      icon: FlaskConical,   tone: "bg-info text-info-foreground" },
            { label: "Validation",    count: buckets.validation.length,   icon: ShieldCheck,    tone: "bg-accent text-accent-foreground" },
            { label: "Reports",       count: buckets.reports.length,      icon: CheckCircle,    tone: "bg-success text-success-foreground" },
            { label: "Critical",      count: buckets.critical.length,     icon: AlertTriangle,  tone: "bg-destructive text-destructive-foreground" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.tone}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold leading-none">{s.count}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="requisitions" className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="flex-wrap h-auto">
              <TabsTrigger value="requisitions">Requisitions</TabsTrigger>
              <TabsTrigger value="collection">Sample Collection</TabsTrigger>
              <TabsTrigger value="testing">In Process</TabsTrigger>
              <TabsTrigger value="validation">Validation</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search patient, test, accession #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 sm:w-72"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
          ) : (
            <>
              <TabsContent value="requisitions">
                <Card><CardHeader><CardTitle>1. Test Requisitions — awaiting sample collection</CardTitle></CardHeader><CardContent>
                  <TableShell empty="No new requisitions" rows={buckets.requisitions.map(r => renderRow(r,
                    <Button size="sm" onClick={() => openCollect(r)} disabled={collect.isPending}>
                      <TestTube className="h-3 w-3 mr-1" /> Collect Sample
                    </Button>
                  ))} />
                </CardContent></Card>
              </TabsContent>

              <TabsContent value="collection">
                <Card><CardHeader><CardTitle>2. Accessioned samples — ready for analysis</CardTitle></CardHeader><CardContent>
                  <TableShell empty="No samples awaiting analysis" rows={buckets.collection.map(r => renderRow(r,
                    <Button size="sm" onClick={() => start.mutateAsync(r.id)} disabled={start.isPending}>
                      <FlaskConical className="h-3 w-3 mr-1" /> Begin Testing
                    </Button>
                  ))} />
                </CardContent></Card>
              </TabsContent>

              <TabsContent value="testing">
                <Card><CardHeader><CardTitle>3. Bench testing in progress</CardTitle></CardHeader><CardContent>
                  <TableShell empty="No tests on the bench" rows={buckets.testing.map(r => renderRow(r,
                    <Button size="sm" onClick={() => openResults(r)}>
                      Enter Results
                    </Button>
                  ))} />
                </CardContent></Card>
              </TabsContent>

              <TabsContent value="validation">
                <Card><CardHeader><CardTitle>4. Pending pathologist validation</CardTitle></CardHeader><CardContent>
                  <TableShell empty="Nothing waiting for sign-off" rows={buckets.validation.map(r => renderRow(r,
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" onClick={() => repeat.mutateAsync(r.id)} disabled={repeat.isPending}>
                        Repeat
                      </Button>
                      <Button size="sm" onClick={() => openValidate(r)}>
                        <ShieldCheck className="h-3 w-3 mr-1" /> Validate
                      </Button>
                    </div>
                  ))} />
                </CardContent></Card>
              </TabsContent>

              <TabsContent value="reports">
                <Card><CardHeader><CardTitle>5. Released reports</CardTitle></CardHeader><CardContent>
                  <TableShell empty="No completed reports yet" rows={buckets.reports.map(r => renderRow(r,
                    <Button size="sm" variant="outline" onClick={() => openReport(r)}>
                      <FileText className="h-3 w-3 mr-1" /> View Report
                    </Button>
                  ))} />
                </CardContent></Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>

      {/* Collect sample */}
      <Dialog open={collectOpen} onOpenChange={setCollectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Collect Sample</DialogTitle>
            <DialogDescription>
              Confirm sample collection. An accession number is already assigned for chain-of-custody tracking.
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-2 rounded-lg bg-muted/50 p-4">
              <p className="font-medium">{selected.patients.first_name} {selected.patients.last_name}</p>
              <p className="text-sm text-muted-foreground">Test: <span className="font-medium text-foreground">{selected.test_type}</span></p>
              <p className="text-sm text-muted-foreground">Accession #: <span className="font-mono text-foreground">{selected.accession_number}</span></p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCollectOpen(false)}>Cancel</Button>
            <Button
              onClick={async () => {
                if (!selected || !user?.id) return;
                await collect.mutateAsync({ id: selected.id, collectedBy: user.id });
                setCollectOpen(false);
              }}
              disabled={collect.isPending}
            >
              {collect.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Confirm Collection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enter results */}
      <Dialog open={resultsOpen} onOpenChange={setResultsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Enter Test Results</DialogTitle>
            <DialogDescription>Results will be submitted for pathologist validation.</DialogDescription>
          </DialogHeader>
          {selected && (
            <form onSubmit={submitResults} className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-3 text-sm">
                <p className="font-medium">{selected.patients.first_name} {selected.patients.last_name}</p>
                <p className="text-muted-foreground">{selected.test_type} · <span className="font-mono">{selected.accession_number}</span></p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="results">Result *</Label>
                  <Textarea id="results" rows={3} {...register("results", { required: true })} placeholder="e.g. Hb 11.2, WBC 8.4..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input id="unit" {...register("unit")} placeholder="g/dL, mmol/L..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference_range">Reference Range</Label>
                  <Input id="reference_range" {...register("reference_range")} placeholder="12.0 – 16.0" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="technician_notes">Technician Notes</Label>
                  <Textarea id="technician_notes" rows={2} {...register("technician_notes")} />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="ab" checked={watch("is_abnormal")} onCheckedChange={(v) => setValue("is_abnormal", !!v)} />
                  <Label htmlFor="ab" className="cursor-pointer">Abnormal</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="cr" checked={watch("is_critical")} onCheckedChange={(v) => setValue("is_critical", !!v)} />
                  <Label htmlFor="cr" className="cursor-pointer text-destructive">Critical value</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setResultsOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={submit.isPending}>
                  {submit.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Submit for Validation
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Validate */}
      <Dialog open={validateOpen} onOpenChange={setValidateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Validate Report</DialogTitle>
            <DialogDescription>Review the technician's entry before releasing to the requesting clinician.</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="font-medium">{selected.patients.first_name} {selected.patients.last_name}</p>
                <p className="text-muted-foreground">{selected.test_type} · <span className="font-mono">{selected.accession_number}</span></p>
              </div>
              <div className="rounded-lg border p-3 space-y-1">
                <p><span className="text-muted-foreground">Result:</span> <span className="font-medium">{selected.results}</span> {selected.unit}</p>
                {selected.reference_range && <p><span className="text-muted-foreground">Ref. range:</span> {selected.reference_range}</p>}
                {selected.technician_notes && <p><span className="text-muted-foreground">Notes:</span> {selected.technician_notes}</p>}
                <div className="flex gap-2 pt-1">
                  {selected.is_abnormal && <Badge variant="secondary">Abnormal</Badge>}
                  {selected.is_critical && <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" /> Critical</Badge>}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={async () => { if (selected) { await repeat.mutateAsync(selected.id); setValidateOpen(false); } }}>
              Request Repeat
            </Button>
            <Button
              onClick={async () => {
                if (!selected || !user?.id) return;
                await validate.mutateAsync({ id: selected.id, validatedBy: user.id });
                setValidateOpen(false);
              }}
              disabled={validate.isPending}
            >
              {validate.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Approve & Release
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report */}
      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Laboratory Report</DialogTitle>
          </DialogHeader>
          {selected && (
            <>
              <div ref={printRef}>
                <h1>MTU Clinic — Laboratory Report</h1>
                <h2>Accession #: {selected.accession_number}</h2>
                <div className="meta" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px", fontSize: 13, marginTop: 12 }}>
                  <div><strong>Patient:</strong> {selected.patients.first_name} {selected.patients.last_name}</div>
                  <div><strong>Matric:</strong> {selected.patients.student_id}</div>
                  <div><strong>Requested:</strong> {new Date(selected.requested_at).toLocaleString()}</div>
                  <div><strong>Reported:</strong> {selected.completed_at ? new Date(selected.completed_at).toLocaleString() : "—"}</div>
                  <div><strong>Priority:</strong> {selected.priority}</div>
                  <div><strong>Category:</strong> {selected.category ?? "—"}</div>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
                  <thead><tr>
                    <th style={{ border: "1px solid #ddd", padding: 8, background: "#f5f5f5", textAlign: "left" }}>Test</th>
                    <th style={{ border: "1px solid #ddd", padding: 8, background: "#f5f5f5", textAlign: "left" }}>Result</th>
                    <th style={{ border: "1px solid #ddd", padding: 8, background: "#f5f5f5", textAlign: "left" }}>Unit</th>
                    <th style={{ border: "1px solid #ddd", padding: 8, background: "#f5f5f5", textAlign: "left" }}>Reference Range</th>
                    <th style={{ border: "1px solid #ddd", padding: 8, background: "#f5f5f5", textAlign: "left" }}>Flag</th>
                  </tr></thead>
                  <tbody><tr>
                    <td style={{ border: "1px solid #ddd", padding: 8 }}>{selected.test_type}</td>
                    <td style={{ border: "1px solid #ddd", padding: 8 }} className={selected.is_critical ? "crit" : ""}>{selected.results}</td>
                    <td style={{ border: "1px solid #ddd", padding: 8 }}>{selected.unit ?? "—"}</td>
                    <td style={{ border: "1px solid #ddd", padding: 8 }}>{selected.reference_range ?? "—"}</td>
                    <td style={{ border: "1px solid #ddd", padding: 8 }}>
                      {selected.is_critical ? "CRITICAL" : selected.is_abnormal ? "Abnormal" : "Normal"}
                    </td>
                  </tr></tbody>
                </table>
                {selected.technician_notes && (
                  <p style={{ marginTop: 12, fontSize: 13 }}><strong>Notes:</strong> {selected.technician_notes}</p>
                )}
                <div className="sig" style={{ marginTop: 48, borderTop: "1px solid #999", paddingTop: 8, width: 280, fontSize: 13 }}>
                  Validated & signed electronically<br />
                  {selected.validated_at ? new Date(selected.validated_at).toLocaleString() : ""}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setReportOpen(false)}>Close</Button>
                <Button onClick={handlePrint}><Printer className="h-4 w-4 mr-2" /> Print / Save PDF</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Laboratory;
