# Personal Portfolio Website 

A full–stack personal portfolio website built as a self-learning project.  
The system includes a public portfolio site (projects, blog, gallery, contact)  
and a backend for managing posts, projects, and blogs.

---

## Live Demo

- **Portfolio Website:** https://mynextportfolio-8utt.vercel.app/
- **Backend API Live:** https://mynextportfolio.vercel.app/
- **Source Code:** https://github.com/truongthanhha-dev/mynextportfolio
  
> Source code managed with Git and hosted on GitHub.

---

##  Main Features

###  User-facing Portfolio Website

- Beautiful landing page with introduction & personal branding  
- Project showcase section with thumbnails and details  
- Blog section for sharing knowledge & learning journey  
- Photography / gallery page  
- Contact form (API-based)  
- Smooth animations and clean modern design  

---

###  Admin-side Features (Backend/API)

- Manage **projects** (create / update / delete)  
- Manage **blog posts**  
- Store and view **contact messages**  
- API supports CRUD operations for dynamic content  
- MongoDB database integration  

---

##  Tech Stack

### Frontend
- **Next.js**
- **React.js**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**

### Backend
- **Next.js API Routes**
- **MongoDB / Mongoose**

### Tools
- **Git & GitHub**
- **Vercel**
- **Figma**

---

##  Project Structure (Monorepo)

```
mynextportfolio/
├── BACKEND/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── models/
│   ├── pages/
│   ├── public/
│   └── styles/
│
├── FRONTEND/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── models/
│   ├── pages/
│   ├── public/
│   ├── styles/
│   └── utils/
│
└── README.md
```

---

##  Getting Started (Local Development)

>  Backend and Frontend run separately.  
> Ensure MongoDB is running and `MONGODB_URI` is valid.

### 1. Clone the repository

```bash
git clone https://github.com/truongthanhha-dev/mynextportfolio.git
cd mynextportfolio
```

---

### 2. Setup the Backend

```bash
cd BACKEND
npm install
```

Create `.env` file in `BACKEND/`:

```env
MONGODB_URI=your_mongodb_connection_string
```

Run backend:

```bash
npm run dev
```

Backend default URL:

```
http://localhost:3001
```

---

### 3. Setup the Frontend

Open a new terminal:

```bash
cd FRONTEND
npm install
npm run dev
```

Frontend default URL:

```
http://localhost:3000
```


---

##  Project Goals & Learning Outcomes

- Build a complete personal portfolio with real content  
- Practice full-stack development using Next.js + MongoDB  
- Improve UI/UX, animations, and responsive layout  
- Learn monorepo structure (`FRONTEND` + `BACKEND`)  
- Strengthen Git & GitHub workflow  
- Deploy a real-world portfolio for job applications  

---

##  Author

**Trương Thanh Hạ – Web Developer**

- GitHub: https://github.com/truongthanhha-dev  
- Portfolio: https://mynextportfolio-8utt.vercel.app/  
- Email: **hatruongcoder@gmail.com**
