import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { catalogs } from '../App';
import { FaArrowRight, FaStar, FaMagnifyingGlass, FaXmark } from 'react-icons/fa6';
import { debounce } from 'lodash';

const CategoriesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get unique category types - memoized to prevent recalculation
  const categoryTypes = useMemo(() => {
    return ['all', ...new Set(catalogs.map(cat => cat.name.toLowerCase()))];
  }, []);

  // Debounced filtering to prevent lag
  const debouncedFilter = useCallback(
    debounce((category, term) => {
      setIsLoading(true);

      setTimeout(() => {
        let filtered = [...catalogs];

        // Filter by search term
        if (term) {
          filtered = filtered.filter(cat =>
            cat.name.toLowerCase().includes(term.toLowerCase()) ||
            cat.categories.some(subCat =>
              subCat.name.toLowerCase().includes(term.toLowerCase()) ||
              subCat.description?.toLowerCase().includes(term.toLowerCase())
            )
          );
        }

        // Filter by category type (if not 'all')
        if (category !== 'all') {
          filtered = filtered.filter(cat => cat.name.toLowerCase() === category.toLowerCase());
        }

        setFilteredCategories(filtered);
        setIsLoading(false);
      }, 10); // Small timeout to allow UI to breathe
    }, 250),
    []
  );

  const filterCategories = useCallback((category, term = searchTerm) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
    }
    debouncedFilter(category, term);
  }, [activeCategory, debouncedFilter, searchTerm]);

  const handleSearch = useCallback((e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterCategories(activeCategory, term);
  }, [activeCategory, filterCategories]);

  const clearSearch = () => {
    setSearchTerm('');
    filterCategories(activeCategory, '');
  };

  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);

    // Set initial filtered categories
    setFilteredCategories([...catalogs]);
  }, []);

  return (
    <div className="categories-page-container">
      {/* Hero Section with Search */}
      <section className="categories-hero">
        <div className="container">
          <div className="row justify-content-center" style={{ marginTop: '50px' }}>
            <div className="col-lg-8 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="display-4 fw-bold mb-3"
              >
                Browse Our <span className="text-gradient">Premium Collection</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="lead mb-4"
              >
                Explore our extensive range of high-quality products from trusted producers worldwide
              </motion.p>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="categories-grid">
        <div className="container">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="loading-container"
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Finding the best matches...</p>
              </motion.div>
            ) : filteredCategories.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {filteredCategories.map((category, index) => (
                  <div key={index} className="category-section">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, delay: index * 0.1 }}
                    >
                      <div className="category-header">
                        <div className="category-title-area">
                          <h2 className="category-title">
                            <span style={{
                              background: `linear-gradient(45deg, ${category.colors[0]}, ${category.colors[1]})`,
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent"
                            }}>
                              {category.name}
                            </span>
                          </h2>
                          <span className="category-count">{category.categories.length} varieties</span>
                        </div>
                        <Link
                          to={`/category/${category.name.toLowerCase().replace(/\s/g, '-')}`}
                          className="view-all-btn"
                        >
                          View All <FaArrowRight className="ms-2" size={12} />
                        </Link>
                      </div>

                      <div className="subcategories-grid">
                        {category.categories.slice(0, 4).map((subCategory, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="subcategory-card"
                            onMouseEnter={() => setHoveredItem(`${category.name}-${subCategory.name}`)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <Link to={`/category/${category.name.toLowerCase().replace(/\s/g, '-')}`} className="subcategory-link">
                              <div className="subcategory-image-container">
                                <img
                                  src={subCategory.image}
                                  alt={subCategory.name}
                                  className="subcategory-image"
                                  style={{
                                    transform: hoveredItem === `${category.name}-${subCategory.name}` ? "scale(1.1)" : "scale(1)"
                                  }}
                                />
                                <div className="subcategory-overlay" style={{
                                  opacity: hoveredItem === `${category.name}-${subCategory.name}` ? 1 : 0.7
                                }}></div>
                                <div className="subcategory-info">
                                  <h5 className="subcategory-name">{subCategory.name}</h5>
                                  <div className="subcategory-rating">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar key={i} size={12} className="me-1" style={{ color: i < 4 ? "#ffc107" : "#e0e0e0" }} />
                                    ))}
                                    <span className="rating-count">(4.0)</span>
                                  </div>
                                </div>
                              </div>
                              <div className="subcategory-body">
                                <p className="subcategory-description">
                                  {subCategory.description}
                                </p>
                                <div className="subcategory-footer">
                                  <span className="product-count-badge">
                                    {subCategory.subItems.length} Products
                                  </span>
                                  <span className="explore-link">
                                    Explore <FaArrowRight size={10} />
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="noResults"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="no-results-container"
              >
                <img
                  src="/no-results.svg"
                  alt="No results found"
                  className="no-results-image"
                  onError={(e) => e.target.src = "https://via.placeholder.com/200x200?text=No+Results"}
                />
                <h3 className="no-results-title">No categories found</h3>
                <p className="no-results-message">We couldn't find any categories matching your search criteria.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="clear-filters-btn"
                  onClick={() => {
                    setSearchTerm('');
                    filterCategories('all', '');
                  }}
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <style jsx="true">{`
        /* Base Container Styles */
        .categories-page-container {
          padding-top: 65px;
          overflow-x: hidden;
        }
        
        /* Hero Section Styles */
        .categories-hero {
          background: white;
          padding: 100px 0 70px;
          position: relative;
          border-bottom-left-radius: 30px;
          border-bottom-right-radius: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        
        .categories-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(58, 123, 252, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(111, 66, 193, 0.03) 0%, transparent 50%);
          z-index: 0;
        }
        
        .categories-hero .container {
          position: relative;
          z-index: 1;
        }
        
        .text-gradient {
          background: linear-gradient(120deg, #3a7bfc, #6f42c1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        /* Enhanced Search Field Styles */
        .search-wrapper {
          position: relative;
          background: white;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(58, 123, 252, 0.1);
          display: flex;
          align-items: center;
          padding: 5px 20px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .search-wrapper.focused {
          border-color: #3a7bfc;
          box-shadow: 0 10px 30px rgba(58, 123, 252, 0.15);
        }
        
        .search-icon {
          color: #3a7bfc;
          margin-right: 15px;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        
        .search-wrapper.focused .search-icon {
          opacity: 1;
        }
        
        .search-input {
          border: none;
          outline: none;
          padding: 15px 0;
          width: 100%;
          font-size: 1rem;
          color: #333;
          background: transparent;
        }
        
        .clear-search {
          background: rgba(58, 123, 252, 0.1);
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3a7bfc;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .clear-search:hover {
          background: rgba(58, 123, 252, 0.2);
        }
        
        /* Category Filter Styles */
        .category-filters-container {
          display: flex;
          justify-content: center;
          padding-bottom: 20px;
        }
        
        .category-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .category-filter-btn {
          background: white;
          border: none;
          border-radius: 12px;
          padding: 12px 20px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #555;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          text-transform: capitalize;
          animation: fadeIn 0.3s ease forwards;
          opacity: 0;
        }
        
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        
        .category-filter-btn:hover {
          background: #f0f4ff;
          color: #3a7bfc;
          box-shadow: 0 6px 15px rgba(58, 123, 252, 0.1);
        }
        
        .category-filter-btn.active {
          background: #3a7bfc;
          color: white;
          box-shadow: 0 6px 15px rgba(58, 123, 252, 0.25);
        }
        
        .active-indicator {
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
        }
        
        /* Categories Grid Styles */
        .categories-grid {
          padding: 70px 0;
          background: white;
          min-height: 60vh;
        }
        
        .category-section {
          margin-bottom: 70px;
        }
        
        .category-section:last-child {
          margin-bottom: 0;
        }
        
        .category-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .category-title-area {
          display: flex;
          flex-direction: column;
        }
        
        .category-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 10px;
          line-height: 1.2;
        }
        
        .category-count {
          color: #6c757d;
          font-size: 0.95rem;
          font-weight: 500;
        }
        
        .view-all-btn {
          display: inline-flex;
          align-items: center;
          background: white;
          color: #3a7bfc;
          border: 2px solid rgba(58, 123, 252, 0.1);
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 4px 10px rgba(58, 123, 252, 0.08);
        }
        
        .view-all-btn:hover {
          background: #3a7bfc;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(58, 123, 252, 0.2);
        }
        
        .subcategories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 25px;
        }
        
        .subcategory-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .subcategory-card:hover {
          box-shadow: 0 15px 35px rgba(58, 123, 252, 0.12);
        }
        
        .subcategory-link {
          color: inherit;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .subcategory-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .subcategory-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        
        .subcategory-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 100%);
          transition: opacity 0.4s ease;
        }
        
        .subcategory-info {
          position: absolute;
          bottom: 0;
          left: 0;
          padding: 20px;
          width: 100%;
          z-index: 1;
        }
        
        .subcategory-name {
          color: white;
          font-weight: 600;
          margin-bottom: 5px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        
        .subcategory-rating {
          display: flex;
          align-items: center;
        }
        
        .rating-count {
          color: rgba(255,255,255,0.9);
          font-size: 0.75rem;
          margin-left: 5px;
        }
        
        .subcategory-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        
        .subcategory-description {
          color: #6c757d;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 20px;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .subcategory-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }
        
        .product-count-badge {
          background: #f0f4ff;
          color: #3a7bfc;
          padding: 6px 12px;
          border-radius: 30px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .explore-link {
          color: #3a7bfc;
          font-weight: 500;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        /* Loading and No Results States */
        .loading-container,
        .no-results-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 0;
          text-align: center;
          min-height: 50vh;
        }
        
        .loading-container .spinner-border {
          width: 3rem;
          height: 3rem;
          color: #3a7bfc;
        }
        
        .no-results-image {
          max-width: 180px;
          margin-bottom: 30px;
          opacity: 0.6;
        }
        
        .no-results-title {
          font-weight: 600;
          margin-bottom: 15px;
          color: #333;
        }
        
        .no-results-message {
          color: #6c757d;
          max-width: 400px;
          margin: 0 auto 25px;
        }
        
        .clear-filters-btn {
          background: #3a7bfc;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 6px 15px rgba(58, 123, 252, 0.2);
        }
        
        .clear-filters-btn:hover {
          background: #276afb;
          box-shadow: 0 8px 20px rgba(58, 123, 252, 0.3);
        }
        
        /* Responsive Adjustments */
        @media (max-width: 992px) {
          .categories-hero {
            padding: 80px 0 50px;
          }
          
          .category-title {
            font-size: 1.8rem;
          }
          
          .subcategories-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }
        
        @media (max-width: 768px) {
          .categories-hero {
            padding: 70px 0 40px;
            border-radius: 0 0 20px 20px;
          }
          
          .category-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          
          .view-all-btn {
            align-self: flex-start;
          }
          
          .subcategories-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          }
          
          .category-title {
            font-size: 1.6rem;
          }
        }
        
        @media (max-width: 576px) {
          .categories-hero {
            padding: 60px 0 30px;
          }
          
          .search-wrapper {
            padding: 2px 15px;
          }
          
          .search-input {
            padding: 12px 0;
            font-size: 0.9rem;
          }
          
          .category-filters {
            padding: 0 10px;
            flex-wrap: nowrap;
            overflow-x: auto;
            justify-content: flex-start;
            padding-bottom: 10px;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .category-filters::-webkit-scrollbar {
            display: none;
          }
          
          .category-filter-btn {
            padding: 8px 16px;
            font-size: 0.8rem;
            white-space: nowrap;
          }
          
          .subcategories-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .subcategory-card {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoriesPage;
