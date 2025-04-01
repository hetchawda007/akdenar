import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    quote: "Akdenar's premium rice varieties have transformed our restaurant's biryani. The 1121 Basmati is exceptional!",
    image: "https://picsum.photos/120/120?random=1",
    name: "Chef Rajesh Kumar",
    location: "Mumbai",
    rating: 5,
    role: "Executive Chef, Spice Garden"
  },
  {
    quote: "The quality of spices from Akdenar is unmatched. Their whole spices retain their aroma for months!",
    image: "https://picsum.photos/120/120?random=2",
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    role: "Home Chef & Food Blogger"
  },
  {
    quote: "As a food manufacturer, we trust Akdenar for consistent quality in all their products. Their supply chain is impeccable.",
    image: "https://picsum.photos/120/120?random=3",
    name: "Amit Patel",
    location: "Ahmedabad",
    rating: 5,
    role: "Quality Manager, FoodCorp"
  },
  {
    quote: "The variety of dry fruits they offer is outstanding. Premium quality at competitive prices.",
    image: "https://picsum.photos/120/120?random=4",
    name: "Neha Gupta",
    location: "Bangalore",
    rating: 5,
    role: "Health Food Store Owner"
  },
  {
    quote: "Their customer service is exceptional. They go above and beyond to ensure customer satisfaction.",
    image: "https://picsum.photos/120/120?random=5",
    name: "Rahul Verma",
    location: "Kolkata",
    rating: 5,
    role: "Retail Store Owner"
  },
  {
    quote: "The organic products from Akdenar have helped us maintain our commitment to healthy living.",
    image: "https://picsum.photos/120/120?random=6",
    name: "Dr. Anjali Singh",
    location: "Pune",
    rating: 5,
    role: "Nutritionist"
  },
  {
    quote: "Their salt varieties are perfect for our food processing unit. Consistent quality and timely delivery.",
    image: "https://picsum.photos/120/120?random=7",
    name: "Vikram Malhotra",
    location: "Chennai",
    rating: 5,
    role: "Production Manager, FoodTech"
  },
  {
    quote: "Akdenar's sugar products meet our bakery's high standards. The refined sugar is perfect for our confections.",
    image: "https://picsum.photos/120/120?random=8",
    name: "Maria Fernandez",
    location: "Goa",
    rating: 5,
    role: "Pastry Chef"
  },
  {
    quote: "Their commitment to quality and sustainable sourcing aligns perfectly with our restaurant's values.",
    image: "https://picsum.photos/120/120?random=9",
    name: "Arjun Reddy",
    location: "Hyderabad",
    rating: 5,
    role: "Restaurant Owner"
  },
  {
    quote: "The variety of cooking oils they offer is impressive. Each one maintains its quality consistently.",
    image: "https://picsum.photos/120/120?random=10",
    name: "Sneha Iyer",
    location: "Kochi",
    rating: 5,
    role: "Culinary Instructor"
  }
];

const TestimonialsPage = () => {
  return (
    <div className="testimonials-page py-5">
      <div className="container">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h1 className="display-4 fw-bold mb-3">What Our Customers Say</h1>
          <p className="lead text-muted">Discover why businesses and individuals trust Akdenar for their premium food products</p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="col-md-6 col-lg-4"
            >
              <div className="testimonial-card h-100 p-4 rounded-4 shadow-sm">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-circle me-3"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 className="mb-1">{testimonial.name}</h5>
                    <p className="text-muted mb-0">{testimonial.role}</p>
                    <small className="text-muted">{testimonial.location}</small>
                  </div>
                </div>
                <div className="mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-warning me-1" />
                  ))}
                </div>
                <p className="mb-0 fst-italic">"{testimonial.quote}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Testimonials Carousel */}

      </div>

      <style jsx>{`
        .testimonial-card {
          background: white;
          border: 1px solid rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #3a7bfc;
        }
        .swiper-pagination-bullet-active {
          background: #3a7bfc;
        }
      `}</style>
    </div>
  );
};

export default TestimonialsPage;