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
            name: "Mr Alipio Burebe Ebenezer",
            role: "UI/UX Designer & Co-Researcher",
            bio: "Holding a BSc in Computer Science, He's dedicated to digitizing the agricultural landscape. He specializes in designing robust digital frameworks and accessible interfaces for AgroConnect, turning complex data into intuitive tools that drive farmer productivity and market connectivity.",
            image: "images/img2.jpeg",
            skills: "UI/UX, RESEARCHER, IoT, GRAPHIC DESIGNER"
        },
        {
            id: 3,
            name: "Mr. Jude Sangzie",
            role: "Graphic Designer & Program Organizer",
            bio: "A creative Graphic Designer with a strong focus on visual communication and brand identity. He designs engaging graphics for both digital and print platforms. He also supports program planning and coordination, ensuring smooth and successful events.",
            image: "images/img3.jpeg",
            skills: "GRAPHIC DESIGNER, PYTHON, UI/UX, EDITOR"
        },
        {
            id: 4,
            name: "Asaboayine Yvonne Ayinpoka",
            role: "Front-End Designer & Researcher",
            bio: "With a strong passion for technology and innovation, she contributes to the AgroConnect project by designing responsive and user-friendly interfaces that connect farmers to digital agricultural solutions. She also supports research activities aimed at improving how agricultural data and services are delivered. Her work focuses on creating simple, practical, and accessible digital tools that enhance productivity and strengthen market access for farmers.",
            image: "images/img4.jpeg",
            skills: "FRONT END DESIGNER, RESEARCHER, WRITTER, PRESENTER"
        }
    ],
    contactEmail: "agroconnect21@gmail.com",
    contactPhone: "0501242319 / 0558191435"
};

const defaultUsers = [
    { username: 'admin', password: 'agc2026@' } // Default admin user
];

function initData() {
    if (!localStorage.getItem('agro_data')) {
        localStorage.setItem('agro_data', JSON.stringify(defaultData));
    } else {
        // Force update team if it contains demo members
        const storedData = JSON.parse(localStorage.getItem('agro_data'));
        if (storedData.team && storedData.team.some(m => m.name.includes("Team Member"))) {
            storedData.team = defaultData.team;
            localStorage.setItem('agro_data', JSON.stringify(storedData));
        }
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
