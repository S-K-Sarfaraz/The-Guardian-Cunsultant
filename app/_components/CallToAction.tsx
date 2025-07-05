"use client";
import { ArrowRight } from "lucide-react";
import React, { useRef } from "react";
import starImage from "./../assets/star.png";
import springImage from "./../assets/spring.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

function CallToAction() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef, // Attach ref properly
        offset: ["start end", "end start"],
    });

    const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

    return (
        <section 
            ref={sectionRef} // Attach ref here
            className="bg-gradient-to-b from-[#ffffff] to-[#d2dcff] py-24 overflow-x-clip"
        >
            <div className="container">
                <div className="section-heading relative">
                    <h2 className="section-title">Sign up for free today</h2>
                    <p className="section-description mt-5">
                        lorem ipsum dolor sit amet consectetur adipisicing elit{" "}
                    </p>
                    <motion.img
                        src={starImage.src}
                        alt="star image"
                        height={360}
                        width={360}
                        className="absolute -left-[356px] -top-[137px]"
                        style={{ y: translateY }} // Use `y` instead of `translateY`
                    />
                    <motion.img
                        src={springImage.src}
                        alt="spring image"
                        height={360}
                        width={360}
                        className="absolute -right-[331px] -top-[19px]"
                        style={{ y: translateY }} // Use `y` instead of `translateY`
                    />
                </div>
                <div className="flex gap-2 mt-10 justify-center">
                    <button className="btn btm-primary">Get Started</button>
                    <button className="btn btm-text gap-1">
                        <span>Learn More</span>
                        <ArrowRight className="h5 w-5 " />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CallToAction;
