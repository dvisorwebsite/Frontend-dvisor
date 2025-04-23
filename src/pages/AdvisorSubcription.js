"use client"

import { useState, useEffect } from "react"
import { Check, X, Info, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Registration() {
  const [isMobile, setIsMobile] = useState(false)

  const registrationPlan = {
    name: "One-Time Registration",
    price: 299,
    benefits: [
      "Profile creation for investor view",
      "Exposure to highly enriched prospects",
      "Unlimited online meetings with potential investors",
      "Profile listing on our platform",
      "Basic analytics dashboard",
      "Client messaging system",
      "Email support",
      "Basic profile customization",
    ],
  }

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Handle responsive styles
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: isMobile ? "20px" : "40px 20px",
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? "2rem" : "2.5rem",
            color: "#2c3e50",
            marginBottom: "16px",
          }}
        >
          Advisor Registration
        </h1>
        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.1rem",
            color: "#7f8c8d",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          Register once and connect with qualified investors looking for financial advisors like you.
        </p>
      </div>

      {/* Registration Plan */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "2px solid #3498db",
            position: "relative",
            transition: "transform 0.2s ease",
            maxWidth: "500px",
            width: "100%",
            "&:hover": {
              transform: "translateY(-4px)",
            },
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              backgroundColor: "#3498db",
              color: "white",
              padding: "4px 12px",
              borderRadius: "16px",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            One-Time Fee
          </div>

          <div
            style={{
              padding: isMobile ? "24px" : "32px 24px",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "1.5rem" : "1.8rem",
                color: "#2c3e50",
                marginBottom: "8px",
              }}
            >
              {registrationPlan.name}
            </h2>

            <div style={{ marginBottom: "16px" }}>
              <span
                style={{
                  fontSize: isMobile ? "2rem" : "2.5rem",
                  fontWeight: 700,
                  color: "#2c3e50",
                }}
              >
                {formatPrice(registrationPlan.price)}
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  color: "#7f8c8d",
                  marginLeft: "4px",
                }}
              >
                /one-time
              </span>
            </div>

            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "1rem",
                  color: "#2c3e50",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
              >
                No recurring fees or hidden charges
              </div>
              <div
                style={{
                  fontSize: "0.95rem",
                  color: "#7f8c8d",
                }}
              >
                Pay once and enjoy all the benefits without any subscription
              </div>
            </div>

            <button
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "#2980b9",
                },
              }}
            >
              Register Now
              <ArrowRight style={{ marginLeft: "8px", width: "16px", height: "16px" }} />
            </button>
          </div>

          <div style={{ padding: "24px" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                color: "#2c3e50",
                marginBottom: "16px",
              }}
            >
              What&apos;s included:
            </h3>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {registrationPlan.benefits.map((benefit, i) => (
                <li
                  key={`benefit-${i}`}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <Check
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#27ae60",
                      marginRight: "12px",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                  <span style={{ fontSize: "0.95rem", color: "#2c3e50" }}>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Refund Policy */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          padding: isMobile ? "20px" : "24px",
          marginBottom: "40px",
          maxWidth: "800px",
          margin: "0 auto 40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "16px" }}>
          <Info
            style={{
              width: "24px",
              height: "24px",
              color: "#3498db",
              marginRight: "12px",
              flexShrink: 0,
            }}
          />
          <h3 style={{ fontSize: "1.2rem", color: "#2c3e50", margin: 0 }}>Registration Details</h3>
        </div>
        <p
          style={{
            fontSize: "1rem",
            color: "#7f8c8d",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Our one-time registration fee gives you lifetime access to our platform. Unlike subscription-based services,
          you only pay once to create your professional profile that will be visible to qualified investors. Your
          profile will remain active as long as you maintain activity on the platform at least once every 6 months.
        </p>
      </div>

      {/* FAQ Section */}
      <div style={{ marginBottom: "40px" }}>
        <h2
          style={{
            fontSize: isMobile ? "1.5rem" : "1.8rem",
            color: "#2c3e50",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Frequently Asked Questions
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "24px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {[
            {
              question: "How are investor prospects verified?",
              answer:
                "All investor prospects are pre-qualified through our verification process to ensure they have genuine interest and capacity to invest. We verify identity, investment history, and financial capacity before connecting them with advisors.",
            },
            {
              question: "Is there a limit to how many investors I can meet?",
              answer:
                "No, your registration includes unlimited online meetings with potential investors. You can schedule as many meetings as you like through our platform's scheduling tool.",
            },
            {
              question: "What does 'exposure to highly enriched prospects' mean?",
              answer:
                "Our platform attracts high-net-worth individuals actively seeking financial advice. Your profile will be visible to these qualified investors who match your expertise and service offerings.",
            },
            {
              question: "How do I customize my advisor profile?",
              answer:
                "After registration, you'll have access to our profile builder where you can add your credentials, experience, specializations, client testimonials, and other relevant information to make your profile stand out to potential investors.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.1rem",
                  color: "#2c3e50",
                  marginBottom: "12px",
                }}
              >
                {faq.question}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#7f8c8d",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div
        style={{
          backgroundColor: "#3498db",
          borderRadius: "12px",
          padding: isMobile ? "30px 20px" : "40px",
          textAlign: "center",
          color: "white",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "1.8rem" : "2rem",
            marginBottom: "16px",
          }}
        >
          Ready to connect with qualified investors?
        </h2>
        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.1rem",
            marginBottom: "24px",
            maxWidth: "700px",
            margin: "0 auto 24px",
          }}
        >
          Join our community of financial advisors who are expanding their client base through our platform.
        </p>
        <button
          style={{
            backgroundColor: "white",
            color: "#3498db",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: "1.1rem",
            fontWeight: 600,
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: "#f8f9fa",
            },
          }}
        >
          Register Today
        </button>
      </div>

      {/* Back to Profile Link */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link
          href="/"
          style={{
            color: "#3498db",
            textDecoration: "underline",
            fontSize: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>← Back to Advisor Portal</span>
        </Link>
      </div>
    </div>
  )
}