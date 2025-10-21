import { useState,useEffect } from "react";
import { API_URL } from '../config';
import { useAuth } from './RouteProtection';


import { 
  PlusCircle, 
  ArrowLeft, 
  Search,
  Copy,
  Eye,
  EyeOff,
  Key,
  Trash2,
  Check,
  Globe,
  Shield
} from "lucide-react";

// Password strength calculator
const calculateStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '' };
  
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  const levels = [
    { score: 0, label: 'Very Weak', color: 'bg-red-500' },
    { score: 1, label: 'Weak', color: 'bg-orange-500' },
    { score: 2, label: 'Fair', color: 'bg-yellow-500' },
    { score: 3, label: 'Good', color: 'bg-blue-500' },
    { score: 4, label: 'Strong', color: 'bg-green-500' },
    { score: 5, label: 'Very Strong', color: 'bg-green-600' }
  ];
  
  return levels[score] || levels[0];
};

// Password generator
const generatePassword = (length = 16) => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const allChars = uppercase + lowercase + numbers + symbols;
  
  let password = '';
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

export default function Vault() {
  const [passwords, setPasswords] = useState([]);
  const { user, isLoading } = useAuth();

    useEffect(() => {
    const fetchPasswords = async () => {
      const token = localStorage.getItem("sessionToken");
      if (!token || !isLoading) return; // Wait for user to be authenticated
      try {
        const res = await fetch(`${API_URL}/vault`, {
          method: "GET",
          headers: { 
          "Content-Type": "application/json" ,
          "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setPasswords(data); // populate passwords state with backend data
        } else {
          console.error("Failed to fetch passwords:", res.status);
        }
      } catch (err) {
        console.error("Error fetching passwords:", err);
      }
    };

    if (!isLoading) {
      fetchPasswords();
    }
  }, [isLoading]);
  
  const [showNewForm, setShowNewForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ site: '', username: '', password: '', category: 'Personal' });
  const [copiedId, setCopiedId] = useState(null);
  const [notification, setNotification] = useState(null);

  const categories = ['Personal', 'Work', 'Banking', 'Social'];
  const categoryColors = {
    Personal: 'bg-blue-500',
    Work: 'bg-purple-500',
    Banking: 'bg-green-500',
    Social: 'bg-pink-500'
  };

  const filteredPasswords = passwords.filter(pw => 
    (pw.site || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (pw.username || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (text, type, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(`${id}-${type}`);
    showNotification(`${type} copied to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddPassword = async (e) => {
    const token = localStorage.getItem("sessionToken");
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/vault`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" ,
          "Authorization": `Bearer ${token}`
          },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        setPasswords(prev => [
          { ...formData, id: data.id, lastUpdated: new Date().toISOString().split('T')[0] },
          ...prev
        ]);

        setShowNewForm(false);

        setFormData({ site: '', username: '', password: '', category: 'Personal' });

        showNotification("Password added successfully!");
      }
    } catch (err) {
      console.error("Failed to add password:", err);
    }
  };

const handleDelete = async (id) => {
  const token = localStorage.getItem("sessionToken");
  try {
    const res = await fetch(`${API_URL}/vault/${id}`, {
      method: "DELETE",
      headers: { 
          "Content-Type": "application/json" ,
          "Authorization": `Bearer ${token}`
          }
    });

    if (res.ok) {
      setPasswords(prev => prev.filter(pw => pw.id !== id));
      showNotification('Password deleted');
    } else {
      showNotification('Failed to delete password');
    }
  } catch (err) {
    showNotification('Error deleting password');
  }
};


  const handleGenerate = () => {
    const newPass = generatePassword();
    setFormData(prev => ({ ...prev, password: newPass }));
  };

  const strength = calculateStrength(formData.password);

  // Show loading state while authentication is being verified
  if (isLoading) {
    return (
      <div className="flex-1 p-6 bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white overflow-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading vault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white overflow-auto">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <Check className="w-5 h-5" />
          {notification}
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Shield className="w-10 h-10 text-purple-500" />
            My Vault
          </h1>
          <p className="text-gray-400">Manage your passwords securely</p>
        </div>

        {/* Search and New Button */}
        {!showNewForm && (
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search passwords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
              />
            </div>
            <button
              onClick={() => setShowNewForm(true)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-medium transition shadow-lg hover:shadow-purple-500/50"
            >
              <PlusCircle className="w-5 h-5" />
              New Password
            </button>
          </div>
        )}

        {/* Main Content */}
        {!showNewForm ? (
          <div className="space-y-4">
            {filteredPasswords.length === 0 ? (
              <div className="bg-slate-800 rounded-2xl border border-gray-700 p-12 text-center">
                <Key className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400 text-lg mb-2">
                  {searchQuery ? 'No passwords found' : 'No passwords yet'}
                </p>
                <p className="text-gray-500 text-sm">
                  {searchQuery ? 'Try a different search term' : 'Click "New Password" to add your first one'}
                </p>
              </div>
            ) : (
              filteredPasswords.map((pw) => (
                <div
                  key={pw.id}
                  className="bg-slate-800 rounded-xl border border-gray-700 p-5 hover:border-purple-500/50 transition group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{pw.site}</h3>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryColors[pw.category]}`}>
                            {pw.category}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{pw.username}</p>
                        <p className="text-gray-500 text-xs">Last updated: {pw.lastUpdated}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(pw.username, 'Username', pw.id)}
                        className="p-2 rounded-lg hover:bg-slate-700 transition"
                        title="Copy username"
                      >
                        {copiedId === `${pw.id}-Username` ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-400 hover:text-white" />
                        )}
                      </button>
                      <button
                        onClick={() => handleCopy(pw.password, 'Password', pw.id)}
                        className="p-2 rounded-lg hover:bg-slate-700 transition"
                        title="Copy password"
                      >
                        {copiedId === `${pw.id}-Password` ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Key className="w-5 h-5 text-gray-400 hover:text-white" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(pw.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="bg-slate-800 rounded-2xl border border-gray-700 p-8">
            <button
              onClick={() => setShowNewForm(false)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Vault
            </button>

            <h2 className="text-2xl font-bold mb-6">Add New Password</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Website / App</label>
                <input
                  type="text"
                  value={formData.site}
                  onChange={(e) => setFormData(prev => ({ ...prev, site: e.target.value }))}
                  placeholder="e.g., GitHub, Gmail, LinkedIn"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Username / Email</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter a strong password"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition pr-24"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 rounded-lg hover:bg-slate-700 transition"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleGenerate}
                      className="p-2 rounded-lg hover:bg-purple-600 transition bg-purple-700"
                      title="Generate password"
                    >
                      <Key className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Password Strength</span>
                      <span className={`text-xs font-medium ${strength.color.replace('bg-', 'text-')}`}>
                        {strength.label}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${strength.color} transition-all duration-300`}
                        style={{ width: `${(strength.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddPassword}
                disabled={!formData.site || !formData.username || !formData.password}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition shadow-lg hover:shadow-purple-500/50"
              >
                Save Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}