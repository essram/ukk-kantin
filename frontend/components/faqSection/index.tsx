"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left text-white font-medium"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-orange-400"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-3 text-sm text-gray-400 leading-relaxed overflow-hidden"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQSection() {
  return (
    <section className="bg-[#111418] py-28 h-[77%]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          Frequently Asked Questions
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Column Left */}
          <div className="space-y-4">
            <FAQItem
              question="Is SakPole free to use?"
              answer="Yes. SakPole is completely free for users. You only pay for the food you order."
            />
            <FAQItem
              question="Is it available in other languages?"
              answer="Currently, SakPole supports Indonesian and English. More languages are coming soon."
            />
            <FAQItem
              question="Can I use it offline?"
              answer="An internet connection is required to browse menus and place orders."
            />
          </div>

          {/* Column Right */}
          <div className="space-y-4">
            <FAQItem
              question="Can I order food online?"
              answer="Yes, you can order directly from our platform and pick it up at the canteen."
            />
            <FAQItem
              question="How fast is the service?"
              answer="Orders are processed in real-time to ensure quick preparation and pickup."
            />
            <FAQItem
              question="Is payment cashless?"
              answer="We support both cash and digital payment methods for your convenience."
            />
          </div>

        </div>
      </div>
    </section>
  );
}
