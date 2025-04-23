import Link from "next/link"
import { Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer style={{ 
      background: 'linear-gradient(180deg, #111827 0%, #1f2937 100%)', 
      color: '#ffffff', 
      paddingBottom: '24px',
      boxShadow: '0 -4px 6px -1px rgba(0,0,0,0.1)' 
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 32px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', // Always 4 columns side by side
          gap: '40px',
          alignItems: 'start' // Align items at the top
        }}>
          {/* Legal Links */}
          <div>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px', 
              color: '#ffffff', 
              letterSpacing: '0.5px' 
            }}>
              Legal
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Privacy Policy', 'Refund Policy', 'TAC'].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={`/${item}`} 
                    style={{ 
                      color: '#d1d5db', 
                      textDecoration: 'none', 
                      fontSize: '16px', 
                      transition: 'all 0.3s ease', 
                      display: 'block',
                      padding: '4px 0',
                      ':hover': { color: '#60a5fa', transform: 'translateX(4px)' } 
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px', 
              color: '#ffffff', 
              letterSpacing: '0.5px' 
            }}>
              Connect With Us
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link
                  href="https://www.linkedin.com/company/dvisororiginal/posts/?feedView=all"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: '#d1d5db', 
                    textDecoration: 'none', 
                    fontSize: '16px', 
                    transition: 'all 0.3s ease',
                    padding: '4px 0',
                    ':hover': { color: '#60a5fa', transform: 'translateX(4px)' } 
                  }}
                >
                  <Linkedin style={{ 
                    height: '24px', 
                    width: '24px', 
                    marginRight: '12px', 
                    transition: 'transform 0.3s ease',
                    ':hover': { transform: 'scale(1.1)' } 
                  }} />
                  LinkedIn Page
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px', 
              color: '#ffffff', 
              letterSpacing: '0.5px' 
            }}>
              Company
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['AboutUS', 'FAQ'].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={`/${item}`} 
                    style={{ 
                      color: '#d1d5db', 
                      textDecoration: 'none', 
                      fontSize: '16px', 
                      transition: 'all 0.3s ease',
                      display: 'block',
                      padding: '4px 0',
                      ':hover': { color: '#60a5fa', transform: 'translateX(4px)' } 
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px', 
              color: '#ffffff', 
              letterSpacing: '0.5px' 
            }}>
              Stay Updated
            </h3>
            <p style={{ 
              color: '#d1d5db', 
              marginBottom: '20px', 
              fontSize: '16px', 
              lineHeight: '1.5' 
            }}>
              Subscribe to our newsletter for the latest updates.
            </p>
            <form style={{ 
              display: 'flex', 
              width: '100%', 
              maxWidth: '280px', // Slightly reduced for better fit
              minWidth: '200px' // Ensures it doesn't get too cramped
            }}>
              <input
                type="email"
                placeholder="Your email"
                style={{ 
                  padding: '12px 16px', 
                  flex: '1', // Takes available space
                  borderTopLeftRadius: '8px', 
                  borderBottomLeftRadius: '8px', 
                  color: '#111827', 
                  border: 'none', 
                  backgroundColor: '#f3f4f6', 
                  outline: 'none', 
                  fontSize: '14px',
                  transition: 'background-color 0.3s ease',
                  ':focus': { backgroundColor: '#ffffff' }
                }}
              />
              <button 
                type="submit" 
                style={{ 
                  backgroundColor: '#3b82f6', 
                  color: '#ffffff', 
                  padding: '12px 20px', 
                  borderTopRightRadius: '8px', 
                  borderBottomRightRadius: '8px', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap', // Prevents text wrapping
                  ':hover': { backgroundColor: '#2563eb', transform: 'scale(1.02)' } 
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div style={{ 
          marginTop: '64px', 
          paddingTop: '40px', 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          textAlign: 'center', 
          color: '#9ca3af', 
          fontSize: '14px' 
        }}>
          <p>© {new Date().getFullYear()} Financial Advisor Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}