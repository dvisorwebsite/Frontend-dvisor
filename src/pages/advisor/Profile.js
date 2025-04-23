"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star, Award, Users, DollarSign, Calendar, FileText, User, Phone, Mail, Link as LinkIcon } from "lucide-react";

const STYLES = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: "#333",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    fontSize: "0.9rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    minWidth: "200px",
  },
};

export default function Profile() {
  const [advisor, setAdvisor] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [backgroundPicPreview, setBackgroundPicPreview] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === "guest-ID1234") {
      router.push("/AdvisorSubcription");
      return;
    }

    const fetchAdvisor = async () => {
      try {
        const selectedId = localStorage.getItem("advisorId");
        if (!selectedId) {
          setError("No advisor selected.");
          return;
        }

        const response = await fetch("https://dvsorwebsite.azurewebsites.net/api/advisorinfo");
        if (!response.ok) throw new Error("Failed to fetch advisor data");

        const data = await response.json();
        const advisorsArray = Array.isArray(data) ? data : (data.advisors || []);
        const selectedAdvisor = advisorsArray.find((ad) => ad._id === selectedId);

        if (!selectedAdvisor) {
          setError("Advisor not found.");
          return;
        }

        const transformedAdvisor = {
          name: selectedAdvisor.name || "Unknown",
          company: selectedAdvisor.companyName || "Not specified",
          certification: selectedAdvisor.certificationType?.split("/") || [],
          arn: selectedAdvisor.ARN || "N/A",
          clients: `${selectedAdvisor.numberOfClients || 0}+`,
          aum: selectedAdvisor.totalAUM ? `$${selectedAdvisor.totalAUM}M` : "N/A",
          experience: selectedAdvisor.experienceYears || 0,
          feesStructure: selectedAdvisor.feesStructure || "Not specified",
          firstMeeting: selectedAdvisor.firstMeetingProcess || "Not specified",
          services: selectedAdvisor.servicesOffered || [],
          returns: selectedAdvisor.returnsGenerated || { threeYear: "N/A", fiveYear: "N/A", tenYear: "N/A" },
          reviews: selectedAdvisor.clientsReview || [],
          videoUrl: selectedAdvisor.introVideo || null,
          profilePicture: selectedAdvisor.profilePicture || "/vercel.svg",
          backgroundPicture: selectedAdvisor.backgroundPicture || "/next.svg",
          email: selectedAdvisor.email || "Not specified",
          phone: selectedAdvisor.phone || "Not specified",
          expertise: selectedAdvisor.expertise || "Not specified",
          scheduledMeetings: selectedAdvisor.scheduledMeetings || [],
        };
        setAdvisor(transformedAdvisor);
        setEditData(transformedAdvisor);
        setProfilePicPreview(transformedAdvisor.profilePicture);
        setBackgroundPicPreview(transformedAdvisor.backgroundPicture);
      } catch (error) {
        console.error("Error fetching advisor:", error);
        setError("Failed to load advisor profile.");
      }
    };

    fetchAdvisor();
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const timeSlots = useMemo(
    () => ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
    []
  );

  const handleDateChange = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData((prev) => ({
          ...prev,
          [type]: reader.result,
        }));
        if (type === "profilePicture") {
          setProfilePicPreview(reader.result);
        } else if (type === "backgroundPicture") {
          setBackgroundPicPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setAdvisor(editData);
    setShowEditForm(false);
    // Here you would typically send the updated data to your backend
    // const formData = new FormData();
    // Object.entries(editData).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });
    // await fetch("http://localhost:5000/api/advisorinfo", {
    //   method: "PUT",
    //   body: formData,
    // });
  };

  if (error) return <div style={{ padding: "20px", textAlign: "center" }}>{error}</div>;
  if (!advisor) return <div style={{ padding: "20px", textAlign: "center" }}>Loading advisor profile...</div>;

  const hasVideo = !!advisor.videoUrl;

  return (
    <div className="advisor-profile" style={STYLES.container}>
      {/* Header */}
      <div style={{ position: "relative", height: isSmallMobile ? "200px" : "300px" }}>
        <Image src={advisor.backgroundPicture} alt="Background" fill priority style={{ objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            bottom: "-75px",
            left: isMobile ? "50%" : "50px",
            transform: isMobile ? "translateX(-50%)" : "none",
            border: "5px solid white",
            borderRadius: "50%",
            overflow: "hidden",
            width: isSmallMobile ? "120px" : "150px",
            height: isSmallMobile ? "120px" : "150px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Image src={advisor.profilePicture} alt={`${advisor.name}'s profile`} fill style={{ objectFit: "cover" }} priority />
        </div>
      </div>

      {/* Basic Info */}
      <div
        style={{
          marginTop: isSmallMobile ? "70px" : "85px",
          padding: isMobile ? "0 20px" : "0 50px",
          textAlign: isMobile ? "center" : "left",
          display: "flex",
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: isMobile ? "center" : "flex-start",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <div>
          <h1 style={{ fontSize: isSmallMobile ? "1.8rem" : "2.5rem", margin: 0, color: "#2c3e50" }}>{advisor.name}</h1>
          <h2 style={{ fontSize: isSmallMobile ? "1.2rem" : "1.5rem", margin: "5px 0 15px", color: "#7f8c8d", fontWeight: 400 }}>
            {advisor.company}
          </h2>
          <div style={{ marginBottom: "15px" }}>
            {advisor.certification.map((cert, index) => (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  backgroundColor: "#3498db",
                  color: "white",
                  padding: "5px 15px",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  margin: "0 5px 5px 0",
                }}
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setShowEditForm(true)}
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "60px",
            fontSize: "0.9rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            marginTop: isMobile ? "20px" : "0",
          }}
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Form */}
      {showEditForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: isMobile ? "90%" : "600px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, color: "#2c3e50" }}>Edit Profile</h3>
              <button
                onClick={() => setShowEditForm(false)}
                style={{ border: "none", background: "none", fontSize: "1.2rem", cursor: "pointer", color: "#7f8c8d" }}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Profile Picture</label>
                {profilePicPreview && (
                  <Image src={profilePicPreview} alt="Profile Preview" width={100} height={100} style={{ marginBottom: "10px" }} />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "profilePicture")}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Background Picture</label>
                {backgroundPicPreview && (
                  <Image src={backgroundPicPreview} alt="Background Preview" width={200} height={100} style={{ marginBottom: "10px" }} />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "backgroundPicture")}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Company</label>
                <input
                  type="text"
                  name="company"
                  value={editData.company}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Certifications (comma-separated)</label>
                <input
                  type="text"
                  name="certification"
                  value={editData.certification.join(",")}
                  onChange={(e) => setEditData({ ...editData, certification: e.target.value.split(",") })}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>ARN</label>
                <input
                  type="text"
                  name="arn"
                  value={editData.arn}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Clients</label>
                <input
                  type="text"
                  name="clients"
                  value={editData.clients}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>AUM</label>
                <input
                  type="text"
                  name="aum"
                  value={editData.aum}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Experience (years)</label>
                <input
                  type="number"
                  name="experience"
                  value={editData.experience}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Fees Structure</label>
                <textarea
                  name="feesStructure"
                  value={editData.feesStructure}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd", minHeight: "80px" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>First Meeting Process</label>
                <textarea
                  name="firstMeeting"
                  value={editData.firstMeeting}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd", minHeight: "80px" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Services (comma-separated)</label>
                <input
                  type="text"
                  name="services"
                  value={editData.services.join(",")}
                  onChange={(e) => setEditData({ ...editData, services: e.target.value.split(",") })}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Expertise</label>
                <input
                  type="text"
                  name="expertise"
                  value={editData.expertise}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Video URL</label>
                <input
                  type="url"
                  name="videoUrl"
                  value={editData.videoUrl || ""}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  style={{ ...STYLES.button, backgroundColor: "#7f8c8d" }}
                >
                  Cancel
                </button>
                <button type="submit" style={STYLES.button}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendar && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: isMobile ? "90%" : "400px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, color: "#2c3e50" }}>Schedule Meeting</h3>
              <button
                onClick={() => setShowCalendar(false)}
                style={{ border: "none", background: "none", fontSize: "1.2rem", cursor: "pointer", color: "#7f8c8d" }}
                aria-label="Close calendar"
              >
                ×
              </button>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <button onClick={() => handleDateChange(-1)} style={{ padding: "5px 10px" }} aria-label="Previous day">
                  {"<"}
                </button>
                <span>{selectedDate.toDateString()}</span>
                <button onClick={() => handleDateChange(1)} style={{ padding: "5px 10px" }} aria-label="Next day">
                  {">"}
                </button>
              </div>
            </div>
            <div style={{ display: "grid", gap: "10px" }}>
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => {
                    alert(`Meeting scheduled for ${selectedDate.toDateString()} at ${slot}`);
                    setShowCalendar(false);
                  }}
                  style={STYLES.button}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: isMobile ? "center" : "space-between",
          padding: isMobile ? "20px" : "30px 50px",
          backgroundColor: "white",
          margin: "30px 0",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {[
          { Icon: Award, label: "ARN", value: advisor.arn },
          { Icon: Users, label: "Clients", value: advisor.clients },
          { Icon: DollarSign, label: "AUM", value: advisor.aum },
          { Icon: Calendar, label: "Experience", value: `${advisor.experience} years` },
        ].map((stat, index) => (
          <div key={index} style={{ ...STYLES.statItem, minWidth: isMobile ? "150px" : "200px" }}>
            <stat.Icon style={{ width: "24px", height: "24px", marginRight: "15px", color: "#3498db" }} />
            <div>
              <h3 style={{ margin: 0, fontSize: "0.9rem", color: "#7f8c8d" }}>{stat.label}</h3>
              <p style={{ margin: "5px 0 0", fontSize: "1.2rem", fontWeight: 600, color: "#2c3e50" }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #e0e0e0",
          padding: isMobile ? "0 20px" : "0 50px",
          overflowX: "auto",
          gap: "10px",
        }}
      >
        {["scheduleMeetings", "about", "services", "returns", "reviews", "video", "personal"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: isSmallMobile ? "10px" : isMobile ? "15px" : "15px 25px",
              background: "none",
              border: "none",
              fontSize: isSmallMobile ? "0.9rem" : "1rem",
              fontWeight: 500,
              color: activeTab === tab ? "#3498db" : "#7f8c8d",
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderBottom: activeTab === tab ? "3px solid #3498db" : "none",
              whiteSpace: "nowrap",
            }}
            aria-label={`View ${tab} section`}
          >
            {tab === "scheduleMeetings" ? "Schedule Meetings" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: isMobile ? "20px" : "30px 50px", minHeight: "300px" }}>
        {activeTab === "scheduleMeetings" && (
          <div>
            <h3 style={{ marginTop: 0, color: "#2c3e50" }}>Scheduled Meetings</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {advisor.scheduledMeetings.length > 0 ? (
                advisor.scheduledMeetings.map((meeting, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                      <User style={{ width: "20px", height: "20px", marginRight: "10px", color: "#3498db" }} />
                      <h4 style={{ margin: 0, color: "#2c3e50" }}>{meeting.clientName || "Unnamed Client"}</h4>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                      <Calendar style={{ width: "20px", height: "20px", marginRight: "10px", color: "#3498db" }} />
                      <p style={{ margin: 0 }}>{meeting.date || "Date not specified"}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <LinkIcon style={{ width: "20px", height: "20px", marginRight: "10px", color: "#3498db" }} />
                      <a
                        href={meeting.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#3498db", textDecoration: "none" }}
                      >
                        {meeting.link || "No link available"}
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p>No scheduled meetings available.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {[
              { title: "Fees Structure", content: advisor.feesStructure },
              { title: "First Meeting Process", content: advisor.firstMeeting },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }}
              >
                <h3 style={{ marginTop: 0, color: "#2c3e50", fontSize: "1.2rem" }}>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "services" && (
          <div>
            <h3 style={{ marginTop: 0, color: "#2c3e50" }}>Services Offered</h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "15px",
              }}
            >
              {advisor.services.map((service, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "white",
                    padding: "15px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <FileText style={{ width: "20px", height: "20px", marginRight: "10px", color: "#3498db" }} />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "returns" && (
          <div>
            <h3 style={{ marginTop: 0, color: "#2c3e50" }}>Investment Returns</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0",
                flexWrap: "wrap",
                flexDirection: isMobile ? "column" : "row",
                gap: "15px",
              }}
            >
              {[
                { title: "3 Years", value: advisor.returns.threeYear },
                { title: "5 Years", value: advisor.returns.fiveYear },
                { title: "10 Years", value: advisor.returns.tenYear },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    textAlign: "center",
                    minWidth: "150px",
                    flex: 1,
                  }}
                >
                  <h4 style={{ marginTop: 0, color: "#7f8c8d", fontSize: "1rem" }}>{item.title}</h4>
                  <p style={{ fontSize: "2rem", fontWeight: 700, color: "#27ae60", margin: "10px 0 0" }}>{item.value}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.8rem", color: "#7f8c8d", fontStyle: "italic" }}>
              Past performance is not indicative of future results. Returns are calculated based on model portfolios and may
              vary for individual clients.
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <h3 style={{ marginTop: 0, color: "#2c3e50" }}>Client Reviews</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {advisor.reviews.length > 0 ? (
                advisor.reviews.map((review, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <h4 style={{ margin: 0, color: "#2c3e50" }}>{review.name || "Anonymous"}</h4>
                      <div style={{ display: "flex" }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            style={{ width: "16px", height: "16px", color: i < (review.rating || 0) ? "#f1c40f" : "#e0e0e0" }}
                          />
                        ))}
                      </div>
                    </div>
                    <p>{review.comment || "No comment provided."}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available yet.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "video" && (
          <div>
            <h3 style={{ marginTop: 0, color: "#2c3e50" }}>About My Approach</h3>
            {hasVideo ? (
              <div>
                <div style={{ margin: "20px 0", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                  <video controls style={{ width: "100%", display: "block" }} poster="/placeholder.svg">
                    <source src={advisor.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p style={{ color: "#7f8c8d", lineHeight: 1.6 }}>
                  Watch this short video to learn more about my investment philosophy, approach to financial planning, and how I
                  work with clients to achieve their financial goals.
                </p>
              </div>
            ) : (
              <p style={{ color: "#7f8c8d", marginTop: "20px" }}>No introductory video available at this time.</p>
            )}
          </div>
        )}

        {activeTab === "personal" && (
          <div>
            <h3 style={{ marginTop: 0, color: "#2c3e50" }}>Personal Details</h3>
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                marginTop: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <User style={{ width: "20px", height: "20px", marginRight: "10px", color: "#3498db" }} />
                <div>
                  <strong style={{ color: "#2c3e50" }}>Name:</strong> {advisor.name}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <Mail style={{ width: "20px", height: "20px", marginRight: "10px", color: "#3498db" }} />
                <div>
                  <strong style={{ color: "#2c3e50" }}>Email:</strong> {advisor.email}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <Phone style={{ width: "20px", height: "20px", marginRight: "10px", color: "#3498db" }} />
                <div>
                  <strong style={{ color: "#2c3e50" }}>Phone:</strong> {advisor.phone}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <FileText style={{ width: "20px", height: "20px", marginRight: "10px", color: "#3498db" }} />
                <div>
                  <strong style={{ color: "#2c3e50" }}>Expertise:</strong> {advisor.expertise}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Award style={{ width: "20px", height: "20px", marginRight: "10px", color: "#3498db" }} />
                <div>
                  <strong style={{ color: "#2c3e50" }}>ARN:</strong> {advisor.arn}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}