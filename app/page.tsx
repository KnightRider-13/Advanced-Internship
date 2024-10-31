"use client";

import Navbar from "@/app/components/Navbar";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Features from "./components/Features";
import Reviews from "./components/Reviews";
import Numbers from "./components/Numbers";

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
