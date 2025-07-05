"use client";
import React, { useRef } from "react";
import productImage from "./../assets/product-image.png";
import Image from "next/image";
import pyramidImage from "./../assets/pyramid.png";
import tubeImage from "./../assets/tube.png";
import { motion, useScroll, useTransform } from "framer-motion";

function ProductShowcase() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const translateYAxis = useTransform(scrollYProgress, [0, 1], [150, -150]);
    return (
        <section
            ref={sectionRef}
            className="bg-gradient-to-b from-[#ffffff] to-[#d2dcff] py-24 overflow-x-clip"
        >
            <div className="container">
                <div className="section-heading">
                    <div className="flex justify-center">
                        <div className="tags">Manage Your Expenses</div>
                    </div>
                    <h2 className="section-title mt-5">
                        Start managing your enterprise with AI
                    </h2>
                    <p className="section-description mt-5">
                        Manage your expenses and save money with the help of AI
                        Advisor
                    </p>
                </div>
                <div className="relative">
                    <Image
                        src={productImage}
                        alt="Product Image"
                        className="mt-10 shadow-lg"
                    />
                    <motion.img
                        src={pyramidImage.src}
                        alt="Pyramid Image"
                        height={255}
                        width={255}
                        className="hidden md:block absolute -right-36 -top-32"
                        style={{ translateY: translateYAxis }}
                    />
                    <motion.img
                        src={tubeImage.src}
                        alt="Tube Image"
                        height={262}
                        width={230}
                        className="hidden md:block absolute bottom-4 -left-36"
                        style={{ translateY: translateYAxis }}
                    />
                </div>
            </div>
        </section>
    );
}

export default ProductShowcase;
