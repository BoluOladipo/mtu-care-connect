## Implement Realistic Hospital Lab Workflow

Transform the Laboratory module from a 3-stage flow (pending → in_progress → completed) into the full clinical pipeline you described:

**New status pipeline**
`requested` → `sample_collected` → `in_progress` → `awaiting_validation` → `completed` (with `critical` flagging at any point)

---

### 1. Database changes (migration)

Extend `lab_requests` with:
- `accession_number` (text, unique, auto-generated like `LAB-2026-000123`)
- `category` (text: hematology, microbiology, biochemistry, urinalysis, serology, other)
- `sample_collected_at` (timestamptz), `sample_collected_by` (uuid)
- `reference_range` (text), `unit` (text)
- `is_abnormal` (boolean), `is_critical` (boolean)
- `validated_by` (uuid), `validated_at` (timestamptz)
- `technician_notes` (text), `report_signed_by` (uuid)
- Expand `status` allowed values via a CHECK relaxation (text column already)

Sequence + trigger to auto-fill `accession_number` on insert.
Trigger to notify the requesting doctor when status moves to `completed` or `is_critical = true`.

### 2. Hook updates (`src/hooks/useLabRequests.ts`)

Add mutations:
- `useCollectSample` — sets status `sample_collected`, stamps collector/time
- `useStartLabRequest` — already exists, keep
- `useSubmitForValidation` — saves draft results, status `awaiting_validation`
- `useValidateAndComplete` — pathologist sign-off, status `completed`, sets validated_by/at
- `useFlagCritical` — marks `is_critical`

### 3. Laboratory page (`src/pages/Laboratory.tsx`)

Replace the 2-tab layout with a 5-tab pipeline view:
1. **Requisitions** (newly requested, awaiting sample)
2. **Sample Collection** (collect & accession)
3. **In Process** (testing on bench)
4. **Validation Queue** (awaiting sign-off)
5. **Reports** (completed, downloadable)

Each row shows: accession number, patient, category, test, priority, sample time, status badge. Critical results get a red pulsing badge.

New dialogs:
- **Collect Sample**: confirm collector, timestamp
- **Enter Results**: result value, unit, reference range, abnormal/critical checkboxes, technician notes
- **Validate Report**: review screen with Approve / Request Repeat buttons

Stats row updates to show the 5 stages + critical count.

### 4. Report download

Add a simple printable PDF view (`window.print` of a formatted result card with patient info, accession #, results table, reference ranges, signatures) — no new dependency.

---

### Technical details

- Migration adds columns with safe defaults so existing rows stay valid (`status='pending'` rows surface in the new "Requisitions" tab).
- Accession sequence: `CREATE SEQUENCE lab_accession_seq` + trigger formatting `'LAB-' || extract(year from now()) || '-' || lpad(nextval(...)::text, 6, '0')`.
- All new columns covered by existing RLS policies on `lab_requests` (no policy changes needed since policies are role-based, not column-based).
- Doctor-facing consultation flow already creates `lab_requests` with `status='pending'` — keep backwards compatible by treating `pending` as `requested` in the UI.
- No new packages; uses existing shadcn dialog/tabs/table.
