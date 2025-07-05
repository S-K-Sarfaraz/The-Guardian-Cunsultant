import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import LogoTicker from "./_components/LogoTicker";
import ProductShowcase from "./_components/ProductShowcase";
import Pricing from "./_components/Pricing";
import Testimonials from "./_components/Testimonials";
import CallToAction from "./_components/CallToAction";
import Footer from "./_components/Footer";
// import ServicePage from './_components/ServicePage'; // Adjust the path as necessary


export default function Home() {
    return (
        <div className="bg-[#EAEEFE]">
            <Header/>
            <Hero/>
            <LogoTicker/>
            <ProductShowcase/>
            {/* <ServicePage/> */}
            <Pricing/>
            <Testimonials/>
            <CallToAction/>
            <Footer/>
        </div>
    );
}
