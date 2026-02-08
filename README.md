# Digital Life Lessons - Client

A modern, interactive frontend for the Digital Life Lessons platform, built with performance and user experience in mind. 

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **State & Auth:** [Firebase](https://firebase.google.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

## ✨ Key Features

- **Personalized Lessons:** Dynamic list of life lessons with category filtering.
- **Premium Experience:** Seamless Stripe integration for unlocking exclusive content.
- **Admin Panel:** Powerful dashboard for managing content, users, and platform stats.
- **Interactive Dashboards:** Visual representations of learning progress and user statistics.
- **Responsive Design:** Optimized for a seamless experience across desktop, tablet, and mobile.
- **Social Sharing:** Integrated sharing capabilities using `react-share`.

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- Firebase Project (for Auth & Client-side storage)
- Backend Server (Running `DigitalLifeLessonsServer`)

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd DigitalLifeLessonsClient
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory and add your Firebase and API configuration:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

- `npm run dev` - Starts the development server with Vite.
- `npm run build` - Builds the application for production.
- `npm run lint` - Runs ESLint to check for code quality.
- `npm run preview` - Previews the production build locally.

## 📂 Project Structure

- `src/components` - Reusable UI components.
- `src/pages` - Page-level components.
- `src/context` - Global state management (Auth, etc.).
- `src/hooks` - Custom React hooks.
- `src/services` - API service logic.