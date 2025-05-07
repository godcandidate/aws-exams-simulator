import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Mock user data
const mockUsers = [
  { id: 1, email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin' },
  { id: 2, email: 'user@example.com', password: 'user123', name: 'Regular User', role: 'user' }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Sign in function
  const login = (email, password) => {
    const user = mockUsers.find(
      (user) => user.email === email && user.password === password
    );
    
    if (user) {
      // Remove password from stored user object for security
      const { password, ...secureUser } = user;
      setCurrentUser(secureUser);
      localStorage.setItem('currentUser', JSON.stringify(secureUser));
      return secureUser;
    }
    return null;
  };

  // Sign up function (mock)
  const signup = (email, password, name) => {
    // Check if user already exists
    const existingUser = mockUsers.find((user) => user.email === email);
    if (existingUser) {
      return { error: 'User already exists' };
    }

    // In a real app, we would call an API to create the user
    // For this mock, we'll just pretend it worked
    const newUser = {
      id: mockUsers.length + 1,
      email,
      password,
      name,
      role: 'user'
    };

    // Remove password from stored user object for security
    const { password: _, ...secureUser } = newUser;
    setCurrentUser(secureUser);
    localStorage.setItem('currentUser', JSON.stringify(secureUser));
    return secureUser;
  };

  // Sign out function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isAdmin: currentUser?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
