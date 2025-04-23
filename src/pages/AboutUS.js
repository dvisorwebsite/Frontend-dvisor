import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div
      style={{
        padding: "60px 20px",
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
        color: "#1f2937",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          marginBottom: "80px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "800",
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "20px",
            animation: "fadeIn 1s ease-out",
          }}
        >
          About Dvisor
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "#6b7280",
            maxWidth: "800px",
            margin: "0 auto",
            opacity: 0.9,
          }}
        >
          Bridging the gap between investors and trusted financial advisors
        </p>
      </section>

      {/* Mission Section */}
      <section
        style={{
          marginBottom: "80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#3b82f6",
              marginBottom: "20px",
            }}
          >
            Our Mission
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#6b7280",
              marginBottom: "20px",
              lineHeight: "1.6",
            }}
          >
            At Dvisor, we&apos;re committed to making India the largest economy in the world by making long-term investing quick and seamless. 
            We aim to empower unsure investors by connecting them with trustworthy financial advisors.
          </p>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#6b7280",
              lineHeight: "1.6",
            }}
          >
            Our goal is to simplify the investment process while fostering trust and transparency between investors and financial experts.
          </p>
        </div>
        <div
          style={{
            position: "relative",
            height: "400px",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Image
            src="https://plus.unsplash.com/premium_photo-1719864933065-6639a2d32e56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Our mission visualization"
            fill
            style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          />
        </div>
      </section>

      {/* Values Section */}
      <section style={{ marginBottom: "80px" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#3b82f6",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          Our Values
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px",
          }}
        >
          {[
            { icon: "🤝", title: "Trust", text: "Building reliable connections between investors and advisors is at our core." },
            { icon: "💡", title: "Simplicity", text: "We make long-term investing straightforward and accessible for everyone." },
            { icon: "🌍", title: "Growth", text: "We're dedicated to driving India's economic growth through smart investments." },
            { icon: "⚡", title: "Efficiency", text: "Quick and seamless solutions define our approach to financial advising." },
            { icon: "🔒", title: "Transparency", text: "We prioritize clear, honest communication in all our services." },
          ].map((value, index) => (
            <div
              key={index}
              style={{
                padding: "25px",
                borderRadius: "15px",
                background: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
                transition: "all 0.3s ease",
                border: "1px solid rgba(0, 0, 0, 0.05)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.8)";
              }}
            >
              <span style={{ fontSize: "2rem", marginBottom: "10px", display: "block", color: "#3b82f6" }}>{value.icon}</span>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "10px" }}>{value.title}</h3>
              <p style={{ fontSize: "1rem", color: "#6b7280", opacity: 0.85 }}>{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section style={{ marginBottom: "80px" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#3b82f6",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          Our Founder
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          {[
            {
              name: "Arya Keralia",
              role: "Founder",
              text: "Arya founded Dvisor in November 2024 with a vision to transform India's investment landscape.",
              img: "https://media.licdn.com/dms/image/v2/D4D03AQH3DJn6x5I5Eg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1712831340887?e=1749686400&v=beta&t=sc8USspIltW0AFxczXxdmTmfxPdLt9FjZxBsQF2J8cY",
            },
          ].map((member, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                padding: "20px",
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "15px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div
                style={{
                  position: "relative",
                  width: "200px",
                  height: "200px",
                  margin: "0 auto 20px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid #3b82f6",
                }}
              >
                <Image src={member.img} alt={member.name} fill style={{ objectFit: "cover" }} />
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "600" }}>{member.name}</h3>
              <p style={{ color: "#3b82f6", fontWeight: "500", margin: "5px 0 10px" }}>{member.role}</p>
              <p style={{ fontSize: "0.95rem", color: "#6b7280", opacity: 0.85 }}>{member.text}</p>
            </div>
          ))}
        </div>
      </section>


      {/* CTA Section */}
      <section
        style={{
          textAlign: "center",
          padding: "60px",
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "20px",
          border: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#3b82f6",
            marginBottom: "20px",
          }}
        >
          Ready to Invest Smarter?
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#6b7280",
            marginBottom: "30px",
            maxWidth: "600px",
            margin: "0 auto 30px",
          }}
        >
          Let us connect you with trusted advisors to make your investment journey seamless and successful.
        </p>
      </section>

      {/* Keyframes for animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}