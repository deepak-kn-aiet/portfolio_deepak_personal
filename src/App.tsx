import React, { useEffect, useState } from 'react';
import { cn } from './lib/utils';
import RealismButton from './components/ui/shiny-borders-button';
import { HoverButton } from './components/ui/hover-button';
import { MagneticButton } from './components/ui/magnetic-button';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  Download, 
  MapPin, 
  ChevronUp, 
  ExternalLink,
  Cpu,
  Monitor,
  Video,
  Users,
  Zap
} from 'lucide-react';

const TYPING_PHRASES = [
  'VTU 3rd Year | AI & ML',
  'Building AI Solutions',
  'Computer Vision & DL',
  'React • Python • YOLO',
];

const SKILLS = [
  { name: 'Python', icon: '🐍', level: 90 },
  { name: 'C', icon: '⚙️', level: 60 },
  { name: 'HTML', icon: '🌐', level: 70 },
  { name: 'CSS', icon: '🎨', level: 65 },
  { name: 'MongoDB', icon: '🍃', level: 80 },
  { name: 'TensorFlow', icon: '🧠', level: 78 },
  { name: 'YOLO', icon: '👁️', level: 76 },
  { name: 'NumPy', icon: '🔢', level: 85 },
  { name: 'Pandas', icon: '🐼', level: 84 },
  { name: 'Git', icon: '📦', level: 88 },
  { name: 'GitHub', icon: '🐙', level: 90 },
  { name: 'Ollama', icon: '🦙', level: 72 },
  { name: 'Hugging Face', icon: '🤗', level: 75 },
  { name: 'Google Antigravity', icon: '🚀', level: 100 },
];

function App() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAvatarFallback, setShowAvatarFallback] = useState(false);
  // Typing Animation
  useEffect(() => {
    if (!isLoaded) return;

    const currentPhrase = TYPING_PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    const handleTyping = () => {
      if (isDeleting) {
        setCharIndex(prev => prev - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setPhraseIndex(prev => (prev + 1) % TYPING_PHRASES.length);
        }
      } else {
        setCharIndex(prev => prev + 1);
        if (charIndex === currentPhrase.length) {
          timeout = setTimeout(() => setIsDeleting(true), 2200);
          return;
        }
      }

      const delay = isDeleting ? 40 : 80;
      timeout = setTimeout(handleTyping, delay);
    };

    timeout = setTimeout(handleTyping, isDeleting && charIndex === 0 ? 400 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, isLoaded]);

  // Page Load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll Listeners
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section
      const sections = ['hero', 'skills', 'projects', 'activities', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal Animation using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isLoaded]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={cn("min-h-screen", !isLoaded && "overflow-hidden")}>
        {/* Loading Screen */}
        <div className={cn("loader", isLoaded && "hidden")} aria-hidden="true">
          <div className="loader-inner">
            <div className="loader-ring"></div>
            <div className="loader-text">Initializing<span className="loader-dots"></span></div>
          </div>
        </div>

        <div className="gradient-bg" aria-hidden="true" style={{ zIndex: -2 }} />

        {/* Header */}
        <header className={cn("header", isScrolled && "scrolled")} id="header">
          <nav className="nav container" aria-label="Main navigation">
            <a href="#hero" className="nav-logo-avatar" aria-label="Home">
              <div className="logo-box">
                <img 
                  src="assets/profile.jpg" 
                  alt="Deepak K N" 
                  className={cn("logo-img", showAvatarFallback && "hidden")} 
                  onError={() => setShowAvatarFallback(true)}
                />
              </div>
            </a>

            <ul className={cn("nav-links")}>
              {['skills', 'projects', 'activities', 'contact'].map((item) => (
                <li key={item}>
                  <HoverButton 
                    className={cn(
                      "px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide",
                      activeSection === item ? "opacity-100 scale-110 shadow-glow" : "opacity-80 hover:opacity-100"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </HoverButton>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section id="hero" className="hero section">
            <div className="container hero-grid">
              <div className="hero-content">
                <p className={cn("hero-greeting reveal", isLoaded && "visible")}>Hello, I'm</p>
                <h1 className={cn("hero-name reveal", isLoaded && "visible")}>
                  <span className="gradient-text">Deepak K N</span>
                </h1>
                <p className={cn("hero-role reveal", isLoaded && "visible")}>
                  <span>{TYPING_PHRASES[phraseIndex].substring(0, charIndex)}</span>
                  <span className="typing-cursor" aria-hidden="true">|</span>
                </p>
                <p className={cn("hero-location reveal", isLoaded && "visible")}>
                  <MapPin className="icon-inline" />
                  Karnataka, India
                </p>
                <div className={cn("hero-cta reveal", isLoaded && "visible")}>
                  <RealismButton 
                    text="View Projects" 
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  />
                  <RealismButton 
                    text="Get In Touch" 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  />
                  <RealismButton 
                    text="Resume" 
                    onClick={() => window.open('/resume.html', '_blank')}
                  >
                    <Download className="h-4 w-4" />
                  </RealismButton>
                </div>
                <div className={cn("hero-social reveal", isLoaded && "visible")}>
                  <a href="https://github.com/deepak-kn-aiet" target="_blank" rel="noopener noreferrer" className="social-link">
                    <Github />
                  </a>
                  <a href="https://www.linkedin.com/in/deepak-kn-709a682a5?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className="social-link">
                    <Linkedin />
                  </a>
                  <a href="https://www.instagram.com/deepak.builds_?igsh=MWdvZmNienZtb21nbg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link">
                    <Instagram />
                  </a>
                </div>
              </div>

              <div className={cn("hero-visual reveal", isLoaded && "visible")}>
                <div className="hero-avatar-container">
                  <div className="hero-avatar-ring" aria-hidden="true"></div>
                  <div className="hero-avatar-inner">
                    <img
                      src="assets/profile.jpg"
                      alt="Deepak K N"
                      className={cn("hero-avatar-img", showAvatarFallback && "hidden")}
                      onError={() => setShowAvatarFallback(true)}
                    />
                    {showAvatarFallback && <span className="hero-avatar-fallback show">DK</span>}
                  </div>
                </div>
                <div className="hero-avatar-name">
                  <span className="gradient-text">DEEPAK K N</span>
                </div>
              </div>

              <a href="#about" className={cn("hero-scroll reveal", isLoaded && "visible")} aria-label="Scroll to about">
                <span>Scroll</span>
                <div className="scroll-indicator"></div>
              </a>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="section">
            <div className="container">
              <div className="section-header reveal">
                <span className="section-tag">01 — About</span>
                <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
                <div className="section-divider"></div>
              </div>
              <div className="about-grid">
                <div className="about-card glass reveal">
                  <div className="about-visual">
                    <div className="about-avatar">
                      <div className="avatar-ring" aria-hidden="true"></div>
                      <div className="avatar-inner">
                        <img
                          src="assets/profile.jpg"
                          alt="Deepak K N"
                          className={cn("avatar-img", showAvatarFallback && "hidden")}
                          width="140"
                          height="140"
                          onError={() => setShowAvatarFallback(true)}
                        />
                        {showAvatarFallback && <span className="avatar-fallback show" aria-hidden="true">DK</span>}
                      </div>
                    </div>
                    <div className="about-stats">
                      {[
                        { num: '5+', label: 'Hackathons' },
                        { num: '2', label: 'AI Projects' },
                        { num: '10+', label: 'Tech Skills' }
                      ].map((stat, i) => (
                        <div key={i} className="stat">
                          <span className="stat-num">{stat.num}</span>
                          <span className="stat-label">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="about-content reveal">
                  <h3>VTU 3rd Year | AI & ML</h3>
                  <p>
                    Passionate student with experience in AI-powered applications, computer vision,
                    full-stack development, and real-time systems. Interested in building impactful AI
                    solutions using React, Node.js, Python, YOLO, TensorFlow, and modern AI tools.
                  </p>
                  <p>
                    I combine machine learning expertise with full-stack engineering to ship products
                    that solve real-world problems — from smart traffic systems to agricultural AI platforms.
                  </p>
                  <div className="about-highlights">
                    {['Computer Vision', 'Full Stack', 'Real-time Systems'].map(tag => (
                      <span key={tag} className="highlight-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="section section-alt">
            <div className="container">
              <div className="section-header reveal">
                <span className="section-tag">02 — Skills</span>
                <h2 className="section-title">Technical <span className="gradient-text">Skills</span></h2>
                <div className="section-divider"></div>
              </div>
              <div className="skills-grid">
                {SKILLS.map((skill, i) => (
                  <div key={i} className="skill-card reveal" style={{ '--skill-level': `${skill.level}%` } as React.CSSProperties}>
                    <span className="skill-icon" aria-hidden="true">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar" aria-hidden="true">
                      <div className="skill-bar-fill"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="section">
            <div className="container">
              <div className="section-header reveal">
                <span className="section-tag">03 — Projects</span>
                <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
                <div className="section-divider"></div>
              </div>
              <div className="projects-grid">
                <article className="project-card glass reveal">
                  <div className="project-number">01</div>
                  <div className="project-icon">
                    <Monitor />
                  </div>
                  <h3>AI-Based Traffic Management System</h3>
                  <p className="project-desc">
                    Intelligent traffic control platform with real-time vehicle tracking, dynamic lane
                    allocation, and analytics dashboard for smarter urban mobility.
                  </p>
                  <ul className="project-features">
                    <li>Real-time vehicle tracking</li>
                    <li>Lane allocation system</li>
                    <li>Traffic analytics dashboard</li>
                  </ul>
                  <div className="project-tech">
                    {['React.js', 'Node.js', 'MongoDB', 'Python', 'YOLO'].map(tech => <span key={tech}>{tech}</span>)}
                  </div>
                  <div className="project-links">
                    <a href="#" className="project-link"><ExternalLink /></a>
                  </div>
                </article>

                <article className="project-card glass reveal">
                  <div className="project-number">02</div>
                  <div className="project-icon project-icon-green">
                    <Cpu />
                  </div>
                  <h3>AI Crop Disease Prediction Platform</h3>
                  <p className="project-desc">
                    Agricultural AI platform helping farmers detect crop diseases early with weather
                    insights and personalized farming recommendations.
                  </p>
                  <ul className="project-features">
                    <li>Crop disease prediction</li>
                    <li>Weather analysis</li>
                    <li>Farmer suggestions</li>
                  </ul>
                  <div className="project-tech">
                    {['React.js', 'Node.js', 'Gemini API', 'Weather API', 'Teachable Machine'].map(tech => <span key={tech}>{tech}</span>)}
                  </div>
                  <div className="project-links">
                    <a href="#" className="project-link"><ExternalLink /></a>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* Hackathons & Activities */}
          <section id="activities" className="section section-alt">
            <div className="container">
              <div className="section-header reveal">
                <span className="section-tag">04 — Activities</span>
                <h2 className="section-title">Hackathons & <span className="gradient-text">Activities</span></h2>
                <div className="section-divider"></div>
              </div>
              <div className="activities-grid">
                {[
                  { icon: <Zap />, title: '5+ Hackathons', desc: 'Participated in multiple hackathons building AI and full-stack solutions under tight deadlines.' },
                  { icon: <Users />, title: 'AIET Tech Club', desc: 'Active member collaborating on tech workshops, peer learning, and innovation projects.', class: 'activity-icon-purple' },
                  { icon: <Video />, title: 'Tech Content Creator', desc: 'Creating educational tech content to share AI/ML knowledge and inspire fellow developers.', class: 'activity-icon-pink' }
                ].map((act, i) => (
                  <div key={i} className="activity-card glass reveal">
                    <div className={cn("activity-icon", act.class)}>
                      {act.icon}
                    </div>
                    <h3>{act.title}</h3>
                    <p>{act.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="section">
            <div className="container">
              <div className="section-header reveal">
                <span className="section-tag">05 — Contact</span>
                <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
                <p className="section-subtitle">Open to internships, collaborations, and AI projects</p>
                <div className="section-divider"></div>
              </div>
              <div className="contact-wrapper reveal">
                <div className="contact-card glass">
                  <p className="contact-intro">
                    Have an opportunity or want to collaborate? I'd love to hear from you.
                    Drop a message — I typically respond within 24 hours.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-8">
                    <MagneticButton>
                      <RealismButton 
                        text="Email Me" 
                        onClick={() => window.location.href = 'mailto:kndeepak295@gmail.com'}
                      >
                        <Mail className="h-4 w-4" />
                      </RealismButton>
                    </MagneticButton>

                    <MagneticButton>
                      <RealismButton 
                        text="LinkedIn" 
                        onClick={() => window.open('https://www.linkedin.com/in/deepak-kn-709a682a5?utm_source=share_via&utm_content=profile&utm_medium=member_ios', '_blank')}
                      >
                        <Linkedin className="h-4 w-4" />
                      </RealismButton>
                    </MagneticButton>

                    <MagneticButton>
                      <RealismButton 
                        text="GitHub" 
                        onClick={() => window.open('https://github.com/deepak-kn-aiet', '_blank')}
                      >
                        <Github className="h-4 w-4" />
                      </RealismButton>
                    </MagneticButton>

                    <MagneticButton>
                      <RealismButton 
                        text="Instagram" 
                        onClick={() => window.open('https://www.instagram.com/deepak.builds_?igsh=MWdvZmNienZtb21nbg%3D%3D&utm_source=qr', '_blank')}
                      >
                        <Instagram className="h-4 w-4" />
                      </RealismButton>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="container footer-inner flex justify-center py-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text reveal visible">Thank You</h2>
          </div>
        </footer>

        {/* Scroll to top */}
        <button 
          id="scroll-top" 
          className={cn("scroll-top", isScrolled && "visible")} 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp />
        </button>
      </div>
  );
}

export default App;
