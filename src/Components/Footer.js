import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaXTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaLocationDot,
    FaPhoneFlip,
    FaEnvelope
} from 'react-icons/fa6';

function Footer() {

    const footerLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Products", href: "/category" },
        { name: "Contact", href: "/contact" },
        { name: "FAQ", href: "/contact" },
    ];

    const socialLinks = [
        { Icon: FaFacebookF, href: "https://www.facebook.com/share/1AmuCTSfNp/" },
        { Icon: FaInstagram, href: "https://www.instagram.com/akdenar/" },
        { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/akdenar2" },
        { Icon: FaYoutube, href: "https://www.youtube.com/@Akdenar" },
    ];

    const [currentYear] = useState(new Date().getFullYear());
    const [hoveredLink, setHoveredLink] = useState(null);
    const [hoveredSocial, setHoveredSocial] = useState(null);

    return (
        <footer className="py-5" style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 -5px 15px rgba(0, 0, 0, 0.1)"
        }}>
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="pe-lg-4"
                        >
                            <Link to="/" className="text-decoration-none">
                                <h2 className="text-white fw-bold mb-4" style={{
                                    background: "linear-gradient(90deg, #3a7bfc, #6e9fff)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}>
                                    Akdenar
                                </h2>
                            </Link>

                            <p className="mb-4" style={{ color: "#d1d5db", lineHeight: "1.7" }}>
                                India's premier goods provider bringing quality products directly to your doorstep since 2024.
                            </p>

                            <div className="d-flex gap-3 mb-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onHoverStart={() => setHoveredSocial(index)}
                                        onHoverEnd={() => setHoveredSocial(null)}
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.2 }}
                                        className="d-inline-flex align-items-center justify-content-center"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            backgroundColor: hoveredSocial === index ? "#3a7bfc" : "rgba(255, 255, 255, 0.08)",
                                            color: hoveredSocial === index ? "#fff" : "#fff",
                                            transition: "all 0.3s ease",
                                            boxShadow: hoveredSocial === index ? "0 5px 15px rgba(58, 123, 252, 0.4)" : "none"
                                        }}
                                    >
                                        <social.Icon size={18} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="col-lg-2 col-md-6 col-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h5 className="fw-bold mb-4" style={{
                                color: "#fff",
                                position: "relative",
                                paddingBottom: "10px"
                            }}>
                                <span style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    width: "30px",
                                    height: "3px",
                                    background: "#3a7bfc",
                                    borderRadius: "3px"
                                }}></span>
                                Products
                            </h5>
                            <ul className="list-unstyled mb-0">
                                {["Rice", "Salt", "Sugar", "Spices", "Dry Fruits", "Oil"].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        className="mb-2"
                                        onHoverStart={() => setHoveredLink(`product-${index}`)}
                                        onHoverEnd={() => setHoveredLink(null)}
                                    >
                                        <Link
                                            to={`/category/${item.toLowerCase()}`}
                                            className="text-decoration-none d-flex align-items-center py-1"
                                            style={{
                                                color: hoveredLink === `product-${index}` ? "#3a7bfc" : "#d1d5db",
                                                transform: hoveredLink === `product-${index}` ? "translateX(8px)" : "translateX(0)",
                                                transition: "all 0.3s ease"
                                            }}
                                        >
                                            <span style={{
                                                opacity: hoveredLink === `product-${index}` ? 1 : 0,
                                                marginRight: "8px",
                                                transition: "opacity 0.3s ease"
                                            }}>›</span>
                                            {item}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h5 className="fw-bold mb-4" style={{
                                color: "#fff",
                                position: "relative",
                                paddingBottom: "10px"
                            }}>
                                <span style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    width: "30px",
                                    height: "3px",
                                    background: "#3a7bfc",
                                    borderRadius: "3px"
                                }}></span>
                                Contact
                            </h5>
                            <ul className="list-unstyled mb-4">
                                <motion.li
                                    className="mb-3"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="d-flex align-items-center">
                                        <div style={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            backgroundColor: "rgba(58, 123, 252, 0.15)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: "15px"
                                        }}>
                                            <FaLocationDot size={16} color="#3a7bfc" />
                                        </div>                                        <a href="https://maps.google.com/?q=Third Floor, 69, New Manglapuri, New Delhi, Delhi 110030, India"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: "#d1d5db", lineHeight: "1.5", textDecoration: "none", transition: "color 0.3s ease" }}
                                            className="hover-effect"
                                            onMouseOver={(e) => e.target.style.color = "#3a7bfc"}
                                            onMouseOut={(e) => e.target.style.color = "#d1d5db"}
                                        >
                                            Third Floor, 69, New Manglapuri, New Delhi, Delhi 110030, India
                                        </a>
                                    </div>
                                </motion.li>                                <motion.li
                                    className="mb-3"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="d-flex align-items-center">
                                        <div style={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            backgroundColor: "rgba(58, 123, 252, 0.15)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: "15px"
                                        }}>
                                            <FaPhoneFlip size={16} color="#3a7bfc" />
                                        </div>
                                        <a href="tel:+919220852922"
                                            style={{ color: "#d1d5db", textDecoration: "none", transition: "color 0.3s ease" }}
                                            className="hover-effect"
                                            onMouseOver={(e) => e.target.style.color = "#3a7bfc"}
                                            onMouseOut={(e) => e.target.style.color = "#d1d5db"}
                                        >
                                            +91-92208 52922
                                        </a>
                                    </div>
                                </motion.li>
                                <motion.li
                                    className="mb-3"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="d-flex align-items-center">
                                        <div style={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            backgroundColor: "rgba(58, 123, 252, 0.15)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: "15px"
                                        }}>
                                            <FaEnvelope size={16} color="#3a7bfc" />
                                        </div>
                                        <a href="mailto:customercare@akdenar.com"
                                            style={{ color: "#d1d5db", textDecoration: "none", transition: "color 0.3s ease" }}
                                            className="hover-effect"
                                            onMouseOver={(e) => e.target.style.color = "#3a7bfc"}
                                            onMouseOut={(e) => e.target.style.color = "#d1d5db"}
                                        >
                                            support@akdenar.com
                                        </a>
                                    </div>
                                </motion.li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, width: "0%" }}
                    whileInView={{ opacity: 1, width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="my-4"
                    style={{
                        height: "1px",
                        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)"
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="row align-items-center"
                >
                    <div className="col-md-6 text-center text-md-start">
                        <p className="mb-0" style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                            © {currentYear} <span style={{ color: "#d1d5db" }}>Akdenar Products</span>. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 mt-3 mt-md-0">
                        <ul className="list-inline mb-0 text-center text-md-end">
                            {footerLinks.map((link, index) => (
                                <li key={index} className="list-inline-item">
                                    <Link
                                        to={link.href}
                                        className="text-decoration-none"
                                        style={{
                                            color: "#9ca3af",
                                            fontSize: "0.85rem",
                                            transition: "color 0.3s ease"
                                        }}
                                        onMouseOver={(e) => e.target.style.color = "#3a7bfc"}
                                        onMouseOut={(e) => e.target.style.color = "#9ca3af"}
                                    >
                                        {link.name}
                                    </Link>
                                    {index < footerLinks.length - 1 && <span className="mx-2" style={{ color: "#4b5563", fontSize: "0.8rem" }}>•</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}

export default Footer;