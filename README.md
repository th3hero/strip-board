<div align="center">

# 🎯 Priority Strip

### Visual Task Management Inspired by ATC Flight Strip Boards

**Focus on what matters. One task at a time.**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[Demo](https://strip-board.vercel.app) • [Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 About

**Priority Strip** is a personal productivity tool that brings the clarity of Air Traffic Control (ATC) flight strip boards to your task management. Instead of drowning in endless todo lists, Priority Strip helps you focus on what truly matters through visual priority ordering and intelligent time tracking.

### Why Priority Strip?

- 🎯 **Visual Priority** - See your #1 task at a glance with clear visual hierarchy
- 🖱️ **Intuitive Reordering** - Drag and drop to instantly reprioritize
- ⏱️ **Automatic Time Tracking** - Know exactly how long you've worked on each task
- 📝 **Full Audit Trail** - Every status change is logged with timestamps
- 🚀 **Fast & Lightweight** - Built with modern web technologies for speed
- 🔒 **Privacy-First** - Self-hosted, your data stays with you

Perfect for developers, freelancers, and anyone who needs to manage multiple priorities without the complexity of enterprise project management tools.

---

## ✨ Features

### Core Functionality

- **🎯 Priority-First Design**
  - Visual strip board with clear #1 priority indicator
  - Drag & drop to reorder tasks instantly
  - Bottom-to-top priority stack metaphor

- **⏱️ Smart Time Tracking**
  - Automatic timer starts when you begin working
  - Pause/resume functionality
  - Accurate work time calculation (excludes breaks)
  - View total time spent on completed tasks

- **📊 Status Management**
  - Todo → In Progress → Done workflow
  - Blocked status with mandatory reason
  - Paused status for interruptions
  - Automatic status transitions with comments

- **💬 Comment History**
  - Full audit trail of all changes
  - Timestamps for every status change
  - Deprioritization reasons logged
  - Block reasons documented

- **📝 Rich Task Details**
  - Title and description
  - Expandable task cards
  - Edit tasks anytime
  - Delete with confirmation

- **✅ Completed Tasks Sidebar**
  - Separate view for finished work
  - Accordion-style history
  - See your accomplishments
  - Review time spent

### Technical Highlights

- **Modern Stack**: Next.js 16, TypeScript, MongoDB
- **Real-time Updates**: TanStack Query with optimistic UI
- **Beautiful UI**: shadcn/ui components with Tailwind CSS
- **Drag & Drop**: Smooth interactions with dnd-kit
- **Authentication**: Secure login with NextAuth
- **Responsive**: Works on desktop and tablet

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB (Atlas account or local instance)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/th3hero/strip-board.git
cd strip-board

# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local

# Edit .env.local with your MongoDB URI and secrets
# MONGODB_URI=your-mongodb-connection-string
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
# NODE_ENV=development

# Seed the database with initial user
npm run seed  # Creates admin@email.com / Admin@123

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and login with:
- **Email**: admin@email.com
- **Password**: Admin@123

### Environment Variables

Generate a secure secret:
```bash
openssl rand -base64 32
```

Required variables in `.env.local`:
```env
MONGODB_URI=mongodb+srv://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-generated-secret>
NODE_ENV=development
```

---

## 📸 Screenshots

### Main Board
> Visual priority board with drag & drop

### Task Details
> Expandable cards with full history

### Time Tracking
> Automatic work time calculation

### Completed Tasks
> Sidebar showing finished work

---

## 🎮 Usage

### Creating Tasks
1. Click **"Add New Task"** button
2. Enter title and optional description
3. Press **Enter** or click **"Add Task"**

### Managing Priority
- **Drag tasks** up or down to change priority
- **#1 task** appears at the top with 🔥 icon
- New tasks start at the bottom (lowest priority)

### Working on Tasks
- **▶️ Play** - Start working (timer starts automatically)
- **⏸️ Pause** - Take a break (timer stops, reason logged)
- **✅ Check** - Mark as complete (timer stops)
- **🟥 Block** - Mark as blocked (requires reason)
- **✏️ Edit** - Update title or description

### Viewing History
- Click any task to expand details
- See all status changes with timestamps
- View total time spent
- Completed tasks move to right sidebar

---

## 🏗️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[TanStack Query](https://tanstack.com/query)** - Data fetching & caching
- **[dnd-kit](https://dndkit.com/)** - Drag and drop
- **[shadcn/ui](https://ui.shadcn.com/)** - UI components
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling

### Backend
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless API
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication
- **[Mongoose](https://mongoosejs.com/)** - MongoDB ODM
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Password hashing

### Database
- **[MongoDB Atlas](https://www.mongodb.com/atlas)** - Cloud database

---

## 📁 Project Structure

```
priority-strip/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── auth/          # NextAuth routes
│   │   └── v1/tasks/      # Task CRUD operations
│   ├── board/             # Main board page
│   ├── login/             # Login page
│   └── ...
├── components/
│   ├── organisms/         # Complex components
│   ├── molecules/         # Medium components
│   └── ui/                # Base UI components (shadcn)
├── hooks/                 # Custom React hooks
│   ├── useTasks.ts        # Task data management
│   └── useTaskActions.ts  # Task action handlers
├── lib/
│   ├── db/               # Database
│   │   ├── models/       # Mongoose schemas
│   │   ├── mongoose.ts   # DB connection
│   │   └── seed.ts       # Database seeding
│   ├── auth.ts           # NextAuth config
│   ├── utils.ts          # Utilities
│   └── time-utils.ts     # Time calculation
├── types/                # TypeScript definitions
└── ...
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/th3hero/strip-board)

1. Click the button above or visit [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `MONGODB_URI`
   - `NEXTAUTH_URL` (your Vercel domain)
   - `NEXTAUTH_SECRET`
   - `NODE_ENV=production`
4. Deploy!

### Other Platforms

Priority Strip can be deployed to any platform that supports Next.js:
- **Netlify** - [Guide](https://docs.netlify.com/integrations/frameworks/next-js/)
- **Railway** - [Guide](https://docs.railway.app/guides/nextjs)
- **DigitalOcean** - [Guide](https://docs.digitalocean.com/products/app-platform/languages-frameworks/nextjs/)
- **Self-hosted** - `npm run build && npm start`

---

## 📚 Documentation

- **[API Documentation](docs/API.md)** - REST API endpoints
- **[Architecture](docs/ARCHITECTURE.md)** - System design
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Changelog](CHANGELOG.md)** - Version history

---

## 🤝 Contributing

We welcome contributions! Whether it's:

- 🐛 Bug reports
- 💡 Feature requests
- 📝 Documentation improvements
- 🔧 Code contributions

Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

### Development Setup

```bash
# Fork and clone the repo
git clone https://github.com/YOUR_USERNAME/priority-strip.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes and commit
git commit -m "Add amazing feature"

# Push and create a Pull Request
git push origin feature/amazing-feature
```

---

## 🗺️ Roadmap

### ✅ v1.0 (Current)
- Core task management
- Drag & drop priority
- Time tracking
- Status management
- Comment history

### 🔮 v1.1 (Planned)
- [ ] Keyboard shortcuts (j/k navigation, x mark done)
- [ ] Search and filter tasks
- [ ] Labels/tags for categorization
- [ ] Due dates

### 🚀 v2.0 (Future)
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] Multiple workspaces
- [ ] Recurring tasks
- [ ] Export/import data
- [ ] GitHub integration

[View full roadmap →](https://github.com/th3hero/strip-board/issues)

---

## 📊 Performance

- ⚡ **Build time**: ~3-4 seconds
- 🚀 **First load**: < 100KB JS
- 📦 **Bundle size**: Optimized with Next.js
- 🎯 **Lighthouse score**: 95+ (Performance)

---

## 🔒 Security

- ✅ Passwords hashed with bcrypt (12 rounds)
- ✅ Session-based authentication
- ✅ Protected API routes
- ✅ Environment variables for secrets
- ✅ CSRF protection with NextAuth
- ✅ No sensitive data in client-side code

Found a security issue? Please email: thealokkumarsingh@gmail.com

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Alok Kumar**

- GitHub: [@th3hero](https://github.com/th3hero)
- Email: thealokkumarsingh@gmail.com

---

## 🙏 Acknowledgments

- Inspired by ATC flight strip boards
- Built with amazing open-source tools
- Community feedback and contributions

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=th3hero/strip-board&type=Date)](https://star-history.com/#th3hero/strip-board&Date)

---

<div align="center">

**If Priority Strip helps you stay productive, please consider giving it a ⭐**

Made with ❤️ by [Alok Kumar](https://github.com/th3hero)

[Report Bug](https://github.com/th3hero/strip-board/issues) • [Request Feature](https://github.com/th3hero/strip-board/issues) • [Discussions](https://github.com/th3hero/strip-board/discussions)

</div>
