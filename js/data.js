const defaultData = {
    siteName: "🌱 Agro Connect",
    heroTitle: "Empowering the Future of Agriculture",
    heroSubtitle: "Connecting farmers, technology, and resources for a sustainable tomorrow.",
    mission: "To revolutionize agriculture through technology, connecting farmers with resources, markets, and knowledge.",
    vision: "A world where every farmer has the digital tools they need to thrive and feed the future.",
    about: "Agro Connect is an innovative platform born out of a hackathon to bridge the gap between traditional farming and modern technology. We provide a suite of tools designed to optimize crop yields, manage resources efficiently, and access broader markets.",
    activities: [
        { id: 1, title: "AgriTech Hackathon 2026", date: "April 2026", description: "First place winner for best sustainable farming solution." },
        { id: 2, title: "Community Farm Outreach", date: "February 2026", description: "Demonstrated our prototype to 50+ local farmers." }
    ],
    team: [
        { id: 1, name: "Alice Green", role: "Frontend Developer", bio: "Passionate about creating intuitive user interfaces for agricultural tools.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", skills: "HTML, CSS, JavaScript, React" },
        { id: 2, name: "Bob Seed", role: "Backend Developer", bio: "Expert in scalable systems and IoT integration for smart farms.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", skills: "Node.js, Python, IoT, Databases" }
    ],
    contactEmail: "hello@agroconnect.com",
    contactPhone: "+1 (555) 123-4567"
};

const defaultUsers = [
    { username: 'admin', password: 'agc2026@' } // Default admin user
];

function initData() {
    if (!localStorage.getItem('agro_data')) {
        localStorage.setItem('agro_data', JSON.stringify(defaultData));
    }
    // Always enforce the admin password for hackathon
    localStorage.setItem('agro_users', JSON.stringify(defaultUsers));
}

function getData() {
    initData();
    return JSON.parse(localStorage.getItem('agro_data'));
}

function saveData(data) {
    localStorage.setItem('agro_data', JSON.stringify(data));
}

function getUsers() {
    initData();
    return JSON.parse(localStorage.getItem('agro_users'));
}

function saveUsers(users) {
    localStorage.setItem('agro_users', JSON.stringify(users));
}

function getCurrentUser() {
    return sessionStorage.getItem('agro_currentUser');
}

function loginUser(username, password) {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        sessionStorage.setItem('agro_currentUser', username);
        return true;
    }
    return false;
}

function registerUser(username, password) {
    const users = getUsers();
    if (users.find(u => u.username === username)) {
        return false; // User exists
    }
    users.push({ username, password });
    saveUsers(users);
    return true;
}

function logoutUser() {
    sessionStorage.removeItem('agro_currentUser');
}

// Initialize on load
initData();
