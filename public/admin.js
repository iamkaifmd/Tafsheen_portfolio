/**
 * PORTFOLIO ADMIN CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Auth elements
    const authOverlay = document.getElementById('auth-overlay');
    const authForm = document.getElementById('auth-form');
    const adminPasswordInput = document.getElementById('admin-password');
    const authError = document.getElementById('auth-error');
    const logoutBtn = document.getElementById('logout-btn');

    // UI elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const workspaceTitle = document.getElementById('workspace-title');
    const addItemBtn = document.getElementById('add-item-btn');
    const addBtnText = document.getElementById('add-btn-text');
    const recordsList = document.getElementById('records-list');
    const emptyState = document.getElementById('empty-state');
    
    // Form Modal elements
    const formModal = document.getElementById('form-modal');
    const modalFormTitle = document.getElementById('modal-form-title');
    const closeModelBtn = document.getElementById('close-modal-btn');
    const cancelFormBtn = document.getElementById('cancel-form-btn');
    const recordForm = document.getElementById('record-form');
    const formFieldsWrapper = document.getElementById('form-fields-wrapper');
    const editIdInput = document.getElementById('edit-id');

    // Utilities
    const actionToast = document.getElementById('action-toast');
    const toastText = document.getElementById('toast-text');
    const loaderOverlay = document.getElementById('loader-overlay');

    // State Variables
    let activeTab = 'projects';
    let adminToken = sessionStorage.getItem('admin_session_token') || '';

    // Field definition schema mapping for frontend rendering
    const fieldDefinitions = {
        projects: [
            { id: 'title', label: 'Project Title', type: 'text', required: true, placeholder: 'e.g. Eco-Track App' },
            { id: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Brief summary of what the project accomplishes...' },
            { id: 'imageUrl', label: 'Image Path/URL', type: 'text', required: true, placeholder: 'assets/project_preview_1.png' },
            { id: 'tags', label: 'Tags (Comma separated)', type: 'text', required: false, placeholder: 'React, Tailwind, Node.js' },
            { id: 'projectLink', label: 'Project Link / URL', type: 'text', required: false, placeholder: '#' },
            { id: 'category', label: 'Category', type: 'text', required: false, placeholder: 'Web Apps' },
            { id: 'order', label: 'Display Order', type: 'number', required: false, placeholder: '1' }
        ],
        education: [
            { id: 'institution', label: 'School / Institution', type: 'text', required: true, placeholder: 'e.g. Apex University' },
            { id: 'degree', label: 'Degree / Milestone', type: 'text', required: true, placeholder: 'e.g. B.S. in Computer Science' },
            { id: 'period', label: 'Timeline Period', type: 'text', required: true, placeholder: 'e.g. 2020 - 2024' },
            { id: 'detailText', label: 'Detailed Summary', type: 'textarea', required: true, placeholder: 'Classes covered, overall GPA, honors...' },
            { id: 'marksheetUrl', label: 'Marksheet File Path/URL', type: 'text', required: true, placeholder: 'assets/documents/marksheet_graduation.pdf' },
            { id: 'order', label: 'Display Order', type: 'number', required: false, placeholder: '1' }
        ],
        experience: [
            { id: 'company', label: 'Company Name', type: 'text', required: true, placeholder: 'e.g. Helix Labs' },
            { id: 'role', label: 'Job Role / Title', type: 'text', required: true, placeholder: 'e.g. Senior Frontend Developer' },
            { id: 'period', label: 'Timeline Period', type: 'text', required: true, placeholder: 'e.g. 2024 - Present' },
            { id: 'description', label: 'Job Description', type: 'textarea', required: true, placeholder: 'Roles, teams led, features shipped...' },
            { id: 'category', label: 'Timeline Label Badge', type: 'text', required: false, placeholder: 'Senior Role' },
            { id: 'order', label: 'Display Order', type: 'number', required: false, placeholder: '1' }
        ],
        certificates: [
            { id: 'title', label: 'Certificate Name', type: 'text', required: true, placeholder: 'e.g. Cloud Architect Professional' },
            { id: 'institution', label: 'Issuing Organization', type: 'text', required: true, placeholder: 'e.g. Amazon Web Services (AWS)' },
            { id: 'period', label: 'Year Issued', type: 'text', required: true, placeholder: 'e.g. 2025' },
            { id: 'verifyUrl', label: 'Credential File Path/URL', type: 'text', required: true, placeholder: 'assets/documents/certificate_aws.pdf' },
            { id: 'category', label: 'Category', type: 'text', required: false, placeholder: 'Cloud' },
            { id: 'order', label: 'Display Order', type: 'number', required: false, placeholder: '1' }
        ],
        patents: [
            { id: 'title', label: 'Patent Title', type: 'text', required: true, placeholder: 'e.g. System and Method for Adaptive Image Compression' },
            { id: 'institution', label: 'Patent Office / Organization', type: 'text', required: true, placeholder: 'e.g. USPTO / Indian Patent Office' },
            { id: 'period', label: 'Year Filed/Granted', type: 'text', required: true, placeholder: 'e.g. 2025' },
            { id: 'verifyUrl', label: 'Patent PDF File Path/URL', type: 'text', required: true, placeholder: 'assets/documents/certificate_aws.pdf' },
            { id: 'category', label: 'Category', type: 'text', required: false, placeholder: 'Software' },
            { id: 'order', label: 'Display Order', type: 'number', required: false, placeholder: '1' }
        ],
        research: [
            { id: 'title', label: 'Paper Title', type: 'text', required: true, placeholder: 'e.g. Deep Learning for Real-Time Semantic Segmentation' },
            { id: 'institution', label: 'Journal / Conference / Publisher', type: 'text', required: true, placeholder: 'e.g. IEEE / Springer / ACM' },
            { id: 'period', label: 'Year Published', type: 'text', required: true, placeholder: 'e.g. 2024' },
            { id: 'verifyUrl', label: 'Research Paper PDF File Path/URL', type: 'text', required: true, placeholder: 'assets/documents/certificate_meta.pdf' },
            { id: 'category', label: 'Category', type: 'text', required: false, placeholder: 'AI/ML' },
            { id: 'order', label: 'Display Order', type: 'number', required: false, placeholder: '1' }
        ],
        skills: [
            { id: 'name', label: 'Skill / Tool Name', type: 'text', required: true, placeholder: 'e.g. Frontend Dev or Figma' },
            { id: 'icon', label: 'Material Icon Name', type: 'text', required: true, placeholder: 'e.g. code, web, design_services' },
            { id: 'type', label: 'Type', type: 'select', required: true, options: ['category', 'tool'] },
            { id: 'tags', label: 'Tags (Comma separated, categories only)', type: 'text', required: false, placeholder: 'Tailwind, TypeScript, Next.js' },
            { id: 'iconColor', label: 'Icon Color (Hex, e.g. tools only)', type: 'text', required: false, placeholder: '#F24E1E' },
            { id: 'isCore', label: 'Core Skill? (categories only)', type: 'checkbox', required: false },
            { id: 'order', label: 'Display Order', type: 'number', required: false, placeholder: '1' }
        ]
    };

    // --------------------------------------------------
    // AUTH CHECK & LOGIN LOGIC
    // --------------------------------------------------
    const initializePortal = async () => {
        if (adminToken) {
            const isValid = await checkTokenValidity(adminToken);
            if (isValid) {
                authOverlay.classList.add('hidden');
                loadWorkspace();
                return;
            }
        }
        authOverlay.classList.remove('hidden');
    };

    const checkTokenValidity = async (password) => {
        try {
            const res = await fetch('/api/auth/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            return res.status === 200;
        } catch (err) {
            console.error('Validation failure:', err);
            return false;
        }
    };

    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pwd = adminPasswordInput.value;
        
        showLoader(true);
        const isValid = await checkTokenValidity(pwd);
        showLoader(false);

        if (isValid) {
            adminToken = pwd;
            sessionStorage.setItem('admin_session_token', pwd);
            authOverlay.classList.add('hidden');
            loadWorkspace();
        } else {
            authError.classList.remove('hidden');
        }
    });

    logoutBtn.addEventListener('click', () => {
        adminToken = '';
        sessionStorage.removeItem('admin_session_token');
        adminPasswordInput.value = '';
        authError.classList.add('hidden');
        authOverlay.classList.remove('hidden');
    });

    // --------------------------------------------------
    // INTERACTION CONTROLS
    // --------------------------------------------------
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('bg-primary', 'text-on-primary');
                b.classList.add('bg-surface', 'text-on-surface', 'hover:bg-surface-container');
            });
            btn.classList.remove('bg-surface', 'text-on-surface', 'hover:bg-surface-container');
            btn.classList.add('bg-primary', 'text-on-primary');
            
            activeTab = btn.getAttribute('data-tab');
            loadWorkspace();
        });
    });

    // Load dynamic workspace
    const loadWorkspace = async () => {
        recordsList.innerHTML = '';
        emptyState.classList.add('hidden');
        
        // Update header texts
        let capitalized = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
        if (activeTab === 'profile') {
            capitalized = "Profile & Assets";
        }
        workspaceTitle.textContent = capitalized;

        if (activeTab === 'messages') {
            addItemBtn.classList.add('hidden');
            loadMessages();
        } else if (activeTab === 'profile') {
            addItemBtn.classList.add('hidden');
            loadProfileSettings();
        } else {
            addItemBtn.classList.remove('hidden');
            const singleNoun = capitalized.endsWith('s') ? capitalized.slice(0, -1) : capitalized;
            addBtnText.textContent = `Add ${singleNoun}`;
            loadStandardRecords();
        }
    };

    // --------------------------------------------------
    // READ OPERATIONS
    // --------------------------------------------------

    // Fetch messages
    const loadMessages = async () => {
        showLoader(true);
        try {
            const res = await fetch('/api/contact', {
                headers: { 'Authorization': adminToken }
            });
            if (res.status === 401) return forceLogout();
            
            const messages = await res.json();
            showLoader(false);

            if (messages.length === 0) {
                emptyState.classList.remove('hidden');
                return;
            }

            messages.forEach(msg => {
                const dateStr = new Date(msg.dateSubmitted).toLocaleString();
                const card = document.createElement('div');
                card.className = "p-6 brutalist-border rounded-xl bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-4";
                card.innerHTML = `
                    <div class="flex justify-between items-start flex-wrap gap-2">
                        <div>
                            <h4 class="font-bold text-lg text-primary">${escapeHtml(msg.subject)}</h4>
                            <p class="text-xs text-on-surface-variant font-semibold mt-1">From: <a class="underline" href="mailto:${msg.email}">${escapeHtml(msg.name)} (${escapeHtml(msg.email)})</a></p>
                        </div>
                        <span class="text-xs bg-surface-container px-3 py-1 brutalist-border rounded font-bold">${dateStr}</span>
                    </div>
                    <div class="p-4 bg-background brutalist-border rounded font-body text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap">${escapeHtml(msg.message)}</div>
                    <button class="delete-msg-btn bg-error text-white font-bold text-xs uppercase px-4 py-2 border-2 border-on-surface hover:opacity-90 rounded self-end" data-id="${msg._id}">
                        Clear Message
                    </button>
                `;
                
                card.querySelector('.delete-msg-btn').addEventListener('click', () => deleteMessage(msg._id));
                recordsList.appendChild(card);
            });

        } catch (err) {
            console.error('Failed to load messages:', err);
            showLoader(false);
        }
    };

    // Fetch standard portfolio contents
    const loadStandardRecords = async () => {
        showLoader(true);
        try {
            // Load content with fallback to static JSON
            let data;
            try {
                const res = await fetch('/api/content');
                if (!res.ok) throw new Error(`API returned ${res.status}`);
                data = await res.json();
            } catch (apiErr) {
                console.warn('Admin API failed, trying static fallback:', apiErr);
                const res = await fetch('assets/data.json');
                data = await res.json();
            }
            showLoader(false);

            const list = data[activeTab] || [];
            if (list.length === 0) {
                emptyState.classList.remove('hidden');
                return;
            }

            // Render list
            list.forEach(item => {
                const card = document.createElement('div');
                card.className = "p-5 border-3 border-on-surface bg-surface rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center gap-4 hover:translate-y-[-2px] transition-transform";
                
                let detailHtml = '';
                if (activeTab === 'projects') {
                    detailHtml = `<p class="text-xs text-on-surface-variant font-bold mt-1">Category: ${escapeHtml(item.category)} | Order: ${item.order}</p>`;
                } else if (activeTab === 'education') {
                    detailHtml = `<p class="text-xs text-on-surface-variant font-bold mt-1">Institution: ${escapeHtml(item.institution)} | Timeline: ${escapeHtml(item.period)}</p>`;
                } else if (activeTab === 'experience') {
                    detailHtml = `<p class="text-xs text-on-surface-variant font-bold mt-1">Company: ${escapeHtml(item.company)} | Role: ${escapeHtml(item.role)}</p>`;
                } else if (activeTab === 'certificates') {
                    detailHtml = `<p class="text-xs text-on-surface-variant font-bold mt-1">Issuing: ${escapeHtml(item.institution)} | Year: ${item.period}</p>`;
                } else if (activeTab === 'patents') {
                    detailHtml = `<p class="text-xs text-on-surface-variant font-bold mt-1">Office: ${escapeHtml(item.institution)} | Year: ${item.period}</p>`;
                } else if (activeTab === 'research') {
                    detailHtml = `<p class="text-xs text-on-surface-variant font-bold mt-1">Publisher: ${escapeHtml(item.institution)} | Year: ${item.period}</p>`;
                } else if (activeTab === 'skills') {
                    detailHtml = `<p class="text-xs text-on-surface-variant font-bold mt-1">Type: ${escapeHtml(item.type)} | Icon: ${escapeHtml(item.icon)} | Order: ${item.order}</p>`;
                }

                card.innerHTML = `
                    <div>
                        <h4 class="font-bold text-lg">${escapeHtml(item.title || item.degree || item.role || item.name)}</h4>
                        ${detailHtml}
                    </div>
                    <div class="flex gap-2">
                        <button class="edit-btn px-4 py-2 border-2 border-on-surface bg-secondary-container text-on-surface font-bold text-xs uppercase hover:bg-opacity-90 rounded" data-id="${item._id}">EDIT</button>
                        <button class="delete-btn px-4 py-2 border-2 border-on-surface bg-error text-white font-bold text-xs uppercase hover:opacity-90 rounded" data-id="${item._id}">DELETE</button>
                    </div>
                `;

                card.querySelector('.edit-btn').addEventListener('click', () => openEditModal(item));
                card.querySelector('.delete-btn').addEventListener('click', () => deleteRecord(item._id));

                recordsList.appendChild(card);
            });

        } catch (err) {
            console.error('Failed to load records:', err);
            showLoader(false);
        }
    };

    const loadProfileSettings = async () => {
        showLoader(true);
        try {
            // Load profile with fallback to static JSON
            let data;
            try {
                const res = await fetch('/api/content');
                if (!res.ok) throw new Error(`API returned ${res.status}`);
                data = await res.json();
            } catch (apiErr) {
                console.warn('Admin Profile API failed, trying static fallback:', apiErr);
                const res = await fetch('assets/data.json');
                data = await res.json();
            }
            showLoader(false);

            const profile = data.profile || {
                profilePhoto: 'assets/profile_avatar.png',
                resumeUrl: 'assets/documents/marksheet_post_graduation.pdf',
                cvUrl: 'assets/documents/marksheet_post_graduation.pdf'
            };

            const photoUrl = profile.profilePhoto.includes('data:') ? profile.profilePhoto : `${profile.profilePhoto}?t=${Date.now()}`;
            const resumeUrl = profile.resumeUrl.includes('data:') ? profile.resumeUrl : `${profile.resumeUrl}?t=${Date.now()}`;
            const cvUrl = profile.cvUrl.includes('data:') ? profile.cvUrl : `${profile.cvUrl}?t=${Date.now()}`;

            const container = document.createElement('div');
            container.className = "grid grid-cols-1 md:grid-cols-3 gap-8 mt-4";
            container.innerHTML = `
                <!-- Profile Image Card -->
                <div class="p-6 brutalist-border rounded-xl bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-6">
                    <div>
                        <h3 class="font-display text-lg font-black uppercase tracking-tighter mb-4">My Photo</h3>
                        <div class="w-full h-48 brutalist-border bg-surface-container flex items-center justify-center overflow-hidden mb-4">
                            <img id="preview-profile-photo" src="${escapeHtml(photoUrl)}" class="object-cover w-full h-full" alt="Profile photo preview">
                        </div>
                        <p class="text-xs text-on-surface-variant font-bold truncate mb-2">Path: ${escapeHtml(profile.profilePhoto)}</p>
                    </div>
                    <div>
                        <input type="file" id="upload-profile-input" accept="image/*" class="hidden">
                        <button type="button" id="upload-profile-btn" class="w-full py-3 bg-secondary-container text-on-surface font-bold text-xs uppercase brutalist-border brutalist-shadow-sm hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-sm font-bold">upload</span>
                            <span>Upload Photo</span>
                        </button>
                    </div>
                </div>

                <!-- Resume Card -->
                <div class="p-6 brutalist-border rounded-xl bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-6">
                    <div>
                        <h3 class="font-display text-lg font-black uppercase tracking-tighter mb-4">Resume (PDF)</h3>
                        <div class="w-full h-48 brutalist-border bg-surface-container flex flex-col items-center justify-center p-4 text-center mb-4">
                            <span class="material-symbols-outlined text-5xl text-primary mb-2">description</span>
                            <a href="${escapeHtml(resumeUrl)}" target="_blank" class="text-xs font-bold text-primary underline truncate max-w-full">View Current Resume</a>
                        </div>
                        <p class="text-xs text-on-surface-variant font-bold truncate mb-2">Path: ${escapeHtml(profile.resumeUrl)}</p>
                    </div>
                    <div>
                        <input type="file" id="upload-resume-input" accept="application/pdf" class="hidden">
                        <button type="button" id="upload-resume-btn" class="w-full py-3 bg-secondary-container text-on-surface font-bold text-xs uppercase brutalist-border brutalist-shadow-sm hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-sm font-bold">upload</span>
                            <span>Upload Resume</span>
                        </button>
                    </div>
                </div>

                <!-- CV Card -->
                <div class="p-6 brutalist-border rounded-xl bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-6">
                    <div>
                        <h3 class="font-display text-lg font-black uppercase tracking-tighter mb-4">Curriculum Vitae (CV)</h3>
                        <div class="w-full h-48 brutalist-border bg-surface-container flex flex-col items-center justify-center p-4 text-center mb-4">
                            <span class="material-symbols-outlined text-5xl text-primary mb-2">article</span>
                            <a href="${escapeHtml(cvUrl)}" target="_blank" class="text-xs font-bold text-primary underline truncate max-w-full">View Current CV</a>
                        </div>
                        <p class="text-xs text-on-surface-variant font-bold truncate mb-2">Path: ${escapeHtml(profile.cvUrl)}</p>
                    </div>
                    <div>
                        <input type="file" id="upload-cv-input" accept="application/pdf" class="hidden">
                        <button type="button" id="upload-cv-btn" class="w-full py-3 bg-secondary-container text-on-surface font-bold text-xs uppercase brutalist-border brutalist-shadow-sm hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-sm font-bold">upload</span>
                            <span>Upload CV</span>
                        </button>
                    </div>
                </div>
            `;

            recordsList.appendChild(container);

            // Bind upload listeners
            setupProfileAssetUploader('profile', 'upload-profile-input', 'upload-profile-btn');
            setupProfileAssetUploader('resume', 'upload-resume-input', 'upload-resume-btn');
            setupProfileAssetUploader('cv', 'upload-cv-input', 'upload-cv-btn');

        } catch (err) {
            console.error('Failed to load profile settings:', err);
            showLoader(false);
        }
    };

    const setupProfileAssetUploader = (type, inputId, btnId) => {
        const fileInput = document.getElementById(inputId);
        const uploadBtn = document.getElementById(btnId);

        if (!fileInput || !uploadBtn) return;

        uploadBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', async () => {
            if (fileInput.files.length === 0) return;
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', type);

            showLoader(true);
            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'Authorization': adminToken },
                    body: formData
                });
                
                if (res.status === 401) {
                    showLoader(false);
                    return forceLogout();
                }

                if (!res.ok) {
                    showLoader(false);
                    const err = await res.json();
                    alert(`Upload failed: ${err.error || 'Unknown error'}`);
                    return;
                }

                const uploadData = await res.json();
                const uploadedUrl = uploadData.url;

                const bodyObj = {};
                if (type === 'profile') bodyObj.profilePhoto = uploadedUrl;
                if (type === 'resume') bodyObj.resumeUrl = uploadedUrl;
                if (type === 'cv') bodyObj.cvUrl = uploadedUrl;

                const saveRes = await fetch('/api/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': adminToken
                    },
                    body: JSON.stringify(bodyObj)
                });
                
                showLoader(false);
                if (saveRes.status === 401) return forceLogout();

                if (saveRes.ok) {
                    triggerToast('PROFILE ASSET UPDATED SUCCESSFULLY!');
                    loadWorkspace();
                } else {
                    alert('Failed to update profile database setting.');
                }
            } catch (err) {
                console.error('Asset upload error:', err);
                showLoader(false);
            }
        });
    };

    // --------------------------------------------------
    // CREATE / UPDATE / DELETE OPERATIONS
    // --------------------------------------------------

    // Setup form input elements
    const buildFormFields = (item = null) => {
        formFieldsWrapper.innerHTML = '';
        const fields = fieldDefinitions[activeTab] || [];
        
        fields.forEach(field => {
            const container = document.createElement('div');
            container.className = "flex flex-col gap-2";
            
            const label = document.createElement('label');
            label.className = "font-bold text-xs uppercase tracking-widest text-on-surface-variant";
            label.setAttribute('for', `form-${field.id}`);
            label.textContent = field.label;
            
            let input;
            let val = '';
            
            if (item) {
                if (field.id === 'tags') {
                    val = item.tags ? item.tags.join(', ') : '';
                } else {
                    val = item[field.id] !== undefined ? item[field.id] : '';
                }
            }

            if (field.type === 'textarea') {
                input = document.createElement('textarea');
                input.rows = 3;
                input.className = "w-full px-4 py-3 border-3 border-on-surface bg-background rounded-lg font-body text-sm resize-none focus:ring-0 focus:border-primary";
                input.value = val;
            } else if (field.type === 'select') {
                input = document.createElement('select');
                input.className = "w-full px-4 py-3 border-3 border-on-surface bg-background rounded-lg font-body text-sm focus:ring-0 focus:border-primary";
                (field.options || []).forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt;
                    option.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);
                    if (opt === val) option.selected = true;
                    input.appendChild(option);
                });
            } else if (field.type === 'checkbox') {
                input = document.createElement('input');
                input.type = 'checkbox';
                input.className = "w-6 h-6 border-3 border-on-surface text-primary focus:ring-0 rounded bg-background";
                input.checked = !!val;
            } else {
                input = document.createElement('input');
                input.type = field.type;
                input.className = "w-full px-4 py-3 border-3 border-on-surface bg-background rounded-lg font-body text-sm focus:ring-0 focus:border-primary";
                input.value = val;
            }
            
            input.id = `form-${field.id}`;
            input.name = field.id;
            input.required = field.required;
            if (field.type !== 'checkbox' && field.type !== 'select' && field.type !== 'textarea') {
                input.placeholder = field.placeholder || '';
            }

            container.appendChild(label);

            // Add upload option for path/URL fields
            const isUrlField = field.id.toLowerCase().endsWith('url') || field.id.toLowerCase().endsWith('image');
            if (isUrlField) {
                const wrapper = document.createElement('div');
                wrapper.className = "flex gap-2 w-full";
                
                input.classList.remove('w-full');
                input.classList.add('flex-grow');
                
                const uploadBtn = document.createElement('button');
                uploadBtn.type = 'button';
                uploadBtn.className = "px-4 py-3 border-3 border-on-surface bg-secondary-container text-on-surface hover:bg-opacity-90 font-bold text-xs uppercase rounded-lg flex items-center justify-center shrink-0 brutalist-shadow-sm active:translate-y-[2px] active:shadow-none transition-transform";
                uploadBtn.innerHTML = `<span class="material-symbols-outlined text-sm font-bold">upload</span>`;
                
                const hiddenFileInput = document.createElement('input');
                hiddenFileInput.type = 'file';
                hiddenFileInput.className = 'hidden';
                if (field.id === 'imageUrl') {
                    hiddenFileInput.accept = 'image/*';
                } else {
                    hiddenFileInput.accept = 'image/*,application/pdf';
                }

                uploadBtn.addEventListener('click', () => hiddenFileInput.click());
                hiddenFileInput.addEventListener('change', async () => {
                    if (hiddenFileInput.files.length === 0) return;
                    const file = hiddenFileInput.files[0];
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('type', activeTab === 'projects' ? 'project' : 'general');

                    showLoader(true);
                    try {
                        const uploadRes = await fetch('/api/upload', {
                            method: 'POST',
                            headers: { 'Authorization': adminToken },
                            body: formData
                        });
                        
                        showLoader(false);
                        if (uploadRes.status === 401) return forceLogout();

                        if (uploadRes.ok) {
                            const uploadData = await uploadRes.json();
                            input.value = uploadData.url;
                            triggerToast('FILE UPLOADED SUCCESSFULLY!');
                        } else {
                            const err = await uploadRes.json();
                            alert(`Upload failed: ${err.error || 'Unknown error'}`);
                        }
                    } catch (err) {
                        console.error('File upload error:', err);
                        showLoader(false);
                    }
                });

                wrapper.appendChild(input);
                wrapper.appendChild(uploadBtn);
                container.appendChild(wrapper);
            } else if (field.type === 'checkbox') {
                const row = document.createElement('div');
                row.className = "flex items-center gap-3 mt-1";
                row.appendChild(input);
                const span = document.createElement('span');
                span.className = "text-xs font-semibold text-on-surface-variant";
                span.textContent = "Yes, display this skill badge prominently as Core Skill";
                row.appendChild(span);
                container.appendChild(row);
            } else {
                container.appendChild(input);
            }
            
            formFieldsWrapper.appendChild(container);
        });
    };

    // Submit form action (Add or Edit)
    recordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const id = editIdInput.value;
        const bodyObj = {};
        
        const fields = fieldDefinitions[activeTab] || [];
        fields.forEach(field => {
            const inputEl = document.getElementById(`form-${field.id}`);
            if (!inputEl) return;
            
            if (field.id === 'tags') {
                bodyObj.tags = inputEl.value.split(',').map(tag => tag.trim()).filter(Boolean);
            } else if (field.id === 'order') {
                bodyObj.order = inputEl.value ? parseInt(inputEl.value) : 0;
            } else if (field.type === 'checkbox') {
                bodyObj[field.id] = inputEl.checked;
            } else {
                bodyObj[field.id] = inputEl.value;
            }
        });

        const isEdit = !!id;
        const url = isEdit ? `/api/${activeTab}/${id}` : `/api/${activeTab}`;
        const method = isEdit ? 'PUT' : 'POST';

        showLoader(true);
        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': adminToken
                },
                body: JSON.stringify(bodyObj)
            });

            showLoader(false);
            if (res.status === 401) return forceLogout();

            if (res.ok) {
                closeFormModal();
                triggerToast(isEdit ? 'RECORD UPDATED SUCCESSFULLY!' : 'RECORD CREATED SUCCESSFULLY!');
                loadWorkspace();
            } else {
                const err = await res.json();
                alert(`Error: ${err.error || 'Failed to save record'}`);
            }

        } catch (err) {
            console.error('Submit failed:', err);
            showLoader(false);
        }
    });

    // Delete item
    const deleteRecord = async (id) => {
        if (!confirm('Are you sure you want to delete this record permanently?')) return;
        
        showLoader(true);
        try {
            const res = await fetch(`/api/${activeTab}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': adminToken }
            });
            
            showLoader(false);
            if (res.status === 401) return forceLogout();

            if (res.ok) {
                triggerToast('RECORD DELETED SUCCESSFULLY!');
                loadWorkspace();
            } else {
                alert('Failed to delete item.');
            }
        } catch (err) {
            console.error('Delete failed:', err);
            showLoader(false);
        }
    };

    // Delete message submission
    const deleteMessage = async (id) => {
        if (!confirm('Clear this message from logs?')) return;

        showLoader(true);
        try {
            const res = await fetch(`/api/contact/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': adminToken }
            });

            showLoader(false);
            if (res.status === 401) return forceLogout();

            if (res.ok) {
                triggerToast('MESSAGE CLEARED!');
                loadWorkspace();
            }
        } catch (err) {
            console.error('Failed to delete message:', err);
            showLoader(false);
        }
    };

    // --------------------------------------------------
    // MODALS Toggles
    // --------------------------------------------------

    const openEditModal = (item) => {
        editIdInput.value = item._id;
        const capitalized = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
        const noun = capitalized.endsWith('s') ? capitalized.slice(0, -1) : capitalized;
        modalFormTitle.textContent = `Edit ${noun}`;
        
        buildFormFields(item);
        formModal.classList.remove('hidden');
    };

    addItemBtn.addEventListener('click', () => {
        editIdInput.value = '';
        const capitalized = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
        const noun = capitalized.endsWith('s') ? capitalized.slice(0, -1) : capitalized;
        modalFormTitle.textContent = `Add New ${noun}`;
        
        buildFormFields();
        formModal.classList.remove('hidden');
    });

    const closeFormModal = () => {
        formModal.classList.add('hidden');
        recordForm.reset();
        editIdInput.value = '';
    };

    closeModelBtn.addEventListener('click', closeFormModal);
    cancelFormBtn.addEventListener('click', closeFormModal);

    // --------------------------------------------------
    // UTILITIES HELPERS
    // --------------------------------------------------
    
    const showLoader = (show) => {
        if (show) loaderOverlay.classList.remove('hidden');
        else loaderOverlay.classList.add('hidden');
    };

    const triggerToast = (text) => {
        toastText.textContent = text;
        actionToast.classList.remove('hidden');
        setTimeout(() => {
            actionToast.classList.add('hidden');
        }, 3000);
    };

    const forceLogout = () => {
        adminToken = '';
        sessionStorage.removeItem('admin_session_token');
        authOverlay.classList.remove('hidden');
        showLoader(false);
    };

    // Basic HTML escaping helper to prevent XSS in admin UI
    const escapeHtml = (text) => {
        if (!text) return '';
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    // Init script
    initializePortal();
});
