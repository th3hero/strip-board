# Contributing to Priority Strip

First off, thank you for considering contributing to Priority Strip! 🎉

It's people like you that make Priority Strip such a great tool for the community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this standard.

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Welcome newcomers and help them learn
- ✅ Focus on what is best for the community
- ✅ Show empathy towards other community members

### Unacceptable Behavior

- ❌ Harassment, discrimination, or offensive comments
- ❌ Trolling or insulting/derogatory comments
- ❌ Public or private harassment
- ❌ Publishing others' private information

---

## 🤝 How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues to avoid duplicates.

**When filing a bug report, include:**

- **Clear title** - Describe the issue in one sentence
- **Steps to reproduce** - Detailed steps to reproduce the behavior
- **Expected behavior** - What you expected to happen
- **Actual behavior** - What actually happened
- **Screenshots** - If applicable
- **Environment** - OS, browser, Node version, etc.
- **Additional context** - Any other relevant information

**Example:**
```markdown
**Bug**: Tasks disappear after drag and drop

**Steps to Reproduce:**
1. Create 3 tasks
2. Drag task #1 to position #3
3. Refresh the page

**Expected**: Tasks should maintain new order
**Actual**: Tasks revert to original order

**Environment**: 
- OS: macOS 14.0
- Browser: Chrome 120
- Node: 18.17.0
```

### Suggesting Features 💡

We love feature suggestions! Before suggesting:

1. **Check existing issues** - Your idea might already be discussed
2. **Consider the scope** - Does it fit Priority Strip's vision?
3. **Provide context** - Why is this feature valuable?

**Feature Request Template:**
```markdown
**Feature**: Add keyboard shortcuts

**Problem**: Clicking buttons is slow for power users

**Solution**: Implement keyboard shortcuts:
- `j/k` - Navigate up/down
- `x` - Mark task done
- `e` - Edit task
- `n` - New task

**Alternatives**: Could use browser extensions, but native is better

**Additional Context**: Similar to Gmail shortcuts
```

### Contributing Code 🔧

1. **Find an issue** - Look for `good first issue` or `help wanted` labels
2. **Comment on the issue** - Let others know you're working on it
3. **Fork the repo** - Create your own copy
4. **Create a branch** - Use descriptive branch names
5. **Make changes** - Follow our style guidelines
6. **Test thoroughly** - Ensure nothing breaks
7. **Submit PR** - Reference the issue number

---

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- MongoDB (Atlas or local)
- Git

### Setup Steps

```bash
# 1. Fork and clone
git clone https://github.com/th3hero/strip-board.git
cd strip-board

# 2. Install dependencies
npm install

# 3. Set up environment
cp env.example .env.local
# Edit .env.local with your values

# 4. Seed database
npm run seed

# 5. Start development server
npm run dev
```

### Project Structure

```
priority-strip/
├── app/              # Next.js App Router (pages & API)
├── components/       # React components
├── hooks/            # Custom React hooks
├── lib/              # Utilities, DB, auth
├── types/            # TypeScript types
└── docs/             # Documentation (internal)
```

### Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI**: Tailwind CSS, shadcn/ui, dnd-kit
- **State**: TanStack Query
- **Backend**: Next.js API Routes, NextAuth
- **Database**: MongoDB, Mongoose

---

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows our style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] No console.logs or debug code
- [ ] Tests pass (if applicable)
- [ ] Documentation updated (if needed)
- [ ] No TypeScript errors
- [ ] Build succeeds (`npm run build`)

### PR Title Format

Use conventional commits:

- `feat: Add keyboard shortcuts`
- `fix: Resolve drag and drop bug`
- `docs: Update README with new features`
- `refactor: Simplify task creation logic`
- `style: Format code with Prettier`
- `test: Add tests for time tracking`
- `chore: Update dependencies`

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Closes #123

## How Has This Been Tested?
- [ ] Tested locally
- [ ] Tested in production build
- [ ] Tested on different browsers

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed
- [ ] Commented complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Build passes
```

### Review Process

1. **Automated checks** - CI/CD must pass
2. **Code review** - Maintainer will review
3. **Feedback** - Address requested changes
4. **Approval** - Maintainer approves
5. **Merge** - Squash and merge to main

---

## 🎨 Style Guidelines

### TypeScript

```typescript
// ✅ Good
interface TaskProps {
  task: Task;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onDelete }: TaskProps) {
  // Implementation
}

// ❌ Bad
function TaskCard(props: any) {
  // No types
}
```

### Code Style

- **No `any` types** - Use proper TypeScript types
- **No unused variables** - Clean up imports and variables
- **Descriptive names** - `handleTaskDelete` not `handle1`
- **Small functions** - Keep functions focused and small
- **Comments** - Explain "why", not "what"

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react';
import { Task } from '@/types';

// 2. Types/Interfaces
interface ComponentProps {
  // ...
}

// 3. Component
export function Component({ prop }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Handlers
  const handleClick = () => {
    // ...
  };
  
  // 6. Render
  return (
    // JSX
  );
}
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <description>

# Examples
feat(tasks): add keyboard shortcuts
fix(drag): resolve reordering bug
docs(readme): update installation steps
refactor(hooks): simplify useTasks hook
style(ui): format with Prettier
test(api): add task creation tests
chore(deps): update Next.js to 16.1.0
```

### File Naming

- **Components**: `PascalCase.tsx` (e.g., `TaskCard.tsx`)
- **Hooks**: `camelCase.ts` (e.g., `useTasks.ts`)
- **Utils**: `kebab-case.ts` (e.g., `time-utils.ts`)
- **Types**: `PascalCase.ts` or `index.ts`

---

## 🧪 Testing

### Manual Testing

Before submitting a PR, test:

1. **Create tasks** - Add new tasks with title & description
2. **Drag & drop** - Reorder tasks, check priority updates
3. **Status changes** - Test all status transitions
4. **Time tracking** - Start, pause, resume, complete tasks
5. **Edit/Delete** - Modify and remove tasks
6. **Completed sidebar** - Check completed tasks display
7. **Authentication** - Login, logout, protected routes
8. **Responsive** - Test on different screen sizes

### Build Test

```bash
npm run build
npm start
# Test production build at http://localhost:3000
```

---

## 🌟 Recognition

Contributors will be:

- ✅ Listed in README.md
- ✅ Mentioned in release notes
- ✅ Credited in CHANGELOG.md
- ✅ Given contributor badge

---

## 📞 Getting Help

- **Questions?** - Open a [Discussion](https://github.com/th3hero/strip-board/discussions)
- **Stuck?** - Comment on your issue/PR
- **Chat** - Join our community (if applicable)

---

## 🎯 Good First Issues

Look for issues labeled:
- `good first issue` - Perfect for newcomers
- `help wanted` - Community help needed
- `documentation` - Improve docs
- `bug` - Fix reported bugs

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🙏 Thank You!

Your contributions make Priority Strip better for everyone. We appreciate your time and effort!

**Happy Coding! 🚀**

---

<div align="center">

Made with ❤️ by the Priority Strip community

[Back to README](README.md) • [View Issues](https://github.com/th3hero/strip-board/issues) • [Discussions](https://github.com/th3hero/strip-board/discussions)

</div>

