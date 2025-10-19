import { createContext, useContext, useState, useEffect } from 'react';
import { Navigate,useLocation,useNavigate  } from 'react-router-dom';
import { API_URL } from './config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, try to load user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      localStorage.removeItem("user"); // clear bad data
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}



export function TempTokenRoute({ children }) {
  const tempToken = sessionStorage.getItem("temp_token");

  if (!tempToken) {
    return <Navigate to="/signup" replace />; // redirect if no token
  }

  return children;
}

//Protect against manual url
export function EmailVerifyRoute({ children }) {
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    return <Navigate to="/signup" replace />;
  }

  return children;
}



export function RedirectIfLoggedIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(`${API_URL}/me`, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          navigate("/passwords");
        }
      } catch (err) {
        console.log("Not logged in");
      }
    };
    checkLogin();
  }, [navigate]);

  return null;
}