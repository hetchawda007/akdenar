import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaBars, FaTimes, FaChevronDown, FaChevronRight, FaShoppingBasket } from "react-icons/fa";
import { catalogs } from "../App";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Update the navigation links to use /category instead of /category
  const navigation = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/category" }, // Changed from /category to /category
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Testimonials", path: "/testimonials" },
  ];

  // Rotating announcement text
  const announcements = [
    "Serving India's Basic Needs",
    "Spices | Rice | Sugar | Salt | Dry Fruits",
    "Premium quality products | Nationwide shipping available",
    "Quality-assured products | Custumoized solutions for businesses",
    "Explore our range of organic products | Available now",
    "Bulk orders available | Customer satisfaction guaranteed",
    "Explore our wide range of products | Get a quote today!"
  ];
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle announcement rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
        setIsAnimating(false);
      }, 600); // Slightly longer for smoother transition
    }, 5000); // Increased to 5 seconds to give users more time to read

    return () => clearInterval(timer);
  }, []);

  // Handle scroll detection with enhanced threshold and behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 10;
      if (window.scrollY > scrollThreshold) {
        if (!isScrolled) setIsScrolled(true);
      } else {
        if (isScrolled) setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchFocused(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleProductHover = (index) => {
    setHoveredProduct(index);
  };

  return (
    <header className={`fixed-top ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top announcement bar */}
      <div className="announcement-bar py-2 text-center text-white">
        <div className="container">
          <div className="announcement-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAnnouncement}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="announcement-text"
              >
                {announcements[currentAnnouncement]}

                <div className="announcement-indicators">
                  {announcements.map((_, index) => (
                    <span
                      key={index}
                      className={`indicator ${currentAnnouncement === index ? 'active' : ''}`}
                      onClick={() => {
                        setIsAnimating(true);
                        setTimeout(() => {
                          setCurrentAnnouncement(index);
                          setIsAnimating(false);
                        }, 300);
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="header-container">
        {/* Main navbar */}
        <nav className={`navbar navbar-expand-lg ${isScrolled ? 'navbar-scrolled' : ''}`}>          <div className="container-fluid px-2 px-sm-3 px-md-4">
          {/* Logo */}
          <Link className="navbar-brand me-0 me-lg-4" to="/">
            <motion.div
              className="logo-container"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/logo.webp"
                alt="Akdenar Logo"
                style={{ height: "70px", width: "70px" }}
                className="brand-logo"
                onError={(e) => {
                  e.target.src = "/logo.webp";
                }}
              />
              <div className="brand-text">
                <span className="brand-name">Akdenar</span>
                <span className="brand-tagline">Premium Quality Products</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Search Bar - Modified to have consistent width */}            <div className="search-container d-none d-lg-block flex-shrink-0 mx-2">
            <form onSubmit={handleSearch}>
              <div className={`search-input-wrapper ${searchFocused ? 'focused' : ''}`}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="search-input"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <motion.button
                  type="submit"
                  className="search-button"
                >
                  <FaSearch />
                </motion.button>
              </div>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? 'close' : 'menu'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Desktop Menu */}            <div className="desktop-menu d-none d-lg-flex flex-grow-1 justify-content-end">
            <ul className="navbar-nav ms-auto align-items-center flex-nowrap">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  to="/"
                >
                  Home
                  {location.pathname === '/' && (
                    <motion.div
                      className="nav-indicator"
                      layoutId="navIndicator"
                    />
                  )}
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link style={{ textDecoration: "none" }} to={"/category"}>
                  <div
                    className={`nav-link dropdown-toggle ${catalogs.some(c => location.pathname.includes(`/category/${c.name.toLowerCase().replace(/\s/g, '-')}`)) ? 'active' : ''}`}
                    onMouseEnter={() => setActiveDropdown('products')}
                    onMouseLeave={() => {
                      // Use setTimeout to prevent immediate closing when moving to dropdown content
                      setTimeout(() => {
                        if (!document.querySelector('.products-dropdown:hover')) {
                          setActiveDropdown(null);
                        }
                      }, 100);
                    }}
                  >
                    Products
                    {catalogs.some(c => location.pathname.includes(`/category/${c.name.toLowerCase().replace(/\s/g, '-')}`)) && (
                      <motion.div
                        className="nav-indicator"
                        layoutId="navIndicator"
                      />
                    )}
                  </div>
                </Link>
                <AnimatePresence>
                  {activeDropdown === 'products' && (
                    <motion.div
                      className="dropdown-menu products-dropdown show"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setActiveDropdown('products')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="row">
                        <div className="col-5 product-list">
                          {catalogs.map((category, index) => (
                            <Link
                              key={index}
                              className={`dropdown-item ${hoveredProduct === index ? 'active' : ''}`}
                              to={`/category/${category.name.toLowerCase().replace(/\s/g, '-')}`}
                              onMouseEnter={() => handleProductHover(index)}
                            >
                              <div className="d-flex align-items-center">
                                <span
                                  className="dropdown-color-indicator me-2"
                                  style={{ backgroundColor: category.colors[0] }}
                                ></span>
                                {category.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="col-7 product-preview">
                          {hoveredProduct !== null && (
                            <motion.div
                              className="preview-content"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="preview-image-container mb-3">
                                <img
                                  src={catalogs[hoveredProduct].image}
                                  alt={catalogs[hoveredProduct].name}
                                  className="preview-image"
                                />
                              </div>
                              <h6 className="preview-title">{catalogs[hoveredProduct].name}</h6>
                              <p className="preview-subtitle mb-2 small text-muted">
                                {catalogs[hoveredProduct].categories.length} varieties available
                              </p>
                              <div className="categories-preview">
                                {catalogs[hoveredProduct].categories.slice(0, 3).map((category, idx) => (
                                  <span key={idx} className="category-badge me-1">
                                    {category.name}
                                  </span>
                                ))}
                                {catalogs[hoveredProduct].categories.length > 3 && (
                                  <span className="category-badge more">+{catalogs[hoveredProduct].categories.length - 3}</span>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                  to="/about"
                >
                  About
                  {location.pathname === '/about' && (
                    <motion.div
                      className="nav-indicator"
                      layoutId="navIndicator"
                    />
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/testimonials' ? 'active' : ''}`}
                  to="/testimonials"
                >
                  Testimonials
                  {location.pathname === '/testimonials' && (
                    <motion.div
                      className="nav-indicator"
                      layoutId="navIndicator"
                    />
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                  to="/contact"
                >
                  Contact
                  {location.pathname === '/contact' && (
                    <motion.div
                      className="nav-indicator"
                      layoutId="navIndicator"
                    />
                  )}
                </Link>
              </li>                <li className="nav-item ms-2 nav-cta-item">
                <Link to="/contact" className="btn btn-primary nav-cta-btn">
                  <span className="d-flex align-items-center">
                    <FaShoppingBasket className="me-md-2 me-lg-1 me-xl-2" />
                    <span className="cta-text">Get Quote</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu-container"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="container py-3">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="mobile-search-input-wrapper">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="mobile-search-input"
                    />
                    <motion.button
                      type="submit"
                      className="mobile-search-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaSearch />
                    </motion.button>
                  </div>
                </form>

                {/* Mobile Nav Links */}
                <ul className="mobile-nav-links">
                  <li className={location.pathname === '/' ? 'active' : ''}>
                    <Link to="/" className="mobile-nav-link">
                      <span className="mobile-nav-icon">🏠</span>
                      Home
                    </Link>
                  </li>

                  <li className={catalogs.some(c => location.pathname.includes(`/category/${c.name.toLowerCase().replace(/\s/g, '-')}`)) ? 'active' : ''}>
                    <div
                      className="mobile-nav-link with-dropdown"
                      onClick={() => toggleDropdown('products')}
                    >
                      <Link style={{ textDecoration: "none" }} to={"/category"}>
                        <div className="d-flex align-items-center">
                          <span className="mobile-nav-icon">🛒</span>
                          <span>Products</span>
                        </div>
                      </Link>
                      <motion.div
                        animate={{ rotate: activeDropdown === 'products' ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaChevronDown size={14} />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {activeDropdown === 'products' && (
                        <motion.ul
                          className="mobile-dropdown-menu"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {catalogs.map((category, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                to={`/category/${category.name.toLowerCase().replace(/\s/g, '-')}`}
                                className="mobile-dropdown-item"
                              >
                                <div className="d-flex align-items-center">
                                  <div className="mobile-dropdown-image-container me-2">
                                    <img
                                      src={category.image}
                                      alt={category.name}
                                      className="mobile-dropdown-image"
                                    />
                                  </div>
                                  {category.name}
                                </div>
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>

                  <li className={location.pathname === '/about' ? 'active' : ''}>
                    <Link to="/about" className="mobile-nav-link">
                      <span className="mobile-nav-icon">ℹ️</span>
                      About
                    </Link>
                  </li>

                  <li className={location.pathname === '/testimonials' ? 'active' : ''}>
                    <Link to="/testimonials" className="mobile-nav-link">
                      <span className="mobile-nav-icon">⭐</span>
                      Testimonials
                    </Link>
                  </li>

                  <li className={location.pathname === '/contact' ? 'active' : ''}>
                    <Link to="/contact" className="mobile-nav-link">
                      <span className="mobile-nav-icon">📞</span>
                      Contact
                    </Link>
                  </li>
                </ul>

                <div className="text-center mt-4">
                  <Link to="/contact" className="btn btn-primary mobile-cta-btn">
                    <FaShoppingBasket className="me-2" />
                    Get Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar on scroll */}
      {isScrolled && (
        <motion.div
          className="scroll-progress-bar"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* CSS Styles */}
      <style jsx="true">{`
        /* Header Base Styles */
        header {
          width: 100%;
          z-index: 9998;
          transition: all 0.3s ease;
        }

        header.scrolled {
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
        }

        .announcement-bar {
          background: linear-gradient(90deg, #3a7bfc, #6f42c1);
          font-size: 0.85rem;
          letter-spacing: 0.5px;
          overflow: hidden;
          position: relative;
        }
        
        .announcement-container {
          position: relative;
          min-height: 24px; /* Increased height slightly */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px 0;
        }
        
        .announcement-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
          font-weight: 500;
        }
        
        .announcement-indicators {
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 10;
        }
        
        .indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .indicator.active {
          background-color: white;
          width: 15px;
          border-radius: 3px;
        }
        
        .indicator:hover {
          background-color: rgba(255,255,255,0.8);
          transform: scale(1.2);
        }

        /* Add animation for text highlight */
        .announcement-text span {
          background-color: rgba(255,255,255,0.15);
          padding: 1px 8px;
          border-radius: 3px;
          margin: 0 4px;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { background-color: rgba(255,255,255,0.15); }
          50% { background-color: rgba(255,255,255,0.25); }
          100% { background-color: rgba(255,255,255,0.15); }
        }

        .header-container {
          background-color: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }        .navbar {
          padding: 16px 0;
          transition: all 0.3s ease;
          position: relative;
        }

        .navbar-scrolled {
          padding: 10px 0;
        }

        /* Logo & Brand Styling */
        .logo-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-logo {
          height: 45px;
          width: auto;
          transition: all 0.3s ease;
          object-fit: contain;
        }

        .navbar-scrolled .brand-logo {
          height: 40px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 1.1;
          background: linear-gradient(to right, #3a7bfc, #6f42c1, #e83e8c, #3a7bfc);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient 5s ease infinite alternate;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .brand-tagline {
          font-size: 0.8rem;
          color:rgb(60, 61, 63);
          letter-spacing: 0.5px;
          line-height: 1.1;
        }

        /* Desktop Navigation Styling */
        .desktop-menu .nav-item {
          position: relative;
          margin: 0 5px;
        }

        .desktop-menu .nav-link {
          font-size: 0.95rem;
          font-weight: 500;
          color: #444;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
        }

        .desktop-menu .nav-link:hover {
          color: #3a7bfc;
          background-color: rgba(58, 123, 252, 0.08);
          transform: translateY(-2px);
        }

        .desktop-menu .nav-link.active {
          color: #3a7bfc;
          font-weight: 600;
        }

        .desktop-menu .nav-indicator {
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          height: 3px;
          width: 20px;
          background: linear-gradient(90deg, #3a7bfc, #6f42c1);
          border-radius: 2px;
        }        .nav-cta-btn {
          padding: 8px 20px;
          font-weight: 500;
          border-radius: 8px;
          font-size: 0.95rem;
          box-shadow: 0 4px 12px rgba(58, 123, 252, 0.2);
          transition: all 0.3s ease;
          white-space: nowrap;
          min-width: fit-content;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(58, 123, 252, 0.4);
        }

        /* Enhanced Products Dropdown Menu Styling */
        .dropdown-toggle {
          cursor: pointer;
          user-select: none;
          position: relative;
          z-index: 10;
        }

        .products-dropdown {
          border: none;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 15px;
          min-width: 500px;
          margin-top: 10px;
          background: white;
          z-index: 1000;
          position: absolute; /* Ensure absolute positioning */
          left: 50%;
          transform: translateX(-50%) !important;
          pointer-events: auto; /* Ensure the dropdown can receive mouse events */
        }

        /* Prevent dropdown from appearing on hover of inactive elements */
        .dropdown-menu.show {
          display: block;
        }

        /* Make dropdown items clickable without interference */
        .dropdown-item {
          position: relative;
          z-index: 10;
        }

        .product-list {
          border-right: 1px solid #f1f1f1;
          max-height: 350px;
          overflow-y: auto;
          padding-right: 10px;
        }

        .product-list::-webkit-scrollbar {
          width: 6px;
        }

        .product-list::-webkit-scrollbar-thumb {
          background-color: rgba(58, 123, 252, 0.3);
          border-radius: 3px;
        }

        .dropdown-item {
          padding: 10px 15px;
          font-size: 0.9rem;
          color: #555;
          border-radius: 8px;
          transition: all 0.2s;
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }

        .dropdown-item:hover,
        .dropdown-item.active {
          background-color: rgba(58, 123, 252, 0.08);
          color: #3a7bfc;
          transform: translateX(2px);
        }

        .dropdown-color-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }

        .product-preview {
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-content {
          text-align: center;
          width: 100%;
        }

        .preview-image-container {
          width: 100%;
          height: 160px;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .preview-image:hover {
          transform: scale(1.05);
        }

        .preview-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }

        .categories-preview {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 5px;
        }

        .category-badge {
          font-size: 0.75rem;
          padding: 3px 8px;
          border-radius: 30px;
          background-color: #f8f9fa;
          color: #555;
        }

        .category-badge.more {
          background-color: rgba(58, 123, 252, 0.1);
          color: #3a7bfc;
        }

        /* Search Bar Styling */        .search-container {
          flex: 0 1 auto;
          width: 400px;
          max-width: 400px;
          min-width: 200px;
          margin: 0 15px;
          transition: width 0.3s ease;
        }

        .search-input-wrapper {
          position: relative;
          width: 100%;
          border-radius: 50px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid #e0e0e0;
          background-color: #f8f9fa;
          display: flex;
          align-items: center;
        }

        .search-input-wrapper.focused {
          box-shadow: 0 0 0 4px rgba(58, 123, 252, 0.15);
          border-color: #3a7bfc;
          background-color: white;
        }

        .search-input {
          width: 100%;
          padding: 12px 50px 12px 20px !important; /* Add !important to ensure padding is consistent */
          border: none;
          background: transparent;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          box-sizing: border-box; /* Ensure box sizing is consistent */
        }

        .search-input:focus {
          outline: none;
          padding-left: 20px !important; /* Maintain left padding when focused */
        }

        .search-input::placeholder {
          color: #888;
          opacity: 1; /* Ensure placeholder is visible */
          padding-left: 0; /* Ensure placeholder text doesn't have extra padding */
        }

        /* Fix for WebKit browsers */
        .search-input::-webkit-input-placeholder {
          padding-left: 0;
          color: #888;
        }

        /* Fix for Firefox */
        .search-input::-moz-placeholder {
          padding-left: 0;
          color: #888;
          opacity: 1;
        }

        /* Fix for Microsoft Edge */
        .search-input:-ms-input-placeholder {
          padding-left: 0;
          color: #888;
        }

        /* Fix for newer Microsoft Edge versions */
        .search-input::-ms-input-placeholder {
          padding-left: 0;
          color: #888;
        }

        .search-button {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: linear-gradient(45deg, #3a7bfc, #6f42c1);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(58, 123, 252, 0.3);
          z-index: 1;
          transition: all 0.3s ease;
          font-size: 16px;
          outline: none;
        }

        .search-button:hover {
          background: linear-gradient(45deg, #6f42c1, #3a7bfc);
          box-shadow: 0 6px 15px rgba(58, 123, 252, 0.4);
          transform: translateY(-50%) translateX(-2px);
        }

        .search-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(58, 123, 252, 0.2), 0 6px 15px rgba(58, 123, 252, 0.4);
        }

        .search-button:active {
          transform: translateY(-50%) scale(0.95);
        }

        /* Mobile Search Button - Apply the same fix here */
        .mobile-search-button {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: linear-gradient(45deg, #3a7bfc, #6f42c1);
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(58, 123, 252, 0.2);
          z-index: 1;
          transition: background 0.3s, box-shadow 0.3s;
        }

        .mobile-search-button:hover {
          background: linear-gradient(45deg, #6f42c1, #3a7bfc);
          box-shadow: 0 6px 15px rgba(58, 123, 252, 0.3);
        }

        /* Hamburger Button Styling - Fixed rotation */
        .navbar-toggler {
          border: none;
          background: rgba(58, 123, 252, 0.1);
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3a7bfc;
          transition: all 0.3s;
          border-radius: 8px;
          margin-left: 10px;
        }

        .navbar-toggler:focus {
          box-shadow: none;
          background-color: rgba(58, 123, 252, 0.2);
        }

        .navbar-toggler:hover {
          background-color: rgba(58, 123, 252, 0.2);
        }

        /* Fixed dropdown image alignment */
        .mobile-dropdown-image-container {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8f9fa;
          border: 1px solid rgba(0,0,0,0.1);
        }

        .mobile-dropdown-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Scroll Progress Bar */
        .scroll-progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          width: 100%;
          background: linear-gradient(90deg, #3a7bfc, #6f42c1);
          transform-origin: left;
        }

        /* Mobile Menu Styling */
        .mobile-menu-container {
          background-color: white;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          overflow-y: auto; /* Change from hidden to auto for vertical scrolling */
          max-height: calc(100vh - 120px); /* Set a max height to ensure it doesn't go off screen */
        }

        .mobile-search-input-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 30px;
          border: 1px solid #e0e0e0;
          background-color: #f8f9fa;
        }

        .mobile-search-input {
          width: 100%;
          padding: 14px 50px 14px 20px;
          border: none;
          background: transparent;
          font-size: 0.95rem;
        }

        .mobile-search-input:focus {
          outline: none;
        }

        .mobile-search-button {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: linear-gradient(45deg, #3a7bfc, #6f42c1);
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(58, 123, 252, 0.2);
        }

        .mobile-nav-links {
          list-style: none;
          padding: 0;
          margin: 0 0 15px 0; /* Added bottom margin */
        }

        .mobile-nav-links li {
          margin-bottom: 5px;
          position: relative;
          border-radius: 10px;
          overflow: hidden;
        }

        .mobile-nav-links li.active {
          background: linear-gradient(to right, rgba(58, 123, 252, 0.1), transparent);
        }

        .mobile-nav-links li.active .mobile-nav-link {
          color: #3a7bfc;
          font-weight: 600;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          color: #444;
          font-weight: 500;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s;
          min-height: 52px; /* Ensure touch targets are at least 48px */
        }

        .mobile-nav-icon {
          margin-right: 12px;
          font-size: 1.2rem;
        }

        .mobile-nav-link:hover {
          background-color: rgba(58, 123, 252, 0.05);
          color: #3a7bfc;
        }

        .mobile-dropdown-menu {
          list-style: none;
          padding: 5px 0 5px 15px;
          margin: 0;
          max-height: 300px; /* Set a max height for the dropdown */
          overflow-y: auto; /* Enable vertical scrolling within the dropdown */
        }

        /* Style scrollbar for better mobile UX */
        .mobile-dropdown-menu::-webkit-scrollbar {
          width: 4px;
        }

        .mobile-dropdown-menu::-webkit-scrollbar-thumb {
          background-color: rgba(58, 123, 252, 0.3);
          border-radius: 4px;
        }

        .mobile-dropdown-menu::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
        }

        .mobile-dropdown-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          color: #666;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s;
          font-size: 0.95rem;
          margin-bottom: 2px; /* Add spacing between items */
        }

        .mobile-dropdown-item:hover {
          background-color: rgba(58, 123, 252, 0.05);
          color: #3a7bfc;
        }

        /* Add touch-friendly targets for mobile */
        .mobile-nav-link.with-dropdown {
          cursor: pointer;
        }

        /* Ensure the quote button doesn't get hidden */
        .text-center.mt-4 {
          padding-bottom: 15px;
        }

        .mobile-cta-btn {
          width: 100%;
          padding: 14px 24px;
          font-weight: 500;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          box-shadow: 0 4px 15px rgba(58, 123, 252, 0.25);
        }

        /* Responsive adjustments */        /* Extra breakpoint for specific laptop widths where "Get Quote" button might get stuck */
        @media (min-width: 992px) and (max-width: 1080px) {
          .search-container {
            width: 220px;
            min-width: 180px;
          }
          
          .desktop-menu .nav-link {
            font-size: 0.85rem;
            padding: 8px 10px;
          }
          
          .nav-cta-btn {
            padding: 6px 10px;
            font-size: 0.8rem;
          }
          
          .cta-text {
            font-size: 0.8rem;
          }
          
          .me-lg-1 {
            margin-right: 0.15rem !important;
          }
        }
        
        /* Large laptops to Desktop */
        @media (min-width: 1200px) and (max-width: 1400px) {
          .navbar .container-fluid {
            padding-left: 15px;
            padding-right: 15px;
          }
          
          .search-container {
            width: 300px;
          }

          .nav-cta-btn {
            padding: 8px 16px;
          }
        }

        /* Medium laptops and tablets */
        @media (min-width: 992px) and (max-width: 1199px) {
          .navbar .container-fluid {
            padding-left: 10px;
            padding-right: 10px;
          }
          
          .search-container {
            width: 250px;
          }
          
          .nav-item {
            margin-right: 5px;
          }
          
          .nav-link {
            font-size: 0.9rem;
            padding-left: 8px;
            padding-right: 8px;
          }
            .nav-cta-btn {
            padding: 6px 12px;
            font-size: 0.85rem;
          }
          
          .nav-cta-item {
            margin-left: 0 !important;
          }
          
          .cta-text {
            font-size: 0.85rem;
          }
        }

        /* Tablets to Small laptops */
        @media (max-width: 992px) {
          .navbar {
            padding: 12px 0;
          }

          .navbar-scrolled {
            padding: 8px 0;
          }

          .brand-logo {
            height: 38px;
          }

          .navbar-scrolled .brand-logo {
            height: 35px;
          }

          .brand-name {
            font-size: 1.1rem;
          }

          .brand-tagline {
            font-size: 0.65rem;
          }

          .search-container {
            width: 250px; /* Adjust width for smaller screens */
          }

          .products-dropdown {
            min-width: 300px;
          }
        }        /* Small tablets */
        @media (min-width: 577px) and (max-width: 767px) {
          .brand-logo {
            height: 36px;
            width: 36px !important;
          }
          
          .navbar-scrolled .brand-logo {
            height: 32px;
          }
          
          .brand-name {
            font-size: 1rem;
          }
          
          .brand-tagline {
            font-size: 0.65rem;
          }
          
          .navbar .container-fluid {
            padding-left: 12px;
            padding-right: 12px;
          }
          
          .search-container {
            width: 200px;
          }
        }

        /* Mobile devices */
        @media (max-width: 576px) {
          .announcement-bar {
            font-size: 0.75rem;
          }
          
          .announcement-indicators {
            bottom: -12px;
          }

          .brand-logo {
            height: 35px;
            width: 35px !important;
          }

          .navbar-scrolled .brand-logo {
            height: 32px;
          }

          .brand-name {
            font-size: 1rem;
          }

          .brand-tagline {
            font-size: 0.6rem;
          }

          .mobile-menu-container {
            max-height: calc(100vh - 100px); /* Adjust for smaller screens */
          }
          
          .mobile-dropdown-menu {
            max-height: 250px; /* Slightly smaller on very small screens */
          }
        }
      `}</style>
    </header>
  );
};

export default Header;