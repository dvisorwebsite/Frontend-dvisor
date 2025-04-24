"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function InvestorSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Prepare data for API (excluding confirmPassword)
    const signupData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    };

    try {
      const response = await fetch("https://dvsorwebsite.azurewebsites.net/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        // Show toast notification instead of alert
        toast.success("You've received an email for verification", {
          duration: 4000,
          position: "top-center",
        });
        // Redirect to login page after a short delay to allow toast to be seen
        setTimeout(() => {
          window.location.href = "/investor/login";
        }, 2000);
      } else {
        console.error("Signup failed:", data.message);
        toast.error(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

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
      },
      inputStyle: {
        ...styles.input,
        padding: isMobile ? '8px 12px' : '10px 14px',
      },
      formContainerStyle: {
        ...styles.formContainer,
        marginTop: isMobile ? '20px' : '24px',
      },
      formGroupStyle: {
        ...styles.formGroup,
        marginBottom: isMobile ? '16px' : '20px',
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
    buttonStyle,
    welcomeHeadingStyle,
    welcomeContentStyle,
    inputStyle,
    formContainerStyle,
    formGroupStyle
  } = isMounted ? getResponsiveStyles(windowWidth) : {
    containerStyle: defaultContainerStyle,
    formSectionStyle: defaultFormSectionStyle,
    formWrapperStyle: defaultFormWrapperStyle,
    headingStyle: defaultHeadingStyle,
    rightPanelStyle: defaultRightPanelStyle,
    buttonStyle: styles.button,
    welcomeHeadingStyle: styles.welcomeHeading,
    welcomeContentStyle: styles.welcomeContent,
    inputStyle: styles.input,
    formContainerStyle: styles.formContainer,
    formGroupStyle: styles.formGroup
  };

  return (
    <div style={containerStyle}>
      {/* Add Toaster component at the top level */}
      <Toaster />
      
      {/* Form Section */}
      <div style={formSectionStyle}>
        <div style={formWrapperStyle}>
          <div>
            <h2 style={headingStyle}>
              Investor Signup
            </h2>
            <p style={styles.subtext}>
              Already have an account?{" "}
              <Link 
                href="/investor/login" 
                style={styles.linkStyle}>
                Sign in
              </Link>
            </p>
          </div>

          <div style={formContainerStyle}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMounted && windowWidth < 640 ? '16px' : '20px' }}>
              <div style={formGroupStyle}>
                <label htmlFor="name" style={styles.label}>
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={formGroupStyle}>
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
                  style={inputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="password" style={styles.label}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="confirmPassword" style={styles.label}>
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="phone" style={styles.label}>
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <button 
                  type="submit" 
                  style={buttonStyle}>
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side Panel */}
      <div style={rightPanelStyle}>
        <div style={styles.rightPanelContent}>
          <div style={welcomeContentStyle}>
            <h2 style={welcomeHeadingStyle}>
              Join Us, Investor!
            </h2>
            <p style={styles.welcomeText}>
              Create your account to start managing your investments and connecting with opportunities.
            </p>
            <div style={styles.testimonial}>
              <p style={styles.testimonialText}>
                Take the first step towards financial success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}