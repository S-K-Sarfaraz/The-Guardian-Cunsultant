'use client'
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CheckIcon, BriefcaseIcon } from "lucide-react";
import { animate, scroll } from "@motionone/dom"; // Motion One for scroll animations

const services = [
  {
    title: "Web Development",
    description:
      "Building responsive and scalable websites using modern frameworks.",
    features: ["Responsive Design", "SEO Optimized", "Performance Focused"],
    sideText: "Transform your online presence with our expert web development services.",
  },
  {
    title: "Mobile Apps",
    description:
      "Creating mobile applications for both iOS and Android platforms.",
    features: ["Cross-platform", "User-friendly", "Secure"],
    sideText: "Reach your audience on-the-go with our custom mobile app solutions.",
  },
  {
    title: "UI/UX Design",
    description:
      "Designing intuitive interfaces and engaging user experiences.",
    features: ["User Research", "Wireframing", "Prototyping"],
    sideText: "Enhance user satisfaction with our intuitive and engaging UI/UX designs.",
  },
];

function ServicePage() {
  const groupContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const groupContainer = groupContainerRef.current;
    if (groupContainer) {
      // Animate the horizontal movement of the service cards as you scroll vertically.
      scroll(
        animate(".img-group", {
          transform: ["none", `translateX(-${(services.length - 1) * 100}vw)`],
        }),
        { target: groupContainer }
      );

      // Optionally, animate a progress bar (if desired):
      scroll(
        animate(".progress", { scaleX: [0, 1] }),
        { target: groupContainer }
      );

      // Observe when the section is out of view
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      observer.observe(groupContainer);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="section-heading text-center mt-10">
          <h1 className="section-title">Our Services</h1>
          <p className="section-description mt-5">
            We offer a wide range of services to meet your digital needs.
          </p>
        </div>
        {/* Set the container height based on the number of services */}
        <div
          ref={groupContainerRef}
          className="img-group-container relative"
          style={{ height: `${services.length * 100}vh` }}
        >
          {/* Sticky container to hold the horizontal scrolling cards */}
          <div className="sticky top-0 overflow-hidden h-screen">
            <div className="img-group flex">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={twMerge(
                    "service-section flex items-center w-screen p-6"
                  )}
                >
                  <div className="service-card card-design flex-shrink-0 w-1/2 p-6">
                    <div className="flex items-center gap-3">
                      <BriefcaseIcon className="h-6 w-6 text-primary" />
                      <h3 className="font-bold text-lg text-black/50">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                      {service.description}
                    </p>
                    <ul className="flex flex-col gap-4 mt-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm flex items-center gap-3">
                          <CheckIcon className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="btn btm-primary w-full mt-6">
                      Learn More
                    </button>
                  </div>
                  <div className="side-text w-1/2 p-6 text-lg text-gray-700">
                    {service.sideText}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Optional progress bar at the bottom */}
        {isVisible && (
          <div className="progress fixed left-0 right-0 h-2 bg-primary bottom-10 transform scale-x-0" />
        )}
      </div>
    </section>
  );
}

export default ServicePage;
