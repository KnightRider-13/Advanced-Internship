"use client";

import Navbar from "@/app/components/home/Navbar";
import Landing from "./components/home/Landing";
import Footer from "./components/home/Footer";
import Features from "./components/home/Features";
import Reviews from "./components/home/Reviews";
import Numbers from "./components/home/Numbers";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Landing />
      <Features />
      <Reviews />
      <Numbers />
      <Footer />
    </div>
  );
}
