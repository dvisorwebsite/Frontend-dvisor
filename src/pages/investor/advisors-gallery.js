"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import Navbar from "../Navbar"

export default function AdvisorsGallery() {
    const [advisors, setAdvisors] = useState([])
    const [randomAdvisors, setRandomAdvisors] = useState([])

    useEffect(() => {
        const fetchAdvisors = async () => {
            try {
                const response = await fetch("https://dvsorwebsite.azurewebsites.net/api/advisorinfo")
                const data = await response.json()
                
                const advisorsArray = Array.isArray(data) ? data : (data.advisors || []);
                
                const transformedData = advisorsArray.map(advisor => ({
                    id: advisor._id,
                    name: advisor.name,
                    image: advisor.profilePicture,
                    experience: `${advisor.experienceYears} years`,
                    clients: `${advisor.numberOfClients}+ clients`,
                    experienceYears: advisor.experienceYears
                }))
                
                const storedCriteria = JSON.parse(localStorage.getItem('investmentCriteria') || '{}')
                const preferredExperience = storedCriteria.advisorExperience || ""

                const getExperienceRange = (range) => {
                    switch(range) {
                        case "20 years +": return { min: 20, max: Infinity }
                        case "15 years - 20 years": return { min: 15, max: 20 }
                        case "10 years - 15 years": return { min: 10, max: 15 }
                        case "5 years - 10 years": return { min: 5, max: 10 }
                        case "3 years - 5 years": return { min: 3, max: 5 }
                        default: return { min: 0, max: Infinity }
                    }
                }

                const { min, max } = getExperienceRange(preferredExperience)

                const filteredAdvisors = transformedData
                    .filter(advisor => 
                        advisor.experienceYears >= min && 
                        advisor.experienceYears <= max
                    )
                    .sort((a, b) => b.experienceYears - a.experienceYears)

                const finalAdvisors = filteredAdvisors.length > 0 
                    ? filteredAdvisors 
                    : [...transformedData].sort((a, b) => b.experienceYears - a.experienceYears)
                
                setAdvisors(finalAdvisors)
                
                const shuffledAdvisors = [...transformedData].sort(() => Math.random() - 0.5)
                setRandomAdvisors(shuffledAdvisors)
                
                console.log("Transformed Data", transformedData)
            } catch (error) {
                console.error("Error fetching advisors:", error)
            }
        }

        fetchAdvisors()
    }, [])

    const handleCardClick = (advisorId) => {
        localStorage.setItem('selectedAdvisorId', advisorId)
    }

    const sliderStyles = {
        display: 'flex',
        overflowX: 'auto',
        gap: '2rem',
        padding: '1rem',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
    }

    sliderStyles['::-webkit-scrollbar'] = {
        display: 'none'
    }

    const sectionStyles = {
        marginBottom: '3rem',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1rem'
    }

    return (
        <> 
        <Navbar />
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem'
        }}>
            <h1 style={{
                textAlign: 'center',
                marginBottom: '1rem',
                color: '#333',
                fontSize: '2.5rem'
            }}>
                Our Financial Advisors
            </h1>
            <p style={{
                textAlign: 'center',
                marginBottom: '3rem',
                color: '#666',
                maxWidth: '800px',
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: '1.1rem'
            }}>
                Browse our experienced financial advisors and find the right match for your investment needs
            </p>

            <div style={sectionStyles}>
                <h2 style={{ marginBottom: '1rem', color: '#333' }}>Advisor&apos;s Recommendation</h2>
                <div style={sliderStyles}>
                    {advisors.map((advisor) => (
                        <Link 
                            href={`/advisor/AdvisorProfile`} 
                            key={advisor.id}
                            style={{ textDecoration: 'none', minWidth: '280px' }}
                            onClick={() => handleCardClick(advisor.id)}
                        >
                            <div 
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                <div 
                                    style={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        height: '300px'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.querySelector('.overlay').style.transform = 'translateY(0)'}
                                    onMouseLeave={(e) => e.currentTarget.querySelector('.overlay').style.transform = 'translateY(100%)'}
                                >
                                    <Image
                                        src={advisor.image || "/placeholder.svg"}
                                        alt={`${advisor.name} - Financial Advisor`}
                                        width={300}
                                        height={300}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }}
                                    />
                                    <div 
                                        className="overlay"
                                        style={{
                                            position: 'absolute',
                                            bottom: '0',
                                            left: '0',
                                            right: '0',
                                            background: 'rgba(0, 0, 0, 0.8)',
                                            color: 'white',
                                            padding: '1.5rem',
                                            transform: 'translateY(100%)',
                                            transition: 'transform 0.3s ease',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.75rem'
                                        }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: '0.95rem'
                                        }}>
                                            <span style={{ fontWeight: 600, color: '#ccc' }}>Experience:</span>
                                            <span style={{ color: 'white' }}>{advisor.experience}</span>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: '0.95rem'
                                        }}>
                                            <span style={{ fontWeight: 600, color: '#ccc' }}>Clients:</span>
                                            <span style={{ color: 'white' }}>{advisor.clients}</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 style={{
                                    padding: '1rem',
                                    textAlign: 'center',
                                    fontSize: '1.25rem',
                                    fontWeight: 600,
                                    color: '#333',
                                    backgroundColor: 'white'
                                }}>
                                    {advisor.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div style={sectionStyles}>
                <h2 style={{ marginBottom: '1rem', color: '#333' }}>Explore Advisors</h2>
                <div style={sliderStyles}>
                    {randomAdvisors.map((advisor) => (
                        <Link 
                            href={`/advisor/AdvisorProfile`} 
                            key={advisor.id}
                            style={{ textDecoration: 'none', minWidth: '280px' }}
                            onClick={() => handleCardClick(advisor.id)}
                        >
                            <div 
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                <div 
                                    style={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        height: '300px'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.querySelector('.overlay').style.transform = 'translateY(0)'}
                                    onMouseLeave={(e) => e.currentTarget.querySelector('.overlay').style.transform = 'translateY(100%)'}
                                >
                                    <Image
                                        src={advisor.image || "/placeholder.svg"}
                                        alt={`${advisor.name} - Financial Advisor`}
                                        width={300}
                                        height={300}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }}
                                    />
                                    <div 
                                        className="overlay"
                                        style={{
                                            position: 'absolute',
                                            bottom: '0',
                                            left: '0',
                                            right: '0',
                                            background: 'rgba(0, 0, 0, 0.8)',
                                            color: 'white',
                                            padding: '1.5rem',
                                            transform: 'translateY(100%)',
                                            transition: 'transform 0.3s ease',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.75rem'
                                        }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: '0.95rem'
                                        }}>
                                            <span style={{ fontWeight: 600, color: '#ccc' }}>Experience:</span>
                                            <span style={{ color: 'white' }}>{advisor.experience}</span>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: '0.95rem'
                                        }}>
                                            <span style={{ fontWeight: 600, color: '#ccc' }}>Clients:</span>
                                            <span style={{ color: 'white' }}>{advisor.clients}</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 style={{
                                    padding: '1rem',
                                    textAlign: 'center',
                                    fontSize: '1.25rem',
                                    fontWeight: 600,
                                    color: '#333',
                                    backgroundColor: 'white'
                                }}>
                                    {advisor.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}