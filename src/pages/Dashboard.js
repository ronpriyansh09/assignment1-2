import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClients, getEmployees } from '../services/api';
import '../styles/Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const clientsData = await getClients();
                setClients(clientsData);

                const employeesData = await getEmployees();
                setEmployees(employeesData);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                // Optionally redirect to login if data fetching fails
                navigate('/');
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const handleClientChange = (event) => {
        const clientId = event.target.value;
        const client = clients.find(c => c.id === parseInt(clientId));
        setSelectedClient(client);
    };

    const handleEmployeeChange = (event) => {
        const employeeId = event.target.value;
        const employee = employees.find(e => e.id === parseInt(employeeId));
        setSelectedEmployee(employee);
    };

    const handleLogout = () => {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome to the Dashboard!</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <div className="dashboard-content">
                <div className="dropdown-section">
                    <div className="dropdown-group">
                        <label htmlFor="client-select">Select Client:</label>
                        <select id="client-select" onChange={handleClientChange} defaultValue="">
                            <option value="" disabled>Choose a client</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>{client.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="dropdown-group">
                        <label htmlFor="employee-select">Select Employee:</label>
                        <select id="employee-select" onChange={handleEmployeeChange} defaultValue="">
                            <option value="" disabled>Choose an employee</option>
                            {employees.map(employee => (
                                <option key={employee.id} value={employee.id}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="details-section">
                    {selectedClient && (
                        <div className="detail-card client-card">
                            <h2>Client Details</h2>
                            <p><strong>Name:</strong> {selectedClient.name}</p>
                            <p><strong>Industry:</strong> {selectedClient.industry}</p>
                            <p><strong>Contact:</strong> {selectedClient.contact}</p>
                        </div>
                    )}

                    {selectedEmployee && (
                        <div className="detail-card employee-card">
                            <h2>Employee Details</h2>
                            <p><strong>Name:</strong> {selectedEmployee.name}</p>
                            <p><strong>Role:</strong> {selectedEmployee.role}</p>
                            <p><strong>Department:</strong> {selectedEmployee.department}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;