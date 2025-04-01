import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaBox, FaComment, FaPaperPlane, FaCheck, FaTimes } from "react-icons/fa";

const ProductContactForm = ({ productName = "" }) => {
    const [formData, setFormData] = useState({
        fname: "",
        email: "",
        phone: "",
        companyName: "",
        productName: productName || "",
        message: ""
    });

    const [focused, setFocused] = useState({
        fname: false,
        email: false,
        phone: false,
        companyName: false,
        productName: false,
        message: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFocus = (field) => {
        setFocused({ ...focused, [field]: true });
    };

    const handleBlur = (field) => {
        setFocused({ ...focused, [field]: false });
    };

    const isFieldValid = (field) => {
        if (field === "fname") return formData.fname.length >= 2;
        if (field === "email") return /^\S+@\S+\.\S+$/.test(formData.email);
        if (field === "phone") return /^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''));
        if (field === "companyName") return true; // Optional field
        if (field === "productName") return formData.productName.length >= 2;
        if (field === "message") return formData.message.length >= 10;
        return true;
    };

    const contactFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        try {
            // This is a placeholder - you'll implement the actual functionality later
            // Simulate success after 1 second
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSubmitStatus('success');
            setTimeout(() => {
                setFormData({
                    fname: "",
                    email: "",
                    phone: "",
                    companyName: "",
                    productName: productName || "",
                    message: ""
                });
                setSubmitStatus(null);
            }, 3000);
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitStatus('error');
            setTimeout(() => {
                setSubmitStatus(null);
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="product-contact-form bg-white rounded-4 shadow-sm overflow-hidden"
        >
            <div className="p-4 bg-primary bg-gradient text-white">
                <h3 className="fw-bold mb-2">Interested in this product?</h3>
                <p className="mb-0">Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            <div className="p-4">
                <form onSubmit={contactFormSubmit}>
                    <AnimatePresence>
                        {submitStatus === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="alert alert-success d-flex align-items-center"
                                role="alert"
                            >
                                <FaCheck className="me-2" />
                                <div>Your inquiry has been sent successfully! We'll contact you soon.</div>
                            </motion.div>
                        )}

                        {submitStatus === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="alert alert-danger d-flex align-items-center"
                                role="alert"
                            >
                                <FaTimes className="me-2" />
                                <div>There was an error sending your inquiry. Please try again.</div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <motion.div
                                className="mb-3"
                                initial={{ x: -10, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <FaUser className={`${focused.fname || formData.fname ? 'text-primary' : 'text-muted'}`} />
                                    </span>
                                    <input
                                        type="text"
                                        name="fname"
                                        value={formData.fname}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('fname')}
                                        onBlur={() => handleBlur('fname')}
                                        className={`form-control form-control-lg border-start-0 ps-0 ${!isFieldValid('fname') && focused.fname ? 'is-invalid' : ''}`}
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                {!isFieldValid('fname') && focused.fname && (
                                    <div className="invalid-feedback d-block text-danger mt-1 ps-2 small">
                                        Please enter your name
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        <div className="col-md-6">
                            <motion.div
                                className="mb-3"
                                initial={{ x: 10, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <FaEnvelope className={`${focused.email || formData.email ? 'text-primary' : 'text-muted'}`} />
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('email')}
                                        onBlur={() => handleBlur('email')}
                                        className={`form-control form-control-lg border-start-0 ps-0 ${!isFieldValid('email') && focused.email ? 'is-invalid' : ''}`}
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>
                                {!isFieldValid('email') && focused.email && (
                                    <div className="invalid-feedback d-block text-danger mt-1 ps-2 small">
                                        Please enter a valid email address
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        <div className="col-md-6">
                            <motion.div
                                className="mb-3"
                                initial={{ x: -10, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <FaPhone className={`${focused.phone || formData.phone ? 'text-primary' : 'text-muted'}`} />
                                    </span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('phone')}
                                        onBlur={() => handleBlur('phone')}
                                        className={`form-control form-control-lg border-start-0 ps-0 ${!isFieldValid('phone') && focused.phone ? 'is-invalid' : ''}`}
                                        placeholder="Your Phone Number"
                                        required
                                    />
                                </div>
                                {!isFieldValid('phone') && focused.phone && (
                                    <div className="invalid-feedback d-block text-danger mt-1 ps-2 small">
                                        Please enter a valid phone number
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        <div className="col-md-6">
                            <motion.div
                                className="mb-3"
                                initial={{ x: 10, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                            >
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <FaBuilding className={`${focused.companyName || formData.companyName ? 'text-primary' : 'text-muted'}`} />
                                    </span>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('companyName')}
                                        onBlur={() => handleBlur('companyName')}
                                        className="form-control form-control-lg border-start-0 ps-0"
                                        placeholder="Company Name (Optional)"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <div className="col-12">
                            <motion.div
                                className="mb-3"
                                initial={{ y: 10, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            >
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <FaBox className={`${focused.productName || formData.productName ? 'text-primary' : 'text-muted'}`} />
                                    </span>
                                    <input
                                        type="text"
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('productName')}
                                        onBlur={() => handleBlur('productName')}
                                        className={`form-control form-control-lg border-start-0 ps-0 ${!isFieldValid('productName') && focused.productName ? 'is-invalid' : ''}`}
                                        placeholder="Product Name"
                                        required
                                    />
                                </div>
                                {!isFieldValid('productName') && focused.productName && (
                                    <div className="invalid-feedback d-block text-danger mt-1 ps-2 small">
                                        Please enter the product name
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        <div className="col-12">
                            <motion.div
                                className="mb-3"
                                initial={{ y: 10, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                            >
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <FaComment
                                            className={`${focused.message || formData.message ? 'text-primary' : 'text-muted'}`}
                                            style={{
                                                alignSelf: "start",
                                                marginTop: "10px"
                                            }}
                                        />
                                    </span>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('message')}
                                        onBlur={() => handleBlur('message')}
                                        className={`form-control form-control-lg border-start-0 ps-0 ${!isFieldValid('message') && focused.message ? 'is-invalid' : ''}`}
                                        placeholder="Your Message"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                {!isFieldValid('message') && focused.message && (
                                    <div className="invalid-feedback d-block text-danger mt-1 ps-2 small">
                                        Please enter a message with at least 10 characters
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        <div className="col-12">
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(58, 123, 252, 0.3)" }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="btn btn-primary btn-lg px-5 py-3 rounded-pill"
                                    disabled={isSubmitting}
                                    style={{
                                        background: "linear-gradient(135deg, #3a7bfc, #0046c0)",
                                        border: "none",
                                        boxShadow: "0 4px 15px rgba(58, 123, 252, 0.3)"
                                    }}
                                >
                                    {isSubmitting ? (
                                        <div className="d-flex align-items-center justify-content-center">
                                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                                <span className="visually-hidden">Sending...</span>
                                            </div>
                                            <span>Sending inquiry...</span>
                                        </div>
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center">
                                            <span>Submit Inquiry</span>
                                            <FaPaperPlane className="ms-2" size={16} />
                                        </div>
                                    )}
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default ProductContactForm; 