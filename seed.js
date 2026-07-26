const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

// Schemas matching server.js
const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    tags: [String],
    projectLink: String,
    category: String,
    order: Number
});

const EducationSchema = new mongoose.Schema({
    institution: String,
    degree: String,
    period: String,
    detailText: String,
    marksheetUrl: String,
    order: Number
});

const ExperienceSchema = new mongoose.Schema({
    company: String,
    role: String,
    period: String,
    description: String,
    category: String,
    order: Number
});

const CertificateSchema = new mongoose.Schema({
    title: String,
    institution: String,
    period: String,
    verifyUrl: String,
    category: String,
    order: Number
});

const PatentSchema = new mongoose.Schema({
    title: String,
    institution: String,
    period: String,
    verifyUrl: String,
    category: String,
    order: Number
});

const ResearchPaperSchema = new mongoose.Schema({
    title: String,
    institution: String,
    period: String,
    verifyUrl: String,
    category: String,
    order: Number
});

const SkillSchema = new mongoose.Schema({
    name: String,
    icon: String,
    type: String,
    tags: [String],
    iconColor: String,
    isCore: Boolean,
    order: Number
});

const ProfileSchema = new mongoose.Schema({
    profilePhoto: String,
    resumeUrl: String,
    cvUrl: String
});

const Project = mongoose.model('Project', ProjectSchema);
const Education = mongoose.model('Education', EducationSchema);
const Experience = mongoose.model('Experience', ExperienceSchema);
const Certificate = mongoose.model('Certificate', CertificateSchema);
const Patent = mongoose.model('Patent', PatentSchema);
const ResearchPaper = mongoose.model('ResearchPaper', ResearchPaperSchema);
const Skill = mongoose.model('Skill', SkillSchema);
const Profile = mongoose.model('Profile', ProfileSchema);

// Initial portfolio seeding dataset
const initialProjects = [
    {
        title: "Eco-Track App",
        description: "A high-performance sustainability dashboard designed for corporate carbon tracking. Featuring real-time analytics and industrial-grade data visualization.",
        imageUrl: "assets/project_preview_1.png",
        tags: ["React", "Tailwind", "D3.js"],
        projectLink: "#",
        category: "Sustainability",
        order: 1
    },
    {
        title: "Nexus UI Kit",
        description: "A comprehensive Design System engineered for scale. Built with a focus on Neo-Brutalist aesthetics and atomic design principles.",
        imageUrl: "assets/project_preview_2.png",
        tags: ["Figma", "Storybook", "TypeScript"],
        projectLink: "#",
        category: "Design System",
        order: 2
    },
    {
        title: "VibeFlow",
        description: "Next-gen music streaming experience with immersive transitions and atmospheric shader backgrounds. Focused on user discovery.",
        imageUrl: "assets/project_preview_3.png",
        tags: ["Three.js", "GLSL", "Next.js"],
        projectLink: "#",
        category: "Entertainment",
        order: 3
    }
];

const initialEducation = [
    {
        institution: "Apex University Graduate School",
        degree: "M.S. in Software Engineering",
        period: "2024 - 2026",
        detailText: "Cloud architectures, advanced algorithms, and machine learning structures. GPA: 3.96/4.00.",
        marksheetUrl: "assets/documents/marksheet_post_graduation.pdf",
        order: 1
    },
    {
        institution: "Apex University",
        degree: "B.S. in Computer Science",
        period: "2020 - 2024",
        detailText: "Foundational mathematics, data structures, and database engines. Cumulative GPA: 3.92/4.00.",
        marksheetUrl: "assets/documents/marksheet_graduation.pdf",
        order: 2
    },
    {
        institution: "Tech Academy Secondary School",
        period: "2018 - 2020",
        degree: "12th Grade (Senior Secondary)",
        detailText: "Physics, Chemistry, and Advanced Mathematics major. Overall percentage score: 96.2%.",
        marksheetUrl: "assets/documents/marksheet_12th.pdf",
        order: 3
    },
    {
        institution: "Pioneer High School",
        period: "2016 - 2018",
        degree: "10th Grade (Secondary School)",
        detailText: "General high school coursework including computer sciences, languages, and sciences. Score: 94.6%.",
        marksheetUrl: "assets/documents/marksheet_10th.pdf",
        order: 4
    }
];

const initialExperience = [
    {
        company: "Helix Labs",
        role: "Senior Frontend Developer",
        period: "2024 - Present",
        description: "Leading a frontend team of developers building premium enterprise interfaces, improving performance optimization metrics by 40%, and maintaining internal UI design libraries.",
        category: "Senior Role",
        order: 1
    },
    {
        company: "Nebula Tech",
        role: "Full Stack Engineer",
        period: "2022 - 2024",
        description: "Engineered APIs and backend systems using Node.js and Express. Refactored high-traffic legacy frontend dashboards into modern, responsive, component-based screens.",
        category: "Full-Stack",
        order: 2
    },
    {
        company: "Pioneer Studio",
        role: "Frontend Developer",
        period: "2021 - 2022",
        description: "Created responsive HTML templates, customized layout designs, and implemented state management using vanilla JavaScript and basic React hooks.",
        category: "Frontend",
        order: 3
    }
];

const initialCertificates = [
    {
        title: "Cloud Architecture Professional",
        institution: "Amazon Web Services (AWS)",
        period: "2025",
        verifyUrl: "assets/documents/certificate_aws.pdf",
        category: "Cloud",
        order: 1
    },
    {
        title: "Full-Stack Engineering",
        institution: "Meta Career Programs",
        period: "2023",
        verifyUrl: "assets/documents/certificate_meta.pdf",
        category: "Web Development",
        order: 2
    },
    {
        title: "UI/UX Design Specialist",
        institution: "Meta Career Programs",
        period: "2022",
        verifyUrl: "assets/documents/certificate_meta.pdf",
        category: "Design",
        order: 3
    }
];

const initialSkills = [
    // Categories
    {
        name: "UI/UX Design",
        icon: "web",
        type: "category",
        tags: ["User Flows", "Prototyping", "Wireframing"],
        isCore: false,
        order: 1
    },
    {
        name: "Frontend Dev",
        icon: "code",
        type: "category",
        tags: ["Tailwind", "TypeScript", "Next.js"],
        isCore: true,
        order: 2
    },
    {
        name: "Brand Identity",
        icon: "palette",
        type: "category",
        tags: ["Logotypes", "Styleguides", "Typography"],
        isCore: false,
        order: 3
    },
    {
        name: "Motion Graphics",
        icon: "movie",
        type: "category",
        tags: ["Lottie", "Keyframing", "GLSL"],
        isCore: false,
        order: 4
    },
    // Toolkit Tools
    {
        name: "Figma",
        icon: "design_services",
        type: "tool",
        iconColor: "#F24E1E",
        order: 5
    },
    {
        name: "Adobe CC",
        icon: "category",
        type: "tool",
        iconColor: "#FF0000",
        order: 6
    },
    {
        name: "VS Code",
        icon: "terminal",
        type: "tool",
        iconColor: "#007ACC",
        order: 7
    },
    {
        name: "React",
        icon: "dynamic_form",
        type: "tool",
        iconColor: "#61DAFB",
        order: 8
    }
];

const initialProfile = {
    profilePhoto: "assets/profile_avatar.png",
    resumeUrl: "assets/documents/marksheet_post_graduation.pdf",
    cvUrl: "assets/documents/marksheet_post_graduation.pdf"
};

const initialPatents = [
    {
        title: "System and Method for Adaptive Image Compression",
        institution: "Indian Patent Office",
        period: "2025",
        verifyUrl: "assets/documents/certificate_aws.pdf",
        category: "Software",
        order: 1
    }
];

const initialResearch = [
    {
        title: "Deep Learning for Real-Time Semantic Segmentation",
        institution: "IEEE Journal of Computer Vision",
        period: "2024",
        verifyUrl: "assets/documents/certificate_meta.pdf",
        category: "AI/ML",
        order: 1
    }
];

async function seedDatabase() {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB database successfully.');

        // Drop current collections to load cleanly
        console.log('Clearing old collections...');
        await Promise.all([
            Project.deleteMany({}),
            Education.deleteMany({}),
            Experience.deleteMany({}),
            Certificate.deleteMany({}),
            Skill.deleteMany({}),
            Profile.deleteMany({}),
            Patent.deleteMany({}),
            ResearchPaper.deleteMany({})
        ]);
        console.log('Cleared existing data.');

        // Write entries
        console.log('Inserting database records...');
        await Promise.all([
            Project.insertMany(initialProjects),
            Education.insertMany(initialEducation),
            Experience.insertMany(initialExperience),
            Certificate.insertMany(initialCertificates),
            Skill.insertMany(initialSkills),
            Profile.create(initialProfile),
            Patent.insertMany(initialPatents),
            ResearchPaper.insertMany(initialResearch)
        ]);

        console.log('Database seeding successfully finished!');

        // Write static backup
        const fs = require('fs');
        const path = require('path');
        const backupData = {
            projects: initialProjects,
            education: initialEducation,
            experience: initialExperience,
            certificates: initialCertificates,
            skills: initialSkills,
            patents: initialPatents,
            research: initialResearch,
            profile: initialProfile
        };
        const backupPath = path.join(__dirname, 'public', 'assets', 'data.json');
        fs.mkdirSync(path.dirname(backupPath), { recursive: true });
        fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf8');
        console.log('Static backup saved to public/assets/data.json');
    } catch (err) {
        console.error('Failed to seed database:', err);
    } finally {
        mongoose.connection.close();
        console.log('Database connection closed.');
    }
}

seedDatabase();
