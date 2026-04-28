import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // For clickable navigation
import darkAbstracted from '../assets/DarkAbstracted.png';
import microScopic from '../assets/MicroScopic.png';
import mind from '../assets/mind.png';
import neuron from '../assets/Neuron.png';
import neuronTech from '../assets/NeuronTech.png';


// Sections for Science Cards
const sections = [
  {
    title: "Neuro-Chemical Alignment",
    bg: neuronTech,
    description:
      "Chronic stress leads to neuroplasticity decay in the prefrontal cortex — the command center of professional decision architecture.",
  },
  {
    title: "Work-Life Architecture",
    bg: darkAbstracted,
    description:
      "When Cortisol floods the neural grid, balance collapses. Dopamine stabilization restores dream persistence and cognitive clarity.",
  },
  {
    title: "Dream-State Expansion",
    bg: microScopic,
    description:
      "The human mind is a biological supercomputer. Emotional regulation transforms imagination into executable reality.",
  },
];

// Storytelling Sections: Alternating text + image
const storySections = [
  {
    title: "Clarity Over Chaos",
    text: "When stress becomes constant, your mind loses sharpness. Decisions become reactive instead of strategic.",
    subText: "Restoring clarity allows you to think long-term, solve complex problems, and move with confidence.",
    image: neuronTech,
  },
  {
    title: "Emotional Stability Builds Trust",
    text: "Your emotional state directly affects your relationships, leadership, and communication.",
    subText: "Stable emotional regulation increases confidence, improves conversations, and strengthens professional trust.",
    image: darkAbstracted,
  },
  {
    title: "Energy Fuels Ambition",
    text: "Burnout drains motivation. You begin surviving instead of building.",
    subText: "Balanced mental health restores internal drive, making productivity feel natural instead of forced.",
    image: microScopic,
  },
];

// FAQ Section
const faq = [
  {
    question: "What is Mental Health?",
    answer:
      "It is the operational efficiency of your neural network and chemical equilibrium across serotonin, dopamine, and cortisol systems.",
  },
  {
    question: "Why does mental health matter for success?",
    answer:
      "Research shows psychological well-being is a primary predictor of long-term professional attainment and decision clarity.",
  },
  {
    question: "Does stress physically change the brain?",
    answer:
      "Yes. Chronic cortisol exposure reduces neuroplasticity in the prefrontal cortex and weakens memory circuits in the hippocampus.",
  },
  {
    question: "How does burnout affect performance?",
    answer:
      "Burnout decreases executive function, emotional regulation, and strategic thinking — directly impacting career growth.",
  },
  {
    question: "Can mental health influence income?",
    answer:
      "Individuals with strong emotional regulation skills experience higher productivity and earnings growth.",
  },
];

export const HomePage = () => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const sectionRefs = useRef([]);

  // Intersection Observer for swapping background images per section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target);
            if (idx !== -1) setSectionIndex(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => sectionRefs.current.forEach((ref) => ref && observer.unobserve(ref));
  }, []);

  const currentBackground = sections[sectionIndex]?.bg || mind;

  return (
    <div className="relative w-full text-white">

      {/* Section-specific Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentBackground}
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-slate-900/70"></div>
      </div>

      {/* HERO SECTION */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-teal-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          System Status: Neural Alignment in Progress
        </motion.h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mb-8">
          Leveraging biometric data to synchronize your work-life frequency. Your mental health is the core processor of your reality.
        </p>
        <div className="flex gap-6 flex-wrap justify-center">
          <Link to="/assessment">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-teal-400/20 backdrop-blur-xl rounded-2xl shadow-lg text-shadow-indigo-100 border border-teal-300/30 transition-all"
            >
              Start Your Assessment
            </motion.button>
          </Link>
          <Link to="/science">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 border border-teal-300/40 rounded-2xl  bg-transparent backdrop-blur-lg shadow-sm"
            >
              Explore the Science
            </motion.button>
          </Link>
          <Link to="/health">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 border border-teal-300/40 rounded-2xl  bg-transparent backdrop-blur-lg shadow-sm"
            >
              Brain_Tumor_Detection_System
            </motion.button>
          </Link>
        </div>
        <Link to="/help">
          <button className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-cyan-500 backdrop-blur-xl shadow-lg text-white font-bold">
            SOS
          </button>
        </Link>
      </section>

      {/* STORY SECTIONS */}
      <section className="py-24 px-6 md:px-20 space-y-32 relative z-10">
        {storySections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-16 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* TEXT */}
            <div className="md:w-1/2 bg-white/5 backdrop-blur-xl p-10 rounded-3xl space-y-6 shadow-2xl">
              <h2 className="text-4xl font-bold text-teal-400">{section.title}</h2>
              <p className="text-lg text-gray-200">{section.text}</p>
              <p className="text-gray-400">{section.subText}</p>
            </div>
            {/* IMAGE */}
            <div className="md:w-1/2">
              <img
                src={section.image}
                alt={section.title}
                className="rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        ))}
      </section>

      {/* SCIENCE SECTION */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-20 py-24"
      >
        <img
          src={neuron}
          alt="Neural Synapse"
          className="w-full md:w-1/2 rounded-2xl shadow-2xl"
        />
        <div className="md:w-1/2 space-y-6">
          {sections.map((sec, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl p-6 shadow-xl"
            >
              <h3 className="text-xl text-teal-400 font-semibold mb-2">{sec.title}</h3>
              <p className="text-gray-200">{sec.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="relative z-10 py-24 px-6 md:px-20 flex flex-col items-center"
      >
        <h2 className="text-4xl font-bold text-teal-400 mb-12 text-center">
          Neural Knowledge Base
        </h2>
        <div className="grid md:grid-cols-3 gap-8 w-full">
          {faq.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ rotateY: 180 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl p-6 transition-all shadow-lg cursor-pointer"
            >
              <h4 className="text-lg text-gray-300 mb-4">{item.question}</h4>
              <p className="text-gray-400 text-sm">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VISION SECTION */}
      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-20 py-24"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-72 h-72 bg-teal-400/20 rounded-full flex items-center justify-center backdrop-blur-xl shadow-2xl mb-8"
        >
          <p className="px-6 text-gray-200">
            To evolve the human experience by making emotional intelligence visible through data.
          </p>
        </motion.div>
        <p className="text-gray-400 max-w-2xl">
          Building a bridge between neurotransmitter health and life-long dream attainment.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
