"use client"

import { useState, useEffect } from "react"
import { Check, X, Info, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Subscription() {
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)

  const plans = [
    {
      name: "Standard",
      price: 1499,
      benefits: [
        "Can schedule 6 online meetings",
        "AUM",
        "Experience",
        "Fees structure",
      ],
      notIncluded: [
        "Customer support",
        "Refund guarantee",
        "Client Reviews",
        "Introduction Video",
        "First meeting approach",
      ],
    },
    {
      name: "Premium",
      price: 1899,
      benefits: [
        "Can schedule 9 online meetings",
        "Fees Structure",
        "First meeting approach",
        "Client Reviews",
        "Introduction Video",
      ],
      notIncluded: [
        "Customer support",
        "Refund guarantee",
        "Personal details",
        "Company Name",
      ],
      popular: false,
    },
    {
      name: "Privileged",
      price: 1999,
      benefits: [
        "Unlimited online meetings",
        "Fees Structure",
        "First meeting approach",
        "Personal details",
        "Company Name",
        "Client Reviews",
        "Introduction Video",
        "Customer support",
        "Complete refund guarantee",
      ],
      notIncluded: [],
      popular: true,
    },
  ]

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
          Investor Subscription Plans
        </h1>
        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.1rem",
            color: "#7f8c8d",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          Choose the perfect plan to connect with financial advisors and grow your investment opportunities.
        </p>
      </div>

      {/* Subscription Plans */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              border: hoveredCard === index 
                ? (plan.name === "Privileged" ? "2px solid #ff0000" : "2px solid #3498db")
                : "1px solid #e0e0e0",
              position: "relative",
              transition: "border 0.2s ease-in-out",
            }}
          >
            {plan.popular && (
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
                Most Popular
              </div>
            )}

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
                {plan.name}
              </h2>

              <div style={{ marginBottom: "16px" }}>
                <span
                  style={{
                    fontSize: isMobile ? "2rem" : "2.5rem",
                    fontWeight: 700,
                    color: "#2c3e50",
                  }}
                >
                  {formatPrice(plan.price)}
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

              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "transparent",
                  color: "#3498db",
                  border: "1px solid #3498db",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Subscribe Now
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
                {plan.benefits.map((benefit, i) => (
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
                {plan.notIncluded.map((item, i) => (
                  <li
                    key={`not-included-${i}`}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: "12px",
                      opacity: 0.5,
                    }}
                  >
                    <X
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#e74c3c",
                        marginRight: "12px",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <span style={{ fontSize: "0.95rem", color: "#7f8c8d" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Refund Policy */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          padding: isMobile ? "20px" : "24px",
          marginBottom: "40px",
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
          <h3 style={{ fontSize: "1.2rem", color: "#2c3e50", margin: 0 }}>Refund Policy</h3>
        </div>
        <p
          style={{
            fontSize: "1rem",
            color: "#7f8c8d",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          The Standard and Premium plans offer no refund guarantee. The Privileged plan comes with a complete refund guarantee. Please contact our customer support team (available only for Privileged plan members) for assistance with refund requests.
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
          }}
        >
          {[
            {
              question: "How do I schedule online meetings?",
              answer:
                "After subscribing, you'll gain access to our scheduling platform where you can book meetings with available advisors based on your plan's limits.",
            },
            {
              question: "Can I upgrade my plan later?",
              answer:
                "Yes, you can upgrade your plan at any time by paying the price difference between your current plan and the desired plan.",
            },
            {
              question: "What happens if I need more meetings?",
              answer:
                "Standard and Premium plan users will need to upgrade to a higher tier for more meetings. Privileged plan users enjoy unlimited meetings.",
            },
            {
              question: "How do I contact customer support?",
              answer:
                "Customer support is exclusively available for Privileged plan members through email and phone channels.",
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
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "1.8rem" : "2rem",
            marginBottom: "16px",
          }}
        >
          Ready to connect with top advisors?
        </h2>
        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.1rem",
            marginBottom: "24px",
            maxWidth: "700px",
            margin: "0 auto 24px",
          }}
        >
          Start your journey to better investment decisions with our advisor connection platform.
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
          }}
        >
          Get Started Today
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
          <span>← Back to Investor Profile</span>
        </Link>
      </div>
    </div>
  )
}