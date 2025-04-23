import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Avatar } from '@mui/material';
import Image from 'next/image';

const Dashboard = () => {
  return (
    <Container 
      fluid 
      style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #eef2f6 100%)',
        minHeight: '100vh',
        padding: '30px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header */}
      <Row 
        style={{
          background: '#ffffff',
          borderRadius: '15px',
          padding: '20px 30px',
          marginBottom: '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          alignItems: 'center',
        }}
      >
        <Col>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Image 
                src="/calendar-icon.png" 
                alt="Calendar" 
                style={{ width: '35px', height: '35px', objectFit: 'contain' }} 
              />
              <h2 style={{ 
                color: '#1e293b',
                fontSize: '28px',
                fontWeight: '700',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>
                Advisor Portal
              </h2>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              flexWrap: 'wrap'
            }}>
              {['Dashboard', 'Clients', 'Calendar', 'Reports'].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{ 
                    color: '#64748b',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'transparent'
                  }}
                  onMouseOver={e => {
                    e.target.style.backgroundColor = '#f1f5f9';
                    e.target.style.color = '#2563eb';
                  }}
                  onMouseOut={e => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#64748b';
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {/* Stats Cards - Side by Side */}
      <Row style={{ marginBottom: '30px' }}>
        <Col>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            background: '#ffffff',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 6px 15px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.04)';
          }}>
            {[
              { title: 'Total Meetings', value: '24', change: '+5 from last week', color: '#22c55e', icon: '📅' },
              { title: "Today's Meetings", value: '4', change: '2 remaining', color: '#06b6d4', icon: '⏰' },
              { title: 'Total Clients', value: '18', change: '+2 new this month', color: '#3b82f6', icon: '👥' },
              { title: 'Avg. Duration', value: '45m', change: '-5m from last month', color: '#ef4444', icon: '⏳' }
            ].map((stat, index) => (
              <div 
                key={index}
                style={{
                  flex: '1',
                  minWidth: '200px',
                  textAlign: 'center'
                }}
              >
                <div style={{ 
                  fontSize: '30px',
                  marginBottom: '15px',
                  color: stat.color
                }}>
                  {stat.icon}
                </div>
                <div style={{ 
                  color: '#64748b',
                  fontSize: '15px',
                  fontWeight: '500',
                  marginBottom: '12px'
                }}>
                  {stat.title}
                </div>
                <div style={{ 
                  color: '#1e293b',
                  fontSize: '36px',
                  fontWeight: '700',
                  marginBottom: '12px'
                }}>
                  {stat.value}
                </div>
                <div style={{ 
                  color: stat.color,
                  fontSize: '13px',
                  fontWeight: '500',
                  backgroundColor: `${stat.color}15`,
                  padding: '5px 12px',
                  borderRadius: '12px',
                  display: 'inline-block'
                }}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      {/* Tabs */}
      <Row style={{ marginBottom: '30px' }}>
        <Col>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {['Upcoming Meetings','Calendar View'].map((tab, index) => (
              <Button 
                key={tab}
                style={{ 
                  borderRadius: '10px',
                  padding: '10px 25px',
                  fontSize: '15px',
                  fontWeight: '600',
                  border: '2px solid #3b82f6',
                  backgroundColor: index === 0 ? '#3b82f6' : 'transparent',
                  color: index === 0 ? '#ffffff' : '#3b82f6',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}
                onMouseOver={e => {
                  if (index !== 0) {
                    e.target.style.backgroundColor = '#dbeafe';
                  } else {
                    e.target.style.backgroundColor = '#2563eb';
                  }
                }}
                onMouseOut={e => {
                  if (index !== 0) {
                    e.target.style.backgroundColor = 'transparent';
                  } else {
                    e.target.style.backgroundColor = '#3b82f6';
                  }
                }}
              >
                {tab}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Main Content */}
      <Row>
        <Col md={8} style={{ marginBottom: '30px' }}>
          <Card style={{
            background: '#ffffff',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: 'none'
          }}>
            <Card.Body style={{ padding: '30px' }}>
              <h4 style={{ 
                color: '#1e293b',
                fontSize: '22px',
                fontWeight: '700',
                marginBottom: '25px'
              }}>
                Upcoming Meetings
              </h4>
              <p style={{ 
                color: '#64748b',
                fontSize: '15px',
                marginBottom: '25px'
              }}>
                You have 4 meetings scheduled for today.
              </p>
              {[
                { name: 'Sarah Johnson', time: '10:00 AM - 10:45 AM' },
                { name: 'Michael Chen', time: '11:30 AM - 12:15 PM' },
                { name: 'Emily Rodriguez', time: '2:00 PM - 2:45 PM' }
              ].map((meeting) => (
                <div 
                  key={meeting.name}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '15px',
                    padding: '15px',
                    borderRadius: '12px',
                    backgroundColor: '#f8fafc',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                >
                  <Avatar style={{ 
                    marginRight: '15px',
                    width: '45px',
                    height: '45px',
                    backgroundColor: '#3b82f6',
                    fontSize: '18px'
                  }}>
                    {meeting.name[0]}
                  </Avatar>
                  <div>
                    <p style={{ 
                      color: '#1e293b',
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      {meeting.name}
                    </p>
                    <p style={{ 
                      color: '#64748b',
                      fontSize: '14px',
                      margin: 0
                    }}>
                      {meeting.time}
                    </p>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;