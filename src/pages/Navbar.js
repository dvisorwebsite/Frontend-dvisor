"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Detect token on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      // Detect screen size
      const handleResize = () => setIsMobile(window.innerWidth < 900);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    router.push("/");
  };

  const navItems = [
    {
      name: isLoggedIn ? "Logout" : "Login",
      link: isLoggedIn ? "#" : "/investor/login",
      onClick: isLoggedIn ? handleLogout : undefined,
    },
    // { name: "Subscription Plans", link: "/InvestorSubcription" },
    { name: "Contact Us", link: "/contact" },
  ];

  const styles = {
    header: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      width: "100%",
      backgroundColor: "#000",
    },
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 24px",
    },
    navWrap: {
      display: "flex",
      height: "60px",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      fontSize: "34px",
      fontWeight: 700,
      color: "#fff",
      textDecoration: "none",
      letterSpacing: "1px",
    },
    navLinks: {
      display: isMobile ? "none" : "flex",
      alignItems: "center",
      gap: "30px",
    },
    linkStyle: {
      color: "#fff",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: 500,
      textTransform: "uppercase",
      transition: "color 0.3s ease",
    },
    mobileMenuButton: {
      display: isMobile ? "block" : "none",
      background: "none",
      border: "none",
      padding: "10px",
      cursor: "pointer",
      color: "#fff",
    },
    mobileMenu: {
      display: isMobile && isMenuOpen ? "block" : "none",
      backgroundColor: "#000",
      position: "absolute",
      width: "100%",
      zIndex: 40,
    },
    mobileMenuContent: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    mobileLink: {
      display: "block",
      color: "#fff",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: 500,
      textTransform: "uppercase",
      padding: "10px 0",
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.navWrap}>
          {/* Logo */}
          <Link href="/" style={styles.logo}>
            DVISOR
          </Link>

          {/* Desktop Navigation */}
          <nav style={styles.navLinks}>
            {navItems.map((item, index) =>
              item.onClick ? (
                <button
                  key={index}
                  onClick={item.onClick}
                  style={{ ...styles.linkStyle, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  {item.name}
                </button>
              ) : (
                <Link key={index} href={item.link} style={styles.linkStyle}>
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Mobile Menu Icon */}
          <button
            style={styles.mobileMenuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={styles.mobileMenu}>
        <div style={styles.mobileMenuContent}>
          {navItems.map((item, index) =>
            item.onClick ? (
              <button
                key={index}
                onClick={item.onClick}
                style={{ ...styles.mobileLink, background: "none", border: "none", textAlign: "left" }}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={index}
                href={item.link}
                style={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
