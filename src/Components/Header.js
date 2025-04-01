import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaMagnifyingGlass, FaXmark, FaCartShopping, FaUser, FaBars, FaChevronDown } from "react-icons/fa6";
import { catalogs } from "../App"; // Import catalogs data

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const headerBgOpacity = useTransform(scrollY, [0, 100], [0.9, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], ["0px", "10px"]);
  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 4px 15px rgba(0, 0, 0, 0.05)", "0 8px 25px rgba(0, 0, 0, 0.15)"]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMegaMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchValue.trim().length < 2) return;

    const query = searchValue.trim().toLowerCase();

    // First check for exact matches in subcategories (products)
    let exactSubItemMatch = null;
    let partialSubItemMatch = null;
    let categoryForSubItem = null;
    let productForSubItem = null;
    let subItemIndex = -1;

    // Store all possible matches
    let productMatches = [];
    let categoryMatches = [];

    // Search through all data
    for (const product of catalogs) {
      // Check if product name matches
      if (product.name.toLowerCase() === query) {
        // Exact product name match
        navigate(`/category/${product.name.toLowerCase().replace(/\s/g, '-')}`);
        setSearchValue("");
        return;
      } else if (product.name.toLowerCase().includes(query)) {
        productMatches.push(product);
      }

      // Search through categories and subcategories
      for (const category of product.categories) {
        // Check if category name matches
        if (category.name.toLowerCase() === query) {
          // Exact category name match
          navigate(`/category/${product.name.toLowerCase().replace(/\s/g, '-')}`);
          setSearchValue("");
          return;
        } else if (category.name.toLowerCase().includes(query)) {
          categoryMatches.push({ product, category });
        }

        // Check subcategories (subItems)
        for (let i = 0; i < category.subItems.length; i++) {
          const subItem = category.subItems[i];

          // Check for exact match in subItem name or number like "1121"
          if (subItem.name.toLowerCase() === query ||
            subItem.name.toLowerCase().startsWith(query) ||
            subItem.name.toLowerCase().includes(query)) {

            // If it's an exact match, prioritize it
            if (subItem.name.toLowerCase() === query ||
              (query.length >= 4 && subItem.name.toLowerCase().includes(query))) {
              exactSubItemMatch = subItem;
              categoryForSubItem = category;
              productForSubItem = product;
              subItemIndex = i;
              break;
            } else {
              // Store partial match in case we don't find an exact match
              partialSubItemMatch = subItem;
              categoryForSubItem = category;
              productForSubItem = product;
              subItemIndex = i;
            }
          }
        }

        // If we found an exact subItem match, break the loop
        if (exactSubItemMatch) break;
      }

      // If we found an exact subItem match, break the loop
      if (exactSubItemMatch) break;
    }

    // Process the best match we found
    if (exactSubItemMatch) {
      // Navigate directly to the product
      const productSlug = productForSubItem.name.toLowerCase().replace(/\s/g, '-');
      const categorySlug = categoryForSubItem.name.toLowerCase().replace(/\s/g, '-');
      navigate(`/category/${productSlug}/${categorySlug}/${subItemIndex}`);
      setSearchValue("");
      return;
    }

    if (partialSubItemMatch) {
      // Navigate directly to the product
      const productSlug = productForSubItem.name.toLowerCase().replace(/\s/g, '-');
      const categorySlug = categoryForSubItem.name.toLowerCase().replace(/\s/g, '-');
      navigate(`/category/${productSlug}/${categorySlug}/${subItemIndex}`);
      setSearchValue("");
      return;
    }

    // If we found category matches, navigate to the first one
    if (categoryMatches.length > 0) {
      const { product } = categoryMatches[0];
      navigate(`/category/${product.name.toLowerCase().replace(/\s/g, '-')}`);
      setSearchValue("");
      return;
    }

    // If we found product matches, navigate to the first one
    if (productMatches.length > 0) {
      navigate(`/category/${productMatches[0].name.toLowerCase().replace(/\s/g, '-')}`);
      setSearchValue("");
      return;
    }

    // If no match found, redirect to search results
    navigate(`/search-results?q=${encodeURIComponent(query)}`);
    setSearchValue("");

    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed-top"
        style={{
          background: "linear-gradient(135deg, #3a7bfc, #0046c0)",
          boxShadow: headerShadow,
          backdropFilter: `blur(${headerBlur})`,
          zIndex: 1030
        }}
      >
        <motion.div
          className="position-absolute top-0 left-0 w-100 h-100"
          style={{
            opacity: headerBgOpacity,
            background: "linear-gradient(135deg, #3a7bfc, #0046c0)",
            zIndex: -1
          }}
        />

        <div className="container position-relative">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center">
              <Link className="navbar-brand d-flex align-items-center" to="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="d-flex align-items-center"
                >
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="me-2"
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "contain",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                    }}
                  />
                  <span className="fw-bold text-white fs-4 d-inline-block">Akdenar</span>
                </motion.div>
              </Link>
            </div>

            {/* Search input - desktop */}
            <motion.div
              className="d-none d-md-block position-absolute start-50 translate-middle-x"
              style={{ width: "300px" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <form onSubmit={handleSearchSubmit} className="w-100">
                <motion.div
                  className="input-group"
                  animate={{
                    boxShadow: isSearchFocused
                      ? "0 0 0 3px rgba(255, 255, 255, 0.3)"
                      : "0 0 0 1px rgba(255, 255, 255, 0.2)"
                  }}
                  style={{
                    borderRadius: "50px",
                    overflow: "hidden"
                  }}
                >
                  <motion.input
                    type="text"
                    placeholder="Search products..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="form-control border-0"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      color: "white",
                      borderRadius: "50px 0 0 50px",
                      padding: "8px 15px",
                      fontSize: "0.9rem",
                      height: "38px"
                    }}
                  />
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={searchValue.length < 2}
                    className="btn text-white px-3"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderRadius: "0 50px 50px 0",
                      border: "none",
                      opacity: searchValue.length < 2 ? 0.6 : 1,
                      cursor: searchValue.length < 2 ? "not-allowed" : "pointer",
                      height: "38px"
                    }}
                  >
                    <FaMagnifyingGlass size={14} />
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>

            <div className="d-flex align-items-center">
              <div className="d-none d-lg-flex align-items-center">
                <nav className="mx-4">
                  <ul className="nav">
                    <motion.li
                      className="nav-item mx-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link
                        className="nav-link text-white px-3 py-2"
                        to="/"
                      >
                        <motion.span
                          whileHover={{
                            scale: 1.05,
                            textShadow: "0 0 5px rgba(255,255,255,0.5)"
                          }}
                          className="d-inline-block"
                        >
                          Home
                        </motion.span>
                      </Link>
                    </motion.li>

                    <motion.li
                      className="nav-item mx-1 position-relative"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      ref={menuRef}
                    >
                      <motion.div
                        className="nav-link text-white px-3 py-2 d-flex align-items-center cursor-pointer"
                        onClick={() => setShowMegaMenu(!showMegaMenu)}
                        style={{ cursor: "pointer" }}
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.1)",
                          borderRadius: "6px"
                        }}
                      >
                        <motion.span
                          whileHover={{
                            scale: 1.05,
                            textShadow: "0 0 5px rgba(255,255,255,0.5)"
                          }}
                          className="d-inline-block me-1"
                        >
                          Products
                        </motion.span>
                        <motion.span
                          animate={{ rotate: showMegaMenu ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaChevronDown size={12} />
                        </motion.span>
                      </motion.div>

                      <AnimatePresence>
                        {showMegaMenu && (
                          <motion.div
                            className="position-absolute bg-white rounded-3 shadow-lg py-4 px-2"
                            style={{
                              top: "calc(100% + 10px)",
                              right: "-50px",
                              width: "650px",
                              maxWidth: "90vw",
                              zIndex: 1050,
                              maxHeight: "80vh",
                              overflowY: "auto"
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="row">
                              <div className="col-4 border-end">
                                <ul className="nav flex-column">
                                  {catalogs.map((category, index) => (
                                    <li
                                      key={index}
                                      className="nav-item"
                                      onMouseEnter={() => setActiveCategory(category)}
                                    >
                                      <Link
                                        to={`/category/${category.name.toLowerCase().replace(/\s/g, '-')}`}
                                        className={`nav-link py-2 px-3 rounded-pill mb-1 ${activeCategory === category ? 'bg-light text-primary fw-medium' : 'text-dark'}`}
                                        onClick={() => setShowMegaMenu(false)}
                                      >
                                        {category.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="col-8">
                                {activeCategory ? (
                                  <>
                                    <div className="d-flex align-items-center mb-3">
                                      <div
                                        className="rounded-circle me-2"
                                        style={{
                                          width: "36px",
                                          height: "36px",
                                          background: `linear-gradient(135deg, ${activeCategory.colors[0]}, ${activeCategory.colors[1]})`,
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center"
                                        }}
                                      >
                                        <span className="text-white fw-bold">{activeCategory.name.charAt(0)}</span>
                                      </div>
                                      <h6 className="mb-0 fw-bold">{activeCategory.name} Varieties</h6>
                                    </div>
                                    <div className="row g-2">
                                      {activeCategory.categories.map((subCategory, idx) => (
                                        <div key={idx} className="col-6">
                                          <Link
                                            to={`/category/${activeCategory.name.toLowerCase().replace(/\s/g, '-')}`}
                                            className="text-decoration-none d-flex align-items-center p-2 rounded hover-bg-light border"
                                            onClick={() => setShowMegaMenu(false)}
                                          >
                                            <div
                                              className="rounded-circle me-2 border"
                                              style={{
                                                width: "32px",
                                                height: "32px",
                                                backgroundImage: `url(${subCategory.image})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center"
                                              }}
                                            ></div>
                                            <div>
                                              <div className="text-dark small fw-medium">{subCategory.name}</div>
                                              <div className="text-muted" style={{ fontSize: "10px" }}>
                                                {subCategory.subItems.length} varieties
                                              </div>
                                            </div>
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                                  </>
                                ) : (
                                  <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                                    Select a category to see varieties
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>

                    <motion.li
                      className="nav-item mx-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link
                        className="nav-link text-white px-3 py-2"
                        to="/about"
                      >
                        <motion.span
                          whileHover={{
                            scale: 1.05,
                            textShadow: "0 0 5px rgba(255,255,255,0.5)"
                          }}
                          className="d-inline-block"
                        >
                          About
                        </motion.span>
                      </Link>
                    </motion.li>

                    <motion.li
                      className="nav-item mx-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link
                        className="nav-link text-white px-3 py-2"
                        to="/contact"
                      >
                        <motion.span
                          whileHover={{
                            scale: 1.05,
                            textShadow: "0 0 5px rgba(255,255,255,0.5)"
                          }}
                          className="d-inline-block"
                        >
                          Contact
                        </motion.span>
                      </Link>
                    </motion.li>
                  </ul>
                </nav>
              </div>

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="d-flex d-lg-none align-items-center justify-content-center text-white rounded-circle p-2 border-0"
                style={{
                  width: "38px",
                  height: "38px",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  cursor: "pointer"
                }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <FaXmark size={15} /> : <FaBars size={15} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="container-fluid bg-white position-absolute shadow-lg"
              style={{
                top: "74px",
                left: 0,
                zIndex: 1040,
                maxHeight: "calc(100vh - 74px)",
                overflowY: "auto"
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container py-3">
                <div className="d-block d-md-none mb-3">
                  <form onSubmit={handleSearchSubmit} className="w-100">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="form-control"
                        style={{
                          borderRadius: "50px 0 0 50px",
                          border: "1px solid #dee2e6",
                          borderRight: "none"
                        }}
                      />
                      <button
                        type="submit"
                        disabled={searchValue.length < 2}
                        className="btn btn-outline-primary px-3"
                        style={{
                          borderRadius: "0 50px 50px 0",
                          borderLeft: "none"
                        }}
                      >
                        <FaMagnifyingGlass size={14} />
                      </button>
                    </div>
                  </form>
                </div>

                <ul className="nav flex-column">
                  <li className="nav-item border-bottom">
                    <Link
                      className="nav-link py-3 text-dark"
                      to="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>

                  {catalogs.map((category, index) => (
                    <li key={index} className="nav-item border-bottom">
                      <Link
                        className="nav-link py-3 text-dark d-flex justify-content-between align-items-center"
                        to={`/category/${category.name.toLowerCase().replace(/\s/g, '-')}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>
                          <span
                            className="badge me-2"
                            style={{
                              background: `linear-gradient(135deg, ${category.colors[0]}, ${category.colors[1]})`,
                              color: "white"
                            }}
                          >
                            {category.categories.length}
                          </span>
                          {category.name}
                        </span>
                        <FaChevronDown size={12} />
                      </Link>
                    </li>
                  ))}

                  <li className="nav-item border-bottom">
                    <Link
                      className="nav-link py-3 text-dark"
                      to="/about"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About
                    </Link>
                  </li>

                  <li className="nav-item border-bottom">
                    <Link
                      className="nav-link py-3 text-dark"
                      to="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header */}
      <div style={{ height: "74px" }}></div>
    </>
  );
}

export default Header;