"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdvisorLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://dvsorwebsite.azurewebsites.net/api/loginAdvisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("advisorId", data._id);
        console.log("Login successful:", data);
        // Redirect user after successful login (optional)
        window.location.href = "/advisor/Profile"; 
      } else {
        console.error("Login failed:", data.message);
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: 'calc(100vh - 4rem)', 
      backgroundColor: '#f9fafb', 
      flexDirection: 'row', 
      overflow: 'hidden' 
    }}>
      {/* Form Section */}
      <div style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '48px 16px', 
        '@media (min-width: 640px)': { padding: '48px 24px' }, 
        '@media (min-width: 1024px)': { flex: 'none', padding: '48px 80px' }, 
        '@media (min-width: 1280px)': { padding: '48px 96px' } 
      }}>
        <div style={{ 
          margin: '0 auto', 
          width: '100%', 
          maxWidth: '448px', 
          '@media (min-width: 1024px)': { width: '384px' } 
        }}>
          <div>
            <h2 style={{ 
              marginTop: '24px', 
              fontSize: '30px', 
              fontWeight: '800', 
              color: '#0f172a', 
              lineHeight: '1.2', 
              letterSpacing: '-0.5px' 
            }}>
              Advisor Login
            </h2>
            <p style={{ 
              marginTop: '8px', 
              fontSize: '14px', 
              color: '#64748b', 
              lineHeight: '1.5' 
            }}>
              Don&apos;t have an account?{" "}
              <Link 
                href="/advisor/signup" 
                style={{ 
                  fontWeight: '500', 
                  color: '#1e40af', 
                  textDecoration: 'none', 
                  transition: 'color 0.3s ease', 
                  ':hover': { color: '#1e3a8a' } 
                }}>
                Sign up
              </Link>
            </p>
          </div>

          <div style={{ marginTop: '32px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label 
                  htmlFor="email" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#334155', 
                    marginBottom: '6px' 
                  }}>
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
                  style={{ 
                    marginTop: '4px', 
                    padding: '10px 14px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px', 
                    width: '100%', 
                    fontSize: '15px', 
                    color: '#0f172a', 
                    backgroundColor: '#ffffff', 
                    outline: 'none', 
                    transition: 'all 0.3s ease', 
                    ':focus': { borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)' } 
                  }}
                />
              </div>

              <div>
                <label 
                  htmlFor="password" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#334155', 
                    marginBottom: '6px' 
                  }}>
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
                  style={{ 
                    marginTop: '4px', 
                    padding: '10px 14px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px', 
                    width: '100%', 
                    fontSize: '15px', 
                    color: '#0f172a', 
                    backgroundColor: '#ffffff', 
                    outline: 'none', 
                    transition: 'all 0.3s ease', 
                    ':focus': { borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)' } 
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    style={{ 
                      height: '16px', 
                      width: '16px', 
                      accentColor: '#1e40af', 
                      border: '1px solid #d1d5db', 
                      borderRadius: '4px', 
                      cursor: 'pointer' 
                    }}
                  />
                  <label 
                    htmlFor="remember-me" 
                    style={{ 
                      marginLeft: '8px', 
                      fontSize: '14px', 
                      color: '#0f172a', 
                      cursor: 'pointer' 
                    }}>
                    Remember me
                  </label>
                </div>

                <div>
                  <Link 
                    href="/forgot-password" 
                    style={{ 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#1e40af', 
                      textDecoration: 'none', 
                      transition: 'color 0.3s ease', 
                      ':hover': { color: '#1e3a8a' } 
                    }}>
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button 
                  type="submit" 
                  style={{ 
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
                    ':hover': { backgroundColor: '#1e3a8a', transform: 'scale(1.02)' } 
                  }}>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side Panel (Visible on LG and above) */}
      <div style={{ 
        display: 'none', 
        '@media (min-width: 1024px)': { display: 'block' }, 
        position: 'relative', 
        width: '0', 
        flex: '1' 
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          height: '100%', 
          width: '100%', 
          background: 'linear-gradient(to right, #1e40af, #1e3a8a)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <div style={{ 
            maxWidth: '448px', 
            padding: '32px', 
            color: '#ffffff', 
            textAlign: 'left' 
          }}>
            <h2 style={{ 
              fontSize: '30px', 
              fontWeight: '700', 
              marginBottom: '16px', 
              lineHeight: '1.2', 
              letterSpacing: '-0.5px' 
            }}>
              Welcome Back, Advisor!
            </h2>
            <p style={{ 
              fontSize: '16px', 
              color: '#dbeafe', 
              marginBottom: '24px', 
              lineHeight: '1.6' 
            }}>
              Log in to access your dashboard, manage your profile, and connect with potential clients.
            </p>
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.15)', 
              padding: '16px', 
              borderRadius: '12px', 
              backdropFilter: 'blur(8px)', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            }}>
              <p style={{ 
                fontSize: '15px', 
                color: '#eff6ff', 
                fontStyle: 'italic', 
                lineHeight: '1.5' 
              }}>
                Help clients achieve their financial goals while growing your practice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}