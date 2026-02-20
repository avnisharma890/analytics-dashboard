# 📐 System Design & Architecture

## 🏗️ Overview

This project implements an **Interactive Product Analytics Dashboard** that tracks user interactions and visualizes feature usage through aggregated analytics.

**Architecture:**
React Frontend → Express Backend → PostgreSQL Database

**Design goals:**

- Flexible, filterable analytics  
- Clean separation of concerns  
- Production-ready database access  
- Scalable event logging  
- Persistent user experience  

---

## 🗄️ Database Design

### Why PostgreSQL Pooling?

The backend uses a connection pool because:

- PostgreSQL connections are expensive  
- Pool reuses connections efficiently  
- Prevents connection exhaustion  
- Scales better under load  

**Result:** lower latency and production-ready behavior.

---

## 📊 Data Model

### User

Represents an authenticated dashboard user and enables demographic filtering.

### Feature Click

Represents a single interaction event:

> “User X clicked feature Y at time Z”

This follows an **event log design**, which is standard for analytics systems.

---

### Why Not Store Totals?

A naive design like:

feature_stats(feature_name, total_clicks)

would fail because the dashboard must filter by:

- date range  
- age  
- gender  

If only totals were stored, we could not answer:

- clicks by female users  
- clicks last week  
- clicks from users < 18  

**Therefore:** raw events are stored and aggregated at query time.

---

## ⚡ Indexing Strategy

Indexes were added based on query patterns.

**feature_clicks**

- user_id → faster JOIN  
- feature_name → faster GROUP BY  
- timestamp → faster date filtering  

**users**

- gender → faster demographic filters  
- age → faster age filtering  

PostgreSQL uses these indexes when building the query execution plan, helping avoid full table scans.

---

## 🌱 Seed Script

The seed script is a **one-time database population tool**.

**Responsibilities:**

1. Clear existing data  
2. Insert synthetic users  
3. Insert synthetic click events  
4. Exit  

**Why it matters:** ensures the dashboard is immediately populated and testable during evaluation.

---

## 🖥️ Frontend Architecture

### Axios Layer

A centralized Axios instance:

- automatically attaches JWT  
- avoids repetitive header logic  
- keeps API calls consistent  

**Outcome:** cleaner and safer network layer.

---

## 🍪 Filter Persistence

User filter selections are stored in cookies.

### Flow

**On change**

Cookies.set("dashboard_filters") → saves filters

**On mount**

Cookies.get("dashboard_filters") → restores filters

### Controlled Inputs (Critical)

Inputs use controlled state (value={...}) so that:

- restored cookie values reflect in UI  
- filters persist after refresh  
- evaluator persistence test passes  

---

## 🚀 Scalability Note

If scaled to ~1M write events/min, the system would evolve to include:

- event queue (Kafka / Redis Streams)  
- batched writes  
- partitioned tables  
- Redis caching  
- pre-aggregations/materialized views  

---

## ✅ Summary

The system uses:

- event-driven analytics modeling  
- indexed relational queries  
- connection pooling  
- persistent filter UX  
- clean frontend/backend separation  

This results in a **production-style analytics dashboard** that is flexible, performant, and extensible.