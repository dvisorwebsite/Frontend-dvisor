"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios";

export default function Home() {
  const [advisor, setAdvisor] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1565374392032-8007fb37c26e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  useEffect(() => {
    const getAdvisor = async () => {
      try {
        localStorage.removeItem('investmentCriteria');
        localStorage.removeItem('selectedAdvisorId');
        const response = await axios.get('https://dvsorwebsite.azurewebsites.net/api/AdvisorInfofive', {
          headers: {
            "Content-Type": "application/json",
          }
        });
        setAdvisor(response.data.advisors);
        console.log(response);
      }
      catch (error) {
        console.log(error)
      }
    }
    getAdvisor();
  }, []);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        {/* Background Image */}
        <Image
          src="/rupixen.jpg"
          alt="Full Background"
          width={1920}
          height={1080}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2,
            filter: 'brightness(0.7) blur(5px)', // Added blur directly here too
            transition: 'transform 1.5s ease-in-out',
          }}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
            zIndex: -1,
            backdropFilter: 'blur(2px)',
          }}
        />

        {/* Tagline Content (centered using absolute + transform) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            zIndex: 1,
            textAlign: 'center',
            maxWidth: '90%',
            padding: '1rem',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              margin: 0,
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              lineHeight: 1.2,
            }}
          >
            ABSE REFERENCE NAHI SIRF PREFERENCE
          </h1>
        </div>

        {/* Animation Keyframes */}
        <style jsx global>{`
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `}</style>
      </section>

      {/* Featured Advisors */}
      <section
  style={{
    padding: '64px 0',
    backgroundColor: '#ffffff',
    flex: '1',
  }}
>
  <div style={{ marginTop: '40px', textAlign: 'center' }}>
    <Link
      href="/investor/criteria-form"
      style={{
        display: 'inline-block',
        padding: '14px 32px',
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        fontWeight: '600',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '16px',
        transition: 'all 0.3s ease',
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = '#2563eb';
        e.target.style.transform = 'scale(1.05)';
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = '#3b82f6';
        e.target.style.transform = 'scale(1)';
      }}
    >
      Find Your Advisor
    </Link>
  </div>

  <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
    <h2
      style={{
        fontSize: '28px',
        fontWeight: '800',
        marginBottom: '40px',
        textAlign: 'center',
        color: '#0f172a',
        letterSpacing: '-0.5px',
      }}
    >
      Our Financial Advisors
    </h2>

    <div
      style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollBehavior: 'smooth',
        padding: '15px',
        boxSizing: 'border-box',
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE/Edge
      }}
      className="card-container"
    >
      {advisor.length > 0 ? (
        advisor.slice(0, 5).map((adv, index) => (
          <Link href="/investor/criteria-form" key={index} style={{ textDecoration: 'none', width: '100%' }}>
            <div
              style={{
                width: '300px',
                height: '360px',
                minWidth: '280px',
                border: '1px solid #ccc',
                borderRadius: '20px',
                boxSizing: 'border-box',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexShrink: 0,
                backgroundColor: '#fff',
              }}
            >
              <div style={{ width: '100%', height: '70%' }}>
                <Image
                  src={adv.profilePicture}
                  alt={adv.name}
                  width={280}
                  height={224}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
              </div>
              <div style={{ padding: '5px 0', textAlign: 'center' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{adv.name}</p>
                <p style={{ fontSize: '16px', margin: '0' }}>Experience: {adv.experienceYears} Years</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        Array.from({ length: 4 }, (_, index) => (
          <Link href="/investor/criteria-form" key={index} style={{ textDecoration: 'none', width: '100%' }}>
            <div
              style={{
                width: '300px',
                height: '360px',
                minWidth: '280px',
                border: '1px solid #ccc',
                borderRadius: '20px',
                boxSizing: 'border-box',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexShrink: 0,
                backgroundColor: '#fff',
              }}
            >
              <div style={{ width: '100%', height: '70%' }}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#ccc',
                    borderRadius: '10px',
                  }}
                ></div>
              </div>
              <div style={{ padding: '5px 0', textAlign: 'center' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0' }}>Advisor Name</p>
                <p style={{ fontSize: '16px', margin: '0' }}>Experience: 0 Years</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  </div>

  {/* Styles for responsiveness */}
  <style jsx>{`
    .card-container::-webkit-scrollbar {
      display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
    }

    @media (max-width: 768px) {
      .card-container {
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: auto;
        height: auto;
      }

      .card-container a {
        width: 100%;
      }

      .card-container div {
        width: 100% !important;
        max-width: 100% !important;
      }
    }
  `}</style>
</section>

<section
  className="face-to-face-section"
  style={{
    padding: '80px 20px',
    background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: '"Poppins", sans-serif',
  }}
>
  <div
    style={{
      width: '100%',
      maxWidth: '1200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    {/* Heading */}
    <h2
      style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: '48px',
        textAlign: 'center',
        letterSpacing: '-0.5px',
        animation: 'fadeInText 1s ease-in-out forwards',
      }}
    >
      Meet Your Advisor, Face-to-Face
    </h2>

    {/* Content */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '40px',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Investor */}
      <div
        className="investor"
        style={{
          textAlign: 'center',
          position: 'relative',
          transition: 'all 1s ease-in-out',
        }}
      >
        <Image
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Investor"
          width={140}
          height={140}
          style={{
            width: '140px',
            animation: 'float 2.5s ease-in-out infinite',
            filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.1))',
          }}
        />
        <p
          style={{
            marginTop: '15px',
            fontWeight: '600',
            fontSize: '1.2rem',
            color: '#0f172a',
            animation: 'fadeInText 1s ease-in-out forwards',
          }}
        >
          Investor
        </p>
        <div
          className="request"
          style={{
            marginTop: '20px',
            background: '#10b981',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '20px',
            fontWeight: '500',
            animation: 'sendRequest 2s ease-in-out forwards',
            animationDelay: '1s',
          }}
        >
          📤 Sending Request
        </div>
      </div>

      {/* Connector with Video Call */}
      <div
        className="connector"
        style={{
          position: 'relative',
          textAlign: 'center',
          flex: 1,
        }}
      >
        <div
          className="video-call"
          style={{
            width: '240px',
            height: '160px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #1e293b, #334155)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            fontWeight: '500',
            fontSize: '1.2rem',
            margin: '0 auto',
            opacity: 0,
            animation: 'fadeInPop 1s ease-in-out forwards',
            animationDelay: '5s',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            position: 'relative',
          }}
        >
          <span id="video-text">📹 Video Chatting</span>
          <span
            style={{
              fontSize: '0.9rem',
              marginTop: '8px',
              animation: 'pulse 1.5s infinite',
            }}
          >
            Connected
          </span>
          <Image
            className="investor-in-video"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Investor"
            width={50}
            height={50}
            style={{
              width: '50px',
              position: 'absolute',
              top: '10px',
              left: '10px',
              opacity: 0,
              animation: 'appearInVideo 1s ease-in-out forwards',
              animationDelay: '6s',
            }}
          />
          <Image
            className="advisor-in-video"
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="Advisor"
            width={50}
            height={50}
            style={{
              width: '50px',
              position: 'absolute',
              top: '10px',
              right: '10px',
              opacity: 0,
              animation: 'appearInVideo 1s ease-in-out forwards',
              animationDelay: '6s',
            }}
          />
        </div>
      </div>

      {/* Advisor */}
      <div
        className="advisor"
        style={{
          textAlign: 'center',
          position: 'relative',
          transition: 'all 1s ease-in-out',
        }}
      >
        <Image
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          alt="Advisor"
          width={140}
          height={140}
          style={{
            width: '140px',
            animation: 'float 2.5s ease-in-out infinite',
            filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.1))',
          }}
        />
        <p
          style={{
            marginTop: '15px',
            fontWeight: '600',
            fontSize: '1.2rem',
            color: '#0f172a',
            animation: 'fadeInText 1s ease-in-out forwards',
          }}
        >
          Advisor
        </p>
        <div
          className="response"
          style={{
            marginTop: '20px',
            background: '#3b82f6',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '20px',
            fontWeight: '500',
            opacity: 0,
            animation: 'fadeInPop 1s ease-in-out forwards',
            animationDelay: '3s',
          }}
        >
          ✅ Okay, let&apos;s connect
        </div>
      </div>
    </div>
  </div>

  {/* Keyframe + Responsive Media */}
  <style jsx global>{`
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
      100% { transform: translateY(0px); }
    }

    @keyframes sendRequest {
      0% { opacity: 0; transform: translateX(0) scale(0.8); }
      50% { opacity: 1; transform: translateX(200px) scale(1); }
      100% { opacity: 0; transform: translateX(400px) scale(0.8); }
    }

    @keyframes fadeInPop {
      0% { opacity: 0; transform: scale(0.9); }
      80% { opacity: 1; transform: scale(1.05); }
      100% { opacity: 1; transform: scale(1); }
    }

    @keyframes fadeInText {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }

    @keyframes appearInVideo {
      0% { opacity: 0; transform: scale(0.5); }
      100% { opacity: 1; transform: scale(1); }
    }

    .investor img, .advisor img {
      animation: float 2.5s ease-in-out infinite;
    }

    .investor p, .advisor p {
      animation: fadeInText 1s ease-in-out forwards;
    }

    @media (max-width: 768px) {
      .face-to-face-section {
        display: none !important;
      }
    }
  `}</style>
</section>


      {/* Testimonials Section */}
      <section
        style={{
          padding: '80px 20px',
          backgroundColor: '#ffffff',
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '48px',
              letterSpacing: '-0.5px',
              animation: 'fadeInText 1s ease-in-out forwards',
            }}
          >
            What Our Clients Say
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}
          >
            {/* Testimonial 1 */}
            <div
              style={{
                background: '#f8fafc',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-8px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <p
                style={{
                  fontSize: '16px',
                  color: '#475569',
                  marginBottom: '16px',
                  lineHeight: '1.6',
                }}
              >
                Working with my advisor was a game-changer! They tailored a plan that perfectly fit my goals.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Client"
                  width={48} // Added width
                  height={48} // Added height
                  style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: '600', fontSize: '16px', color: '#0f172a' }}>
                    Priya Sharma
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>Investor</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div
              style={{
                background: '#f8fafc',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-8px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <p
                style={{
                  fontSize: '16px',
                  color: '#475569',
                  marginBottom: '16px',
                  lineHeight: '1.6',
                }}
              >
                The video call feature made it so easy to connect. My advisor was knowledgeable and supportive.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Client"
                  width={48} // Added width
                  height={48} // Added height
                  style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: '600', fontSize: '16px', color: '#0f172a' }}>
                    Rajesh Patel
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>Entrepreneur</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div
              style={{
                background: '#f8fafc',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-8px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <p
                style={{
                  fontSize: '16px',
                  color: '#475569',
                  marginBottom: '16px',
                  lineHeight: '1.6',
                }}
              >
                I found the perfect advisor in just a few clicks. Highly recommend this platform
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Client"
                  width={48} // Added width
                  height={48} // Added height
                  style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: '600', fontSize: '16px', color: '#0f172a' }}>
                    Anika Verma
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>Retiree</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Button */}
      <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 50 }}>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          borderRadius: '50%',
          boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          ':hover': { backgroundColor: '#2563eb', transform: 'scale(1.1)' }
        }}>
          <MessageCircle style={{ height: '28px', width: '28px' }} />
        </button>
      </div>
    </div>
  )
}
