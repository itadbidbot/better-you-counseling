import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Check, Phone, Mail, MapPin } from 'lucide-react';

const VALID_PAGES = ['home', 'services', 'about', 'group-sessions', 'books', 'pricing', 'contact'];

const pageFromPath = (pathname) => {
  const page = pathname.replace(/^\/|\/$/g, '');
  return VALID_PAGES.includes(page) ? page : 'home';
};

const pathFromPage = (page) => (page === 'home' ? '/' : `/${page}`);

export default function BetterYouApp() {
  const [currentPage, setCurrentPage] = useState(() => pageFromPath(window.location.pathname));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We\'ll be in touch shortly.');
    setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
    window.history.pushState({}, '', pathFromPage(page));
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(pageFromPath(window.location.pathname));
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation Component
  const Navigation = () => (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-3 text-center text-sm">
        <p>✨ New Resource Available: <span className="font-semibold">Break the Loop</span> <button onClick={() => handleNavClick('books')} className="underline hover:opacity-80">Buy Now</button></p>
      </div>

      {/* Nav Bar */}
      <nav className="bg-gradient-to-r from-stone-50 to-amber-50 border-b border-amber-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center cursor-pointer hover:opacity-80"
            >
              <img src="/logo.png" alt="Better You Counseling Services" className="h-14 w-auto" />
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => handleNavClick('services')} className="text-gray-600 hover:text-amber-700 transition font-medium">Services</button>
              <button onClick={() => handleNavClick('about')} className="text-gray-600 hover:text-amber-700 transition font-medium">About</button>
              <button onClick={() => handleNavClick('group-sessions')} className="text-gray-600 hover:text-amber-700 transition font-medium">Group Sessions</button>
              <button onClick={() => handleNavClick('books')} className="text-gray-600 hover:text-amber-700 transition font-medium">Books</button>
              <button onClick={() => handleNavClick('pricing')} className="text-gray-600 hover:text-amber-700 transition font-medium">Pricing</button>
              <button onClick={() => handleNavClick('contact')} className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-6 py-2.5 rounded-full font-medium transition shadow-md hover:shadow-lg">
                Free Consultation
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-amber-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-3 border-t border-amber-100">
              <button onClick={() => handleNavClick('services')} className="block w-full text-left text-gray-600 hover:text-amber-700 py-2 font-medium">Services</button>
              <button onClick={() => handleNavClick('about')} className="block w-full text-left text-gray-600 hover:text-amber-700 py-2 font-medium">About</button>
              <button onClick={() => handleNavClick('group-sessions')} className="block w-full text-left text-gray-600 hover:text-amber-700 py-2 font-medium">Group Sessions</button>
              <button onClick={() => handleNavClick('books')} className="block w-full text-left text-gray-600 hover:text-amber-700 py-2 font-medium">Books</button>
              <button onClick={() => handleNavClick('pricing')} className="block w-full text-left text-gray-600 hover:text-amber-700 py-2 font-medium">Pricing</button>
              <button onClick={() => handleNavClick('contact')} className="w-full bg-gradient-to-r from-amber-600 to-orange-500 text-white px-6 py-2.5 rounded-full font-medium transition">
                Free Consultation
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gradient-to-r from-amber-900 to-orange-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <h4 className="text-lg font-bold mb-4">BETTER YOU</h4>
            <p className="text-amber-100">Counseling & Coaching Services</p>
          </div>
          <div>
            <p className="text-amber-100">249 W. Shadburn Ave. | Buford, GA 30518</p>
            <p className="text-amber-100 mt-2">(678) 835-8616</p>
          </div>
          <div>
            <p className="text-amber-100">helena@betteryoucounseling.net</p>
            <p className="text-amber-100 mt-2">Monday - Friday, 9am - 4pm</p>
          </div>
        </div>
        <div className="border-t border-orange-800 pt-8">
          <p className="text-center text-amber-100 text-sm">
            © 2026 BETTER YOU Counseling & Coaching Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );

  // HOME PAGE
  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <section className="relative h-[560px] md:h-[680px] overflow-hidden bg-stone-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1580230315595-c91d1e06ceb5?w=1600&h=1000&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/85 md:via-stone-50/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Journey to a <span className="text-amber-700">Better You</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Personalized counseling and coaching to unlock your healing, transform relationships, and create a life filled with purpose and peace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => handleNavClick('contact')} className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                Start Your Free Consultation
                <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </button>
              <button onClick={() => handleNavClick('services')} className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-full font-semibold transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white py-12 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Specializations', value: '10+' },
              { label: 'Years of Experience', value: '20+' },
              { label: 'Insurance Accepted', value: '4' },
              { label: 'Session Format', value: 'Flexible' }
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-3xl md:text-4xl font-bold text-amber-700 mb-1">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to Services */}
      <section className="py-16 bg-gradient-to-r from-orange-100 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h3>
          <button onClick={() => handleNavClick('services')} className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-8 py-3 rounded-full font-semibold transition inline-flex items-center gap-2 group">
            Explore Our Services
            <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>
    </div>
  );

  // SERVICES PAGE
  const ServicesPage = () => (
    <div>
      {/* Hero */}
      <section className="relative h-[420px] md:h-[560px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1573495804664-b1c0849525af?w=1600&h=1200&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">My Services</h1>
          <p className="text-xl text-white/90 max-w-2xl">Comprehensive counseling and coaching services designed to help you navigate life's challenges and unlock your potential.</p>
        </div>
      </section>

      {/* Three-Step Approach */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">My Approach</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">A three-step journey toward meaningful transformation and personal growth</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Self-Awareness',
                icon: '✨',
                description: 'Self-awareness is key in creating positive change. Through insight and intentional mindfulness, you\'ll identify thoughts and behaviors that no longer serve you.'
              },
              {
                title: 'Exploration',
                icon: '🔍',
                description: 'As you work to increase self-awareness, you will become more effective in exploring and identifying personal values and strengths, and consequently, become better equipped.'
              },
              {
                title: 'Growth',
                icon: '🌱',
                description: 'With increased insight and understanding of self, you will gain greater clarity in defining key goals towards personal betterment and positive change.'
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-12 border border-orange-200">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">Specialized Counseling Services</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Working with a variety of issues in the counseling setting, I have developed a customized and compassionate approach that will provide you with deeper understanding and practical strategies for personal growth.
                </p>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Whether personal, relational, familial, or spiritual, I would love to walk alongside you on your journey towards healing and growth.
                </p>
                <button onClick={() => handleNavClick('contact')} className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-8 py-3 rounded-full font-semibold transition inline-flex items-center gap-2 group">
                  Make an Appointment
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  'Anxiety and Stress Management',
                  'Depression and Mood Disorders',
                  'Self-esteem and Self-Confidence',
                  'Relationship and Communication Issues',
                  'Life Transitions and Adjustments',
                  'Trauma and Attachment',
                  'Infidelity and Betrayals',
                  'Grief and Loss',
                  'Christian-Based Counseling',
                  'EMDR (Eye Movement Desensitization and Reprocessing)'
                ].map((topic, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check size={20} className="text-amber-700 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Note */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 border border-orange-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold">Important Note:</span> Coaching does NOT diagnose, treat, or cure mental health disorders. Coaching is a self-pay service. This service is not covered by insurance. If you have concerns about mental health, please consult with a mental health professional.
            </p>
          </div>
        </div>
      </section>
    </div>
  );

  // ABOUT PAGE
  const AboutPage = () => (
    <div>
      {/* Hero */}
      <section className="relative h-[420px] md:h-[520px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1560204717-850e441065fd?w=1600&h=1200&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About Helena</h1>
          <p className="text-xl text-white/90 max-w-2xl">Learn more about my background, experience, and approach to therapy</p>
        </div>
      </section>

      {/* Main Bio */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Hi, I'm Helena</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  I'm a mother of two grown daughters and have been married for over 20 years in a blended family. Like many of my clients, I've navigated seasons of change, growth, hurt, repair, redefining love, and learning how to choose compassion over perfection.
                </p>
                <p>
                  I understand firsthand how family dynamics, generational patterns, and long-term relationships evolve and how powerful it is when we stop repeating cycles and start rewriting them.
                </p>
                <p>
                  I'm a therapist who believes that healing doesn't happen because we're "fixed," but because we finally understand ourselves with compassion and clarity. When we become aware of our patterns, cycles, and reactions, we can then work to form new responses and habits—built on real-life skills.
                </p>
                <p>
                  I specialize in helping high-functioning adults break out of emotional, mental, and relational loops: anxiety, self-doubt, rumination, people-pleasing, betrayal, trauma, rigid thinking, and patterns that feel familiar but no longer serve you. My approach is eclectic, practical, and deeply human.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-80 h-96 rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="/helena.webp"
                  alt="Helena Manssuer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Credentials & Training</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Education</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="font-semibold">Master of Science in Clinical Counseling Psychology</p>
                  <p className="text-sm text-gray-600">Specialized training in evidence-based therapeutic approaches</p>
                </div>
                <div>
                  <p className="font-semibold">Licensed Professional Counselor (LPC)</p>
                  <p className="text-sm text-gray-600">State licensed and credentialed mental health professional</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Specializations</h3>
              <div className="space-y-3">
                {[
                  'CBT/REBT - Cognitive Behavioral Therapy',
                  'Strengths-Based & Solution-Focused Therapy',
                  'ACT - Acceptance and Commitment Therapy',
                  'Narrative Work & Childhood Processing',
                  'EMDR - Eye Movement Desensitization'
                ].map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 bg-gradient-to-r from-orange-100 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">My Philosophy</h2>
          <div className="bg-white rounded-2xl p-12 border border-orange-200">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Everything I do is tailored to you—never one-size-fits-all model. Clients often tell me they feel both challenged and deeply understood in our work together. I'm practical and compassionate. I look at your beliefs, your nervous system, your history, and your current relationships, and then we build tools that actually work in real life.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Therapy with me isn't about endlessly rehashing the past; it's about understanding it and recoding it so it stops running the show. We can create a better future.
            </p>
          </div>
        </div>
      </section>
    </div>
  );

  // GROUP SESSIONS PAGE
  const GroupSessionsPage = () => (
    <div>
      {/* Hero */}
      <section className="relative h-[420px] md:h-[560px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1590650046871-92c887180603?w=1600&h=1200&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Group Sessions</h1>
          <p className="text-xl text-white/90 max-w-2xl">Contact us for more information</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6 text-gray-700 leading-relaxed mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Feeling stuck in stress, overthinking, or relationship patterns?
            </h2>
            <p className="text-lg">
              Group counseling offers a supportive space to learn practical skills, gain new insight, and connect with others who understand.
            </p>
            <p className="text-lg">
              Together, we focus on real strategies that help you move forward with clarity and confidence.
            </p>
            <p className="text-lg font-semibold text-gray-900">Below are the available groups:</p>
          </div>

          {/* Group Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Stop Overthinking and Rumination',
                description: 'Break free from the exhausting cycle of overthinking and mental replay. In this skills-based group, you will learn practical strategies to calm your mind, challenge unhelpful thought patterns, and regain clarity and confidence in your decisions.'
              },
              {
                title: 'Boundaries and Relationships',
                description: 'Learn how to protect your peace while building stronger, healthier connections. This group teaches clear, practical tools for setting boundaries, communicating your needs, and creating relationships that feel respectful, balanced, and fulfilling.'
              },
              {
                title: 'Rediscovering Yourself After Divorce',
                description: 'Divorce can be painful, but it can also be the beginning of a powerful new chapter. This supportive group helps you process the past, rebuild confidence, and reconnect with the person you are becoming.'
              },
              {
                title: 'Rewriting Your Inner Dialogue (Self-Esteem Group)',
                description: 'Your inner voice shapes how you see yourself and your life. In this empowering group, you will learn how to challenge negative self-talk, build genuine self-worth, and develop a kinder, more confident relationship with yourself.'
              }
            ].map((group, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-orange-200">
                <h3 className="text-2xl font-bold text-amber-700 mb-4">{group.title}</h3>
                <p className="text-gray-600 leading-relaxed">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Join a Group?</h2>
          <button onClick={() => handleNavClick('contact')} className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold transition inline-flex items-center gap-2 group">
            Contact Us for More Information
            <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>
    </div>
  );

  // BOOKS PAGE
  const BooksPage = () => (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-100 to-amber-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Books & Resources</h1>
          <p className="text-xl text-gray-700 max-w-2xl">Practical guides to help you break free from patterns that keep you stuck</p>
        </div>
      </section>

      {/* Book Feature */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="/book-cover.jpg"
                alt="Break the Loop by Helena Manssuer, M.S., LPC"
                className="w-full max-w-sm rounded-2xl shadow-lg"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Break the Loop</h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Break Free from Self-Sabotage, Fear, and the Stories That Keep You Stuck
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                A soulful, practical guide to help you heal emotional patterns that keep you stuck, choose freedom over fear, and forgive, accept, and move forward with strength. Each chapter offers gentle reflections, practical tools, and "Soul Notes" to guide you deeper into healing.
              </p>
              <p className="text-4xl font-bold text-amber-700 mb-8">$6.99</p>
              <a
                href="https://payhip.com/b/RGwXh"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold transition shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
              >
                Buy Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // PRICING PAGE
  const PricingPage = () => (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-100 to-amber-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Pricing & Insurance</h1>
          <p className="text-xl text-gray-700 max-w-2xl">Transparent pricing and information about insurance coverage</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Counseling */}
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-orange-200">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Counseling</h3>
              <p className="text-gray-600 mb-8">Mental health treatment & therapy</p>
              
              <div className="mb-8">
                <p className="text-5xl font-bold text-amber-700">$150</p>
                <p className="text-gray-600 mt-2">per 50-minute session</p>
              </div>

              <div className="border-t border-orange-200 pt-8">
                <p className="font-semibold text-gray-900 mb-4">Session Options:</p>
                <div className="space-y-2 text-gray-700 mb-8">
                  <p>✓ In-Office Sessions</p>
                  <p>✓ Telehealth Sessions</p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <p className="text-sm text-gray-700 mb-3"><span className="font-semibold">Insurance Coverage:</span></p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>✓ Aetna</p>
                  <p>✓ United Healthcare</p>
                  <p>✓ BCBS</p>
                  <p>✓ Anthem</p>
                </div>
              </div>
            </div>

            {/* Coaching */}
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-orange-200">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Coaching</h3>
              <p className="text-gray-600 mb-8">Personal & professional development</p>
              
              <div className="mb-8">
                <p className="text-5xl font-bold text-amber-700">$150</p>
                <p className="text-gray-600 mt-2">per 50-minute session</p>
              </div>

              <div className="border-t border-orange-200 pt-8">
                <p className="font-semibold text-gray-900 mb-4">Session Options:</p>
                <div className="space-y-2 text-gray-700 mb-8">
                  <p>✓ In-Office Sessions</p>
                  <p>✓ Telehealth Sessions</p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <p className="text-sm text-gray-700"><span className="font-semibold">Payment:</span></p>
                <p className="text-sm text-gray-600 mt-2">Self-pay only (Not insurance billable)</p>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-orange-200">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold">Counseling Services:</span> May be covered by insurance. Please verify your coverage with your insurance provider. I accept the insurance plans listed above.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-orange-200">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold">Coaching Services:</span> Coaching does not diagnose, treat, or cure mental health disorders. Coaching is self-pay only and is not covered by insurance.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-8 border border-orange-200">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold">First Consultation:</span> FREE 15-minute consultation to discuss your needs and determine if we're a good fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <button onClick={() => handleNavClick('contact')} className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold transition inline-flex items-center gap-2 group">
            Schedule Your Free Consultation
            <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>
    </div>
  );

  // CONTACT PAGE
  const ContactPage = () => (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-100 to-amber-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Let's Connect</h1>
          <p className="text-xl text-gray-700 max-w-2xl">Ready to start your journey? Reach out today for your free consultation.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Phone className="text-amber-700 flex-shrink-0 mt-1" size={28} />
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">Phone</p>
                      <a href="tel:6788358616" className="text-amber-700 hover:text-orange-600 text-lg">
                        (678) 835-8616
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail className="text-amber-700 flex-shrink-0 mt-1" size={28} />
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">Email</p>
                      <a href="mailto:helena@betteryoucounseling.net" className="text-amber-700 hover:text-orange-600">
                        helena@betteryoucounseling.net
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="text-amber-700 flex-shrink-0 mt-1" size={28} />
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">Location</p>
                      <p className="text-gray-600">249 W. Shadburn Ave.</p>
                      <p className="text-gray-600">Buford, GA 30518</p>
                      <p className="text-gray-600 mt-3 text-sm">In-office or Telehealth Available</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-orange-100 rounded-lg border border-orange-300">
                  <p className="text-sm text-gray-700 mb-2"><span className="font-semibold">Hours:</span></p>
                  <p className="text-gray-700">Monday - Friday, 9am - 4pm</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Send a Message</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    className="px-4 py-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    className="px-4 py-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
                  required
                />

                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  value={formData.message}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white resize-none"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: "How long are sessions?",
                a: "Sessions are 50 minutes long, allowing adequate time for meaningful work while maintaining professional boundaries."
              },
              {
                q: "Do you accept insurance?",
                a: "Yes, for counseling services I accept Aetna, United Healthcare, BCBS, and Anthem. Coaching services are self-pay only."
              },
              {
                q: "Can I do telehealth?",
                a: "Absolutely! Both counseling and coaching services are available via secure telehealth. Sessions work just as effectively online as in-person."
              },
              {
                q: "How do I schedule my free consultation?",
                a: "You can call (678) 835-8616, email helena@betteryoucounseling.net, or fill out the form above. I'll get back to you within 24 business hours."
              },
              {
                q: "What if I'm unsure if therapy is right for me?",
                a: "That's completely normal! The free 15-minute consultation is designed exactly for this—to discuss your concerns and determine if we're a good fit."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6 border border-orange-200">
                <p className="font-semibold text-gray-900 mb-2">{faq.q}</p>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // Render current page
  let pageContent;
  switch(currentPage) {
    case 'services':
      pageContent = <ServicesPage />;
      break;
    case 'about':
      pageContent = <AboutPage />;
      break;
    case 'group-sessions':
      pageContent = <GroupSessionsPage />;
      break;
    case 'books':
      pageContent = <BooksPage />;
      break;
    case 'pricing':
      pageContent = <PricingPage />;
      break;
    case 'contact':
      pageContent = <ContactPage />;
      break;
    default:
      pageContent = <HomePage />;
  }

  return (
    <div className="w-full bg-white">
      <Navigation />
      {pageContent}
      <Footer />
    </div>
  );
}
