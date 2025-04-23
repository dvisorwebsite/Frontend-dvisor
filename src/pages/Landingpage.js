"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios";

export default function Home() {
  const [advisor, setAdvisor] = useState([]);

  useEffect(() => {
    const getAdvisor = async () => {
        try {
            const response = await axios.get("https://dvsorwebsite.azurewebsites.net/api/AdvisorInfofive"); 
            setAdvisor(response.data.advisors);
        } catch (error) {
            console.error("Error fetching advisors:", error.response?.data || error.message);
        }
    };
    getAdvisor();
}, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        padding: '64px 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        '@media (min-width: 768px)': { padding: '96px 0' }
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '800',
            marginBottom: '40px',
            color: '#0f172a',
            letterSpacing: '-0.5px',
            lineHeight: '1.2',
            '@media (min-width: 768px)': { fontSize: '56px' }
          }}>
            ABSE REFERENCE NAHI SIRF PREFERENCE
          </h1>

          {/* Video Carousel */}
          <div style={{
            position: 'relative',
            maxWidth: '960px',
            margin: '0 auto 48px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#e5e7eb'
              }}>
                <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '500' }}>Video Placeholder</p>
              </div>
            </div>

            {/* Carousel Controls */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px'
            }}>
              <button style={{
                padding: '10px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: '#1e293b',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ':hover': { backgroundColor: '#ffffff', transform: 'scale(1.1)' }
              }}>
                <ChevronLeft style={{ height: '28px', width: '28px' }} />
              </button>
              <button style={{
                padding: '10px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: '#1e293b',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ':hover': { backgroundColor: '#ffffff', transform: 'scale(1.1)' }
              }}>
                <ChevronRight style={{ height: '28px', width: '28px' }} />
              </button>
            </div>

            {/* Carousel Indicators */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <button style={{
                height: '10px',
                width: '40px',
                backgroundColor: '#3b82f6',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer'
              }}></button>
              <button style={{
                height: '10px',
                width: '40px',
                backgroundColor: 'rgba(255,255,255,0.5)',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                ':hover': { backgroundColor: 'rgba(255,255,255,0.7)' }
              }}></button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Advisors */}
      <section style={{ padding: '64px 0', backgroundColor: '#ffffff', flex: '1' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '800',
            marginBottom: '40px',
            textAlign: 'center',
            color: '#0f172a',
            letterSpacing: '-0.5px',
            '@media (min-width: 768px)': { fontSize: '36px' }
          }}>
            Featured Advisors
          </h2>

          {/* <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '32px', 
            '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
            '@media (min-width: 1024px)': { gridTemplateColumns: 'repeat(3, 1fr)' }
          }}>
            {[1].map((advisor) => (
              <div
                key={advisor}
                style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 6px 12px rgba(0,0,0,0.1)', 
                  transition: 'all 0.3s ease', 
                  ':hover': { boxShadow: '0 12px 24px rgba(0,0,0,0.15)', transform: 'translateY(-4px)' } 
                }}
              >
                <div style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ position: 'relative', width: '72px', height: '72px', marginRight: '20px' }}>
                      <Image
                        src={`/placeholder.svg?height=72&width=72`}
                        alt="Advisor"
                        width={72}
                        height={72}
                        style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' }}
                      />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>Advisor Name</h3>
                      <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>WealthGrow Inc.</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px', textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>AUM</p>
                      <p style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>₹100 Cr</p>
                    </div>
                    <div style={{ backgroundColor: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Experience</p>
                      <p style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>10+ Years</p>
                    </div>
                    <div style={{ backgroundColor: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Clients</p>
                      <p style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>500+</p>
                    </div>
                  </div>

                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px', lineHeight: '1.5' }}>
                    Wealth Management, Retirement Planning, Tax Advisory
                  </p>

                  <Link
                    href="/advisor/profile"
                    style={{ 
                      display: 'block', 
                      width: '100%', 
                      padding: '10px 20px', 
                      backgroundColor: '#3b82f6', 
                      color: '#ffffff', 
                      textAlign: 'center', 
                      borderRadius: '8px', 
                      textDecoration: 'none', 
                      fontWeight: '500', 
                      fontSize: '15px',
                      transition: 'all 0.3s ease', 
                      ':hover': { backgroundColor: '#2563eb', transform: 'scale(1.02)' } 
                    }}
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div> */}

          <div style={{ width: '90%', height: '400px', border: '1px solid #ccc', borderRadius: '20px', margin: '0 auto', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '10px', overflow: 'hidden', overflowX: 'auto', boxSizing: 'border-box', padding: '15px' }}>
            {Array.from({ length: 3 }, (_index) => (
              <div style={{ width: '300px', height: '360px', border: '1px solid #ccc', borderRadius: '20px', boxSizing: 'border-box', padding: '10px' }}>
                <div className="image-section" style={{ width: '100%', height: '50%' }}>
                  {/* <Image src="" alt="#" style={{width:'100%' , height:'100%' , objectFit:'cover'}}/> */}
                  <div style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: '#ccc', borderRadius: '10px' }}></div>
                </div>
                <div className="info-section">
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Advisor Name</p>
                  <p style={{ fontSize: '16px' }}>Advisor Name</p>
                  <p style={{ fontSize: '16px' }}>Advisor Name</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <Link
              href="/criteria-form"
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
                ':hover': { backgroundColor: '#2563eb', transform: 'scale(1.05)' }
              }}
            >
              Find Your Advisor
            </Link>
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