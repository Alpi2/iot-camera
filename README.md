### History & Motivation

This project is a complete rewrite of an earlier event operations management platform developed in 2017. The original system was designed to provide real-time crowd monitoring, gate management, and queue optimization for large-scale events using computer vision techniques available at the time.

- **Original Version (2017)**:
  Built with contemporary technologies of the time, including React 15/16 (with Create React App or custom Webpack setup), Redux for state management, Socket.IO for real-time communication, Node.js + Express for the backend, and OpenCV with Caffe (or early CNN models like custom MCNN implementations) for computer vision tasks such as crowd counting and detection.

- **2025 Rewrite**:
  Fully updated to current industry standards using React 18+, TypeScript, modern YOLO variants, edge computing with NVIDIA Jetson, and efficient real-time architectures.

- **Why rewrite?**
  To showcase up-to-date skills, enhance performance and scalability, and apply 8 years of experience in full-stack and computer vision development.

The core concept, architecture, and features (real-time crowd monitoring, gate/queue management, alerts) remain true to the original vision, but the entire implementation has been modernized from the ground up.

# EventOps – Intelligent Event Operations Management Platform

![EventOps Platform](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Table of Contents

- [Overview](#-overview)
- [Core Features](#-core-features)
- [System Architecture](#-system-architecture)
- [Camera Integration and Data Flow](#-camera-integration-and-data-flow)
- [Modules and Screens](#-modules-and-screens)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [User Guide](#-user-guide)
- [API Integration](#-api-integration)
- [Performance and Optimization](#-performance-and-optimization)
- [Security](#-security)
- [Contributing](#-contributing)

---

## 🎯 Overview

**EventOps** is an AI-powered, real-time operations management platform designed for large-scale events. By leveraging modern computer vision technologies, IoT sensors, and intelligent analytics engines, the platform provides event operators with a comprehensive command and control center.

### Use Cases

- 🎪 Concerts and Festivals
- 🏟️ Stadium and Arena Events
- 🎭 Conferences and Trade Shows
- 🎨 Art and Cultural Events
- 🏛️ Museums and Exhibition Spaces
- 🎉 Private Events and Meetings

### Core Problem and Solution

**Problem:** In large-scale events, managing hundreds of entry points, thousands of attendees, and complex security protocols becomes impractical through manual processes. Crowd control challenges, security risks, and operational inefficiencies lead to significant issues.

**Solution:** EventOps processes real-time data from IP cameras, thermal sensors, and IoT devices to deliver actionable insights to operators. The system proactively detects potential issues, generates automated alerts, and provides data-driven recommendations to decision-makers.

---

## ✨ Core Features

### 1. **Real-Time Crowd Monitoring**

- Camera-based people counting and density analysis
- Heatmap visualization
- Automatic alerts for capacity overruns
- Social distancing monitoring (optional)

### 2. **Intelligent Gate Management**

- Dedicated in/out counters for each gate
- Real-time flow rate calculation
- Gate performance comparisons
- Automatic bottleneck detection

### 3. **Queue Optimization**

- Live queue length tracking
- Estimated waiting time calculation
- Load balancing recommendations
- Lane-based performance analysis

### 4. **Multi-Layer Alert System**

- Severity-based classification (Low / Medium / High)
- Category-based filtering
- Chronological event timeline
- Automated notification system

### 5. **IoT and Infrastructure Monitoring**

- Monitoring of electricity, water, and HVAC systems
- Network and sensor operational status
- Environmental conditions (temperature, humidity)
- Device health status indicators

### 6. **AI-Powered Reporting**

- Detailed post-event analytics
- Peak hours and trend analysis
- Bottleneck identification and improvement recommendations
- Export in PDF / PPT formats

---

## 🏗️ System Architecture

````text
┌─────────────────────────────────────────────────────────────┐
│                    EVENTOPS PLATFORM                        │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   CAMERAS    │   │  IoT SENSORS │   │  SCANNERS    │
│   (IP/CCTV   │   │  (Thermal)   │   │  (QR/RFID)   │
│    4K/HD)    │   └──────────────┘   └──────────────┘
└──────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│                  EDGE PROCESSING LAYER                      │
│  (Mandatory for scalability – 30+ cameras)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Edge Devices (NVIDIA Jetson Orin Nano / AGX Orin)   │   │
│  │  - Local Computer Vision (YOLOv8 Object Detection)   │   │
│  │  - Crowd Counting & Heat Map (local)                 │   │
│  │  - Anomaly Detection (pre-filtering)                 │   │
│  │  → Raw video is processed locally; only METADATA     │   │
│  │    JSON is transmitted                               │   │
│  │    (people count, coordinates, events → KB/sec)      │   │
│  │  Advantage: 99% bandwidth reduction, lower latency   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
        │                          │
        │                          │  (Small-scale systems: 20–30 cameras)
        │                          │  → Direct RTSP/raw stream to central
        │                          ▼
        │                ┌──────────────────────────────┐
        │                │   CENTRAL DATA PROCESSING    │
        │                │        LAYER (Hybrid)        │
        │                │                              │
        │                │  ┌────────────────────────┐  │
        │                │  │ Computer Vision Engine │  │
        │                │  │ - Object Detection     │  │
        │                │  │   (YOLOv8 fallback)    │  │
        │                │  │ - Crowd Counting       │  │
        │                │  │ - Heat Map Generation  │  │
        │                │  └────────────────────────┘  │
        │                │                              │
        │                │  ┌────────────────────────┐  │
        │                │  │   Analytics Engine     │  │
        │                │  │ - Real-time Aggregation│  │
        │                │  │ - Predictive Modeling  │  │
        │                │  │ - Anomaly Detection    │  │
        │                │  └────────────────────────┘  │
        │                └──────────────────────────────┘
        ▼
┌────────────────────────────────────────┐
│         API GATEWAY LAYER              │
│  - WebSocket for Real-time Updates     │
│  - REST API for Historical Data        │
│  - GraphQL for Complex Queries         │
└────────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────────┐
│      EVENTOPS WEB APPLICATION          │
│  ┌──────────────────────────────────┐  │
│  │  React Frontend + TypeScript     │  │
│  │  - Dashboard Module              │  │
│  │  - Gates Module                  │  │
│  │  - Queues Module                 │  │
│  │  - Alerts Module                 │  │
│  │  - Utilities Module              │  │
│  │  - Reports Module                │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
        │
        ▼
┌───────────────┐
│   OPERATORS   │
│   (End Users) │
└───────────────┘

---

## 📹 Camera Integration and Data Flow

### Camera Infrastructure

The EventOps platform processes footage from strategically placed IP cameras throughout the event area, delivering both real-time and historical data to the user interface.

#### Camera Types and Placement

1. **Entrance Gate Cameras**

   - **Purpose:** Count entries/exits, identity verification
   - **Placement:** Above each gate, bird’s-eye view
   - **Resolution:** Minimum 1080p, preferably 4K
   - **Technology:** Human detection and counting algorithms

2. **Queue Monitoring Cameras**

   - **Purpose:** Track queue length, estimate waiting times
   - **Placement:** Alongside and above queue areas
   - **Technology:** Density heatmaps, distance measurement

3. **Crowd Density Cameras**

   - **Purpose:** Monitor area density and security risks
   - **Placement:** Central areas, corridors, in front of stages
   - **Technology:** Crowd density detection, heatmap visualization

4. **Environmental and Security Cameras**

   - **Purpose:** General surveillance and incident detection
   - **Placement:** Parking lots, emergency exits, parking areas

### Data Processing Flow

```text
┌──────────────────────────────────────────────────────────────┐
│                 DATA FLOW FROM CAMERA TO UI                 │
└──────────────────────────────────────────────────────────────┘

1. VIDEO CAPTURE
   ├─ IP Cameras: Connected via RTSP/ONVIF protocols
   ├─ Frame Rate: 15–30 FPS
   ├─ Format: H.264/H.265 codec
   └─ Note: In large-scale systems (30+ cameras), raw streams are directed to edge devices

2. PREPROCESSING – Edge or Central
   ├─ Image quality enhancement
   ├─ Noise reduction
   ├─ Perspective correction
   ├─ ROI (Region of Interest) selection
   └─ Performed locally on edge devices (reduces latency)

3. COMPUTER VISION PROCESSING – Hybrid
   ├─ Object Detection
   │  ├─ YOLOv8 / Faster R-CNN (TensorRT optimized)
   │  ├─ Human detection and classification
   │  └─ Confidence filtering (>0.7)
   │
   ├─ Tracking
   │  ├─ DeepSORT algorithm
   │  ├─ Identity tracking of individuals
   │  └─ Direction determination (in/out)
   │
   ├─ Crowd Counting
   │  ├─ Density estimation models
   │  ├─ Heatmap generation (pre-processed on local edge)
   │  └─ Capacity calculation
   │
   └─ Queue Analysis
   ├─ Queue length measurement
   ├─ Estimated waiting time
   └─ Flow rate calculation
   └─ Basic processing on edge → Only METADATA JSON sent to central
      (Bandwidth reduced by 99%: KB/sec instead of raw video)

4. DATA AGGREGATION – Central Layer
   ├─ Merge data from multiple edge/central sources
   ├─ Region-based statistics calculation
   ├─ Generate time series data
   └─ Metrics calculation (throughput, density, etc.)
   └─ Small-scale systems (20–30 cameras) fallback to direct central processing

5. REAL-TIME ANALYTICS – Central
   ├─ Anomaly Detection
   │  └─ Threshold violations, abnormal behaviors
   ├─ Trend Analysis
   │  └─ Peak hours, seasonal patterns
   └─ Predictive Alerts
      └─ Potential issue forecasting (global view)

6. API LAYER
   ├─ WebSocket: Real-time data streaming (100ms latency)
   ├─ REST API: Historical data queries
   └─ GraphQL: Complex data relationships

7. FRONTEND VISUALIZATION
   ├─ Dashboard
   │  ├─ Live metric cards (Total Visitors: 47,892)
   │  ├─ Heatmap visualization (Crowd Density Heatmap)
   │  ├─ Live alert feed
   │  └─ Time-based charts
   │
   ├─ Gates Module
   │  ├─ In/out counts per gate
   │  ├─ Mini charts (sparklines)
   │  └─ Performance comparisons
   │
   ├─ Queues Module
   │  ├─ Load level indicators (85%, 92%)
   │  ├─ Estimated wait times (28 min)
   │  └─ Queue length charts
   │
   └─ Alerts Module
      ├─ Severity-based alerts
      ├─ Category distribution (pie chart)
      └─ Event timeline

### Data Formats and Examples

#### Camera Output (Raw Data)

```json
{
  "camera_id": "CAM_NORTH_GATE_A_01",
  "timestamp": "2025-12-15T14:45:23.123Z",
  "frame_id": 892341,
  "detections": [
    {
      "object_id": "person_001",
      "class": "person",
      "confidence": 0.94,
      "bbox": [120, 340, 245, 580],
      "tracking_id": "TRK_00123",
      "direction": "entering"
    },
    {
      "object_id": "person_002",
      "class": "person",
      "confidence": 0.89,
      "bbox": [450, 280, 560, 520],
      "tracking_id": "TRK_00124",
      "direction": "exiting"
    }
  ],
  "metadata": {
    "total_count": 42,
    "entering": 28,
    "exiting": 14,
    "density": 0.68,
    "flow_rate": 240
  }
}
````

#### API Output (Data Sent to Frontend)

```json
{
  "gate": {
    "id": "north_gate_a",
    "name": "North Gate A",
    "status": "operational",
    "metrics": {
      "total_in": 8234,
      "total_out": 1205,
      "current_flow_rate": 240,
      "avg_processing_time": 4.2,
      "utilization": 0.87
    },
    "alerts": [
      {
        "severity": "high",
        "message": "Flow rate exceeding capacity",
        "timestamp": "2025-12-15T14:45:00Z"
      }
    ],
    "timeseries": [
      { "time": "14:00", "count": 180 },
      { "time": "14:15", "count": 220 },
      { "time": "14:30", "count": 240 }
    ]
  }
}
```

### Heatmap Generation

Crowd density data obtained from camera footage is transformed into visual heatmaps on the frontend:

1. **Data Collection:** Each camera sends density data every 2 minutes
2. **Grid Mapping:** The area is divided into 10x10 grid cells
3. **Density Calculation:** People per m² are calculated for each cell
4. **Color Mapping:**
   - Green: Low density (0–30%)
   - Yellow: Medium density (30–60%)
   - Orange: High density (60–80%)
   - Red: Critical density (80–100%)
5. **Rendering:** Real-time visualization using the Canvas API

---

## 📊 Modules and Screens

### 1. Dashboard (Live Operations Center)

**Purpose:** Provide a real-time overview of the event status

**Components:**

- **Metric Cards:** Total Visitors (47,892), Gate Flow Rate (1,240/hr), Active Alerts (12), Queue Load Index (68%)
- **Heatmap:** Visualization of crowd density
- **Live Alert Feed:** Recent alerts and their statuses
- **Event Timeline:** Chronological list of events
- **Charts:** Gate flow and queue load trends

**Data Sources:**

- Cameras: Visitor counting, density heatmap
- Gate Scanners: Entry/exit data
- Sensors: Queue lengths
- AI Engine: Anomaly detection and alert generation

### 2. Gates (Gate Management System)

**Purpose:** Monitor detailed performance of each gate

**Components:**

- **Filter Bar:** Gate, time range, and status filters
- **Gate List Panel:** Card view for each gate
  - In/Out counters
  - Mini trend charts
  - Status indicators (green/yellow/red)
  - Percentage change badges
- **Analytics Area:** Bar chart for gate comparisons
- **Detail Drawer:** Expanded information for the selected gate

**Data Sources:**

- Overhead Gate Cameras: In/out counting, direction detection
- RFID/QR Scanners: Verification data
- Time Analysis: Processing speed, average passage time

### 3. Queues (Queue Optimization Center)

**Purpose:** Maximize queue efficiency

**Components:**

- **Queue Summary Cards:** Load level, waiting time, and status for each queue
- **Heatmap Module:** Visual density representation of queues
- **Time Chart:** Queue length changes over time
- **Lane Status Grid:** Activity and performance status of each lane
- **Alert Panel:** Queue-related alerts

**Data Sources:**

- Queue Cameras: People counting, queue length
- Sensors: Area capacity
- AI Prediction Model: Estimated waiting time
- Scanner Data: Processing speed

### 4. Alerts (Alert and Event Management)

**Purpose:** Proactive issue resolution and event tracking

**Components:**

- **Filter Bar:** Severity (Low/Medium/High), category, time
- **Alert List:** Detailed alerts in table format
  - Severity icon
  - Timestamp
  - Location
  - Description
- **Category Distribution:** Pie chart
- **Event Timeline:** Vertical timeline
- **Detail Drawer:** Alert details and action buttons

**Alert Types:**

- **Crowd Safety:** Density threshold exceeded
- **Queue Management:** Excessive waiting time
- **Equipment:** Scanner failure, camera disconnection
- **Operational:** Staff shortage
- **Emergency:** Medical intervention, security incident

### 5. Utilities (IoT Infrastructure Monitoring)

**Purpose:** Ensure event infrastructure health

**Components:**

- **System Health Cards:** Electricity, Water, Network, HVAC, Sensors
  - Status badge
  - Real-time value
  - Mini trend charts
- **Environmental Monitoring:** Temperature and humidity indicators
- **Network Uptime:** Gateway performance charts
- **Sensor Zone Status:** Area-based uptime
- **IoT Device List:** Real-time status of all devices

**Data Sources:**

- Smart Meters: Electricity/water consumption
- Thermal Sensors: Temperature, humidity
- Network Devices: Uptime, bandwidth
- HVAC System: AC status

### 6. Event Report (Post-Event Analytics)

**Purpose:** Evaluate event performance and generate insights for future planning

**Components:**

- **Hero Metrics:** Total visitors, peak hour, maximum load, total incidents
- **Attendance Chart:** Cumulative visitor curve
- **Gate Performance:** Comparative bar chart
- **Alert Distribution:** Category-based pie chart
- **AI Predictions Module:**
  - Peak periods
  - Bottleneck points
  - Improvement suggestions
  - Incident periods
- **Statistics Table:** Detailed metrics and comparisons
- **Export:** Downloadable PDF/PPT report

**AI Prediction Examples:**

````text
🔴 HIGH PRIORITY
"Peak Attendance Period"
Maximum visitor flow occurred between 14:00 - 16:00.
With 18,200 entries per hour, capacity reached 92%.

🟡 MEDIUM PRIORITY
"Gate Performance Variance"
North Gate A showed 15% higher efficiency.
Optimized staff allocation was effective.

🔴 HIGH PRIORITY
"Queue Bottleneck"
Queue C had 30+ minutes wait time during peak hours.
Opening additional lanes is recommended.

---
## 🛠️ Technology Stack

### Frontend

- **Framework:** React 18.x
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.0
- **Charts:** Recharts
- **Icons:** Lucide React
- **State Management:** React Hooks (useState, useEffect, useContext)
- **Real-time Communication:** WebSocket / Socket.io

### Backend (Recommended for Integration)

- **API Gateway:** Node.js + Express / FastAPI (Python)
- **Real-time Engine:** Socket.io / Redis Pub/Sub
- **Database:**
  - PostgreSQL (Relational data)
  - InfluxDB (Time-series data)
  - Redis (Cache and real-time data)
- **Message Queue:** RabbitMQ / Apache Kafka
- **File Storage:** MinIO / AWS S3

### Computer Vision & AI

- **Detection:** YOLOv8, Faster R-CNN
- **Tracking:** DeepSORT, ByteTrack
- **Crowd Counting:** CSRNet, MCNN
- **Framework:** PyTorch, OpenCV
- **Inference:** NVIDIA TensorRT, ONNX Runtime

### Infrastructure

- **Containerization:** Docker, Kubernetes
- **Monitoring:** Prometheus, Grafana
- **Logging:** ELK Stack (Elasticsearch, Logstash, Kibana)
- **Load Balancer:** Nginx, HAProxy

### Hardware Requirements

**Camera System:**

- IP Cameras: Minimum 1080p, ONVIF compliant
- Frame Rate: 15–30 FPS
- Codec: H.264/H.265
- Network: Gigabit Ethernet

**Processing Server:**

- CPU: 16+ cores (Intel Xeon / AMD EPYC)
- GPU: NVIDIA A100 / L4 / A4000 (for multi-camera setups)
- RAM: 64GB+
- Storage: 2TB+ NVMe SSD
- Network: 10Gbps

---
## 🚀 Installation

### Prerequisites

```bash
# Node.js 20+ and npm are required
node --version  # v18.0.0+
npm --version   # v9.0.0+

````

### Step 1: Clone the Project

```bash
git clone https://github.com/your-org/eventops-platform.git
cd eventops-platform

```

### Step 2: Install Dependencies

````bash
npm install

### Step 3: Configure Environment Variables

Create a `.env` file:

```env
# API Configuration
REACT_APP_API_URL=https://api.eventops.io
REACT_APP_WS_URL=wss://ws.eventops.io

# Camera Stream Configuration
REACT_APP_RTSP_SERVER=rtsp://camera-server.local

# Authentication
REACT_APP_AUTH_DOMAIN=auth.eventops.io
REACT_APP_CLIENT_ID=your_client_id

# Feature Flags
REACT_APP_ENABLE_HEATMAP=true
REACT_APP_ENABLE_AI_INSIGHTS=true
````

### Step 4: Start Development Server

````bash
npm start

Open your browser at `http://localhost:3000`.

### Step 5: Production Build

```bash
npm run build

Build files will be generated in the `build/` folder.

---

## 📖 User Guide

### First Login and Setup

1. **Create an Event**

Settings > Events > Create New Event

- Event Name: Summer Music Festival 2025
- Date: 2025-12-12
- Venue: Central Stadium
- Expected Attendance: 50,000

2. **Define Gates**

Configuration > Gates > Add Gate

- Gate ID: north_gate_a
- Name: North Gate A
- Capacity: 1000/hour
- Camera IDs: CAM_01, CAM_02

3. **Connect Cameras**

Configuration > Cameras > Add Camera

- Camera ID: CAM_NORTH_GATE_A_01
- RTSP URL: rtsp://192.168.1.100:554/stream
- Type: Entry Point
- Location: North Gate A
- Enable Object Detection: Yes

### Real-Time Operations

#### Using the Dashboard

1. Select "Dashboard" from the top menu
2. View real-time data on metric cards
3. Check crowd density on the heatmap
4. Monitor active issues in the alert feed
5. Analyze trends using the charts

#### Responding to Alerts

Alerts > [Click on the Alert]
- Review alert details
- Acknowledge the alert using "Acknowledge Alert"
- Assign to team using "Assign to Team"
- Add comments
- Update the status

### Reports

Event Report > Export
- PDF Report: Summary metrics and charts
- PPT Presentation: For management presentation
- CSV Data: For detailed data analysis

## 🔌 API Integration

### REST API Endpoints

#### Real-Time Data

```http
GET /api/v1/dashboard/metrics
Authorization: Bearer {token}

Response:
{
  "total_visitors": 47892,
  "gate_flow_rate": 1240,
  "active_alerts": 12,
  "queue_load_index": 68,
  "timestamp": "2025-12-15T14:45:00Z"
}

#### Gate Data
```http
GET /api/v1/gates/{gate_id}/stats
Parameters:
  - start_time: 2025-12-15T08:00:00Z
  - end_time: 2025-12-15T18:00:00Z

Response:
{
  "gate_id": "north_gate_a",
  "total_in": 8234,
  "total_out": 1205,
  "timeseries": [...]
}

#### Create Alert
POST /api/v1/alerts
Content-Type: application/json

{
  "severity": "high",
  "category": "crowd_safety",
  "location": "North Gate A",
  "description": "Density exceeding threshold",
  "metadata": {
    "current_density": 0.92,
    "threshold": 0.80
  }
}

### WebSocket Connection

```javascript
// Create WebSocket connection
const ws = new WebSocket("wss://ws.eventops.io");

ws.onopen = () => {
  // Subscribe to channels
  ws.send(
    JSON.stringify({
      action: "subscribe",
      channels: ["gates", "alerts", "crowd_density"],
    })
  );
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  switch (data.channel) {
    case "gates":
      updateGateMetrics(data.payload);
      break;
    case "alerts":
      showNewAlert(data.payload);
      break;
    case "crowd_density":
      updateHeatmap(data.payload);
      break;
  }
};

### Camera Video Stream Integration

```javascript
// Connect RTSP video stream to web player
import JSMpeg from "jsmpeg-player";

const player = new JSMpeg.Player("ws://camera-relay.eventops.io:9999", {
  canvas: document.getElementById("camera-canvas"),
  autoplay: true,
  audio: false,
});

## ⚡ Performance and Optimization

### Frontend Optimization

1. **Code Splitting**

```javascript
// Page-based lazy loading
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Gates = lazy(() => import("./pages/Gates"));

2. **Memoization**

```javascript
// Prevent unnecessary re-renders
const MetricCard = React.memo(({ title, value, icon }) => {
  // Component code
});

3. **Data Virtualization**

```javascript
// Virtual scrolling for large lists
import { FixedSizeList } from "react-window";

### Backend Optimization

1. **Caching Strategy**
    Redis: Real-time metrics (TTL: 30s)
    CDN: Static assets (charts, icons)
    Browser Cache: Component code

2. **Database Indexing**

```sql
-- For time-based queries
CREATE INDEX idx_events_timestamp ON events(timestamp DESC);
CREATE INDEX idx_alerts_severity ON alerts(severity, timestamp);

3. **Query Optimization**

- Aggregate queries: Pre-compute metrics
- Time-series data: Use InfluxDB
- Hot data: Redis cache
- Cold data: PostgreSQL archive

### Real-Time Data Optimization

```javascript
// Reduce API calls with debouncing
const debouncedUpdate = debounce((data) => {
  updateDashboard(data);
}, 500);

// Batch processing
const batchUpdates = (updates) => {
  const batched = updates.reduce((acc, update) => {
    if (!acc[update.gate_id]) {
      acc[update.gate_id] = [];
    }
    acc[update.gate_id].push(update);
    return acc;
  }, {});

  processBatchedUpdates(batched);
};

## 🔒 Security

### Authentication & Authorization

```javascript
// JWT token-based authentication
const authHeader = {
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};

// Role-based access control (RBAC)
const permissions = {
  admin: ["read", "write", "delete", "configure"],
  operator: ["read", "write"],
  viewer: ["read"],
};

### Data Encryption

In Transit: TLS 1.3 (HTTPS, WSS)
At Rest: AES-256 encryption
API Keys: Hashed with bcrypt
Sensitive Data: Field-level encryption

### Camera Security

ONVIF Authentication: Digest/WS-Security
RTSP over TLS (RTSPS)
Network Isolation: VLAN segmentation
Firmware Updates: Regular security patches

### Privacy & Compliance

✅ GDPR Compliance

Anonymize personal data
Data retention policies (30 days)
Right to deletion implemented

✅ KVKK Compliance

Explicit consent mechanism
Transparency in data processing
Security measures documentation

⚠️ Camera Usage Policies

Facial recognition: Disabled (default)
Recording duration: Maximum 30 days
Notification signs: Mandatory
Data sharing: Restricted and encrypted

## 🤝 Contributing

We welcome your contributions! Please follow these steps:

1. **Fork** the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push your branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

### Code Standards

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Unit tests
npm run test

# E2E tests
npm run test:e2e


## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

- **Email:** [support@eventops.io](mailto:support@eventops.io)
- **Documentation:** [Documentation](https://docs.eventops.io)
- **Issue Tracker:** [Issue Tracker](https://github.com/your-org/eventops/issues)
- **Community Forum:** [Community Forum](https://community.eventops.io)

---

## 🙏 Acknowledgements

This project utilizes the following open-source projects:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)
- [YOLOv8](https://github.com/ultralytics/ultralytics)
- [OpenCV](https://opencv.org/)

---

**EventOps** – The Future of Intelligent Event Management
_
````
