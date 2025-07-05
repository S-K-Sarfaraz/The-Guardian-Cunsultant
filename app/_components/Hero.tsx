'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Cog from "./../assets/cog.png";
import CylinderImage from "./../assets/cylinder.png";
import NoddleImage from "./../assets/noodle.png";
import { motion, useScroll, useTransform } from "framer-motion";


function hero() {
    const heroRef = useRef(null)
    const {scrollYProgress} = useScroll({
        target: heroRef,
        offset: ["start end", "end start"]
    });
    const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
    return (
        <section ref={heroRef} className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183ec2,#eaeefe_90%)] overflow-x-clip">
            <div className="container">
                <div className="md:flex items-center lg:gap-24">
                    <div className="md:w-[478px]">
                        <div className="tags">
                            Expense Tracker
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001e80] text-transparent bg-clip-text mt-6">
                            Manage Your Expenses
                        </h1>
                        <p className="text-xl text-[#010d3e] tracking-tight mt-6">
                            We are here to help you manage your expenses and
                            save money with the help of AI Advisor.
                        </p>
                        <div className="flex gap-1 items-center mt-[30px]">
                            <button className="btn btm-primary">
                                Get Started
                            </button>
                            <button className="btn btn-text gap-1">
                                <span>Learn More</span>
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
                        <motion.img
                            src={Cog.src}
                            alt="Cog Image"
                            className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0"
                            animate={{
                                translateY: [-30, 30],
                            }}
                            transition={{
                                repeat: Infinity,
                                repeatType: "mirror",
                                duration: 3,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.img
                            src={CylinderImage.src}
                            alt="Cylinder Image"
                            width={220}
                            height={220}
                            className="hidden md:block -top-8 -left-32 absolute"
                            style={{
                                translateY: translateY
                            }}
                        />
                        <motion.img
                            src={NoddleImage.src}
                            alt="Noddle Image"
                            width={220}
                            height={220}
                            className="hidden lg:block top-[524px] left-[448px] rotate-[30deg] absolute"
                            style={{
                                translateY: translateY
                            }} 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default hero;
