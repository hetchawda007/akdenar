import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaXTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube
} from 'react-icons/fa6';

function Footer() {

    const footerLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "#" },
        { name: "Our Portfolio", href: "#" },
        { name: "Explore Groceries", href: "#" },
        { name: "Investor Relations", href: "#" },
        { name: "Life at KRBL", href: "#" },
        { name: "Leadership", href: "#" },
        { name: "News & Media", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Use", href: "#" },
    ];

    const socialLinks = [
        { Icon: FaFacebookF, href: "#" },
        { Icon: FaXTwitter, href: "#" },
        { Icon: FaInstagram, href: "#" },
        { Icon: FaLinkedinIn, href: "#" },
        { Icon: FaYoutube, href: "#" },
    ];

    const [currentYear] = useState(new Date().getFullYear());
    const [hoveredLink, setHoveredLink] = useState(null);
    const [hoveredSocial, setHoveredSocial] = useState(null);

    return (
        <footer className="bg-dark text-white py-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link to="/" className="text-decoration-none">
                                <h2 className="text-white fw-bold mb-4">
                                    <span className="text-primary">E</span>Akdenar
                                </h2>
                            </Link>

                            <p className="mb-4 text-light">
                                India's premier goods provider bringing quality products directly to your doorstep since 2010.
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
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            backgroundColor: hoveredSocial === index ? "#3a7bfc" : "rgba(255, 255, 255, 0.1)",
                                            color: hoveredSocial === index ? "#fff" : "#3a7bfc",
                                            transition: "background-color 0.2s, color 0.2s"
                                        }}
                                    >
                                        <social.Icon size={16} />
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
                            <h5 className="fw-bold mb-4 text-white">Products</h5>
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
                                            className="text-decoration-none d-block py-1"
                                            style={{
                                                color: hoveredLink === `product-${index}` ? "#3a7bfc" : "#adb5bd",
                                                transition: "color 0.2s",
                                                transform: hoveredLink === `product-${index}` ? "translateX(5px)" : "translateX(0)",
                                                transition: "transform 0.2s, color 0.2s"
                                            }}
                                        >
                                            {item}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    <div className="col-lg-2 col-md-6 col-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h5 className="fw-bold mb-4 text-white">Company</h5>
                            <ul className="list-unstyled mb-0">
                                {footerLinks.slice(1, 6).map((link, index) => (
                                    <motion.li
                                        key={index}
                                        className="mb-2"
                                        onHoverStart={() => setHoveredLink(`company-${index}`)}
                                        onHoverEnd={() => setHoveredLink(null)}
                                    >
                                        <Link
                                            to={link.href}
                                            className="text-decoration-none d-block py-1"
                                            style={{
                                                color: hoveredLink === `company-${index}` ? "#3a7bfc" : "#adb5bd",
                                                transform: hoveredLink === `company-${index}` ? "translateX(5px)" : "translateX(0)",
                                                transition: "transform 0.2s, color 0.2s"
                                            }}
                                        >
                                            {link.name}
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
                            <h5 className="fw-bold mb-4 text-white">Contact</h5>
                            <ul className="list-unstyled mb-4">
                                <li className="mb-3 d-flex">
                                    <span className="me-3 text-primary">📍</span>
                                    <span className="text-light">5190, Lahori Gate, Delhi - 110006, India</span>
                                </li>
                                <li className="mb-3 d-flex">
                                    <span className="me-3 text-primary">📞</span>
                                    <span className="text-light">+91-8448893199</span>
                                </li>
                                <li className="mb-3 d-flex">
                                    <span className="me-3 text-primary">✉️</span>
                                    <a href="mailto:customercare@Akdenar.com" className="text-light text-decoration-none">
                                        customercare@Akdenar.com
                                    </a>
                                </li>
                            </ul>

                            <h6 className="fw-bold mb-3 text-white">Subscribe to our newsletter</h6>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control bg-dark border-secondary text-light" placeholder="Your Email" />
                                <button className="btn btn-primary" type="button">Subscribe</button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.hr
                    initial={{ opacity: 0, width: "0%" }}
                    whileInView={{ opacity: 1, width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="my-4 border-secondary"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="row align-items-center"
                >
                    <div className="col-md-6 text-center text-md-start">
                        <p className="mb-0 text-light">
                            © {currentYear} Akdenar Products. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 mt-3 mt-md-0">
                        <ul className="list-inline mb-0 text-center text-md-end">
                            {footerLinks.map((link, index) => (
                                <li key={index} className="list-inline-item">
                                    <Link
                                        to={link.href}
                                        className="text-light text-decoration-none small"
                                        style={{ fontSize: "0.85rem" }}
                                    >
                                        {link.name}
                                    </Link>
                                    {index < footerLinks.length - 1 && <span className="mx-2 text-secondary">•</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}

export default Footer