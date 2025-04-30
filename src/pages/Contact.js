import React from 'react';
import { FaLinkedin, FaGithub, FaFilePdf, FaEnvelope } from 'react-icons/fa';
import { MdWork, MdSchool, MdCode } from 'react-icons/md';
import './Contact.css';

const ContactUs = () => {
  const resumeData = {
    name: "Joseph Meghanath D",
    title: "Software Engineer & Data Enthusiast",
    experience: [
      {
        company: "Bicycle, Hyderabad",
        role: "Software Engineer II - Java Developer",
        duration: "May 2020 - Nov 2023",
        highlights: [
          "Developed anomaly detection services improving efficiency by 30%",
          "Implemented microservices and REST APIs in Java/Python",
          "Reduced customer waiting time by 95% via scheduling algorithms"
        ]
      },
      {
        company: "Agilitix.ai, Hyderabad",
        role: "Software Engineer (ML Algorithms)",
        duration: "May 2019 - May 2020",
        highlights: [
          "Deployed ML algorithms for time series anomaly detection",
          "Developed Python library for time series data storage",
          "Implemented autoencoders for log analysis"
        ]
      }
    ],
    education: [
      {
        institution: "University of Central Missouri",
        degree: "MSc Big Data Analytics",
        duration: "Jan 2024 - Present",
        gpa: "3.8 GPA"
      },
      {
        institution: "CMR College of Engineering",
        degree: "B-Tech Computer Science",
        duration: "Aug 2015 - May 2019",
        gpa: "3.5 GPA"
      }
    ],
    skills: [
      "Java", "Python", "C/C++", "React", 
      "TensorFlow", "AWS", "Docker", "Kubernetes",
      "Big Data Analytics", "Machine Learning",
      "Distributed Systems", "React", "Node.js"
    ],
    projects: [
      {
        name: "No-SQL Database in C",
        description: "Custom No-SQL DB with versioning and query language",
        link: "https://github.com/JoeHitHard/No-SQL-DB",
        tech: ["C", "File Systems", "Data Structures"]
      },
      {
        name: "Automated Pneumonia Detection",
        description: "X-ray analysis using TensorFlow & Django",
        link: "https://github.com/JoeHitHard/Automated-Pneumonia-Detection",
        tech: ["Python", "TensorFlow", "Medical Imaging"]
      },
      {
        name: "Ride Share Application",
        description: "Car pooling platform with React & Cassandra",
        link: "https://github.com/JoeHitHard/RideShareApplication",
        tech: ["React", "Java Spring", "NoSQL"]
      }
    ],
    contact: {
      phone: "+1 (913)-208-8818",
      email: "josephmeghanath@gmail.com",
      linkedin: "https://linkedin.com/in/joseph-meghanath",
      github: "https://github.com/JoeHitHard",
      resume: process.env.PUBLIC_URL + "/Joseph_Danthikolla.pdf"
    }
  };

  const ProjectCard = ({ project }) => (
    <div className="project-card">
      <div className="project-header">
        <h3>{project.name}</h3>
        <div className="tech-badges">
          {project.tech.map((tech, i) => (
            <span key={i} className="tech-badge">{tech}</span>
          ))}
        </div>
      </div>
      <p className="project-description">{project.description}</p>
      <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
        View on GitHub →
      </a>
    </div>
  );

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <div className="hero-content">
          <h1 className="main-heading-contact">{resumeData.name}</h1>
          <p className="sub-heading-contact">{resumeData.title}</p>
          
          <div className="social-links">
            <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="social-icon" />
            </a>
            <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" />
            </a>
            <a href={`mailto:${resumeData.contact.email}`}>
              <FaEnvelope className="social-icon" />
            </a>
            <a href={resumeData.contact.resume} download>
              <FaFilePdf className="social-icon" />
            </a>
          </div>
        </div>
      {/* Experience Section */}
      <section className="content-section">
        <h2 className="section-title">
          <MdWork className="section-icon" />
          Experience
        </h2>
        <div className="experience-grid">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="experience-card">
              <h3 className="company-name">{exp.company}</h3>
              <p className="role-duration">{exp.role} • {exp.duration}</p>
              <ul className="achievement-list">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="achievement-item">
                    <div className="bullet"></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Skills */}
      <section className="content-section">
        <div className="two-column-grid">
          <div className="education-card">
            <h2 className="section-title">
              <MdSchool className="section-icon" />
              Education
            </h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3 className="institution-name">{edu.institution}</h3>
                <p className="degree-info">{edu.degree}</p>
                <p className="duration-gpa">{edu.duration} • {edu.gpa}</p>
              </div>
            ))}
          </div>

          <div className="skills-card">
            <h2 className="section-title">
              <MdCode className="section-icon" />
              Skills
            </h2>
            <div className="skill-badges">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="content-section">
        <h2 className="section-title">
          <MdCode className="section-icon" />
          Featured Projects
        </h2>
        <div className="projects-grid">
          {resumeData.projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactUs;