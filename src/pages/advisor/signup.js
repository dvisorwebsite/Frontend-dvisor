"use client";

import React, { useState } from "react";
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

  const inputStyle = {
    padding: "10px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    width: "100%",
    fontSize: "15px",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };

  const fileInputStyle = {
    padding: "10px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    width: "100%",
    fontSize: "15px",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const textareaStyle = {
    padding: "10px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    width: "100%",
    fontSize: "15px",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    minHeight: "100px",
    outline: "none",
    resize: "vertical",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };

  const checkboxStyle = {
    marginRight: "10px",
    height: "16px",
    width: "16px",
    accentColor: "#1e40af",
    cursor: "pointer",
  };

  const radioStyle = {
    marginRight: "10px",
    height: "16px",
    width: "16px",
    accentColor: "#1e40af",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "calc(100vh - 4rem)",
        backgroundColor: "#f9fafb",
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 16px",
          overflowY: "auto",
        }}
      >
        <div style={{ margin: "0 auto", width: "100%", maxWidth: "448px" }}>
          <div>
            <h2
              style={{
                marginTop: "24px",
                fontSize: "30px",
                fontWeight: "800",
                color: "#0f172a",
                lineHeight: "1.2",
              }}
            >
              Advisor Signup
            </h2>
            <p
              style={{
                marginTop: "8px",
                fontSize: "14px",
                color: "#64748b",
              }}
            >
              Already have an account?{" "}
              <Link
                href="/advisor/login"
                style={{
                  fontWeight: "500",
                  color: "#1e40af",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
              >
                Sign in
              </Link>
            </p>
          </div>

          <div style={{ marginTop: "32px" }}>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div style={{ position: "relative" }}>
                <label
                  htmlFor="profilePicture"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Profile Picture
                </label>
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  style={{
                    ...fileInputStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                  required
                />
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "40px",
                    fontSize: "12px",
                    color: "#64748b",
                  }}
                >
                  Max 2MB
                </span>
              </div>

              <div style={{ position: "relative" }}>
                <label
                  htmlFor="backgroundPicture"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Background Picture
                </label>
                <input
                  id="backgroundPicture"
                  name="backgroundPicture"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  style={{
                    ...fileInputStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                  required
                />
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "40px",
                    fontSize: "12px",
                    color: "#64748b",
                  }}
                >
                  Max 2MB
                </span>
              </div>

              <div>
                <label
                  htmlFor="name"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="companyName"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Company Name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="certificationType"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Certification Type
                </label>
                <input
                  id="certificationType"
                  name="certificationType"
                  type="text"
                  value={formData.certificationType}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="ARN"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  ARN
                </label>
                <input
                  id="ARN"
                  name="ARN"
                  type="text"
                  value={formData.ARN}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="numberOfClients"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Number of Clients
                </label>
                <input
                  id="numberOfClients"
                  name="numberOfClients"
                  type="number"
                  value={formData.numberOfClients}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="totalAUM"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Total AUM
                </label>
                <input
                  id="totalAUM"
                  name="totalAUM"
                  type="number"
                  value={formData.totalAUM}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="experienceYears"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Years of Experience
                </label>
                <input
                  id="experienceYears"
                  name="experienceYears"
                  type="number"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Fees Structure
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {["Commission based", "Fees Based", "Profit Sharing"].map((fee) => (
                    <label
                      key={fee}
                      style={{ display: "flex", alignItems: "center", fontSize: "15px", color: "#0f172a" }}
                    >
                      <input
                        type="radio"
                        name="feesStructure"
                        value={fee}
                        checked={formData.feesStructure === fee}
                        onChange={handleChange}
                        style={{ ...radioStyle }}
                      />
                      {fee}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Services Offered
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    "Mutual Funds",
                    "Investment Planning",
                    "Retirement Planning",
                    "Tax Planning",
                    "Estate Planning",
                  ].map((service) => (
                    <label
                      key={service}
                      style={{ display: "flex", alignItems: "center", fontSize: "15px", color: "#0f172a" }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.servicesOffered.includes(service)}
                        onChange={() => handleServicesChange(service)}
                        style={{ ...checkboxStyle }}
                      />
                      {service}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="firstMeetingProcess"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  First Meeting Process
                </label>
                <textarea
                  id="firstMeetingProcess"
                  name="firstMeetingProcess"
                  value={formData.firstMeetingProcess}
                  onChange={handleChange}
                  style={{
                    ...textareaStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="expertise"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Expertise
                </label>
                <textarea
                  id="expertise"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  style={{
                    ...textareaStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Returns Generated (%)
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ flex: 1 }}>
                    <label
                      htmlFor="returnsGenerated.threeYears"
                      style={{ fontSize: "13px", display: "block", marginBottom: "4px" }}
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
                      style={{
                        ...inputStyle,
                        ":hover": { borderColor: "#9ca3af" },
                        ":focus": {
                          borderColor: "#3b82f6",
                          boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                        },
                      }}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label
                      htmlFor="returnsGenerated.fiveYears"
                      style={{ fontSize: "13px", display: "block", marginBottom: "4px" }}
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
                      style={{
                        ...inputStyle,
                        ":hover": { borderColor: "#9ca3af" },
                        ":focus": {
                          borderColor: "#3b82f6",
                          boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                        },
                      }}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label
                      htmlFor="returnsGenerated.tenYears"
                      style={{ fontSize: "13px", display: "block", marginBottom: "4px" }}
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
                      style={{
                        ...inputStyle,
                        ":hover": { borderColor: "#9ca3af" },
                        ":focus": {
                          borderColor: "#3b82f6",
                          boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                        },
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              <div style={{ position: "relative" }}>
                <label
                  htmlFor="introVideo"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Introduction Video (Optional)
                </label>
                <input
                  id="introVideo"
                  name="introVideo"
                  type="file"
                  accept="video/*"
                  onChange={handleChange}
                  style={{
                    ...fileInputStyle,
                    ":hover": { borderColor: "#9ca3af" },
                    ":focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "40px",
                    fontSize: "12px",
                    color: "#64748b",
                  }}
                >
                  Max 5MB
                </span>
              </div>

              <div>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#1e40af",
                    color: "#ffffff",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "16px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    ":hover": { backgroundColor: "#1e3a8a", transform: "scale(1.02)" },
                  }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "none",
          "@media (min-width: 1024px)": { display: "block" },
          position: "relative",
          width: "0",
          flex: "1",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            height: "100%",
            width: "100%",
            background: "linear-gradient(to right, #1e40af, #1e3a8a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: "448px",
              padding: "32px",
              color: "#ffffff",
              textAlign: "left",
            }}
          >
            <h2
              style={{
                fontSize: "30px",
                fontWeight: "700",
                marginBottom: "16px",
              }}
            >
              Join as an Advisor
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#dbeafe",
                marginBottom: "24px",
              }}
            >
              Create your profile and start connecting with clients today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}