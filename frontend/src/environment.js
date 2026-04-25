
export const API_URL = (() => {
  // For Node.js/Jest/CRA environment
  if (typeof process !== 'undefined' && process.env) {
    return process.env.VITE_API_URL || 
           process.env.REACT_APP_API_URL || 
           'http://localhost:5000';
  }
  
  // For browser/Vite environment
  if (typeof import.meta !== 'undefined' && import.meta?.env) {
    return import.meta.env.VITE_API_URL || 'http://localhost:5000';
  }
  
  return 'http://localhost:5000';
})();

export default { API_URL };