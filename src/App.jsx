import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./App.css";
import { FaReact, FaNodeJs, FaLinkedin, FaInstagram, FaTwitter, FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaGithub, FaFigma } from "react-icons/fa";
import { SiExpress, SiPostman } from "react-icons/si";
import emailjs from "emailjs-com";
import codeimg from "./assets/codechisel.png"
import unsplash from "./assets/unsplash.png"

const skills = [
  { icon: <FaReact className="skill-icon" />, name: "React.js" },
  { icon: <FaJs className="skill-icon" />, name: "JavaScript" },
  { icon: <FaHtml5 className="skill-icon" />, name: "HTML" },
  { icon: <FaCss3Alt className="skill-icon" />, name: "CSS" },
  { icon: <FaNodeJs className="skill-icon" />, name: "Node.js" },
  { icon: <SiExpress className="skill-icon" />, name: "Express.js" },
  { icon: <FaDatabase className="skill-icon" />, name: "MongoDB" },
  { icon: <FaGithub className="skill-icon" />, name: "Git & GitHub" },
  { icon: <SiPostman className="skill-icon" />, name: "Postman" },
  { icon: <FaFigma className="skill-icon" />, name: "Figma" },
];

const SkillCard = ({ skill, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return (
    <motion.div
      ref={ref}
      className={`skill-card ${isInView ? 'in-view' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5,
          delay: index * 0.1 // Stagger effect
        }
      } : {}}
    >
      {skill.icon}
      <span className="skill-name">{skill.name}</span>
    </motion.div>
  );
};


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};



const education = [
  {
    degree: "Secondary Education",
    institution: "Maheshwari Public School",
    duration: "2020-2022",
    details: " passed with 88% ",
  },
  {
  degree: "B.Tech in Computer Science",
  institution: "Rai University",
  duration: "2024 - 2028",
  details: "Currently in 2nd Semester | CGPA: 9.29",
},
  {
  degree: "Higher Secondary Education",
  institution: "LP Savani International School",
  duration: "2022 - 2024",
  details: "cleared JEE With 88%(percentile)",
},
];

const EducationCard = ({ edu, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="education-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <h3>{edu.degree}</h3>
      <h4>{edu.institution}</h4>
      <p>{edu.duration}</p>
      <p>{edu.details}</p>
    </motion.div>
  );
};


const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state
    setStatus("Sending...");

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message
    };

    emailjs.send(
      "service_7ecvlxg",
      "template_u7ttqb8",
      templateParams,
      "Xi9hF2ufaPNky0Pyf"
    )
    .then((response) => {
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    })
    .catch((error) => {
      setStatus("❌ Failed to send message. Try again.");
      console.error(error);
    })
    .finally(() => {
      setIsLoading(false); // Reset loading state after response
    });
  };

  return (
    <motion.div 
      className="contact-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title">📞 Contact Me</h2>
      <p className="contact-text">Feel free to reach out for collaboration or any queries.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading} // Disable inputs when loading
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="4"
          required
          value={formData.message}
          onChange={handleChange}
          disabled={isLoading}
        ></textarea>

        <motion.button
          type="submit"
          className={`contact-btn ${isLoading ? "loading" : ""}`} // Apply loading class
          whileHover={isLoading ? {} : { scale: 1.1, boxShadow: "0px 0px 10px #4a90e2" }}
          whileTap={isLoading ? {} : { scale: 0.9 }}
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? (
            <>
              <span className="spinner"></span> Sending...
            </>
          ) : (
            "Send Message"
          )}
        </motion.button>
      </form>

      <p className="status-message">{status}</p>

      <div className="contact-links">
        <a href="mailto:vanshika.jangamcg@gmail.com">📧 Email</a>
        <a href="https://www.linkedin.com/in/vanshika-jangam-0a232332a/">💼 LinkedIn</a>
        <a href="https://github.com/vanshika-CG">🐙 GitHub</a>
      </div>
    </motion.div>
  );
};



const App = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger animation only once

  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Software Engineer CV in Red Black Simple Style (3).pdf";
    link.download = "Vanshika_Jangam_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <motion.div 
          className="logo" 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          VJ
        </motion.div>

        <div className="social-links">
          <a href="https://www.linkedin.com/in/vanshika-jangam-0a232332a/" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://x.com/vanshikajangam" aria-label="Twitter"><FaTwitter /></a>
          <a href="https://github.com/vanshika-CG" aria-label="GitHub"><FaGithub /></a>
        </div>
      </nav>

      <main className="main-content">
        
        <motion.div 
          className="text-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="name">Vanshika Jangam</h1>
          <h2>Full Stack Developer</h2>
          
          <motion.div 
  className="bio-card"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <p className="bio">
    Hi, I’m Vanshika Jangam, a passionate full-stack developer in the making with expertise in React, MongoDB, Express, JavaScript, HTML, and CSS. I have experience in building APIs and UI/UX design using Figma. Currently pursuing a B.Tech in Computer Science, I am eager to learn and grow in web development.
  </p>
</motion.div>

{/* Button to Show Preview */}
<motion.button 
            className="preview-btn"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px #fff" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPreview(true)}
          >
            Preview Resume
          </motion.button>
        </motion.div>

        {/* Resume Preview Modal */}
        {showPreview && (
          <div className="resume-modal">
            <div className="modal-content">
              <button className="close-btn" onClick={() => setShowPreview(false)}>✖</button>
              <iframe src="/Software Engineer CV in Red Black Simple Style (3).pdf" title="Resume Preview"></iframe>
              <motion.button 
                className="download-btn"
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px #fff" }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDownload}
              >
                Download Resume
              </motion.button>
            </div>
          </div>
        )}


        <motion.div 
          className="image-section"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="profile-image-container">

            <motion.img 
              src="https://pics.craiyon.com/2023-06-12/7f7c01b112124310810dfbe0406e0552.webp" 
              alt="Professional headshot" 
              className="profile-image"
              whileHover={{ scale: 1.1, rotate: 5 }}/>
            

          </div>
        </motion.div>


        <div className="particles">
  {[...Array(11)].map((_, i) => (
    <div 
      key={i} 
      className="particle"
      style={{
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        animationDelay: `${Math.random() * 3}s`
      }}
    />
  ))}
</div>

{/* Glowing Ring Effect */}
<div className="glowing-rings"></div>

{/* Floating Shapes for Depth */}
<div className="parallax-shape" style={{ top: "10%", left: "15%" }}></div>
<div className="parallax-shape" style={{ top: "30%", right: "10%" }}></div>
<div className="parallax-shape" style={{ bottom: "20%", left: "5%" }}></div>

      </main>
      <motion.div 
        className="skills-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="section-title">🚀 My Skills</h2>
        <div className="skills-grid">
  {skills.map((skill, index) => (
    <SkillCard 
      key={skill.name} 
      skill={skill} 
      index={index}
    />
  ))}
</div>
      </motion.div>

<motion.div 
  className="projects-section"
  initial={{ opacity: 0, y: 50 }} // Start hidden and slightly below
  animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
  transition={{ duration: 1, delay: 1 }} // Slow animation with a longer delay
>
  <h2 className="section-title">🛠 My Projects</h2>
  <div className="projects-grid">
    
    {/* Project 1 - CodeChisel */}
    <div className="project-card">
      <h3>CodeChisel</h3>
      <img src={codeimg} alt="codelearning" className="code"/>
      <p>A coding education platform with interactive quizzes and an integrated code editor.</p>
      <div className="project-links">
        <a href="https://github.com/vanshika-CG/codechisel" target="_blank" rel="noopener noreferrer">
          <FaGithub className="project-icon" /> GitHub
        </a>
        <a href="https://codechisel.onrender.com" target="_blank" rel="noopener noreferrer">
          🌐 Live Demo
        </a>
      </div>
    </div>

    {/* Project 2 - Image Explorer */}
    <div className="project-card">
      <h3>Image Explorer</h3>
      <img src={unsplash} alt="unsplash" className="code"/>
      <p>An interactive image search app using the Unsplash API.</p>
      <div className="project-links">
        <a href="https://github.com/vanshika-CG/unsplash_api" target="_blank" rel="noopener noreferrer">
          <FaGithub className="project-icon" /> GitHub
        </a>
        <a href="https://your-live-demo-link.com" target="_blank" rel="noopener noreferrer">
          🌐 Live Demo
        </a>
      </div>
    </div>

    {/* Add More Projects Here */}
    
  </div>
</motion.div>


 {/* 🎓 Education Section */}
 <motion.div className="education-section">
        <h2 className="section-title">🎓 Education</h2>
        <div className="education-grid">
          {education.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        
         
        </div>

      </motion.div>

      <Contact />
    </div>
  );
};

export default App;
