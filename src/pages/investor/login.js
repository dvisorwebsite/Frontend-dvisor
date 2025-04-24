"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function InvestorLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://dvsorwebsite.azurewebsites.net/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("investorEmail", formData.email);
        console.log("Login successful:", data);
        // Redirect user after successful login (optional)
        window.location.href = "/"; 
      } else {
        console.error("Login failed:", data.message);
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    
    // Add resize event listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Base styles that don't depend on window width
  const styles = {
    container: {
      display: 'flex',
      minHeight: 'calc(100vh - 4rem)',
      backgroundColor: '#f9fafb',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    formSection: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      width: '100%',
    },
    formWrapper: {
      margin: '0 auto',
      width: '100%',
      maxWidth: '100%',
    },
    heading: {
      marginTop: '16px',
      fontSize: '24px',
      fontWeight: '800',
      color: '#0f172a',
      lineHeight: '1.2',
      letterSpacing: '-0.5px',
    },
    subtext: {
      marginTop: '8px',
      fontSize: '14px',
      color: '#64748b',
      lineHeight: '1.5',
    },
    linkStyle: {
      fontWeight: '500',
      color: '#1e40af',
      textDecoration: 'none',
    },
    formContainer: {
      marginTop: '24px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#334155',
      marginBottom: '6px',
    },
    input: {
      width: '100%',
      padding: '10px 14px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '15px',
      color: '#0f172a',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box',
    },
    checkboxContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '20px',
      gap: '12px',
    },
    rememberContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    checkbox: {
      height: '16px',
      width: '16px',
      accentColor: '#1e40af',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    checkboxLabel: {
      marginLeft: '8px',
      fontSize: '14px',
      color: '#0f172a',
      cursor: 'pointer',
    },
    button: {
      width: '100%',
      backgroundColor: '#1e40af',
      color: '#ffffff',
      padding: '12px 20px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    rightPanel: {
      display: 'none',
      position: 'relative',
      height: '300px',
      width: '100%',
    },
    rightPanelContent: {
      position: 'absolute',
      inset: 0,
      height: '100%',
      width: '100%',
      background: 'linear-gradient(to right, #1e40af, #1e3a8a)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box',
    },
    welcomeContent: {
      maxWidth: '100%',
      padding: '20px',
      color: '#ffffff',
      textAlign: 'left',
    },
    welcomeHeading: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '16px',
      lineHeight: '1.2',
      letterSpacing: '-0.5px',
    },
    welcomeText: {
      fontSize: '16px',
      color: '#dbeafe',
      marginBottom: '24px',
      lineHeight: '1.6',
    },
    testimonial: {
      backgroundColor: 'rgba(255,255,255,0.15)',
      padding: '16px',
      borderRadius: '12px',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    testimonialText: {
      fontSize: '15px',
      color: '#eff6ff',
      fontStyle: 'italic',
      lineHeight: '1.5',
    },
  };
  
  // Default styles for server-side rendering
  const defaultContainerStyle = {
    ...styles.container,
  };
  
  const defaultFormSectionStyle = {
    ...styles.formSection,
  };
  
  const defaultFormWrapperStyle = {
    ...styles.formWrapper,
  };
  
  const defaultHeadingStyle = {
    ...styles.heading,
  };
  
  const defaultRightPanelStyle = {
    ...styles.rightPanel,
  };
  
  const defaultCheckboxContainerStyle = {
    ...styles.checkboxContainer,
  };

  // Compute responsive styles based on window width
  const getResponsiveStyles = (width) => {
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const isDesktop = width >= 1024;
    
    return {
      containerStyle: {
        ...styles.container,
        flexDirection: isDesktop ? 'row' : 'column',
      },
      formSectionStyle: {
        ...styles.formSection,
        padding: isMobile ? '20px' : isTablet ? '32px' : '48px 80px',
      },
      formWrapperStyle: {
        ...styles.formWrapper,
        maxWidth: isMobile ? '100%' : isTablet ? '90%' : '448px',
      },
      headingStyle: {
        ...styles.heading,
        fontSize: isMobile ? '22px' : isTablet ? '26px' : '30px',
      },
      rightPanelStyle: {
        ...styles.rightPanel,
        display: isDesktop ? 'block' : 'none',
        height: isDesktop ? 'auto' : '300px',
        width: isDesktop ? '0' : '100%',
        flex: isDesktop ? '1' : 'none',
      },
      checkboxContainerStyle: {
        ...styles.checkboxContainer,
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'flex-start' : 'space-between',
      },
      buttonStyle: {
        ...styles.button,
        fontSize: isMobile ? '15px' : '16px',
        padding: isMobile ? '10px 16px' : '12px 20px',
      },
      welcomeHeadingStyle: {
        ...styles.welcomeHeading,
        fontSize: width < 1280 ? '26px' : '30px',
      },
      welcomeContentStyle: {
        maxWidth: width >= 1280 ? '448px' : '90%',
        padding: width >= 1280 ? '32px' : '20px',
        color: '#ffffff',
        textAlign: 'left',
      }
    };
  };

  // Use responsive styles if component is mounted (client-side)
  const {
    containerStyle,
    formSectionStyle,
    formWrapperStyle,
    headingStyle,
    rightPanelStyle,
    checkboxContainerStyle,
    buttonStyle,
    welcomeHeadingStyle,
    welcomeContentStyle
  } = isMounted ? getResponsiveStyles(windowWidth) : {
    containerStyle: defaultContainerStyle,
    formSectionStyle: defaultFormSectionStyle,
    formWrapperStyle: defaultFormWrapperStyle,
    headingStyle: defaultHeadingStyle,
    rightPanelStyle: defaultRightPanelStyle,
    checkboxContainerStyle: defaultCheckboxContainerStyle,
    buttonStyle: styles.button,
    welcomeHeadingStyle: styles.welcomeHeading,
    welcomeContentStyle: styles.welcomeContent
  };

  return (
    <div style={containerStyle}>
      {/* Form Section */}
      <div style={formSectionStyle}>
        <div style={formWrapperStyle}>
          <div>
            <h2 style={headingStyle}>
              Investor Login
            </h2>
            <p style={styles.subtext}>
              Don&apos;t have an account?{" "}
              <Link href="/investor/signup" style={styles.linkStyle}>
                Sign up
              </Link>
              {" "}or{" "}
              <Link href="/advisor/login" style={styles.linkStyle}>
                Login as Advisor
              </Link>
            </p>
          </div>

          <div style={styles.formContainer}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="password" style={styles.label}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={styles.input}
                />
              </div>

              <div style={checkboxContainerStyle}>
                <div style={styles.rememberContainer}>
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    style={styles.checkbox}
                  />
                  <label htmlFor="remember-me" style={styles.checkboxLabel}>
                    Remember me
                  </label>
                </div>

                <div>
                  <Link href="/forgot-password" style={styles.linkStyle}>
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button type="submit" style={buttonStyle}>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side Panel (Visible on LG and above) */}
      <div style={rightPanelStyle}>
        <div style={styles.rightPanelContent}>
          <div style={welcomeContentStyle}>
            <h2 style={welcomeHeadingStyle}>
              Welcome Back, Investor!
            </h2>
            <div style={styles.testimonial}>
              <p style={styles.testimonialText}>
                Help clients achieve their financial goals while growing your practice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}