import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaArrowRight, FaShareNodes, FaHeadset, FaShippingFast, FaShieldHalved, FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import { catalogs } from '../App';

const ProductDetail = () => {
    const { category, product } = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        // Find the selected product from the catalog data
        window.scrollTo(0, 0);

        const fetchData = () => {
            setIsLoading(true);

            // Convert category slug to category name
            const categoryName = category.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');

            // Convert product slug to product name
            const productName = product.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');

            // Find the matching catalog entry
            const catalogEntry = catalogs.find(cat =>
                cat.name.toLowerCase() === categoryName.toLowerCase()
            );

            if (catalogEntry) {
                // Find the product within this catalog
                const categoryEntry = catalogEntry.categories.find(cat =>
                    cat.name.toLowerCase() === productName.toLowerCase()
                );

                if (categoryEntry) {
                    setSelectedProduct(categoryEntry);

                    // Get related products (other products from the same category)
                    const related = catalogEntry.categories
                        .filter(cat => cat.name !== categoryEntry.name)
                        .slice(0, 4); // Limit to 4 related products

                    setRelatedProducts(related);
                }
            }

            setIsLoading(false);
        };

        fetchData();
    }, [category, product]);

    const handleImageChange = (index) => {
        setCurrentImageIndex(index);
    };

    const nextImage = () => {
        if (selectedProduct && selectedProduct.images) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    const prevImage = () => {
        if (selectedProduct && selectedProduct.images) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
            );
        }
    };

    if (isLoading) {
        return (
            <div className="container mt-5 pt-5 text-center product-detail-page">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!selectedProduct) {
        return (
            <div className="container mt-5 pt-5 text-center product-detail-page">
                <h2>Product not found</h2>
                <p>Sorry, we couldn't find the product you're looking for.</p>
                <Link to="/category" className="btn btn-primary">
                    Browse Categories
                </Link>
            </div>
        );
    }

    // Use the selected product's image if available, or fall back to the main image
    const productImages = selectedProduct.images || [selectedProduct.image];

    return (
        <main className="container mt-5 product-detail-page">
            <div className="row mb-4">
                <div className="col-12">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/" className="text-decoration-none">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/category" className="text-decoration-none">Categories</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to={`/category/${category}`} className="text-decoration-none">
                                    {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {selectedProduct.name}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row g-5">
                {/* Product Gallery Column */}
                <div className="col-lg-6 mb-4">
                    <div className="product-gallery">
                        <div className="main-image-container">
                            {productImages.length > 1 && (
                                <button
                                    className="gallery-nav prev"
                                    onClick={prevImage}
                                    aria-label="Previous image"
                                >
                                    <FaChevronLeft />
                                </button>
                            )}

                            <img
                                src={productImages[currentImageIndex]}
                                alt={selectedProduct.name}
                                className="main-product-image"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/600x600?text=Product+Image";
                                }}
                            />

                            {productImages.length > 1 && (
                                <button
                                    className="gallery-nav next"
                                    onClick={nextImage}
                                    aria-label="Next image"
                                >
                                    <FaChevronRight />
                                </button>
                            )}
                        </div>

                        {productImages.length > 1 && (
                            <div className="thumbnail-container">
                                {productImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                                        onClick={() => handleImageChange(index)}
                                    >
                                        <img
                                            src={image}
                                            alt={`${selectedProduct.name} - thumbnail ${index + 1}`}
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/100x100?text=Thumbnail";
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Details Column */}
                <div className="col-lg-6">
                    <div className="product-details">
                        <motion.h1
                            className="product-title mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {selectedProduct.name}
                        </motion.h1>

                        <motion.div
                            className="product-meta mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="ratings">
                                <div className="stars">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar key={index} className={index < 4 ? 'filled' : ''} />
                                    ))}
                                </div>
                                <span className="rating-count">(4.0/5)</span>
                                <span className="separator">|</span>
                                <span className="stock in-stock">In Stock</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="product-description mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <p>{selectedProduct.description}</p>
                        </motion.div>

                        <motion.div
                            className="product-options mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h6>Available Variants</h6>
                            <div className="variant-grid">
                                {selectedProduct.subItems && selectedProduct.subItems.map((variant, index) => (
                                    <div key={index} className="variant-item">
                                        {variant.name}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="product-features mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <h6>Key Features</h6>
                            <ul className="features-list">
                                <li>Premium quality assurance</li>
                                <li>Sourced directly from producers</li>
                                <li>Natural ingredients with no additives</li>
                                <li>Highest grade available in market</li>
                                <li>Available in bulk quantities</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="product-cta"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <Link to="/contact" className="btn btn-primary quote-btn">
                                Request a Quote
                            </Link>
                            <button className="btn btn-outline-primary share-btn">
                                <FaShareNodes /> Share
                            </button>
                        </motion.div>

                        <motion.div
                            className="product-guarantees mt-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <div className="guarantee-item">
                                <FaShippingFast className="guarantee-icon" />
                                <div className="guarantee-text">
                                    <h6>Fast Delivery</h6>
                                    <p>Nationwide shipping available</p>
                                </div>
                            </div>
                            <div className="guarantee-item">
                                <FaShieldHalved className="guarantee-icon" />
                                <div className="guarantee-text">
                                    <h6>Quality Assured</h6>
                                    <p>100% quality guarantee</p>
                                </div>
                            </div>
                            <div className="guarantee-item">
                                <FaHeadset className="guarantee-icon" />
                                <div className="guarantee-text">
                                    <h6>24/7 Support</h6>
                                    <p>Dedicated customer service</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Product Detail Tabs */}
            <div className="row mt-5">
                <div className="col-12">
                    <div className="product-tabs">
                        <ul className="nav nav-tabs" id="productTabs" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link active"
                                    id="description-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#description-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="description-tab-pane"
                                    aria-selected="true"
                                >
                                    Detailed Description
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="specifications-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#specifications-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="specifications-tab-pane"
                                    aria-selected="false"
                                >
                                    Specifications
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="usage-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#usage-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="usage-tab-pane"
                                    aria-selected="false"
                                >
                                    Usage & Storage
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content py-4 px-3" id="productTabsContent">
                            <div
                                className="tab-pane fade show active"
                                id="description-tab-pane"
                                role="tabpanel"
                                aria-labelledby="description-tab"
                                tabIndex="0"
                            >
                                <h5>About {selectedProduct.name}</h5>
                                <p>{selectedProduct.description}</p>
                                <p>
                                    At Akdenar, we take pride in offering only the highest quality products sourced directly from
                                    trusted producers. Our {selectedProduct.name} is carefully selected to ensure premium quality
                                    and authentic taste that our customers have come to expect from our brand.
                                </p>
                                <p>
                                    Each batch undergoes strict quality control measures to guarantee consistency and excellence.
                                    Whether you're buying for personal use or for your business, you can trust that our
                                    {selectedProduct.name} meets the highest industry standards.
                                </p>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="specifications-tab-pane"
                                role="tabpanel"
                                aria-labelledby="specifications-tab"
                                tabIndex="0"
                            >
                                <h5>Product Specifications</h5>
                                <table className="table specifications-table">
                                    <tbody>
                                        <tr>
                                            <td>Product Name</td>
                                            <td>{selectedProduct.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Category</td>
                                            <td>{category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
                                        </tr>
                                        <tr>
                                            <td>Available Varieties</td>
                                            <td>{selectedProduct.subItems ? selectedProduct.subItems.length : 1} variants</td>
                                        </tr>
                                        <tr>
                                            <td>Packaging Options</td>
                                            <td>Retail and Bulk packaging available</td>
                                        </tr>
                                        <tr>
                                            <td>Quality Grade</td>
                                            <td>Premium</td>
                                        </tr>
                                        <tr>
                                            <td>Origin</td>
                                            <td>India</td>
                                        </tr>
                                        <tr>
                                            <td>Special Features</td>
                                            <td>High quality, Consistent taste, Premium selection</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="usage-tab-pane"
                                role="tabpanel"
                                aria-labelledby="usage-tab"
                                tabIndex="0"
                            >
                                <h5>Usage Instructions & Storage</h5>
                                <div className="usage-storage-content">
                                    <div className="usage-section">
                                        <h6>Recommended Usage</h6>
                                        <p>
                                            Our {selectedProduct.name} is versatile and can be used in various culinary applications.
                                            For best results, follow these guidelines:
                                        </p>
                                        <ul>
                                            <li>Store in a cool, dry place away from direct sunlight</li>
                                            <li>Keep container sealed when not in use</li>
                                            <li>Use clean, dry utensils when handling</li>
                                            <li>Follow recommended measurements for consistent results</li>
                                        </ul>
                                    </div>

                                    <div className="storage-section">
                                        <h6>Storage Recommendations</h6>
                                        <p>
                                            To maintain freshness and quality, proper storage is essential:
                                        </p>
                                        <ul>
                                            <li>Store in the original packaging or an airtight container</li>
                                            <li>Keep away from strong odors as the product may absorb them</li>
                                            <li>Avoid exposure to moisture and humidity</li>
                                            <li>Optimal storage temperature: Room temperature or slightly cooler</li>
                                            <li>Check for any special storage instructions on the package</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <section className="related-products mt-5 mb-5">
                    <div className="section-header d-flex justify-content-between align-items-center mb-4">
                        <h2 className="section-title">Related Products</h2>
                        <Link to={`/category/${category}`} className="view-all-link">
                            View All <FaArrowRight className="ms-2" />
                        </Link>
                    </div>

                    <div className="row g-4">
                        {relatedProducts.map((relatedProduct, index) => (
                            <div key={index} className="col-md-6 col-lg-3">
                                <motion.div
                                    className="related-product-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                >
                                    <Link to={`/category/${category}/${relatedProduct.name.toLowerCase().replace(/\s/g, '-')}`} className="product-link">
                                        <div className="product-image-container">
                                            <img
                                                src={relatedProduct.image}
                                                alt={relatedProduct.name}
                                                className="product-image"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/300x300?text=Product";
                                                }}
                                            />
                                        </div>
                                        <div className="product-info">
                                            <h5 className="product-name">{relatedProduct.name}</h5>
                                            <p className="product-excerpt">{relatedProduct.description.substring(0, 70)}...</p>
                                            <span className="explore-btn">
                                                Explore <FaArrowRight className="ms-1" />
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <style jsx="true">{`
        .product-detail-page {
          padding-top: 120px;
        }
        
        /* Breadcrumb styles */
        .breadcrumb {
          background: transparent;
          margin-bottom: 2rem;
        }

        .breadcrumb-item a {
          color: #3a7bfc;
          transition: color 0.2s;
        }

        .breadcrumb-item a:hover {
          color: #2763d5;
        }

        .breadcrumb-item.active {
          color: #6c757d;
        }

        /* Product Gallery Styles */
        .product-gallery {
          position: relative;
          margin-bottom: 2rem;
        }

        .main-image-container {
          position: relative;
          width: 100%;
          height: 450px;
          border-radius: 16px;
          overflow: hidden;
          background-color: #f8f9fa;
          margin-bottom: 1rem;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
        }

        .main-product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .gallery-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 2;
          transition: all 0.3s ease;
          color: #3a7bfc;
        }

        .gallery-nav:hover {
          background: #3a7bfc;
          color: white;
          box-shadow: 0 5px 15px rgba(58, 123, 252, 0.3);
        }

        .gallery-nav.prev {
          left: 15px;
        }

        .gallery-nav.next {
          right: 15px;
        }

        .thumbnail-container {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          overflow-x: auto;
          padding-bottom: 10px;
          scrollbar-width: thin;
          scrollbar-color: rgba(58, 123, 252, 0.3) transparent;
        }

        .thumbnail-container::-webkit-scrollbar {
          height: 6px;
        }

        .thumbnail-container::-webkit-scrollbar-thumb {
          background-color: rgba(58, 123, 252, 0.3);
          border-radius: 10px;
        }

        .thumbnail {
          flex: 0 0 80px;
          height: 80px;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .thumbnail:hover {
          opacity: 1;
        }

        .thumbnail.active {
          opacity: 1;
          border-color: #3a7bfc;
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Product Details Styles */
        .product-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 1rem;
        }

        .product-meta {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .ratings {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .stars {
          display: flex;
          color: #e0e0e0;
        }

        .stars .filled {
          color: #ffc107;
        }

        .rating-count {
          color: #777;
          font-size: 0.9rem;
        }

        .separator {
          color: #ddd;
          margin: 0 10px;
        }

        .stock {
          font-weight: 500;
          font-size: 0.9rem;
        }

        .in-stock {
          color: #28a745;
        }

        .product-description {
          color: #666;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .product-options h6 {
          font-weight: 600;
          margin-bottom: 1rem;
          color: #444;
        }

        .variant-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 1.5rem;
        }

        .variant-item {
          padding: 8px 16px;
          background-color: #f0f4ff;
          color: #3a7bfc;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .variant-item:hover {
          background-color: #e0e9ff;
          transform: translateY(-2px);
        }

        .product-features h6 {
          font-weight: 600;
          margin-bottom: 1rem;
          color: #444;
        }

        .features-list {
          list-style-type: none;
          padding-left: 0;
        }

        .features-list li {
          padding: 8px 0;
          display: flex;
          align-items: center;
          color: #555;
        }

        .features-list li:before {
          content: "✓";
          color: #3a7bfc;
          margin-right: 10px;
          font-weight: bold;
        }

        .product-cta {
          display: flex;
          gap: 15px;
          margin-top: 2rem;
        }

        .quote-btn {
          padding: 12px 30px;
          font-weight: 500;
          border-radius: 12px;
          background: linear-gradient(45deg, #3a7bfc, #6f42c1);
          border: none;
          box-shadow: 0 5px 15px rgba(58, 123, 252, 0.3);
          transition: all 0.3s ease;
        }

        .quote-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(58, 123, 252, 0.4);
        }

        .share-btn {
          padding: 12px 25px;
          font-weight: 500;
          border-radius: 12px;
          border-color: rgba(58, 123, 252, 0.3);
          color: #3a7bfc;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .share-btn:hover {
          background-color: rgba(58, 123, 252, 0.05);
          border-color: #3a7bfc;
        }

        .product-guarantees {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 30px;
          padding-top: 30px;
          border-top: 1px solid #f0f0f0;
        }

        .guarantee-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          width: 100%;
          max-width: 300px;
        }

        .guarantee-icon {
          font-size: 1.8rem;
          color: #3a7bfc;
        }

        .guarantee-text h6 {
          font-weight: 600;
          margin-bottom: 5px;
          color: #444;
        }

        .guarantee-text p {
          font-size: 0.9rem;
          color: #777;
          margin-bottom: 0;
        }

        /* Product Tabs Styles */
        .product-tabs {
          margin-top: 4rem;
          border-radius: 16px;
          background-color: white;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .nav-tabs {
          border-bottom: 1px solid #f0f0f0;
          padding: 0 15px;
        }

        .nav-tabs .nav-link {
          border: none;
          color: #666;
          font-weight: 500;
          padding: 15px 20px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-tabs .nav-link:hover {
          color: #3a7bfc;
        }

        .nav-tabs .nav-link.active {
          color: #3a7bfc;
          background-color: transparent;
          font-weight: 600;
        }

        .nav-tabs .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #3a7bfc, #6f42c1);
          border-radius: 3px 3px 0 0;
        }

        .tab-content {
          padding: 30px;
        }

        .tab-pane h5 {
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #333;
        }

        .tab-pane p {
          color: #666;
          line-height: 1.7;
        }

        .specifications-table td {
          padding: 12px 15px;
        }

        .specifications-table td:first-child {
          font-weight: 500;
          color: #444;
          width: 35%;
        }

        .usage-storage-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .usage-section h6,
        .storage-section h6 {
          font-weight: 600;
          margin-bottom: 1rem;
          color: #444;
        }

        .usage-section ul,
        .storage-section ul {
          padding-left: 20px;
        }

        .usage-section li,
        .storage-section li {
          margin-bottom: 8px;
          color: #666;
        }

        /* Related Products Styles */
        .related-products {
          margin-top: 5rem;
          padding-top: 2rem;
          border-top: 1px solid #f0f0f0;
        }

        .section-title {
          font-weight: 700;
          font-size: 1.8rem;
          color: #333;
        }

        .view-all-link {
          color: #3a7bfc;
          font-weight: 500;
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .view-all-link:hover {
          color: #2763d5;
          transform: translateX(5px);
        }

        .related-product-card {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);
          height: 100%;
          transition: all 0.3s ease;
          background: white;
        }

        .related-product-card:hover {
          box-shadow: 0 15px 35px rgba(58, 123, 252, 0.12);
        }

        .product-link {
          display: block;
          text-decoration: none;
          color: inherit;
          height: 100%;
        }

        .product-image-container {
          height: 200px;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .related-product-card:hover .product-image {
          transform: scale(1.1);
        }

        .product-info {
          padding: 20px;
        }

        .product-name {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 10px;
          color: #333;
        }

        .product-excerpt {
          font-size: 0.9rem;
          color: #777;
          margin-bottom: 15px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .explore-btn {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          font-weight: 500;
          color: #3a7bfc;
        }

        /* Responsive Styles */
        @media (max-width: 992px) {
          .product-detail-page {
            padding-top: 100px;
          }
          
          .main-image-container {
            height: 400px;
          }
          
          .product-title {
            font-size: 1.8rem;
          }
          
          .usage-storage-content {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .product-cta {
            flex-direction: column;
          }
          
          .quote-btn, .share-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .product-detail-page {
            padding-top: 85px;
          }
          
          .main-image-container {
            height: 350px;
          }
          
          .product-guarantees {
            justify-content: center;
          }
          
          .tab-content {
            padding: 20px 15px;
          }
          
          .nav-tabs .nav-link {
            padding: 12px 15px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 576px) {
          .product-detail-page {
            padding-top: 70px;
          }
          
          .main-image-container {
            height: 300px;
          }
          
          .product-title {
            font-size: 1.5rem;
          }
          
          .thumbnail {
            flex: 0 0 60px;
            height: 60px;
          }
          
          .product-cta {
            flex-direction: column;
            gap: 10px;
          }
          
          .section-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
        </main>
    );
};

export default ProductDetail;
