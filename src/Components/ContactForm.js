import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import emailjs from "@emailjs/browser";
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

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          sender: { name: 'Appname', email: 'hetchawda44@gmail.com' },
          to: [{ email: "hetchawda44@gmail.com" }],
          subject: `New Contact Form Submission from ${formData.name}`,
          htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
          <h2 style="color: #3a7bfc; border-bottom: 2px solid #d0e0ff; padding-bottom: 10px;">New Contact Form Submission</h2>
          <p style="margin-top: 20px;"><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3a7bfc; margin: 20px 0;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin-top: 10px;">${formData.message}</p>
          </div>
          <p style="color: #6c757d; font-size: 12px; margin-top: 30px; text-align: center;">This email was sent from your website contact form.</p>
        </div>
          `,
        },
        {
          headers: {
            'api-key': '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',
            'Content-Type': 'application/json',
          },
        }
      );

      setSubmitStatus('success');
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setSubmitStatus(null);
      }, 3000);

      return response.status === 201;
    } catch (error) {
      console.error('Error sending message:', error.message);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
      return false;
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
      {/* Background decoration elements */}
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
                  </div>
                  <div className="text-start">
                    <h6 className="text-white mb-0 fw-normal opacity-75 small">Email Us At</h6>
                    <p className="text-white mb-0">customercare@Akdenar.com</p>
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
                  </div>
                  <div className="text-start">
                    <h6 className="text-white mb-0 fw-normal opacity-75 small">Call Us At</h6>
                    <p className="text-white mb-0">+91-8448893199</p>
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
                  </div>
                  <div className="text-start">
                    <h6 className="text-white mb-0 fw-normal opacity-75 small">Located At</h6>
                    <p className="text-white mb-0">5190, Lahori Gate, Delhi - 110006, India</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Decorative circles in the background */}
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
                      className={`form-control form-control-lg border-start-0 ps-0 ${!isFieldValid('name') && focused.name ? 'is-invalid' : ''}`}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  {!isFieldValid('name') && focused.name && (
                    <div className="invalid-feedback d-block text-danger mt-1 ps-2 small">
                      Please enter your name
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

              <motion.div
                className="text-end"
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
                    <div className="d-flex align-items-center">
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Sending...</span>
                      </div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
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
