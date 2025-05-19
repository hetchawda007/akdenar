import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useAnimation, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import ContactForm from "./Components/ContactForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import 'bootstrap';
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Footer from "./Components/Footer";
import SupplyChainDiagram from "./Components/SupplyChainDiagram";
import About from "./Components/About";
import Contact from "./Components/Contact";
import ProductContactForm from "./Components/ProductContactForm";
import TestimonialsPage from "./Components/TestimonialsPage";
import ScrollToTop from "./Components/ScrollToTop";
import WhatsAppButton from "./Components/WhatsAppButton";
import CategoriesPage from "./Components/CategoriesPage";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaUsers,
  FaLeaf,
  FaHeart,
  FaGlobe,
  FaArrowRight,
  FaStar,
  FaMagnifyingGlass,
  FaHouse,
  FaArrowLeft,
  FaArrowLeftLong
} from "react-icons/fa6";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from 'react-helmet';

// Export the catalogs data so it can be imported by other components

export const catalogs = [
  {
    name: "Rice",
    image: "/RiceCategory.webp",
    colors: ["#ff4d4d", "#ffa500", "#8b4513"],
    categories: [
      {
        name: "Steam",
        description: "Steamed rice varieties, retaining nutrients and texture.",
        image: "/1121 Steam.webp",
        subItems: [
          { name: "1121 Steam", image: "/1121 Steam.webp", description: "Steamed version, retains nutrients and texture. Price: ₹75,000 - ₹90,000", priceRange: "₹75,000 - ₹90,000" },
          { name: "1718 Steam", image: "/1718 Steam.webp", description: "Steamed version, retains nutrients. Price: ₹63,000 - ₹87,000", priceRange: "₹63,000 - ₹87,000" },
          { name: "1509 Steam", image: "/1509 Steam.webp", description: "Steamed version, retains texture. Price: ₹66,000 - ₹78,000", priceRange: "₹66,000 - ₹78,000" },
          { name: "1401 Steam", image: "/1401 Steam.webp", description: "Steamed version, nutrient retention. Price: ₹69,000 - ₹88,000", priceRange: "₹69,000 - ₹88,000" },
          { name: "PUSA Steam", image: "/Pusa Steam.webp", description: "Steamed version, retains nutrients. Price: ₹58,000 - ₹82,000", priceRange: "₹58,000 - ₹82,000" },
          { name: "Traditional Steam", image: "/Rice Traditional.webp", description: "Steamed version, preserves flavor. Price: ₹83,000 - ₹109,000", priceRange: "₹83,000 - ₹109,000" },
          { name: "Sugandha Steam", image: "/sugandha-steam-rice-29.webp", description: "Steamed version, retains texture. Price: ₹56,000 - ₹66,000", priceRange: "₹56,000 - ₹66,000" },
          { name: "Sharbati Steam", image: "/Sharbati Steam.webp", description: "Steamed version, perfect for daily use. Price: ₹51,000 - ₹62,000", priceRange: "₹51,000 - ₹62,000" },
          { name: "Sona Masoori Steam", image: "/Soona Mansoori Steam.webp", description: "Steamed version, retains texture. Price: ₹51,000 - ₹52,000", priceRange: "₹51,000 - ₹52,000" },
          { name: "Parmal Steam (Short-Grain)", image: "/Parmal Steam.webp", description: "Steamed version, retains texture. Price: ₹46,000 - ₹51,000", priceRange: "₹46,000 - ₹51,000" },
          { name: "RH-10 Steam (Short-Grain)", image: "/rh-10 steam.webp", description: "Steamed version, ideal for sticky dishes. Price: ₹42,000 - ₹55,000", priceRange: "₹42,000 - ₹55,000" },
          { name: "PR 11/PR 14 Steam (Traditional-Grain)", image: "/Pr11 14 Steam.webp", description: "Steamed version, preserves flavor. Price: ₹48,000 - ₹52,500", priceRange: "₹48,000 - ₹52,500" },
          { name: "Taj Steam ", image: "/Taj Steam.webp", description: "Steamed version, preserves flavor. Price: ₹42,000 - ₹55,000", priceRange: "₹42,000 - ₹55,000" },
        ]
      },
      {
        name: "Sella",
        description: "Parboiled rice varieties with enhanced nutritional value.",
        image: "/1121 sella.webp",
        subItems: [
          { name: "1121 Sella", image: "/1121 sella.webp", description: "Parboiled version with enhanced nutritional value. Price: ₹78,000 - ₹92,000", priceRange: "₹78,000 - ₹92,000" },
          { name: "1718 Sella", image: "/1718 Sella.webp", description: "Parboiled version, nutrient-rich. Price: ₹66,000 - ₹89,000", priceRange: "₹66,000 - ₹89,000" },
          { name: "1509 Sella", image: "/1509 Sella.webp", description: "Parboiled version, durable. Price: ₹69,000 - ₹80,000", priceRange: "₹69,000 - ₹80,000" },
          { name: "1401 Sella", image: "/1401 Sella.webp", description: "Parboiled version, enhanced nutrition. Price: ₹72,000 - ₹90,000", priceRange: "₹72,000 - ₹90,000" },
          { name: "PUSA Sella", image: "/pusa Sella.webp", description: "Parboiled version, nutrient-rich. Price: ₹61,000 - ₹84,000", priceRange: "₹61,000 - ₹84,000" },
          { name: "Sugandha Sella", image: "/sugandha-white-sella-basmati-rice.webp", description: "Parboiled version, durable. Price: ₹59,000 - ₹68,000", priceRange: "₹59,000 - ₹68,000" },
          { name: "Sharbati Sella", image: "/sharbati sella.webp", description: "Parboiled version, nutrient-rich. Price: ₹54,000 - ₹65,000", priceRange: "₹54,000 - ₹65,000" },
          { name: "Sona Masoori Sella", image: "/Rice Medium.webp", description: "Parboiled version, durable. Price: ₹54,000 - ₹53,000", priceRange: "₹54,000 - ₹53,000" },
          { name: "PR 11/PR 14 Sella (Short-Grain)", image: "/Pr11 Sella.webp", description: "Parboiled version, enhances stickiness. Price: ₹51,000 - ₹55,500", priceRange: "₹51,000 - ₹55,500" },
          { name: "Parmal Sella (Short-Grain)", image: "/Pr Sella.webp", description: "Parboiled version, durable. Price: ₹49,000 - ₹53,000", priceRange: "₹49,000 - ₹53,000" },
          { name: "RH-10 Sella (Short-Grain)", image: "/RH-10 sella.webp", description: "Parboiled version, enhances stickiness. Price: ₹45,000 - ₹58,000", priceRange: "₹45,000 - ₹58,000" },
          { name: "Taj Sella (Traditional-Grain)", image: "/Taj Sella.webp", description: "Parboiled version, nutrient-rich. Price: ₹45,000 - ₹58,000", priceRange: "₹45,000 - ₹58,000" },
        ]
      },
      {
        name: "Golden",
        description: "Golden-hued premium rice varieties, visually appealing.",
        image: "/Golden.webp",
        subItems: [
          { name: "1121 Golden", image: "/Golden.webp", description: "Golden-hued premium rice, visually appealing. Price: ₹80,000 - ₹95,000", priceRange: "₹80,000 - ₹95,000" },
          { name: "1718 Golden", image: "/1718 Golden.webp", description: "Golden-hued premium rice. Price: ₹68,000 - ₹91,000", priceRange: "₹68,000 - ₹91,000" },
          { name: "1509 Golden", image: "/1509 Golden.webp", description: "Golden-hued premium rice. Price: ₹71,000 - ₹82,000", priceRange: "₹71,000 - ₹82,000" },
          { name: "1401 Golden", image: "/1401 golden.webp", description: "Golden-hued premium rice. Price: ₹74,000 - ₹92,000", priceRange: "₹74,000 - ₹92,000" },
          { name: "PUSA Golden", image: "/Pusa Golden.webp", description: "Golden-hued premium rice. Price: ₹63,000 - ₹86,000", priceRange: "₹63,000 - ₹86,000" },
          { name: "Sugandha Golden", image: "/Sugandha Golden Sella.webp", description: "Golden-hued premium rice. Price: ₹61,000 - ₹70,000", priceRange: "₹61,000 - ₹70,000" },
          { name: "Sharbati Golden", image: "/sharbati Golden sella.webp", description: "Golden-hued premium rice. Price: ₹56,000 - ₹67,000", priceRange: "₹56,000 - ₹67,000" },
          { name: "Sona Masoori Golden", image: "/sona mansoori golden.webp", description: "Golden-hued premium rice. Price: ₹56,000 - ₹54,000", priceRange: "₹56,000 - ₹54,000" },
          { name: "PR 11/PR 14 Golden (Short-Grain)", image: "/pr11 14 golden.webp", description: "Golden-hued premium sticky rice. Price: ₹53,000 - ₹57,500", priceRange: "₹53,000 - ₹57,500" },
          { name: "Parmal Golden (Short-Grain)", image: "/parmal Golden.webp", description: "Golden-hued premium rice. Price: ₹51,000 - ₹55,000", priceRange: "₹51,000 - ₹55,000" },
          { name: "RH-10 Golden (Short-Grain)", image: "/RH-10 Golden.webp", description: "Golden-hued premium sticky rice. Price: ₹47,000 - ₹60,000", priceRange: "₹47,000 - ₹60,000" },
          { name: "PR 11/PR 14 Golden (Traditional-Grain)", image: "/pr11 14 golden.webp", description: "Golden-hued premium rice. Price: ₹53,000 - ₹57,500", priceRange: "₹53,000 - ₹57,500" },
        ]
      },
      {
        name: "Raw",
        description: "Unprocessed rice varieties, rich in natural flavor.",
        image: "/1121 Raw.webp",
        subItems: [
          { name: "1121 Raw", image: "/1121 Raw.webp", description: "Unprocessed version, rich in natural flavor. Price: ₹70,000 - ₹85,000", priceRange: "₹70,000 - ₹85,000" },
          { name: "1718 Raw", image: "/1718 Raw.webp", description: "Unprocessed, natural flavor. Price: ₹58,000 - ₹82,000", priceRange: "₹58,000 - ₹82,000" },
          { name: "1509 Raw", image: "/1509 Raw.webp", description: "Unprocessed, natural taste. Price: ₹61,000 - ₹73,000", priceRange: "₹61,000 - ₹73,000" },
          { name: "1401 Raw", image: "/1401 Raw.webp", description: "Unprocessed, rich flavor. Price: ₹64,000 - ₹83,000", priceRange: "₹64,000 - ₹83,000" },
        ]
      },
    ]
  },
  {
    name: "Salt",
    image: "SALTCATALOG.webp",
    colors: ["#d2a679", "#8b4513", "#ffd700"],
    categories: [
      { name: "Raw Salt", description: "Minimally processed, retains natural minerals. Price: ₹1,650 - ₹2000 per metric ton (50 kg bag)", image: "/Raw salt .webp", subItems: [{ name: "Raw Salt", image: "/Raw salt .webp", description: "Retains natural minerals. Price: ₹1,650", priceRange: "₹1,650 - ₹2000" }] },
      { name: "Industrial Salt", description: "High purity, used in chemical production. Price: ₹1700 - 2400 per metric ton (40 kg bag)", image: "/Industrial Salt.webp", subItems: [{ name: "Industrial Salt", image: "/Industrial Salt.webp", description: "Used in de-icing. Price: ₹2,300", priceRange: "₹1700 - ₹2400" }] },
      { name: "Washed Variants", description: "Purified through washing, suitable for culinary use. Price:  ₹1700 - 2400 per metric ton (40 kg bag)", image: "/Washesd Varient.webp", subItems: [{ name: "Washed Salt", image: "/Washesd Varient.webp", description: "Culinary use. Price: ₹2,000", priceRange: " ₹1700 - ₹2400" }] },
      {
        name: "Crystal Salt",
        description: "Coarse crystals, used in gourmet cooking. Price: ₹1,900 per metric ton (40 kg bag)",
        image: "/Granuals.webp",
        subItems: [
          { name: "Sooji Dark Pink Salt", description: "Dark pink coarse crystals for gourmet cooking. Price: ₹27 per kg", image: "/Lahori Sooji Dark Pink.webp", priceRange: "₹27 - ₹30" },
          { name: "Sooji Rose Pink Salt", description: "Rose pink coarse crystals for gourmet cooking. Price: ₹27 per kg", image: "/Khrwa Sooji Rose Pink.webp", priceRange: "₹27 - ₹30" },
          { name: "Red Granuals", description: "Red coarse granules for gourmet cooking. Price:₹36 per kg", image: "/Granuals.webp", priceRange: "₹36 - ₹40" },
          { name: " Suji", description: "Lahori-style coarse crystals for gourmet cooking. Price: ₹27 per kg", image: "/Lahori Sooji.webp", priceRange: "₹27 - ₹30" },
          { name: "Granules", description: "Standard coarse granules for gourmet cooking. Price: ₹37 per kg", image: "/White Granuals.webp", priceRange: "₹37 - ₹40" },
          { name: "Light Pink Suji", description: "Light pink coarse crystals for gourmet cooking. Price: ₹27 per kg", image: "/Light pink sooji.webp", priceRange: "₹27 - ₹30" },
          { name: "Red Lumps", description: "Red lump crystals for gourmet cooking. Price: ₹23 per kg", image: "/Red Lump.webp", priceRange: "₹23 - ₹30" },
          { name: " Light Suji", description: "Light Lahori-style coarse crystals for gourmet cooking. Price: ₹27 per kg", image: "/Lahori Light Sooji.webp", priceRange: "₹27 - ₹30" },
          { name: " Lumps", description: "Kherwa lump crystals for gourmet cooking. Price: ₹19 per kg", image: "/Kherwa Lumps.webp", priceRange: "₹19 - ₹23" },
          { name: "Lumps", description: "Lahori lump crystals for gourmet cooking. Price: ₹18 per kg", image: "/Lahori Lump.webp", priceRange: "₹18 - ₹23" },
          { name: "Sooji Grade B-", description: "Grade B- Kherwa coarse crystals for gourmet cooking. Price: ₹27 per kg", image: "/Kherwa Sooji Grade -B.webp", priceRange: "₹27 - ₹30" },
          { name: "Black Salt Lumps", description: "Black salt lump crystals for gourmet cooking. Price: ₹31 per kg", image: "/Balck Salt Lumps.webp", priceRange: "₹311 - ₹35" },
          { name: "Powders", description: "Finely ground crystal salt for gourmet cooking. Price: ₹25 per kg", image: "/Powder.webp", priceRange: "₹27 - ₹30" },
          { name: "Soji", description: "Soji-style coarse crystals for gourmet cooking. Price: ₹29 per kg", image: "/Sooji.webp", priceRange: "₹29 - ₹34" },
        ]
      },
      { name: "Refined Salt", description: "Highly processed, pure white table salt. Price: ₹3,100 per metric ton (40 kg bag)", image: "/refined salt.webp", subItems: [{ name: "Refined Free Flow Salt", image: "/refined salt.webp", description: "Common table salt. Price: ₹3,100", priceRange: "₹3100 - ₹3500" }] },
      { name: "Iodized Salt", description: "Refined with added iodine to prevent deficiency. Price: ₹3,500 per metric ton (40 kg bag)", image: "/Iodised Salt.webp", subItems: [{ name: "Refined Iodized Free Flow Salt", image: "/115.webp", description: "Prevents iodine deficiency. Price: ₹4,000", priceRange: "₹4000 - ₹4500" }, { name: "Refined Iodized Free Flow Salt", image: "/116.webp", description: "Prevents iodine deficiency. Price: ₹3,500", priceRange: "₹4000 - ₹4500" }, { name: "Refined Iodized Free Flow Salt", image: "/114.webp", description: "Prevents iodine deficiency. Price: ₹3,500", priceRange: "₹4000 - ₹4500" }, { name: "Refined Iodized Free Flow Salt", image: "/113.webp", description: "Prevents iodine deficiency. Price: ₹3,500", priceRange: "₹4000 - ₹4500" }, { name: "Refined Iodized Free Flow Salt", image: "/112.webp", description: "Prevents iodine deficiency. Price: ₹3,500", priceRange: "₹4000 - ₹4500" }, { name: "Refined Iodized Free Flow Salt", image: "/111.webp", description: "Prevents iodine deficiency. Price: ₹3,500", priceRange: "₹4000 - ₹4500" }, { name: "Refined Iodized Free Flow Salt", image: "/Iodised Salt.webp", description: "Prevents iodine deficiency. Price: ₹3,500", priceRange: "₹4000 - ₹4500" },] },
    ]
  },
  {
    name: "Sugar",
    image: "/SugarCATALOG.webp",
    colors: ["#ffd700", "#32cd32", "#ff4500"],
    categories: [
      { name: "White Sugar", description: "Refined and granulated for everyday cooking.", image: "/white sugar.webp", subItems: [{ name: "White Sugar", description: "Refined granulated sugar. Price: Not specified", image: "/white sugar.webp", priceRange: "Sumit Inquiry For Rates" }] },
      { name: "Brown Sugar", description: "Contains molasses, adds caramel flavor.", image: "/brownsugar eatable.webp", subItems: [{ name: "Brown Sugar", image: "/brownsugar eatable.webp", description: "With molasses. Price: Not specified", priceRange: "Sumit Inquiry For Rates" }] },
      { name: "Jaggery", description: "Unrefined sugar made from cane, traditional sweetener.", image: "/jaggry.webp", subItems: [{ name: "Jaggery", image: "/jaggry.webp", description: "Traditional cane sugar. Price: Not specified", priceRange: "Sumit Inquiry For Rates" }] },
    ]
  },
  {
    name: "Spices",
    image: "/SpicesCatalog.webp",
    colors: ["#ff4d4d", "#ffa500", "#8b4513"],
    categories: [
      {
        name: "Whole Spices",
        description: "Unprocessed seeds or pods for authentic flavor.",
        image: "/Whole Spice.webp",
        subItems: [
          { name: "Cinnamon Sticks", description: "For flavoring liquids. Price:₹160 - 400 ", image: "/cinennimon cigar.webp", priceRange: "₹160 - 400" },
          { name: "Cardamom", description: "Aromatic quality. Price: ₹2000 - 3400 ", image: "/Cardamom.webp", priceRange: "₹2000 - 3400" },
          { name: "Black Pepper (Whole)", description: "Sharp flavor. Price: ₹650 - 850 per 1000kg", image: "/BlackPepper.webp", priceRange: "₹650 - 850" },
          { name: "Ajwaeen", description: "Earthy flavor. Price: ₹130 - 250 per 1000kg", image: "/Ajwaineen.webp", priceRange: "₹130 - 250" },
          { name: "Clove", description: "Earthy flavor. Price: ₹700-  1200 per 1000kg", image: "/clove.webp", priceRange: "₹700-  1200" },
          { name: "Mace", description: "Earthy flavor. Price: ₹1600 - 2500 per 1000kg", image: "/Mace.webp", priceRange: "₹1600 - 2500" },
          { name: "Jeera", description: "Earthy flavor. Price: ₹180 - 310 per 1000kg", image: "/Jeera.webp", priceRange: "₹₹180 - 310" },
          { name: "Red Chilli", description: "Earthy flavor. Price: ₹70 - 270 per 1000kg", image: "/Red Chilli.webp", priceRange: "₹70 - 270" },
        ]
      },
      {
        name: "Ground Spices",
        description: "Powdered forms for convenience.",
        image: "/Spices Powder.webp",
        subItems: [
          { name: "Turmeric Powder", image: "/Turmeric Powder.webp", description: "Health benefits. Price: ₹150 - 300 per 1000kg", priceRange: "₹150 - 300" },
          { name: "Chili Powder (Mirch)", image: "/red powder chilli.webp", description: "Adds heat. Price: ₹670 - 1200 1000kg", priceRange: "670 - 1200" },
          { name: "Coriander Powder", image: "/corriender powder.webp", description: "Citrusy flavor. Price: ₹110 - 310 per 1000kg", priceRange: "₹110 - 310" },
          { name: "Black Pepper Powder", image: "/black pepper powder Image.webp", description: "Intense flavor. Price: ₹670 - 1300 per 1000kg", priceRange: "₹670 - 1300" },
        ]
      },
      {
        name: "Spice Blends",
        description: "Mixed spices for enhanced taste.",
        image: "/spices blend.webp",
        subItems: [
          { name: "Garam Masala (Economical & Special)", image: "/Garam Masala.webp", description: "Aromatic blend. Price: ₹280-₹480 per 1000kg", priceRange: "₹280 - ₹480" },
          { name: "Za'atar", image: "/zaatar masala.webp", description: "Middle Eastern blend. Price: Not specified", priceRange: "Submit Request For Rates" },
          { name: "Chicken Masala", image: "/chicken masala.webp", description: "For chicken dishes. Price: ₹380 per 1000kg", priceRange: "₹380 -700" },
          { name: "Meat Masala", image: "/Meat Masala.webp", description: "For meat dishes. Price: ₹380 per 1000kg", priceRange: "₹380-700" },
        ]
      },
    ]
  },
  {
    name: "Dry Fruits",
    image: "/DryfruitsCatalog.webp",
    colors: ["#d2a679", "#8b4513", "#ffd700"],
    categories: [
      {
        name: "Nuts",
        description: "Rich in healthy fats.",
        image: "/Nuts.jpeg",
        subItems: [
          { name: "Almonds", image: "/Almond.webp", description: "Great for snacking. Price: Not specified", priceRange: "Submit Request For Rates" },
          { name: "Cashews", image: "/kaju.webp", description: "Used in desserts. Price: Not specified", priceRange: "Submit Request For Rates" },
          { name: "Walnuts", image: "/Walnut.webp", description: "High in omega-3s. Price: Not specified", priceRange: "Submit Request For Rates" },
        ]
      },
      {
        name: "Dried Fruits",
        description: "Dehydrated for long shelf life.",
        image: "/Dried Fruits.jpeg",
        subItems: [
          { name: "Raisins", image: "/kismiss.webp", description: "Sweet and chewy. Price: Not specified", priceRange: "Submit Request For Rates" },
          { name: "Anjeer", image: "/anjeer.webp", description: "Tangy and sweet. Price: Not specified", priceRange: "Submit Request For Rates" },
          { name: "Dates", image: "/dates.webp", description: "Natural sweetener. Price: Not specified", priceRange: "Submit Request For Rates" },
        ]
      },
      {
        name: "Seeds",
        description: "Nutritious edible seeds.",
        image: "/sseds.jpeg",
        subItems: [
          { name: "Pumpkin Seeds", image: "/pumpkin seeds.webp", description: "For salads. Price: Not specified", priceRange: "Submit Request For Rates" },
          { name: "Sunflower Seeds", image: "/sun flower seeds.webp", description: "For baking. Price: Not specified", priceRange: "Submit Request For Rates" },
          { name: "Chia Seeds", image: "/chia seeds.webp", description: "High in fiber. Price: Not specified", priceRange: "Submit Request For Rates" },
        ]
      },
    ]
  },
  {
    name: "Cooking Oil",
    image: "/OILCATALOG.webp",
    colors: ["#ffd700", "#32cd32", "#ff4500"],
    categories: [
      {
        name: "Vegetable Oil",
        description: "Neutral oils for frying.",
        image: "/vegetable oil.webp",
        subItems: [
          { name: "Vegetable Oil", image: "/vegetable oil.webp", description: "Soybean or sunflower. Price: Not specified", priceRange: "Submit Request For Rates" }
        ]
      },
      {
        name: "Olive Oil",
        description: "Extracted from olives for gourmet cooking.",
        image: "/olive oil.webp",
        subItems: [
          { name: "Olive Oil", image: "/olive oil.webp", description: "Gourmet use. Price: Not specified", priceRange: "Submit Request For Rates" }
        ]
      },
      {
        name: "Specialty Oils",
        description: "Unique oils for diverse cuisines.",
        image: "/Specialty.jpeg",
        subItems: [
          { name: "Coconut Oil", image: "/coconut oil.webp", description: "Rich flavor. Price: Not specified", priceRange: "Submit Request For Rates" },
          { name: "Mustard Oil", image: "/musterd Oil.webp", description: "Pungent flavor. Price: Not specified", priceRange: "Submit Request For Rates" },
          { name: "Sesame Oil", image: "/sesam oil.webp", description: "Nutty flavor. Price: Not specified", priceRange: "Submit Request For Rates" },
        ]
      },
    ]
  },
];

const carouselItems = [
  {
    keyword: "Premium Products",
    description: "Explore our selection of high-quality everyday essentials",
    image: "/11.webp",
    color: "#66a3ff"
  },
  {
    keyword: "Quality Selection",
    description: "From producer to your doorstep, with care and quality",
    image: "/14.webp",
    color: "#7cb8ff"
  },
  {
    keyword: "Organic Goods",
    description: "Naturally grown and ethically sourced products",
    image: "/13.webp",
    color: "#7cb8ff"
  },
  {
    keyword: "Global Reach",
    description: "Serving customers worldwide with premium quality products",
    image: "/12.webp",
    color: "#7cb8ff"
  },
  {
    keyword: "Sustainable Future",
    description: "Committed to eco-friendly practices and sustainable sourcing",
    image: "/15.webp",
    color: "#7cb8ff"
  }
];

const socialLinks = [
  { Icon: FaFacebookF, href: "#" },
  { Icon: FaTwitter, href: "#" },
  { Icon: FaInstagram, href: "#" },
  { Icon: FaLinkedinIn, href: "#" },
  { Icon: FaYoutube, href: "#" },
];

const testimonials = [
  { quote: "Their products are my family's favorite - everything is premium quality!", image: "https://picsum.photos/120/120?random=1", name: "Dipanjana Nandi", location: "Bengaluru", rating: 5 },
  { quote: "Akdenar makes shopping so convenient with fast delivery and excellent service!", image: "https://picsum.photos/120/120?random=2", name: "Shalini Bardhan", location: "Kolkata", rating: 5 },
  { quote: "Absolutely love their selection! Everything arrives in perfect condition.", image: "https://picsum.photos/120/120?random=3", name: "Rukma Dakshy", location: "Kolkata", rating: 4 },
  { quote: "I've never had a delivery service better than Akdenar!", image: "https://picsum.photos/120/120?random=4", name: "Bitu Mazumder", location: "Kolkata", rating: 5 },
  { quote: "Their premium selection is worth every penny - quality you can trust!", image: "https://picsum.photos/120/120?random=5", name: "Alfateh Mustafa", location: "Bengaluru", rating: 5 },
];

function Testimonials() {

  return (
    <section className="testimonials-section py-5 position-relative overflow-hidden"
      style={{
        marginTop: "100px",
      }}
    >
      {/* Background decoration */}
      <div className="position-absolute top-0 start-0 w-100 h-100 testimonial-bg-pattern"></div>

      <div className="position-absolute top-0 start-0" style={{ width: "20%", height: "50%", opacity: 0.05, zIndex: 0 }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#3a7bfc" d="M47.5,-61.7C59.9,-53.5,67.3,-37.6,70.8,-21.5C74.3,-5.5,73.8,10.6,67.1,23.5C60.4,36.4,47.5,46.1,33.3,53.6C19.1,61.1,3.5,66.4,-14.8,68.2C-33.1,70.1,-54.1,68.5,-63.4,56.9C-72.7,45.3,-70.3,23.6,-68.5,3.4C-66.7,-16.7,-65.4,-35.4,-55.6,-44C-45.9,-52.7,-27.7,-51.4,-11.7,-52.8C4.3,-54.2,35.1,-69.9,47.5,-61.7Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="position-absolute bottom-0 end-0" style={{ width: "25%", height: "40%", opacity: 0.05, zIndex: 0 }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#3a7bfc" d="M45.3,-59.4C58.8,-51.3,70.1,-38,73.7,-22.9C77.3,-7.8,73.3,9.1,66.4,24.1C59.5,39.1,49.8,52.2,37,60.1C24.1,68,8.2,70.8,-7.4,69.9C-23,69,-38.3,64.5,-47.3,54.3C-56.4,44.1,-59.2,28.2,-63.3,11.9C-67.4,-4.5,-72.8,-21.2,-67.9,-33.1C-63,-45.1,-47.9,-52.2,-33.8,-60C-19.7,-67.8,-6.5,-76.2,6.8,-75.9C20.1,-75.7,40.1,-67,45.3,-59.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* Section header */}
        <div className="text-center mb-5">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="badge bg-primary bg-opacity-10 text-primary fw-medium px-3 py-2 rounded-pill mb-3 d-inline-block"
          >
            Customer Stories
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="fw-bold mb-2 display-5"
          >
            What Our Customers <span className="text-gradient">Love</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted mx-auto fs-5"
            style={{ maxWidth: "700px" }}
          >
            Real experiences from people who trust our selection every day
          </motion.p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="testimonialSwiper py-4"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="h-100"
                whileHover={{ y: -10 }}
              >
                <div
                  className="card border-0 h-100 testimonial-card"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                  }}
                >
                  <div className="position-absolute top-0 start-0 w-100 h-100 testimonial-card-bg"></div>

                  <div className="card-body position-relative p-5">
                    <div className="position-absolute top-0 start-0 p-4" style={{ opacity: 0.1 }}>
                      <svg width="50" height="50" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.5 13.5H13.5C11.0147 13.5 9 15.5147 9 18V27C9 29.4853 11.0147 31.5 13.5 31.5H18C20.4853 31.5 22.5 33.5147 22.5 36V38.25C22.5 41.5637 19.8137 44.25 16.5 44.25C15.2574 44.25 14.25 43.2426 14.25 42C14.25 40.7574 15.2574 39.75 16.5 39.75C17.7426 39.75 18.75 38.7426 18.75 37.5V36C18.75 35.5858 18.4142 35.25 18 35.25H13.5C8.94835 35.25 5.25 31.5517 5.25 27V18C5.25 13.4483 8.94835 9.75 13.5 9.75H22.5C27.0517 9.75 30.75 13.4483 30.75 18V27C30.75 29.4853 28.7353 31.5 26.25 31.5C24.9869 31.5 23.8989 30.8204 23.25 29.8144C22.6011 30.8204 21.5131 31.5 20.25 31.5C17.7647 31.5 15.75 29.4853 15.75 27V18C15.75 17.1716 16.4216 16.5 17.25 16.5C18.0784 16.5 18.75 17.1716 18.75 18V27C18.75 27.8284 19.4216 28.5 20.25 28.5C21.0784 28.5 21.75 27.8284 21.75 27V18C21.75 17.1716 22.4216 16.5 23.25 16.5C24.0784 16.5 24.75 17.1716 24.75 18V27C24.75 27.8284 25.4216 28.5 26.25 28.5C27.0784 28.5 27.75 27.8284 27.75 27V18C27.75 15.1005 25.3995 12.75 22.5 12.75H13.5C10.6005 12.75 8.25 15.1005 8.25 18V27C8.25 29.8995 10.6005 32.25 13.5 32.25H18C21.7279 32.25 24.75 35.2721 24.75 39V41.25C24.75 42.9474 23.3674 44.33 21.6711 44.33C21.6237 44.33 21.5869 44.2932 21.5869 44.2458C21.5869 44.1984 21.6237 44.1616 21.6711 44.1616C23.2742 44.1616 24.5816 42.8542 24.5816 41.25V39C24.5816 35.3763 21.6253 32.42 18.0016 32.42H13.5C10.6924 32.42 8.42 30.1476 8.42 27.34V18.34C8.42 15.5324 10.6924 13.26 13.5 13.26H22.5C25.3076 13.26 27.58 15.5324 27.58 18.34V27.34C27.58 30.1476 25.3076 32.42 22.5 32.42H21.1553C20.5051 32.42 19.9079 32.1367 19.509 31.6461L18.1675 30.0281C18.0614 29.9012 18.0777 29.7124 18.2046 29.6063C18.3316 29.5002 18.5203 29.5165 18.6264 29.6435L19.9679 31.2614C20.2683 31.6307 20.7238 31.845 21.2058 31.8464C21.2057 31.8464 21.2056 31.8464 21.2055 31.8464L22.5 31.8463C25.0317 31.8463 27.0863 29.7917 27.0863 27.26V18.26C27.0863 15.7283 25.0317 13.6737 22.5 13.6737H13.5C10.9683 13.6737 8.91366 15.7283 8.91366 18.26V27.26C8.91366 29.7917 10.9683 31.8463 13.5 31.8463H18C21.6253 31.8463 24.5816 35.3763 24.5816 39V41.25C24.5816 42.9474 23.3674 44.33 21.6711 44.33C21.6237 44.33 21.5869 44.2932 21.5869 44.2458C21.5869 44.1984 21.6237 44.1616 21.6711 44.1616C23.2742 44.1616 24.5816 42.8542 24.5816 41.25V39C24.5816 35.3763 21.6253 32.42 18.0016 32.42H13.5C10.6924 32.42 8.42 30.1476 8.42 27.34V18.34C8.42 15.5324 10.6924 13.26 13.5 13.26H22.5C25.3076 13.26 27.58 15.5324 27.58 18.34V27.34C27.58 30.1476 25.3076 32.42 22.5 32.42H25.2C25.3906 32.42 25.5458 32.003 25.5464 32.1935C25.547 32.3842 25.3928 32.5401 25.2022 32.5412L13.5 32.5489C9.80213 32.5489 6.8 29.5467 6.8 25.8489V16.8489C6.8 13.1511 9.80213 10.1489 13.5 10.1489H22.5C26.1979 10.1489 29.2 13.1511 29.2 16.8489V25.8489C29.2 28.0328 27.9962 29.9336 26.25 30.9235C24.5038 29.9336 23.3 28.0328 23.3 25.8489V16.8489C23.3 16.6591 23.4539 16.5052 23.6437 16.5052C23.8335 16.5052 23.9874 16.6591 23.9874 16.8489V25.8489C23.9874 27.866 25.2329 29.5811 26.9953 30.3367C26.9968 30.3373 26.9984 30.3378 27 30.3384C27.0016 30.3378 27.0032 30.3373 27.0047 30.3367C28.7671 29.5811 30.0126 27.866 30.0126 25.8489V16.8489C30.0126 12.6895 26.6594 9.33631 22.5 9.33631H13.5C9.34063 9.33631 5.98742 12.6895 5.98742 16.8489V25.8489C5.98742 30.0083 9.34063 33.3615 13.5 33.3615H22.5C26.6594 33.3615 30.0126 30.0083 30.0126 25.8489V16.8489C30.0126 16.6591 30.1665 16.5052 30.3563 16.5052C30.5461 16.5052 30.7 16.6591 30.7 16.8489V25.8489C30.7 30.3318 27.0329 33.9831 22.5495 33.9978C22.5495 33.9999 22.5479 34 22.5463 34C18.0513 34 14.4421 30.3715 14.4421 25.8621V16.8621C14.4421 16.6724 14.5959 16.5179 14.7857 16.5173C14.9763 16.5167 15.1321 16.6713 15.1321 16.8619V25.8619C15.1321 29.9895 18.4787 33.3273 22.6 33.3159C26.7249 33.3046 30.0621 29.9507 30.0621 25.8209V16.8209C30.0621 16.6304 30.2178 16.4752 30.4083 16.4757C30.599 16.4763 30.7536 16.6323 30.7532 16.823L30.7467 25.861C30.7467 30.3387 27.1057 33.9678 22.6221 33.9678L22.5 33.9677C17.9773 33.9677 14.3237 30.3172 14.3237 25.7977V16.7977C14.3237 16.6071 14.4781 16.4532 14.6687 16.4537C14.8548 16.454 15.0032 16.6015 15.0058 16.7876L15.0589 25.8277C15.0589 27.5851 15.7642 29.1733 16.8947 30.3039C18.0253 31.4344 19.6136 32.1397 21.371 32.1397H21.7189C19.8165 32.1236 18.11 31.3913 16.8947 30.1739C15.6811 28.9579 15 27.3055 15 25.5V18C15 15.0147 17.0147 13 20 13H23.25C26.2353 13 28.25 15.0147 28.25 18V25.5C28.25 27.3055 27.5689 28.9579 26.3553 30.1739C25.1417 31.39 23.3055 32.1397 21.5 32.1397" fill="#0D0D0D" />
                      </svg>
                    </div>

                    <div className="d-flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={18}
                          className="me-1"
                          style={{
                            color: i < testimonial.rating ? "#ffc107" : "#e0e0e0"
                          }}
                        />
                      ))}
                    </div>

                    <p className="mb-4 fs-5 fw-light" style={{ minHeight: "110px", lineHeight: "1.7" }}>
                      "{testimonial.quote}"
                    </p>

                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle me-3 overflow-hidden"
                        style={{
                          width: "55px",
                          height: "55px",
                          border: "2px solid rgba(58, 123, 252, 0.2)"
                        }}
                      >
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-100 h-100 object-fit-cover"
                          onError={(e) => (e.target.src = "https://via.placeholder.com/50?text=User")}
                        />
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold" style={{ color: "#333" }}>{testimonial.name}</h6>
                        <p className="text-muted small mb-0">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-5"
        >
          <Link
            to="/testimonials"
            className="btn btn-outline-primary rounded-pill px-4 py-3 fw-medium"
          >
            See More Reviews <FaArrowRight className="ms-2" size={14} />
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .testimonials-section {
          background-color: #f8f9fa;
        }
        
        .testimonial-bg-pattern {
          background-image: 
            radial-gradient(#3a7bfc 1px, transparent 1px),
            radial-gradient(#3a7bfc 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: 0 0, 20px 20px;
          opacity: 0.05;
          z-index: 0;
        }
        
        .text-gradient {
          background: linear-gradient(120deg, #3a7bfc, #0046c0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .testimonial-card {
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }
        
        .testimonial-card-bg {
          background: radial-gradient(150% 100% at 100% 0%, #ffffff 0%, #f7f9fc 100%);
          z-index: 0;
        }
        
        .testimonialSwiper .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }
        
        .testimonialSwiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(58, 123, 252, 0.3);
          opacity: 1;
          transition: all 0.3s;
        }
        
        .testimonialSwiper .swiper-pagination-bullet-active {
          background: #3a7bfc;
          width: 30px;
          border-radius: 10px;
        }
        
        .testimonialSwiper .swiper-button-next,
        .testimonialSwiper .swiper-button-prev {
          color: #3a7bfc;
          background: white;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
        }
        
        .testimonialSwiper .swiper-button-next:hover,
        .testimonialSwiper .swiper-button-prev:hover {
          background: #3a7bfc;
          color: white;
          transform: scale(1.1);
        }
        
        .testimonialSwiper .swiper-button-next::after,
        .testimonialSwiper .swiper-button-prev::after {
          font-size: 18px;
          font-weight: bold;
        }
        
        @media (max-width: 768px) {
          .testimonialSwiper .swiper-button-next,
          .testimonialSwiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

function HeroCarousel() {
  return (
    <div className="position-relative hero-carousel-wrapper overflow-hidden rounded-4" style={{ marginTop: "150px" }}>
      <Swiper
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        effect="fade"
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        loop
        className="hero-swiper"
      >
        {carouselItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="position-relative hero-slide" style={{ height: "520px", padding: '0px 0px 0px 50px' }}>
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7, ease: "easeInOut" }}
                className="w-100 h-100 position-absolute top-0 start-0"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.85)"
                }}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.4) 100%)`,
                  zIndex: 1
                }}
              />

              <div className="container h-100 position-relative" style={{ zIndex: 2 }}>
                <div className="row h-100 align-items-center">
                  <div className="col-lg-6">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-white p-4"
                    >

                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="display-4 fw-bold mb-3"
                        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
                      >
                        {item.keyword}
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="lead mb-4"
                        style={{ maxWidth: "500px", fontSize: "1.3rem", fontWeight: "300" }}
                      >
                        {item.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="d-flex gap-3 flex-wrap"
                      >
                        {/* <motion.button
                          whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          className="btn px-4 py-2 rounded-pill"
                          style={{
                            background: `linear-gradient(45deg, ${item.color}, ${item.color}dd)`,
                            border: "none",
                            color: "#fff",
                            fontSize: "1.1rem",
                            fontWeight: "500"
                          }}
                        >
                          Shop Now
                        </motion.button> */}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .hero-carousel-wrapper {
          margin-top: 20px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }
        
        .hero-swiper .swiper-pagination {
          bottom: 25px;
        }
        
        .hero-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s;
        }
        
        .hero-swiper .swiper-pagination-bullet-active {
          background: #ffffff;
          width: 30px;
          border-radius: 8px;
        }
        
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white;
          background: rgba(0, 0, 0, 0.25);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: #3a7bfc;
          transform: scale(1.1);
        }
        
        .hero-swiper .swiper-button-next::after,
        .hero-swiper .swiper-button-prev::after {
          font-size: 20px;
          font-weight: bold;
        }
        
        @media (max-width: 768px) {
          .hero-slide {
            height: 450px !important;
            padding: 0 20px !important;
          }
          
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            width: 40px;
            height: 40px;
          }
          
          .hero-swiper .swiper-button-next::after,
          .hero-swiper .swiper-button-prev::after {
            font-size: 16px;
          }
        }
        
        @media (max-width: 576px) {
          .hero-slide {
            height: 350px !important;
          }
        }
      `}</style>
    </div>
  );
}

function FeaturedCategories() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <section className="py-5 my-4 position-relative overflow-hidden">
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        zIndex: -1
      }}></div>

      <div className="container">
        <div className="text-center mb-5">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="badge bg-primary bg-opacity-10 text-primary fw-medium px-3 py-2 rounded-pill mb-3 d-inline-block"
          >
            Explore Our Selection
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="fw-bold mb-2 display-4"
          >
            Premium Categories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted mx-auto fs-5"
            style={{ maxWidth: "700px" }}
          >
            From organic rice to premium spices, discover quality in every product
          </motion.p>
        </div>

        <div className="row g-4 justify-content-center">
          {catalogs.map((category, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-10" style={{ maxWidth: "380px" }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredCategory(index)}
                onHoverEnd={() => setHoveredCategory(null)}
                whileHover={{ y: -10 }}
                className="position-relative h-100"
              >
                <Link
                  to={`/category/${category.name.toLowerCase().replace(/\s/g, '-')}`}
                  className="text-decoration-none"
                >
                  <motion.div
                    className="card border-0 h-100 overflow-hidden"
                    style={{
                      borderRadius: "20px",
                      boxShadow: hoveredCategory === index
                        ? `0 20px 30px ${category.colors[0]}33`
                        : "0 10px 20px rgba(0,0,0,0.07)",
                    }}
                  >
                    <div
                      className="category-image position-relative overflow-hidden"
                      style={{ height: "280px" }}
                    >
                      <motion.div
                        className="w-100 h-100"
                        animate={{
                          scale: hoveredCategory === index ? 1.08 : 1
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                          backgroundImage: `url(${category.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }}
                      />

                      <div
                        className="position-absolute bottom-0 start-0 w-100 p-4"
                        style={{
                          background: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)`,
                          height: "70%"
                        }}
                      >
                        <motion.div
                          animate={{
                            y: hoveredCategory === index ? 0 : 10,
                            opacity: hoveredCategory === index ? 1 : 0.8
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-white fw-bold mb-2 display-6">{category.name}</h3>
                          <p className="text-white-50 mb-0">{category.categories.length} varieties</p>
                        </motion.div>
                      </div>

                      <motion.div
                        className="position-absolute top-4 end-4 badge"
                        style={{
                          background: `linear-gradient(135deg, ${category.colors[0]}, ${category.colors[1]})`,
                          padding: "8px 16px",
                          borderRadius: "30px",
                          fontSize: "12px",
                          fontWeight: "500",
                          letterSpacing: "0.5px",
                          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                        }}
                        animate={{
                          scale: hoveredCategory === index ? 1.1 : 1,
                          y: hoveredCategory === index ? -5 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        Premium Quality
                      </motion.div>
                    </div>

                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="d-flex align-items-center">
                          {category.categories.slice(0, 3).map((subcat, idx) => (
                            <motion.div
                              key={idx}
                              className="rounded-circle border-2 border-white overflow-hidden"
                              style={{
                                width: "35px",
                                height: "35px",
                                marginLeft: idx > 0 ? "-10px" : "0",
                                zIndex: 3 - idx,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                              }}
                              whileHover={{ scale: 1.1, zIndex: 4 }}
                            >
                              <img
                                src={subcat.image}
                                alt={subcat.name}
                                className="w-100 h-100 object-fit-cover"
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <p className="text-muted mb-4" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                        Discover our premium selection of {category.name.toLowerCase()} sourced from trusted producers.
                      </p>

                      <motion.div
                        className="d-flex align-items-center"
                        animate={{
                          x: hoveredCategory === index ? 5 : 0
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="fw-medium me-auto">View Collection</span>
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle"
                          style={{
                            width: "35px",
                            height: "35px",
                            background: `linear-gradient(135deg, ${category.colors[0]}22, ${category.colors[0]}44)`,
                            color: category.colors[0]
                          }}
                        >
                          <FaArrowRight size={14} />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      icon: FaLeaf,
      title: "Quality Products",
      description: "We source directly from trusted producers to ensure maximum quality and freshness.",
      color: "#28a745",
      delay: 0
    },
    {
      icon: FaHeart,
      title: "Premium Quality",
      description: "Every product meets our high standards for excellence, durability, and sustainability.",
      color: "#dc3545",
      delay: 0.1
    },
    {
      icon: FaUsers,
      title: "Family Essentials",
      description: "Our products are selected to provide quality options for the entire family.",
      color: "#fd7e14",
      delay: 0.2
    },
    {
      icon: FaGlobe,
      title: "Eco-Friendly",
      description: "We prioritize sustainable practices in our sourcing and packaging.",
      color: "#3a7bfc",
      delay: 0.3
    }
  ];

  return (
    <section className="benefits-section py-5 position-relative overflow-hidden">
      <div className="position-absolute top-0 start-0 w-100 h-100 benefits-bg"></div>
      <div className="container position-relative">
        <div className="text-center mb-5">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="badge bg-primary bg-opacity-10 text-primary fw-medium px-3 py-2 rounded-pill mb-3 d-inline-block"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="fw-bold mb-2 display-5"
          >
            The Akdenar <span className="text-gradient">Difference</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted mx-auto fs-5"
            style={{ maxWidth: "700px" }}
          >
            Experience shopping reimagined with our commitment to quality and service
          </motion.p>
        </div>

        <div className="row g-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: benefit.delay }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="h-100"
              >
                <div
                  className="card h-100 border-0 benefit-card"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="card-body p-4 text-center">
                    <div className="position-relative mb-4">
                      <motion.div
                        className="icon-bg position-absolute top-50 start-50 translate-middle rounded-circle"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: benefit.delay + 0.2,
                          type: "spring",
                          stiffness: 200
                        }}
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundColor: `${benefit.color}15`,
                          zIndex: 0
                        }}
                      />
                      <motion.div
                        className="icon-wrapper d-inline-flex align-items-center justify-content-center position-relative"
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                          transition: { duration: 0.2 }
                        }}
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${benefit.color}22, ${benefit.color}44)`,
                          zIndex: 1,
                          boxShadow: `0 8px 20px ${benefit.color}33`
                        }}
                      >
                        <benefit.icon size={28} style={{ color: benefit.color }} />
                      </motion.div>
                    </div>

                    <motion.h5
                      className="card-title fw-bold mb-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: benefit.delay + 0.3 }}
                      style={{ color: benefit.color }}
                    >
                      {benefit.title}
                    </motion.h5>

                    <motion.p
                      className="card-text text-muted"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: benefit.delay + 0.4 }}
                    >
                      {benefit.description}
                    </motion.p>

                    <motion.div
                      className="mt-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: benefit.delay + 0.5 }}
                    >
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .benefits-section {
          background-color: #f9fafb;
        }
        
        .benefits-bg {
          background: radial-gradient(circle at 10% 20%, rgba(216, 241, 230, 0.46) 0%, rgba(233, 226, 226, 0.28) 110.2%);
          z-index: 0;
        }
        
        .text-gradient {
          background: linear-gradient(120deg, #3a7bfc, #0046c0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .benefit-card {
          background: white;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .benefit-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }
        
        @media (max-width: 768px) {
          .benefit-card {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </section>
  );
}

// NotFound Component
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
                  src="https://i.imgur.com/qIufhof.webp"
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
                  to="/category"
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

// SearchResults Component
function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  // If no search query, display not found
  if (!query) {
    return <NotFound />;
  }

  // Enhanced search function with weighted results and category-specific boosting
  const getSearchResults = () => {
    let results = [];
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);

    // Search through all catalogs with weighted scoring
    for (const product of catalogs) {
      // Check if product name matches
      const productName = product.name.toLowerCase();
      const productNameMatches = searchTerms.filter(term => productName.includes(term));
      const productExactMatch = productName === query.toLowerCase();

      // Search through categories
      for (const category of product.categories) {
        const categoryName = category.name.toLowerCase();
        const categoryMatches = searchTerms.filter(term => categoryName.includes(term));
        const categoryExactMatch = categoryName === query.toLowerCase();

        // Search through subcategories (subItems)
        for (let i = 0; i < category.subItems.length; i++) {
          const subItem = category.subItems[i];
          const subItemName = subItem.name.toLowerCase();
          const subItemDescription = subItem.description.toLowerCase();

          const subItemNameMatches = searchTerms.filter(term => subItemName.includes(term));
          const subItemDescMatches = searchTerms.filter(term => subItemDescription.includes(term));
          const subItemExactMatch = subItemName === query.toLowerCase();

          // Skip if there's absolutely no match anywhere
          if (productNameMatches.length === 0 &&
            categoryMatches.length === 0 &&
            subItemNameMatches.length === 0 &&
            subItemDescMatches.length === 0 &&
            !productExactMatch && !categoryExactMatch && !subItemExactMatch) {
            continue;
          }

          // Calculate relevance score (higher = more relevant)
          let score = 0;

          // Exact matches get highest priority
          if (productExactMatch) score += 150;
          else if (categoryExactMatch) score += 140;
          else if (subItemExactMatch) score += 130;

          // Partial matches get proportional scores
          score += productNameMatches.length * 30;
          score += categoryMatches.length * 25;
          score += subItemNameMatches.length * 20;
          score += subItemDescMatches.length * 10;

          // Boost specific categories when they're relevant to the search
          if (query.toLowerCase().includes("oil") && product.name.toLowerCase().includes("oil")) {
            score += 100; // Heavily boost oil products when searching for oil
          }

          if (query.toLowerCase().includes("salt") && product.name.toLowerCase().includes("salt")) {
            score += 100; // Heavily boost salt products when searching for salt
          }

          // Penalize irrelevant categories

          // Add more scoring logic as needed

          // Add to results if score is high enough
          if (score > 0) {
            results.push({
              product,
              category,
              subItem,
              index: i,
              type: 'product',
              score
            });
          }
        }
      }
    }

    // Sort by relevance score (highest first)
    results.sort((a, b) => b.score - a.score);

    return results;
  };

  const results = getSearchResults();

  // If no results found after searching
  if (results.length === 0) {
    return <NotFound searchTerm={query} />;
  }

  return (
    <main className="container mt-5 pt-5">
      <div className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="d-flex justify-content-between align-items-center mb-4"
        >
          <h2 className="fw-bold">Search Results for "{query}"</h2>
          <button
            className="btn btn-outline-primary rounded-pill d-flex align-items-center"
            style={{ marginTop: "15px" }}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2" /> Back
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted mb-4"
        >
          Found {results.length} result{results.length !== 1 ? 's' : ''}
        </motion.p>

        <div className="row g-4">
          {results.map((result, idx) => {
            const { product, category, subItem, index, type, score } = result;
            const productSlug = product.name.toLowerCase().replace(/\s/g, '-');
            const categorySlug = category.name.toLowerCase().replace(/\s/g, '-');

            return (
              <motion.div
                key={`${productSlug}-${categorySlug}-${index}-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="col-lg-4 col-md-6"
              >
                <Link
                  to={type === 'product'
                    ? `/category/${productSlug}/${categorySlug}/${index}`
                    : `/category/${productSlug}`
                  }
                  className="text-decoration-none"
                >
                  <div className="card h-100 shadow-sm border-0 hover-elevation">
                    <div className="position-relative">
                      <img
                        src={subItem.image || category.image}
                        alt={subItem.name}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/200x200?text=Product")}
                      />
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className={`badge ${type === 'product' ? 'bg-primary' : 'bg-secondary'}`}>
                          {type === 'product' ? 'Product' : 'Category'}
                        </span>
                      </div>
                      {score > 75 && (
                        <div className="position-absolute top-0 start-0 m-2">
                          <span className="badge bg-success">Best Match</span>
                        </div>
                      )}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{subItem.name}</h5>
                      <p className="text-muted small mb-2">
                        {product.name} › {category.name}
                      </p>
                      <p className="card-text small">
                        {subItem.description.substring(0, 80)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="text-primary fw-bold">{subItem.priceRange}</span>
                        <span className="btn btn-sm btn-outline-primary rounded-pill">View Details</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      className="scroll-to-top"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        bottom: "30px",
        left: "30px",
        zIndex: 1000,
        display: isVisible ? "block" : "none"
      }}
    >
      <button
        onClick={scrollToTop}
        className="btn btn-primary rounded-circle shadow"
        style={{
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          background: "linear-gradient(135deg, #3a7bfc, #0046c0)",
          border: "none",
          boxShadow: "0 4px 15px rgba(58, 123, 252, 0.4)",
          cursor: "pointer",
          marginBottom: "10px"
        }}
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
        </svg>
      </button>
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>
          {`
            body {
              font-family: 'Inter', sans-serif;
              overflow-x: hidden;
              background: linear-gradient(135deg, #ffffff, #f8f9fa);
              color: #333;
            }
            
            h1, h2, h3, h4, h5, h6, .fw-bold {
              font-family: 'Poppins', sans-serif;
            }
            
            .hover-elevation {
              transition: transform 0.4s ease, box-shadow 0.4s ease;
            }
            
            .hover-elevation:hover {
              transform: translateY(-8px);
              box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
            }
            
            .text-gradient {
              background: linear-gradient(120deg, #3a7bfc, #0046c0);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            
            .btn {
              transition: all 0.3s ease;
              font-weight: 500;
            }
            
            .btn-primary {
              background: linear-gradient(135deg, #3a7bfc, #0046c0);
              border: none;
              box-shadow: 0 4px 15px rgba(58, 123, 252, 0.3);
            }
            
            .btn-primary:hover {
              background: linear-gradient(135deg, #0046c0, #003494);
              transform: translateY(-3px);
              box-shadow: 0 8px 20px rgba(58, 123, 252, 0.4);
            }
            
            .btn-outline-primary {
              border-color: #3a7bfc;
              color: #3a7bfc;
            }
            
            .btn-outline-primary:hover {
              background: linear-gradient(135deg, #3a7bfc, #0046c0);
              border-color: transparent;
              transform: translateY(-3px);
              box-shadow: 0 8px 20px rgba(58, 123, 252, 0.2);
            }
            
            .card {
              border-radius: 20px;
              overflow: hidden;
              transition: all 0.3s ease;
            }
            
            .badge {
              font-weight: 500;
              padding: 0.5em 1em;
            }
            
            .rounded-4 {
              border-radius: 20px !important;
            }
            
            /* Custom Scrollbar */
            ::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            
            ::-webkit-scrollbar-track {
              background: #f1f1f1;
            }
            
            ::-webkit-scrollbar-thumb {
              background: #c5d1eb;
              border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: #3a7bfc;
            }
            
            /* Custom animation classes */
            .float-animation {
              animation: float 6s ease-in-out infinite;
            }
            
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-15px); }
              100% { transform: translateY(0px); }
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
              .display-4 {
                font-size: 2.5rem;
              }
              
              .display-5 {
                font-size: 2rem;
              }
            }
            
            @media (max-width: 576px) {
              .display-4 {
                font-size: 2rem;
              }
              
              .display-5 {
                font-size: 1.8rem;
              }
              
              .lead {
                font-size: 1rem !important;
              }
            }
          `}
        </style>
      </Helmet>
      <div style={{
        background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
        minHeight: "100vh"
      }}>
        <Header />
        <Routes>

          <Route path="/" element={
            <>
              <Helmet>
                <title>Akdenar - Premium Quality Products | Home</title>
                <meta name="description" content="Discover Akdenar's premium selection of high-quality products including rice, salt, sugar, spices, dry fruits, and cooking oil. Shop the best quality products at competitive prices." />
                <meta name="keywords" content="Akdenar, premium products, rice, salt, sugar, spices, dry fruits, cooking oil, quality products, online store" />
                <meta property="og:title" content="Akdenar - Premium Quality Products" />
                <meta property="og:description" content="Discover Akdenar's premium selection of high-quality products. Shop the best quality products at competitive prices." />
                <meta property="og:type" content="website" />
              </Helmet>              <Home />
            </>
          } />
          <Route path="/category" element={
            <>
              <Helmet>
                <title>Akdenar - Browse All Categories</title>
                <meta name="description" content="Browse through Akdenar's complete collection of premium products across all categories. Find everything from rice and salt to spices and dry fruits." />
                <meta name="keywords" content="Akdenar categories, product categories, all categories, rice, salt, sugar, spices, dry fruits, cooking oil" />
                <meta property="og:title" content="Akdenar - Browse All Categories" />
                <meta property="og:description" content="Explore our complete collection of premium products across all categories." />
                <meta property="og:type" content="website" />
              </Helmet>
              <CategoriesPage />
            </>
          } />
          <Route path="/category/:productName" element={
            <>
              <Helmet>
                <title>Akdenar - Product Categories</title>
                <meta name="description" content="Browse through Akdenar's extensive collection of premium products. Find detailed information about our various product categories and their specifications." />
                <meta name="keywords" content="Akdenar categories, product categories, premium products, quality products" />
                <meta property="og:title" content="Akdenar - Product Categories" />
                <meta property="og:description" content="Browse through Akdenar's extensive collection of premium products." />
                <meta property="og:type" content="website" />
              </Helmet>              <CategoryPage />
            </>
          } />
          <Route path="/category/:productName/:categoryName/:productId" element={
            <>
              <Helmet>
                <title>Akdenar - Product Details</title>
                <meta name="description" content="View detailed information about Akdenar's premium products. Get specifications, pricing, and availability information for our high-quality products." />
                <meta name="keywords" content="Akdenar products, product details, specifications, pricing, premium products" />
                <meta property="og:title" content="Akdenar - Product Details" />
                <meta property="og:description" content="View detailed information about Akdenar's premium products." />
                <meta property="og:type" content="website" />
              </Helmet>              <ProductDetail />
            </>
          } />
          <Route path="/search-results" element={
            <>
              <Helmet>
                <title>Akdenar - Search Results</title>
                <meta name="description" content="Find the products you're looking for at Akdenar. Browse through our search results to discover premium quality products that match your requirements." />
                <meta name="keywords" content="Akdenar search, product search, find products, premium products" />
                <meta property="og:title" content="Akdenar - Search Results" />
                <meta property="og:description" content="Find the products you're looking for at Akdenar." />
                <meta property="og:type" content="website" />
              </Helmet>              <SearchResults />
            </>
          } />
          <Route path="/about" element={
            <>
              <Helmet>
                <title>Akdenar - About Us</title>
                <meta name="description" content="Learn about Akdenar's journey, mission, and commitment to providing premium quality products. Discover our story and values." />
                <meta name="keywords" content="Akdenar about, company story, mission, values, premium products" />
                <meta property="og:title" content="Akdenar - About Us" />
                <meta property="og:description" content="Learn about Akdenar's journey and commitment to quality." />
                <meta property="og:type" content="website" />
              </Helmet>              <About />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Helmet>
                <title>Akdenar - Contact Us</title>
                <meta name="description" content="Get in touch with Akdenar. Contact us for any inquiries about our products, services, or business opportunities. We're here to help!" />
                <meta name="keywords" content="Akdenar contact, customer support, business inquiries, product inquiries" />
                <meta property="og:title" content="Akdenar - Contact Us" />
                <meta property="og:description" content="Get in touch with Akdenar for any inquiries about our products and services." />
                <meta property="og:type" content="website" />
              </Helmet>              <Contact />
            </>
          } />
          <Route path="/testimonials" element={
            <>
              <Helmet>
                <title>Akdenar - Customer Testimonials</title>
                <meta name="description" content="Read what our customers have to say about Akdenar's products and services. Discover real experiences and reviews from satisfied customers." />
                <meta name="keywords" content="Akdenar testimonials, customer reviews, product reviews, customer feedback" />
                <meta property="og:title" content="Akdenar - Customer Testimonials" />
                <meta property="og:description" content="Read what our customers have to say about Akdenar's products and services." />
                <meta property="og:type" content="website" />
              </Helmet>              <TestimonialsPage />
            </>
          } />
          <Route path="*" element={
            <>
              <Helmet>
                <title>Akdenar - Page Not Found</title>
                <meta name="description" content="The page you're looking for doesn't exist. Please navigate back to Akdenar's homepage or use our search function to find what you need." />
                <meta name="robots" content="noindex" />
                <meta property="og:title" content="Akdenar - Page Not Found" />
                <meta property="og:description" content="The page you're looking for doesn't exist." />
                <meta property="og:type" content="website" />
              </Helmet>
              <NotFound />
            </>
          } />
        </Routes>
        <Footer />
        <WhatsAppButton />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

function Home() {
  useEffect(() => {
    sessionStorage.removeItem('hasSeenLoader');
  }, []);

  const [animate, setAnimate] = useState(() => {
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    return hasSeenLoader !== 'true';
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (animate) {
      let progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 - prev) * 0.1; // Increased speed slightly
          return newProgress > 99 ? 99 : newProgress;
        });
      }, 100);

      // Set timer to approximately 2.5 seconds (2100ms)
      const timer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setAnimate(false);
          sessionStorage.setItem('hasSeenLoader', 'true');
        }, 400);
      }, 2100); // Reduced from 2600ms to 2100ms

      return () => {
        clearInterval(progressInterval);
        clearTimeout(timer);
      };
    }
  }, [animate]);

  return (
    <>
      <AnimatePresence>
        {animate && (
          <>
            <motion.div
              className="position-fixed top-0 start-0"
              style={{
                height: "3px",
                width: `${progress}%`,
                background: "linear-gradient(to right, #3a7bfc, #6f42c1)",
                zIndex: 10000,
                boxShadow: "0 0 10px rgba(58, 123, 252, 0.5)"
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeOut" }}
            />

            <motion.div
              key="loader"
              className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
              style={{
                zIndex: 9999,
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(5px)"
              }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                className="text-center"
                style={{ maxWidth: "90%", width: "400px" }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <img
                    src="/logo.webp"
                    alt="Akdenar Logo"
                    className="img-fluid mb-4"
                    style={{ maxHeight: "100px", width: "auto" }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/200x80?text=Akdenar";
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <p className="lead text-center mb-0" style={{
                    color: "#3a7bfc",
                    fontWeight: 500,
                    letterSpacing: "0.8px",
                    fontSize: "1.2rem",
                  }}>
                    <span className="px-2 py-1 rounded">
                      Serving India's Basic Needs
                    </span>
                  </p>
                </motion.div>

                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="progress rounded-pill overflow-hidden"
                    style={{ height: "8px", boxShadow: "0 2px 10px rgba(58, 123, 252, 0.3)" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      style={{
                        width: `${progress}%`,
                        background: "linear-gradient(to right, #3a7bfc, #6f42c1, #e83e8c)"
                      }}
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <p className="text-center mt-2 small text-muted">
                    {Math.round(progress)}% Loading...
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        <div className="container pt-2">
          <HeroCarousel />
        </div>

        <FeaturedCategories />
        <BenefitsSection />
        <SupplyChainDiagram />
        <Testimonials />

        <section className="py-5 my-5 position-relative overflow-hidden cta-section">
          <div className="position-absolute top-0 start-0 w-100 h-100 cta-bg"></div>
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background: "linear-gradient(135deg, rgba(58, 123, 252, 0.9) 0%, rgba(0, 70, 192, 0.95) 100%)",
              zIndex: 0
            }}
          ></div>

          <div className="container position-relative" style={{ zIndex: 1 }}>
            <div className="row align-items-center">
              <div className="col-lg-7">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="fw-bold mb-4 text-white display-4"
                >
                  Ready to Experience <br />
                  <span className="text-white-highlight">Premium Shopping?</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lead mb-4 text-white-50 fs-4"
                  style={{ maxWidth: "600px" }}
                >
                  Join thousands of satisfied customers who trust Akdenar for their everyday needs.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="d-flex flex-wrap gap-3"
                >
                  {/* <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-medium"
                              >
                                Shop Now
                              </motion.button> */}

                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="col-lg-5 d-none d-lg-block"
              >
                <img
                  src="/GETREADYFORSHOPPING.webp"
                  alt="Grocery Delivery"
                  className="img-fluid rounded-4 shadow"
                  style={{ transform: "rotate(2deg)" }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
    </>
  );
}

function CategoryPage() {
  const { productName } = useParams();
  const navigate = useNavigate();
  const decodedName = decodeURIComponent(productName).replace(/-/g, ' ');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const product = catalogs.find(
    (item) => item.name.toLowerCase() === decodedName.toLowerCase()
  );

  if (!product) {
    return <NotFound searchTerm={decodedName} />;
  }

  const handleBackButtonClick = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      navigate('/');
    }
  };

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-decoration-none">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.name}
                </li>
              </ol>
            </nav>
            <h1 className="fw-bold display-6 mt-2">{product.name}</h1>
          </div>
          <button
            className="btn btn-outline-primary d-flex align-items-center px-3 py-2"
            style={{ marginTop: "40px" }}
            onClick={handleBackButtonClick}
          >
            <FaArrowLeft className="me-2" />
            {selectedCategory ? 'Back to Categories' : 'Back to Home'}
          </button>
        </div>

        {selectedCategory ? (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-semibold fs-2">{selectedCategory.name}</h2>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setSelectedCategory(null)}
              >
                View All Categories
              </button>
            </div>

            <div className="row g-4 mb-5">
              {selectedCategory.subItems.map((item, index) => (
                <div key={index} className="col-md-4 col-sm-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{
                      y: -10,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                      transition: { duration: 0.3 }
                    }}
                    className="card h-100 border-0 shadow-sm"
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      cursor: "pointer"
                    }}
                    onClick={() => navigate(`/category/${product.name.toLowerCase().replace(/\s/g, '-')}/${selectedCategory.name.toLowerCase().replace(/\s/g, '-')}/${index}`)}
                  >
                    <div className="position-relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/200x200?text=Product")}
                      />
                      <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge bg-dark bg-opacity-75 text-white px-2 py-1 rounded-pill">{item.priceRange}</span>
                      </div>
                      <div
                        className="position-absolute bottom-0 start-0 w-100"
                        style={{
                          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                          padding: "50px 15px 15px"
                        }}
                      >
                        <h5 className="text-white fw-bold mb-0">{item.name}</h5>
                      </div>
                    </div>

                    <div className="card-body p-4">
                      <p className="card-text text-muted mb-3" style={{ fontSize: "0.9rem" }}>
                        {item.description.length > 120 ? `${item.description.substring(0, 120)}...` : item.description}
                      </p>

                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="badge rounded-pill" style={{ backgroundColor: "#f8f9fa", color: "#212529" }}>
                            Premium Quality
                          </span>
                        </div>
                        <div
                          className="d-flex align-items-center justify-content-center text-primary"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(58, 123, 252, 0.1)"
                          }}
                        >
                          <FaArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}

              <div className="col-12 mt-5">
                <ProductContactForm productName={`${product.name} - ${selectedCategory.name}`} />
              </div>
            </div>
          </div>
        ) : (
          <div className="row g-4 mb-4">
            {product.categories.map((category, index) => (
              <motion.div
                key={index}
                className="col-md-4 col-sm-6 col-lg-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div
                  className="card h-100 shadow border-0 text-center p-3"
                  style={{
                    borderRadius: "15px",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="overflow-hidden rounded-3 mb-3" style={{ height: "150px" }}>
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="card-img-top mx-auto"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover"
                      }}
                      whileHover={{ scale: 1.15, transition: { duration: 0.7 } }}
                      onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=Category")}
                    />
                  </div>
                  <div className="card-body p-2">
                    <h5 className="card-title fw-semibold text-dark" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {category.name.toUpperCase()}
                    </h5>
                    {category.description && (
                      <p className="card-text text-muted" style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>
                        {category.description}
                      </p>
                    )}
                    <motion.button
                      className="btn btn-sm btn-primary mt-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Products
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {!selectedCategory && (
          <div className="text-center mt-4 mb-5">
            <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        )}
      </div>
    </main>
  );
}

function ProductDetail() {
  const { productName, categoryName, productId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productName, categoryName, productId]);

  const decodedProductName = decodeURIComponent(productName).replace(/-/g, ' ').toLowerCase();
  const decodedCategoryName = decodeURIComponent(categoryName).replace(/-/g, ' ').toLowerCase();
  const product = catalogs.find(c => c.name.toLowerCase() === decodedProductName);

  if (!product) {
    return <NotFound searchTerm={decodedProductName} />;
  }

  const category = product.categories.find(c => c.name.toLowerCase() === decodedCategoryName);

  if (!category) {
    return <NotFound searchTerm={decodedCategoryName} />;
  }

  const item = category.subItems[parseInt(productId)];

  if (!item) {
    return <NotFound />;
  }

  // Get related products from the same category
  const getRelatedProducts = () => {
    // Filter out the current product and take up to 4 related products
    return category.subItems
      .filter((_, index) => index !== parseInt(productId))
      .slice(0, 4);
  };

  const relatedProducts = getRelatedProducts();

  const handleBackNavigation = () => {
    navigate(`/category/${productName}`);
  };

  // Get specifications based on product type
  const getSpecifications = () => {
    if (product.name.toLowerCase() === 'rice') {
      return [
        { label: "Purity", value: "95%" },
        { label: "Natural Admixture", value: "5%" },
        { label: "Average Grain Length", value: item.name.toLowerCase().includes("8.35") ? "8.35 MM" : "As specified" },
        { label: "Moisture", value: "12.5% Max" },
        { label: "Broken Grain", value: "1% Max." },
        { label: "Damage/Discolour Grain", value: "1% Max" },
        { label: "Immature Grain", value: "1% Max" },
        { label: "Foreign Matter", value: "Nil" },
        { label: "Packaging Type", value: "Jute bag, PP bag, Non-woven bag or as per requirement" }
      ];
    } else if (product.name.toLowerCase() === 'salt') {
      return [
        { label: "Purity", value: "99.5%" },
        { label: "Moisture Content", value: "< 0.5%" },
        { label: "Sodium Chloride", value: "> 98%" },
        { label: "Anti-caking Agent", value: "Present" },
        { label: "Packaging Type", value: "Available in various packaging options" }
      ];
    } else if (product.name.toLowerCase() === 'spices') {
      return [
        { label: "Origin", value: "India" },
        { label: "Freshness", value: "100% Fresh" },
        { label: "Processing", value: item.name.toLowerCase().includes("whole") ? "Whole" : "Ground" },
        { label: "Packaging", value: "Moisture-resistant packaging" },
        { label: "Shelf Life", value: "24 months from packaging" }
      ];
    }
    return [
      { label: "Quality", value: "Premium" },
      { label: "Origin", value: "India" },
      { label: "Packaging", value: "Available in various sizes" },
      { label: "Storage Instructions", value: "Store in a cool, dry place away from direct sunlight" },
      { label: "Shelf Life", value: "12 months from date of packaging" }
    ];
  };

  const specifications = getSpecifications();

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <nav aria-label="breadcrumb" className="mt-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/category/${productName}`} className="text-decoration-none">{product.name}</Link></li>
            <li className="breadcrumb-item"><Link to="#" className="text-decoration-none" onClick={handleBackNavigation}>{category.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{item.name}</li>
          </ol>
        </nav>

        <div className="d-flex justify-content-end mb-4">
          <button
            className="btn btn-outline-primary d-flex align-items-center px-3 py-2"
            style={{ marginTop: "10px " }}
            onClick={handleBackNavigation}
          >
            <FaArrowLeft className="me-2" />
            Back to {category.name}
          </button>
        </div>

        <div className="row g-5 mb-5">
          <div className="col-lg-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="position-relative"
            >
              <div className="product-image-wrapper rounded-4 overflow-hidden bg-light shadow-sm" style={{ height: "500px" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-100 h-100 object-fit-cover"
                  // onError={(e) => (e.target.src = "https://via.placeholder.com/500x500?text=Product")}
                />
              </div>

              <div className="position-absolute top-0 start-0 m-3">
                <span className="badge bg-primary px-3 py-2 rounded-pill">Premium</span>
              </div>

              <div className="position-absolute bottom-0 end-0 m-3">
                <span className="badge bg-white text-dark fw-medium px-3 py-2 rounded-pill shadow-sm">
                  {category.name}
                </span>
              </div>
            </motion.div>
          </div>

          <div className="col-lg-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <h1 className="fw-bold mb-1">{item.name}</h1>
              <p className="text-muted mb-3">{product.name} › {category.name}</p>

              <div className="d-flex align-items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={16} className="me-1" style={{ color: i < 4 ? "#ffc107" : "#e0e0e0" }} />
                ))}
                <span className="ms-2 text-muted small">(4.0 | 24 reviews)</span>
              </div>

              <div className="mb-4">
                <h3 className="text-primary fw-bold mb-1">{item.priceRange}</h3>
                <p className="text-muted small">Price includes all taxes</p>
              </div>

              <div className="mb-4">
                <p>{item.description}</p>
              </div>

              <div className="mb-4">
                <h4 className="fw-bold mb-3">Product Specifications</h4>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <tbody>
                      {specifications.map((spec, index) => (
                        <tr key={index}>
                          <th scope="row" style={{ width: "40%" }}>{spec.label}</th>
                          <td>{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-3 bg-light rounded-3 mb-4">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <div className="me-2">🚚</div>
                      <div>
                        <h6 className="mb-0 small fw-semibold"> Nationwide Delivery</h6>
                        <p className="mb-0 small text-muted">Fast & reliable across India</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <div className="me-2">🔄</div>
                      <div>
                        <h6 className="mb-0 small fw-semibold"> Customer Support</h6>
                        <p className="mb-0 small text-muted">9am–6pm, Mon–Sat</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <div className="me-2">✅</div>
                      <div>
                        <h6 className="mb-0 small fw-semibold">Quality Assured</h6>
                        <p className="mb-0 small text-muted">100% Authentic Products</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Tabs Section - Description, Specifications, Reviews */}
        <div className="mb-5">
          <ul className="nav nav-tabs mb-4" id="productTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
                type="button"
              >
                Description
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'specifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('specifications')}
                type="button"
              >
                Specifications
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
                type="button"
              >
                Reviews
              </button>
            </li>
          </ul>

          <div className="tab-content p-4 bg-light rounded-3" id="productTabContent">
            {activeTab === 'description' && (
              <div>
                <h4 className="fw-bold mb-3">Product Description</h4>
                <p>{item.description}</p>
                <p>
                  This premium {product.name.toLowerCase()} is sourced from the finest producers and undergoes
                  rigorous quality checks to ensure you receive only the best product. Our {item.name.toLowerCase()}
                  is known for its exceptional quality and authentic flavor profile.
                </p>
                <p>
                  Whether you're cooking for your family or hosting a special occasion, our
                  {item.name.toLowerCase()} will elevate your culinary creations to new heights.
                </p>
                <div className="my-4">
                  <h5 className="fw-bold mb-3">Key Features:</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-transparent">Premium quality {product.name.toLowerCase()}</li>
                    <li className="list-group-item bg-transparent">Sourced from trusted farmers</li>
                    <li className="list-group-item bg-transparent">Naturally processed</li>
                    <li className="list-group-item bg-transparent">No artificial additives</li>
                    <li className="list-group-item bg-transparent">Rich in natural flavor</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h4 className="fw-bold mb-3">Product Specifications</h4>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <th scope="row" style={{ width: "30%" }}>Product Name</th>
                        <td>{item.name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Category</th>
                        <td>{category.name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Price Range</th>
                        <td>{item.priceRange}</td>
                      </tr>
                      {specifications.map((spec, index) => (
                        <tr key={`spec-${index}`}>
                          <th scope="row">{spec.label}</th>
                          <td>{spec.value}</td>
                        </tr>
                      ))}
                      {product.name.toLowerCase() === 'rice' && (
                        <>
                          <tr>
                            <th scope="row">Usage</th>
                            <td>Suitable for all rice dishes, biryani, pulao, etc.</td>
                          </tr>
                          <tr>
                            <th scope="row">Cooking Time</th>
                            <td>Approximately 15-20 minutes</td>
                          </tr>
                          <tr>
                            <th scope="row">Aroma</th>
                            <td>Natural fragrance characteristic of premium basmati</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>

                {product.name.toLowerCase() === 'rice' && item.name.toLowerCase().includes("1121") && (
                  <div className="mt-4">
                    <h5 className="fw-bold mb-3">1121 Sella Basmati Rice Processing</h5>
                    <p>Our 1121 Sella Basmati Rice undergoes a specialized parboiling process that enhances its nutritional value while maintaining the authentic aroma. The process involves:</p>
                    <ol className="list-group list-group-numbered">
                      <li className="list-group-item border-0 bg-transparent">Soaking the paddy in water</li>
                      <li className="list-group-item border-0 bg-transparent">Steaming to gelatinize the starch</li>
                      <li className="list-group-item border-0 bg-transparent">Drying to reduce moisture content</li>
                      <li className="list-group-item border-0 bg-transparent">Milling to remove husks</li>
                      <li className="list-group-item border-0 bg-transparent">Sorting and grading for quality</li>
                    </ol>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h4 className="fw-bold mb-3">Customer Reviews</h4>
                <div className="row align-items-center mb-4">
                  <div className="col-md-4 text-center">
                    <h2 className="display-4 fw-bold mb-0">4.0</h2>
                    <div className="d-flex justify-content-center my-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={20} className="mx-1" style={{ color: i < 4 ? "#ffc107" : "#e0e0e0" }} />
                      ))}
                    </div>
                    <p className="text-muted">Based on 24 reviews</p>
                  </div>
                  <div className="col-md-8">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="d-flex align-items-center mb-2">
                        <div style={{ width: "60px" }} className="me-3">{rating} stars</div>
                        <div className="progress flex-grow-1" style={{ height: "10px" }}>
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{
                              width: `${rating === 4 ? 65 : rating === 5 ? 25 : rating === 3 ? 10 : 0}%`
                            }}
                            aria-valuenow={rating === 4 ? 65 : rating === 5 ? 25 : rating === 3 ? 10 : 0}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div style={{ width: "50px" }} className="ms-3">
                          {rating === 4 ? 15 : rating === 5 ? 6 : rating === 3 ? 3 : 0}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-top pt-4">
                  <div className="mb-4">
                    <div className="d-flex">
                      <img
                        src="https://picsum.photos/50/50?random=1"
                        alt="User"
                        className="rounded-circle me-3"
                        style={{ width: "50px", height: "50px" }}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/50?text=User")}
                      />
                      <div>
                        <h6 className="mb-1 fw-bold">Rahul Sharma</h6>
                        <div className="d-flex align-items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} size={12} className="me-1" style={{ color: i < 5 ? "#ffc107" : "#e0e0e0" }} />
                          ))}
                          <span className="ms-2 text-muted small">2 months ago</span>
                        </div>
                        <p className="mb-0">Exceptional quality! I've been using this product for months and it's consistently excellent. The flavor is unmatched compared to other brands.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex">
                      <img
                        src="https://picsum.photos/50/50?random=2"
                        alt="User"
                        className="rounded-circle me-3"
                        style={{ width: "50px", height: "50px" }}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/50?text=User")}
                      />
                      <div>
                        <h6 className="mb-1 fw-bold">Priya Patel</h6>
                        <div className="d-flex align-items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} size={12} className="me-1" style={{ color: i < 4 ? "#ffc107" : "#e0e0e0" }} />
                          ))}
                          <span className="ms-2 text-muted small">1 month ago</span>
                        </div>
                        <p className="mb-0">Great product for the price. Delivery was prompt and packaging was secure. I would definitely recommend it to others.</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <Link
                      to="/testimonials"
                      className="btn btn-outline-primary rounded-pill px-4"
                    >
                      View All Reviews
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 mb-5">
          <h3 className="fw-bold mb-4">Interested in this product?</h3>
          <ProductContactForm productName={`${product.name} - ${category.name} - ${item.name}`} />
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="related-products mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold">Related Products</h3>
              <Link to={`/category/${productName}`} className="btn btn-outline-primary rounded-pill">
                View All <FaArrowRight className="ms-2" size={12} />
              </Link>
            </div>

            <div className="row g-4">
              {relatedProducts.map((relatedItem, index) => (
                <div key={index} className="col-md-6 col-lg-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      y: -10,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                      transition: { duration: 0.3 }
                    }}
                    className="card h-100 border-0 shadow-sm"
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden"
                    }}
                  >
                    <Link
                      to={`/category/${productName}/${categoryName}/${category.subItems.findIndex(
                        subItem => subItem.name === relatedItem.name
                      )}`}
                      className="text-decoration-none"
                    >
                      <div style={{ height: "180px", overflow: "hidden" }}>
                        <img
                          src={relatedItem.image}
                          alt={relatedItem.name}
                          className="card-img-top"
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            transition: "transform 0.5s ease"
                          }}
                          onError={(e) => (e.target.src = "https://via.placeholder.com/180x180?text=Product")}
                        />
                      </div>
                      <div className="card-body p-3">
                        <h5 className="card-title fw-semibold text-dark mb-2">{relatedItem.name}</h5>
                        <p className="card-text text-muted small mb-3" style={{ height: "40px", overflow: "hidden" }}>
                          {relatedItem.description.substring(0, 70)}...
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge bg-light text-primary">{relatedItem.priceRange}</span>
                          <span className="text-primary fw-medium small">View Details</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;