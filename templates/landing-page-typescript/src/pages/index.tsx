import Head from "next/head";
import Hero from "@/sections/Hero";
import { Layout } from "@/components/Layout";
import Clients from "@/sections/Clients";
import FeaturesRight from "@/sections/FeaturesRight";
import FeatureCards from "@/sections/FeatureCards";
import FeaturesLeft from "@/sections/FeaturesLeft";
import Pricing from "@/sections/Pricing";
import FAQ from "@/sections/FAQ";
import Testimonials from "@/sections/Testimonials";
import Signup from "@/sections/Signup";

export default function Home() {
  return (
    <>
      <Head>
        <title>Landing Page Template</title>
        <meta name="description" content="Web Template created by Starlight" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Clients />
      <Layout>
        <FeaturesRight />
        <FeatureCards />
        <FeaturesLeft />
        <Pricing />
        <FAQ />
        <Testimonials />
        <Signup />
      </Layout>
    </>
  );
}
