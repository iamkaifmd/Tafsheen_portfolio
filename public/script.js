/**
 * AIDEN STERLING PORTFOLIO - DYNAMIC NEO-BRUTALIST LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --------------------------------------------------
    // 1. DYNAMIC NAVIGATION HIGHLIGHT ON SCROLL
    // --------------------------------------------------
    const navLinks = document.querySelectorAll('header div.hidden a, nav.md\\:hidden a');
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            
            // Get links in both header nav and bottom nav bar matching this sectionId
            const matchingLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);

            matchingLinks.forEach(link => {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    if (link.parentElement.tagName === 'DIV') {
                        // Desktop Nav Link styling
                        link.className = "font-label-md text-primary bg-primary-container px-4 py-1 rounded-lg border-3 border-on-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
                    } else if (link.parentElement.tagName === 'NAV') {
                        // Bottom Nav link styling (Mobile Only)
                        link.className = "flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-lg border-3 border-on-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-1 active:scale-95 transition-transform";
                    }
                } else {
                    if (link.parentElement.tagName === 'DIV') {
                        link.className = "font-label-md text-on-surface-variant hover:text-primary transition-colors";
                    } else if (link.parentElement.tagName === 'NAV') {
                        link.className = "flex flex-col items-center justify-center text-on-surface-variant p-2 active:scale-95 transition-transform";
                    }
                }
            });
        });
    }
    window.addEventListener('scroll', scrollActive);

    // --------------------------------------------------
    // 2. CONTACT FORM SUBMISSION TO DATABASE
    // --------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const toast = document.getElementById('toast');

    if (contactForm && submitBtn) {
        const inputs = contactForm.querySelectorAll('input, textarea');

        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        };

        const toggleInputError = (input, isValid) => {
            const errorLabel = document.getElementById(`${input.id}-error`);
            if (errorLabel) {
                if (isValid) {
                    errorLabel.classList.add('hidden');
                    input.classList.remove('border-error');
                    input.classList.add('border-on-surface');
                } else {
                    errorLabel.classList.remove('hidden');
                    input.classList.remove('border-on-surface');
                    input.classList.add('border-error');
                }
            }
        };

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.required && !input.value.trim()) {
                    toggleInputError(input, false);
                } else if (input.type === 'email' && input.value.trim()) {
                    toggleInputError(input, validateEmail(input.value.trim()));
                } else {
                    toggleInputError(input, true);
                }
            });
            
            input.addEventListener('input', () => {
                const errorLabel = document.getElementById(`${input.id}-error`);
                if (errorLabel && !errorLabel.classList.contains('hidden')) {
                    if (input.type === 'email') {
                        if (validateEmail(input.value.trim())) toggleInputError(input, true);
                    } else if (input.value.trim()) {
                        toggleInputError(input, true);
                    }
                }
            });
        });

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let isFormValid = true;

            inputs.forEach(input => {
                if (input.required && !input.value.trim()) {
                    toggleInputError(input, false);
                    isFormValid = false;
                } else if (input.type === 'email') {
                    const isEmailValid = validateEmail(input.value.trim());
                    toggleInputError(input, isEmailValid);
                    if (!isEmailValid) isFormValid = false;
                }
            });

            if (isFormValid) {
                const spanText = submitBtn.querySelector('span');
                const sendIcon = submitBtn.querySelector('.send-icon');
                const spinnerIcon = submitBtn.querySelector('.spinner-icon');

                spanText.textContent = "SENDING...";
                sendIcon.classList.add('hidden');
                spinnerIcon.classList.remove('hidden');
                submitBtn.disabled = true;

                const bodyData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    subject: document.getElementById('subject').value.trim(),
                    message: document.getElementById('message').value.trim()
                };

                try {
                    const res = await fetch('/api/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bodyData)
                    });

                    if (res.ok) {
                        if (toast) {
                            toast.classList.remove('hidden');
                            setTimeout(() => {
                                toast.classList.add('hidden');
                            }, 4000);
                        }
                        contactForm.reset();
                    } else {
                        alert('Failed to send message. Please try again.');
                    }
                } catch (err) {
                    console.error('Submit error:', err);
                    alert('Network error. Failed to send message.');
                } finally {
                    spanText.textContent = "SEND MESSAGE";
                    sendIcon.classList.remove('hidden');
                    spinnerIcon.classList.add('hidden');
                    submitBtn.disabled = false;
                }
            }
        });
    }

    // --------------------------------------------------
    // 3. PDF MODAL VIEWER LOGIC
    // --------------------------------------------------
    const pdfModal = document.getElementById('pdf-modal');
    const pdfIframe = document.getElementById('pdf-iframe');
    const pdfModalTitle = document.getElementById('pdf-modal-title');
    const pdfModalClose = document.getElementById('pdf-modal-close');
    const pdfModalOverlay = document.querySelector('.pdf-modal-overlay');
    const pdfModalExternal = document.getElementById('pdf-modal-external');

    function base64ToBlobUrl(base64Data) {
        try {
            const parts = base64Data.split(';base64,');
            const contentType = parts[0].split(':')[1];
            const raw = window.atob(parts[1]);
            const rawLength = raw.length;
            const uInt8Array = new Uint8Array(rawLength);
            for (let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            const blob = new Blob([uInt8Array], { type: contentType });
            return URL.createObjectURL(blob);
        } catch (e) {
            console.error('Failed to convert base64 to blob:', e);
            return base64Data;
        }
    }

    function openPdfModal(e) {
        let url = this.getAttribute('href');
        const title = this.getAttribute('data-title') || 'Document Viewer';

        // Workaround checks: local file file:// execution or screen ≤ 768px (mobile viewer constraints)
        if (window.location.protocol === 'file:' || window.innerWidth <= 768) {
            return; // Let browser standard link target="_blank" tab navigation load
        }

        e.preventDefault();

        // Convert base64 data URIs to Blob URLs to bypass browser iframe security blocks
        if (url.startsWith('data:application/pdf;base64,')) {
            url = base64ToBlobUrl(url);
        }

        if (pdfIframe && pdfModal) {
            pdfIframe.src = url;
            if (pdfModalTitle) pdfModalTitle.textContent = title;
            if (pdfModalExternal) pdfModalExternal.href = url;
            
            pdfModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        }
    }

    function closePdfModal() {
        if (pdfModal) {
            pdfModal.classList.add('hidden');
            if (pdfIframe) pdfIframe.src = ''; // stop rendering
            document.body.style.overflow = ''; // Unlock background scroll
        }
    }

    if (pdfModalClose) pdfModalClose.addEventListener('click', closePdfModal);
    if (pdfModalOverlay) pdfModalOverlay.addEventListener('click', closePdfModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pdfModal && !pdfModal.classList.contains('hidden')) {
            closePdfModal();
        }
    });

    // --------------------------------------------------
    // 4. FETCH DYNAMIC PORTFOLIO DATA (MONGODB)
    // --------------------------------------------------

    const loadDynamicData = async () => {
        try {
            const res = await fetch('/api/content');
            if (!res.ok) {
                throw new Error(`API returned status ${res.status}`);
            }
            const data = await res.json();

            renderProjects(data.projects || []);
            renderEducation(data.education || []);
            renderExperience(data.experience || []);
            renderCertificates(data.certificates || []);
            renderPatents(data.patents || []);
            renderResearch(data.research || []);
            renderSkills(data.skills || []);
            applyProfileSettings(data.profile);

            // Setup bindings for dynamic loaded nodes
            bindDynamicInteractions();

        } catch (err) {
            console.error('Failed to load portfolio database content, trying static fallback:', err);
            try {
                const res = await fetch('assets/data.json');
                if (!res.ok) {
                    throw new Error(`Static backup returned status ${res.status}`);
                }
                const data = await res.json();
                
                renderProjects(data.projects || []);
                renderEducation(data.education || []);
                renderExperience(data.experience || []);
                renderCertificates(data.certificates || []);
                renderPatents(data.patents || []);
                renderResearch(data.research || []);
                renderSkills(data.skills || []);
                applyProfileSettings(data.profile);

                // Setup bindings for dynamic loaded nodes
                bindDynamicInteractions();
                console.log('Successfully loaded fallback static portfolio data');
            } catch (fallbackErr) {
                console.error('Failed to load static fallback data:', fallbackErr);
            }
        }
    };

    function renderProjects(projects) {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        grid.innerHTML = '';

        if (projects.length === 0) {
            grid.innerHTML = '<p class="text-center font-bold text-on-surface-variant">No projects available.</p>';
            return;
        }

        projects.forEach((proj, idx) => {
            const tagsHtml = (proj.tags || []).map(t => `<span class="font-label-md px-4 py-2 bg-surface-container border-3 border-on-surface rounded-full">${escapeHtml(t)}</span>`).join('');
            const isReverse = idx % 2 === 1;
            const directionClass = isReverse ? 'md:flex-row-reverse text-left' : 'md:flex-row';

            const card = document.createElement('article');
            card.className = "group-project relative";
            card.innerHTML = `
                <div class="flex flex-col ${directionClass} gap-gutter bg-surface rounded-lg border-3 border-on-surface neumorphic-base brutalist-shadow overflow-hidden transition-all duration-300 hover:translate-y-[-4px] card-tilt">
                    <div class="w-full md:w-1/2 h-[300px] md:h-auto overflow-hidden">
                        <div class="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style="background-image: url('${escapeHtml(proj.imageUrl)}')"></div>
                    </div>
                    <div class="w-full md:w-1/2 p-10 flex flex-col justify-between">
                        <div>
                            <div class="flex flex-wrap gap-2 mb-6">
                                <span class="bg-primary text-on-primary font-label-md text-xs px-3 py-1 border-2 border-on-surface uppercase tracking-widest">${escapeHtml(proj.category)}</span>
                            </div>
                            <h3 class="font-headline-lg text-headline-lg mb-4">${escapeHtml(proj.title)}</h3>
                            <p class="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-md">${escapeHtml(proj.description)}</p>
                            <div class="flex flex-wrap gap-3 mb-12">${tagsHtml}</div>
                        </div>
                        <a href="${escapeHtml(proj.projectLink)}" class="self-start px-8 py-4 bg-primary text-on-primary font-headline-lg-mobile border-3 border-on-surface brutalist-shadow-sm hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all text-center">
                            View Project
                        </a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function renderEducation(education) {
        const grid = document.getElementById('education-grid');
        if (!grid) return;
        grid.innerHTML = '';

        if (education.length === 0) {
            grid.innerHTML = '<p class="text-center font-bold text-on-surface-variant col-span-2">No education history available.</p>';
            return;
        }

        education.forEach(edu => {
            const card = document.createElement('div');
            card.className = "neo-card neumorphic-base brutalist-border bg-surface p-6 rounded-xl transition-all duration-300 flex flex-col justify-between";
            card.innerHTML = `
                <div>
                    <div class="flex justify-between items-start mb-4">
                        <span class="material-symbols-outlined text-primary text-4xl">school</span>
                        <span class="font-label-md text-label-md uppercase bg-secondary-container px-3 py-1 brutalist-border">${escapeHtml(edu.period)}</span>
                    </div>
                    <h3 class="font-headline-lg-mobile text-headline-lg-mobile mb-2">${escapeHtml(edu.degree)}</h3>
                    <p class="font-body-md text-on-surface-variant font-bold mb-2">${escapeHtml(edu.institution)}</p>
                    <p class="font-body-md text-on-surface-variant mb-6">${escapeHtml(edu.detailText)}</p>
                </div>
                <a href="${escapeHtml(edu.marksheetUrl)}" target="_blank" class="pdf-link px-4 py-2 bg-surface border-3 border-on-surface rounded-lg font-label-md text-center hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2 self-start brutalist-shadow-sm" data-title="${escapeHtml(edu.degree)} Transcript">
                    <span class="material-symbols-outlined text-sm">verified_user</span>
                    <span>VIEW MARKSHEET</span>
                </a>
            `;
            grid.appendChild(card);
        });
    }

    function renderExperience(experience) {
        const timeline = document.getElementById('experience-timeline');
        if (!timeline) return;
        timeline.innerHTML = '';

        if (experience.length === 0) {
            timeline.innerHTML = '<p class="text-center font-bold text-on-surface-variant">No professional experience available.</p>';
            return;
        }

        const colors = ['bg-primary', 'bg-secondary', 'bg-tertiary'];

        experience.forEach((exp, idx) => {
            const dotColor = colors[idx % colors.length];
            const card = document.createElement('div');
            card.className = "relative";
            card.innerHTML = `
                <div class="absolute -left-[42px] top-1.5 w-6 h-6 rounded-full ${dotColor} border-3 border-on-surface brutalist-shadow-sm"></div>
                <div class="neo-card neumorphic-base brutalist-border bg-surface p-6 rounded-xl transition-all duration-300">
                    <div class="flex flex-wrap justify-between items-start gap-2 mb-4">
                        <div>
                            <span class="bg-secondary-container text-on-secondary-fixed font-label-md text-xs px-3 py-1 border-2 border-on-surface uppercase tracking-widest">${escapeHtml(exp.category)}</span>
                            <h3 class="font-headline-lg-mobile text-headline-lg-mobile mt-2">${escapeHtml(exp.role)}</h3>
                        </div>
                        <span class="font-label-md text-label-md uppercase bg-surface-container border-2 border-on-surface px-3 py-1 rounded">${escapeHtml(exp.period)}</span>
                    </div>
                    <h4 class="font-body-md font-bold text-on-surface-variant mb-3">${escapeHtml(exp.company)}</h4>
                    <p class="font-body-md text-on-surface-variant leading-relaxed">${escapeHtml(exp.description)}</p>
                </div>
            `;
            timeline.appendChild(card);
        });
    }

    function renderCertificates(certs) {
        const grid = document.getElementById('certificates-grid');
        if (!grid) return;
        grid.innerHTML = '';

        if (certs.length === 0) {
            grid.innerHTML = '<p class="text-center font-bold text-on-surface-variant col-span-3">No certificates available.</p>';
            return;
        }

        const icons = {
            Cloud: 'verified_user',
            'Web Development': 'code',
            Design: 'palette'
        };

        certs.forEach(cert => {
            const icon = icons[cert.category] || 'verified_user';
            const card = document.createElement('div');
            card.className = "neo-card neumorphic-base brutalist-border bg-surface p-6 rounded-xl transition-all duration-300 flex flex-col justify-between";
            card.innerHTML = `
                <div>
                    <div class="flex justify-between items-start mb-4">
                        <div class="bg-on-background text-background p-3 brutalist-border">
                            <span class="material-symbols-outlined text-3xl">${icon}</span>
                        </div>
                        <span class="font-label-md text-label-md uppercase bg-secondary-container px-3 py-1 brutalist-border">${escapeHtml(cert.period)}</span>
                    </div>
                    <h3 class="font-headline-lg-mobile text-headline-lg-mobile mb-2">${escapeHtml(cert.title)}</h3>
                    <p class="font-body-md text-body-md text-on-surface-variant mb-4">${escapeHtml(cert.institution)}</p>
                </div>
                <a href="${escapeHtml(cert.verifyUrl)}" target="_blank" class="pdf-link flex items-center gap-2 text-primary font-bold hover:underline self-start" data-title="${escapeHtml(cert.title)} Credentials">
                    <span class="material-symbols-outlined text-sm">link</span>
                    <span class="font-label-md text-label-md">VERIFY CREDENTIAL</span>
                </a>
            `;
            grid.appendChild(card);
        });
    }

    function renderPatents(patents) {
        const grid = document.getElementById('patents-grid');
        if (!grid) return;
        grid.innerHTML = '';

        if (patents.length === 0) {
            grid.innerHTML = '<p class="text-center font-bold text-on-surface-variant col-span-3">No patents available.</p>';
            return;
        }

        patents.forEach(pat => {
            const card = document.createElement('div');
            card.className = "neo-card neumorphic-base brutalist-border bg-surface p-6 rounded-xl transition-all duration-300 flex flex-col justify-between";
            card.innerHTML = `
                <div>
                    <div class="flex justify-between items-start mb-4">
                        <div class="bg-on-background text-background p-3 brutalist-border">
                            <span class="material-symbols-outlined text-3xl">description</span>
                        </div>
                        <span class="font-label-md text-label-md uppercase bg-secondary-container px-3 py-1 brutalist-border">${escapeHtml(pat.period)}</span>
                    </div>
                    <h3 class="font-headline-lg-mobile text-headline-lg-mobile mb-2">${escapeHtml(pat.title)}</h3>
                    <p class="font-body-md text-body-md text-on-surface-variant mb-4">${escapeHtml(pat.institution)}</p>
                </div>
                <a href="${escapeHtml(pat.verifyUrl)}" target="_blank" class="pdf-link flex items-center gap-2 text-primary font-bold hover:underline self-start" data-title="${escapeHtml(pat.title)}">
                    <span class="material-symbols-outlined text-sm">link</span>
                    <span class="font-label-md text-label-md">OPEN PATENT</span>
                </a>
            `;
            grid.appendChild(card);
        });
    }

    function renderResearch(papers) {
        const grid = document.getElementById('research-grid');
        if (!grid) return;
        grid.innerHTML = '';

        if (papers.length === 0) {
            grid.innerHTML = '<p class="text-center font-bold text-on-surface-variant col-span-3">No research papers available.</p>';
            return;
        }

        papers.forEach(paper => {
            const card = document.createElement('div');
            card.className = "neo-card neumorphic-base brutalist-border bg-surface p-6 rounded-xl transition-all duration-300 flex flex-col justify-between";
            card.innerHTML = `
                <div>
                    <div class="flex justify-between items-start mb-4">
                        <div class="bg-on-background text-background p-3 brutalist-border">
                            <span class="material-symbols-outlined text-3xl">menu_book</span>
                        </div>
                        <span class="font-label-md text-label-md uppercase bg-secondary-container px-3 py-1 brutalist-border">${escapeHtml(paper.period)}</span>
                    </div>
                    <h3 class="font-headline-lg-mobile text-headline-lg-mobile mb-2">${escapeHtml(paper.title)}</h3>
                    <p class="font-body-md text-body-md text-on-surface-variant mb-4">${escapeHtml(paper.institution)}</p>
                </div>
                <a href="${escapeHtml(paper.verifyUrl)}" target="_blank" class="pdf-link flex items-center gap-2 text-primary font-bold hover:underline self-start" data-title="${escapeHtml(paper.title)}">
                    <span class="material-symbols-outlined text-sm">link</span>
                    <span class="font-label-md text-label-md">OPEN PAPER</span>
                </a>
            `;
            grid.appendChild(card);
        });
    }

    // Dynamic bindings after rendering items
    function bindDynamicInteractions() {
        // PDF Popups
        const dynamicPdfLinks = document.querySelectorAll('.pdf-link');
        dynamicPdfLinks.forEach(link => {
            link.addEventListener('click', openPdfModal);
        });

        // 3D Card mouse tilt effects
        const tiltCards = document.querySelectorAll('.card-tilt, .neo-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 30; // Max 5deg
                const rotateY = (centerX - x) / 60;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            });
        });
    }

    function renderSkills(skills) {
        const categoriesGrid = document.getElementById('skills-categories-grid');
        const toolkitGrid = document.getElementById('toolkit-grid');

        if (categoriesGrid) {
            categoriesGrid.innerHTML = '';
            const categories = skills.filter(s => s.type === 'category');
            if (categories.length === 0) {
                categoriesGrid.innerHTML = '<p class="text-center font-bold text-on-surface-variant col-span-full">No skills categories available.</p>';
            } else {
                categories.forEach(skill => {
                    const card = document.createElement('div');
                    const tagsHtml = (skill.tags || []).map(t => {
                        const tagClass = skill.isCore 
                            ? 'bg-primary text-on-primary border-2 border-on-surface px-3 py-1 font-label-md text-xs rounded-full'
                            : 'bg-surface-container-high border-2 border-on-surface px-3 py-1 font-label-md text-xs rounded-full';
                        return `<span class="${tagClass}">${escapeHtml(t)}</span>`;
                    }).join('');

                    if (skill.isCore) {
                        card.className = "bg-primary-container border-3 border-on-surface p-6 rounded-lg brutal-shadow hover-lift transition-all relative overflow-hidden";
                        card.innerHTML = `
                            <div class="absolute top-0 right-0 p-2">
                                <span class="bg-on-surface text-surface text-[10px] px-2 py-0.5 font-bold uppercase tracking-widest">Core Skill</span>
                            </div>
                            <div class="w-12 h-12 bg-surface rounded-full flex items-center justify-center mb-6 border-3 border-on-surface brutal-shadow-sm">
                                <span class="material-symbols-outlined text-primary font-bold text-2xl">${escapeHtml(skill.icon)}</span>
                            </div>
                            <h3 class="font-headline-lg text-headline-lg-mobile mb-4 text-on-primary-container">${escapeHtml(skill.name)}</h3>
                            <div class="flex flex-wrap gap-2">${tagsHtml}</div>
                        `;
                    } else {
                        card.className = "neumorphic-flat border-3 border-on-surface p-6 rounded-lg brutal-shadow hover-lift transition-all bg-surface";
                        card.innerHTML = `
                            <div class="w-12 h-12 neumorphic-inset rounded-full flex items-center justify-center mb-6 border-2 border-on-surface bg-surface">
                                <span class="material-symbols-outlined text-primary text-2xl font-bold">${escapeHtml(skill.icon)}</span>
                            </div>
                            <h3 class="font-headline-lg text-headline-lg-mobile mb-4">${escapeHtml(skill.name)}</h3>
                            <div class="flex flex-wrap gap-2">${tagsHtml}</div>
                        `;
                    }
                    categoriesGrid.appendChild(card);
                });
            }
        }

        if (toolkitGrid) {
            toolkitGrid.innerHTML = '';
            const tools = skills.filter(s => s.type === 'tool');
            if (tools.length === 0) {
                toolkitGrid.innerHTML = '<p class="text-center font-bold text-on-surface-variant col-span-full">No tools available.</p>';
            } else {
                tools.forEach(tool => {
                    const card = document.createElement('div');
                    card.className = "flex flex-col items-center gap-4 p-8 neumorphic-flat border-3 border-on-surface rounded-lg brutal-shadow active-brutal-press transition-all bg-surface";
                    const iconColor = tool.iconColor || '#0040df';
                    card.innerHTML = `
                        <div class="w-16 h-16 bg-surface-container-lowest rounded-full border-3 border-on-surface flex items-center justify-center shadow-[inset_4px_4px_8px_#D1D9E6]">
                            <span class="material-symbols-outlined text-4xl" style="color: ${escapeHtml(iconColor)}">${escapeHtml(tool.icon)}</span>
                        </div>
                        <span class="font-label-md uppercase tracking-widest text-on-surface-variant">${escapeHtml(tool.name)}</span>
                    `;
                    toolkitGrid.appendChild(card);
                });
            }
        }
    }

    function applyProfileSettings(profile) {
        if (!profile) return;
        const profileImg = document.getElementById('profile-img');
        const cvLink = document.getElementById('profile-cv-link');
        const resumeLink = document.getElementById('profile-resume-link');

        if (profileImg && profile.profilePhoto) {
            // Append cache buster to prevent stale image loading
            profileImg.src = profile.profilePhoto.includes('data:') 
                ? profile.profilePhoto 
                : `${profile.profilePhoto}?t=${Date.now()}`;
        }
        if (cvLink && profile.cvUrl) {
            cvLink.href = profile.cvUrl.includes('data:')
                ? profile.cvUrl
                : `${profile.cvUrl}?t=${Date.now()}`;
        }
        if (resumeLink && profile.resumeUrl) {
            resumeLink.href = profile.resumeUrl.includes('data:')
                ? profile.resumeUrl
                : `${profile.resumeUrl}?t=${Date.now()}`;
        }
    }

    // Helper functions
    const escapeHtml = (text) => {
        if (!text) return '';
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    // Load data
    loadDynamicData();
});
