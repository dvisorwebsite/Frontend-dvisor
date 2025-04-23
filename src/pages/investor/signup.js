"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

export default function InvestorSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

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
          window.location.href = "/login";
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

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: 'calc(100vh - 4rem)', 
      backgroundColor: '#f9fafb', 
      flexDirection: 'row', 
      overflow: 'hidden' 
    }}>
      {/* Add Toaster component at the top level */}
      <Toaster />
      
      {/* Form Section */}
      <div style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '48px 16px', 
      }}>
        <div style={{ 
          margin: '0 auto', 
          width: '100%', 
          maxWidth: '448px',
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
              Investor Signup
            </h2>
            <p style={{ 
              marginTop: '8px', 
              fontSize: '14px', 
              color: '#64748b', 
              lineHeight: '1.5' 
            }}>
              Already have an account?{" "}
              <Link 
                href="/investor/login" 
                style={{ 
                  fontWeight: '500', 
                  color: '#1e40af', 
                  textDecoration: 'none',
                }}>
                Sign in
              </Link>
            </p>
          </div>

          <div style={{ marginTop: '32px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ 
                    marginTop: '4px', 
                    padding: '10px 14px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px', 
                    width: '100%', 
                    fontSize: '15px', 
                    color: '#0f172a', 
                    backgroundColor: '#ffffff',
                  }}
                />
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '6px' }}>
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
                  }}
                />
              </div>

              <div>
                <label htmlFor="password" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '6px' }}>
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
                  style={{ 
                    marginTop: '4px', 
                    padding: '10px 14px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px', 
                    width: '100%', 
                    fontSize: '15px', 
                    color: '#0f172a', 
                    backgroundColor: '#ffffff',
                  }}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '6px' }}>
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  style={{ 
                    marginTop: '4px', 
                    padding: '10px 14px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px', 
                    width: '100%', 
                    fontSize: '15px', 
                    color: '#0f172a', 
                    backgroundColor: '#ffffff',
                  }}
                />
              </div>

              <div>
                <label htmlFor="phone" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '6px' }}>
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ 
                    marginTop: '4px', 
                    padding: '10px 14px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px', 
                    width: '100%', 
                    fontSize: '15px', 
                    color: '#0f172a', 
                    backgroundColor: '#ffffff',
                  }}
                />
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
                  }}>
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side Panel */}
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
              Join Us, Investor!
            </h2>
            <p style={{ 
              fontSize: '16px', 
              color: '#dbeafe', 
              marginBottom: '24px', 
              lineHeight: '1.6' 
            }}>
              Create your account to start managing your investments and connecting with opportunities.
            </p>
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.15)', 
              padding: '16px', 
              borderRadius: '12px',
            }}>
              <p style={{ 
                fontSize: '15px', 
                color: '#eff6ff', 
                fontStyle: 'italic', 
                lineHeight: '1.5' 
              }}>
                Take the first step towards financial success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}