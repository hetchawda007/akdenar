import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaPhone, FaComment, FaPaperPlane, FaCheck, FaTimes, FaMapMarkerAlt } from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const formRef = useRef(null);

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
    if (field === "name") return formData.name.length >= 2;
    if (field === "email") return /^\S+@\S+\.\S+$/.test(formData.email);
    if (field === "phone") return /^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''));
    if (field === "message") return formData.message.length >= 10;
    return true;
  };

  const isFormValid = () => {
    return (
      isFieldValid("name") &&
      isFieldValid("email") &&
      isFieldValid("phone") &&
      isFieldValid("message")
    );
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setFocused({
        name: true,
        email: true,
        phone: true,
        message: true
      });

      toast.error("Please correct all errors in the form before submitting.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });

      return;
    }

    setIsSubmitting(true);

    try {
      const post = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/send`, formData, {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.REACT_APP_API_KEY
        },
      });

      if (post.status === 200) {
        setSubmitStatus("success");
        formRef.current.reset();
        setFormData({ name: "", email: "", phone: "", message: "" });
        setFocused({
          name: false,
          email: false,
          phone: false,
          message: false,
        });
        toast.success("Message sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");

      let errorMessage = "Failed to send message. Please try again later.";

      if (error.response) {
        if (error.response.status === 429) {
          errorMessage = "Too many attempts. Please try again later.";
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your internet connection.";
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="my-5 rounded-4 overflow-hidden position-relative"
      style={{
        background: "linear-gradient(to right bottom, #ffffff, #f8f9fa)",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.07), 0 5px 15px rgba(0, 0, 0, 0.05)"
      }}
    >
      <motion.div
        className="position-absolute"
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(58, 123, 252, 0.07), rgba(58, 123, 252, 0.01))",
          top: "-150px",
          right: "-100px",
          zIndex: 0
        }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      <motion.div
        className="position-absolute"
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(58, 123, 252, 0.05), rgba(58, 123, 252, 0.01))",
          bottom: "-100px",
          left: "-50px",
          zIndex: 0
        }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />

      <div className="row g-0">
        <div className="col-md-5 d-none d-md-block">
          <motion.div
            className="h-100 d-flex flex-column justify-content-center align-items-center p-4"
            style={{
              background: "linear-gradient(135deg, #3a7bfc, #0046c0)",
              position: "relative",
              overflow: "hidden"
            }}
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="text-center text-white p-4"
              style={{ zIndex: 2 }}
            >
              <motion.h3
                className="fw-bold mb-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Let's Connect
              </motion.h3>

              <motion.p
                className="mb-5 fw-light"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </motion.p>

              <motion.div
                className="d-flex flex-column gap-4 mt-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9, staggerChildren: 0.1 }}
              >
                <motion.div
                  className="d-flex align-items-center"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <div
                    className="rounded-circle bg-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: "42px", height: "42px", minWidth: "42px" }}
                  >
                    <FaEnvelope className="text-primary" size={18} />
                  </div>                  <div className="text-start">
                    <h6 className="text-white mb-0 fw-normal opacity-75 small">Email Us At</h6>
                    <p className="text-white mb-0">
                      <a href="mailto:support@akdenar.com"
                        style={{ color: "white", textDecoration: "none", transition: "opacity 0.3s ease" }}
                        className="hover-effect"
                        onMouseOver={(e) => e.target.style.opacity = "0.8"}
                        onMouseOut={(e) => e.target.style.opacity = "1"}
                      >
                        support@akdenar.com
                      </a>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="d-flex align-items-center"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <div
                    className="rounded-circle bg-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: "42px", height: "42px", minWidth: "42px" }}
                  >
                    <FaPhone className="text-primary" size={18} />
                  </div>                  <div className="text-start">
                    <h6 className="text-white mb-0 fw-normal opacity-75 small">Call Us At</h6>
                    <p className="text-white mb-0">
                      <a href="tel:+919220852922"
                        style={{ color: "white", textDecoration: "none", transition: "opacity 0.3s ease" }}
                        className="hover-effect"
                        onMouseOver={(e) => e.target.style.opacity = "0.8"}
                        onMouseOut={(e) => e.target.style.opacity = "1"}
                      >
                        +91-9220852922
                      </a>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="d-flex align-items-center"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <div
                    className="rounded-circle bg-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: "42px", height: "42px", minWidth: "42px" }}
                  >
                    <FaMapMarkerAlt className="text-primary" size={18} />
                  </div>                  <div className="text-start">
                    <h6 className="text-white mb-0 fw-normal opacity-75 small">Located At</h6>
                    <p className="text-white mb-0">
                      <a href="https://maps.google.com/?q=Third Floor, 69, New Manglapuri, New Delhi, Delhi 110030, India"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "white", textDecoration: "none", transition: "opacity 0.3s ease" }}
                        className="hover-effect"
                        onMouseOver={(e) => e.target.style.opacity = "0.8"}
                        onMouseOut={(e) => e.target.style.opacity = "1"}
                      >
                        Third Floor, 69, New Manglapuri, New Delhi, Delhi 110030, India
                      </a>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="position-absolute" style={{ top: "20px", left: "20px", width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)" }}></div>
            <div className="position-absolute" style={{ bottom: "30px", right: "40px", width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)" }}></div>
            <div className="position-absolute" style={{ top: "50%", right: "20px", width: "25px", height: "25px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)" }}></div>
          </motion.div>
        </div>

        <div className="col-md-7">
          <div className="p-4 p-md-5 position-relative" style={{ zIndex: 1 }}>
            <motion.h2
              className="text-primary fw-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.h2>

            <form ref={formRef} onSubmit={sendEmail} className="position-relative">
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
                    <div>Your message has been sent successfully!</div>
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
                    <div>There was an error sending your message. Please try again.</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mb-4">
                <motion.div
                  className="position-relative"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaUser className={`${focused.name || formData.name ? 'text-primary' : 'text-muted'}`} />
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={() => handleBlur('name')}
                      className={`form-control form-control-lg border-start-0 ps-0 ${!isFieldValid('name') && (focused.name || formData.name) ? 'is-invalid' : ''}`}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  {!isFieldValid('name') && (focused.name || formData.name) && (
                    <div className="invalid-feedback d-block text-danger mt-1 ps-2 small">
                      Please enter your name (at least 2 characters)
                    </div>
                  )}
                </motion.div>
              </div>

              <div className="mb-4">
                <motion.div
                  className="position-relative"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
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
                      className={`form-control form-control-lg border-start-0 ps-0 ${!isFieldValid('email') && (focused.email || formData.email) ? 'is-invalid' : ''}`}
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  {!isFieldValid('email') && (focused.email || formData.email) && (
                    <div className="invalid-feedback d-block text-danger mt-1 ps-2 small">
                      Please enter a valid email address (e.g., name@example.com)
                    </div>
                  )}
                </motion.div>
              </div>

              <div className="mb-4">
                <motion.div
                  className="position-relative"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaPhone className={`${focused.phone || formData.phone ? 'text-primary' : 'text-mu</span>ted'}`} />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={() => handleBlur('phone')}
                      className={`form-control form-control-lg border-start-0 ps-0 ${!isFieldValid('phone') && (focused.phone || formData.phone) ? 'is-invalid' : ''}`}
                      placeholder="Your Phone Number"
                      required
                    />
                  </div>
                  {!isFieldValid('phone') && (focused.phone || formData.phone) && (
                    <div className="invalid-feedback d-block text-danger mt-1 ps-2 small">
                      Please enter a valid phone number (10-15 digits)
                    </div>
                  )}
                </motion.div>
              </div>

              <div className="mb-4">
                <motion.div
                  className="position-relative"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaComment className={`${focused.message || formData.message ? 'text-primary' : 'text-muted'}`}
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
                      className={`form-control form-control-lg border-start-0 ps-0 ${!isFieldValid('message') && (focused.message || formData.message) ? 'is-invalid' : ''}`}
                      placeholder="Your Message"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  {!isFieldValid('message') && (focused.message || formData.message) && (
                    <div className="invalid-feedback d-block text-danger mt-1 ps-2 small">
                      Please enter a message with at least 10 characters
                    </div>
                  )}
                </motion.div>
              </div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn btn-primary btn-lg px-4 py-2 rounded-pill"
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
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center">
                      <span>Send Message</span>
                      <FaPaperPlane className="ms-2" size={16} />
                    </div>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactForm;
