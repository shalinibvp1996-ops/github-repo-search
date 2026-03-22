# GitHub Repository Explorer

A responsive web application built with React and TypeScript to search and explore GitHub repositories using the GitHub Search API.

---

## Features

- Search GitHub repositories by keyword
- Server-side pagination with dynamic page navigation
- Loading states for better user experience
- Error handling for API failures and invalid inputs
- Clear search input functionality
- Responsive design for mobile and desktop

---

## Tech Stack

- React (Vite)
- TypeScript
- Axios
- CSS
- React Icons

---

## Setup Instructions

```bash
git clone https://github.com/shalinibvp1996-ops/github-repo-search.git
cd github-repo-search
npm install
npm run dev
```

---

## API

GitHub Search API:

https://api.github.com/search/repositories

---

## Implementation Details

- Used GitHub Search API with pagination support
- Implemented input validation (minimum 3 characters)
- Built dynamic pagination (e.g., 1 ... 5 6 7 ... 100)
- Structured code with separation of concerns (services, types, UI)
- Focused on clean and intuitive user interface

---

## Screenshots

### Search Results

![Search Results](./assets/Screenshot%201.png)

### Pagination

![Pagination](./assets/Screenshot%202.png)

### No Results State

![No Results](./assets/Screenshot%203.png)

---

## Repository

https://github.com/shalinibvp1996-ops/github-repo-search

---

## Author

Shalini
