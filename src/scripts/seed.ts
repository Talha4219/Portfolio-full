import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Project from '../models/Project';
import About from '../models/About';
import Education from '../models/Education';
import Experience from '../models/Experience';
import Skill from '../models/Skill';

const MONGODB_URI = process.env.MONGODB_URI;

const seedDatabase = async () => {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in your .env file');
    process.exit(1);
  }

  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.');

    // 1. Cleanup existing data (optional but recommended for fresh start)
    console.log('Cleaning up existing data...');
    await Promise.all([
      User.deleteMany({}),
      Project.deleteMany({}),
      About.deleteMany({}),
      Education.deleteMany({}),
      Experience.deleteMany({}),
      Skill.deleteMany({}),
    ]);

    // 2. Seed Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

    const adminUser = new User({
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    await adminUser.save();
    console.log(`Admin user created: ${adminEmail} / ${adminPassword}`);

    // 3. Seed About
    await About.create({
      name: 'John Doe',
      headshot: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&h=600&auto=format&fit=crop',
      bio: 'I am a passionate Full Stack Developer with over 5 years of experience building modern web applications. I specialize in the MERN stack and love exploring new technologies like Next.js and AI integration. My goal is to build products that solve real-world problems and provide exceptional user experiences.',
      resumeUrl: '#',
    });
    console.log('About section seeded.');

    // 4. Seed Skills
    const skills = [
      { name: 'React', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', level: 90 },
      { name: 'Next.js', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', level: 85 },
      { name: 'TypeScript', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', level: 80 },
      { name: 'Node.js', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', level: 85 },
      { name: 'MongoDB', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', level: 80 },
      { name: 'PostgreSQL', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', level: 70 },
      { name: 'Docker', category: 'others', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', level: 75 },
      { name: 'AWS', category: 'others', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', level: 65 },
    ];
    await Skill.insertMany(skills);
    console.log('Skills seeded.');

    // 5. Seed Experience
    const experiences = [
      {
        company: 'Tech Innovators Inc.',
        role: 'Senior Full Stack Developer',
        location: 'San Francisco, CA',
        startDate: 'Jan 2022',
        endDate: 'Present',
        description: 'Leading the development of a flagship SaaS product using Next.js and AWS. Improved application performance by 40% and mentored a team of 5 junior developers.',
        logo: '',
      },
      {
        company: 'Web Craft Solutions',
        role: 'Full Stack Developer',
        location: 'Austin, TX',
        startDate: 'Jun 2019',
        endDate: 'Dec 2021',
        description: 'Built various client projects ranging from E-commerce platforms to real-time dashboards using React, Node.js, and MongoDB.',
        logo: '',
      },
    ];
    await Experience.insertMany(experiences);
    console.log('Experience seeded.');

    // 6. Seed Education
    const education = [
      {
        school: 'State University',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startDate: '2015',
        endDate: '2019',
        description: 'Focused on software engineering, data structures, and algorithms. Graduated with honors.',
        logo: '',
      },
    ];
    await Education.insertMany(education);
    console.log('Education seeded.');

    // 7. Seed Projects
    const projects = [
      {
        title: 'ShopWave E-Commerce',
        slug: 'shopwave-ecommerce',
        description: 'A full-featured e-commerce platform with Stripe integration, user dashboard, and real-time inventory management.',
        thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&h=500&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&h=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&h=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556742102-deaf915556fc?q=80&w=800&h=500&auto=format&fit=crop'
        ],
        body: 'ShopWave is built to scale. It features a secure payment gateway using Stripe, a comprehensive admin dashboard for managing products and orders, and a responsive customer-facing storefront. The backend is powered by Node.js and MongoDB, ensuring fast data retrieval and reliability.',
        links: {
          github: 'https://github.com',
          live: 'https://example.com',
        },
        tags: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
        featured: true,
      },
      {
        title: 'TalkStream Chat',
        slug: 'talkstream-chat',
        description: 'A real-time messaging application featuring private chats, group channels, and media sharing capabilities.',
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&h=500&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&h=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=800&h=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?q=80&w=800&h=500&auto=format&fit=crop'
        ],
        body: 'TalkStream utilizes Socket.io for low-latency bidirectional communication. Users can create rooms, send images, and see typing indicators in real-time. Authentication is handled via JWT, and chat history is persisted in MongoDB.',
        links: {
          github: 'https://github.com',
          live: 'https://example.com',
        },
        tags: ['React', 'Socket.io', 'Node.js', 'Express'],
        featured: true,
      },
      {
        title: 'TaskFlow Manager',
        slug: 'taskflow-manager',
        description: 'A collaborative project management tool with drag-and-drop boards, deadline tracking, and team analytics.',
        thumbnail: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800&h=500&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800&h=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&h=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&h=500&auto=format&fit=crop'
        ],
        body: 'TaskFlow helps teams stay organized. It implements a Kanban-style board using React DnD. Features include subtasks, file attachments, and automated email notifications for approaching deadlines.',
        links: {
          github: 'https://github.com',
          live: 'https://example.com',
        },
        tags: ['React', 'Firebase', 'Redux', 'Material UI'],
        featured: true,
      },
      {
        title: 'CoinView Dashboard',
        slug: 'coinview-dashboard',
        description: 'A comprehensive cryptocurrency dashboard providing live price updates, historical charts, and market trend analysis.',
        thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800&h=500&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800&h=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1621504450168-38f647315648?q=80&w=800&h=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800&h=500&auto=format&fit=crop'
        ],
        body: 'CoinView integrates with the CoinGecko API to fetch real-time data. It uses Recharts for rendering interactive price charts and allows users to create a personalized watchlist of their favorite assets.',
        links: {
          github: 'https://github.com',
          live: 'https://example.com',
        },
        tags: ['Next.js', 'TypeScript', 'Recharts', 'API Integration'],
        featured: false,
      },
      {
        title: 'WanderLust Planner',
        slug: 'wanderlust-planner',
        description: 'An AI-powered travel itinerary planner that suggests destinations, hotels, and activities based on user preferences.',
        thumbnail: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&h=500&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&h=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&h=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&h=500&auto=format&fit=crop'
        ],
        body: 'WanderLust takes the stress out of travel planning. By leveraging OpenAI for recommendations and the Google Places API for location data, it generates detailed day-by-day itineraries.',
        links: {
          github: 'https://github.com',
          live: 'https://example.com',
        },
        tags: ['MERN Stack', 'OpenAI', 'Google Maps API'],
        featured: false,
      },
    ];
    await Project.insertMany(projects);
    console.log('Projects seeded.');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
    process.exit(0);
  }
};

seedDatabase();