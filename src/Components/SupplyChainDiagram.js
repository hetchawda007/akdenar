import { motion } from "framer-motion";


function SupplyChainDiagram() {
    const supplyChainItems = [
        {
            title: "Product Sourcing from Farms",
            description: "Fresh groceries from healthy farms",
            image: "https://picsum.photos/150/150?random=13",
            color: "#28a745",
            shadow: "rgba(40, 167, 69, 0.3)",
            emoji: "🌱"
        },
        {
            title: "Quality Checked for Standards",
            description: "Ensuring freshness and purity",
            image: "https://picsum.photos/150/150?random=14",
            color: "#3a7bfc",
            shadow: "rgba(58, 123, 252, 0.3)",
            emoji: "✓"
        },
        {
            title: "Home Delivery by 7 am",
            description: "Fast and reliable service",
            image: "https://picsum.photos/150/150?random=15",
            color: "#fd7e14",
            shadow: "rgba(253, 126, 20, 0.3)",
            emoji: "🚚"
        },
    ];

    const cities = ["Guntur", "Delhi NCR", "Hyderabad", "Jaipur", "Kolkata", "Lucknow", "Mumbai", "Mysore", "Nashik", "Pune", "Surat", "Vijayawada"];

    return (
        <section className="supply-chain-section my-5 position-relative overflow-hidden py-5">
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                background: "linear-gradient(135deg, rgba(240, 249, 255, 1) 0%, rgba(214, 240, 253, 0.5) 100%)",
                zIndex: -1
            }}></div>

            {/* Decorative elements */}
            <div className="position-absolute top-0 end-0 d-none d-lg-block" style={{ width: "20%", height: "20%", opacity: 0.1, zIndex: 0 }}>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#28a745" d="M47.5,-61.7C59.9,-53.5,67.3,-37.6,70.8,-21.5C74.3,-5.5,73.8,10.6,67.1,23.5C60.4,36.4,47.5,46.1,33.3,53.6C19.1,61.1,3.5,66.4,-14.8,68.2C-33.1,70.1,-54.1,68.5,-63.4,56.9C-72.7,45.3,-70.3,23.6,-68.5,3.4C-66.7,-16.7,-65.4,-35.4,-55.6,-44C-45.9,-52.7,-27.7,-51.4,-11.7,-52.8C4.3,-54.2,35.1,-69.9,47.5,-61.7Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="position-absolute bottom-0 start-0 d-none d-lg-block" style={{ width: "15%", height: "15%", opacity: 0.1, zIndex: 0 }}>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#3a7bfc" d="M45.3,-59.4C58.8,-51.3,70.1,-38,73.7,-22.9C77.3,-7.8,73.3,9.1,66.4,24.1C59.5,39.1,49.8,52.2,37,60.1C24.1,68,8.2,70.8,-7.4,69.9C-23,69,-38.3,64.5,-47.3,54.3C-56.4,44.1,-59.2,28.2,-63.3,11.9C-67.4,-4.5,-72.8,-21.2,-67.9,-33.1C-63,-45.1,-47.9,-52.2,-33.8,-60C-19.7,-67.8,-6.5,-76.2,6.8,-75.9C20.1,-75.7,40.1,-67,45.3,-59.4Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="container position-relative" style={{ zIndex: 1 }}>
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center fw-bold mb-2 display-5"
                >
                    From <span className="text-gradient">Farm to Home</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-muted mb-5 fw-medium text-center fs-5 mx-auto"
                    style={{ maxWidth: "700px" }}
                >
                    Fresh products delivered directly from producers to your doorstep daily
                </motion.p>

                <div className="position-relative d-flex justify-content-evenly align-items-center flex-wrap gap-4 my-5">
                    {/* Connecting line */}
                    <motion.div
                        className="position-absolute top-50 start-0 end-0"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            transform: "translateY(-50%)",
                            height: "3px",
                            background: "linear-gradient(90deg, #28a745, #3a7bfc, #fd7e14)",
                            zIndex: 0
                        }}
                    />

                    {/* Animated dots on the line */}
                    <motion.div
                        className="position-absolute top-50 start-0 end-0 d-flex justify-content-between"
                        style={{ transform: "translateY(-50%)", zIndex: 0 }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="rounded-circle"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.8 + i * 0.15,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 10
                                }}
                                style={{
                                    width: "10px",
                                    height: "10px",
                                    background: "white",
                                    border: "2px solid #3a7bfc",
                                    boxShadow: "0 0 10px rgba(58, 123, 252, 0.5)"
                                }}
                            />
                        ))}
                    </motion.div>

                    {supplyChainItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                            className="text-center position-relative z-2"
                            style={{ maxWidth: "260px" }}
                        >
                            <div className="supply-chain-step mb-4">
                                <motion.div
                                    className="icon-wrapper mx-auto position-relative"
                                    initial={{ rotate: 0 }}
                                    whileInView={{ rotate: [0, -5, 5, -5, 0] }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: `0 10px 25px ${item.shadow}`
                                    }}
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        borderRadius: "24px",
                                        background: `linear-gradient(135deg, white, #f8f9fa)`,
                                        boxShadow: `0 15px 30px ${item.shadow}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        position: "relative",
                                        overflow: "hidden",
                                        zIndex: 1
                                    }}
                                >
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100"
                                        style={{
                                            background: `linear-gradient(135deg, ${item.color}22, ${item.color}11)`,
                                            zIndex: -1
                                        }}
                                    ></div>

                                    <div
                                        className="icon-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "110px",
                                            height: "110px",
                                            borderRadius: "20px",
                                            background: "white",
                                            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                                            overflow: "hidden"
                                        }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.6 + index * 0.2 }}
                                            style={{ width: "100%", height: "100%" }}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-100 h-100"
                                                style={{ objectFit: "cover" }}
                                                onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=Supply")}
                                            />
                                        </motion.div>
                                    </div>

                                    <div
                                        className="position-absolute top-0 end-0 d-flex align-items-center justify-content-center m-2"
                                        style={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "12px",
                                            background: item.color,
                                            color: "white",
                                            boxShadow: `0 4px 10px ${item.shadow}`,
                                            fontSize: "18px"
                                        }}
                                    >
                                        {item.emoji}
                                    </div>

                                    <div
                                        className="position-absolute top-0 start-0 m-2 badge"
                                        style={{
                                            background: "white",
                                            color: item.color,
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                                        }}
                                    >
                                        Step {index + 1}
                                    </div>
                                </motion.div>

                                <div className="mt-4 px-2">
                                    <motion.h5
                                        className="fw-bold mb-2"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.4 + index * 0.2 }}
                                        style={{ color: item.color }}
                                    >
                                        {item.title}
                                    </motion.h5>
                                    <motion.p
                                        className="text-muted mb-0"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                                    >
                                        {item.description}
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-5 pt-4 text-center">
                    <motion.h5
                        className="fw-bold mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        We Deliver In
                    </motion.h5>

                    <motion.div
                        className="city-cloud d-flex justify-content-center align-items-center flex-wrap gap-2 mx-auto mt-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{ maxWidth: "800px" }}
                    >
                        {cities.map((city, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.3 + index * 0.05,
                                    type: "spring",
                                    stiffness: 200
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                                }}
                                className="city-pill"
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "30px",
                                    background: "white",
                                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                                    fontWeight: "500",
                                    fontSize: "0.9rem",
                                    color: index % 3 === 0 ? "#28a745" : index % 3 === 1 ? "#3a7bfc" : "#fd7e14"
                                }}
                            >
                                {city}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                .supply-chain-section {
                    border-radius: 30px;
                    margin-left: 15px;
                    margin-right: 15px;
                }
                
                .text-gradient {
                    background: linear-gradient(120deg, #28a745, #3a7bfc);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                .city-pill {
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                
                @media (max-width: 768px) {
                    .supply-chain-section {
                        margin-left: 0;
                        margin-right: 0;
                        border-radius: 0;
                    }
                }
            `}</style>
        </section>
    );
}

export default SupplyChainDiagram;