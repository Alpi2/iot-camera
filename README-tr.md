# EventOps - Intelligent Event Operations Management Platform

![EventOps Platform](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 İçindekiler

- [Genel Bakış](#-genel-bakış)
- [Temel Özellikler](#-temel-özellikler)
- [Sistem Mimarisi](#-sistem-mimarisi)
- [Kamera Entegrasyonu ve Veri Akışı](#-kamera-entegrasyonu-ve-veri-akışı)
- [Modüller ve Ekranlar](#-modüller-ve-ekranlar)
- [Teknoloji Yığını](#-teknoloji-yığını)
- [Kurulum](#-kurulum)
- [Kullanım Kılavuzu](#-kullanım-kılavuzu)
- [API Entegrasyonu](#-api-entegrasyonu)
- [Performans ve Optimizasyon](#-performans-ve-optimizasyon)
- [Güvenlik](#-güvenlik)
- [Katkıda Bulunma](#-katkıda-bulunma)

---

## 🎯 Genel Bakış

**EventOps**, büyük ölçekli etkinlikler için tasarlanmış, yapay zeka destekli, gerçek zamanlı operasyon yönetim platformudur. Platform, modern bilgisayarlı görü (Computer Vision) teknolojileri, IoT sensörleri ve akıllı analitik motorları kullanarak etkinlik operatörlerine kapsamlı bir kontrol merkezi sunar.

### Kullanım Alanları

- 🎪 Konserler ve Festivaller
- 🏟️ Stadyum ve Arena Etkinlikleri
- 🎭 Konferans ve Fuarlar
- 🎨 Sanat ve Kültür Etkinlikleri
- 🏛️ Müze ve Sergi Alanları
- 🎉 Özel Etkinlikler ve Toplantılar

### Temel Problem ve Çözüm

**Problem:** Büyük etkinliklerde yüzlerce giriş noktası, binlerce ziyaretçi ve karmaşık güvenlik protokolleri manuel olarak yönetilemez duruma gelir. Kalabalık kontrolü, güvenlik riskleri ve operasyonel verimsizlikler ciddi sorunlara yol açar.

**Çözüm:** EventOps, IP kameralar, termal sensörler ve IoT cihazlarından gelen verileri gerçek zamanlı olarak işleyerek operatörlere anlamlı bilgiler sunar. Sistem, potansiyel sorunları önceden tespit eder, otomatik uyarılar gönderir ve karar vericilere veri odaklı öneriler sunar.

---

## ✨ Temel Özellikler

### 1. **Gerçek Zamanlı Kalabalık İzleme**

- Kamera tabanlı insan sayımı ve yoğunluk analizi
- Isı haritası (heatmap) görselleştirmesi
- Kapasite aşımı için otomatik uyarılar
- Sosyal mesafe takibi (isteğe bağlı)

### 2. **Akıllı Kapı Yönetimi**

- Her kapı için ayrı in/out sayaçları
- Gerçek zamanlı akış hızı hesaplama
- Kapı performans karşılaştırmaları
- Otomatik darboğaz tespiti

### 3. **Kuyruk Optimizasyonu**

- Canlı kuyruk uzunluğu takibi
- Tahmini bekleme süresi hesaplama
- Yük dengeleme önerileri
- Şerit (lane) bazlı performans analizi

### 4. **Çoklu Katman Uyarı Sistemi**

- Önem derecesine göre sınıflandırma (Düşük/Orta/Yüksek)
- Kategori bazlı filtreleme
- Kronolojik olay zaman çizelgesi
- Otomatik bildirim sistemi

### 5. **IoT ve Altyapı İzleme**

- Elektrik, su, HVAC sistem takibi
- Ağ ve sensör çalışma durumu
- Çevre koşulları (sıcaklık, nem)
- Cihaz sağlık durumu göstergeleri

### 6. **Yapay Zeka Destekli Raporlama**

- Etkinlik sonrası detaylı analiz
- Zirve saatler ve trendler
- Darboğaz ve iyileştirme önerileri
- PDF/PPT formatında dışa aktarım

---

## 🏗️ Sistem Mimarisi

```
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
│  (Scalability için zorunlu - 30+ kamera üstü)               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Edge Devices (NVIDIA Jetson Orin Nano / AGX Orin)   │   │
│  │  - Yerel Computer Vision (YOLOv8 Object Detection)   │   │
│  │  - Crowd Counting & Heat Map (local)                 │   │
│  │  - Anomaly Detection (pre-filter)                    │   │
│  │  → Raw video işlenir, sadece METADATA JSON gönderilir│   │
│  │    (Kişi sayısı, koordinat, event → KB/sn)           │   │
│  │  Avantaj: Bandwidth %99 azalır, latency düşer        │   │
│  └──────────────────────────────────────────────────────┐   │
└─────────────────────────────────────────────────────────────┘
        │                          │
        │                          │  (Küçük sistemler: 20-30 kamera)
        │                          │  → Direkt central'a RTSP/raw stream
        │                          ▼
        │                ┌──────────────────────────────┐
        │                │   CENTRAL DATA PROCESSING    │
        │                │         LAYER (Hybrid)       │
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
```

---

## 📹 Kamera Entegrasyonu ve Veri Akışı

### Kamera Altyapısı

EventOps platformu, etkinlik alanına yerleştirilmiş stratejik IP kameralardan gelen görüntüleri işleyerek anlık ve geçmiş verileri kullanıcı arayüzüne aktarır.

#### Kamera Tipleri ve Konumlandırma

1. **Giriş Kapıları Kameraları**

   - **Amaç:** Giriş/çıkış sayımı, kimlik doğrulama
   - **Yerleşim:** Her kapının üstünde, kuş bakışı açısı
   - **Çözünürlük:** Minimum 1080p, tercihen 4K
   - **Teknoloji:** İnsan tespiti ve sayım algoritmaları

2. **Kuyruk İzleme Kameraları**

   - **Amaç:** Kuyruk uzunluğu, bekleme süresi tahmini
   - **Yerleşim:** Kuyruk alanlarının yanları ve üstü
   - **Teknoloji:** Yoğunluk haritası, mesafe ölçümü

3. **Kalabalık Yoğunluk Kameraları**

   - **Amaç:** Alan yoğunluğu, güvenlik riskleri
   - **Yerleşim:** Merkezi alanlar, koridorlar, sahne önü
   - **Teknoloji:** Kalabalık yoğunluğu tespiti, ısı haritası

4. **Çevre ve Güvenlik Kameraları**
   - **Amaç:** Genel gözetim, olay tespiti
   - **Yerleşim:** Park alanları, acil çıkışlar, otopark

### Veri İşleme Akışı

```
┌──────────────────────────────────────────────────────────────┐
│                    KAMERADAN ARAYÜZE VERİ AKIŞI              │
└──────────────────────────────────────────────────────────────┘

1.VIDEO CAPTURE (Görüntü Yakalama)
   ├─ IP Kameralar: RTSP/ONVIF protokolü ile bağlantı
   ├─ Frame Rate: 15-30 FPS
   ├─ Format: H.264/H.265 codec
   └─ Not: Büyük ölçekli sistemlerde (30+ kamera) raw stream edge device'a yönlendirilir
2. PREPROCESSING (Ön İşleme) – Edge veya Central
   ├─ Görüntü Kalitesi İyileştirme
   ├─ Gürültü Azaltma
   ├─ Perspektif Düzeltme
   └─ ROI (Region of Interest) Belirleme
   └─ Edge'de yerel olarak yapılır (latency düşer)
3. COMPUTER VISION PROCESSING (Görüntü İşleme) – Hybrid
   ├─ Object Detection (Nesne Tespiti)
   │  ├─ YOLOv8 / Faster R-CNN kullanımı (TensorRT optimized)
   │  ├─ İnsan tespiti ve sınıflandırma
   │  └─ Güven skoru filtreleme (>0.7)
   │
   ├─ Tracking (Takip)
   │  ├─ DeepSORT algoritması
   │  ├─ Kişi kimlik takibi
   │  └─ Geçiş yönü belirleme (in/out)
   │
   ├─ Crowd Counting (Kalabalık Sayımı)
   │  ├─ Yoğunluk tahmini modelleri
   │  ├─ Isı haritası oluşturma (local edge'de ön işleme)
   │  └─ Kapasite hesaplama
   │
   └─ Queue Analysis (Kuyruk Analizi)
   ├─ Kuyruk uzunluğu ölçümü
   ├─ Bekleme süresi tahmini
   └─ Akış hızı hesaplama
   └─ Edge'de temel processing → Sadece METADATA JSON central'a gönderilir
   (Bandwidth %99 azalır: Raw video yerine KB/sn veri)
4. DATA AGGREGATION (Veri Birleştirme) – Central Katman
   ├─ Çoklu edge/central kaynaklardan veri birleştirme
   ├─ Bölge bazlı istatistik hesaplama
   ├─ Zaman serisi verileri oluşturma
   └─ Metrik hesaplama (throughput, density, etc.)
   └─ Küçük sistemlerde (20-30 kamera) direkt central processing fallback
5. REAL-TIME ANALYTICS (Gerçek Zamanlı Analitik) – Central
   ├─ Anomali Tespiti
   │  └─ Eşik değer aşımları, anormal davranışlar
   ├─ Trend Analizi
   │  └─ Zirve saatler, mevsimsel paternler
   └─ Predictive Alerts
   └─ Potansiyel sorun tahmini (global view)
6. API LAYER (API Katmanı)
   ├─ WebSocket: Gerçek zamanlı veri akışı (100ms gecikme)
   ├─ REST API: Tarihsel veri sorgulaları
   └─ GraphQL: Karmaşık veri ilişkileri
7. FRONTEND VISUALIZATION (Arayüz Görselleştirme)
   ├─ Dashboard
   │  ├─ Canlı metrik kartları (Total Visitors: 47,892)
   │  ├─ Isı haritası görseli (Crowd Density Heatmap)
   │  ├─ Canlı uyarı beslemesi
   │  └─ Zaman bazlı grafikler
   │
   ├─ Gates Module
   │  ├─ Kapı başına in/out sayıları
   │  ├─ Mini grafikler (sparklines)
   │  └─ Performans karşılaştırmaları
   │
   ├─ Queues Module
   │  ├─ Yük seviyesi göstergeleri (85%, 92%)
   │  ├─ Tahmini bekleme süreleri (28 min)
   │  └─ Kuyruk uzunluğu grafikleri
   │
   └─ Alerts Module
   ├─ Önem dereceli uyarılar
   ├─ Kategori dağılımı (pie chart)
   └─ Olay kronolojisi (timeline)
```

### Veri Formatları ve Örnekler

#### Kamera Çıktısı (Ham Veri)

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
```

#### API Çıktısı (Frontend'e Gönderilen Veri)

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

### Isı Haritası (Heatmap) Oluşturma

Kamera görüntülerinden elde edilen kalabalık yoğunluğu verileri, arayüzde görsel ısı haritalarına dönüştürülür:

1. **Veri Toplama:** Her kamera 2 dakikada bir yoğunluk verisi gönderir
2. **Grid Mapping:** Alan 10x10 grid hücrelerine bölünür
3. **Density Calculation:** Her hücre için kişi/m² hesaplanır
4. **Color Mapping:**
   - Yeşil: Düşük yoğunluk (0-30%)
   - Sarı: Orta yoğunluk (30-60%)
   - Turuncu: Yüksek yoğunluk (60-80%)
   - Kırmızı: Kritik yoğunluk (80-100%)
5. **Rendering:** Canvas API ile gerçek zamanlı görselleştirme

---

## 📊 Modüller ve Ekranlar

### 1. Dashboard (Canlı Operasyon Merkezi)

**Amaç:** Etkinliğin genel durumunu tek bakışta görmek

**Bileşenler:**

- **Metrik Kartları:** Total Visitors (47,892), Gate Flow Rate (1,240/hr), Active Alerts (12), Queue Load Index (68%)
- **Isı Haritası:** Kalabalık yoğunluğu görselleştirmesi
- **Canlı Uyarı Akışı:** Son uyarılar ve durumları
- **Olay Zaman Çizelgesi:** Kronolojik olay listesi
- **Grafikler:** Kapı akışı ve kuyruk yükü trendleri

**Veri Kaynağı:**

- Kamera: Ziyaretçi sayımı, yoğunluk haritası
- Kapı Tarayıcıları: Giriş/çıkış verileri
- Sensörler: Kuyruk uzunluğu
- AI Motor: Anomali tespiti, uyarı oluşturma

### 2. Gates (Kapı Yönetim Sistemi)

**Amaç:** Her kapının performansını detaylı izlemek

**Bileşenler:**

- **Filtre Çubuğu:** Kapı, zaman aralığı, durum filtreleri
- **Kapı Liste Paneli:** Her kapı için kart görünümü
  - In/Out sayaçları
  - Mini trend grafikleri
  - Durum göstergeleri (yeşil/sarı/kırmızı)
  - Yüzdelik değişim rozetleri
- **Analitik Alanı:** Çubuk grafik ile kapı karşılaştırması
- **Detay Çekmecesi:** Seçili kapının genişletilmiş bilgileri

**Veri Kaynağı:**

- Kapı Üstü Kameralar: In/out sayımı, yön tespiti
- RFID/QR Tarayıcılar: Doğrulama verileri
- Zaman Analizi: İşlem hızı, ortalama geçiş süresi

### 3. Queues (Kuyruk Optimizasyon Merkezi)

**Amaç:** Kuyruk verimliliğini maksimize etmek

**Bileşenler:**

- **Kuyruk Özet Kartları:** Her kuyruk için yük seviyesi, bekleme süresi, durum
- **Isı Haritası Modülü:** Kuyrukların görsel yoğunluk gösterimi
- **Zaman Grafiği:** Kuyruk uzunluğunun zaman içindeki değişimi
- **Şerit Durumu Izgarası:** Her şeritin aktiflik ve verim durumu
- **Uyarı Paneli:** Kuyrukla ilgili uyarılar

**Veri Kaynağı:**

- Kuyruk Kameraları: Kişi sayımı, kuyruk uzunluğu
- Sensörler: Alan kapasitesi
- AI Tahmin Modeli: Bekleme süresi tahmini
- Tarayıcı Verileri: İşlem hızı

### 4. Alerts (Uyarı ve Olay Yönetimi)

**Amaç:** Proaktif sorun çözümü ve olay takibi

**Bileşenler:**

- **Filtre Çubuğu:** Önem derecesi (Düşük/Orta/Yüksek), kategori, zaman
- **Uyarı Listesi:** Tablo formatında detaylı uyarılar
  - Önem simgesi
  - Zaman damgası
  - Konum
  - Açıklama
- **Kategori Dağılımı:** Pasta grafik
- **Olay Kronolojisi:** Dikey zaman çizelgesi
- **Detay Çekmecesi:** Uyarı detayları ve aksiyon butonları

**Uyarı Tipleri:**

- **Kalabalık Güvenliği:** Yoğunluk eşiği aşımı
- **Kuyruk Yönetimi:** Aşırı bekleme süresi
- **Ekipman:** Tarayıcı arızası, kamera bağlantı kopması
- **Operasyonel:** Personel eksikliği
- **Acil Durum:** Tıbbi müdahale, güvenlik olayı

### 5. Utilities (IoT Altyapı İzleme)

**Amaç:** Etkinlik altyapısının sağlığını garanti altına almak

**Bileşenler:**

- **Sistem Sağlık Kartları:** Elektrik, Su, Ağ, HVAC, Sensörler
  - Durum rozeti
  - Anlık değer
  - Mini trend grafikleri
- **Çevre İzleme:** Sıcaklık ve nem göstergeleri
- **Ağ Çalışma Süresi:** Gateway performans grafikleri
- **Sensör Bölge Durumu:** Bölge bazlı uptime
- **IoT Cihaz Listesi:** Tüm cihazların anlık durumu

**Veri Kaynağı:**

- Akıllı Sayaçlar: Elektrik/su tüketimi
- Termal Sensörler: Sıcaklık, nem
- Ağ Cihazları: Uptime, bant genişliği
- HVAC Sistemi: Klima durumu

### 6. Event Report (Etkinlik Sonrası Analitik)

**Amaç:** Etkinlik performansını değerlendirmek ve gelecek için öngörüler oluşturmak

**Bileşenler:**

- **Hero Metrikler:** Toplam ziyaretçi, zirve saati, maksimum yük, toplam olay
- **Katılım Grafiği:** Kümülatif ziyaretçi eğrisi
- **Kapı Performansı:** Karşılaştırmalı çubuk grafik
- **Uyarı Dağılımı:** Kategori bazlı pasta grafik
- **AI Öngörüleri Modülü:**
  - Zirve dönemler
  - Darboğaz noktaları
  - İyileştirme önerileri
  - Olaylı dönemler
- **İstatistik Tablosu:** Detaylı metrikler ve karşılaştırmalar
- **Dışa Aktarım:** PDF/PPT formatında rapor indirme

**AI Öngörü Örnekleri:**

```
🔴 YÜKSEK ÖNCELİK
"Zirve Katılım Dönemi"
Maksimum ziyaretçi akışı 14:00 - 16:00 arasında gerçekleşti.
Saat başına 18,200 giriş ile kapasite %92'ye ulaştı.

🟡 ORTA ÖNCELİK
"Kapı Performans Varyansı"
North Gate A, %15 daha yüksek verimlilik gösterdi.
Optimize personel ataması etkili oldu.

🔴 YÜKSEK ÖNCELİK
"Kuyruk Darboğazı"
Queue C'de zirve saatlerde 30+ dakika bekleme süresi.
Ek şerit açılması önerilir.
```

---

## 🛠️ Teknoloji Yığını

### Frontend

- **Framework:** React 18.x
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.0
- **Charts:** Recharts
- **Icons:** Lucide React
- **State Management:** React Hooks (useState, useEffect, useContext)
- **Real-time Communication:** WebSocket / Socket.io

### Backend (Entegrasyon için Önerilen)

- **API Gateway:** Node.js + Express / FastAPI (Python)
- **Real-time Engine:** Socket.io / Redis Pub/Sub
- **Database:**
  - PostgreSQL (İlişkisel veri)
  - InfluxDB (Zaman serisi verileri)
  - Redis (Cache ve gerçek zamanlı veri)
- **Message Queue:** RabbitMQ / Apache Kafka
- **File Storage:** MinIO / AWS S3

### Computer Vision & AI

- **Detection:** YOLOv8, Faster R-CNN
- **Tracking:** DeepSORT, ByteTrack
- **Crowd Counting:** CSRNet, MCNN
- **Framework:** PyTorch, OpenCV
- **Inference:** NVIDIA TensorRT, ONNX Runtime

### Infrastructure

- **Container:** Docker, Kubernetes
- **Monitoring:** Prometheus, Grafana
- **Logging:** ELK Stack (Elasticsearch, Logstash, Kibana)
- **Load Balancer:** Nginx, HAProxy

### Hardware Gereksinimleri

**Kamera Sistemi:**

- IP Kameralar: Minimum 1080p, ONVIF uyumlu
- Frame Rate: 15-30 FPS
- Codec: H.264/H.265
- Ağ: Gigabit Ethernet

**İşleme Sunucusu:**

- CPU: 16+ Core (Intel Xeon / AMD EPYC)
- GPU: NVIDIA A100 / L4 / A4000 (çoklu kamera için)
- RAM: 64GB+
- Storage: 2TB+ NVMe SSD
- Network: 10Gbps

---

## 🚀 Kurulum

### Ön Gereksinimler

```bash
# Node.js 20+ ve npm gereklidir
node --version  # v18.0.0+
npm --version   # v9.0.0+
```

### Adım 1: Projeyi Klonlama

```bash
git clone https://github.com/your-org/eventops-platform.git
cd eventops-platform
```

### Adım 2: Bağımlılıkları Yükleme

```bash
npm install
```

### Adım 3: Ortam Değişkenlerini Ayarlama

`.env` dosyası oluşturun:

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

```

### Adım 4: Geliştirme Sunucusunu Başlatma

```bash
npm start
```

Tarayıcınızda `http://localhost:3000` adresini açın.

### Adım 5: Production Build

```bash
npm run build
```

Build dosyaları `build/` klasöründe oluşturulacaktır.

---

## 📖 Kullanım Kılavuzu

### İlk Giriş ve Kurulum

1. **Etkinlik Oluşturma**

   ```
   Settings > Events > Create New Event
   - Event Name: Summer Music Festival 2025
   - Date: 2025-12-12
   - Venue: Central Stadium
   - Expected Attendance: 50,000
   ```

2. **Kapıları Tanımlama**

   ```
   Configuration > Gates > Add Gate
   - Gate ID: north_gate_a
   - Name: North Gate A
   - Capacity: 1000/hour
   - Camera IDs: CAM_01, CAM_02
   ```

3. **Kameraları Bağlama**
   ```
   Configuration > Cameras > Add Camera
   - Camera ID: CAM_NORTH_GATE_A_01
   - RTSP URL: rtsp://192.168.1.100:554/stream
   - Type: Entry Point
   - Location: North Gate A
   - Enable Object Detection: Yes
   ```

### Gerçek Zamanlı Operasyon

#### Dashboard Kullanımı

```
1. Üst menüden "Dashboard" seçin
2. Metrik kartlarında anlık verileri görüntüleyin
3. Isı haritasında kalabalık yoğunluğunu kontrol edin
4. Uyarı akışında aktif problemleri takip edin
5. Grafiklerden trendleri analiz edin
```

#### Uyarı Yanıtlama

```
Alerts > [Uyarıya tıklayın]
- Uyarı detaylarını inceleyin
- "Acknowledge Alert" ile onaylayın
- "Assign to Team" ile ekibe atayın
- Yorumlar ekleyin
- Durumu güncelleyin
```

### Raporlama

```
Event Report > Export
- PDF Raporu: Özet metrikler ve grafikler
- PPT Sunumu: Yönetim sunumu için
- CSV Verisi: Detaylı veri analizi için
```

---

## 🔌 API Entegrasyonu

### REST API Endpoints

#### Gerçek Zamanlı Veriler

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
```

#### Kapı Verileri

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
```

#### Uyarı Oluşturma

```http
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
```

### WebSocket Bağlantısı

```javascript
// WebSocket bağlantısı oluşturma
const ws = new WebSocket("wss://ws.eventops.io");

ws.onopen = () => {
  // Abone olma
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
```

### Kamera Video Akışı Entegrasyonu

```javascript
// RTSP video akışını web player'a bağlama
import JSMpeg from "jsmpeg-player";

const player = new JSMpeg.Player("ws://camera-relay.eventops.io:9999", {
  canvas: document.getElementById("camera-canvas"),
  autoplay: true,
  audio: false,
});
```

---

## ⚡ Performans ve Optimizasyon

### Frontend Optimizasyonu

1. **Code Splitting**

   ```javascript
   // Lazy loading ile sayfa bazlı yükleme
   const Dashboard = lazy(() => import("./pages/Dashboard"));
   const Gates = lazy(() => import("./pages/Gates"));
   ```

2. **Memoization**

   ```javascript
   // Gereksiz render'ları önleme
   const MetricCard = React.memo(({ title, value, icon }) => {
     // Component kodu
   });
   ```

3. **Data Virtualization**
   ```javascript
   // Büyük listeler için sanal kaydırma
   import { FixedSizeList } from "react-window";
   ```

### Backend Optimizasyonu

1. **Caching Strategy**

   ```
   - Redis: Gerçek zamanlı metrikler (TTL: 30s)
   - CDN: Statik varlıklar (grafik, ikonlar)
   - Browser Cache: Component kodu
   ```

2. **Database Indexing**

   ```sql
   -- Zaman bazlı sorgular için
   CREATE INDEX idx_events_timestamp ON events(timestamp DESC);
   CREATE INDEX idx_alerts_severity ON alerts(severity, timestamp);
   ```

3. **Query Optimization**
   ```
   - Aggregate queries: Pre-compute metrikler
   - Time-series data: InfluxDB kullanımı
   - Hot data: Redis cache
   - Cold data: PostgreSQL archive
   ```

### Gerçek Zamanlı Veri Optimizasyonu

```javascript
// Debouncing ile API çağrılarını azaltma
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
```

---

## 🔒 Güvenlik

### Authentication & Authorization

```javascript
// JWT token bazlı kimlik doğrulama
const authHeader = {
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};

// Role-based access control (RBAC)
const permissions = {
  admin: ["read", "write", "delete", "configure"],
  operator: ["read", "write"],
  viewer: ["read"],
};
```

### Data Encryption

```
- Transit: TLS 1.3 (HTTPS, WSS)
- At Rest: AES-256 encryption
- API Keys: Hashed with bcrypt
- Sensitive Data: Field-level encryption
```

### Camera Security

```
- ONVIF Authentication: Digest/WS-Security
- RTSP over TLS (RTSPS)
- Network Isolation: VLAN segmentation
- Firmware Updates: Regular security patches
```

### Privacy & Compliance

```
✅ GDPR Compliance
- Anonimize kişi verileri
- Veri saklama politikaları (30 gün)
- Silme hakkı implementasyonu

✅ KVKK Uyumluluk
- Açık rıza mekanizması
- Veri işleme şeffaflığı
- Güvenlik tedbirleri dokümantasyonu

⚠️ Kamera Kullanım İlkeleri
- Yüz tanıma: Devre dışı (varsayılan)
- Kayıt süresi: Maksimum 30 gün
- Bilgilendirme tabelaları: Zorunlu
- Veri paylaşımı: Sınırlı ve şifreli
```

---

## 🤝 Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Lütfen şu adımları takip edin:

1. **Fork** edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. **Pull Request** açın

### Kod Standartları

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

## 📞 İletişim ve Destek

- **Email:** [support@eventops.io](mailto:support@eventops.io)
- **Documentation:** [Documentation](https://docs.eventops.io)
- **Issue Tracker:** [Issue Tracker](https://github.com/Alpi2/iot-camera.git)
- **Community Forum:** [Community Forum](https://community.eventops.io)

---

## 🙏 Teşekkürler

Bu proje aşağıdaki açık kaynak projelerden yararlanmaktadır:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)
- [YOLOv8](https://github.com/ultralytics/ultralytics)
- [OpenCV](https://opencv.org/)

---

**EventOps** - Akıllı Etkinlik Yönetiminin Geleceği
