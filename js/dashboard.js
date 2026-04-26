document.addEventListener('DOMContentLoaded', () => {
    // Auth Check
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    document.getElementById('user-display').textContent = currentUser;
    document.getElementById('logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        logoutUser();
        window.location.href = 'login.html';
    });

    const data = getData(); // from data.js

    // Form references
    const generalForm = document.getElementById('form-general');
    const aboutForm = document.getElementById('form-about');
    const contactForm = document.getElementById('form-contact');
    const addTeamForm = document.getElementById('form-add-team');
    const addActivityForm = document.getElementById('form-add-activity');

    // Input references
    const siteNameInput = document.getElementById('input-site-name');
    const heroTitleInput = document.getElementById('input-hero-title');
    const heroSubtitleInput = document.getElementById('input-hero-subtitle');
    
    const missionInput = document.getElementById('input-mission');
    const visionInput = document.getElementById('input-vision');
    const aboutInput = document.getElementById('input-about');
    const emailInput = document.getElementById('input-email');
    const phoneInput = document.getElementById('input-phone');

    // Populate initial values
    if (siteNameInput) siteNameInput.value = data.siteName || "🌱 Agro Connect";
    if (heroTitleInput) heroTitleInput.value = data.heroTitle || "Empowering the Future of Agriculture";
    if (heroSubtitleInput) heroSubtitleInput.value = data.heroSubtitle || "Connecting farmers, technology, and resources for a sustainable tomorrow.";

    if (missionInput) missionInput.value = data.mission;
    if (visionInput) visionInput.value = data.vision;
    if (aboutInput) aboutInput.value = data.about;
    if (emailInput) emailInput.value = data.contactEmail;
    if (phoneInput) phoneInput.value = data.contactPhone;

    // Handle General form submit
    if (generalForm) {
        generalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            data.siteName = siteNameInput.value;
            data.heroTitle = heroTitleInput.value;
            data.heroSubtitle = heroSubtitleInput.value;
            saveData(data);
            alert('General settings updated successfully!');
        });
    }

    // Handle About form submit
    if (aboutForm) {
        aboutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            data.mission = missionInput.value;
            data.vision = visionInput.value;
            data.about = aboutInput.value;
            saveData(data);
            alert('About section updated successfully!');
        });
    }

    // Handle Contact form submit
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            data.contactEmail = emailInput.value;
            data.contactPhone = phoneInput.value;
            saveData(data);
            alert('Contact details updated successfully!');
        });
    }

    // Activities Rendering
    function renderActivities() {
        const activitiesList = document.getElementById('activities-list');
        if (!activitiesList) return;
        activitiesList.innerHTML = '';
        data.activities.forEach(act => {
            activitiesList.innerHTML += `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border: 1px solid #ccc; margin-bottom: 1rem; border-radius: 4px;">
                    <div>
                        <strong>${act.title}</strong> - ${act.date}
                        <p style="font-size: 0.8rem; color: #666; margin:0;">${act.description}</p>
                    </div>
                    <div>
                        <button class="btn btn-edit-activity" data-id="${act.id}" style="background-color: #f39c12; padding: 0.5rem 1rem; margin-right: 0.5rem;">Edit</button>
                        <button class="btn btn-delete-activity" data-id="${act.id}" style="background-color: #e74c3c; padding: 0.5rem 1rem;">Delete</button>
                    </div>
                </div>
            `;
        });

        document.querySelectorAll('.btn-delete-activity').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                data.activities = data.activities.filter(m => m.id !== id);
                saveData(data);
                renderActivities();
            });
        });

        document.querySelectorAll('.btn-edit-activity').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const act = data.activities.find(m => m.id === id);
                if (act) {
                    document.getElementById('activity-title').value = act.title;
                    document.getElementById('activity-date').value = act.date;
                    document.getElementById('activity-desc').value = act.description;
                    addActivityForm.setAttribute('data-edit-id', act.id);
                    addActivityForm.querySelector('button[type="submit"]').textContent = 'Update Activity';
                    document.getElementById('activity-title').focus();
                }
            });
        });
    }
    renderActivities();

    // Handle Add Activity
    if (addActivityForm) {
        addActivityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const editId = addActivityForm.getAttribute('data-edit-id');
            
            if (editId) {
                // Update existing
                const id = parseInt(editId);
                const actIndex = data.activities.findIndex(a => a.id === id);
                if (actIndex !== -1) {
                    data.activities[actIndex].title = document.getElementById('activity-title').value;
                    data.activities[actIndex].date = document.getElementById('activity-date').value;
                    data.activities[actIndex].description = document.getElementById('activity-desc').value;
                }
                addActivityForm.removeAttribute('data-edit-id');
                addActivityForm.querySelector('button[type="submit"]').textContent = 'Add Activity';
                alert('Activity updated successfully!');
            } else {
                // Add new
                const newAct = {
                    id: Date.now(),
                    title: document.getElementById('activity-title').value,
                    date: document.getElementById('activity-date').value,
                    description: document.getElementById('activity-desc').value
                };
                data.activities.push(newAct);
                alert('Activity added successfully!');
            }
            saveData(data);
            renderActivities();
            addActivityForm.reset();
        });
    }

    // Team Rendering
    function renderTeam() {
        const teamList = document.getElementById('team-list');
        if (!teamList) return;
        teamList.innerHTML = '';
        data.team.forEach(member => {
            teamList.innerHTML += `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border: 1px solid #ccc; margin-bottom: 1rem; border-radius: 4px;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <img src="${member.image}" style="width: 50px; height: 50px; border-radius: 4px; object-fit: cover;">
                        <div>
                            <strong>${member.name}</strong> - ${member.role}
                            <p style="font-size: 0.8rem; color: #666; margin:0;">${member.skills}</p>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-edit" data-id="${member.id}" style="background-color: #f39c12; padding: 0.5rem 1rem; margin-right: 0.5rem;">Edit</button>
                        <button class="btn btn-delete" data-id="${member.id}" style="background-color: #e74c3c; padding: 0.5rem 1rem;">Delete</button>
                    </div>
                </div>
            `;
        });

        // Attach delete handlers
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                data.team = data.team.filter(m => m.id !== id);
                saveData(data);
                renderTeam();
            });
        });

        // Attach edit handlers
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const member = data.team.find(m => m.id === id);
                if (member) {
                    document.getElementById('team-name').value = member.name;
                    document.getElementById('team-role').value = member.role;
                    document.getElementById('team-skills').value = member.skills;
                    document.getElementById('team-bio').value = member.bio;
                    
                    const urlInput = document.getElementById('team-image-url');
                    if (member.image && !member.image.startsWith('data:')) {
                        urlInput.value = member.image;
                    } else {
                        urlInput.value = '';
                    }
                    document.getElementById('team-image-file').value = '';
                    
                    addTeamForm.setAttribute('data-edit-id', member.id);
                    addTeamForm.querySelector('button[type="submit"]').textContent = 'Update Team Member';
                    document.getElementById('team-name').focus();
                }
            });
        });
    }
    renderTeam();

    // Resize image function
    function resizeImage(base64Str, maxWidth = 300, maxHeight = 300) {
        return new Promise((resolve) => {
            let img = new Image();
            img.src = base64Str;
            img.onload = () => {
                let canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                let ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.8));
            };
        });
    }

    // Handle Add Team
    if (addTeamForm) {
        addTeamForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fileInput = document.getElementById('team-image-file');
            const urlInput = document.getElementById('team-image-url');
            const file = fileInput.files[0];
            const url = urlInput.value;
            const editId = addTeamForm.getAttribute('data-edit-id');
            
            const addOrUpdateMember = (base64OrUrlImage) => {
                if (editId) {
                    const id = parseInt(editId);
                    const memberIndex = data.team.findIndex(m => m.id === id);
                    if (memberIndex !== -1) {
                        data.team[memberIndex].name = document.getElementById('team-name').value;
                        data.team[memberIndex].role = document.getElementById('team-role').value;
                        if (base64OrUrlImage) {
                            data.team[memberIndex].image = base64OrUrlImage;
                        }
                        data.team[memberIndex].skills = document.getElementById('team-skills').value;
                        data.team[memberIndex].bio = document.getElementById('team-bio').value;
                    }
                    addTeamForm.removeAttribute('data-edit-id');
                    addTeamForm.querySelector('button[type="submit"]').textContent = 'Add Team Member';
                    try {
                        saveData(data);
                        renderTeam();
                        addTeamForm.reset();
                        alert('Team member updated successfully!');
                    } catch(err) {
                        alert("Error saving data. Image may be too large.");
                    }
                } else {
                    const newMember = {
                        id: Date.now(), // simple unique id
                        name: document.getElementById('team-name').value,
                        role: document.getElementById('team-role').value,
                        image: base64OrUrlImage || 'https://via.placeholder.com/150',
                        skills: document.getElementById('team-skills').value,
                        bio: document.getElementById('team-bio').value
                    };
                    data.team.push(newMember);
                    try {
                        saveData(data);
                        renderTeam();
                        addTeamForm.reset();
                        alert('Team member added successfully!');
                    } catch(err) {
                        // Revert push on failure
                        data.team.pop();
                        alert("Error saving data. Image may be too large or Local Storage is full.");
                    }
                }
            };

            if (file) {
                const reader = new FileReader();
                reader.onload = async function(event) {
                    try {
                        const resizedBase64 = await resizeImage(event.target.result);
                        addOrUpdateMember(resizedBase64);
                    } catch (err) {
                        alert("Error processing image.");
                    }
                };
                reader.readAsDataURL(file);
            } else if (url && url.trim() !== '') {
                addOrUpdateMember(url.trim());
            } else {
                addOrUpdateMember(editId ? null : 'https://via.placeholder.com/150'); // fallback
            }
        });
    }

    // Navigation logic for Dashboard Sidebar
    const links = document.querySelectorAll('.sidebar a');
    const panels = document.querySelectorAll('.dashboard-panel');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active classes
            links.forEach(l => l.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked link and corresponding panel
            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // If export panel, generate code
            if (targetId === 'panel-export') {
                const exportArea = document.getElementById('export-code');
                const cleanData = JSON.parse(JSON.stringify(data));
                exportArea.value = `const defaultData = ${JSON.stringify(cleanData, null, 4)};`;
            }
        });
    });

    // Copy to clipboard logic
    const copyBtn = document.getElementById('btn-copy-export');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const exportArea = document.getElementById('export-code');
            exportArea.select();
            document.execCommand('copy');
            const status = document.getElementById('copy-status');
            status.style.display = 'block';
            setTimeout(() => {
                status.style.display = 'none';
            }, 3000);
        });
    }
});
