import React from 'react';
import { motion } from "framer-motion";
import { FaLeaf, FaCheck, FaUsers, FaGlobe, FaHeart } from "react-icons/fa6";

const About = () => {
  const values = [
    {
      icon: FaLeaf,
      title: "Quality First",
      description: "We are committed to sourcing and providing the highest quality products that meet rigorous standards.",
      color: "#28a745"
    },
    {
      icon: FaHeart,
      title: "Customer Focus",
      description: "Our customers are at the heart of everything we do, and we strive to exceed their expectations.",
      color: "#dc3545"
    },
    {
      icon: FaUsers,
      title: "Collaborative Spirit",
      description: "We build strong relationships with farmers, suppliers and partners to ensure the best products.",
      color: "#fd7e14"
    },
    {
      icon: FaGlobe,
      title: "Sustainability",
      description: "We are committed to sustainable practices that protect our environment for future generations.",
      color: "#3a7bfc"
    }
  ];

  const teamMembers = [
    {
      name: "Rajesh Kumar",
      position: "Founder & CEO",
      bio: "With over 20 years of experience in the agricultural sector, Rajesh founded Akdenar with a vision to bridge the gap between farmers and consumers.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Priya Sharma",
      position: "Chief Operations Officer",
      bio: "Priya oversees the day-to-day operations, ensuring that our supply chain runs efficiently and that quality is maintained at every step.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Amit Patel",
      position: "Head of Procurement",
      bio: "Amit works directly with farmers and suppliers to source the highest quality products while ensuring fair trade practices.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Sanjana Reddy",
      position: "Quality Assurance Manager",
      bio: "Sanjana leads our quality control team, implementing rigorous testing procedures to ensure only the best products reach our customers.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section position-relative py-5 mb-5" style={{ marginTop: "40px" }}>
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            zIndex: -1
          }}
        ></div>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="display-4 fw-bold mb-4">Our Story</h1>
                <p className="lead mb-4">Founded in 2024, Akdenar has grown from a small trading company to become one of India's leading providers of premium quality products.</p>
                <p className="mb-4">Our journey began with a simple mission: to connect farmers directly with consumers, ensuring fair prices for producers and the highest quality for customers.</p>
                <div className="d-flex align-items-center">
                  <div className="me-4">
                    <h3 className="fw-bold text-primary mb-0">5,000+</h3>
                    <p className="text-muted mb-0">Farmer Network</p>
                  </div>
                  <div>
                    <h3 className="fw-bold text-primary mb-0">50,000+</h3>
                    <p className="text-muted mb-0">Happy Customers</p>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-4 overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Akdenar Warehouse"
                  className="img-fluid rounded-4"
                  style={{ objectFit: "cover", width: "100%", height: "400px" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="display-5 fw-bold mb-4">Our Mission & Vision</h2>
                <div className="divider bg-primary mx-auto mb-4" style={{ height: "3px", width: "80px" }}></div>
              </motion.div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="card border-0 h-100 shadow-sm"
                style={{ borderRadius: "16px" }}
              >
                <div className="card-body p-4">
                  <div
                    className="icon-wrapper rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "linear-gradient(135deg, #3a7bfc22, #3a7bfc44)",
                    }}
                  >
                    <FaLeaf size={24} className="text-primary" />
                  </div>
                  <h3 className="fw-bold mb-3">Our Mission</h3>
                  <p className="mb-0">To provide the highest quality agricultural products by fostering direct relationships between farmers and consumers, ensuring transparency, sustainability, and value for all stakeholders in our ecosystem.</p>
                </div>
              </motion.div>
            </div>

            <div className="col-md-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="card border-0 h-100 shadow-sm"
                style={{ borderRadius: "16px" }}
              >
                <div className="card-body p-4">
                  <div
                    className="icon-wrapper rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "linear-gradient(135deg, #3a7bfc22, #3a7bfc44)",
                    }}
                  >
                    <FaGlobe size={24} className="text-primary" />
                  </div>
                  <h3 className="fw-bold mb-3">Our Vision</h3>
                  <p className="mb-0">To become India's most trusted agricultural products company, setting the industry standard for quality, sustainability, and social responsibility, while empowering farming communities and delivering exceptional value to customers.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="display-5 fw-bold mb-4">Our Core Values</h2>
                <div className="divider bg-primary mx-auto mb-4" style={{ height: "3px", width: "80px" }}></div>
                <p className="lead text-muted">The principles that guide everything we do at Akdenar</p>
              </motion.div>
            </div>
          </div>

          <div className="row g-4">
            {values.map((value, index) => (
              <div key={index} className="col-lg-3 col-md-6">
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
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="card-body p-4 text-center">
                    <div
                      className="icon-wrapper rounded-circle d-inline-flex align-items-center justify-content-center mb-3 mx-auto"
                      style={{
                        width: "70px",
                        height: "70px",
                        background: `linear-gradient(135deg, ${value.color}22, ${value.color}44)`,
                      }}
                    >
                      <value.icon size={28} style={{ color: value.color }} />
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: value.color }}>{value.title}</h4>
                    <p className="text-muted mb-0">{value.description}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="display-5 fw-bold mb-4">Our Leadership Team</h2>
                <div className="divider bg-primary mx-auto mb-4" style={{ height: "3px", width: "80px" }}></div>
                <p className="lead text-muted">Meet the people who drive our mission forward</p>
              </motion.div>
            </div>
          </div>

          <div className="row g-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card border-0 h-100 shadow-sm text-center"
                  style={{ borderRadius: "16px", overflow: "hidden" }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="img-container overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="card-img-top"
                      style={{ height: "280px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-1">{member.name}</h5>
                    <p className="text-primary mb-3 small">{member.position}</p>
                    <p className="text-muted mb-0 small">{member.bio}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Why Choose Us Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="display-5 fw-bold mb-4">Why Choose Akdenar?</h2>
                <div className="divider bg-primary mb-4" style={{ height: "3px", width: "80px" }}></div>
                <p className="lead mb-4">We stand apart because of our unwavering commitment to quality, transparency, and customer satisfaction.</p>

                <div className="mb-4">
                  {[
                    "Direct sourcing from certified farms",
                    "Rigorous quality control measures",
                    "Eco-friendly packaging solutions",
                    "Transparent supply chain",
                    "Competitive pricing without compromising quality",
                    "Dedicated customer support team"
                  ].map((point, idx) => (
                    <div key={idx} className="d-flex align-items-center mb-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                        style={{
                          width: "32px",
                          height: "32px",
                          background: "linear-gradient(135deg, #3a7bfc22, #3a7bfc44)"
                        }}
                      >
                        <FaCheck size={14} className="text-primary" />
                      </div>
                      <p className="mb-0">{point}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-4 overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Quality Control at Akdenar"
                  className="img-fluid rounded-4"
                  style={{ objectFit: "cover", width: "100%" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;