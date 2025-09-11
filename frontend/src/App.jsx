import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import JobOffers from "./pages/JobOffers";
import Applications from "./pages/Applications";
import Interviews from "./pages/Interviews";
import Documents from "./pages/Documents";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import Statistics from "./pages/Statistics";
import MessagingPage from "./pages/MessagePage";
import Contact from "./pages/contact";
import About from "./pages/About";
import BlogPage from "./pages/BlogPage"; // Assurez-vous que le chemin est correct

// Layout pour les pages protégées (dashboard, etc.)
function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil publique */}
        <Route path="/" element={<HomePage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        {/* Pages publiques */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<BlogPage />} /> {/* 👈 J'ai ajouté la route BlogPage ici */}
      
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Layout>
                <MessagingPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Job Offers */}
        <Route
          path="/job-offers"
          element={
            <ProtectedRoute>
              <Layout>
                <JobOffers />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <Layout>
                <Statistics />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Applications */}
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Layout>
                <Applications />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Interviews */}
        <Route
          path="/interviews"
          element={
            <ProtectedRoute>
              <Layout>
                <Interviews />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Documents */}
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <Layout>
                <Documents />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Redirection pour toutes les autres routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;