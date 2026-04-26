const defaultData = {
    siteName: "🌱 Agro Connect",
    heroTitle: "Empowering the Future of Agriculture",
    heroSubtitle: "Connecting farmers, technology, and resources for a sustainable tomorrow.",
    mission: "To empower rural farmers with accessible, multilingual, and intelligent digital support that delivers real-time agricultural and health information through voice, text, and offline-first technologies.",
    vision: "To create a future where every farmer, regardless of literacy or connectivity, can make informed decisions that improve productivity, health, and livelihoods through inclusive AI-driven solutions.",
    about: "AgroConnect is an AI-powered, multilingual chatbot platform designed to support rural farmers with real-time agricultural and health information. It combines voice and text interaction, local language support, and offline-first technology to ensure accessibility for users with limited literacy or internet access. By integrating crop advisory, weather insights, pest diagnostics, veterinary support, and essential health guidance, AgroConnect serves as a reliable digital companion for farmers, extension officers, and rural health workers. The platform aims to bridge the information gap, improve productivity, promote safer farming practices, and enhance overall community well-being.",
    activities: [
        { id: 1, title: "AgriTech Hackathon 2025", date: "April 2025", description: "Shortlisted for best sustainable farming solution." },
        { id: 2, title: "Community Farm Outreach", date: "February 2026", description: "Demonstrated our prototype to 11+ local farmers." },
        { id: 3, title: "ATF CHALLENGE", date: "JULY 2024", description: "GROUP STAGES" }
    ],
    team: [
        { 
            id: 1, 
            name: "Mr. Jude M. Bayiviella", 
            role: "Team Leader | Software Developer, Project Coordinator & Activist", 
            bio: "With a strong background in software development and project coordination, he leads AgroConnect with a vision to transform agriculture through technology. He drives the development of scalable digital solutions that empower farmers, improve market access and promote sustainable agricultural growth.", 
            image: "images/img1.jpeg", 
            skills: "AI AUTOMATION, FLUTTER, REACT, IoT" 
        },
        { 
            id: 2, 
            name: "Team Member 2", 
            role: "Specialist", 
            bio: "Biography coming soon. Update this in the admin dashboard.", 
            image: "images/img2.jpeg", 
            skills: "Agriculture, Support" 
        },
        { 
            id: 3, 
            name: "Team Member 3", 
            role: "Specialist", 
            bio: "Biography coming soon. Update this in the admin dashboard.", 
            image: "images/img3.jpeg", 
            skills: "Technology, Research" 
        },
        { 
            id: 4, 
            name: "Team Member 4", 
            role: "Specialist", 
            bio: "Biography coming soon. Update this in the admin dashboard.", 
            image: "images/img4.jpeg", 
            skills: "Marketing, Outreach" 
        }
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
