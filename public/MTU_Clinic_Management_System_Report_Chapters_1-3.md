# MTU CLINIC MANAGEMENT SYSTEM
## A Web-Based Healthcare Information Management System for University Clinics

### Project Report — Chapters 1–3

---

# CHAPTER ONE: INTRODUCTION

## 1.1 Background of the Study

University health clinics play a critical role in providing accessible healthcare services to the student population. However, many university health centres in Nigeria and across developing nations still rely on manual, paper-based systems for patient registration, appointment scheduling, medical record-keeping, and pharmacy operations. These traditional methods are prone to errors, delays, data loss, and inefficiencies that compromise the quality of healthcare delivery.

The Mountain Top University (MTU) Clinic, like many similar institutional health facilities, faces challenges in managing the growing volume of student patients, coordinating duty rosters for medical staff, tracking drug inventory, and maintaining comprehensive medical records. The absence of an integrated digital platform results in fragmented workflows, long waiting times, and difficulty retrieving historical patient data when needed for follow-up care.

The advancement of web technologies and cloud computing presents an opportunity to digitise and streamline clinic operations. A web-based Clinic Management System (CMS) can centralise all clinical processes—from patient registration and appointment booking to consultations, prescriptions, laboratory requests, and immunisation records—into a single, accessible platform.

## 1.2 Statement of the Problem

The current healthcare administration processes at MTU Clinic are characterised by the following challenges:

1. **Inefficient Patient Registration:** Students must physically visit the clinic to register, leading to long queues and administrative bottlenecks during peak periods such as the beginning of academic sessions.

2. **Lack of Online Appointment Scheduling:** There is no system for students to book appointments in advance. Students must walk in and wait, often for extended periods, without visibility into doctor availability or estimated wait times.

3. **Manual Record-Keeping:** Patient medical histories, consultation notes, prescriptions, and laboratory results are maintained in physical files, making retrieval slow and error-prone. Critical information may be lost or misfiled.

4. **Poor Drug Inventory Management:** Pharmacy operations lack automated tracking of drug stock levels, expiry dates, and dispensation records, leading to stockouts of essential medications and wastage of expired drugs.

5. **No Centralised Communication:** There is no mechanism for automated notifications to staff about new appointments, low stock alerts, or missed patient appointments.

6. **Absence of Role-Based Access Control:** Without a digital system, there is no granular control over who can access specific types of medical data, posing potential privacy and security concerns.

## 1.3 Aim and Objectives

### Aim
To design and develop a comprehensive web-based Clinic Management System for Mountain Top University that digitises and streamlines all clinical operations, improves patient experience, and enhances healthcare delivery efficiency.

### Objectives
The specific objectives of this project are to:

1. Develop a secure authentication and role-based access control system that supports multiple user roles (Admin, Doctor, Nurse, Pharmacist, Lab Technician, Receptionist, and Student).

2. Implement a patient registration module that allows students to self-register through a dedicated Student Portal and enables staff to manage patient records.

3. Create an online appointment scheduling system that displays available doctors based on their duty roster and allows students to book, view, and cancel appointments.

4. Build a real-time queue management system to track patient flow through the clinic—from check-in to consultation, laboratory, pharmacy, and discharge.

5. Develop a consultation module for doctors to record clinical findings, diagnoses, prescriptions, and laboratory requests.

6. Implement a pharmacy management module for tracking drug inventory, processing prescriptions, and generating alerts for low stock and expiring medications.

7. Design a laboratory request and results module for managing test orders and recording results.

8. Create an immunisation tracking module for recording vaccine administration and scheduling follow-up doses.

9. Develop a comprehensive reporting and analytics dashboard for clinic administrators.

10. Implement an automated system for managing missed appointments, including auto-cancellation and staff notifications.

## 1.4 Significance of the Study

This project is significant in several ways:

- **For Students:** It provides a convenient, self-service portal for patient registration and appointment booking, reducing wait times and improving the overall healthcare experience.

- **For Medical Staff:** It streamlines clinical workflows, provides quick access to patient histories, and automates routine administrative tasks such as notification delivery and appointment management.

- **For Clinic Administrators:** It offers real-time dashboards with key performance indicators, inventory alerts, and operational analytics to support data-driven decision-making.

- **For the Institution:** It modernises healthcare delivery infrastructure, demonstrating the university's commitment to leveraging technology for improved student welfare.

- **For Academia:** It contributes to the body of knowledge on the application of modern web technologies (React, TypeScript, cloud databases, serverless functions) in healthcare information systems within educational institutions.

## 1.5 Scope of the Study

The system covers the following functional areas:

- User authentication and authorisation with role-based access control
- Student self-registration and patient record management
- Doctor duty roster management by administrators
- Online appointment booking with real-time availability checking
- Automated missed appointment detection and cancellation
- Real-time clinic queue management
- Clinical consultation and medical record-keeping
- Prescription and pharmacy inventory management
- Laboratory test request and results management
- Immunisation record-keeping
- Medical fitness examination tracking
- Staff notifications and alerts
- Administrative reporting and analytics
- System configuration and settings management

The system is designed specifically for the MTU Clinic environment but can be adapted for similar institutional healthcare facilities.

## 1.6 Limitations of the Study

- The system requires internet connectivity for access, which may be intermittent in some campus locations.
- Integration with external health information systems (e.g., national health databases) is beyond the current scope.
- The system does not include telemedicine or video consultation features.
- SMS-based notifications to students' mobile phones are not implemented in this version.
- The system is optimised for web browsers and does not include a native mobile application.

## 1.7 Definition of Terms

- **CMS:** Clinic Management System
- **RLS:** Row-Level Security — a database feature that restricts data access at the row level based on user identity and role.
- **RBAC:** Role-Based Access Control — a method of regulating access to resources based on the roles of individual users.
- **SPA:** Single Page Application — a web application that loads a single HTML page and dynamically updates content.
- **API:** Application Programming Interface — a set of protocols for building and integrating application software.
- **CRUD:** Create, Read, Update, Delete — the four basic operations of persistent storage.
- **Edge Function:** A serverless function that runs close to the user at the network edge, used for backend logic.

---

# CHAPTER TWO: LITERATURE REVIEW

## 2.1 Introduction

This chapter reviews existing literature on healthcare information systems, clinic management software, and the technologies employed in building modern web-based healthcare applications. It examines related works, identifies gaps in current solutions, and establishes the theoretical framework underpinning this project.

## 2.2 Overview of Healthcare Information Systems

Healthcare Information Systems (HIS) encompass a broad range of technologies designed to manage healthcare data and support clinical decision-making. According to Haux (2006), the evolution of HIS has progressed from paper-based record systems through standalone departmental software to integrated, enterprise-wide digital platforms.

The World Health Organisation (WHO) identifies key components of effective HIS as: data collection, data management, data analysis, and information dissemination (WHO, 2008). Modern HIS leverage web technologies to provide these capabilities through browser-based interfaces accessible from any device with internet connectivity.

## 2.3 Clinic Management Systems in Educational Institutions

University health clinics present unique requirements compared to general healthcare facilities. Ajayi and Oluwafemi (2019) noted that student clinics must handle periodic surges in patient volume (e.g., during registration periods), maintain records linked to student identifiers, and provide services within limited budgets and staffing.

Several studies have explored the digitisation of university clinic operations:

- **Adebayo et al. (2020)** developed a web-based clinic management system for a Nigerian university using PHP and MySQL. While functional, the system lacked real-time features, role-based security at the database level, and a student self-service portal.

- **Okonkwo and Eze (2018)** proposed a cloud-based health record system for tertiary institutions, highlighting the benefits of cloud hosting for scalability and data redundancy. However, their implementation did not include appointment scheduling or queue management.

- **Sharma and Gupta (2021)** implemented a React-based hospital management system with role-based access control, demonstrating the effectiveness of modern JavaScript frameworks for building responsive healthcare interfaces.

## 2.4 Appointment Scheduling Systems

Automated appointment scheduling is a critical component of modern healthcare delivery. Gupta and Denton (2008) provided a comprehensive review of appointment scheduling research, identifying key considerations including: slot duration optimisation, overbooking policies, no-show prediction, and patient preferences.

In the context of this project, the scheduling system addresses:

- **Doctor availability management** through a configurable duty roster
- **Real-time slot availability** based on existing bookings
- **Automated missed appointment handling** using scheduled serverless functions
- **Student self-service booking** through a dedicated portal

## 2.5 Role-Based Access Control in Healthcare Systems

Role-Based Access Control (RBAC) is particularly important in healthcare settings due to the sensitivity of medical data. Ferraiolo et al. (2001) established the foundational NIST model for RBAC, defining roles as a means of simplifying access management in complex organisations.

In healthcare, RBAC must account for:

- **Clinical roles** with varying levels of data access (doctors may view and edit consultations; nurses may record vitals but not prescribe medications)
- **Administrative roles** with system configuration capabilities
- **Patient/Student roles** with limited self-service access
- **Data isolation** ensuring patients can only view their own records

This project implements RBAC using database-level Row-Level Security (RLS) policies combined with a dedicated `user_roles` table and security-definer functions, ensuring access control is enforced at the data layer rather than solely in application code.

## 2.6 Modern Web Application Architecture

The architecture of contemporary web applications has evolved significantly with the adoption of component-based frameworks and cloud-native backend services.

### 2.6.1 Frontend Technologies

**React.js**, developed by Facebook (Meta), is a declarative, component-based JavaScript library for building user interfaces (Gackenheimer, 2015). Combined with **TypeScript** for static type checking and **Tailwind CSS** for utility-first styling, React enables the development of maintainable, responsive, and type-safe user interfaces.

### 2.6.2 Backend-as-a-Service (BaaS)

Backend-as-a-Service platforms like **Supabase** provide managed databases (PostgreSQL), authentication, real-time subscriptions, file storage, and serverless edge functions without requiring developers to manage server infrastructure (Supabase Documentation, 2024). This approach significantly reduces development time and operational complexity.

### 2.6.3 Serverless Functions

Serverless computing, or Function-as-a-Service (FaaS), allows developers to deploy individual functions that execute in response to events or HTTP requests. In this project, serverless edge functions are used for background tasks such as automatically detecting and flagging missed appointments.

## 2.7 Review of Related Systems

| System | Technology | Strengths | Limitations |
|--------|-----------|-----------|-------------|
| OpenMRS | Java, MySQL | Open-source, extensible, widely adopted | Complex setup, not optimised for small clinics |
| GNUHealth | Python, PostgreSQL | Comprehensive, WHO-compliant | Steep learning curve, desktop-oriented |
| Cliniko | Proprietary SaaS | User-friendly, cloud-based | Subscription cost, no self-hosting, generic |
| MTU CMS (This Project) | React, TypeScript, Supabase | University-specific, student portal, RBAC, real-time | Requires internet, no mobile app |

## 2.8 Gaps Identified in Existing Literature

Based on the literature reviewed, the following gaps were identified:

1. Most existing systems are designed for general hospitals and lack features specific to university clinics, such as student self-registration and integration with student identifiers.

2. Few systems implement database-level row security (RLS), relying instead on application-level access control which is more vulnerable to bypass.

3. Automated missed appointment management with configurable rules is rarely addressed in academic implementations.

4. The combination of a student self-service portal with a comprehensive staff management system in a single application is uncommon.

5. Modern frontend frameworks (React with TypeScript) combined with cloud-native backends (Supabase/PostgreSQL) represent an under-explored technology stack for university clinic systems in the Nigerian context.

This project addresses these gaps by developing a purpose-built system using modern technologies with robust security, automation, and user experience considerations.

---

# CHAPTER THREE: SYSTEM ANALYSIS AND DESIGN

## 3.1 Introduction

This chapter presents the analysis of the existing system, the proposed system requirements, and the detailed design of the MTU Clinic Management System. It covers the system architecture, database design, user interface design, and security considerations.

## 3.2 Analysis of the Existing System

The current system at MTU Clinic operates predominantly through manual processes:

### 3.2.1 Current Workflow
1. Students visit the clinic physically for registration and are assigned paper-based patient folders.
2. Patients queue at the reception without prior appointments and wait to be seen by an available doctor.
3. Doctors record consultation notes, diagnoses, and prescriptions on paper forms.
4. Prescriptions are hand-carried to the pharmacy for dispensation.
5. Laboratory requests are communicated via paper forms.
6. Immunisation records are maintained in separate logbooks.
7. Drug inventory is tracked through manual stock counts.

### 3.2.2 Problems with the Existing System
- High patient wait times due to lack of scheduling
- Risk of data loss from physical record damage or misplacement
- Inability to quickly retrieve patient history across visits
- No mechanism for patients to check doctor availability before visiting
- Difficulty in generating statistical reports for administrative planning
- No automated alerts for drug expiry or low stock levels

## 3.3 Requirements Analysis

### 3.3.1 Functional Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| FR-01 | User registration and authentication with email verification | High |
| FR-02 | Role-based access control (Admin, Doctor, Nurse, Pharmacist, Lab Tech, Receptionist, Student) | High |
| FR-03 | Student self-registration as patients via Student Portal | High |
| FR-04 | Doctor duty roster management by administrators | High |
| FR-05 | Appointment booking with real-time doctor availability | High |
| FR-06 | Automated missed appointment detection and status update | Medium |
| FR-07 | Real-time queue management | High |
| FR-08 | Clinical consultation recording (complaints, diagnosis, notes) | High |
| FR-09 | Prescription management with pharmacy dispensation tracking | High |
| FR-10 | Laboratory request and results management | High |
| FR-11 | Drug inventory management with stock and expiry alerts | High |
| FR-12 | Immunisation record management | Medium |
| FR-13 | Medical fitness examination tracking | Medium |
| FR-14 | Dashboard with real-time statistics and alerts | High |
| FR-15 | Staff notification system for appointments and alerts | Medium |
| FR-16 | Reporting and analytics module | Medium |

### 3.3.2 Non-Functional Requirements

| ID | Requirement | Description |
|----|------------|-------------|
| NFR-01 | Security | All data access must be controlled through Row-Level Security policies |
| NFR-02 | Performance | Pages should load within 3 seconds on standard connections |
| NFR-03 | Usability | The interface must be intuitive for non-technical medical staff |
| NFR-04 | Scalability | The system should support at least 5,000 registered patients |
| NFR-05 | Availability | The system should be accessible 24/7 via web browser |
| NFR-06 | Responsiveness | The UI must adapt to desktop, tablet, and mobile screen sizes |
| NFR-07 | Data Integrity | All database operations must maintain referential integrity |

## 3.4 System Architecture

The MTU Clinic Management System follows a **three-tier client-server architecture**:

```
┌─────────────────────────────────────────────────┐
│                PRESENTATION TIER                 │
│         React + TypeScript + Tailwind CSS        │
│    (Single Page Application in the Browser)      │
└──────────────────────┬──────────────────────────┘
                       │ HTTPS / REST API
┌──────────────────────┴──────────────────────────┐
│                APPLICATION TIER                  │
│         Supabase (Backend-as-a-Service)          │
│   ┌─────────────┐  ┌────────────────────────┐   │
│   │ Auth Service │  │ Edge Functions          │   │
│   │ (JWT-based)  │  │ (Auto-cancel missed    │   │
│   │              │  │  appointments)          │   │
│   └─────────────┘  └────────────────────────┘   │
│   ┌─────────────────────────────────────────┐   │
│   │ PostgREST API (Auto-generated REST)     │   │
│   └─────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────┐
│                  DATA TIER                       │
│            PostgreSQL Database                   │
│   ┌─────────────────────────────────────────┐   │
│   │ Tables: patients, appointments,         │   │
│   │ consultations, prescriptions, drugs,    │   │
│   │ lab_requests, immunizations, vitals,    │   │
│   │ queue_entries, profiles, user_roles,    │   │
│   │ doctor_schedules, notifications,        │   │
│   │ medical_fitness                         │   │
│   ├─────────────────────────────────────────┤   │
│   │ Security: Row-Level Security (RLS)      │   │
│   │ Functions: has_role(), is_staff()       │   │
│   │ Triggers: auto-profile, auto-roster     │   │
│   └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

## 3.5 Database Design

### 3.5.1 Entity-Relationship Summary

The database consists of 14 interconnected tables:

**Core Entities:**
- `profiles` — User profile information (linked to authentication)
- `user_roles` — Role assignments (admin, doctor, nurse, etc.)
- `patients` — Patient demographic and medical information

**Clinical Entities:**
- `consultations` — Doctor-patient consultation records
- `vitals` — Patient vital signs recordings
- `prescriptions` — Medication prescriptions linked to consultations
- `lab_requests` — Laboratory test requests and results
- `immunizations` — Vaccination records
- `medical_fitness` — Fitness examination records

**Operational Entities:**
- `appointments` — Scheduled appointments with status tracking
- `doctor_schedules` — Weekly duty roster for doctors
- `queue_entries` — Real-time clinic queue management
- `drugs` — Pharmacy inventory management
- `notifications` — Staff notification messages

### 3.5.2 Key Relationships
- A **patient** can have many **appointments**, **consultations**, **vitals**, **lab_requests**, **immunizations**, and **medical_fitness** records.
- A **consultation** can have many **prescriptions** and **lab_requests**.
- A **prescription** references a **drug** from the pharmacy inventory.
- A **doctor** (via `user_roles`) can have multiple **doctor_schedules** defining their weekly availability.
- An **appointment** links a **patient** to a **doctor** for a specific date and time.

### 3.5.3 Security Design

The system implements a multi-layered security model:

1. **Authentication Layer:** JWT-based authentication with email verification.
2. **Role Layer:** A `user_roles` table with a `has_role()` security-definer function that bypasses RLS for role checking without recursion.
3. **Data Access Layer:** Row-Level Security (RLS) policies on every table ensuring:
   - Staff members can only access data appropriate to their role
   - Students can only view and manage their own records
   - Administrators have full system access
   - Sensitive operations (prescribing, dispensing) are restricted to qualified roles

## 3.6 User Interface Design

### 3.6.1 Design Principles
- **Role-Adaptive Interface:** The system presents different interfaces based on user role—students see the Student Portal while clinical staff see the full Dashboard.
- **Responsive Design:** Utilising Tailwind CSS utility classes and responsive breakpoints for desktop, tablet, and mobile layouts.
- **Component-Based Architecture:** Reusable UI components (cards, tables, forms, dialogs) built with shadcn/ui ensure visual consistency.
- **Intuitive Navigation:** A collapsible sidebar provides quick access to all modules.

### 3.6.2 Key Screens

| Screen | Primary Users | Purpose |
|--------|--------------|---------|
| Dashboard | All Staff | Overview of daily statistics, queue, alerts |
| Student Portal | Students | Registration, appointment booking, appointment history |
| Patients | Staff | Patient records management and search |
| Appointments | Doctors, Receptionists | Daily schedule view, mark attendance, cancel |
| Queue | Receptionists, Nurses | Real-time queue management |
| Consultations | Doctors | Clinical encounter documentation |
| Pharmacy | Pharmacists | Drug inventory and prescription dispensation |
| Laboratory | Lab Technicians | Test request management and results entry |
| Immunization | Nurses | Vaccination record management |
| Records | All Staff | Medical records archive |
| Reports | Admin | Analytics and statistical reports |
| Settings | Admin | System configuration, user management, doctor roster |

## 3.7 Process Design

### 3.7.1 Appointment Lifecycle

```
Student books appointment → Status: "scheduled"
         │
         ├─── Doctor marks as attended → Status: "attended" → Consultation begins
         │
         ├─── Student cancels → Status: "cancelled"
         │
         ├─── Staff cancels → Status: "cancelled"
         │
         └─── Time passes without attendance → Auto-detected → Status: "missed"
                    │
                    └─── Student can view missed status and rebook
```

### 3.7.2 Patient Flow Through Clinic

```
Student Self-Registration → Patient Record Created
         │
    Book Appointment → Join Queue on Arrival
         │
    Receptionist Check-in → Status: "waiting"
         │
    Assigned to Doctor → Status: "in_consultation"
         │
    Consultation (diagnosis, prescriptions, lab requests)
         │
         ├─── Lab Tests Needed → Status: "in_lab" → Results Recorded → Return to Doctor
         │
         └─── Prescriptions → Status: "in_pharmacy" → Drugs Dispensed
                    │
               Status: "completed" → Patient Discharged
```

## 3.8 Technology Stack

| Layer | Technology | Justification |
|-------|-----------|---------------|
| Frontend Framework | React 18 | Component-based, efficient virtual DOM, large ecosystem |
| Type System | TypeScript | Static typing reduces runtime errors, improves maintainability |
| Styling | Tailwind CSS | Utility-first approach enables rapid, consistent UI development |
| UI Components | shadcn/ui (Radix) | Accessible, unstyled primitives with customisable theming |
| State Management | TanStack React Query | Server state caching, automatic refetching, optimistic updates |
| Routing | React Router v6 | Declarative routing with nested layouts and protected routes |
| Form Handling | React Hook Form + Zod | Performant forms with schema-based validation |
| Build Tool | Vite | Fast development server with hot module replacement |
| Database | PostgreSQL (via Supabase) | Robust relational database with RLS, triggers, and functions |
| Authentication | Supabase Auth | JWT-based auth with email verification |
| Serverless Functions | Supabase Edge Functions (Deno) | Background tasks like missed appointment detection |
| Scheduling | pg_cron | Database-level cron jobs for periodic tasks |
| Hosting | Lovable Cloud | Integrated deployment with automatic HTTPS |

## 3.9 Summary

This chapter has presented a thorough analysis of the existing manual system, identified its limitations, and specified the functional and non-functional requirements for the proposed system. The system architecture follows a modern three-tier model leveraging cloud-native services for scalability and security. The database design implements comprehensive Row-Level Security policies to protect sensitive medical data, while the user interface is designed to be intuitive, responsive, and role-adaptive. The technology stack combines industry-leading frontend and backend technologies to deliver a robust, maintainable, and secure clinic management platform.

---

*End of Chapters 1–3*

---

### References

- Ajayi, O. A., & Oluwafemi, T. (2019). "Challenges of Healthcare Delivery in Nigerian University Clinics." *Journal of Health Informatics in Africa*, 6(2), 45–58.
- Adebayo, R. et al. (2020). "Design and Implementation of a Web-Based Clinic Management System." *Nigerian Journal of Technology*, 39(3), 812–820.
- Ferraiolo, D. F., Sandhu, R., Gavrila, S., & Kuhn, D. R. (2001). "Proposed NIST Standard for Role-Based Access Control." *ACM Transactions on Information and System Security*, 4(3), 224–274.
- Gackenheimer, C. (2015). *Introduction to React*. Apress.
- Gupta, D., & Denton, B. (2008). "Appointment Scheduling in Health Care: Challenges and Opportunities." *IIE Transactions*, 40(9), 800–819.
- Haux, R. (2006). "Health Information Systems – Past, Present, Future." *International Journal of Medical Informatics*, 75(3-4), 268–281.
- Okonkwo, C. U., & Eze, S. (2018). "Cloud-Based Health Record System for Tertiary Institutions." *International Journal of Computer Applications*, 179(46), 1–6.
- Sharma, A., & Gupta, R. (2021). "React-Based Hospital Management System with RBAC." *International Journal of Advanced Computer Science and Applications*, 12(5), 301–310.
- Supabase Documentation. (2024). *Supabase Docs*. Retrieved from https://supabase.com/docs
- World Health Organisation (WHO). (2008). *Framework and Standards for Country Health Information Systems*. Geneva: WHO Press.
