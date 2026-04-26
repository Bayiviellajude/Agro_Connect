document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
            });
        });
    }

    // Populate data from LocalStorage based on data-bind attributes
    const data = getData(); // from data.js

    // Bind simple text content
    const bindElements = document.querySelectorAll('[data-bind]');
    bindElements.forEach(el => {
        const key = el.getAttribute('data-bind');
        if (data[key]) {
            el.textContent = data[key];
        }
    });

    // Specific logic for lists (Activities / Team)
    const activitiesContainer = document.getElementById('activities-container');
    if (activitiesContainer && data.activities) {
        activitiesContainer.innerHTML = '';
        data.activities.forEach(act => {
            activitiesContainer.innerHTML += `
                <div class="card">
                    <h3>${act.title}</h3>
                    <p><strong>Date:</strong> ${act.date}</p>
                    <p>${act.description}</p>
                </div>
            `;
        });
    }

    const teamContainer = document.getElementById('team-container');
    if (teamContainer && data.team) {
        teamContainer.innerHTML = '';
        data.team.forEach(member => {
            teamContainer.innerHTML += `
                <div class="card" style="text-align: center; padding: 2.5rem 1.5rem 2rem 1.5rem; display: flex; flex-direction: column; align-items: center; border-radius: 20px; height: 100%;">
                    <img src="${member.image || 'https://via.placeholder.com/150'}" alt="${member.name}" style="width: 160px; height: 160px; border-radius: 50%; object-fit: cover; margin-bottom: 1.5rem; border: 4px solid var(--primary-light); box-shadow: 0 8px 16px rgba(0,0,0,0.15);">
                    <div style="display: flex; flex-direction: column; flex-grow: 1; width: 100%;">
                        <h3 style="margin-top: 0; margin-bottom: 0.5rem; font-size: 1.5rem;">${member.name}</h3>
                        <p style="color: var(--accent-color); font-weight: bold; margin-bottom: 0.8rem; font-size: 1.05rem;">${member.role}</p>
                        <p style="font-size: 0.95rem; margin-bottom: 1.5rem; flex-grow: 1;">${member.bio}</p>
                        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem;">
                            ${(member.skills || '').split(',').map(skill => `<span style="background: var(--primary-light); color: white; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">${skill.trim()}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
    }
});
