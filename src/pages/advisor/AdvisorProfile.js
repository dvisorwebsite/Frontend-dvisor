"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Star, Award, Users, DollarSign, Calendar, FileText, User, Phone, Mail } from "lucide-react"

export default function AdvisorProfile() {
  const [advisor, setAdvisor] = useState(null)
  const [activeTab, setActiveTab] = useState("about")
  const [isMobile, setIsMobile] = useState(false)
  const [isSmallMobile, setIsSmallMobile] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isGuest, setIsGuest] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsGuest(token === 'guest-ID1234')

    const fetchAdvisor = async () => {
      try {
        const selectedId = localStorage.getItem('selectedAdvisorId')
        if (!selectedId) return

        const response = await fetch("https://dvsorwebsite.azurewebsites.net/api/advisorinfo")
        const data = await response.json()

        const advisorsArray = Array.isArray(data) ? data : (data.advisors || [])
        const selectedAdvisor = advisorsArray.find(ad => ad._id === selectedId)
        console.log("raw data", selectedAdvisor)

        if (selectedAdvisor) {
          const transformedAdvisor = {
            name: selectedAdvisor.name,
            company: selectedAdvisor.companyName || "Not specified",
            certification: selectedAdvisor.certificationType ? selectedAdvisor.certificationType.split('/') : [],
            arn: selectedAdvisor.ARN || "N/A",
            clients: `${selectedAdvisor.numberOfClients || 0}+`,
            aum: selectedAdvisor.totalAUM ? `$${selectedAdvisor.totalAUM}M` : "N/A",
            experience: selectedAdvisor.experienceYears || 0,
            feesStructure: selectedAdvisor.feesStructure || "Not specified",
            firstMeeting: selectedAdvisor.firstMeetingProcess || "Not specified",
            services: selectedAdvisor.servicesOffered || [],
            returns: selectedAdvisor.returnsGenerated ? {
              threeYear: `${selectedAdvisor.returnsGenerated.threeYears}%`,
              fiveYear: `${selectedAdvisor.returnsGenerated.fiveYears}%`,
              tenYear: `${selectedAdvisor.returnsGenerated.tenYears}%`
            } : {
              threeYear: "N/A",
              fiveYear: "N/A",
              tenYear: "N/A"
            },
            reviews: selectedAdvisor.clientsReview || [],
            videoUrl: selectedAdvisor.introVideo || null,
            profilePicture: selectedAdvisor.profilePicture,
            backgroundPicture: selectedAdvisor.backgroundPicture,
            email: selectedAdvisor.email || "Not specified",
            phone: selectedAdvisor.phone || "Not specified",
            expertise: selectedAdvisor.expertise || "Not specified"
          }
          setAdvisor(transformedAdvisor)
        }
      } catch (error) {
        console.error("Error fetching advisor:", error)
      }
    }

    fetchAdvisor()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      setIsSmallMobile(window.innerWidth <= 480)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!advisor) {
    return <div>Loading advisor profile...</div>
  }

  const hasVideo = advisor.videoUrl && advisor.videoUrl !== ""
  const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
    "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM",
    "11:00 PM"
  ];

  const handleScheduleClick = () => {
    if (!isGuest) {
      setShowCalendar(true)
    }
  }

  const handleDateChange = (days) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + days)
    setSelectedDate(newDate)
  }

  const handleBuySubscription = () => {
    router.push("/InvestorSubcription")
  }

  const scheduleMeeting = async (timeSlot) => {
    try {
      const investorEmail = localStorage.getItem('investorEmail')
      const meetingData = {
        email1: advisor.email,
        email2: investorEmail,
        time: `${selectedDate.toISOString().split('T')[0]} ${timeSlot}`
      }

      const response = await fetch('https://dvsorwebsite.azurewebsites.net/api/create-meet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
      })

      if (response.ok) {
        alert(`Meeting scheduled for ${selectedDate.toDateString()} at ${timeSlot}`)
        setShowCalendar(false)
      } else {
        throw new Error('Failed to schedule meeting')
      }
    } catch (error) {
      console.error('Error scheduling meeting:', error)
      alert('Failed to schedule meeting. Please try again.')
    }
  }

  return (
    <div className="advisor-profile" style={{
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: "#333",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    }}>
      <div style={{ position: "relative", height: isSmallMobile ? "200px" : "300px" }}>
        <Image
          src={advisor.backgroundPicture || "/next.svg"}
          alt="Background"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        <div style={{
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
        }}>
          <Image
            src={advisor.profilePicture || "/vercel.svg"}
            alt={`${advisor.name}'s profile`}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>

      <div style={{
        marginTop: isSmallMobile ? "70px" : "85px",
        padding: isMobile ? "0 20px" : "0 50px",
        textAlign: isMobile ? "center" : "left",
        display: "flex",
        justifyContent: isMobile ? "center" : "space-between",
        alignItems: isMobile ? "center" : "flex-start",
        flexDirection: isMobile ? "column" : "row",
      }}>
        <div>
          <h1 style={{ fontSize: isSmallMobile ? "1.8rem" : "2.5rem", margin: 0, color: "#2c3e50" }}>
            {advisor.name}
          </h1>
          <h2 style={{
            fontSize: isSmallMobile ? "1.2rem" : "1.5rem",
            margin: "5px 0 15px",
            color: "#7f8c8d",
            fontWeight: 400,
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <div style={{
              width: isSmallMobile ? "24px" : "32px",
              height: isSmallMobile ? "24px" : "32px",
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0
            }}>
              <Image
                src="https://lh3.googleusercontent.com/p/AF1QipN2zraGaQxjWoE0-6lSVp8TMvVE_tuwXRh2teQ=s1360-w1360-h1020"
                alt={`${advisor.company} logo`}
                width={32}
                height={32}
                style={{ objectFit: "cover" }}
              />
            </div>
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
                  margin: "0 5px 5px 0"
                }}
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={handleScheduleClick}
          disabled={isGuest}
          style={{
            backgroundColor: isGuest ? "#bdc3c7" : "#3498db",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            fontSize: "0.9rem",
            fontWeight: 500,
            cursor: isGuest ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease",
            marginTop: isMobile ? "20px" : "0",
          }}
          onMouseOver={(e) => !isGuest && (e.currentTarget.style.backgroundColor = "#2980b9")}
          onMouseOut={(e) => !isGuest && (e.currentTarget.style.backgroundColor = "#3498db")}
          aria-label="Schedule a meeting with advisor"
        >
          Schedule a Meeting
        </button>
      </div>

      {showCalendar && !isGuest && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            width: isMobile ? "90%" : "400px",
            maxHeight: "80vh",
            overflowY: "auto"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, color: "#2c3e50" }}>Schedule Meeting</h3>
              <button
                onClick={() => setShowCalendar(false)}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: "#7f8c8d"
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <button
                  onClick={() => handleDateChange(-1)}
                  style={{
                    padding: "8px 14px",
                    backgroundColor: "#3498db",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2980b9")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#3498db")
                  }
                >
                  &lt;
                </button>

                <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {selectedDate.toDateString()}
                </span>

                <button
                  onClick={() => handleDateChange(1)}
                  style={{
                    padding: "8px 14px",
                    backgroundColor: "#3498db",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2980b9")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#3498db")
                  }
                >
                  &gt;
                </button>
              </div>
            </div>


            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => scheduleMeeting(slot)}
                  style={{
                    padding: "5px",
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease"
                  }}
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

      <div style={{
        display: "flex",
        justifyContent: isMobile ? "center" : "space-between",
        padding: isMobile ? "20px" : "30px 50px",
        backgroundColor: "white",
        margin: "30px 0",
        flexWrap: "wrap",
        gap: "20px",
      }}>
        {[
          { Icon: Award, label: "ARN", value: advisor.arn },
          { Icon: Users, label: "Clients", value: advisor.clients },
          { Icon: DollarSign, label: "AUM", value: advisor.aum },
          { Icon: Calendar, label: "Experience", value: `${advisor.experience} years` },
        ].map((stat, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", minWidth: isMobile ? "150px" : "200px" }}>
            <stat.Icon style={{ width: "24px", height: "24px", marginRight: "15px", color: "#3498db" }} />
            <div>
              <h3 style={{ margin: 0, fontSize: "0.9rem", color: "#7f8c8d" }}>{stat.label}</h3>
              <p style={{ margin: "5px 0 0", fontSize: "1.2rem", fontWeight: 600, color: "#2c3e50" }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: "flex",
        borderBottom: "1px solid #e0e0e0",
        padding: isMobile ? "0 20px" : "0 50px",
        overflowX: "auto",
        gap: "10px",
      }}>
        {["about", "services", "returns", "reviews", "video", "personal"].map((tab) => (
          <button
            key={tab}
            onClick={() => tab === "video" && !hasVideo ? null : !isGuest && setActiveTab(tab)}
            style={{
              padding: isSmallMobile ? "10px" : isMobile ? "15px" : "15px 25px",
              background: "none",
              border: "none",
              fontSize: isSmallMobile ? "0.9rem" : "1rem",
              fontWeight: 500,
              color: tab === "video" && !hasVideo ? "#bdc3c7" : isGuest ? "#bdc3c7" : activeTab === tab ? "#3498db" : "#7f8c8d",
              cursor: isGuest || (tab === "video" && !hasVideo) ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              borderBottom: !isGuest && activeTab === tab ? "3px solid #3498db" : "none",
              whiteSpace: "nowrap",
              opacity: tab === "video" && !hasVideo ? 0.6 : isGuest ? 0.6 : 1,
            }}
            disabled={isGuest || (tab === "video" && !hasVideo)}
            aria-label={`View ${tab} section`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ padding: isMobile ? "20px" : "30px 50px", minHeight: "300px" }}>
        {isGuest ? (
          <div style={{
            textAlign: "center",
            padding: "40px 0",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
          }}>
            <h3 style={{ margin: "0 0 20px 0", color: "#2c3e50" }}>
              Premium Content Locked
            </h3>
            <p style={{ margin: "0 0 20px 0", color: "#7f8c8d" }}>
              Please purchase a subscription to access detailed advisor information
            </p>
            <button
              onClick={handleBuySubscription}
              style={{
                backgroundColor: "#27ae60",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#219653")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#27ae60")}
            >
              Buy Subscription
            </button>
          </div>
        ) : (
          <>
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
                <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
                  {advisor.services.map((service, index) => (
                    <li key={index} style={{ display: "flex", alignItems: "center", backgroundColor: "white", padding: "15px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)" }}>
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
                <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row", gap: "15px" }}>
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
                  Past performance is not indicative of future results. Returns are calculated based on model portfolios and may vary for individual clients.
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 style={{ marginTop: 0, color: "#2c3e50" }}>Client Reviews</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                  {advisor.reviews.length > 0 ? advisor.reviews.map((review, index) => (
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
                        <h4 style={{ margin: 0, color: "#2c3e50" }}>{review.name}</h4>
                        <div style={{ display: "flex" }}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              style={{ width: "16px", height: "16px", color: i < review.rating ? "#f1c40f" : "#e0e0e0" }}
                            />
                          ))}
                        </div>
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  )) : (
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
                      <video
                        controls
                        style={{ width: "100%", display: "block" }}
                        poster="/placeholder.svg"
                      >
                        <source src={advisor.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p style={{ color: "#7f8c8d", lineHeight: 1.6 }}>
                      Watch this short video to learn more about my investment philosophy, approach to financial planning, and how I work with clients to achieve their financial goals.
                    </p>
                  </div>
                ) : (
                  <p style={{ color: "#7f8c8d", marginTop: "20px" }}>
                    No introductory video available at this time.
                  </p>
                )}
              </div>
            )}

            {activeTab === "personal" && (
              <div>
                <h3 style={{ marginTop: 0, color: "#2c3e50" }}>Personal Details</h3>
                <div style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  marginTop: "20px"
                }}>
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
          </>
        )}
      </div>
    </div>
  )
}