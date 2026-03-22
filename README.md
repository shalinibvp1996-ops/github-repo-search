# GitHub Repository Explorer

A clean and responsive web application built with React and TypeScript to search and explore GitHub repositories using the GitHub Search API.

---

## Features

- Search GitHub repositories by keyword
- Pagination with dynamic page numbers
- Fast and responsive UI
- Clear search input instantly
- Loading skeleton UI
- Error handling
- Fully responsive (mobile + desktop)

## Tech Stack

- React (Vite)
- TypeScript
- Axios
- CSS (Custom Styling)
- React Icons

## Setup Instructions

```bash
git clone https://github.com/shalinibvp1996-ops/github-repo-search.git
cd github-repo-search
npm install
npm run dev
```

## API Used

GitHub Search API:

https://api.github.com/search/repositories

Example:

https://api.github.com/search/repositories?q=react&page=1&per_page=10

## Key Implementation Details

- Used server-side pagination via GitHub API
- Added input validation (minimum 3 characters)
- Implemented dynamic pagination (1 ... 5 6 7 ... 100)
- Designed UI with focus on real-world UX
- Clean separation of services, types, and UI

## Screenshots

### Search Results

[Search Results](./assets/Screenshot%201.png)

### Pagination

[Pagination](./assets/Screenshot%202.png)

### No Results State

[No Results](./assets/Screenshot%203.png)

## GitHub Repository

https://github.com/shalinibvp1996-ops/github-repo-search

## Author

Shalini Raj
