# DevVault

DevVault is a local‑first application designed for software professionals to capture project ideas and decompose them into actionable tasks. It emphasizes a simple, focused workflow with reliable local persistence and an unobtrusive interface.

Live demo: https://devvault-aypk.onrender.com/

## Overview

DevVault provides a private, client-side-first environment for collecting project concepts, tracking progress, and exporting data. The application runs entirely in the browser with local persistence; no account or external backend is required for core functionality.

## Live Demo

A deployed instance is available for preview and evaluation:

- https://devvault-aypk.onrender.com/

## Key features

- Centralized project idea bank presented in a card-based view
- Task decomposition for each project with status tracking
- Tagging, priority levels, and flexible filtering
- Full-text search across projects and tasks
- Markdown support for rich descriptions
- Dark mode and responsive layout for mobile devices
- Export and import of data as JSON for backup and portability
- Local-first architecture: user data is stored in the browser

## Technology stack

- Frontend: React + TypeScript + Vite
- Styling: TailwindCSS v4
- State management: Zustand with localStorage persistence
- Routing: React Router v7
- Markdown: react-markdown + remark-gfm
- Icons: Lucide React

## Development

To run the project locally:

```bash
npm install
npm run dev
```

## Contributing

Contributions are welcome. Please open an issue to discuss any proposed changes or improvements before submitting a pull request.

## Notes

This project is intended as a lightweight, local-first tool for developers to capture and manage ideas. The deployed preview is provided for convenience; for sensitive or private data, run the application locally.
