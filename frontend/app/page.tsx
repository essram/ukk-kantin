import FAQSection from "@/components/faqSection";
import Navbar from "@/components/navbarSection";
import HeroSection from "@/components/heroSection";
import FoodCategorySection from "@/components/foodCategorySection";
import OurMenuSection from "@/components/ourMenuSection";
import ReviewSection from "@/components/reviewSection";
import FooterSection from "@/components/footerSection";
export default function Home() {
  return (
    <div className="font-figtree overflow-x-hidden overflow-y-hidden">
      {/* navbar start */}
      <Navbar />

      {/* navbar end */}

      {/* hero section start */}

      <HeroSection />

      {/* hero section end */}

      {/* food category start */}

      <FoodCategorySection />

      {/* food category end */}

      {/* our menu start */}

      <OurMenuSection />

      {/* our menu end */}

      {/* review start */}

      {/* <ReviewSection /> */}

      <ReviewSection />

      {/* review end */}

      {/* faq start */}
      <div className="h-max">
        <FAQSection />
      </div>
      {/* faq end */}

      {/* footer start */}
      <FooterSection />
      {/* footer end */}
    </div>
  );
}
