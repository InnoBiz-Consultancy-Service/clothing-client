"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FaShippingFast,
  FaExchangeAlt,
  FaTshirt,
  FaRulerHorizontal,
  FaCreditCard,
  FaGift,
  FaStoreAlt,
  FaQuestionCircle,
} from "react-icons/fa";

const faqData = [
  {
    question: "How long does shipping take?",
    answer:
      "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and international shipping (7-14 business days). Free shipping is available on all orders over $75.",
    icon: <FaShippingFast className="text-teal-500 text-2xl" />,
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "We accept returns and exchanges within 30 days of purchase. Items must be unworn with original tags attached. Return shipping is free for customers in the United States. Visit our returns portal to start your return process.",
    icon: <FaExchangeAlt className="text-indigo-500 text-2xl" />,
  },
  {
    question: "How do I care for my garments?",
    answer:
      "Each garment comes with specific care instructions on the label. Generally, we recommend washing in cold water and hanging to dry for most items to preserve color and fit. Our premium collections may require dry cleaning.",
    icon: <FaTshirt className="text-purple-500 text-2xl" />,
  },
  {
    question: "How do I find my correct size?",
    answer:
      "We provide detailed size charts on every product page. For the best fit, measure yourself and compare to our size guide. If you're between sizes, we recommend sizing up. Need more help? Our style consultants are available via live chat.",
    icon: <FaRulerHorizontal className="text-yellow-500 text-2xl" />,
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Afterpay for installment payments. All transactions are secure and encrypted.",
    icon: <FaCreditCard className="text-blue-500 text-2xl" />,
  },
  {
    question: "Do you offer gift wrapping?",
    answer:
      "Yes! We offer premium gift wrapping for $5 per item. Add gift wrapping at checkout and include a personalized message. We'll wrap your items in our signature paper with a custom note card.",
    icon: <FaGift className="text-pink-500 text-2xl" />,
  },
  {
    question: "Are your clothes ethically made?",
    answer:
      "Absolutely. We're committed to ethical manufacturing. All our garments are produced in factories that provide fair wages and safe working conditions. We regularly audit our supply chain and share transparency reports annually on our website.",
    icon: <FaStoreAlt className="text-green-500 text-2xl" />,
  },
  {
    question: "Do you offer discounts for loyalty members?",
    answer:
      "Yes! Our loyalty program offers points for every purchase which can be redeemed for exclusive discounts. Members also get early access to new collections, birthday rewards, and free shipping on all orders regardless of total amount.",
    icon: <FaQuestionCircle className="text-red-500 text-2xl" />,
  },
];

const Faq: React.FC = () => {
  const middleIndex = Math.ceil(faqData.length / 2);
  const leftColumnFaqs = faqData.slice(0, middleIndex);
  const rightColumnFaqs = faqData.slice(middleIndex);

  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-400 text-transparent bg-clip-text">
          Questions? We have Got Answers
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-indigo-600 mx-auto my-4 rounded-full"></div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Everything you need to know about our products, policies, and
          promises. Can not find what you are looking for? Contact our style
          experts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
        {/* Left Column */}
        <div className="space-y-6">
          {leftColumnFaqs.map((faq, index) => {
            const actualIndex = index * 2;
            return (
              <div
                key={actualIndex}
                className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100"
              >
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem
                    value={`item-${actualIndex}`}
                    className="border-b-0"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                        {faq.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900">
                          {faq.question}
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-0 text-gray-600">
                      <div className="ml-16">{faq.answer}</div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {rightColumnFaqs.map((faq, index) => {
            const actualIndex = index * 2 + 1;
            return (
              <div
                key={actualIndex}
                className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100"
              >
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem
                    value={`item-${actualIndex}`}
                    className="border-b-0"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                        {faq.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900">
                          {faq.question}
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-0 text-gray-600">
                      <div className="ml-16">{faq.answer}</div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faq;