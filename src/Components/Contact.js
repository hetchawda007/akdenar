import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import ContactForm from './ContactForm';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Contact = () => {
  useEffect(() => {
    // Force scroll to top when Contact component mounts
    window.scrollTo(0, 0);

    // Add body class to prevent scroll issues on mobile
    document.body.classList.add('page-contact');

    return () => {
      document.body.classList.remove('page-contact');
    };
  }, []);

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Office Address",
      details: ["Third Floor, 69, New Manglapuri, New Delhi, Delhi 110030, India", "Village Puraina Siwan Bihar 841232", "Plot NO.57/58 Gidc Halvad, Surendranagar, Gujarat 363330"],
      color: "#3a7bfc"
    },
    {
      icon: FaPhone,
      title: "Phone Number",
      details: ["+91-9220852922", "+91-7999824772"],
      color: "#28a745"
    },
    {
      icon: FaEnvelope,
      title: "Email Address",
      details: ["hr@akdenar.com", "support@akdenar.com"],
      color: "#fd7e14"
    },
    {
      icon: FaClock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM"],
      color: "#dc3545"
    }
  ];

  const socialMedia = [
    { icon: FaFacebookF, link: "https://www.facebook.com/share/1AmuCTSfNp", color: "#1877F2" },
    // { icon: FaTwitter, link: "#", color: "#1DA1F2" },
    { icon: FaInstagram, link: "https://www.instagram.com/akdenar", color: "#E4405F" },
    { icon: FaLinkedinIn, link: "https://www.linkedin.com/company/akdenar2", color: "#0A66C2" }
  ];

  return (
    <div className="contact-page-container">
      {/* Hero Section */}
      <section className="contact-hero py-5">
        <div className="container pt-4">
          <section className="hero-section position-relative py-4">
            {/* Remove background image div and keep clean white background */}
            <div className="container py-5">
              <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="display-4 fw-bold mb-4"
                  >
                    Get In Touch
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="lead mb-0"
                  >
                    We're here to help with any questions about our products, services, or anything else you might want to know.
                  </motion.p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {contactInfo.map((info, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card border-0 h-100 shadow-sm"
                  style={{ borderRadius: "16px" }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <div className="card-body p-4 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: index * 0.1 + 0.3
                      }}
                      className="icon-wrapper rounded-circle d-inline-flex align-items-center justify-content-center mb-3 mx-auto"
                      style={{
                        width: "70px",
                        height: "70px",
                        background: `linear-gradient(135deg, ${info.color}22, ${info.color}44)`,
                      }}
                    >
                      <info.icon size={28} style={{ color: info.color }} />
                    </motion.div>
                    <motion.h4
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                      className="fw-bold mb-3"
                      style={{ color: info.color }}
                    >
                      {info.title}
                    </motion.h4>                    {info.details.map((detail, idx) => {
                      let linkElement = detail;

                      // Handle each case appropriately
                      if (info.title === "Email Address") {
                        linkElement = (
                          <a href={`mailto:${detail}`}
                            style={{ color: "inherit", textDecoration: "none", transition: "color 0.3s ease" }}
                            className="hover-effect"
                            onMouseOver={(e) => e.target.style.color = info.color}
                            onMouseOut={(e) => e.target.style.color = "inherit"}
                          >
                            {detail}
                          </a>
                        );
                      } else if (info.title === "Phone Number") {
                        linkElement = (
                          <a href={`tel:${detail.replace(/\s/g, '')}`}
                            style={{ color: "inherit", textDecoration: "none", transition: "color 0.3s ease" }}
                            className="hover-effect"
                            onMouseOver={(e) => e.target.style.color = info.color}
                            onMouseOut={(e) => e.target.style.color = "inherit"}
                          >
                            {detail}
                          </a>
                        );
                      } else if (info.title === "Office Address") {
                        linkElement = (
                          <a href={`https://maps.google.com/?q=${encodeURIComponent(detail)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "inherit", textDecoration: "none", transition: "color 0.3s ease" }}
                            className="hover-effect"
                            onMouseOver={(e) => e.target.style.color = info.color}
                            onMouseOut={(e) => e.target.style.color = "inherit"}
                          >
                            {detail}
                          </a>
                        );
                      }

                      return (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.8 + (idx * 0.1) }}
                          className={`mb-${idx === info.details.length - 1 ? '0' : '2'}`}
                        >
                          {linkElement}
                        </motion.p>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-5" style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-4 shadow-sm p-5 p-md-6"
              >
                <h2 className="fw-bold mb-5 text-center display-5">Send Us a Message</h2>
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="display-5 fw-bold mb-4">Frequently Asked Questions</h2>
                <motion.div
                  className="divider bg-primary mx-auto mb-4"
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{ height: "3px" }}
                ></motion.div>
                <p className="lead text-muted">Find quick answers to common questions</p>
              </motion.div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="accordion" id="faqAccordion">
                  {[
                    {
                      question: "How can I place a bulk order?",
                      answer: <>For bulk orders, please contact our sales team directly at <a href="tel:+919220852922" style={{ textDecoration: "none", color: "#3a7bfc" }}>+91-92208 52922</a> or email us at <a href="mailto:support@akdenar.com" style={{ textDecoration: "none", color: "#3a7bfc" }}>support@akdenar.com</a>. We offer special pricing and shipping arrangements for bulk purchases.</>

                    },
                    {
                      question: "What areas do you deliver to?",
                      answer: "We currently deliver to major cities across India including Delhi NCR, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, and more. For a complete list of delivery areas, please check our delivery information page.We Deliver All Over the Glob"
                    },
                    {
                      question: "How do I track my order?",
                      answer: "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order the shipping carrier's site. If you have any issues, feel free to contact our support team."
                    },
                    {
                      question: "What is your return policy?",
                      answer: "Currently, we do not offer a return policy. However, if you face any issues with your order, please reach out to our customer support team—we’re here to help resolve any concerns."
                    },
                    {
                      question: "Do you offer international shipping?",
                      answer: "Yes, we do offer international shipping for select products. Shipping costs and delivery times vary by destination. Please contact our support team for specific information about international orders."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="accordion-item border-0 mb-3 shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button
                          className="accordion-button collapsed fw-medium"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded="false"
                          aria-controls={`collapse${index}`}
                          style={{ padding: "16px 20px" }}
                        >
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading${index}`}
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body bg-light" style={{ padding: "16px 20px" }}>
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Moved to the end */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-5"
              >
                <h2 className="fw-bold mb-4">Visit Our Office</h2>
                <p className="lead mb-0">Come see us in person! We'd love to meet you.</p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="row"
          >
            <div className="col-12">
              <div className="map-container rounded-4 overflow-hidden shadow-lg" style={{ height: "500px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.3702865186397!2d77.14772287504702!3d28.55683178059798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d0f343048e5%3A0x5a19c1a6a62e6e9!2sNew%20Manglapuri%2C%20New%20Delhi%2C%20Delhi%20110030!5e0!3m2!1sen!2sin!4v1686919234343!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Akdenar Office Location"
                ></iframe>
              </div>
            </div>
          </motion.div>

          <div className="row mt-5">
            <div className="col-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="fw-bold mb-4">Connect With Us</h3>
                <div className="d-flex gap-4 justify-content-center">
                  {socialMedia.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      className="d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: social.color,
                        color: "white",
                        textDecoration: "none"
                      }}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: `0 4px 20px ${social.color}66`,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    >
                      <social.icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <style jsx="true">{`
        /* Fixed styles to prevent navbar overlap */
        .contact-page-container {
          padding-top: 65px;
        }

        .contact-hero {
          background: rgba(255, 255, 255, 0.98); /* Matches navbar background */
          backdrop-filter: blur(10px);
          border-radius: 0 0 30px 30px;
          position: relative;
          overflow: hidden;
          min-height: 220px;
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
};

export default Contact;