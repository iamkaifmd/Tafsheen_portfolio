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
    imageUrl: String,
    order: Number
});

const ResearchPaperSchema = new mongoose.Schema({
    title: String,
    institution: String,
    period: String,
    verifyUrl: String,
    category: String,
    imageUrl: String,
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

const InternshipSchema = new mongoose.Schema({
    company: String,
    role: String,
    period: String,
    description: String,
    certificateUrl: String,
    order: Number
});

const Project = mongoose.model('Project', ProjectSchema);
const Education = mongoose.model('Education', EducationSchema);
const Experience = mongoose.model('Experience', ExperienceSchema);
const Certificate = mongoose.model('Certificate', CertificateSchema);
const Patent = mongoose.model('Patent', PatentSchema);
const ResearchPaper = mongoose.model('ResearchPaper', ResearchPaperSchema);
const Skill = mongoose.model('Skill', SkillSchema);
const Profile = mongoose.model('Profile', ProfileSchema);
const Internship = mongoose.model('Internship', InternshipSchema);

// Initial portfolio seeding dataset
const initialProjects = [
    {
        title: "Archify AI – AI-Driven Floor Plan to 3D Visualization Platform",
        description: "Architected an AI-powered platform that transforms 2D floor plans into realistic 3D visualizations, reducing manual rendering time by 80%. Implemented Gemini AI to generate high-quality architectural renders in minutes, accelerating early-stage design visualization. Built a full-stack application using React, Spring Boot, and MongoDB to manage 100+ architectural projects with secure authentication and CRUD operations.",
        imageUrl: "assets/project_preview_1.png",
        tags: ["React", "TypeScript", "Spring Boot", "Java 17", "MongoDB", "Gemini AI"],
        projectLink: "https://github.com/iamkaifmd/Archify.ai",
        category: "AI & Web Development",
        order: 1
    },
    {
        title: "AI Driven Agriculture Market Place",
        description: "Integrated historical and simulated market data to generate intelligent pricing and demand insights. Created a farmer-friendly interface enabling crop listing, search, and marketplace transactions. Automated market analysis and demand forecasting, helping farmers make faster, more informed selling decisions by up to 50%.",
        imageUrl: "assets/project_preview_2.png",
        tags: ["Python", "Flask", "Pandas", "HTML", "MySQL", "JavaScript", "CSS"],
        projectLink: "#",
        category: "AI & Data Science",
        order: 2
    },
    {
        title: "Flexi Car – Car Rental Website",
        description: "Developed a full-stack, responsive car rental web application to streamline vehicle booking and rental management. Optimized application deployment on Vercel for scalable and reliable hosting, and architected a modular MERN-based structure. Managed application state effectively using React Context API and useState for a smooth user experience.",
        imageUrl: "assets/project_preview_3.png",
        tags: ["MERN Stack", "Tailwind CSS", "React", "Node.js", "Express", "MongoDB", "Vercel"],
        projectLink: "#",
        category: "Web Development",
        order: 3
    },
    {
        title: "DebugGPT – AI-Powered Real-Time Code Debugger & Optimizer",
        description: "Architected an AI-powered code analysis and debugging assistant that automatically detects syntax, logical, and runtime errors in 15+ programming languages. Integrated LLM-based reasoning models to explain bugs step-by-step and provide optimized structural code rewrites. Developed a real-time web console with code editor overlays and instant unit test generation capabilities.",
        imageUrl: "assets/project_preview_4.png",
        tags: ["React.js", "Node.js", "Express", "OpenAI API", "Monaco Editor", "Tailwind CSS"],
        projectLink: "https://github.com/Deepesh055/DEBUG-GPT",
        category: "AI & Software Engineering",
        order: 4
    },
    {
        title: "AI Resume Analyzer – Intelligent ATS Scoring & Optimization Engine",
        description: "Built an AI-driven resume scoring platform that analyzes PDF/Docx resumes against target job descriptions using Natural Language Processing (NLP). Integrated Google Gemini/Claude API to calculate ATS compatibility scores and provide real-time keyword suggestions and structural enhancements. Implemented user-friendly dashboards displaying metrics on readability, spelling, and impact verbs.",
        imageUrl: "assets/project_preview_5.png",
        tags: ["Next.js", "Node.js", "Gemini API", "PDF-parse", "Chart.js", "Tailwind CSS"],
        projectLink: "https://github.com/iamkaifmd/AI-resume-",
        category: "AI & Web Development",
        order: 5
    }
];

const initialEducation = [
    {
        institution: "Lovely Professional University",
        degree: "Master Of Computer Applications",
        period: "2025 - Present",
        detailText: "Specializing in computer applications and advanced software engineering concepts. CGPA: 7.89. Located in Phagwara, Punjab.",
        marksheetUrl: "assets/documents/marksheet_post_graduation.pdf",
        order: 1
    },
    {
        institution: "Shri Bajrang Singh Mahavidyalaya Mau Gauriganj",
        degree: "Bachelor's Of Science (Mathematics)",
        period: "2021 - 2024",
        detailText: "Focused on core mathematical theories, algebraic systems, and physics. CGPA: 8.1. Located in Amethi, Uttar Pradesh.",
        marksheetUrl: "assets/documents/marksheet_graduation.pdf",
        order: 2
    },
    {
        institution: "Janta Shikhshan Sansthan Inter College Jamon Amethi",
        period: "2019 - 2020",
        degree: "12th Grade (Senior Secondary)",
        detailText: "General science and mathematics coursework. Percentage: 63%. Located in Amethi, Uttar Pradesh.",
        marksheetUrl: "assets/documents/marksheet_12th.pdf",
        order: 3
    },
    {
        institution: "Janta Shikshan Sansthan B I C Jamon Amethi",
        period: "2017 - 2018",
        degree: "10th Grade (High School)",
        detailText: "General high school science and mathematics coursework. Percentage: 81.16%. Located in Amethi, Uttar Pradesh.",
        marksheetUrl: "assets/documents/marksheet_10th.pdf",
        order: 4
    }
];

const initialExperience = [];

const initialInternships = [
    {
        company: "Deloitte",
        role: "Data Analytics Virtual Internship",
        period: "Mar 2026 - Apr 2026",
        description: "Performed Exploratory Data Analysis (EDA) and Data Cleaning to generate actionable insights. Applied analytical thinking to solve business problems, improving decision-making accuracy. Explored forensic technology concepts such as data validation and anomaly detection.",
        certificateUrl: "assets/documents/certificate_deloitte.pdf",
        order: 1
    },
    {
        company: "JP Morgan Chase & Co.",
        role: "Software Engineer Virtual Internship",
        period: "Feb 2026 - Apr 2026",
        description: "Configured the project environment and built the backend application architecture. Utilized Apache Kafka for real-time data streaming and event processing. Used H2 database for data storage, query execution, and backend testing. Developed and tested RESTful APIs for application functionality.",
        certificateUrl: "assets/documents/certificate_jpmorgan.pdf",
        order: 2
    }
];

const initialCertificates = [
    {
        title: "Tech Blitz 2025 Hackathon Participation",
        institution: "Coding Ninjas LPU & Learner's Arc",
        period: "Sep 2025",
        verifyUrl: "assets/documents/certificate_techblitz.pdf",
        category: "Hackathon",
        order: 1
    },
    {
        title: "Data Science 101",
        institution: "IBM (Cognitive Class)",
        period: "Apr 2026",
        verifyUrl: "assets/documents/certificate_datascience.pdf",
        category: "Data Science",
        order: 2
    },
    {
        title: "A Quick Introduction to Machine Learning",
        institution: "IBM (Cognitive Class)",
        period: "May 2026",
        verifyUrl: "assets/documents/certificate_machinelearning.pdf",
        category: "Machine Learning",
        order: 3
    },
    {
        title: "Prompt Engineering for Everyone",
        institution: "IBM (Cognitive Class)",
        period: "Jun 2026",
        verifyUrl: "assets/documents/certificate_promptengineering.pdf",
        category: "Artificial Intelligence",
        order: 4
    },
    {
        title: "Founder's Talk on AI Agents & The Future of Jobs",
        institution: "Capabl. (Elite Techno Groups)",
        period: "Sep 2025",
        verifyUrl: "assets/documents/certificate_founderstalk.pdf",
        category: "Artificial Intelligence",
        order: 5
    },
    {
        title: "Software Engineering Job Simulation Certificate",
        institution: "JP Morgan Chase & Co. (Forage)",
        period: "Apr 2026",
        verifyUrl: "assets/documents/certificate_jpmorgan.pdf",
        category: "Web Development",
        order: 6
    },
    {
        title: "Data Analytics Job Simulation Certificate",
        institution: "Deloitte (Forage)",
        period: "Apr 2026",
        verifyUrl: "assets/documents/certificate_deloitte.pdf",
        category: "Data Science",
        order: 7
    }
];

const initialSkills = [
    // Categories
    {
        name: "Data Science & ML",
        icon: "analytics",
        type: "category",
        tags: ["Data Cleaning", "EDA", "Data Visualization", "NumPy", "Pandas", "scikit-learn"],
        isCore: true,
        order: 1
    },
    {
        name: "Database & Backend",
        icon: "database",
        type: "category",
        tags: ["MySQL", "MongoDB (NoSQL)", "H2 Database", "SQL", "Database Design", "Query Optimization"],
        isCore: true,
        order: 2
    },
    {
        name: "Domain & Soft Skills",
        icon: "psychology",
        type: "category",
        tags: ["Data Structures & Algorithms", "Analytical Skills", "Problem Solving", "Critical Thinking"],
        isCore: false,
        order: 3
    },
    // Toolkit Tools
    {
        name: "Python",
        icon: "code",
        type: "tool",
        iconColor: "#3776AB",
        order: 4
    },
    {
        name: "Java",
        icon: "code",
        type: "tool",
        iconColor: "#007396",
        order: 5
    },
    {
        name: "C++",
        icon: "code",
        type: "tool",
        iconColor: "#00599C",
        order: 6
    },
    {
        name: "HTML & CSS",
        icon: "html",
        type: "tool",
        iconColor: "#E34F26",
        order: 7
    },
    {
        name: "Git & GitHub",
        icon: "terminal",
        type: "tool",
        iconColor: "#F05032",
        order: 8
    },
    {
        name: "VS Code",
        icon: "terminal",
        type: "tool",
        iconColor: "#007ACC",
        order: 9
    },
    {
        name: "Jupyter",
        icon: "description",
        type: "tool",
        iconColor: "#F37626",
        order: 10
    },
    {
        name: "Vercel",
        icon: "cloud",
        type: "tool",
        iconColor: "#000000",
        order: 11
    },
    {
        name: "IBM SPSS Modeler",
        icon: "query_stats",
        type: "tool",
        iconColor: "#325cff",
        order: 12
    },
    {
        name: "IBM Cognos Analytics",
        icon: "pie_chart",
        type: "tool",
        iconColor: "#0062ff",
        order: 13
    },
    {
        name: "Java IDE",
        icon: "code",
        type: "tool",
        iconColor: "#e76f51",
        order: 14
    },
    {
        name: "IoT IDE (Arduino)",
        icon: "developer_board",
        type: "tool",
        iconColor: "#00979d",
        order: 15
    }
];

const initialProfile = {
    profilePhoto: "assets/profile_avatar.png",
    resumeUrl: "assets/documents/cv_tafsheen.pdf",
    cvUrl: "assets/documents/cv_tafsheen.pdf"
};

const initialPatents = [
    {
        title: "AI-Based Soil Immune Health Monitoring and Forecasting Disease Prevention System",
        institution: "Indian Patent Office",
        period: "2026",
        verifyUrl: "assets/documents/patent_soilhealth.pdf",
        category: "Agriculture AI",
        imageUrl: "assets/patent_soilhealth.png",
        order: 1
    },
    {
        title: "Self-Healing Aircraft Wing Using Smart Materials",
        institution: "Indian Patent Office",
        period: "2026",
        verifyUrl: "assets/documents/patent_selfhealingwing.pdf",
        category: "Aerospace Materials",
        imageUrl: "assets/patent_selfhealingwing.png",
        order: 2
    },
    {
        title: "Velocity-Responsive Bioluminescent Plant Matrix for Adaptive Urban Illumination Systems",
        institution: "Indian Patent Office",
        period: "2026",
        verifyUrl: "assets/documents/patent_velocitybioplant.pdf",
        category: "Urban Illumination",
        imageUrl: "assets/patent_velocitybioplant.png",
        order: 3
    }
];

const initialResearch = [
    {
        title: "Fake News Text Classification Using Machine Learning: A Natural Language Processing Approach",
        institution: "International Journal of Computer Applications",
        period: "2026",
        verifyUrl: "assets/documents/research_fakenews.pdf",
        category: "NLP / ML",
        imageUrl: "assets/research_fakenews.png",
        order: 1
    },
    {
        title: "AI-Driven Predictive Analysis of Social Media Impact on Youth Mental Health with Chatbot Integration",
        institution: "Lovely Professional University B.C.A. Capstone Project",
        period: "2026",
        verifyUrl: "assets/documents/research_socialmediahealth.pdf",
        category: "AI & Mental Health",
        imageUrl: "assets/research_socialmediahealth.png",
        order: 2
    }
];

async function seedDatabase() {
    // Write static backup first (resilient fallback for local development without DB access)
    try {
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
            profile: initialProfile,
            internships: initialInternships
        };
        const backupPath = path.join(__dirname, 'public', 'assets', 'data.json');
        fs.mkdirSync(path.dirname(backupPath), { recursive: true });
        fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf8');
        console.log('Static backup successfully saved to public/assets/data.json');
    } catch (backupErr) {
        console.error('Failed to save local static backup:', backupErr);
    }

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
            ResearchPaper.deleteMany({}),
            Internship.deleteMany({})
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
            ResearchPaper.insertMany(initialResearch),
            Internship.insertMany(initialInternships)
        ]);

        console.log('Database seeding successfully finished!');
    } catch (err) {
        console.error('Failed to seed database:', err);
    } finally {
        mongoose.connection.close();
        console.log('Database connection closed.');
    }
}

seedDatabase();
