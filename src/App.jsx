import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import BlogPostsPage from "./pages/BlogPostsPage";
import IndividualPostPage from "./pages/IndividualPostPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <main className="main-content-area">
            <Routes>
              <Route path="/" element={<BlogPostsPage />} />
              <Route path="/post/:id" element={<IndividualPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}