import React, {useState, createContext} from 'react';

export const AuthContext = createContext({})

function AuthProvider({ children }) {    

    const [user] = useState(JSON.parse(localStorage.getItem('USER')))

  return (
      <AuthContext.Provider value={{user}}>
          {children}
      </AuthContext.Provider>
  );
}

export default AuthProvider;