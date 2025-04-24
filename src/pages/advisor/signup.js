"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdvisorSignup() {
  const [formData, setFormData] = useState({
    profilePicture: null,
    backgroundPicture: null,
    name: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    certificationType: "",
    ARN: "",
    numberOfClients: 0,
    totalAUM: 0,
    experienceYears: 0,
    feesStructure: "",
    servicesOffered: ["Mutual Funds", "Investment Planning"],
    firstMeetingProcess: "",
    expertise: "",
    returnsGenerated: {
      threeYears: 8.5,
      fiveYears: 7.2,
      tenYears: 6.8,
    },
    introVideo: null,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("profilePicture", formData.profilePicture);
    formDataToSend.append("backgroundPicture", formData.backgroundPicture);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("certificationType", formData.certificationType);
    formDataToSend.append("ARN", formData.ARN);
    formDataToSend.append("numberOfClients", formData.numberOfClients);
    formDataToSend.append("totalAUM", formData.totalAUM);
    formDataToSend.append("experienceYears", formData.experienceYears);
    formDataToSend.append("feesStructure", formData.feesStructure);
    formDataToSend.append("servicesOffered", JSON.stringify(formData.servicesOffered));
    formDataToSend.append("firstMeetingProcess", formData.firstMeetingProcess);
    formDataToSend.append("expertise", formData.expertise);
    formDataToSend.append("returnsGenerated", JSON.stringify(formData.returnsGenerated));
    if (formData.introVideo) {
      formDataToSend.append("introVideo", formData.introVideo);
    }

    try {
      const response = await fetch("https://dvsorwebsite.azurewebsites.net/api/signupAdvisor", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        alert("Registration successful! Please check your email for verification.");
        window.location.href = "/advisor/login";
      } else {
        console.error("Signup failed:", data.message);
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        if (name === "profilePicture" || name === "backgroundPicture") {
          if (file.size > 2 * 1024 * 1024) {
            alert(`${name === "profilePicture" ? "Profile Picture" : "Background Picture"} must be 2MB or less`);
            return;
          }
        } else if (name === "introVideo" && file.size > 5 * 1024 * 1024) {
          alert("Intro Video must be 5MB or less");
          return;
        }
      }
      setFormData({ ...formData, [name]: file });
    } else if (name.includes("returnsGenerated")) {
      const period = name.split(".")[1];
      setFormData({
        ...formData,
        returnsGenerated: {
          ...formData.returnsGenerated,
          [period]: parseFloat(value) || 0,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleServicesChange = (service) => {
    setFormData((prevState) => {
      const servicesOffered = prevState.servicesOffered.includes(service)
        ? prevState.servicesOffered.filter((s) => s !== service)
        : [...prevState.servicesOffered, service];
      return { ...prevState, servicesOffered };
    });
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
      overflowY: 'auto',
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
      position: 'relative',
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
    fileInput: {
      width: '100%',
      padding: '10px 14px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '15px',
      color: '#0f172a',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box',
      cursor: 'pointer',
    },
    textarea: {
      width: '100%',
      padding: '10px 14px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '15px',
      color: '#0f172a',
      backgroundColor: '#ffffff',
      minHeight: '100px',
      resize: 'vertical',
      boxSizing: 'border-box',
    },
    checkbox: {
      height: '16px',
      width: '16px',
      accentColor: '#1e40af',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '10px',
    },
    radio: {
      height: '16px',
      width: '16px',
      accentColor: '#1e40af',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '10px',
    },
    checkboxContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    radioContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    checkboxLabel: {
      fontSize: '15px',
      color: '#0f172a',
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
      height: '100vh',
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
    fileSizeHint: {
      position: 'absolute',
      right: '10px',
      top: '40px',
      fontSize: '12px',
      color: '#64748b',
    },
    returnsGroup: {
      display: 'flex',
      gap: '10px',
    },
    returnsInput: {
      flex: 1,
    },
    returnsLabel: {
      fontSize: '13px',
      display: 'block',
      marginBottom: '4px',
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
    welcomeContentStyle
  } = isMounted ? getResponsiveStyles(windowWidth) : {
    containerStyle: defaultContainerStyle,
    formSectionStyle: defaultFormSectionStyle,
    formWrapperStyle: defaultFormWrapperStyle,
    headingStyle: defaultHeadingStyle,
    rightPanelStyle: defaultRightPanelStyle,
    buttonStyle: styles.button,
    welcomeHeadingStyle: styles.welcomeHeading,
    welcomeContentStyle: styles.welcomeContent
  };

  return (
    <div style={containerStyle}>
      <div style={formSectionStyle}>
        <div style={formWrapperStyle}>
          <div>
            <h2 style={headingStyle}>
              Advisor Signup
            </h2>
            <p style={styles.subtext}>
              Already have an account?{" "}
              <Link href="/advisor/login" style={styles.linkStyle}>
                Sign in
              </Link>
            </p>
          </div>

          <div style={styles.formContainer}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={styles.formGroup}>
                <label htmlFor="profilePicture" style={styles.label}>
                  Profile Picture
                </label>
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  style={styles.fileInput}
                  required
                />
                <span style={styles.fileSizeHint}>Max 2MB</span>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="backgroundPicture" style={styles.label}>
                  Background Picture
                </label>
                <input
                  id="backgroundPicture"
                  name="backgroundPicture"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  style={styles.fileInput}
                  required
                />
                <span style={styles.fileSizeHint}>Max 2MB</span>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
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
                  required
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="phone" style={styles.label}>
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="companyName" style={styles.label}>
                  Company Name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="certificationType" style={styles.label}>
                  Certification Type
                </label>
                <input
                  id="certificationType"
                  name="certificationType"
                  type="text"
                  value={formData.certificationType}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="ARN" style={styles.label}>
                  ARN
                </label>
                <input
                  id="ARN"
                  name="ARN"
                  type="text"
                  value={formData.ARN}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="numberOfClients" style={styles.label}>
                  Number of Clients
                </label>
                <input
                  id="numberOfClients"
                  name="numberOfClients"
                  type="number"
                  value={formData.numberOfClients}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="totalAUM" style={styles.label}>
                  Total AUM
                </label>
                <input
                  id="totalAUM"
                  name="totalAUM"
                  type="number"
                  value={formData.totalAUM}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="experienceYears" style={styles.label}>
                  Years of Experience
                </label>
                <input
                  id="experienceYears"
                  name="experienceYears"
                  type="number"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Fees Structure
                </label>
                <div style={styles.radioContainer}>
                  {["Commission based", "Fees Based", "Profit Sharing"].map((fee) => (
                    <label
                      key={fee}
                      style={styles.checkboxLabel}
                    >
                      <input
                        type="radio"
                        name="feesStructure"
                        value={fee}
                        checked={formData.feesStructure === fee}
                        onChange={handleChange}
                        style={styles.radio}
                      />
                      {fee}
                    </label>
                  ))}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Services Offered
                </label>
                <div style={styles.checkboxContainer}>
                  {[
                    "Mutual Funds",
                    "Investment Planning",
                    "Retirement Planning",
                    "Tax Planning",
                    "Estate Planning",
                  ].map((service) => (
                    <label
                      key={service}
                      style={styles.checkboxLabel}
                    >
                      <input
                        type="checkbox"
                        checked={formData.servicesOffered.includes(service)}
                        onChange={() => handleServicesChange(service)}
                        style={styles.checkbox}
                      />
                      {service}
                    </label>
                  ))}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="firstMeetingProcess" style={styles.label}>
                  First Meeting Process
                </label>
                <textarea
                  id="firstMeetingProcess"
                  name="firstMeetingProcess"
                  value={formData.firstMeetingProcess}
                  onChange={handleChange}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="expertise" style={styles.label}>
                  Expertise
                </label>
                <textarea
                  id="expertise"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Returns Generated (%)
                </label>
                <div style={styles.returnsGroup}>
                  <div style={styles.returnsInput}>
                    <label
                      htmlFor="returnsGenerated.threeYears"
                      style={styles.returnsLabel}
                    >
                      3 Years
                    </label>
                    <input
                      id="returnsGenerated.threeYears"
                      name="returnsGenerated.threeYears"
                      type="number"
                      step="0.1"
                      value={formData.returnsGenerated.threeYears}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </div>
                  <div style={styles.returnsInput}>
                    <label
                      htmlFor="returnsGenerated.fiveYears"
                      style={styles.returnsLabel}
                    >
                      5 Years
                    </label>
                    <input
                      id="returnsGenerated.fiveYears"
                      name="returnsGenerated.fiveYears"
                      type="number"
                      step="0.1"
                      value={formData.returnsGenerated.fiveYears}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </div>
                  <div style={styles.returnsInput}>
                    <label
                      htmlFor="returnsGenerated.tenYears"
                      style={styles.returnsLabel}
                    >
                      10 Years
                    </label>
                    <input
                      id="returnsGenerated.tenYears"
                      name="returnsGenerated.tenYears"
                      type="number"
                      step="0.1"
                      value={formData.returnsGenerated.tenYears}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="introVideo" style={styles.label}>
                  Introduction Video (Optional)
                </label>
                <input
                  id="introVideo"
                  name="introVideo"
                  type="file"
                  accept="video/*"
                  onChange={handleChange}
                  style={styles.fileInput}
                />
                <span style={styles.fileSizeHint}>Max 5MB</span>
              </div>

              <div>
                <button type="submit" style={buttonStyle}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div style={rightPanelStyle}>
        <div style={styles.rightPanelContent}>
          <div style={welcomeContentStyle}>
            <h2 style={welcomeHeadingStyle}>
              Join as an Advisor
            </h2>
            <p style={styles.welcomeText}>
              Create your profile and start connecting with clients today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}