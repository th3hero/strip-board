# Changelog

All notable changes to Priority Strip will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-19

### 🎉 Initial Release

The first public release of Priority Strip - a personal productivity tool inspired by ATC flight strip boards.

### ✨ Features

#### Core Functionality
- **Task Management**
  - Create tasks with title and description
  - Edit existing tasks
  - Delete tasks with confirmation
  - Mark tasks as complete

- **Priority System**
  - Visual priority board with #1 indicator
  - Drag and drop to reorder tasks
  - Automatic priority calculation
  - Top-to-bottom priority display

- **Status Management**
  - Todo status for new tasks
  - In Progress with automatic timer
  - Paused status with reason logging
  - Blocked status with mandatory comments
  - Done status with completion tracking

- **Time Tracking**
  - Automatic timer on task start
  - Pause/resume functionality
  - Accurate work time calculation
  - Time display on task cards
  - Historical time tracking for completed tasks

- **Comment History**
  - Full audit trail of all changes
  - Timestamps for every status change
  - Deprioritization reasons logged
  - Block reasons documented
  - Start/pause/resume timestamps

- **UI/UX**
  - Beautiful modern interface with shadcn/ui
  - Smooth drag and drop interactions
  - Responsive design
  - Completed tasks sidebar
  - Accordion-style task history
  - Empty states and loading indicators

#### Technical Features
- **Authentication**
  - Secure login with NextAuth
  - Session management
  - Protected routes
  - Password hashing with bcrypt

- **Database**
  - MongoDB integration
  - Mongoose ODM
  - Optimistic UI updates
  - Real-time data synchronization

- **Performance**
  - TanStack Query for caching
  - Optimistic updates
  - Fast page loads
  - Efficient re-renders

### 🏗️ Tech Stack
- Next.js 16.1.0
- React 19.2.3
- TypeScript 5.7.3
- MongoDB with Mongoose
- NextAuth 4.24.13
- TanStack Query 5.90.12
- dnd-kit 6.3.1
- Tailwind CSS 4
- shadcn/ui components

### 📚 Documentation
- Comprehensive README
- Contributing guidelines
- Deployment guide
- API documentation
- Architecture overview

### 🔒 Security
- Password hashing with bcrypt
- Environment variable validation
- Protected API routes
- Session-based authentication
- CSRF protection

---

## [Unreleased]

### Planned Features
- Keyboard shortcuts (j/k navigation, x mark done)
- Search and filter functionality
- Labels/tags for categorization
- Due dates
- Dark mode
- Mobile optimization

---

## Version History

- **v1.0.0** - Initial public release (2025-12-19)

---

[1.0.0]: https://github.com/th3hero/strip-board/releases/tag/v1.0.0
[Unreleased]: https://github.com/th3hero/strip-board/compare/v1.0.0...HEAD

