// This is a mock API service that simulates backend calls

// Simulate authentication
export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    // In a real app, this would be an API call to your backend
    setTimeout(() => {
      // For demo purposes, any valid email/password combination works
      if (email && password && password.length >= 8) {
        resolve({ success: true, user: { email } });
      } else {
        reject({ message: 'Invalid credentials' });
      }
    }, 1000);
  });
};

// Get clients data
export const getClients = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { 
          id: 1, 
          name: "Wipro", 
          industry: "IT Services", 
          contact: "contact@wipro.com",
          employees: [1, 2] // Sameer and Aditya
        },
        { 
          id: 2, 
          name: "Infosys", 
          industry: "Consulting", 
          contact: "info@infosys.com",
          employees: [3] // Mratyunjay
        },
        { 
          id: 3, 
          name: "Cognizant", 
          industry: "Technology", 
          contact: "support@cognizant.com",
          employees: [4] // Yash
        },
        { 
          id: 4, 
          name: "HCL", 
          industry: "Software", 
          contact: "help@hcl.com",
          employees: [1, 4] // Sameer and Yash
        }
      ]);
    }, 500);
  });
};

// Get employees data
export const getEmployees = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Sameer", role: "Developer", department: "Engineering" },
        { id: 2, name: "Aditya", role: "Manager", department: "Operations" },
        { id: 3, name: "Mratyunjay", role: "Designer", department: "UX" },
        { id: 4, name: "Yash", role: "Analyst", department: "Business" }
      ]);
    }, 500);
  });
};
