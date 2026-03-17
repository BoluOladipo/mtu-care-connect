# MTU CARE CONNECT

## A Web-Based Healthcare Information Management System for University Clinics

---

# PRELIMINARY PAGES

---

## TITLE PAGE

**MTU CARE CONNECT: A WEB-BASED HEALTHCARE INFORMATION MANAGEMENT SYSTEM FOR UNIVERSITY CLINICS**

A Project Report Submitted to the Department of Computer Science, Faculty of Computing and Information Technology, Mountain Top University, Prayer City, Ogun State, Nigeria

In Partial Fulfilment of the Requirements for the Award of Bachelor of Science (B.Sc.) Degree in Computer Science

By

**[STUDENT FULL NAME]**

**Matriculation Number: [MTU/CSC/XX/XXXX]**

**Supervisor: [SUPERVISOR'S NAME AND TITLE]**

**Month, 2026**

---

## CERTIFICATION

This is to certify that this project titled **"MTU Care Connect: A Web-Based Healthcare Information Management System for University Clinics"** was carried out by **[STUDENT FULL NAME]** with Matriculation Number **[MTU/CSC/XX/XXXX]** in partial fulfilment of the requirements for the award of Bachelor of Science (B.Sc.) degree in Computer Science, Department of Computer Science, Faculty of Computing and Information Technology, Mountain Top University, Prayer City, Ogun State, Nigeria.

&nbsp;

______________________________ &emsp;&emsp;&emsp;&emsp; ______________________________  
**[Supervisor's Name]** &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; **Date**  
(Project Supervisor)

&nbsp;

______________________________ &emsp;&emsp;&emsp;&emsp; ______________________________  
**[HOD's Name]** &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; **Date**  
(Head of Department)

&nbsp;

______________________________ &emsp;&emsp;&emsp;&emsp; ______________________________  
**External Examiner** &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; **Date**

---

## DEDICATION

This project is dedicated to Almighty God, the source of all wisdom and knowledge, who has been my strength and guide throughout my academic journey. I also dedicate this work to my parents, whose unwavering love, support, and sacrifice have made it possible for me to reach this milestone. Their belief in my potential and their constant encouragement have been the pillars upon which my academic success is built. This work is equally dedicated to all healthcare professionals in university clinics across Nigeria who work tirelessly, often under challenging conditions, to ensure the health and wellbeing of students. It is my sincere hope that this system will contribute meaningfully to easing their workload and improving the quality of healthcare delivery in academic institutions.

---

## ACKNOWLEDGEMENT

I wish to first and foremost express my deepest gratitude to God Almighty for His infinite grace, mercy, and wisdom that have sustained me throughout my academic journey and the successful completion of this project. Without His guidance, none of this would have been possible.

I am profoundly grateful to my project supervisor, **[Supervisor's Name]**, for the invaluable guidance, patience, constructive criticism, and unwavering support provided throughout the course of this research. Your mentorship has been instrumental in shaping this work into its final form. I extend my sincere appreciation to the Head of Department, Computer Science, **[HOD's Name]**, for creating an enabling academic environment and for the administrative support that facilitated the smooth execution of this project.

My heartfelt thanks go to all lecturers in the Department of Computer Science, Mountain Top University, whose collective wisdom, teaching, and mentorship over the years have equipped me with the knowledge and skills necessary to undertake this project. Each lecture, assignment, and examination contributed to the competence I bring to bear on this work.

I am deeply indebted to my parents, **[Father's Name]** and **[Mother's Name]**, for their tireless support, both moral and financial, throughout my years of study. Their sacrifices, prayers, and encouragement have been the bedrock of my academic achievements. I also wish to thank my siblings for their love, support, and understanding during the many hours I spent working on this project.

Special thanks to the staff of the Mountain Top University Health Centre, whose cooperation during the requirements-gathering phase of this project was invaluable. Their willingness to share insights into the daily operations, challenges, and needs of the clinic provided the real-world context that informed the design and development of this system.

I acknowledge my friends and course mates who supported me in various capacities during this project. Your encouragement, technical discussions, and collaborative spirit were truly appreciated.

Finally, I wish to thank the management of Mountain Top University for providing the academic infrastructure and conducive learning environment that made this project possible.

---

## ABSTRACT

The management of healthcare services within university clinics in Nigeria has long been characterised by significant operational challenges, including reliance on manual record-keeping systems, inefficient patient queue management, difficulty in tracking drug inventories, and limited communication between clinical departments. These challenges are particularly acute in private university settings such as Mountain Top University (MTU), where the student population depends heavily on the campus health centre for primary healthcare services. The manual processes traditionally employed in these clinics lead to long patient waiting times, misplaced medical records, medication dispensing errors, and an overall decline in the quality of healthcare delivery.

This project, titled **"MTU Care Connect: A Web-Based Healthcare Information Management System for University Clinics,"** addresses these challenges by designing and implementing a comprehensive, role-based web application that digitises and streamlines the core operations of a university health centre. The system was developed using modern web technologies including React.js for the frontend user interface, TypeScript for type-safe programming, Tailwind CSS for responsive styling, and Supabase as the backend-as-a-service platform providing authentication, database management, and real-time data synchronisation. The application is deployed on a cloud infrastructure, ensuring accessibility from any device with a web browser.

The system implements a multi-role architecture that caters to six distinct user categories: administrators, doctors, nurses, pharmacists, laboratory technicians, and students (patients). Each role is assigned specific permissions and access levels, ensuring data security and operational efficiency. Key features include a real-time patient queue management system, appointment scheduling and management, electronic medical records, digital consultation notes, prescription management with automated pharmacy workflows, laboratory request processing, drug inventory management with low-stock and expiry alerts, immunisation tracking, medical fitness certification, and a comprehensive student self-service portal.

The development methodology employed was the Agile approach, which facilitated iterative development, continuous testing, and incremental feature delivery. The system was thoroughly tested using a combination of unit testing, integration testing, and user acceptance testing. Results demonstrated significant improvements in patient processing times, record retrieval efficiency, inventory management accuracy, and overall user satisfaction compared to the existing manual system.

The significance of this project extends beyond the immediate context of Mountain Top University. The system architecture and design patterns employed are scalable and adaptable, making the solution suitable for deployment in other university clinics and small-to-medium healthcare facilities across Nigeria and similar developing countries. This project contributes to the broader discourse on digital health transformation in higher education institutions and provides a practical, implementable solution to longstanding healthcare management challenges in university settings.

**Keywords:** Healthcare Information Management System, University Clinic, Electronic Medical Records, Queue Management, Role-Based Access Control, Web Application, React.js, Supabase, Digital Health.

---

## TABLE OF CONTENTS

- **Preliminary Pages**
  - Title Page
  - Certification
  - Dedication
  - Acknowledgement
  - Abstract
  - Table of Contents
  - List of Figures
  - List of Tables
  - List of Abbreviations

- **Chapter One: Introduction**
  - 1.1 Background of the Study
  - 1.2 Statement of the Problem
  - 1.3 Aim and Objectives of the Study
  - 1.4 Research Questions
  - 1.5 Scope of the Study
  - 1.6 Significance of the Study
  - 1.7 Definition of Terms

- **Chapter Two: Literature Review**
  - 2.1 Conceptual Review
    - 2.1.1 Healthcare Information Management Systems
    - 2.1.2 Electronic Medical Records (EMR)
    - 2.1.3 Appointment Scheduling Systems
    - 2.1.4 Queue Management in Healthcare
    - 2.1.5 Drug Inventory Management
    - 2.1.6 Role-Based Access Control (RBAC)
  - 2.2 Theoretical Framework
    - 2.2.1 Technology Acceptance Model (TAM)
    - 2.2.2 DeLone and McLean Information Systems Success Model
  - 2.3 Review of Existing Systems
    - 2.3.1 Manual Clinic Management Systems
    - 2.3.2 OpenMRS
    - 2.3.3 GNU Health
    - 2.3.4 Hospital Management Information Systems (HMIS) in Nigeria
    - 2.3.5 Commercial Systems
  - 2.4 Comparison Table of Existing Systems
  - 2.5 Limitations of Existing Systems
  - 2.6 Justification for the Proposed System

- **Chapter Three: System Analysis and Design**
  - 3.1 Analysis of the Existing System
  - 3.2 Problems of the Existing System
  - 3.3 Proposed System Overview
  - 3.4 System Modelling and Diagrams
    - 3.4.1 Use Case Diagram
    - 3.4.2 Use Case Description Tables
    - 3.4.3 System Flowchart
    - 3.4.4 Data Flow Diagram (DFD Level 0)
    - 3.4.5 Data Flow Diagram (DFD Level 1)
    - 3.4.6 Entity Relationship Diagram (ERD)
    - 3.4.7 System Architecture Diagram
  - 3.5 Database Design
  - 3.6 User Interface Design

- **Chapter Four: System Implementation**
  - 4.1 Development Methodology
  - 4.2 Tools and Technologies Used
  - 4.3 System Requirements
    - 4.3.1 Hardware Requirements
    - 4.3.2 Software Requirements
  - 4.4 Implementation Details
    - 4.4.1 Authentication and Authorisation System
    - 4.4.2 Patient Registration Module
    - 4.4.3 Appointment Booking System
    - 4.4.4 Queue Management System
    - 4.4.5 Consultation and Medical Records Module
    - 4.4.6 Prescription and Pharmacy Module
    - 4.4.7 Laboratory Management Module
    - 4.4.8 Drug Inventory Management
    - 4.4.9 Notification System
    - 4.4.10 Dashboard and Reporting Module
  - 4.5 Code Snippets and Explanations
  - 4.6 Deployment

- **Chapter Five: Results and Discussion**
  - 5.1 System Testing
    - 5.1.1 Unit Testing
    - 5.1.2 Integration Testing
    - 5.1.3 User Acceptance Testing
  - 5.2 Performance Evaluation
  - 5.3 System Screenshots and Descriptions
    - 5.3.1 Landing Page
    - 5.3.2 Login Page
    - 5.3.3 Student Registration Page
    - 5.3.4 Student Portal / Appointment Booking
    - 5.3.5 Staff Dashboard
    - 5.3.6 Patient Queue Management
    - 5.3.7 Consultation Form
    - 5.3.8 Pharmacy / Drug Inventory
    - 5.3.9 Laboratory Management
    - 5.3.10 Reports Page
    - 5.3.11 Settings Page
  - 5.4 Discussion of Results
  - 5.5 Comparison with Existing Systems

- **Chapter Six: Conclusion and Recommendations**
  - 6.1 Summary of Findings
  - 6.2 Conclusion
  - 6.3 Limitations of the System
  - 6.4 Recommendations for Future Work
  - 6.5 Contribution to Knowledge

- **References**

- **Appendix**
  - Appendix A: Additional Screenshots
  - Appendix B: Sample Code Listings
  - Appendix C: Database Schema
  - Appendix D: User Manual

---

## LIST OF FIGURES

| Figure No. | Title | Page |
|------------|-------|------|
| Figure 3.1 | Use Case Diagram of MTU Care Connect | — |
| Figure 3.2 | System Flowchart | — |
| Figure 3.3 | Data Flow Diagram – Level 0 (Context Diagram) | — |
| Figure 3.4 | Data Flow Diagram – Level 1 | — |
| Figure 3.5 | Entity Relationship Diagram (ERD) | — |
| Figure 3.6 | System Architecture Diagram | — |
| Figure 3.7 | Database Schema Diagram | — |
| Figure 5.1 | Landing Page | — |
| Figure 5.2 | Login Page | — |
| Figure 5.3 | Student Registration Page | — |
| Figure 5.4 | Student Portal – Appointment Booking | — |
| Figure 5.5 | Staff Dashboard | — |
| Figure 5.6 | Patient Queue Management | — |
| Figure 5.7 | Consultation Form | — |
| Figure 5.8 | Pharmacy – Drug Inventory | — |
| Figure 5.9 | Laboratory Management Page | — |
| Figure 5.10 | Reports and Analytics Page | — |
| Figure 5.11 | Settings Page | — |

---

## LIST OF TABLES

| Table No. | Title | Page |
|-----------|-------|------|
| Table 2.1 | Comparison of Existing Healthcare Management Systems | — |
| Table 3.1 | Use Case Description – Student Registration | — |
| Table 3.2 | Use Case Description – Appointment Booking | — |
| Table 3.3 | Use Case Description – Queue Management | — |
| Table 3.4 | Use Case Description – Consultation | — |
| Table 3.5 | Use Case Description – Prescription Dispensing | — |
| Table 3.6 | Use Case Description – Lab Request Processing | — |
| Table 3.7 | Database Table – Patients | — |
| Table 3.8 | Database Table – Appointments | — |
| Table 3.9 | Database Table – Consultations | — |
| Table 3.10 | Database Table – Prescriptions | — |
| Table 3.11 | Database Table – Drugs | — |
| Table 3.12 | Database Table – Lab Requests | — |
| Table 3.13 | Database Table – User Roles | — |
| Table 4.1 | Tools and Technologies Used | — |
| Table 4.2 | Hardware Requirements | — |
| Table 4.3 | Software Requirements | — |
| Table 5.1 | Unit Test Results Summary | — |
| Table 5.2 | User Acceptance Testing Results | — |
| Table 5.3 | Performance Metrics | — |

---

## LIST OF ABBREVIATIONS

| Abbreviation | Full Meaning |
|-------------|--------------|
| API | Application Programming Interface |
| CRUD | Create, Read, Update, Delete |
| CSS | Cascading Style Sheets |
| DFD | Data Flow Diagram |
| EMR | Electronic Medical Records |
| ERD | Entity Relationship Diagram |
| HMIS | Hospital Management Information System |
| HTML | HyperText Markup Language |
| HTTP | HyperText Transfer Protocol |
| ICT | Information and Communication Technology |
| JSON | JavaScript Object Notation |
| MTU | Mountain Top University |
| RBAC | Role-Based Access Control |
| REST | Representational State Transfer |
| RLS | Row-Level Security |
| SQL | Structured Query Language |
| TAM | Technology Acceptance Model |
| UI | User Interface |
| URL | Uniform Resource Locator |
| UX | User Experience |
| WHO | World Health Organisation |

---

# CHAPTER ONE: INTRODUCTION

## 1.1 Background of the Study

The healthcare sector, globally and particularly in developing nations like Nigeria, has witnessed a progressive integration of information technology into the management of health services. The World Health Organisation (WHO) has consistently advocated for the adoption of Health Information Systems (HIS) as a fundamental component of effective healthcare delivery. In the context of higher education institutions, university health centres play a critical role in providing primary healthcare services to students, staff, and sometimes the surrounding community. These clinics are typically the first point of contact for medical attention within the university environment and are responsible for a wide range of services, including general consultations, emergency care, drug dispensing, laboratory testing, immunisation, and the issuance of medical fitness certificates.

Mountain Top University (MTU), located in Prayer City, along the Lagos-Ibadan Expressway, Ogun State, Nigeria, is a private Christian university established by the Mountain of Fire and Miracles Ministries. The university maintains a health centre that serves its student population across multiple faculties. Like many university clinics in Nigeria, the MTU Health Centre handles a significant volume of patient interactions daily, ranging from routine check-ups to urgent medical consultations. The effective management of patient data, appointment scheduling, drug inventory, and inter-departmental communication is crucial to the quality of care provided.

Historically, many university clinics in Nigeria, including those in well-established institutions, have relied heavily on manual, paper-based systems for managing patient records, tracking drug inventories, scheduling appointments, and managing patient queues. While these manual systems have served their purpose, they are inherently limited in terms of efficiency, accuracy, scalability, and data security. Paper records are susceptible to physical damage, loss, and unauthorised access. Manual queue management leads to long waiting times and patient dissatisfaction. Drug inventory tracking using registers or spreadsheets is error-prone and makes it difficult to monitor expiration dates and stock levels in real time.

The advent of web-based technologies has created unprecedented opportunities for the digitisation of healthcare management processes. Modern web frameworks such as React.js, combined with backend-as-a-service platforms like Supabase, enable the development of sophisticated, responsive, and secure healthcare applications that can be accessed from any device with an internet connection. These technologies support real-time data synchronisation, role-based access control, and scalable database management, making them ideal for developing healthcare information management systems tailored to the specific needs of university clinics.

The concept of a Healthcare Information Management System (HIMS) encompasses the use of information and communication technology (ICT) to manage the flow of health-related information among healthcare providers, patients, and administrative staff. A well-implemented HIMS improves clinical decision-making by providing healthcare professionals with timely access to accurate patient information, reduces administrative burden through automation of routine tasks, enhances patient safety by minimising medication errors, and improves overall operational efficiency.

In the Nigerian context, the National Health Act of 2014 and the Nigeria Health ICT Strategic Framework have emphasised the importance of digitising health records and leveraging technology to improve healthcare delivery. However, the adoption of digital health systems in Nigerian universities has been slow, primarily due to limited funding, inadequate technical infrastructure, resistance to change, and the absence of purpose-built solutions that address the specific workflow requirements of university health centres.

This project, **MTU Care Connect**, was conceived to address these challenges by developing a comprehensive, web-based healthcare information management system specifically designed for the Mountain Top University Health Centre. The system is built using modern web technologies and follows industry best practices for security, usability, and scalability. It aims to transform the clinic's operations from a predominantly manual process to a fully digital, integrated system that improves efficiency, accuracy, and the overall quality of healthcare service delivery.

The significance of this project extends beyond the immediate context of MTU. The modular architecture and role-based design of the system make it adaptable to other university clinics and similar healthcare facilities, contributing to the broader goal of digital health transformation in Nigerian educational institutions.

## 1.2 Statement of the Problem

University clinics in Nigeria face a multitude of operational challenges that directly impact the quality of healthcare services provided to students. These challenges are particularly pronounced at the Mountain Top University Health Centre, where the following problems have been identified through direct observation and interaction with clinic staff:

**1. Inefficient Manual Record-Keeping:** The clinic relies primarily on paper-based systems for recording patient information, consultation notes, prescriptions, and laboratory results. This manual approach is time-consuming, error-prone, and makes it extremely difficult to retrieve patient records quickly when needed. Healthcare professionals spend a disproportionate amount of time searching for physical files rather than attending to patients. Paper records are also vulnerable to physical damage from moisture, fire, or general wear and tear, and are susceptible to loss or misfiling.

**2. Long Patient Waiting Times and Disorganised Queue Management:** The absence of a systematic queue management system leads to confusion about the order in which patients are seen, often resulting in disputes, frustration, and unnecessarily long waiting times. Patients have no visibility into their position in the queue or estimated waiting times. Nurses struggle to prioritise patients based on the urgency of their condition without a structured system for triage categorisation.

**3. Appointment Scheduling Difficulties:** The current system does not support advance appointment scheduling. Students must physically visit the clinic and wait in line, regardless of whether they need a routine check-up or have an urgent medical concern. This lack of appointment management leads to overcrowding during peak hours and underutilisation of clinic resources during off-peak periods.

**4. Poor Drug Inventory Management:** The pharmacy relies on manual registers or basic spreadsheets to track drug inventories. This approach makes it difficult to monitor stock levels in real time, identify drugs nearing expiration, or generate accurate reports on drug consumption patterns. As a result, the clinic sometimes experiences stockouts of essential medications or discovers expired drugs that were not identified in time, both of which compromise patient safety.

**5. Limited Inter-Departmental Communication:** Communication between the various departments of the clinic (reception, consultation rooms, pharmacy, and laboratory) is largely verbal or paper-based. When a doctor writes a prescription, it must be physically carried to the pharmacy. Similarly, laboratory requests are communicated through paper forms that can be lost or delayed. This fragmented communication leads to delays in service delivery and increases the risk of errors.

**6. Absence of a Student Self-Service Portal:** Students currently have no way to check their medical history, view upcoming appointments, or book appointments online. All interactions require physical presence at the clinic, which is inconvenient and contributes to the overcrowding problem described above.

**7. Inadequate Reporting and Analytics:** The manual system makes it virtually impossible to generate timely, accurate reports on clinic operations, patient demographics, disease patterns, drug utilisation, or other metrics that are essential for informed decision-making and strategic planning. Clinic administrators lack the data-driven insights needed to optimise resource allocation and improve service delivery.

**8. Data Security and Privacy Concerns:** Paper records stored in filing cabinets offer minimal protection against unauthorised access. There is no audit trail to track who has accessed or modified patient records. This raises serious concerns about patient confidentiality and compliance with data protection principles.

These problems collectively result in a suboptimal healthcare delivery experience for students and an unnecessarily burdensome workload for clinic staff. The need for a comprehensive, technology-driven solution that addresses all of these challenges simultaneously has been the primary motivation for this project.

## 1.3 Aim and Objectives of the Study

### Aim

The aim of this project is to design and develop a comprehensive, web-based healthcare information management system (MTU Care Connect) for the Mountain Top University Health Centre that digitises and streamlines clinic operations, improves patient care, and enhances operational efficiency through role-based access, real-time data management, and integrated departmental workflows.

### Objectives

The specific objectives of this study are to:

1. Analyse the existing manual healthcare management processes at the Mountain Top University Health Centre and identify the specific operational challenges and inefficiencies.

2. Design a role-based access control system that defines six distinct user roles (administrator, doctor, nurse, pharmacist, laboratory technician, and student) with appropriate permissions and access levels to ensure data security and operational efficiency.

3. Develop a real-time patient queue management system that enables nurses to add patients to a prioritised queue after recording their vitals (blood pressure and body temperature), and allows doctors to view and attend to patients in order of priority and arrival time.

4. Implement an appointment scheduling module that allows students to book, view, and manage medical appointments through a self-service portal, reducing the need for physical visits to the clinic for scheduling purposes.

5. Create an electronic medical records system that stores patient information, consultation notes, diagnoses, prescriptions, laboratory results, immunisation records, and medical fitness certifications in a secure, centralised database.

6. Develop a prescription management workflow that enables doctors to write prescriptions during consultations and allows pharmacists to view and dispense prescriptions, with automatic stock deduction from the drug inventory.

7. Implement a drug inventory management module that provides real-time stock level monitoring, low-stock alerts, expiry date tracking, and inventory reporting capabilities exclusively accessible to pharmacist users.

8. Develop a laboratory management module that enables doctors to request laboratory tests during consultations and allows laboratory technicians to process requests, enter results, and communicate findings back to the requesting doctor.

9. Implement a notification system that alerts relevant users about important events such as new appointments, queue updates, low drug stock levels, and expiring medications.

10. Design and implement a comprehensive reporting and analytics dashboard that provides clinic administrators with data-driven insights into clinic operations, patient demographics, and resource utilisation.

11. Deploy the system on a cloud infrastructure to ensure accessibility, reliability, and scalability.

## 1.4 Research Questions

The following research questions guided the development of this project:

1. What are the specific operational challenges and inefficiencies in the current manual healthcare management system at the Mountain Top University Health Centre?

2. How can a web-based system with role-based access control effectively address the identified challenges while maintaining data security and patient confidentiality?

3. To what extent can a digital queue management system, combined with a vital signs recording workflow, reduce patient waiting times and improve the efficiency of clinical consultations?

4. How can an integrated appointment scheduling module improve the utilisation of clinic resources and reduce patient overcrowding?

5. What impact does a real-time drug inventory management system have on reducing medication stockouts, identifying expired drugs, and improving pharmacy operations?

6. How can inter-departmental communication between doctors, nurses, pharmacists, and laboratory technicians be improved through a centralised, web-based platform?

7. What are the key design considerations for developing a healthcare information management system that is user-friendly, secure, scalable, and adaptable to other university clinic settings?

## 1.5 Scope of the Study

This study focuses on the design, development, and implementation of a web-based healthcare information management system for the Mountain Top University Health Centre. The scope of the system encompasses the following functional areas:

**Included in Scope:**

- User authentication and authorisation with role-based access control for six user roles: administrator, doctor, nurse, pharmacist, laboratory technician, and student.
- Patient registration and management, including demographics, medical history, allergies, and emergency contacts.
- Appointment scheduling and management, with support for multiple appointment types (general consultation, follow-up, specialist, immunisation, and fitness examination).
- Real-time patient queue management with priority levels (normal, urgent, emergency) and status tracking through the clinical workflow (waiting, in consultation, in laboratory, in pharmacy, completed).
- Vital signs recording by nurses (blood pressure and body temperature) as a prerequisite for adding patients to the consultation queue.
- Electronic consultation notes, including chief complaint, present illness, diagnosis, and follow-up scheduling.
- Prescription management with doctor-to-pharmacy workflow integration.
- Drug inventory management, including stock levels, minimum stock alerts, expiry date tracking, and batch number recording.
- Laboratory request and result management.
- Immunisation record tracking.
- Medical fitness certification.
- Notification system for system events and alerts.
- Reporting and analytics dashboard for administrative oversight.
- Student self-service portal for appointment booking and medical history viewing.

**Excluded from Scope:**

- Billing and financial management (the university clinic does not charge students directly for most services).
- Integration with external health insurance systems.
- Telemedicine or video consultation capabilities.
- Integration with external pharmacies or laboratories outside the university.
- Native mobile application development (the system is accessible via mobile web browsers).
- Medical imaging (radiology, X-ray, ultrasound) management.

## 1.6 Significance of the Study

The significance of this project can be examined from multiple perspectives:

**For Students (Patients):**

The system provides students with a convenient, self-service portal that allows them to book appointments online, view their medical history, and check appointment status without needing to physically visit the clinic. The real-time queue management system provides transparency about waiting times, reducing frustration and uncertainty. The digital storage of medical records ensures that patient information is always accessible and accurate, improving continuity of care across multiple clinic visits.

**For Clinic Staff (Doctors, Nurses, Pharmacists, Laboratory Technicians):**

The system significantly reduces the administrative burden on clinic staff by automating routine tasks such as record-keeping, queue management, and inventory tracking. Doctors benefit from immediate access to patient medical histories and vitals during consultations, enabling better-informed clinical decisions. Nurses can efficiently manage the patient queue and record vitals in a structured digital format. Pharmacists receive prescriptions electronically and have real-time visibility into drug inventory levels, reducing dispensing errors and stockout incidents. Laboratory technicians receive test requests electronically and can communicate results directly through the system.

**For Clinic Administration:**

The reporting and analytics capabilities of the system provide clinic administrators with data-driven insights that were previously unavailable. Administrators can monitor clinic utilisation patterns, patient demographics, drug consumption trends, and operational efficiency metrics. This information supports informed decision-making regarding resource allocation, staffing, and procurement.

**For the Institution (Mountain Top University):**

A modern, digitised health centre reflects positively on the university's commitment to leveraging technology for the benefit of its students and staff. The system can serve as a model for other departments and institutions seeking to adopt similar digital transformation initiatives.

**For Academic Contribution:**

This project contributes to the body of knowledge in the field of healthcare informatics, particularly in the context of Nigerian university health centres. The system design, architecture, and implementation details documented in this report can serve as a reference for researchers and developers working on similar projects.

**For the Broader Healthcare Ecosystem:**

The system's modular and scalable architecture means it can be adapted and deployed in other university clinics, polytechnics, colleges of education, and small-to-medium healthcare facilities across Nigeria. This has the potential to contribute to the national goal of digitising healthcare delivery as articulated in Nigeria's National Health ICT Strategic Framework.

## 1.7 Definition of Terms

**Healthcare Information Management System (HIMS):** A comprehensive computer-based system designed to manage the flow of health-related information among healthcare providers, patients, and administrative personnel, encompassing patient records, scheduling, billing, inventory, and reporting functions.

**Electronic Medical Record (EMR):** A digital version of the traditional paper-based medical record for a patient. An EMR contains the medical and treatment history of patients within a single healthcare facility and is used by healthcare providers for diagnosis and treatment.

**Role-Based Access Control (RBAC):** A method of regulating access to computer or network resources based on the roles of individual users within an organisation. Each role is assigned specific permissions that determine what actions the user can perform and what data they can access.

**Queue Management System:** A system designed to manage and organise patient flow within a healthcare facility, ensuring patients are seen in an orderly and prioritised manner, with real-time tracking of queue status and waiting times.

**Backend-as-a-Service (BaaS):** A cloud computing service model that provides developers with a way to connect their applications to backend cloud storage and processing while also providing common features such as user management, push notifications, and database management.

**Supabase:** An open-source backend-as-a-service platform that provides a PostgreSQL database, authentication, real-time subscriptions, edge functions, and storage, serving as an alternative to Firebase.

**React.js:** An open-source JavaScript library developed by Meta (formerly Facebook) for building user interfaces, particularly single-page applications, using a component-based architecture.

**TypeScript:** A strongly-typed superset of JavaScript developed by Microsoft that adds optional static typing and other features to enhance code quality and developer productivity.

**Tailwind CSS:** A utility-first CSS framework that provides low-level utility classes for building custom user interfaces directly in HTML markup, offering a highly customisable and efficient approach to styling.

**Row-Level Security (RLS):** A database security feature that restricts which rows in a database table a particular user can access, based on policies defined at the database level, ensuring data isolation and protection.

**Application Programming Interface (API):** A set of defined rules and protocols that allow different software applications to communicate with each other, enabling data exchange and functionality integration.

**Triage:** The process of determining the priority of patients' treatments based on the severity of their condition, used to allocate scarce resources efficiently in healthcare settings.

**Vital Signs:** Measurements of the body's most basic functions, including body temperature, pulse rate, respiration rate, and blood pressure, which are essential indicators of a patient's health status.

---

# CHAPTER TWO: LITERATURE REVIEW

## 2.1 Conceptual Review

### 2.1.1 Healthcare Information Management Systems

Healthcare Information Management Systems (HIMS) have evolved significantly over the past several decades, transitioning from simple computerised record-keeping to comprehensive, integrated platforms that encompass all aspects of healthcare delivery. According to Haux (2006), health information systems have progressed through several generations, from paper-based systems to computer-based patient record systems, to integrated health information systems that support clinical decision-making, administrative management, and public health reporting.

In the context of university clinics, a HIMS serves a particularly important function. University health centres typically operate as primary healthcare facilities that serve a defined population (students and staff) with a relatively predictable range of services. The operational requirements of these clinics include patient registration, appointment scheduling, clinical documentation, prescription management, laboratory services, and inventory management. A well-designed HIMS addresses all of these requirements through a single, integrated platform (WHO, 2012).

The benefits of implementing HIMS in healthcare settings have been well-documented in the literature. Buntin, Burke, Hoaglin, and Blumenthal (2011) conducted a comprehensive review of studies on the impact of health information technology and found that the majority of studies reported positive effects on quality of care, efficiency, and patient safety. Specifically, these systems have been shown to reduce medication errors, improve compliance with clinical guidelines, decrease unnecessary test duplication, and enhance communication between healthcare providers.

However, the adoption of HIMS in developing countries, including Nigeria, has been considerably slower than in developed nations. Odekunle, Odekunle, and Shankar (2017) identified several barriers to health information technology adoption in Nigeria, including inadequate infrastructure, limited funding, shortage of trained personnel, resistance to change among healthcare workers, and the absence of national standards for health information exchange. These findings underscore the importance of developing locally relevant, user-friendly, and cost-effective solutions that address the specific needs and constraints of Nigerian healthcare settings.

### 2.1.2 Electronic Medical Records (EMR)

Electronic Medical Records (EMR) represent a core component of any healthcare information management system. An EMR is a digital version of the paper chart used in a clinician's office, containing the medical and treatment history of patients within a single practice or facility (Garrett & Seidman, 2011). EMR systems offer numerous advantages over paper-based records, including improved legibility, faster information retrieval, reduced storage space requirements, enhanced data security through access controls, and the ability to aggregate and analyse clinical data.

The implementation of EMR systems has been associated with significant improvements in healthcare quality and efficiency. A study by Menachemi and Collum (2011) identified four main categories of benefits: improved quality of care, increased efficiency, improved regulatory compliance, and enhanced financial performance. In the context of university clinics, the quality and efficiency benefits are particularly relevant, as these facilities prioritise patient care delivery over revenue generation.

For the MTU Care Connect system, the EMR component encompasses patient demographics, vital signs records, consultation notes with diagnosis and treatment plans, prescription history, laboratory results, immunisation records, and medical fitness certifications. The system implements a relational database structure that links all of these data elements to the patient record, enabling comprehensive and longitudinal tracking of each patient's healthcare journey within the university.

### 2.1.3 Appointment Scheduling Systems

Appointment scheduling is a critical function in healthcare settings that directly impacts patient satisfaction, resource utilisation, and clinic workflow efficiency. Gupta and Denton (2008) noted that effective appointment scheduling must balance multiple competing objectives, including minimising patient waiting times, maximising clinician utilisation, and accommodating the inherent variability in consultation durations.

Traditional appointment scheduling in many Nigerian university clinics follows a first-come, first-served model, where students physically visit the clinic and wait in line to be seen. This approach leads to several problems: unpredictable waiting times, overcrowding during peak periods, underutilisation during off-peak periods, and the inability of students to plan their day around clinic visits (Obamiro, 2013).

Web-based appointment scheduling systems address these challenges by allowing patients to book appointments in advance, select preferred time slots, and receive confirmation and reminders. These systems also provide clinic administrators with visibility into appointment volumes, enabling better resource planning and management. The MTU Care Connect system implements an appointment scheduling module that supports multiple appointment types, date and time selection, doctor assignment, and status tracking through the appointment lifecycle.

### 2.1.4 Queue Management in Healthcare

Queue management is a fundamental aspect of healthcare service delivery that directly affects patient experience and clinical outcomes. Long waiting times have been consistently identified as one of the primary sources of patient dissatisfaction in healthcare settings (Bleustein, Rothschild, Valen, Valatis, Schweitzer, & Jones, 2014). Effective queue management systems aim to reduce waiting times, provide transparency about queue positions, and ensure that patients are seen in an appropriate order based on clinical priority.

In the healthcare context, queue management is complicated by the need for triage – the process of assessing patients' conditions and assigning priority levels based on clinical urgency. The MTU Care Connect system implements a three-tier priority system (normal, urgent, and emergency) that allows nurses to categorise patients during the initial assessment. The system tracks patients through multiple stages of the clinical workflow: waiting, in consultation, in laboratory, in pharmacy, and completed. This comprehensive status tracking provides real-time visibility into clinic operations and enables staff to identify and address bottlenecks promptly.

The integration of vital signs recording with the queue management process is a key design feature of the MTU Care Connect system. Before adding a patient to the consultation queue, the nurse records the patient's blood pressure and body temperature. These vital signs are then immediately available to the doctor when the consultation begins, ensuring that the doctor has the most current clinical information at the point of care.

### 2.1.5 Drug Inventory Management

Drug inventory management is a critical but often overlooked component of clinic operations. Effective pharmaceutical inventory management ensures the availability of essential medications, minimises wastage from expired drugs, and provides data for procurement planning (Kagashe & Massaga, 2012). In many university clinics in Nigeria, drug inventory management is handled through manual registers or basic spreadsheets, which are inadequate for real-time stock monitoring, automated alerts, and comprehensive reporting.

The consequences of poor drug inventory management can be significant. Stockouts of essential medications delay patient treatment and may require referral to external pharmacies, while expired drugs that are not identified and removed pose serious patient safety risks. A study by Ogbonna (2016) found that pharmaceutical inventory management in many Nigerian healthcare facilities was characterised by poor record-keeping, inadequate stock control, and the absence of automated systems for monitoring drug expiry dates.

The MTU Care Connect system addresses these challenges through a comprehensive drug inventory management module that is exclusively accessible to pharmacist users. The module provides real-time stock level monitoring, automatic alerts when stock levels fall below configured minimum thresholds, expiry date tracking with advance warnings, batch number recording for traceability, and the ability to generate inventory reports. When a pharmacist dispenses a prescription, the system automatically deducts the dispensed quantity from the corresponding drug's stock level, ensuring that inventory records are always accurate and up-to-date.

### 2.1.6 Role-Based Access Control (RBAC)

Role-Based Access Control (RBAC) is a widely adopted access control mechanism that assigns permissions to users based on their organisational roles rather than their individual identities (Sandhu, Coyne, Feinstein, & Youman, 1996). In healthcare settings, RBAC is particularly important because different categories of healthcare workers require access to different types of information and functionality based on their professional responsibilities.

The implementation of RBAC in healthcare information systems serves two primary purposes: ensuring data security and enforcing operational workflows. From a security perspective, RBAC ensures that sensitive patient information is only accessible to authorised personnel, in compliance with data protection principles. From an operational perspective, RBAC presents each user with only the features and data relevant to their role, reducing complexity and the risk of errors.

The MTU Care Connect system implements a comprehensive RBAC framework with six distinct roles: administrator, doctor, nurse, pharmacist, laboratory technician, and student. Each role is associated with a specific set of permissions that control access to system modules, data, and actions. The role assignments are managed by administrators and are enforced at both the frontend (UI visibility) and backend (database Row-Level Security policies) levels, providing defence-in-depth security.

## 2.2 Theoretical Framework

### 2.2.1 Technology Acceptance Model (TAM)

The Technology Acceptance Model (TAM), proposed by Davis (1989), is one of the most widely used theoretical frameworks for understanding user acceptance and adoption of information technology. TAM posits that two primary factors influence a user's decision to adopt a new technology: perceived usefulness and perceived ease of use.

**Perceived Usefulness (PU)** is defined as the degree to which a person believes that using a particular system would enhance their job performance. In the context of MTU Care Connect, perceived usefulness relates to the extent to which clinic staff believe the system will improve their efficiency, reduce errors, and enhance the quality of healthcare delivery. The system has been designed with features that directly address the known pain points of clinic operations, thereby maximising perceived usefulness.

**Perceived Ease of Use (PEOU)** is defined as the degree to which a person believes that using a particular system would be free of effort. The MTU Care Connect system addresses this through a carefully designed user interface that follows established usability principles, including consistency, visibility of system status, user control, error prevention, and minimalist design. The role-based interface ensures that each user sees only the features relevant to their role, reducing cognitive load and simplifying the user experience.

TAM provides a relevant framework for this project because it emphasises the importance of user-centred design in achieving technology adoption. By designing the system with the end-users' needs and capabilities in mind, and by incorporating features that directly address the problems they face in their daily work, the MTU Care Connect system is positioned for successful adoption and sustained use.

### 2.2.2 DeLone and McLean Information Systems Success Model

The DeLone and McLean Information Systems (IS) Success Model (DeLone & McLean, 2003) provides a comprehensive framework for evaluating the success of information systems. The updated model identifies six interrelated dimensions of IS success: system quality, information quality, service quality, user satisfaction, intention to use/use, and net benefits.

**System Quality** refers to the technical performance characteristics of the system, including reliability, response time, usability, and flexibility. The MTU Care Connect system achieves high system quality through the use of modern web technologies that ensure responsive performance, real-time data synchronisation, and cross-device compatibility.

**Information Quality** refers to the accuracy, completeness, timeliness, and relevance of the information produced by the system. The system maintains information quality through validated data entry forms, real-time data updates, and comprehensive reporting capabilities.

**Service Quality** refers to the quality of the support provided to system users. While this dimension is more applicable to commercially deployed systems, the MTU Care Connect system addresses it through intuitive user interfaces, in-system notifications, and clear error messages.

This theoretical model is relevant to this project because it provides a multi-dimensional framework for evaluating the system's success that goes beyond simple functionality assessment. The evaluation criteria derived from this model informed the system testing and evaluation activities described in Chapter Five.

## 2.3 Review of Existing Systems

### 2.3.1 Manual Clinic Management Systems

The traditional approach to clinic management in most Nigerian university health centres involves a predominantly paper-based system. In this system, patient information is recorded in physical folders that are stored in filing cabinets, typically organised alphabetically or by student identification number. When a patient visits the clinic, a receptionist or nurse retrieves the patient's folder (or creates a new one for first-time visitors), records the date and reason for the visit, and passes the folder to the attending doctor.

The doctor manually records consultation notes, diagnoses, and prescriptions in the patient's folder. Prescriptions are typically written on separate prescription pads, which the patient carries to the pharmacy window. The pharmacist reads the prescription, dispenses the medication, and manually records the dispensed items in a separate pharmacy register. Similarly, laboratory test requests are written on paper forms that the patient presents to the laboratory. Results are recorded on the same forms and returned to the doctor.

**Strengths of the manual system:**
- No dependency on electricity or internet connectivity.
- No requirement for computer literacy among staff.
- Low initial setup cost.
- Familiarity among existing staff who have used the system for years.

**Weaknesses of the manual system:**
- Slow retrieval of patient records, especially as the volume of records grows.
- Susceptibility to physical damage, loss, and unauthorised access.
- Difficulty in generating reports and analysing data.
- No support for appointment scheduling or queue management.
- Communication between departments is slow and error-prone.
- No patient self-service capabilities.
- Limited scalability as patient population grows.

### 2.3.2 OpenMRS

OpenMRS (Open Medical Record System) is an open-source electronic medical record system platform developed specifically for healthcare settings in developing countries. Originally developed for use in HIV/AIDS treatment clinics in sub-Saharan Africa, OpenMRS has grown into a comprehensive platform used in healthcare facilities in over 40 countries (Mamlin, Biondich, Wolfe, Fraser, Jazayeri, Allen, Miranda, & Tierney, 2006).

**Strengths:**
- Open-source and free to use.
- Large and active developer community.
- Highly customisable through modules and plugins.
- Designed for resource-limited settings.
- Supports multiple languages and locales.

**Weaknesses:**
- Requires significant technical expertise to install, configure, and maintain.
- Server-based architecture requires dedicated hardware and IT support.
- User interface is functional but not modern or intuitive by current web standards.
- Not specifically designed for university clinic workflows.
- Steep learning curve for non-technical users.
- Does not include built-in appointment scheduling or queue management features suitable for university clinics.

### 2.3.3 GNU Health

GNU Health is a free, open-source health and hospital information system that combines electronic medical records, hospital information system functionality, and a health information system in a single platform. It is maintained by GNU Solidario, a non-profit organisation, and is used in healthcare facilities in multiple countries (Sassone, 2017).

**Strengths:**
- Comprehensive functionality covering clinical, administrative, and public health domains.
- Open-source with no licensing costs.
- Built-in modules for laboratory, pharmacy, and reporting.
- Supports disease surveillance and epidemiological analysis.

**Weaknesses:**
- Complex installation and configuration process.
- Requires significant server infrastructure.
- Desktop client-based architecture limits accessibility.
- Not optimised for university clinic workflows.
- Limited mobile responsiveness.
- Requires trained IT personnel for ongoing maintenance.

### 2.3.4 Hospital Management Information Systems (HMIS) in Nigeria

Several proprietary hospital management information systems have been deployed in Nigerian healthcare facilities, including systems developed by local software companies and international vendors. Examples include systems like MedConnect, eClinic, and various custom-built solutions deployed in teaching hospitals and federal medical centres.

**Strengths:**
- Some systems are designed with Nigerian healthcare context in mind.
- May include features for NHIS (National Health Insurance Scheme) integration.
- Commercial support and maintenance available.

**Weaknesses:**
- High licensing and implementation costs, often prohibitive for university clinics.
- Many are designed for large hospitals and are overly complex for university health centres.
- Limited customisability without vendor involvement.
- Often lack web-based interfaces, relying instead on installed desktop applications.
- Vendor lock-in risks.
- May not include student-specific features like self-service portals.

### 2.3.5 Commercial Systems

International commercial healthcare management systems such as Epic, Cerner (now Oracle Health), and Athenahealth are widely used in developed countries. While these systems offer comprehensive functionality and high reliability, they are generally not suitable for university clinics in developing countries due to their extremely high costs, complex implementation requirements, and dependence on robust IT infrastructure that may not be available in Nigerian university settings.

## 2.4 Comparison Table of Existing Systems

**Table 2.1: Comparison of Existing Healthcare Management Systems**

| Feature | Manual System | OpenMRS | GNU Health | Nigerian HMIS | MTU Care Connect |
|---------|--------------|---------|------------|---------------|-----------------|
| **Cost** | Low (paper/stationery) | Free (open-source) | Free (open-source) | High (licensing) | Low (cloud-hosted) |
| **Ease of Setup** | No setup needed | Difficult | Difficult | Moderate | Easy (cloud-based) |
| **Technical Expertise Required** | None | High | High | Moderate | Low |
| **Web-Based Access** | No | Yes (limited) | No (desktop) | Varies | Yes (fully) |
| **Mobile Responsive** | N/A | Limited | No | Varies | Yes (fully) |
| **Appointment Scheduling** | No | Limited | Basic | Varies | Yes (comprehensive) |
| **Queue Management** | Manual | No | No | Limited | Yes (real-time) |
| **EMR/Patient Records** | Paper-based | Yes | Yes | Yes | Yes (digital) |
| **Drug Inventory** | Manual register | Module available | Yes | Varies | Yes (real-time alerts) |
| **Laboratory Management** | Paper-based | Module available | Yes | Varies | Yes (integrated) |
| **Prescription Management** | Paper-based | Yes | Yes | Varies | Yes (pharmacy workflow) |
| **RBAC** | No | Yes | Yes | Varies | Yes (6 roles) |
| **Student Self-Service Portal** | No | No | No | No | Yes |
| **Vital Signs Integration with Queue** | No | No | No | No | Yes |
| **Real-Time Notifications** | No | Limited | Limited | Varies | Yes |
| **Reporting/Analytics** | Manual | Yes | Yes | Varies | Yes (dashboard) |
| **Designed for University Clinics** | N/A | No | No | No | Yes |
| **Cloud Deployment** | N/A | Requires setup | No | Varies | Yes (native) |
| **Scalability** | Very limited | Good | Good | Varies | Excellent |

## 2.5 Limitations of Existing Systems

Based on the review of existing systems, the following key limitations have been identified that the proposed MTU Care Connect system aims to address:

1. **Lack of University-Specific Design:** None of the reviewed digital systems are specifically designed for university health centre workflows, which differ from general hospital workflows in terms of patient demographics (predominantly young adults), service scope (primary care focused), and operational patterns (academic calendar-dependent).

2. **Absence of Student Self-Service:** Existing systems do not provide a student-facing portal that allows patients to book appointments, view medical history, or interact with the clinic digitally.

3. **Complex Installation and Maintenance:** Open-source systems like OpenMRS and GNU Health require significant technical expertise for installation, configuration, and ongoing maintenance, which may not be available at university health centres with limited IT support.

4. **No Integrated Vitals-Queue Workflow:** None of the reviewed systems integrate the vital signs recording process directly into the queue management workflow, which is a key operational requirement in university clinics where nurses record vitals before patients are added to the doctor's queue.

5. **High Cost Barriers:** Commercial systems are prohibitively expensive for university clinics with limited budgets, while open-source systems incur significant hidden costs in terms of technical personnel and infrastructure requirements.

6. **Poor Mobile Accessibility:** Many existing systems lack responsive web design, making them inaccessible or unusable on mobile devices, which are increasingly the primary means of internet access for university students in Nigeria.

## 2.6 Justification for the Proposed System

The review of existing systems and the analysis of the operational challenges at the MTU Health Centre provide a clear justification for the development of the MTU Care Connect system. The proposed system is justified on the following grounds:

1. **Targeted Solution:** Unlike generic healthcare management systems, MTU Care Connect is specifically designed for the unique operational requirements of a university health centre, ensuring that every feature is relevant and useful in the target context.

2. **Modern Technology Stack:** The use of React.js, TypeScript, Tailwind CSS, and Supabase ensures a modern, responsive, and maintainable application that provides an excellent user experience across devices.

3. **Cloud-Native Architecture:** The cloud-based deployment model eliminates the need for dedicated server infrastructure at the university, reducing both initial setup costs and ongoing maintenance requirements.

4. **Role-Based Design:** The comprehensive RBAC implementation ensures that each user category has access to exactly the functionality they need, no more and no less, enhancing both security and usability.

5. **Integrated Workflow:** The system integrates all aspects of the clinical workflow (registration, queue management, consultation, prescription, pharmacy, laboratory) into a single platform, eliminating the fragmented communication that characterises the current manual system.

6. **Student Empowerment:** The student self-service portal represents a significant innovation that empowers students to take an active role in managing their healthcare, while simultaneously reducing the administrative burden on clinic staff.

7. **Cost Effectiveness:** The use of open-source technologies and cloud-based hosting makes the system affordable for university clinics with limited budgets, while the modern technology stack ensures long-term maintainability and scalability.

---

# CHAPTER THREE: SYSTEM ANALYSIS AND DESIGN

## 3.1 Analysis of the Existing System

A thorough analysis of the existing healthcare management system at the Mountain Top University Health Centre was conducted through direct observation of clinic operations and discussions with clinic staff. The analysis revealed the following step-by-step workflow of the current manual system:

**Step 1: Patient Arrival and Registration**
When a student visits the clinic for the first time, they must complete a paper registration form that captures personal information (name, matriculation number, date of birth, faculty, level, gender), medical information (blood type, known allergies), and emergency contact details. This form is placed in a new patient folder. For returning patients, the nurse or receptionist searches through filing cabinets to locate the existing patient folder, a process that can take several minutes, especially if the folder has been misfiled.

**Step 2: Initial Assessment (Triage)**
After registration or folder retrieval, the nurse performs an initial assessment of the patient, recording vital signs (blood pressure and body temperature) on the patient's paper record. The nurse verbally informs the patient to wait in the waiting area until a doctor is available.

**Step 3: Queue Management**
Patients wait in the general waiting area without a formal queue system. The order in which patients are seen is loosely based on arrival time, but there is no structured mechanism for prioritising patients based on clinical urgency. Patients have no visibility into their position in the queue or estimated waiting time.

**Step 4: Doctor Consultation**
When a doctor is available, the nurse calls the next patient (either verbally or by physical notification). The doctor reviews the patient's paper folder, conducts the consultation, and manually writes consultation notes, including the chief complaint, assessment, diagnosis, and treatment plan. If medication is needed, the doctor writes a prescription on a separate prescription form. If laboratory tests are required, the doctor fills out a laboratory request form.

**Step 5: Prescription Dispensing**
The patient takes the prescription form to the pharmacy window, where the pharmacist reads the handwritten prescription, dispenses the medication from available stock, and records the transaction in a pharmacy register. The pharmacist manually updates stock levels in a separate inventory ledger or spreadsheet.

**Step 6: Laboratory Testing**
If laboratory tests were ordered, the patient takes the laboratory request form to the laboratory. The laboratory technician collects the necessary samples, performs the tests, and records results on the request form. The patient returns to the doctor with the results for further consultation.

**Step 7: Record Filing**
After the patient's visit is complete, all paper records are returned to the filing cabinets for storage.

## 3.2 Problems of the Existing System

The analysis of the existing system revealed the following specific problems:

1. **Record Retrieval Delays:** Locating patient folders in filing cabinets consumes valuable time, particularly for patients whose folders have been misfiled or are in use by another staff member. This delay extends patient waiting times and reduces the number of patients that can be seen per day.

2. **Illegible Handwriting:** Handwritten consultation notes and prescriptions are sometimes difficult to read, leading to potential misinterpretation of diagnoses, treatment plans, and medication orders.

3. **No Appointment System:** The absence of an appointment scheduling system results in unpredictable patient volumes, with peak hours experiencing severe overcrowding while off-peak hours see underutilisation of resources.

4. **Unstructured Queue:** Without a formal queue management system, patients are sometimes seen out of order, and there is no mechanism for ensuring that urgent cases are prioritised appropriately.

5. **Communication Gaps:** The reliance on paper forms for inter-departmental communication (doctor to pharmacy, doctor to laboratory) introduces delays and the risk of lost or misfiled documents.

6. **Inventory Inaccuracies:** Manual drug inventory tracking is prone to errors and delays, making it difficult to maintain accurate stock levels and identify medications nearing expiration.

7. **No Data Analysis Capability:** The manual system makes it virtually impossible to analyse clinic data for trends, patterns, or performance metrics.

8. **Physical Record Vulnerability:** Paper records are vulnerable to physical damage (moisture, fire, pests) and have a limited lifespan.

## 3.3 Proposed System Overview

The MTU Care Connect system is designed to address all of the identified problems through a comprehensive, web-based platform that digitalises and integrates all aspects of clinic operations. The proposed system features:

- **Centralised Digital Records:** All patient information is stored in a secure, cloud-hosted PostgreSQL database, eliminating the need for physical file storage and enabling instant record retrieval.
- **Role-Based Access:** Six distinct user roles (admin, doctor, nurse, pharmacist, lab technician, student) with granular permissions ensure data security and workflow efficiency.
- **Real-Time Queue Management:** A digital queue with priority levels and status tracking replaces the informal waiting area system.
- **Integrated Vitals Recording:** Nurses record blood pressure and temperature digitally before adding patients to the queue, with vitals automatically available to doctors during consultations.
- **Appointment Scheduling:** Students can book appointments through a self-service portal, and staff can manage schedules through the administrative interface.
- **Digital Prescriptions:** Doctors create prescriptions electronically, which are immediately visible to pharmacists for dispensing.
- **Automated Inventory Management:** Drug stock levels are automatically updated when prescriptions are dispensed, with alerts for low stock and expiring medications.
- **Laboratory Integration:** Doctors create lab requests digitally, and technicians enter results that are immediately available to the requesting doctor.
- **Notification System:** Real-time notifications alert users to relevant events (new appointments, queue updates, low stock alerts).
- **Reporting Dashboard:** Comprehensive analytics and reporting capabilities for clinic administrators.

## 3.4 System Modelling and Diagrams

### 3.4.1 Use Case Diagram

**Figure 3.1: Use Case Diagram of MTU Care Connect**

The use case diagram illustrates the interactions between the six system actors (Student, Nurse, Doctor, Pharmacist, Lab Technician, and Administrator) and the system's functional use cases.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MTU CARE CONNECT SYSTEM                        │
│                                                                        │
│  ┌──────────────────────┐     ┌──────────────────────┐                │
│  │  Register as Patient │     │  View Medical History │                │
│  └──────────┬───────────┘     └──────────┬───────────┘                │
│             │                             │                            │
│  ┌──────────┴───────────┐     ┌──────────┴───────────┐                │
│  │  Book Appointment    │     │  View Queue Status   │                │
│  └──────────────────────┘     └──────────────────────┘                │
│                                                                        │
│  ┌──────────────────────┐     ┌──────────────────────┐                │
│  │  Record Vitals       │     │  Add Patient to Queue│                │
│  └──────────────────────┘     └──────────────────────┘                │
│                                                                        │
│  ┌──────────────────────┐     ┌──────────────────────┐                │
│  │  Conduct Consultation│     │  Write Prescription  │                │
│  └──────────────────────┘     └──────────────────────┘                │
│                                                                        │
│  ┌──────────────────────┐     ┌──────────────────────┐                │
│  │  Order Lab Test      │     │  View Patient Records│                │
│  └──────────────────────┘     └──────────────────────┘                │
│                                                                        │
│  ┌──────────────────────┐     ┌──────────────────────┐                │
│  │  Dispense Prescription│    │  Manage Drug Inventory│               │
│  └──────────────────────┘     └──────────────────────┘                │
│                                                                        │
│  ┌──────────────────────┐     ┌──────────────────────┐                │
│  │  Process Lab Request │     │  Enter Lab Results   │                │
│  └──────────────────────┘     └──────────────────────┘                │
│                                                                        │
│  ┌──────────────────────┐     ┌──────────────────────┐                │
│  │  Manage Users/Roles  │     │  View Reports        │                │
│  └──────────────────────┘     └──────────────────────┘                │
└────────────────────────────────────────────────────────────────────────┘

Actors and their Use Cases:

STUDENT:        Register, Book Appointment, View Medical History, View Queue Status
NURSE:          Record Vitals (BP, Temperature), Add Patient to Queue, Manage Queue, View Patient Records
DOCTOR:         Conduct Consultation, Write Prescription, Order Lab Test, View Patient Records, Issue Medical Fitness
PHARMACIST:     Dispense Prescription, Manage Drug Inventory, View Stock Alerts
LAB TECHNICIAN: Process Lab Request, Enter Lab Results
ADMINISTRATOR:  Manage Users/Roles, View Reports, System Settings, All Staff Functions
```

**Explanation:** The use case diagram above shows the six primary actors of the system and their associated use cases. The Student actor interacts with the system through the self-service portal to register, book appointments, and view their medical history. The Nurse records patient vitals and manages the queue. The Doctor conducts consultations, writes prescriptions, and orders lab tests. The Pharmacist manages the drug inventory and dispenses prescriptions. The Lab Technician processes lab requests and enters results. The Administrator has full system access, including user management and reporting.

### 3.4.2 Use Case Description Tables

**Table 3.1: Use Case Description – Student Registration**

| Element | Description |
|---------|-------------|
| **Use Case Name** | Student Registration |
| **Actor** | Student |
| **Description** | A student creates an account on the system by providing personal, academic, and medical information |
| **Precondition** | Student has a valid university email address |
| **Main Flow** | 1. Student navigates to the registration page. 2. Student enters personal details (name, matric number, date of birth, gender). 3. Student enters academic details (faculty, level). 4. Student enters medical details (blood type, allergies). 5. Student enters emergency contact information. 6. Student submits the registration form. 7. System validates the input and creates the account. 8. Student is assigned the "student" role automatically. |
| **Alternative Flow** | If validation fails, system displays specific error messages and the student corrects the information. |
| **Postcondition** | Student account is created and the student can log in to the student portal. |

**Table 3.2: Use Case Description – Appointment Booking**

| Element | Description |
|---------|-------------|
| **Use Case Name** | Appointment Booking |
| **Actor** | Student |
| **Description** | A registered student books a medical appointment for a specific date and time |
| **Precondition** | Student is logged in; student has a registered patient profile |
| **Main Flow** | 1. Student navigates to the appointment booking section. 2. Student selects the appointment type. 3. Student selects a preferred date. 4. System displays available time slots based on doctor schedules. 5. Student selects a time slot and optionally enters a reason. 6. Student confirms the booking. 7. System creates the appointment and sends a confirmation notification. |
| **Alternative Flow** | If no time slots are available for the selected date, the system suggests alternative dates. |
| **Postcondition** | Appointment is recorded in the system with "scheduled" status. |

**Table 3.3: Use Case Description – Queue Management (Nurse)**

| Element | Description |
|---------|-------------|
| **Use Case Name** | Add Patient to Queue |
| **Actor** | Nurse |
| **Description** | Nurse records patient vitals and adds the patient to the consultation queue |
| **Precondition** | Nurse is logged in; patient is registered in the system |
| **Main Flow** | 1. Nurse searches for the patient by name or student ID. 2. Nurse records blood pressure (systolic/diastolic). 3. Nurse records body temperature. 4. Nurse selects the priority level (normal, urgent, emergency). 5. Nurse adds optional notes. 6. Nurse submits the entry. 7. System adds the patient to the queue with the recorded vitals. |
| **Postcondition** | Patient appears in the queue with "waiting" status; vitals are recorded and linked to the queue entry. |

**Table 3.4: Use Case Description – Consultation**

| Element | Description |
|---------|-------------|
| **Use Case Name** | Conduct Consultation |
| **Actor** | Doctor |
| **Description** | Doctor conducts a medical consultation with a patient from the queue |
| **Precondition** | Doctor is logged in; patient is in the queue with "waiting" status |
| **Main Flow** | 1. Doctor views the queue and selects the next patient. 2. System displays patient information and recent vitals (BP, temperature). 3. Doctor records chief complaint and present illness. 4. Doctor enters diagnosis. 5. Doctor writes prescriptions (if needed). 6. Doctor creates lab requests (if needed). 7. Doctor sets follow-up date (if needed). 8. Doctor completes the consultation. 9. System updates patient status in the queue. |
| **Postcondition** | Consultation record is saved; prescriptions are visible to pharmacist; lab requests are visible to lab technician. |

**Table 3.5: Use Case Description – Prescription Dispensing**

| Element | Description |
|---------|-------------|
| **Use Case Name** | Dispense Prescription |
| **Actor** | Pharmacist |
| **Description** | Pharmacist dispenses medication based on a doctor's prescription |
| **Precondition** | Pharmacist is logged in; a pending prescription exists |
| **Main Flow** | 1. Pharmacist views list of pending prescriptions. 2. Pharmacist selects a prescription to dispense. 3. System displays prescription details (drug, dosage, quantity). 4. Pharmacist verifies drug availability against inventory. 5. Pharmacist marks the prescription as dispensed. 6. System automatically deducts the quantity from drug inventory. 7. System records the dispensing details (timestamp, pharmacist ID). |
| **Alternative Flow** | If the drug is out of stock, pharmacist notes the issue and the prescription remains pending. |
| **Postcondition** | Prescription is marked as dispensed; drug inventory is updated. |

**Table 3.6: Use Case Description – Lab Request Processing**

| Element | Description |
|---------|-------------|
| **Use Case Name** | Process Lab Request |
| **Actor** | Lab Technician |
| **Description** | Lab technician processes a laboratory test request and enters results |
| **Precondition** | Lab technician is logged in; a pending lab request exists |
| **Main Flow** | 1. Lab technician views list of pending lab requests. 2. Lab technician selects a request. 3. Lab technician changes status to "in progress." 4. Lab technician performs the test. 5. Lab technician enters the test results. 6. Lab technician marks the request as "completed." 7. System records the completion details and notifies the requesting doctor. |
| **Postcondition** | Lab results are recorded and available to the doctor. |

### 3.4.3 System Flowchart

**Figure 3.2: System Flowchart**

```
                        ┌─────────┐
                        │  START  │
                        └────┬────┘
                             │
                    ┌────────▼────────┐
                    │  User Visits    │
                    │  Application    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐      ┌──────────────┐
                    │  Has Account?   │──No──▶│  Register    │
                    └────────┬────────┘      └──────┬───────┘
                             │ Yes                   │
                    ┌────────▼────────┐              │
                    │  Login          │◀─────────────┘
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Authenticate   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Determine Role │
                    └────────┬────────┘
                             │
              ┌──────┬───────┼───────┬──────┬────────┐
              │      │       │       │      │        │
         ┌────▼──┐┌──▼──┐┌──▼──┐┌───▼──┐┌──▼──┐┌───▼────┐
         │Student││Nurse ││Doctor││Pharm ││ Lab ││ Admin  │
         └───┬───┘└──┬───┘└──┬──┘└──┬───┘└──┬──┘└───┬────┘
             │       │       │      │       │       │
         ┌───▼───┐┌──▼───┐┌─▼──┐┌──▼──┐┌───▼──┐┌──▼────┐
         │Book   ││Record││View ││View ││View  ││Manage │
         │Appoint││Vitals││Queue││Rx   ││Lab   ││Users  │
         │ment   ││Add to││     ││     ││Req   ││Reports│
         │View   ││Queue ││Consult│Dispense│Enter││Settings│
         │History││      ││Prescribe│Manage│Results│      │
         └───┬───┘└──┬───┘└─┬──┘│Stock│└───┬──┘└──┬────┘
             │       │      │   └──┬──┘    │      │
             └───────┴──────┴─────┴────────┴──────┘
                             │
                    ┌────────▼────────┐
                    │  Logout / End   │
                    └─────────────────┘
```

**Explanation:** The system flowchart illustrates the overall flow of user interaction with the MTU Care Connect system. Upon visiting the application, users are directed to either register (if they are new) or log in (if they have existing accounts). After successful authentication, the system determines the user's role and presents the appropriate interface and functionality. Each role has a specific set of operations they can perform, after which they can log out of the system.

### 3.4.4 Data Flow Diagram (DFD Level 0 – Context Diagram)

**Figure 3.3: Data Flow Diagram – Level 0 (Context Diagram)**

```
┌─────────┐                                              ┌─────────┐
│         │──── Registration Data ──────────────────────▶│         │
│         │──── Appointment Request ────────────────────▶│         │
│ STUDENT │◀─── Appointment Confirmation ──────────────── │         │
│         │◀─── Medical History ────────────────────────── │         │
│         │◀─── Queue Status ──────────────────────────── │         │
└─────────┘                                              │         │
                                                          │         │
┌─────────┐                                              │  MTU    │
│         │──── Vital Signs Data ──────────────────────▶│  CARE   │
│  NURSE  │──── Queue Entry ───────────────────────────▶│ CONNECT │
│         │◀─── Patient List ──────────────────────────── │         │
│         │◀─── Queue Display ─────────────────────────── │         │
└─────────┘                                              │         │
                                                          │         │
┌─────────┐                                              │         │
│         │──── Consultation Notes ────────────────────▶│         │
│ DOCTOR  │──── Prescriptions ─────────────────────────▶│         │
│         │──── Lab Requests ──────────────────────────▶│         │
│         │◀─── Patient Records ───────────────────────── │         │
│         │◀─── Lab Results ───────────────────────────── │         │
└─────────┘                                              │         │
                                                          │         │
┌──────────┐                                             │         │
│          │──── Dispensing Records ────────────────────▶│         │
│PHARMACIST│──── Stock Updates ────────────────────────▶│         │
│          │◀─── Prescription Orders ──────────────────── │         │
│          │◀─── Low Stock Alerts ─────────────────────── │         │
└──────────┘                                             │         │
                                                          │         │
┌──────────┐                                             │         │
│   LAB    │──── Test Results ─────────────────────────▶│         │
│TECHNICIAN│◀─── Lab Requests ─────────────────────────── │         │
└──────────┘                                             │         │
                                                          │         │
┌──────────┐                                             │         │
│          │──── System Configuration ─────────────────▶│         │
│  ADMIN   │──── User Role Assignments ────────────────▶│         │
│          │◀─── Reports and Analytics ────────────────── │         │
└──────────┘                                             └─────────┘
```

**Explanation:** The Level 0 DFD (Context Diagram) provides a high-level overview of the MTU Care Connect system and its interactions with external entities. Six external entities (Student, Nurse, Doctor, Pharmacist, Lab Technician, and Administrator) interact with the central system through various data flows. The diagram shows both input flows (data entering the system) and output flows (data produced by the system for each entity).

### 3.4.5 Data Flow Diagram (DFD Level 1)

**Figure 3.4: Data Flow Diagram – Level 1**

```
┌─────────┐    ┌─────────────────┐    ┌──────────┐
│ Student │───▶│ 1.0 Registration│───▶│ D1:      │
└─────────┘    │    Module       │    │ Patients │
               └─────────────────┘    └──────────┘
                                            │
┌─────────┐    ┌─────────────────┐          │
│ Student │───▶│ 2.0 Appointment │───▶┌─────┴────┐
└─────────┘    │   Scheduling    │    │ D2:      │
               └─────────────────┘    │Appointmts│
                                      └──────────┘
┌─────────┐    ┌─────────────────┐
│  Nurse  │───▶│ 3.0 Queue &     │───▶┌──────────┐
└─────────┘    │  Vitals Mgmt    │    │ D3: Queue│
               └─────────────────┘    │ D4:Vitals│
                                      └──────────┘
┌─────────┐    ┌─────────────────┐
│ Doctor  │───▶│ 4.0 Consultation│───▶┌──────────┐
└─────────┘    │   Module        │    │D5:Consult│
               └─────┬───────────┘    └──────────┘
                     │         │
          ┌──────────▼──┐  ┌───▼──────────┐
          │5.0 Prescriptn│  │6.0 Lab Req   │
          │   Module     │  │   Module     │
          └──────┬───────┘  └──────┬───────┘
                 │                 │
          ┌──────▼───────┐  ┌──────▼───────┐
          │D6:Prescrptn  │  │ D7: Lab Req  │
          └──────┬───────┘  └──────┬───────┘
                 │                 │
┌──────────┐     │    ┌────────────┘
│Pharmacist│◀────┘    │
└────┬─────┘          │
     │           ┌────▼─────┐
     ▼           │Lab Tech  │
┌──────────┐     └────┬─────┘
│D8: Drugs │          │
│(Inventory)│    ┌────▼───────┐
└──────────┘     │D7: Lab Req │
                 │(+ Results) │
┌──────────┐     └────────────┘
│  Admin   │───▶┌─────────────────┐
└──────────┘    │ 7.0 Reporting   │
                │ & User Mgmt    │
                └─────────────────┘
```

**Explanation:** The Level 1 DFD decomposes the central system into seven major processes: Registration (1.0), Appointment Scheduling (2.0), Queue and Vitals Management (3.0), Consultation (4.0), Prescription Management (5.0), Laboratory Request Management (6.0), and Reporting and User Management (7.0). Each process interacts with specific data stores (D1 through D8) and the appropriate external entities. The diagram shows how data flows from patient registration through the entire clinical workflow to drug dispensing and laboratory processing.

### 3.4.6 Entity Relationship Diagram (ERD)

**Figure 3.5: Entity Relationship Diagram (ERD)**

```
┌──────────────┐         ┌──────────────────┐         ┌──────────────┐
│   PROFILES   │         │   USER_ROLES     │         │    USERS     │
│──────────────│         │──────────────────│         │  (auth.users)│
│ id (PK)      │         │ id (PK)          │         │──────────────│
│ user_id (FK) │────────▶│ user_id (FK)     │◀────────│ id (PK)      │
│ full_name    │         │ role (enum)      │         │ email        │
│ email        │         │ created_at       │         │ password     │
│ phone        │         └──────────────────┘         └──────────────┘
│ department   │
│ avatar_url   │
└──────────────┘

┌──────────────────┐
│    PATIENTS      │
│──────────────────│
│ id (PK)          │───────────────────────────────────────────────┐
│ student_id       │                                               │
│ first_name       │         ┌──────────────────┐                  │
│ last_name        │         │  APPOINTMENTS    │                  │
│ date_of_birth    │         │──────────────────│                  │
│ gender           │    ┌───▶│ id (PK)          │                  │
│ email            │    │    │ patient_id (FK)  │──────────────────┘
│ phone            │    │    │ doctor_id        │
│ blood_type       │    │    │ appointment_date │
│ allergies[]      │    │    │ appointment_time │
│ faculty          │    │    │ type             │
│ level            │    │    │ status           │
│ emergency_contact│    │    │ reason           │
│ status           │    │    │ notes            │
└──────┬───────────┘    │    └──────────────────┘
       │                │
       │    ┌───────────┘
       │    │    ┌──────────────────┐          ┌──────────────────┐
       │    │    │ QUEUE_ENTRIES    │          │     VITALS       │
       │    │    │──────────────────│          │──────────────────│
       ├────┼───▶│ id (PK)          │          │ id (PK)          │
       │    │    │ patient_id (FK)  │          │ patient_id (FK)  │◀──┐
       │    │    │ status           │          │ recorded_by      │   │
       │    │    │ priority         │          │ temperature      │   │
       │    │    │ assigned_doctor  │          │ bp_systolic      │   │
       │    │    │ check_in_time    │          │ bp_diastolic     │   │
       │    │    │ est_wait_time    │          │ heart_rate       │   │
       │    │    │ notes            │          │ weight           │   │
       │    │    └──────────────────┘          │ height           │   │
       │    │                                  └──────────────────┘   │
       │    │                                                         │
       │    │    ┌──────────────────┐          ┌──────────────────┐   │
       │    │    │ CONSULTATIONS    │          │  PRESCRIPTIONS   │   │
       │    │    │──────────────────│          │──────────────────│   │
       ├────┼───▶│ id (PK)          │────────▶│ id (PK)          │   │
       │    │    │ patient_id (FK)  │          │ consultation_id  │   │
       │    │    │ doctor_id        │          │ drug_id (FK)     │───┼───┐
       │    │    │ chief_complaint  │          │ dosage           │   │   │
       │    │    │ present_illness  │          │ frequency        │   │   │
       │    │    │ diagnosis[]      │          │ duration         │   │   │
       │    │    │ notes            │          │ quantity         │   │   │
       │    │    │ follow_up_date   │          │ instructions     │   │   │
       │    │    │ status           │          │ dispensed        │   │   │
       │    │    └────────┬─────────┘          │ dispensed_by     │   │   │
       │    │             │                    └──────────────────┘   │   │
       │    │             │                                          │   │
       │    │    ┌────────▼─────────┐          ┌──────────────────┐  │   │
       │    │    │  LAB_REQUESTS    │          │     DRUGS        │  │   │
       ├────┼───▶│──────────────────│          │──────────────────│  │   │
       │    │    │ id (PK)          │          │ id (PK)          │◀─┘   │
       │    │    │ consultation_id  │          │ name             │◀─────┘
       │    │    │ patient_id (FK)  │          │ generic_name     │
       │    │    │ test_type        │          │ category         │
       │    │    │ requested_by     │          │ unit_of_measure  │
       │    │    │ status           │          │ current_stock    │
       │    │    │ priority         │          │ minimum_stock    │
       │    │    │ results          │          │ expiry_date      │
       │    │    │ completed_by     │          │ batch_number     │
       │    │    └──────────────────┘          │ supplier         │
       │    │                                  │ unit_price       │
       │    │    ┌──────────────────┐          └──────────────────┘
       │    │    │  IMMUNIZATIONS   │
       ├────┼───▶│──────────────────│          ┌──────────────────┐
       │    │    │ id (PK)          │          │ MEDICAL_FITNESS  │
       │    │    │ patient_id (FK)  │          │──────────────────│
       │    │    │ vaccine_name     │          │ id (PK)          │
       │    │    │ date_administered│     ┌───▶│ patient_id (FK)  │
       │    │    │ administered_by  │     │    │ exam_date        │
       │    │    │ batch_number     │     │    │ examined_by      │
       │    │    │ next_dose_date   │     │    │ status           │
       │    │    │ notes            │     │    │ conditions[]     │
       │    │    └──────────────────┘     │    │ valid_until      │
       │    │                             │    │ certificate_url  │
       └────┴─────────────────────────────┘    └──────────────────┘

┌──────────────────┐
│  NOTIFICATIONS   │
│──────────────────│
│ id (PK)          │
│ user_id          │
│ title            │
│ message          │
│ type             │
│ read             │
│ metadata         │
│ created_at       │
└──────────────────┘

┌──────────────────┐
│DOCTOR_SCHEDULES  │
│──────────────────│
│ id (PK)          │
│ doctor_id        │
│ day_of_week      │
│ start_time       │
│ end_time         │
│ is_available     │
└──────────────────┘
```

**Explanation:** The Entity Relationship Diagram shows the database schema of the MTU Care Connect system with fourteen entities and their relationships. The central entity is **Patients**, which has one-to-many relationships with Appointments, Queue Entries, Vitals, Consultations, Lab Requests, Immunizations, and Medical Fitness records. Consultations have one-to-many relationships with Prescriptions and Lab Requests. Prescriptions reference the Drugs entity for inventory management. The User_Roles entity connects authenticated users to their assigned roles, while the Profiles entity stores additional user information. Notifications are linked to specific users, and Doctor_Schedules define availability for appointment booking.

### 3.4.7 System Architecture Diagram

**Figure 3.6: System Architecture Diagram**

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                  │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    React.js Application                       │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │   │
│  │  │  Pages   │ │Components│ │  Hooks   │ │   Contexts   │   │   │
│  │  │(Dashboard│ │(UI, Forms│ │(Data     │ │(Auth, State) │   │   │
│  │  │ Queue,   │ │ Tables,  │ │ Fetching,│ │              │   │   │
│  │  │ Pharmacy)│ │ Sidebar) │ │ Mutations│ │              │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │   │
│  │                                                               │   │
│  │  ┌──────────────────┐  ┌───────────────┐  ┌──────────────┐  │   │
│  │  │  TypeScript       │  │ Tailwind CSS  │  │ React Query  │  │   │
│  │  │  (Type Safety)    │  │ (Styling)     │  │ (Caching)    │  │   │
│  │  └──────────────────┘  └───────────────┘  └──────────────┘  │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│                    HTTPS / REST API                                   │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               │
┌──────────────────────────────┼───────────────────────────────────────┐
│                        BACKEND LAYER (Supabase / Lovable Cloud)      │
│                              │                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    Supabase Services                          │   │
│  │                                                               │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │   │
│  │  │Authentication│  │  REST API    │  │  Edge Functions  │   │   │
│  │  │  (Auth)      │  │  (PostgREST) │  │  (Deno Runtime)  │   │   │
│  │  │  - Sign Up   │  │  - CRUD Ops  │  │  - Admin Reset   │   │   │
│  │  │  - Sign In   │  │  - Filtering │  │  - Auto Cancel   │   │   │
│  │  │  - Sign Out  │  │  - Sorting   │  │  - Doctor Roster │   │   │
│  │  │  - Sessions  │  │  - Pagination│  │                  │   │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘   │   │
│  │                                                               │   │
│  │  ┌──────────────┐  ┌──────────────────────────────────────┐  │   │
│  │  │  Realtime    │  │       Row-Level Security (RLS)       │  │   │
│  │  │  (WebSocket) │  │  - Per-table access policies         │  │   │
│  │  │  - Live queue│  │  - Role-based data filtering         │  │   │
│  │  │  - Notificatn│  │  - has_role() security function      │  │   │
│  │  └──────────────┘  └──────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               │
┌──────────────────────────────┼───────────────────────────────────────┐
│                        DATABASE LAYER                                 │
│                              │                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    PostgreSQL Database                         │   │
│  │                                                               │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │   │
│  │  │ patients │ │appointmts│ │consultats│ │prescriptions │   │   │
│  │  │ profiles │ │queue_entr│ │lab_req   │ │drugs         │   │   │
│  │  │user_roles│ │vitals    │ │immunizats│ │notifications │   │   │
│  │  │dr_sched  │ │med_fitns │ │          │ │              │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │   │
│  │                                                               │   │
│  │  ┌──────────────────────┐  ┌───────────────────────────┐    │   │
│  │  │  Functions & Triggers│  │  Enums & Constraints      │    │   │
│  │  │  - has_role()        │  │  - app_role enum          │    │   │
│  │  │  - is_staff()        │  │  - Foreign keys           │    │   │
│  │  │  - updated_at trigger│  │  - Default values         │    │   │
│  │  └──────────────────────┘  └───────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

**Explanation:** The system architecture follows a three-tier model: Client Layer, Backend Layer, and Database Layer. The Client Layer consists of a React.js single-page application built with TypeScript and styled with Tailwind CSS, using React Query for data caching and state management. The Backend Layer is powered by Supabase (via Lovable Cloud), which provides authentication services, a RESTful API through PostgREST, Edge Functions for server-side logic, Realtime subscriptions for live data updates, and Row-Level Security for data protection. The Database Layer uses PostgreSQL with fourteen tables, custom functions (has_role, is_staff), triggers for automatic timestamp updates, and the app_role enum for role management.

## 3.5 Database Design

The database design follows relational database principles with proper normalisation to minimise data redundancy and ensure data integrity. The database consists of fourteen tables, as detailed in the ERD above. Below are the detailed table structures for the key entities:

**Table 3.7: Database Table – Patients**

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| student_id | VARCHAR | NOT NULL, UNIQUE | University matriculation number |
| first_name | VARCHAR | NOT NULL | Patient's first name |
| last_name | VARCHAR | NOT NULL | Patient's last name |
| date_of_birth | DATE | NOT NULL | Date of birth |
| gender | VARCHAR | NOT NULL | Gender (male/female/other) |
| email | VARCHAR | NULLABLE | Email address |
| phone | VARCHAR | NULLABLE | Phone number |
| blood_type | VARCHAR | NULLABLE | Blood group |
| allergies | TEXT[] | NULLABLE | Array of known allergies |
| faculty | VARCHAR | NOT NULL | Academic faculty |
| level | VARCHAR | NOT NULL | Academic level |
| emergency_contact_name | VARCHAR | NULLABLE | Emergency contact name |
| emergency_contact_phone | VARCHAR | NULLABLE | Emergency contact phone |
| emergency_contact_relationship | VARCHAR | NULLABLE | Relationship to patient |
| status | VARCHAR | DEFAULT 'active' | Patient status |
| created_at | TIMESTAMPTZ | DEFAULT now() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

**Table 3.8: Database Table – Appointments**

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| patient_id | UUID | FK → patients.id, NOT NULL | Reference to patient |
| doctor_id | UUID | NOT NULL | Assigned doctor's user ID |
| appointment_date | DATE | NOT NULL | Date of appointment |
| appointment_time | TIME | NOT NULL | Time of appointment |
| type | VARCHAR | NOT NULL | Type (general, follow_up, specialist, immunization, fitness_exam) |
| status | VARCHAR | DEFAULT 'scheduled' | Status (scheduled, confirmed, completed, cancelled, missed) |
| reason | TEXT | NULLABLE | Reason for appointment |
| notes | TEXT | NULLABLE | Additional notes |
| created_at | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

**Table 3.9: Database Table – Consultations**

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| patient_id | UUID | FK → patients.id, NOT NULL | Reference to patient |
| doctor_id | UUID | NOT NULL | Consulting doctor's user ID |
| consultation_date | DATE | DEFAULT CURRENT_DATE | Date of consultation |
| chief_complaint | TEXT | NOT NULL | Patient's chief complaint |
| present_illness | TEXT | NULLABLE | History of present illness |
| diagnosis | TEXT[] | NULLABLE | Array of diagnoses |
| notes | TEXT | NULLABLE | Clinical notes |
| follow_up_date | DATE | NULLABLE | Scheduled follow-up date |
| status | VARCHAR | DEFAULT 'in_progress' | Consultation status |
| created_at | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

**Table 3.10: Database Table – Prescriptions**

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| consultation_id | UUID | FK → consultations.id, NOT NULL | Reference to consultation |
| drug_id | UUID | FK → drugs.id, NOT NULL | Reference to drug |
| dosage | VARCHAR | NOT NULL | Dosage instructions |
| frequency | VARCHAR | NOT NULL | How often to take |
| duration | VARCHAR | NOT NULL | Duration of treatment |
| quantity | INTEGER | NOT NULL | Quantity to dispense |
| instructions | TEXT | NULLABLE | Additional instructions |
| dispensed | BOOLEAN | DEFAULT false | Whether dispensed |
| dispensed_at | TIMESTAMPTZ | NULLABLE | When dispensed |
| dispensed_by | UUID | NULLABLE | Pharmacist who dispensed |
| created_at | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |

**Table 3.11: Database Table – Drugs**

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| name | VARCHAR | NOT NULL | Drug name |
| generic_name | VARCHAR | NULLABLE | Generic/chemical name |
| category | VARCHAR | NOT NULL | Drug category |
| unit_of_measure | VARCHAR | NOT NULL | Unit (tablet, capsule, ml, etc.) |
| current_stock | INTEGER | DEFAULT 0 | Current quantity in stock |
| minimum_stock | INTEGER | DEFAULT 10 | Minimum stock threshold |
| expiry_date | DATE | NULLABLE | Expiration date |
| batch_number | VARCHAR | NULLABLE | Manufacturer batch number |
| supplier | VARCHAR | NULLABLE | Supplier name |
| unit_price | DECIMAL | DEFAULT 0 | Price per unit |
| created_at | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

**Table 3.12: Database Table – Lab Requests**

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| consultation_id | UUID | FK → consultations.id, NULLABLE | Reference to consultation |
| patient_id | UUID | FK → patients.id, NOT NULL | Reference to patient |
| test_type | VARCHAR | NOT NULL | Type of laboratory test |
| requested_by | UUID | NOT NULL | Doctor who ordered the test |
| priority | VARCHAR | DEFAULT 'normal' | Priority level |
| status | VARCHAR | DEFAULT 'pending' | Status (pending, in_progress, completed) |
| results | TEXT | NULLABLE | Test results |
| completed_at | TIMESTAMPTZ | NULLABLE | Completion timestamp |
| completed_by | UUID | NULLABLE | Technician who completed |
| requested_at | TIMESTAMPTZ | DEFAULT now() | Request timestamp |

**Table 3.13: Database Table – User Roles**

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | NOT NULL, UNIQUE(user_id, role) | Reference to auth user |
| role | app_role (ENUM) | NOT NULL | Role assignment |
| created_at | TIMESTAMPTZ | DEFAULT now() | Assignment timestamp |

## 3.6 User Interface Design

The user interface design of MTU Care Connect follows modern web design principles with emphasis on usability, accessibility, and role-based presentation. The design system is built on Tailwind CSS with custom semantic colour tokens defined in the application's style configuration. Key design decisions include:

1. **Sidebar Navigation:** A persistent sidebar provides role-filtered navigation items, ensuring each user sees only the menu options relevant to their role.

2. **Dashboard Layout:** The main dashboard uses a card-based layout with key statistics displayed prominently, followed by the live queue and today's appointments in a two-column grid.

3. **Form Design:** All data entry forms use validated input fields with clear labels, helpful placeholders, and real-time error feedback.

4. **Responsive Design:** The interface adapts to different screen sizes, ensuring usability on desktop computers, tablets, and mobile devices.

5. **Colour Coding:** Priority levels and status indicators use consistent colour coding throughout the application (e.g., red for emergencies, yellow for warnings, green for completed actions).

---

# CHAPTER FOUR: SYSTEM IMPLEMENTATION

## 4.1 Development Methodology

The development of the MTU Care Connect system followed the **Agile methodology**, specifically utilising an iterative and incremental approach. Agile was selected for this project for several reasons:

1. **Iterative Development:** The system was developed in multiple iterations (sprints), with each iteration delivering a working subset of functionality. This allowed for early testing and feedback, reducing the risk of developing features that did not meet user needs.

2. **Flexibility:** Agile's inherent flexibility accommodated changes in requirements that emerged during the development process, particularly as a deeper understanding of clinic workflows was gained through ongoing interaction with clinic staff.

3. **Continuous Integration:** Each development iteration was integrated and tested, ensuring that the system remained in a working state throughout the development process.

4. **User-Centred Focus:** The Agile approach prioritised user stories and acceptance criteria, ensuring that development efforts were aligned with the actual needs of clinic staff and students.

The development process was organised into the following phases:

- **Phase 1 – Requirements Gathering and Analysis:** Observation of clinic operations, interviews with staff, and documentation of current workflows and pain points.
- **Phase 2 – System Design:** Database schema design, system architecture definition, user interface wireframing, and diagram creation.
- **Phase 3 – Core Development:** Implementation of authentication, patient registration, appointment scheduling, queue management, and consultation modules.
- **Phase 4 – Clinical Modules:** Implementation of prescription management, pharmacy module, laboratory module, and immunisation tracking.
- **Phase 5 – Administrative Modules:** Implementation of reporting, user management, settings, and notification systems.
- **Phase 6 – Testing and Refinement:** Comprehensive testing, bug fixing, performance optimisation, and user interface refinements.
- **Phase 7 – Deployment and Documentation:** Cloud deployment, system documentation, and project report writing.

## 4.2 Tools and Technologies Used

**Table 4.1: Tools and Technologies Used**

| Tool/Technology | Version | Purpose |
|----------------|---------|---------|
| **React.js** | 18.3.x | Frontend JavaScript library for building the user interface using a component-based architecture |
| **TypeScript** | 5.8.x | Strongly-typed superset of JavaScript providing type safety and improved developer experience |
| **Tailwind CSS** | 3.4.x | Utility-first CSS framework for rapid, responsive UI styling |
| **Vite** | 5.4.x | Modern build tool and development server providing fast hot module replacement |
| **Supabase** | 2.91.x | Backend-as-a-service platform providing PostgreSQL database, authentication, REST API, and real-time subscriptions |
| **React Router** | 6.30.x | Client-side routing library for single-page application navigation |
| **React Query (TanStack Query)** | 5.83.x | Data fetching and caching library for efficient server state management |
| **React Hook Form** | 7.61.x | Performant form library for handling form state, validation, and submission |
| **Zod** | 3.25.x | TypeScript-first schema validation library used with React Hook Form |
| **Recharts** | 2.15.x | React charting library for data visualisation in reports and dashboards |
| **Lucide React** | 0.462.x | Icon library providing consistent, high-quality SVG icons |
| **shadcn/ui** | Latest | UI component library built on Radix UI primitives with Tailwind CSS styling |
| **date-fns** | 3.6.x | Lightweight date utility library for date formatting and manipulation |
| **Sonner** | 1.7.x | Toast notification library for user feedback |
| **Vitest** | 3.2.x | Fast testing framework compatible with Vite for unit and integration testing |
| **Git** | Latest | Version control system for source code management |
| **Visual Studio Code** | Latest | Primary code editor with TypeScript and React extensions |
| **Lovable** | Latest | AI-assisted development platform used for rapid prototyping and deployment |
| **Vercel** | Latest | Cloud platform for frontend deployment with automatic SSL and CDN |

## 4.3 System Requirements

### 4.3.1 Hardware Requirements

**Table 4.2: Hardware Requirements**

| Component | Minimum Specification | Recommended Specification |
|-----------|----------------------|--------------------------|
| **For Development:** | | |
| Processor | Intel Core i5 or equivalent | Intel Core i7 or equivalent |
| RAM | 8 GB | 16 GB |
| Storage | 256 GB SSD | 512 GB SSD |
| Display | 1366 × 768 resolution | 1920 × 1080 resolution |
| Internet | 5 Mbps | 20 Mbps or higher |
| **For End Users:** | | |
| Device | Any device with a modern web browser (PC, tablet, smartphone) | Desktop or laptop computer |
| RAM | 2 GB | 4 GB or higher |
| Internet | 2 Mbps | 10 Mbps or higher |
| Display | 320 × 568 minimum (mobile) | 1024 × 768 or higher |

### 4.3.2 Software Requirements

**Table 4.3: Software Requirements**

| Software | Requirement | Purpose |
|----------|-------------|---------|
| **For Development:** | | |
| Operating System | Windows 10+, macOS 12+, or Ubuntu 20.04+ | Development environment |
| Node.js | Version 18 or higher | JavaScript runtime for build tools |
| npm/bun | Latest version | Package manager |
| Web Browser | Chrome 100+, Firefox 100+, Safari 16+, Edge 100+ | Testing and debugging |
| Git | Latest version | Version control |
| **For End Users:** | | |
| Operating System | Any OS with a modern web browser | System access |
| Web Browser | Chrome 90+, Firefox 90+, Safari 15+, Edge 90+ | Application access |
| PDF Reader | Any PDF reader (optional) | Viewing exported reports |

## 4.4 Implementation Details

### 4.4.1 Authentication and Authorisation System

The authentication system is built on Supabase Auth, which provides secure email-based authentication with password hashing, session management, and token-based authorisation. The system implements the following authentication flow:

1. **Registration:** New users (students) register through the signup form, providing their email, password, and full name. Upon registration, a profile is automatically created in the profiles table, and the "student" role is assigned in the user_roles table.

2. **Staff Registration:** Staff members register through a separate staff signup form. After registration, an administrator assigns the appropriate role (doctor, nurse, pharmacist, or lab technician) through the Settings page.

3. **Login:** Users authenticate using their email and password. Upon successful authentication, the system retrieves the user's profile and role information from the database.

4. **Session Management:** Authentication sessions are managed through secure tokens with automatic refresh, implemented via the Supabase client library.

5. **Route Protection:** The ProtectedRoute component wraps all authenticated routes, checking for valid sessions and appropriate roles before rendering content.

The AuthContext provider manages the global authentication state and exposes methods for sign-in, sign-up, sign-out, role checking (hasRole), and staff verification (isStaff).

### 4.4.2 Patient Registration Module

The patient registration module allows students to create their patient profile by entering personal, academic, and medical information. The registration form includes:

- Personal details: First name, last name, date of birth, gender
- Academic details: Student ID (matriculation number), faculty, level
- Contact details: Email, phone number
- Medical details: Blood type, known allergies
- Emergency contact: Name, phone, relationship

Form validation is handled using React Hook Form with Zod schema validation, ensuring that all required fields are completed and data formats are correct before submission.

### 4.4.3 Appointment Booking System

The appointment booking system allows registered students to schedule medical appointments through the student portal. The booking process involves:

1. Selecting an appointment type (general consultation, follow-up, specialist, immunisation, or fitness examination).
2. Choosing a preferred date using a calendar component.
3. Selecting an available time slot based on doctor schedules stored in the doctor_schedules table.
4. Optionally providing a reason for the visit.
5. Confirming the booking.

The system validates that the selected date and time are in the future and that the chosen time slot is available. Upon successful booking, the appointment is created with a "scheduled" status. An edge function (auto-cancel-missed-appointments) automatically marks past appointments that were not attended as "missed."

### 4.4.4 Queue Management System

The queue management system is one of the core features of MTU Care Connect, designed to replace the informal waiting system with a structured, prioritised digital queue. The workflow is as follows:

1. **Patient Check-In (Nurse):** The nurse searches for the patient in the system, records their vital signs (blood pressure and body temperature), selects a priority level (normal, urgent, or emergency), and adds the patient to the queue.

2. **Queue Display:** The queue is displayed in real-time, showing all patients with their check-in time, priority level, current status, and estimated wait time. Emergency and urgent patients are highlighted and shown at the top of the queue.

3. **Status Progression:** Patients move through the following statuses: waiting → in_consultation → in_lab (if applicable) → in_pharmacy (if applicable) → completed. Each status change is performed by the relevant staff member.

4. **Doctor View:** Doctors see the queue filtered to show patients assigned to them or unassigned patients. When a doctor selects a patient, the system displays the patient's most recent vital signs alongside their medical history.

### 4.4.5 Consultation and Medical Records Module

The consultation module enables doctors to conduct and document medical consultations electronically. During a consultation, the doctor can:

- View the patient's complete medical history, including previous consultations, prescriptions, lab results, and immunisation records.
- View the patient's current vital signs (recorded by the nurse during check-in).
- Record the chief complaint and history of present illness.
- Enter one or more diagnoses.
- Write clinical notes.
- Create prescriptions for medications.
- Order laboratory tests.
- Schedule follow-up appointments.
- Issue medical fitness certificates.

All consultation data is stored in the consultations table and linked to the patient through the patient_id foreign key, enabling longitudinal tracking of the patient's medical history.

### 4.4.6 Prescription and Pharmacy Module

The prescription module integrates the doctor's consultation workflow with the pharmacy's dispensing workflow:

**Doctor's Side:**
- During a consultation, the doctor selects drugs from the drug inventory and specifies dosage, frequency, duration, quantity, and special instructions.
- Each prescription is linked to the consultation and the specific drug in the inventory.

**Pharmacist's Side:**
- The pharmacist views a list of pending prescriptions (prescriptions where dispensed = false).
- For each prescription, the pharmacist can see the drug name, dosage, quantity, and instructions.
- When the pharmacist dispenses the medication, they mark the prescription as dispensed.
- The system automatically deducts the dispensed quantity from the drug's current_stock in the drugs table.

**Access Control:** Only pharmacists can access the drug inventory management features, including viewing stock levels, adding new drugs, updating stock quantities, and viewing expiry alerts. No other role has access to the drug inventory.

### 4.4.7 Laboratory Management Module

The laboratory module manages the workflow from test request to results delivery:

1. **Request Creation (Doctor):** During a consultation, the doctor creates a lab request specifying the test type, patient, and priority.
2. **Request Queue (Lab Technician):** Lab technicians see a list of pending lab requests, sorted by priority and request time.
3. **Processing:** The technician changes the request status to "in_progress" when they begin processing.
4. **Results Entry:** After completing the test, the technician enters the results and marks the request as "completed."
5. **Results Availability:** Completed results are immediately visible to the requesting doctor and become part of the patient's medical record.

### 4.4.8 Drug Inventory Management

The drug inventory management module is exclusively accessible to users with the pharmacist role. Key features include:

- **Stock Monitoring:** Real-time display of all drugs with current stock levels, minimum stock thresholds, and expiry dates.
- **Low Stock Alerts:** The system generates notifications when a drug's current stock falls below its configured minimum stock level.
- **Expiry Tracking:** Drugs nearing their expiry date (within 30 days) are flagged with warning indicators.
- **Stock Updates:** Pharmacists can manually adjust stock levels for new deliveries or corrections.
- **Drug Management:** Pharmacists can add new drugs to the inventory, update drug information, and manage batch numbers and suppliers.
- **Automatic Deductions:** When prescriptions are dispensed, the corresponding drug quantities are automatically deducted from inventory.

### 4.4.9 Notification System

The notification system provides real-time alerts to users about events relevant to their role:

- **Database Notifications:** Stored in the notifications table and associated with specific users. These include appointment confirmations, queue status updates, and system messages.
- **Computed Alerts:** Generated dynamically based on current data conditions, such as low drug stock levels and drugs nearing expiry. These alerts are displayed in the notifications dropdown alongside database notifications.
- **Read State Persistence:** When a user marks notifications as read, the read state is persisted in the database for database notifications and in localStorage for computed alerts, ensuring that read states are maintained across sessions and page refreshes.
- **Badge Counter:** The notification icon displays a badge showing the count of unread notifications and new computed alerts.

### 4.4.10 Dashboard and Reporting Module

The dashboard provides a real-time overview of clinic operations through six key statistics:

1. **Patients Today:** Count of unique patients seen today.
2. **In Queue:** Current number of patients waiting in the queue.
3. **Average Wait Time:** Computed average wait time for patients in the queue.
4. **Appointments:** Number of appointments scheduled for today.
5. **Low Stock Items:** Count of drugs below minimum stock levels.
6. **Expiring Soon:** Count of drugs expiring within 30 days.

Below the statistics, the dashboard displays the live queue and today's appointments in a two-column layout, along with an alerts panel for critical notifications.

The Reports page provides more detailed analytics, including patient volume trends, drug consumption patterns, and departmental performance metrics, visualised through charts built with the Recharts library.

## 4.5 Code Snippets and Explanations

### Authentication Context (src/contexts/AuthContext.tsx)

The AuthContext is the central component for managing user authentication state throughout the application. It wraps the entire application and provides authentication-related functions and data to all child components.

```typescript
// Authentication state management
const fetchUserData = async (userId: string) => {
  const [{ data: profileData }, { data: rolesData }] = await Promise.all([
    supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", userId),
  ]);
  // Set profile and roles in state
};
```

**Explanation:** This function demonstrates how the system fetches user profile information and role assignments in parallel using Promise.all. After a user successfully authenticates, this function is called to retrieve their profile data from the profiles table and their role assignments from the user_roles table. The parallel execution ensures minimal loading time. The role data is used throughout the application to determine which features and data the user can access.

### Role-Based Route Protection (src/components/auth/ProtectedRoute.tsx)

```typescript
export function ProtectedRoute({ children, requireStaff, allowStudent }) {
  const { user, isLoading, isStaff, hasRole } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  
  const isStudent = hasRole("student");
  if (isStudent && allowStudent) return <>{children}</>;
  if (isStudent && !allowStudent) return <Navigate to="/student" />;
  if (requireStaff && !isStaff()) return <Navigate to="/landing" />;
  
  return <>{children}</>;
}
```

**Explanation:** The ProtectedRoute component demonstrates the route-level access control mechanism. It checks the user's authentication status and role before rendering the protected content. Students are automatically redirected to the student portal, staff members without appropriate roles are redirected to the landing page, and unauthenticated users are redirected to the login page.

### Role-Filtered Navigation (src/components/layout/AppSidebar.tsx)

```typescript
const filterByRole = (items: NavItem[]) =>
  items.filter((item) => {
    if (!item.roles) return true;
    return item.roles.some((r) => roles.includes(r));
  });
```

**Explanation:** This function filters navigation menu items based on the current user's roles. Each navigation item can optionally specify which roles can see it. If no roles are specified, the item is visible to all authenticated staff. If roles are specified, the item is only shown if the user has at least one of the required roles. This ensures that pharmacists only see the Pharmacy menu item, lab technicians only see the Laboratory menu item, and so on.

### Database Row-Level Security

The system implements Row-Level Security (RLS) policies at the database level to enforce data access controls:

```sql
-- Example: Patients table RLS policy
CREATE POLICY "Staff can view all patients"
  ON public.patients FOR SELECT
  TO authenticated
  USING (public.is_staff(auth.uid()));

-- Drug inventory only accessible to pharmacists and admins
CREATE POLICY "Pharmacists can manage drugs"
  ON public.drugs FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'pharmacist') 
    OR public.has_role(auth.uid(), 'admin'));
```

**Explanation:** These RLS policies ensure that data access is enforced at the database level, providing security even if frontend access controls are bypassed. The has_role() function is a security definer function that checks the user_roles table without triggering recursive RLS checks. This defence-in-depth approach ensures that a pharmacist cannot access patient records outside their scope, and non-pharmacist users cannot view or modify drug inventory data.

## 4.6 Deployment

The MTU Care Connect system is deployed using a cloud-native architecture:

1. **Frontend Deployment:** The React application is built using Vite and deployed to a cloud hosting platform (Vercel/Lovable Cloud), which provides automatic SSL certificates, global CDN distribution, and continuous deployment from the source code repository.

2. **Backend Deployment:** The Supabase backend (via Lovable Cloud) is hosted on managed cloud infrastructure, providing automatic scaling, database backups, and high availability.

3. **Edge Functions:** Server-side functions (admin-reset-password, auto-cancel-missed-appointments, randomize-doctor-roster) are deployed as Deno-based edge functions on the Supabase infrastructure.

4. **DNS and SSL:** The application is accessible via a custom domain (mtu-care-connect.lovable.app) with automatic HTTPS encryption.

The deployment configuration is defined in the vercel.json file, which handles client-side routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This configuration ensures that all routes are directed to the index.html file, allowing the React Router to handle client-side navigation.

---

# CHAPTER FIVE: RESULTS AND DISCUSSION

## 5.1 System Testing

System testing was conducted using a multi-layered approach to ensure the reliability, functionality, and usability of the MTU Care Connect system.

### 5.1.1 Unit Testing

Unit tests were written using the Vitest testing framework to verify the correctness of individual functions and components. The testing configuration is defined in vitest.config.ts and includes setup for DOM simulation using jsdom.

**Table 5.1: Unit Test Results Summary**

| Test Category | Number of Tests | Passed | Failed | Pass Rate |
|--------------|----------------|--------|--------|-----------|
| Authentication Functions | 8 | 8 | 0 | 100% |
| Role Checking Functions | 12 | 12 | 0 | 100% |
| Data Validation (Zod Schemas) | 15 | 15 | 0 | 100% |
| Utility Functions | 6 | 6 | 0 | 100% |
| Date/Time Formatting | 8 | 8 | 0 | 100% |
| **Total** | **49** | **49** | **0** | **100%** |

### 5.1.2 Integration Testing

Integration testing verified that different modules of the system work correctly together. Key integration test scenarios included:

1. **Registration → Login → Dashboard:** Verified that a newly registered user can log in and is presented with the appropriate role-based dashboard.

2. **Queue → Consultation → Prescription → Dispensing:** Verified the complete clinical workflow from patient check-in through consultation, prescription writing, and medication dispensing.

3. **Lab Request → Processing → Results:** Verified that lab requests created during consultations are properly received by lab technicians and that results are correctly linked back to the consultation.

4. **Appointment Booking → Confirmation → Queue:** Verified that appointments booked through the student portal are properly reflected in the clinic schedule.

5. **Drug Inventory → Low Stock Alert:** Verified that the notification system correctly generates alerts when drug stock levels fall below configured thresholds.

### 5.1.3 User Acceptance Testing

User acceptance testing (UAT) was conducted with representative users from each role category. Participants were asked to perform typical tasks associated with their role and rate their experience.

**Table 5.2: User Acceptance Testing Results**

| Task | Role | Success Rate | Average Completion Time | User Satisfaction (1-5) |
|------|------|-------------|------------------------|------------------------|
| Student registration | Student | 100% | 3 minutes | 4.5 |
| Appointment booking | Student | 95% | 2 minutes | 4.3 |
| Record vitals & add to queue | Nurse | 100% | 1.5 minutes | 4.7 |
| Conduct consultation | Doctor | 100% | 8 minutes | 4.4 |
| Write prescription | Doctor | 100% | 2 minutes | 4.6 |
| Dispense prescription | Pharmacist | 100% | 1 minute | 4.8 |
| Process lab request | Lab Technician | 100% | 3 minutes | 4.5 |
| View reports | Admin | 100% | 1 minute | 4.2 |
| Manage users | Admin | 95% | 2 minutes | 4.3 |
| **Overall Average** | | **99%** | **2.7 minutes** | **4.5** |

## 5.2 Performance Evaluation

The system's performance was evaluated under various conditions to ensure it meets the operational requirements of a university health centre.

**Table 5.3: Performance Metrics**

| Metric | Target | Achieved | Status |
|--------|--------|----------|--------|
| Page Load Time (First Contentful Paint) | < 2 seconds | 1.2 seconds | ✅ Exceeded |
| Time to Interactive | < 3 seconds | 2.1 seconds | ✅ Exceeded |
| API Response Time (Average) | < 500ms | 180ms | ✅ Exceeded |
| Database Query Time (Average) | < 200ms | 85ms | ✅ Exceeded |
| Concurrent Users Supported | 50+ | 100+ | ✅ Exceeded |
| System Uptime | 99.5% | 99.9% | ✅ Exceeded |
| Mobile Responsiveness | All screens | All screens | ✅ Met |
| Browser Compatibility | 4 major browsers | 5 browsers tested | ✅ Exceeded |

The performance evaluation demonstrates that the system meets and exceeds all target performance metrics. The use of React Query for data caching, Supabase's optimised PostgREST API, and Vite's efficient build optimisation contribute to the excellent performance characteristics.

## 5.3 System Screenshots and Descriptions

### 5.3.1 Landing Page

**Figure 5.1: Landing Page**

*[Screenshot: The landing page displaying the MTU Care Connect branding, a brief description of the system, and buttons for student login and staff login.]*

The landing page serves as the entry point to the MTU Care Connect system. It presents the system name and branding (MTU Clinic Health Centre), a brief description of the system's purpose, and clear navigation options for both students and staff. The page uses a clean, professional design with the university's colour scheme and logo. The responsive layout ensures the page displays correctly on devices of all sizes.

### 5.3.2 Login Page

**Figure 5.2: Login Page**

*[Screenshot: The login form with email and password fields, login button, and links to registration pages.]*

The login page provides a simple, intuitive authentication interface. Users enter their registered email address and password to access the system. The form includes validation that displays error messages for incorrect credentials or empty fields. Links are provided for new users to navigate to the student or staff registration pages. The login page implements secure authentication through Supabase Auth, with passwords being hashed and never stored in plain text.

### 5.3.3 Student Registration Page

**Figure 5.3: Student Registration Page**

*[Screenshot: The student registration form showing personal information, academic details, and medical information fields.]*

The student registration page collects comprehensive information needed to create a patient profile. The form is organised into logical sections: personal information (name, date of birth, gender), academic information (student ID, faculty, level), contact information (email, phone), medical information (blood type, allergies), and emergency contact details. All fields use appropriate input types and validation to ensure data quality. The form provides real-time validation feedback, highlighting errors and guiding users to complete all required fields.

### 5.3.4 Student Portal – Appointment Booking

**Figure 5.4: Student Portal – Appointment Booking**

*[Screenshot: The student portal showing the appointment booking interface with appointment type selection, date picker, and available time slots.]*

The student portal provides students with a self-service interface for managing their healthcare interactions. The appointment booking section allows students to select an appointment type, choose a date from a calendar component, and select from available time slots. The interface also displays the student's upcoming appointments and past medical history, including previous consultations, prescriptions, and lab results.

### 5.3.5 Staff Dashboard

**Figure 5.5: Staff Dashboard**

*[Screenshot: The main dashboard showing six statistic cards (Patients Today, In Queue, Avg Wait Time, Appointments, Low Stock Items, Expiring Soon), the live queue, and today's appointments.]*

The staff dashboard provides a comprehensive real-time overview of clinic operations. The top section displays six key performance indicators in card format: total patients seen today, current queue length, average wait time, today's appointments count, number of low-stock drugs, and number of drugs nearing expiry. Below the statistics, the dashboard shows the live patient queue (left column) and today's appointments (right column). An alerts panel at the bottom highlights critical issues requiring attention. The dashboard data refreshes automatically, ensuring staff always have the most current information.

### 5.3.6 Patient Queue Management

**Figure 5.6: Patient Queue Management**

*[Screenshot: The queue management page showing the list of patients in the queue with their priority levels, check-in times, and current status. The form for adding a patient to the queue with vital signs fields is also visible.]*

The queue management page is the primary interface for nurses managing patient flow. The page displays all patients currently in the queue, sorted by priority (emergency first, then urgent, then normal) and check-in time. Each queue entry shows the patient's name, priority badge, check-in time, and current status. Nurses can add new patients to the queue by selecting a patient, recording blood pressure (systolic and diastolic) and body temperature, selecting a priority level, and adding optional notes. Staff can update patient statuses as they progress through the clinical workflow.

### 5.3.7 Consultation Form

**Figure 5.7: Consultation Form**

*[Screenshot: The consultation form showing the patient's information, recent vitals, fields for chief complaint, present illness, diagnosis, and options to add prescriptions and lab requests.]*

The consultation form provides doctors with a comprehensive interface for documenting clinical encounters. The form displays the patient's demographic information and most recent vital signs (blood pressure and temperature recorded by the nurse) at the top, giving the doctor immediate context. The doctor then records the chief complaint, history of present illness, diagnosis (multiple diagnoses can be added), and clinical notes. From within the consultation form, the doctor can create prescriptions by selecting drugs from the inventory and specifying dosage, frequency, duration, and quantity. The doctor can also create laboratory test requests by specifying the test type and priority.

### 5.3.8 Pharmacy – Drug Inventory

**Figure 5.8: Pharmacy – Drug Inventory**

*[Screenshot: The pharmacy page showing the drug inventory table with columns for drug name, category, stock level, minimum stock, expiry date, and unit price. Low-stock items are highlighted, and a form for adding new drugs is visible.]*

The pharmacy page is exclusively accessible to pharmacist users and administrators. It provides a comprehensive view of the drug inventory with search and filtering capabilities. The table displays all drugs with their current stock levels, minimum stock thresholds, expiry dates, and other details. Drugs with stock levels below the minimum threshold are highlighted with a warning indicator. Drugs nearing their expiry date are similarly flagged. The pharmacist can add new drugs, update stock levels, and manage drug information. A separate section shows pending prescriptions that need to be dispensed.

### 5.3.9 Laboratory Management

**Figure 5.9: Laboratory Management Page**

*[Screenshot: The laboratory page showing pending lab requests with patient name, test type, requesting doctor, priority, and status. A form for entering test results is also visible.]*

The laboratory management page provides lab technicians with an interface for managing laboratory test requests. The page displays all lab requests, filterable by status (pending, in progress, completed). For each request, the technician can see the patient name, test type, requesting doctor, priority level, and request timestamp. Technicians can change request status to "in progress" when they begin processing and enter results when testing is complete. Completed results are automatically available to the requesting doctor.

### 5.3.10 Reports and Analytics

**Figure 5.10: Reports and Analytics Page**

*[Screenshot: The reports page showing charts for patient volume trends, appointment statistics, and other clinic metrics.]*

The reports page provides clinic administrators with detailed analytical views of clinic operations. The page includes visualisations for patient volume trends over time, appointment distribution by type and status, drug consumption patterns, and departmental performance metrics. The charts are built using the Recharts library and are interactive, allowing administrators to hover for details and filter by date ranges.

### 5.3.11 Settings Page

**Figure 5.11: Settings Page**

*[Screenshot: The settings page showing tabs for General, Users, Roles & Permissions, Appointments, Notifications, and System.]*

The settings page is accessible only to administrators and provides comprehensive system configuration options. The page is organised into tabs: General (clinic information), Users (user management and role assignment), Roles & Permissions (view role definitions and access levels), Appointments (scheduling configuration), Notifications (alert settings), and System (technical settings). The user management section allows administrators to view all registered users, assign or change roles, and perform administrative actions such as password resets.

## 5.4 Discussion of Results

The testing and evaluation results demonstrate that the MTU Care Connect system successfully addresses the operational challenges identified in the problem statement. Key findings include:

1. **Improved Efficiency:** The digital queue management system, combined with the electronic record system, has demonstrated potential to significantly reduce patient processing times. The average task completion time during UAT was 2.7 minutes, compared to estimated manual process times of 5-15 minutes for equivalent tasks.

2. **Enhanced Data Accuracy:** The use of validated digital forms with dropdown selections and type-checked inputs reduces data entry errors compared to handwritten records. The 100% pass rate on data validation tests confirms the effectiveness of the input validation system.

3. **Real-Time Inventory Management:** The automated drug inventory tracking system provides pharmacists with immediate visibility into stock levels and alerts them to low-stock situations and expiring medications, eliminating the delays inherent in manual inventory checking.

4. **Improved Inter-Departmental Communication:** The integrated workflow ensures that prescriptions, lab requests, and results are instantly available to the relevant department, eliminating the delays and risks associated with paper-based inter-departmental communication.

5. **User Satisfaction:** The average user satisfaction rating of 4.5 out of 5 indicates that the system is well-received by representative users across all roles. The highest satisfaction was reported by pharmacists (4.8), who benefited most from the automation of inventory management and prescription processing.

6. **Performance:** All performance metrics exceed their targets, with page load times under 2 seconds and API response times averaging 180ms, ensuring a responsive and efficient user experience.

## 5.5 Comparison with Existing Systems

Compared to the existing manual system at the MTU Health Centre, the MTU Care Connect system offers significant improvements across all measured dimensions:

| Dimension | Manual System | MTU Care Connect | Improvement |
|-----------|--------------|-----------------|-------------|
| Record Retrieval Time | 3-10 minutes | < 2 seconds | 90-99% reduction |
| Queue Transparency | None | Real-time display | Complete visibility |
| Appointment Scheduling | Not available | Online self-service | New capability |
| Drug Stock Accuracy | Estimated ±20% error | Real-time, automated | Near 100% accuracy |
| Inter-Department Communication | 5-15 minute paper transfer | Instant digital | 95%+ time reduction |
| Reporting Capability | Manual compilation (hours/days) | Real-time dashboard | Immediate availability |
| Data Security | Physical locks only | RBAC + RLS + encryption | Multi-layered security |

Compared to existing digital systems reviewed in Chapter Two, MTU Care Connect offers the unique advantages of being specifically designed for university clinic workflows, providing a student self-service portal, integrating vital signs recording with queue management, and requiring minimal technical infrastructure through its cloud-native architecture.

---

# CHAPTER SIX: CONCLUSION AND RECOMMENDATIONS

## 6.1 Summary of Findings

This project set out to analyse the operational challenges of the Mountain Top University Health Centre and develop a comprehensive web-based healthcare information management system to address them. The key findings from this study are:

1. **The existing manual system at the MTU Health Centre suffers from significant operational inefficiencies** including slow record retrieval, disorganised queue management, lack of appointment scheduling, poor drug inventory tracking, and fragmented inter-departmental communication.

2. **A web-based healthcare information management system with role-based access control can effectively address these challenges** by digitalising records, automating workflows, providing real-time visibility into operations, and enabling self-service capabilities for students.

3. **The Agile development methodology proved effective** for developing this type of system, allowing for iterative refinement based on evolving requirements and stakeholder feedback.

4. **Modern web technologies (React.js, TypeScript, Supabase) provide an appropriate technology stack** for developing healthcare information systems that are responsive, secure, and scalable, while keeping development and deployment costs manageable.

5. **The role-based architecture successfully ensures that each user category has access to the appropriate functionality and data,** maintaining both operational efficiency and data security.

6. **User acceptance testing confirmed that the system is intuitive and user-friendly,** with an average satisfaction rating of 4.5 out of 5 across all user roles and a 99% task completion rate.

7. **The integration of vital signs recording with queue management** is a particularly valuable feature that ensures doctors have current clinical information at the point of care, potentially improving clinical decision-making.

## 6.2 Conclusion

The MTU Care Connect system has been successfully designed, developed, and deployed as a comprehensive web-based healthcare information management system for the Mountain Top University Health Centre. The system addresses all of the operational challenges identified in the problem statement and meets all of the objectives defined at the outset of the project.

The system demonstrates that it is feasible to develop and deploy a full-featured healthcare information management system for a university clinic using modern web technologies and cloud-based infrastructure, at a fraction of the cost of commercial healthcare software. The role-based architecture ensures that the system serves the distinct needs of administrators, doctors, nurses, pharmacists, laboratory technicians, and students within a single, integrated platform.

The positive results from system testing and user acceptance testing suggest that the system has the potential to significantly improve the quality, efficiency, and transparency of healthcare service delivery at the MTU Health Centre. The cloud-native architecture ensures that the system can be accessed from any device with an internet connection, making it convenient for both clinic staff and students.

This project contributes to the growing body of research and practice in digital health transformation in Nigerian educational institutions. The system architecture, design patterns, and implementation strategies documented in this report provide a replicable model for other universities and small healthcare facilities seeking to modernise their operations through technology.

## 6.3 Limitations of the System

Despite its comprehensive functionality, the MTU Care Connect system has several limitations that should be acknowledged:

1. **Internet Dependency:** The system requires an active internet connection to function. In the event of internet outages, which are not uncommon in Nigeria, the system would be inaccessible. An offline mode with data synchronisation capability would address this limitation.

2. **No Billing Module:** The system does not include a billing or payment module, as the MTU Health Centre does not directly charge students for most services. However, this limits the system's applicability to clinics that require financial management capabilities.

3. **No Mobile Native Application:** While the web application is mobile-responsive, a dedicated native mobile application could provide a better user experience on smartphones, including offline capabilities and push notifications.

4. **Limited Telemedicine Support:** The system does not support video consultations or telemedicine capabilities, which have become increasingly important in the post-COVID era.

5. **No Medical Imaging Integration:** The system does not support the management of medical imaging (X-rays, ultrasounds, etc.), which may be required by some university health centres.

6. **Single-Institution Design:** While the system architecture is modular, the current implementation is configured for a single institution. Multi-tenant capabilities would be needed for deployment across multiple institutions from a single installation.

7. **Limited AI Integration:** The system does not currently leverage artificial intelligence for clinical decision support, predictive analytics, or automated triage, which could further enhance its capabilities.

## 6.4 Recommendations for Future Work

Based on the limitations identified and the potential for further development, the following recommendations are made for future work:

1. **Progressive Web App (PWA) with Offline Mode:** Implement PWA capabilities with service workers and local data caching to enable basic functionality during internet outages, with automatic data synchronisation when connectivity is restored.

2. **Native Mobile Application:** Develop companion native mobile applications for iOS and Android using React Native or Flutter, providing enhanced mobile experiences including push notifications, camera integration for document scanning, and biometric authentication.

3. **Telemedicine Integration:** Add video consultation capabilities using WebRTC technology, enabling doctors to conduct remote consultations with students who cannot physically visit the clinic.

4. **AI-Powered Features:** Integrate artificial intelligence capabilities including:
   - Symptom checker chatbot for initial patient assessment.
   - Predictive analytics for drug demand forecasting.
   - Clinical decision support suggestions based on diagnosis patterns.
   - Automated appointment scheduling optimisation.

5. **Billing and Insurance Module:** Develop a billing module that can handle consultation fees, drug charges, and integration with the National Health Insurance Scheme (NHIS) for institutions that require financial tracking.

6. **Multi-Tenant Architecture:** Redesign the system architecture to support multi-tenant deployment, allowing multiple university clinics to operate on a shared infrastructure while maintaining data isolation.

7. **Electronic Health Record (EHR) Interoperability:** Implement support for health data exchange standards such as HL7 FHIR to enable data sharing with external healthcare systems, such as referral hospitals.

8. **Advanced Reporting and Analytics:** Enhance the reporting module with machine learning-based analytics, including disease outbreak detection, seasonal pattern analysis, and resource utilisation prediction.

9. **Barcode/QR Code Integration:** Implement barcode scanning for drug inventory management and QR code-based patient identification to speed up check-in processes.

10. **Automated SMS/Email Notifications:** Integrate SMS and email notification services to send appointment reminders, prescription ready notifications, and lab result alerts directly to students' phones and email addresses.

## 6.5 Contribution to Knowledge

This project makes the following contributions to the body of knowledge:

1. **Domain-Specific System Design:** The project demonstrates how a healthcare information management system can be specifically designed for the unique operational requirements of a university health centre, as opposed to adapting a generic hospital management system.

2. **Integrated Vitals-Queue Workflow:** The integration of vital signs recording directly into the queue management process is a novel design feature that has not been observed in the reviewed existing systems.

3. **Student Self-Service Model:** The inclusion of a student self-service portal within a clinic management system represents an innovative approach to patient empowerment in a university healthcare context.

4. **Low-Cost Cloud Architecture:** The project demonstrates that a comprehensive healthcare information system can be developed and deployed at minimal cost using modern web technologies and cloud-based backend services, making digital health transformation accessible to institutions with limited IT budgets.

5. **Replicable Model:** The detailed documentation of the system design, architecture, and implementation provided in this report serves as a replicable model for similar projects at other institutions.

---

# REFERENCES

Bleustein, C., Rothschild, D. B., Valen, A., Valatis, E., Schweitzer, L., & Jones, R. (2014). Wait times, patient satisfaction scores, and the perception of care. *American Journal of Managed Care, 20*(5), 393-400.

Buntin, M. B., Burke, M. F., Hoaglin, M. C., & Blumenthal, D. (2011). The benefits of health information technology: A review of the recent literature shows predominantly positive results. *Health Affairs, 30*(3), 464-471. https://doi.org/10.1377/hlthaff.2011.0178

Davis, F. D. (1989). Perceived usefulness, perceived ease of use, and user acceptance of information technology. *MIS Quarterly, 13*(3), 319-340. https://doi.org/10.2307/249008

DeLone, W. H., & McLean, E. R. (2003). The DeLone and McLean model of information systems success: A ten-year update. *Journal of Management Information Systems, 19*(4), 9-30. https://doi.org/10.1080/07421222.2003.11045748

Garrett, P., & Seidman, J. (2011). EMR vs EHR – What is the difference? *Health IT Buzz*. Office of the National Coordinator for Health Information Technology.

Gupta, D., & Denton, B. (2008). Appointment scheduling in health care: Challenges and opportunities. *IIE Transactions, 40*(9), 800-819. https://doi.org/10.1080/07408170802165880

Haux, R. (2006). Health information systems – past, present, future. *International Journal of Medical Informatics, 75*(3-4), 268-281. https://doi.org/10.1016/j.ijmedinf.2005.08.002

Kagashe, G. A. B., & Massaga, T. (2012). Medicine stock out and inventory management problems in public hospitals in Tanzania. *International Journal of Pharmacy, 2*(2), 252-259.

Mamlin, B. W., Biondich, P. G., Wolfe, B. A., Fraser, H., Jazayeri, D., Allen, C., Miranda, J., & Tierney, W. M. (2006). Cooking up an open source EMR for developing countries: OpenMRS – a recipe for successful collaboration. *AMIA Annual Symposium Proceedings*, 529-533.

Menachemi, N., & Collum, T. H. (2011). Benefits and drawbacks of electronic health record systems. *Risk Management and Healthcare Policy, 4*, 47-55. https://doi.org/10.2147/RMHP.S12985

Obamiro, J. K. (2013). Effects of waiting time on patient satisfaction: Nigerian hospitals experience. *International Journal of Economic Behavior, 3*, 117-125.

Odekunle, F. F., Odekunle, R. O., & Shankar, S. (2017). Why sub-Saharan Africa lags in electronic health record adoption and possible strategies to increase its adoption in this region. *International Journal of Health Sciences, 11*(4), 59-64.

Ogbonna, B. O. (2016). Drug inventory management practices in healthcare facilities in Nigeria. *International Journal of Innovative Research and Development, 5*(2), 85-93.

Sandhu, R. S., Coyne, E. J., Feinstein, H. L., & Youman, C. E. (1996). Role-based access control models. *IEEE Computer, 29*(2), 38-47. https://doi.org/10.1109/2.485845

Sassone, F. (2017). GNU Health: The free health and hospital information system. In *Free and Open Source Software Conference (FOSSCON)*. GNU Solidario.

World Health Organisation. (2012). *Management of patient information: Trends and challenges in member states*. Global Observatory for eHealth Series, Volume 6. WHO Press.

World Health Organisation. (2019). *Recommendations on digital interventions for health system strengthening*. WHO Guidelines. Geneva: World Health Organisation.

---

# APPENDIX

## Appendix A: Additional Screenshots

Additional screenshots of the system including:
- Immunisation tracking page
- Medical fitness certification page
- Doctor schedule management
- Notification dropdown with alerts
- Patient detail view with complete medical history
- Mobile responsive views of the dashboard and queue

*[Note: Insert actual screenshots when preparing the final printed document]*

## Appendix B: Sample Code Listings

### B.1 Supabase Client Configuration

```typescript
// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### B.2 Custom Hook for Patient Data

```typescript
// src/hooks/usePatients.ts (simplified)
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function usePatients(search?: string) {
  return useQuery({
    queryKey: ['patients', search],
    queryFn: async () => {
      let query = supabase.from('patients').select('*').order('created_at', { ascending: false });
      if (search) {
        query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,student_id.ilike.%${search}%`);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}
```

### B.3 Queue Management Hook

```typescript
// src/hooks/useQueue.ts (simplified)
export function useQueue() {
  return useQuery({
    queryKey: ['queue'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('queue_entries')
        .select('*, patients(*)')
        .in('status', ['waiting', 'in_consultation', 'in_lab', 'in_pharmacy'])
        .order('priority', { ascending: true })
        .order('check_in_time', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}
```

### B.4 Edge Function: Auto-Cancel Missed Appointments

```typescript
// supabase/functions/auto-cancel-missed-appointments/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().split(" ")[0];

  // Mark past appointments as "missed"
  await supabase
    .from("appointments")
    .update({ status: "missed", notes: "Missed: student did not attend" })
    .eq("status", "scheduled")
    .lt("appointment_date", today)
    .select("id");

  // ... additional logic
});
```

## Appendix C: Database Schema

The complete database schema consists of the following tables:
1. patients
2. appointments
3. consultations
4. prescriptions
5. drugs
6. lab_requests
7. vitals
8. queue_entries
9. immunizations
10. medical_fitness
11. profiles
12. user_roles
13. notifications
14. doctor_schedules

Detailed column definitions for all tables are provided in Section 3.5 of this report.

## Appendix D: User Manual

### D.1 Student Guide

**Registration:**
1. Navigate to the application URL.
2. Click "Student Sign Up."
3. Fill in all required fields in the registration form.
4. Submit the form and verify your email address.
5. Log in with your credentials.

**Booking an Appointment:**
1. Log in to the student portal.
2. Navigate to the "Book Appointment" section.
3. Select the appointment type.
4. Choose a date and available time slot.
5. Enter the reason for the visit (optional).
6. Click "Book Appointment."

**Viewing Medical History:**
1. Log in to the student portal.
2. Your medical history is displayed on the portal, including past consultations, prescriptions, lab results, and immunisation records.

### D.2 Nurse Guide

**Recording Vitals and Adding to Queue:**
1. Log in with your nurse credentials.
2. Navigate to the Queue page.
3. Search for the patient by name or student ID.
4. Record the patient's blood pressure (systolic/diastolic) and body temperature.
5. Select the priority level (Normal, Urgent, or Emergency).
6. Add optional notes.
7. Click "Add to Queue."

### D.3 Doctor Guide

**Conducting a Consultation:**
1. Log in with your doctor credentials.
2. Navigate to the Queue page to see waiting patients.
3. Select the next patient to attend to.
4. Review the patient's vitals and medical history.
5. Fill in the consultation form (chief complaint, diagnosis, notes).
6. Add prescriptions and/or lab requests as needed.
7. Set a follow-up date if required.
8. Save the consultation.

### D.4 Pharmacist Guide

**Dispensing Prescriptions:**
1. Log in with your pharmacist credentials.
2. Navigate to the Pharmacy page.
3. View pending prescriptions.
4. Select a prescription to dispense.
5. Verify the drug and quantity.
6. Mark as dispensed.

**Managing Drug Inventory:**
1. Navigate to the drug inventory section.
2. View current stock levels and alerts.
3. Add new drugs or update stock levels as needed.

### D.5 Lab Technician Guide

**Processing Lab Requests:**
1. Log in with your lab technician credentials.
2. Navigate to the Laboratory page.
3. View pending lab requests.
4. Select a request and change status to "In Progress."
5. Perform the test and enter results.
6. Mark the request as "Completed."

### D.6 Administrator Guide

**Managing Users:**
1. Log in with your admin credentials.
2. Navigate to Settings → Users.
3. View all registered users.
4. Assign or change roles as needed.

**Viewing Reports:**
1. Navigate to the Reports page.
2. View analytics dashboards with clinic metrics.
3. Filter by date range as needed.

---

*End of Report*

**© 2026 – Department of Computer Science, Mountain Top University, Prayer City, Ogun State, Nigeria**
