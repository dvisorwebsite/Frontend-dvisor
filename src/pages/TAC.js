import Link from "next/link";

export default function TermsAndConditions() {
  // Define reusable styles with enhanced design
  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "3rem 1.5rem",
      fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: "#2d3748",
      lineHeight: "1.7",
      backgroundColor: "#f9fafb",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem",
      paddingBottom: "1.5rem",
      borderBottom: "1px solid #e2e8f0",
    },
    heading1: {
      fontSize: "2.75rem",
      fontWeight: "700",
      marginBottom: "1rem",
      color: "#1a202c",
      letterSpacing: "-0.025em",
    },
    heading2: {
      fontSize: "1.75rem",
      fontWeight: "600",
      marginTop: "2.5rem",
      marginBottom: "1.25rem",
      color: "#1a202c",
      position: "relative",
      paddingBottom: "0.5rem",
    },
    effectiveDate: {
      fontStyle: "italic",
      fontSize: "1.1rem",
      marginBottom: "1rem",
      color: "#718096",
    },
    section: {
      marginBottom: "2rem",
      padding: "1rem",
      backgroundColor: "#fff",
      borderRadius: "0.375rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    paragraph: {
      marginBottom: "1rem",
      fontSize: "1rem",
      color: "#4a5568",
    },
    list: {
      paddingLeft: "1.5rem",
      marginBottom: "1rem",
      listStyleType: "disc",
    },
    listItem: {
      marginBottom: "0.75rem",
      color: "#4a5568",
    },
    footer: {
      marginTop: "4rem",
      paddingTop: "2rem",
      borderTop: "1px solid #e2e8f0",
      textAlign: "center",
    },
    backButton: {
      display: "inline-block",
      marginTop: "2rem",
      padding: "0.875rem 2rem",
      backgroundColor: "#3182ce",
      color: "white",
      borderRadius: "0.5rem",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "1rem",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    backButtonHover: {
      backgroundColor: "#2b6cb0",
      transform: "translateY(-2px)",
    },
  };

  // Add current date dynamically
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading1}>Terms and Conditions for Dvisor</h1>
        <p style={styles.effectiveDate}>Effective Date: {currentDate}</p>
      </header>

      <section style={styles.section}>
        <h2 style={styles.heading2}>1. Introduction</h2>
        <p style={styles.paragraph}>
          Welcome to Dvisor! These Terms and Conditions ("Terms") govern your use of our website{" "}
          <a href="http://www.dvisor.in" style={{ color: "#3182ce", textDecoration: "underline" }}>
            www.dvisor.in
          </a>{" "}
          and any related services provided by Dvisor (collectively, the "Services"). By accessing or using our Services,
          you agree to be bound by these Terms. If you disagree with any part, we kindly ask you to refrain from using our Services.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading2}>2. Definitions</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <strong>"Dvisor," "we," "our," "us":</strong> Refers to [Your Company Name], the provider of these Services.
          </li>
          <li style={styles.listItem}>
            <strong>"User," "you," "your":</strong> Refers to anyone accessing or utilizing our Services.
          </li>
          <li style={styles.listItem}>
            <strong>"Content":</strong> Includes all text, graphics, images, software, and materials available through the Services.
          </li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading2}>3. Use of Services</h2>
        <p style={styles.paragraph}>
          You agree to use our Services responsibly and lawfully, adhering to these Terms. Prohibited activities include:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Violating any applicable laws or regulations.</li>
          <li style={styles.listItem}>Infringing on intellectual property rights of Dvisor or others.</li>
          <li style={styles.listItem}>Engaging in fraudulent or deceptive practices.</li>
          <li style={styles.listItem}>Transmitting viruses or malicious code that could harm the Services.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading2}>4. Account Registration</h2>
        <p style={styles.paragraph}>
          Certain features may require an account. When registering, you agree to:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Provide accurate and complete information.</li>
          <li style={styles.listItem}>Keep your account credentials secure.</li>
          <li style={styles.listItem}>Report any unauthorized use or security breaches promptly.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading2}>5. Intellectual Property Rights</h2>
        <p style={styles.paragraph}>
          All Content on Dvisor, including text, graphics, logos, and code, is our intellectual property, protected by copyright and trademark laws. Unauthorized use or reproduction is prohibited.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading2}>6. Privacy Policy</h2>
        <p style={styles.paragraph}>
          Our{" "}
          <Link href="/privacy-policy" style={{ color: "#3182ce", textDecoration: "underline" }}>
            Privacy Policy
          </Link>{" "}
          governs how we handle your data. By using our Services, you consent to these practices.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading2}>7. Limitation of Liability</h2>
        <p style={styles.paragraph}>
          Dvisor is not liable for indirect, incidental, or consequential damages, including loss of profits or data, arising from:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Your use or inability to use the Services.</li>
          <li style={styles.listItem}>Unauthorized access to our servers.</li>
          <li style={styles.listItem}>Service interruptions.</li>
          <li style={styles.listItem}>Third-party transmitted bugs or viruses.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading2}>8. Indemnification</h2>
        <p style={styles.paragraph}>
          You agree to indemnify Dvisor and its affiliates against claims arising from your use of the Services, violation of these Terms, or infringement of third-party rights.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading2}>9. Termination</h2>
        <p style={styles.paragraph}>
          We may terminate your access to the Services at our discretion, without notice, if we believe you’ve violated these Terms or harmed others.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading2}>10. Governing Law</h2>
        <p style={styles.paragraph}>
          These Terms are governed by the laws of [Your Country/State], with disputes resolved in [Your Jurisdiction] courts.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading2}>11. Changes to Terms</h2>
        <p style={styles.paragraph}>
          We may update these Terms, notifying you via our website. Continued use signifies acceptance of the revised Terms.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading2}>12. Contact Information</h2>
        <p style={styles.paragraph}>Questions? Reach out to us at:</p>
        <div style={{ marginLeft: "1rem" }}>
          <p style={styles.paragraph}>[Your Company Name]</p>
          <p style={styles.paragraph}>[Your Company Address]</p>
          <p style={styles.paragraph}>
            Email: <a href="mailto:[Your Contact Email]" style={{ color: "#3182ce" }}>[Your Contact Email]</a>
          </p>
          <p style={styles.paragraph}>Phone: [Your Contact Phone Number]</p>
        </div>
      </section>

      <footer style={styles.footer}>
        <p style={styles.paragraph}>
          By using Dvisor, you agree to these Terms and Conditions.
        </p>
        <Link
          href="/"
          style={styles.backButton}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.backButtonHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, styles.backButton)}
        >
          Back to Home
        </Link>
      </footer>
    </div>
  );
}