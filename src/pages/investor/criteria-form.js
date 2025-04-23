"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CriteriaForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    pincode: "",
    investmentRange: "",
    advisorExperience: "",
    advisorAUM: "",
    advisorType: "",
    riskTolerance: "",
    investmentDuration: "",
    investmentGoals: "",
    expectedReturns: "",
    minimumClients: "",
  })

  // Check for authentication token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push("/investor/login")
    }
  }, [router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    localStorage.setItem('investmentCriteria', JSON.stringify(formData))
    router.push("/investor/advisors-gallery")
  }

  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem",
      backgroundColor: "#d3d3d3", // Gray background as in the image
      borderRadius: "8px",
      fontFamily: "'Arial', sans-serif", // Consistent font family
      boxSizing: "border-box", // Ensure consistent box-sizing
    }}>
      <h1 style={{
        marginBottom: "2rem",
        color: "#2c3e50",
        fontSize: "1.75rem",
        fontWeight: "bold",
        lineHeight: "1.2",
      }}>
        Investment Preferences
      </h1>
      
      <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <label htmlFor="pincode" style={{ fontWeight: 500, color: "#2c3e50", fontSize: "1rem", lineHeight: "1.5" }}>
            Enter your Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter value..."
            style={{
              padding: "0.75rem 1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
              width: "100%", // Full width of parent
              maxWidth: "500px", // Prevent overly wide inputs on large screens
              backgroundColor: "#fff",
              height: "40px",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box", // Ensure padding and border are included in width
            }}
            onFocus={(e) => e.target.style.borderColor = "#007bff"}
            onBlur={(e) => e.target.style.borderColor = "#ccc"}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={{ fontWeight: 500, color: "#2c3e50", marginBottom: "0.5rem", fontSize: "1rem", lineHeight: "1.5" }}>
            Select the range of investment amount you have in mind
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {["5cr+", "50 lacs - 5cr", "30 lacs - 50 lacs", "10 lacs - 30 lacs", "5 lacs - 10 lacs", "SIP"].map(
              (option) => (
                <div key={option} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <input
                    type="radio"
                    id={`investmentRange-${option}`}
                    name="investmentRange"
                    value={option}
                    checked={formData.investmentRange === option}
                    onChange={handleChange}
                    style={{ margin: 0, width: "20px", height: "20px", cursor: "pointer" }}
                    required
                  />
                  <label htmlFor={`investmentRange-${option}`} style={{ fontSize: "1rem", color: "#2c3e50", lineHeight: "1.5", cursor: "pointer" }}>
                    {option}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={{ fontWeight: 500, color: "#2c3e50", marginBottom: "0.5rem", fontSize: "1rem", lineHeight: "1.5" }}>
            Select the minimum range of experience you would like your financial advisor to have
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {["20 years +", "15 years - 20 years", "10 years - 15 years", "5 years - 10 years", "3 years - 5 years"].map(
              (option) => (
                <div key={option} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <input
                    type="radio"
                    id={`advisorExperience-${option}`}
                    name="advisorExperience"
                    value={option}
                    checked={formData.advisorExperience === option}
                    onChange={handleChange}
                    style={{ margin: 0, width: "20px", height: "20px", cursor: "pointer" }}
                    required
                  />
                  <label htmlFor={`advisorExperience-${option}`} style={{ fontSize: "1rem", color: "#2c3e50", lineHeight: "1.5", cursor: "pointer" }}>
                    {option}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={{ fontWeight: 500, color: "#2c3e50", marginBottom: "0.5rem", fontSize: "1rem", lineHeight: "1.5" }}>
            Select the minimum range of AUM your Financial Advisor to handle
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {["500Cr +", "200Cr - 500Cr", "100Cr - 200Cr", "50Cr - 100Cr", "10Cr - 50Cr"].map((option) => (
              <div key={option} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <input
                  type="radio"
                  id={`advisorAUM-${option}`}
                  name="advisorAUM"
                  value={option}
                  checked={formData.advisorAUM === option}
                  onChange={handleChange}
                  style={{ margin: 0, width: "20px", height: "20px", cursor: "pointer" }}
                  required
                />
                <label htmlFor={`advisorAUM-${option}`} style={{ fontSize: "1rem", color: "#2c3e50", lineHeight: "1.5", cursor: "pointer" }}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={{ fontWeight: 500, color: "#2c3e50", marginBottom: "0.5rem", fontSize: "1rem", lineHeight: "1.5" }}>
            What kind of Financial Advisor would you prefer?
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              "Institutional",
              "IFA (Individual Financial Advisor) (Commission Based)",
              "CFP (Certified Financial Planner) (Fees Based)",
              "RIA (Registered Investment Advisor) (Fees Based)",
              "All of the above"
            ].map((option) => (
              <div key={option} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <input
                  type="radio"
                  id={`advisorType-${option}`}
                  name="advisorType"
                  value={option}
                  checked={formData.advisorType === option}
                  onChange={handleChange}
                  style={{ margin: 0, width: "20px", height: "20px", cursor: "pointer" }}
                  required
                />
                <label htmlFor={`advisorType-${option}`} style={{ fontSize: "1rem", color: "#2c3e50", lineHeight: "1.5", cursor: "pointer" }}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={{ fontWeight: 500, color: "#2c3e50", marginBottom: "0.5rem", fontSize: "1rem", lineHeight: "1.5" }}>
            How much risk are you willing to take?
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {["High risk", "Medium Risk", "Low risk"].map((option) => (
              <div key={option} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <input
                  type="radio"
                  id={`riskTolerance-${option}`}
                  name="riskTolerance"
                  value={option}
                  checked={formData.riskTolerance === option}
                  onChange={handleChange}
                  style={{ margin: 0, width: "20px", height: "20px", cursor: "pointer" }}
                  required
                />
                <label htmlFor={`riskTolerance-${option}`} style={{ fontSize: "1rem", color: "#2c3e50", lineHeight: "1.5", cursor: "pointer" }}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={{ fontWeight: 500, color: "#2c3e50", marginBottom: "0.5rem", fontSize: "1rem", lineHeight: "1.5" }}>
            Approximate duration of investment?
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {["7 years +", "5 years - 7 years", "3 years - 5 years", "1 year - 3 years"].map((option) => (
              <div key={option} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <input
                  type="radio"
                  id={`investmentDuration-${option}`}
                  name="investmentDuration"
                  value={option}
                  checked={formData.investmentDuration === option}
                  onChange={handleChange}
                  style={{ margin: 0, width: "20px", height: "20px", cursor: "pointer" }}
                  required
                />
                <label htmlFor={`investmentDuration-${option}`} style={{ fontSize: "1rem", color: "#2c3e50", lineHeight: "1.5", cursor: "pointer" }}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <label htmlFor="investmentGoals" style={{ fontWeight: 500, color: "#2c3e50", fontSize: "1rem", lineHeight: "1.5" }}>
            Give us some insight on why do you want to invest & what are your goals?
          </label>
          <textarea
            id="investmentGoals"
            name="investmentGoals"
            value={formData.investmentGoals}
            onChange={handleChange}
            placeholder="Enter value..."
            style={{
              padding: "0.75rem 1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
              width: "100%", // Full width of parent
              maxWidth: "500px", // Prevent overly wide textarea on large screens
              resize: "vertical",
              minHeight: "120px",
              backgroundColor: "#fff",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box", // Ensure padding and border are included in width
            }}
            onFocus={(e) => e.target.style.borderColor = "#007bff"}
            onBlur={(e) => e.target.style.borderColor = "#ccc"}
            rows={4}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <label htmlFor="expectedReturns" style={{ fontWeight: 500, color: "#2c3e50", fontSize: "1rem", lineHeight: "1.5" }}>
            What is the minimum range of returns% you want from your Financial Advisor according to your investment tenure?
          </label>
          <input
            type="text"
            id="expectedReturns"
            name="expectedReturns"
            value={formData.expectedReturns}
            onChange={handleChange}
            placeholder="Enter value..."
            style={{
              padding: "0.75rem 1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
              width: "100%", // Full width of parent
              maxWidth: "500px", // Prevent overly wide input on large screens
              backgroundColor: "#fff",
              height: "40px",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box", // Ensure padding and border are included in width
            }}
            onFocus={(e) => e.target.style.borderColor = "#007bff"}
            onBlur={(e) => e.target.style.borderColor = "#ccc"}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={{ fontWeight: 500, color: "#2c3e50", marginBottom: "0.5rem", fontSize: "1rem", lineHeight: "1.5" }}>
            Select the minimum range of clients you want your Financial Advisor to have?
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {["2000+ Clients", "500 - 1000 Clients", "0 - 500 Clients"].map((option) => (
              <div key={option} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <input
                  type="radio"
                  id={`minimumClients-${option}`}
                  name="minimumClients"
                  value={option}
                  checked={formData.minimumClients === option}
                  onChange={handleChange}
                  style={{ margin: 0, width: "20px", height: "20px", cursor: "pointer" }}
                  required
                />
                <label htmlFor={`minimumClients-${option}`} style={{ fontSize: "1rem", color: "#2c3e50", lineHeight: "1.5", cursor: "pointer" }}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "0.75rem 2rem",
            borderRadius: "4px",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: "pointer",
            alignSelf: "flex-end",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
        >
          Submit
        </button>
      </form>
    </div>
  )
}