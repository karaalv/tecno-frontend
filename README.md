# 💬 Tecno Consulting ESG Chat Application

This is the frontend for the **Tecno Consulting ESG Chat Application**, built with **Next.js** and **TypeScript**. It provides a modern interface for interacting with an ESG-focused conversational system.

## ✨ Features

- **Chat Interface** – Users can send and receive messages in a real-time chat format.
- **Message History** – Previous messages are loaded and displayed in the conversation window.

## 🛠️ Development Conventions

This project uses React (via Next.js) with TypeScript. The following conventions are observed:

### 🧑‍💻 Code Style

- Variable names use `camelCase`.
- Component names use `PascalCase`.
- Semicolons are not required.
- Functions inside components use **arrow syntax**.
- Components are written using **function declarations**.

### 📁 File Naming

- Component files use `PascalCase` (e.g., `ChatBox.tsx`).
- Utility and helper files use `camelCase` (e.g., `formatDate.ts`).

### 🎨 Styling

- Styles are written using **CSS Modules**.
- Style files are named to match their components or pages (`PascalCase.module.css`).
- Class names use `snake_case` to avoid conflicts with standard CSS properties.

### 🧾 Comments & Documentation

- Use **JSDoc** for documenting components and utility functions.
- Each page file begins with a brief description of its purpose.
- Inline comments are used to clarify non-obvious logic or UI behavior.

### ⚛️ React & TypeScript

- State and props are **strongly typed** wherever possible.
- Components are modular and reusable.
- Types are colocated in `types/`, with subfolders mirroring the structure of the code they describe.

## 🗂️ Project Structure

The codebase follows a modular, feature-based structure:

- `app/` – Contains main application files, including layouts and pages.
- `components/` – Reusable UI components.
- `public/` – Static assets such as images and fonts.
- `styles/` – Global and component-specific CSS modules.
- `services/` – API functions for backend communication.
- `utils/` – Utility functions and constants.
- `types/` – TypeScript definitions and interfaces.

Nested folder conventions are used for clarity. For example, service types are located in `types/services/`, corresponding to their implementations in `services/`.
