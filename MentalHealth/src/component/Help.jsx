import React from "react";
import { motion } from "framer-motion";

// Import local images
import meditationImg from "../assets/meditation.png";
import exerciseImg from "../assets/exercise.png";
import socialImg from "../assets/social.png";
import professionalImg from "../assets/professional.png";
import emergencyImg from "../assets/emergency.png";

const techniques = [
  {
    title: "Physical Activity",
    description:
      "Exercise like walking, yoga, or stretching can boost your mood and reduce anxiety.",
    image: exerciseImg,
  },
  {
    title: "Mindfulness & Meditation",
    description:
      "Practice meditation or breathing exercises to calm your mind and reduce stress.",
    image: meditationImg,
  },
  {
    title: "Social Support",
    description:
      "Talk to friends or family. Joining support groups reduces isolation.",
    image: socialImg,
  },
  {
    title: "Professional Help",
    description:
      "Consult a psychologist, psychiatrist, or counselor for guidance.",
    image: professionalImg,
  },
  {
    title: "Emergency Contacts",
    description:
      "If at high risk, contact helplines: iCall: +91 9152987821, Vandrevala: 1860 266 2345.",
    image: emergencyImg,
  },
];

const Help = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full bg-gray-800 rounded-3xl p-12 shadow-2xl space-y-12"
      >
        <h1 className="text-4xl font-bold text-purple-400 text-center">
          Help & Guidance
        </h1>

        {/* About */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">About this Quiz</h2>
          <p className="text-gray-300 text-lg">
            This quiz helps you understand your mental health. It is{" "}
            <span className="font-semibold">not a medical diagnosis</span> but can
            guide you toward helpful steps.
          </p>
        </section>

        {/* Techniques */}
       {/* TECHNIQUES – STORY STYLE */}
<section className="py-24 px-6 md:px-20 space-y-32">
  {techniques.map((tech, index) => (
    <div
      key={index}
      className={`flex flex-col md:flex-row items-center gap-16 ${
        index % 2 !== 0 ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 bg-white/5 backdrop-blur-xl p-10 rounded-3xl space-y-6 shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-purple-400">
          {tech.title}
        </h2>
        <p className="text-lg text-gray-200">
          {tech.description}
        </p>
        {tech.applicable && (
          <p className="text-gray-400">
            Applicable for: {tech.applicable.join(", ")}
          </p>
        )}
      </motion.div>

      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2"
      >
        <img
          src={tech.image}
          alt={tech.title}
          className="rounded-2xl shadow-2xl border border-white/10 w-full"
        />
      </motion.div>
    </div>
  ))}
</section>
        {/* Helplines */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Helplines in India</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "iCall Helpline",
                number: "+91 9152987821",
                desc: "Psychological support in India.",
              },
              {
                title: "Vandrevala Helpline",
                number: "1860 266 2345",
                desc: "24x7 mental health support.",
              },
              {
                title: "Suicide Prevention",
                number: "022 2754 6669",
                desc: "Immediate crisis support.",
              },
            ].map((h, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-700 rounded-xl p-4 hover:bg-gray-600 transition"
              >
                <h3 className="text-lg font-bold text-purple-300">{h.title}</h3>
                <p className="text-gray-300 font-medium">{h.number}</p>
                <p className="text-gray-400 text-sm">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <p className="text-center text-gray-400 italic">
          Seeking help is a sign of strength. You are not alone.
        </p>
      </motion.div>
    </div>
  );
};

export default Help;
