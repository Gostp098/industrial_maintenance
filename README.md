# 🔧 Industrial Maintenance

> Full-stack web application for managing industrial maintenance requests — built with a complete end-to-end DevOps pipeline.

[![CI/CD Pipeline](https://github.com/Gostp098/industrial_maintenance/actions/workflows/ci.yml/badge.svg)](https://github.com/Gostp098/industrial_maintenance/actions/workflows/ci.yml)
[![Live](https://img.shields.io/badge/Live-hilali--mariem.duckdns.org-green)](http://hilali-mariem.duckdns.org)
[![Docker](https://img.shields.io/badge/Docker-mariem308-blue)](https://hub.docker.com/u/mariem308)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-GKE-blue)](https://console.cloud.google.com)

---

## 🌍 Live Demo

```
http://hilali-mariem.duckdns.org
```

| Endpoint | Description |
|---|---|
| `http://hilali-mariem.duckdns.org` | Frontend application |
| `http://hilali-mariem.duckdns.org/api/requests` | REST API |
| `http://hilali-mariem.duckdns.org/health` | Health check |
| `http://hilali-mariem.duckdns.org/metrics` | Prometheus metrics |
| `http://34.79.80.250` | Grafana dashboard |

---

## 📐 Architecture

```
                        Internet
                           │
              http://hilali-mariem.duckdns.org
                           │
                    DuckDNS (free DNS)
                           │ → 130.211.82.91
                           │
                   GCP Load Balancer
                           │
    ┌──────────────────────────────────────────┐
    │   GKE Cluster — europe-west1-b           │
    │   Namespace: industrial-maintenance      │
    │                                          │
    │  ┌─────────────────────────────────┐     │
    │  │  Frontend — React + nginx       │     │
    │  │  2 replicas — RollingUpdate     │     │
    │  │  /api/* → proxy → backend:5000  │     │
    │  └──────────────┬──────────────────┘     │
    │                 │ HTTP /api              │
    │  ┌──────────────▼──────────────────┐     │
    │  │  Backend — Node.js + Express    │     │
    │  │  1 replica                      │     │
    │  │  GET/POST/PUT/DELETE /api/requests│    │
    │  │  GET /health  GET /metrics      │     │
    │  └──────────────┬──────────────────┘     │
    │                 │ TCP 5432               │
    │  ┌──────────────▼──────────────────┐     │
    │  │  PostgreSQL 15                  │     │
    │  │  PersistentVolumeClaim 20GB     │     │
    │  └─────────────────────────────────┘     │
    │                                          │
    │  ArgoCD — auto-sync from K8s/ folder     │
    └──────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js 20, Express |
| Database | PostgreSQL 15 |
| Containerisation | Docker, docker-compose |
| Orchestration | Kubernetes — GKE |
| GitOps | ArgoCD |
| CI/CD | GitHub Actions |
| Code Quality | SonarCloud |
| Security | Trivy, ESLint, npm audit |
| Monitoring | Prometheus, Grafana |
| Cloud | Google Cloud Platform — GKE |
| DNS | DuckDNS |

---

## 📁 Project Structure

```
industrial_maintenance/
├── frontend/                   # React SPA
│   └── src/
│       ├── pages/              # Request, Home, Services
│       ├── components/         # Navbar, Footer, Icons
│       ├── api.js              # Axios HTTP client
│       └── environment.js      # API_URL = '/api'
├── backend/                    # Node.js Express API
│   ├── app.js                  # Routes + /health + /metrics
│   ├── server.js               # Entry point
│   ├── db.js                   # PostgreSQL connection pool
│   ├── init-db.js              # DB table initialisation
│   └── tests/
│       └── requests.test.js    # 8 Jest unit tests
├── docker/
│   ├── backend/
│   │   └── Dockerfile          # Node.js container
│   ├── frontend/
│   │   ├── Dockerfile          # Multi-stage nginx container
│   │   └── nginx.conf          # SPA routing + API proxy
│   └── docker-compose.yml      # Local full-stack setup
├── K8s/                        # Kubernetes manifests
│   ├── namespace.yaml          # industrial-maintenance namespace
│   ├── secret.yaml             # DB credentials — never hardcoded
│   ├── postgres.yaml           # PVC + Deployment + Service
│   ├── backend.yaml            # 3 replicas + health probes
│   ├── frontend.yaml           # 2 replicas + LoadBalancer
│   └── argocd-app.yaml         # ArgoCD Application manifest
├── .github/
│   └── workflows/
│       └── ci.yml              # Full CI/CD pipeline
├── sonar-project.properties    # SonarCloud configuration
└── README.md
```

---

## 🚀 Quick Start — docker-compose

```bash
# Clone the repository
git clone https://github.com/Gostp098/industrial_maintenance.git
cd industrial_maintenance

# Start all services (postgres + backend + frontend)
docker-compose -f docker/docker-compose.yml up --build

# Access the app
open http://localhost

# API
curl http://localhost/api/requests

# Metrics
curl http://localhost:5000/metrics
```

---

## ☸️ Kubernetes Deployment

### Prerequisites
- `kubectl` configured
- `minikube` or a GKE cluster

### Deploy on Minikube

```bash
# Start Minikube
minikube start

# Apply manifests in order
kubectl apply -f K8s/namespace.yaml
kubectl apply -f K8s/secret.yaml
kubectl apply -f K8s/postgres.yaml
kubectl apply -f K8s/backend.yaml
kubectl apply -f K8s/frontend.yaml

# Verify all pods are running
kubectl get pods -n industrial-maintenance

# Access the app
minikube service frontend -n industrial-maintenance
```

### Deploy on GKE

```bash
# Authenticate
gcloud container clusters get-credentials industrial-maintenance \
  --zone=europe-west1-b \
  --project=industrial-maintenance-devops

# Apply manifests
kubectl apply -f K8s/

# Get public IP
kubectl get service frontend -n industrial-maintenance
```

### High Availability

| Component | Replicas | Strategy |
|---|---|---|
| Frontend | 2 | RollingUpdate — maxUnavailable: 0 |
| Backend | 1 | RollingUpdate — maxUnavailable: 0 |
| PostgreSQL | 1 | Single instance + PVC 20GB |

---

## 🔄 CI/CD Pipeline

Every push to `main` or `dev` triggers the pipeline automatically:

```
push to main/dev
       │
   ┌───▼───┐
   │ LINT  │  ESLint — backend + frontend
   └───┬───┘
   ┌───▼───┐
   │ TESTS │  Jest — 8 tests with real PostgreSQL service
   └───┬───┘
   ┌───┴──────────────┐
   │                  │
┌──▼────┐      ┌──────▼──────┐
│ BUILD │      │  SONARQUBE  │  run in parallel
└──┬────┘      └─────────────┘
┌──▼──────────────┐
│ npm audit       │  dependency vulnerability scan
│ Trivy scan      │  fails on CRITICAL CVEs
└──┬──────────────┘
┌──▼──────────────────────────────┐
│ Docker build + push to Hub      │  only on main
│ Update K8s manifests (SHA tag)  │
│ ArgoCD auto-redeploys on GKE    │
└─────────────────────────────────┘
```

### Pipeline Stages

| Stage | Tool | Fails On |
|---|---|---|
| Lint | ESLint | Any code style error |
| Tests | Jest + PostgreSQL | Any test failure |
| Build | Vite | Build error |
| SonarQube | SonarCloud | Quality gate failure |
| Dependency scan | npm audit | Critical vulnerability |
| Image scan | Trivy | CRITICAL CVE in Docker image |
| Push | Docker Hub | Authentication or build error |

### Required GitHub Secrets

| Secret | Value |
|---|---|
| `DOCKER_USERNAME` | Docker Hub username |
| `DOCKER_PASSWORD` | Docker Hub password |
| `SONAR_TOKEN` | SonarCloud authentication token |
| `SONAR_HOST_URL` | `https://sonarcloud.io` |

---

## 🔁 GitOps with ArgoCD

ArgoCD watches the `K8s/` folder and automatically deploys any change.

```bash
# Install ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Get admin password
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d

# Access UI
kubectl port-forward svc/argocd-server -n argocd 8080:443
# Open https://localhost:8080

# Apply ArgoCD Application
kubectl apply -f K8s/argocd-app.yaml
```

**How it works:**
1. CI pipeline pushes updated image tags to `K8s/backend.yaml`
2. ArgoCD detects the change in the `K8s/` folder
3. ArgoCD automatically redeploys on GKE
4. Zero manual `kubectl` commands after initial setup ✅

---

## 🔐 Security (DevSecOps)

| Layer | Tool | What it checks |
|---|---|---|
| Code | ESLint | Security anti-patterns in JS |
| Dependencies | npm audit | Known CVEs in npm packages |
| Docker images | Trivy | OS + library vulnerabilities |
| Secrets | GitHub Secrets + K8s Secrets | No hardcoded credentials |
| Quality | SonarCloud | Security hotspots — Grade A |

The pipeline **automatically fails** if a CRITICAL vulnerability is detected in any Docker image.

---

## 📊 Monitoring

### Prometheus metrics endpoint

```bash
curl http://hilali-mariem.duckdns.org/metrics
```

| Metric | Type | Description |
|---|---|---|
| `http_requests_total` | Counter | Total HTTP requests |
| `http_request_duration_ms_sum` | Counter | Total request duration |
| `nodejs_process_uptime_seconds` | Gauge | Process uptime |
| `db_pool_total` | Gauge | DB connection pool size |
| `db_pool_idle` | Gauge | Idle DB connections |
| `db_pool_waiting` | Gauge | Waiting DB requests |

### Install Prometheus + Grafana (Helm)

```bash
helm repo add prometheus-community \
  https://prometheus-community.github.io/helm-charts

helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set grafana.service.type=LoadBalancer

# Get Grafana IP
kubectl get service monitoring-grafana -n monitoring

# Get Grafana password
kubectl --namespace monitoring get secrets monitoring-grafana \
  -o jsonpath="{.data.admin-password}" | base64 -d
```

**Grafana:** `http://34.79.80.250` — login: `admin`

---

## 🧪 Running Tests Locally

```bash
cd backend
npm ci
npm test -- --coverage

# Results:
# ✓ GET /api/requests → 200
# ✓ GET /api/requests/:id → 200
# ✓ GET /api/requests/:id → 404
# ✓ POST /api/requests → 201
# ✓ POST /api/requests → 400
# ✓ PUT /api/requests/:id → 200
# ✓ DELETE /api/requests/:id → 200
# ✓ DELETE /api/requests/:id → 404
# Tests: 8 passed, 8 total
```

Coverage report: `backend/coverage/lcov-report/index.html`

---

## 🐛 Known Issues & Solutions

| Problem | Cause | Solution |
|---|---|---|
| Postgres CrashLoopBackOff on Minikube | `lost+found` in PVC mount | Added `PGDATA=/var/lib/postgresql/data/pgdata` |
| Backend exits immediately | `process.exit(0)` in init-db.js | Removed exit, added `require.main === module` guard |
| 404 on form submit | `createRequest` used wrong axios call | Changed to `api.post('/requests', data)` |
| K8s cached old image | `latest` tag not re-pulled | Used versioned tags `v2`, `v3` with `kubectl set image` |
| SonarQube fails in CI | `localhost:9000` unreachable | Switched to SonarCloud |

---

## 📈 Improvement Suggestions

### CI/CD
- Add integration tests between frontend and backend
- Implement blue/green deployment strategy
- Add performance testing with k6

### Security
- Add JWT authentication to protect routes
- Implement rate limiting on API endpoints
- Use Sealed Secrets for encrypted K8s secrets

### Performance
- Add Redis caching for frequent DB queries
- Implement Horizontal Pod Autoscaler (HPA)
- Add CDN for static frontend assets

### Monitoring
- Create custom Grafana dashboards for app metrics
- Set up alerting rules in Alertmanager
- Add distributed tracing with Jaeger

---

## 📋 Evaluation Criteria

| Criterion | Points | Status |
|---|---|---|
| Plan Agile | 2 | ✅ GitHub Projects + user stories + sprint |
| Git & organisation | 2 | ✅ Clean structure + branches + README |
| CI pipeline | 4 | ✅ Lint + Test + Build + Sonar + Docker push |
| CD (GitOps + Kubernetes) | 4 | ✅ GKE + ArgoCD auto-sync |
| DevSecOps | 3 | ✅ Trivy + npm audit + Secrets |
| Monitoring | 3 | ✅ Prometheus + Grafana + /metrics |
| Qualité globale | 2 | ✅ Functional + automated + deployed |
| **Total** | **20** | ✅ |

---

## 👩‍💻 Author

**Mariem Hilali**
IT Business School — Pratique DevOps 2025–2026
Encadrant: Mohamed Najeh ISSAOUI — issaoui.mn@itbs.tn
