# DeadlineRadar 🎯
### Smart Student Deadline & Priority Manager

**Let's make it happen!**

DeadlineRadar is a full-stack student productivity application designed to help students manage assignments, examinations, registrations, events and other important deadlines in one place.

## 🚀 Live Demo

[Open DeadlineRadar](https://deadline-radar-smoky.vercel.app/)

## ✨ Features

- **Dashboard:** Overview of total, completed, pending and overdue tasks.
- **Task Management:** Create, edit, complete and delete tasks.
- **Smart Prioritization:** Suggested priorities based on approaching deadlines.
- **Deadline Radar:** Visual representation of upcoming and overdue tasks.
- **Calendar:** View tasks according to their due dates.
- **Analytics:** Priority distribution, completion rate and weekly productivity.
- **Recent Activity:** Track task creation, updates, completion and deletion.
- **Settings:** Customize profile and application preferences.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React |
| Styling | Tailwind CSS |
| Backend | Python, Django |
| API | Django REST Framework |
| Database | SQLite (local development), PostgreSQL (production) |
| Charts | Recharts |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

## 🏗️ Architecture

- Next.js handles the user interface and client-side interactions.
- Django REST Framework provides the backend API.
- PostgreSQL stores production task and activity data.
- The frontend communicates with the backend through REST API endpoints.

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/nipuntamore/DeadlineRadar.git
cd DeadlineRadar
```

### 2. Setup the backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create a `backend/.env` file with your local development settings, including a Django secret key and `DEBUG=True`.

Then run:

```bash
python manage.py migrate
python manage.py runserver
```

### 3. Setup the frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

Open http://localhost:3000.

## 📁 Project Structure

```text
DeadlineRadar/
├── frontend/
│   ├── src/
│   │   └── app/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── tasks/
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

## 🌐 Deployment

- Frontend: Vercel
- Backend: Render
- Production database: PostgreSQL

Production environment variables must be configured through the respective hosting dashboards. Never commit secret keys or environment files.

## 👨‍💻 Developer

**Nipun Tamore**

---

*DeadlineRadar — Let's make it happen!*
