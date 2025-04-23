"use client";

import Link from "next/link";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      // Simulate form submission (replace with your API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: '"Poppins", sans-serif', backgroundColor: "#f8fafc" }}>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Contact Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
            filter: "brightness(0.6)",
            transition: "transform 1.5s ease-in-out",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
            zIndex: 0,
            backdropFilter: "blur(2px)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "0 24px",
            animation: "fadeIn 2s ease-in-out",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              fontWeight: 800,
              marginBottom: "16px",
              letterSpacing: "-0.5px",
              textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            Get in Touch
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Have questions or need assistance? Contact us to connect with our team and start your financial journey.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section
        style={{
          padding: "80px 20px",
          backgroundColor: "#ffffff",
          flex: 1,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
          }}
        >
          {/* Contact Details and Map Side by Side */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "48px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  fontWeight: "800",
                  color: "#0f172a",
                  marginBottom: "32px",
                  animation: "fadeInText 1s ease-in-out forwards",
                }}
              >
                Contact Information
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <Mail size={24} color="#3b82f6" />
                  <div>
                    <p style={{ fontWeight: "600", color: "#0f172a" }}>Email</p>
                    <Link
                      href="mailto:dvisororg@gmail.com"
                      style={{ color: "#475569", textDecoration: "none", fontSize: "1rem", transition: "color 0.3s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                    >
                      dvisororg@gmail.com 
                    </Link>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <Phone size={24} color="#3b82f6" />
                  <div>
                    <p style={{ fontWeight: "600", color: "#0f172a" }}>Phone</p>
                    <p style={{ color: "#475569", fontSize: "1rem" }}>+91 8591534119</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <MapPin size={24} color="#3b82f6" />
                  <div>
                    <p style={{ fontWeight: "600", color: "#0f172a" }}>Office Address</p>
                    <p style={{ color: "#475569", fontSize: "1rem", lineHeight: "1.5" }}>
                      <br />
                      Bhaveshwar Arcade Annexe, LBS Marg, Ghatkopar West
                      <br />
                      Mumbai, Maharashtra 400086, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Google Maps Embed */}
            <div style={{ flex: 1, minWidth: "300px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d512.0!2d72.911487!3d19.0923549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c71b12d045fd%3A0x7a7e2331d4905730!2sBhaveshwar+Arcade+Annexe!5e0!3m2!1sen!2sus!4v1697654321987!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Button */}
      <div style={{ position: "fixed", bottom: "32px", right: "32px", zIndex: 50 }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            borderRadius: "50%",
            boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <MessageCircle style={{ height: "28px", width: "28px" }} />
        </button>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInText {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          section:first-of-type {
            height: 50vh;
          }
          h1 {
            fontSize: clamp(1.8rem, 5vw, 2.5rem);
          }
          h2 {
            fontSize: clamp(1.5rem, 3vw, 2rem);
          }
          iframe {
            height: 250px;
          }
        }

        @media (max-width: 480px) {
          button[type="submit"] {
            padding: 10px 20px;
            fontSize: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}