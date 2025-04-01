import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeftLong, FaHouse, FaMagnifyingGlass } from "react-icons/fa6";

function NotFound({ searchTerm = "" }) {
    const navigate = useNavigate();

    return (
        <main className="container mt-5 pt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-5 rounded-4 shadow-sm"
                    >
                        <div className="mb-4">
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <img
                                    src="https://i.imgur.com/qIufhof.png"
                                    alt="Not Found"
                                    style={{ maxWidth: "200px" }}
                                    className="mb-4"
                                />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="fw-bold text-primary mb-3"
                            >
                                {searchTerm
                                    ? `No results found for "${searchTerm}"`
                                    : "Page Not Found"}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="text-muted mb-4"
                            >
                                {searchTerm
                                    ? "We couldn't find any products or categories matching your search."
                                    : "The page you are looking for doesn't exist or has been moved."}
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="d-flex flex-wrap justify-content-center gap-3"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary rounded-pill px-4 py-2"
                                onClick={() => navigate(-1)}
                            >
                                <FaArrowLeftLong className="me-2" /> Go Back
                            </motion.button>

                            <Link
                                to="/"
                                className="btn btn-outline-primary rounded-pill px-4 py-2"
                            >
                                <FaHouse className="me-2" /> Home Page
                            </Link>

                            {searchTerm && (
                                <Link
                                    to="/categories"
                                    className="btn btn-outline-secondary rounded-pill px-4 py-2"
                                >
                                    <FaMagnifyingGlass className="me-2" /> Browse Categories
                                </Link>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}

export default NotFound; 