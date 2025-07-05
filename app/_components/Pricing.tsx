'use client'

import React from "react";
import { CheckIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import {motion} from "framer-motion"

const pricingTiers = [
    {
        title: "Free",
        monthlyPrice: 0,
        buttonText: "Get started for free",
        popular: false,
        inverse: false,
        features: [
            "Up to 5 project members",
            "Unlimited tasks and projects",
            "2GB storage",
            "Integrations",
            "Basic support",
        ],
    },
    {
        title: "Pro",
        monthlyPrice: 99,
        buttonText: "Sign up now",
        popular: true,
        inverse: true,
        features: [
            "Up to 50 project members",
            "Unlimited tasks and projects",
            "50GB storage",
            "Integrations",
            "Priority support",
            "Advanced support",
            "Export support",
        ],
    },
    {
        title: "Business",
        monthlyPrice: 999,
        buttonText: "Sign up now",
        popular: false,
        inverse: false,
        features: [
            "Up to 5 project members",
            "Unlimited tasks and projects",
            "200GB storage",
            "Integrations",
            "Dedicated account manager",
            "Custom fields",
            "Advanced analytics",
            "Export capabilities",
            "API access",
            "Advanced security features",
        ],
    },
];

function Pricing() {
    return (
        <div>
            <section className="py-24 bg-white">
                <div className="container">
                    <div className="section-heading">
                        <h1 className="section-title">Pricing</h1>
                        <p className="section-description mt-5">
                            Free Forever, Upgrade for unlimited tasks, better
                            features and exclusive features.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-between">
                        {pricingTiers.map(
                            (
                                {
                                    title,
                                    monthlyPrice,
                                    buttonText,
                                    popular,
                                    inverse,
                                    features,
                                },
                                index
                            ) => (
                                <div
                                    key={index}
                                    className={twMerge("card-design", inverse === true && "border-black bg-black text-white")}
                                >
                                    <div className="flex justify-between">
                                        <h3
                                            className={twMerge(
                                                "font-bold text-lg text-black/50",
                                                inverse === true &&
                                                    "text-white/60"
                                            )}
                                        >
                                            {title}
                                        </h3>
                                        {popular === true && (
                                            <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/50">
                                                <motion.span
                                                    animate={{
                                                        backgroundPositionX: "100%"
                                                    }}
                                                    transition={{
                                                        repeat: Infinity,
                                                        repeatType: "loop",
                                                        duration: 2,
                                                        ease: "linear"
                                                    }}
                                                    className="bg-[linear-gradient(to_right,#dd7ddf,#e1cd86,#bbcb92,#71c2ef,#3bffff,#dd7ddf,#e1cd86,#bbcb92,#71c2ef,#3bffff)] [background-size:200%] text-transparent bg-clip-text font-medium">
                                                    Popular
                                                </motion.span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-baseline gap-1 mt-[30px]">
                                        <span className="font-bold text-4xl tracking-tight leading-none">
                                            ₹{monthlyPrice}
                                        </span>
                                        <span className="font-bold tracking-tight text-black/50">
                                            /Months
                                        </span>
                                    </div>
                                    <button
                                        className={twMerge(
                                            "btn btm-primary w-full mt-[30px]",
                                            inverse === true &&
                                                "bg-white text-black"
                                        )}
                                    >
                                        {buttonText}
                                    </button>
                                    <ul className="flex flex-col gap-5 mt-8">
                                        {features.map((feature, index) => (
                                            <li
                                                key={index}
                                                className="text-sm flex items-center gap-4"
                                            >
                                                <CheckIcon className="h-4 w-4" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Pricing;
