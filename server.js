const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Multer Upload Configuration (Using Memory Storage for direct Base64 conversion)
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif|pdf|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only images (jpeg, jpg, png, gif, webp) and PDFs are allowed!'));
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Successfully connected to MongoDB Database.'))
    .catch(err => console.error('MongoDB connection error:', err));

// --------------------------------------------------
// MONGOOSE SCHEMAS & MODELS
// --------------------------------------------------

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    tags: [String],
    projectLink: { type: String, default: '#' },
    category: { type: String, default: 'Web Development' },
    order: { type: Number, default: 0 }
});

const EducationSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    period: { type: String, required: true },
    detailText: { type: String, required: true },
    marksheetUrl: { type: String, required: true },
    order: { type: Number, default: 0 }
});

const ExperienceSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: 'Engineering' },
    order: { type: Number, default: 0 }
});

const CertificateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    institution: { type: String, required: true },
    period: { type: String, required: true },
    verifyUrl: { type: String, required: true },
    category: { type: String, default: 'Professional' },
    order: { type: Number, default: 0 }
});

const PatentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    institution: { type: String, required: true },
    period: { type: String, required: true },
    verifyUrl: { type: String, required: true },
    category: { type: String, default: 'Patent' },
    order: { type: Number, default: 0 }
});

const ResearchPaperSchema = new mongoose.Schema({
    title: { type: String, required: true },
    institution: { type: String, required: true },
    period: { type: String, required: true },
    verifyUrl: { type: String, required: true },
    category: { type: String, default: 'Research' },
    order: { type: Number, default: 0 }
});

const ContactMessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    dateSubmitted: { type: Date, default: Date.now }
});

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    type: { type: String, required: true, enum: ['category', 'tool'] },
    tags: [String],
    iconColor: { type: String, default: '#0040df' },
    isCore: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
});

const ProfileSchema = new mongoose.Schema({
    profilePhoto: { type: String, default: 'assets/profile_avatar.png' },
    resumeUrl: { type: String, default: 'assets/documents/marksheet_post_graduation.pdf' },
    cvUrl: { type: String, default: 'assets/documents/marksheet_post_graduation.pdf' }
});

const Project = mongoose.model('Project', ProjectSchema);
const Education = mongoose.model('Education', EducationSchema);
const Experience = mongoose.model('Experience', ExperienceSchema);
const Certificate = mongoose.model('Certificate', CertificateSchema);
const Patent = mongoose.model('Patent', PatentSchema);
const ResearchPaper = mongoose.model('ResearchPaper', ResearchPaperSchema);
const ContactMessage = mongoose.model('ContactMessage', ContactMessageSchema);
const Skill = mongoose.model('Skill', SkillSchema);
const Profile = mongoose.model('Profile', ProfileSchema);

const models = {
    projects: Project,
    education: Education,
    experience: Experience,
    certificates: Certificate,
    skills: Skill,
    patents: Patent,
    research: ResearchPaper
};

// --------------------------------------------------
// AUTHENTICATION MIDDLEWARE
// --------------------------------------------------
function requireAdmin(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader === ADMIN_PASSWORD) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized: Invalid Admin password.' });
    }
}

// --------------------------------------------------
// PUBLIC ROUTES
// --------------------------------------------------

// Single aggregate fetch endpoint for initial page render optimization
app.get('/api/content', async (req, res) => {
    try {
        const [projects, education, experience, certificates, skills, patents, research] = await Promise.all([
            Project.find().sort({ order: 1 }),
            Education.find().sort({ order: 1 }),
            Experience.find().sort({ order: 1 }),
            Certificate.find().sort({ order: 1 }),
            Skill.find().sort({ order: 1 }),
            Patent.find().sort({ order: 1 }),
            ResearchPaper.find().sort({ order: 1 })
        ]);
        let profile = await Profile.findOne();
        if (!profile) {
            profile = new Profile();
            await profile.save();
        }
        res.json({ projects, education, experience, certificates, skills, patents, research, profile });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch content data', details: err.message });
    }
});

// Contact message submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All message fields are required.' });
        }
        const newMessage = new ContactMessage({ name, email, subject, message });
        await newMessage.save();
        res.status(201).json({ message: 'Contact message saved successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to send message', details: err.message });
    }
});

// Admin validation login check
app.post('/api/auth/validate', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

// --------------------------------------------------
// ADMIN PROTECTED ROUTES (CRUD)
// --------------------------------------------------

// Get all contact submissions
app.get('/api/contact', requireAdmin, async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ dateSubmitted: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch messages', details: err.message });
    }
});

// Delete a contact submission
app.delete('/api/contact/:id', requireAdmin, async (req, res) => {
    try {
        await ContactMessage.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete message', details: err.message });
    }
});

// File Upload Endpoint (Saves to disk and converts to Base64 as a fallback)
app.post('/api/upload', requireAdmin, (req, res) => {
    upload.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload a file' });
        }
        
        const type = req.body.type || 'general';
        let fileName = '';
        let targetDir = path.join(__dirname, 'public', 'assets');
        let relativeUrl = '';

        if (type === 'profile') {
            fileName = 'profile_avatar.png'; // Overwrite profile avatar
            relativeUrl = 'assets/profile_avatar.png';
        } else if (type === 'resume') {
            fileName = 'resume.pdf';
            targetDir = path.join(targetDir, 'documents');
            relativeUrl = 'assets/documents/resume.pdf';
        } else if (type === 'cv') {
            fileName = 'cv.pdf';
            targetDir = path.join(targetDir, 'documents');
            relativeUrl = 'assets/documents/cv.pdf';
        } else {
            // General or project upload - generate unique filename
            const ext = path.extname(req.file.originalname) || '.png';
            fileName = `file-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
            relativeUrl = `assets/${fileName}`;
        }

        try {
            // Ensure target directory exists
            fs.mkdirSync(targetDir, { recursive: true });
            
            // Write the file buffer to disk
            const destPath = path.join(targetDir, fileName);
            fs.writeFileSync(destPath, req.file.buffer);
            console.log(`Saved file to disk: ${destPath}`);
            
            res.status(200).json({ url: relativeUrl });
        } catch (fileErr) {
            console.error('Failed to save file to disk:', fileErr);
            // Fallback: convert to base64 if saving to disk fails
            const base64Data = req.file.buffer.toString('base64');
            const dataUri = `data:${req.file.mimetype};base64,${base64Data}`;
            res.status(200).json({ url: dataUri });
        }
    });
});

// Helper function to update public/assets/data.json static backup
async function saveDataBackup() {
    try {
        const [projects, education, experience, certificates, skills, patents, research] = await Promise.all([
            Project.find().sort({ order: 1 }),
            Education.find().sort({ order: 1 }),
            Experience.find().sort({ order: 1 }),
            Certificate.find().sort({ order: 1 }),
            Skill.find().sort({ order: 1 }),
            Patent.find().sort({ order: 1 }),
            ResearchPaper.find().sort({ order: 1 })
        ]);
        let profile = await Profile.findOne();
        if (!profile) {
            profile = new Profile();
            await profile.save();
        }
        
        const backupData = { projects, education, experience, certificates, skills, patents, research, profile };
        const backupPath = path.join(__dirname, 'public', 'assets', 'data.json');
        
        // Ensure directory exists
        fs.mkdirSync(path.dirname(backupPath), { recursive: true });
        
        fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf8');
        console.log('Static portfolio data backup saved to public/assets/data.json');
    } catch (err) {
        console.error('Failed to save static portfolio data backup:', err);
    }
}

// Update Profile Settings Endpoint
app.post('/api/profile', requireAdmin, async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (!profile) {
            profile = new Profile();
        }
        profile.profilePhoto = req.body.profilePhoto !== undefined ? req.body.profilePhoto : profile.profilePhoto;
        profile.resumeUrl = req.body.resumeUrl !== undefined ? req.body.resumeUrl : profile.resumeUrl;
        profile.cvUrl = req.body.cvUrl !== undefined ? req.body.cvUrl : profile.cvUrl;
        await profile.save();
        
        // Update backup
        await saveDataBackup();
        
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update profile settings', details: err.message });
    }
});

// Generic CREATE endpoint for portfolio records
app.post('/api/:type', requireAdmin, async (req, res) => {
    const { type } = req.params;
    const Model = models[type];
    if (!Model) return res.status(404).json({ error: 'Unknown content type' });

    try {
        const newItem = new Model(req.body);
        await newItem.save();
        
        // Update backup
        await saveDataBackup();
        
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create record', details: err.message });
    }
});

// Generic UPDATE endpoint for portfolio records
app.put('/api/:type/:id', requireAdmin, async (req, res) => {
    const { type, id } = req.params;
    const Model = models[type];
    if (!Model) return res.status(404).json({ error: 'Unknown content type' });

    try {
        const updatedItem = await Model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedItem) return res.status(404).json({ error: 'Record not found' });
        
        // Update backup
        await saveDataBackup();
        
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update record', details: err.message });
    }
});

// Generic DELETE endpoint for portfolio records
app.delete('/api/:type/:id', requireAdmin, async (req, res) => {
    const { type, id } = req.params;
    const Model = models[type];
    if (!Model) return res.status(404).json({ error: 'Unknown content type' });

    try {
        const deletedItem = await Model.findByIdAndDelete(id);
        if (!deletedItem) return res.status(404).json({ error: 'Record not found' });
        
        // Update backup
        await saveDataBackup();
        
        res.json({ message: 'Record deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete record', details: err.message });
    }
});

// Catch-all route to serve portfolio homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Express Portfolio server running at http://localhost:${PORT}`);
});
