import React from 'react';
import { motion } from 'framer-motion';

// Sample data
const researchArticles = [
  { title: 'Digital Interventions via Radio in Zambia', type: 'Research', author: 'Abbie Clare et al.', abstract: 'Development and evaluation of a radio-based digital mental health program in Zambia.', link: '#' },
  { title: 'Behavioral Threat Avoidance in Pediatric Anxiety', type: 'Research', author: 'Purnima Qamar et al.', abstract: 'Using naturalistic games to study avoidance behaviors in children with anxiety.', link: '#' },
  { title: 'Clinicians’ Attitudes Toward Online Therapy', type: 'Review', author: 'Tamara M. Whitehead et al.', abstract: 'A systematic review on mental health clinicians’ perspectives on online therapy.', link: '#' },
];

const experts = [
  { name: 'Vikram Patel', quote: 'Unlocking mental health mysteries needs a convergent scientific endeavour.' },
  { name: 'Emily Holmes', quote: 'No journal this broad yet, so an exciting launch!' },
  { name: 'Peter Jones', quote: 'Facilitates creative collaboration across disciplines.' },
];

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center z-10 px-4"
      >
        <h1 className="text-6xl font-extrabold mb-4">Mental Health Science</h1>
        <p className="text-2xl max-w-3xl mx-auto">
          Exploring the frontiers of mental health research, connecting minds, and visualizing knowledge.
        </p>
      </motion.div>
      {/* Animated neuron network */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(50)].map((_, i) => (
          <div key={i} className={`absolute w-2 h-2 bg-teal-${(i%9+1)*100} rounded-full animate-pulse`} style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }}></div>
        ))}
      </motion.div>
    </section>
  );
};

const ResearchCards = () => {
  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12">Latest Research</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-20">
        {researchArticles.map((article, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-shadow relative overflow-hidden"
          >
            <span className={`text-white bg-gradient-to-r from-teal-400 to-purple-500 px-3 py-1 rounded-full text-sm`}>{article.type}</span>
            <h3 className="font-bold text-2xl mt-4 mb-2">{article.title}</h3>
            <p className="text-gray-600 text-sm mb-2"><strong>Author:</strong> {article.author}</p>
            <p className="text-gray-700 text-base mb-4">{article.abstract}</p>
            <a href={article.link} className="text-teal-500 font-semibold hover:underline">Read More →</a>
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 opacity-30 rounded-full blur-3xl animate-pulse"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ExpertCarousel = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
      <h2 className="text-4xl font-bold text-center mb-12">Expert Voices</h2>
      <div className="flex overflow-x-auto space-x-8 px-8 md:px-20 scrollbar-hide">
        {experts.map((expert, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="min-w-[320px] bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 flex-shrink-0 relative overflow-hidden"
          >
            <p className="italic text-gray-700 mb-6">"{expert.quote}"</p>
            <p className="font-bold text-gray-900 text-right">- {expert.name}</p>
            <motion.div
              className="absolute -top-8 -left-8 w-24 h-24 bg-teal-200 opacity-40 rounded-full blur-2xl animate-ping"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ConstellationMap = () => {
  const handleStarClick = (article) => {
    // Open external research constellation link
    window.open(article.link, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100 relative overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-12">Research Constellation</h2>
      <div className="relative h-96 flex items-center justify-center">
        {/* Interactive star nodes */}
        {researchArticles.map((article, i) => (
          <motion.div key={i}
            className="absolute w-5 h-5 bg-yellow-400 rounded-full shadow-lg cursor-pointer"
            style={{ top: `${20 + i*15}%`, left: `${10 + i*20}%` }}
            whileHover={{ scale: 1.5, rotate: 360, backgroundColor: '#FFD700' }}
            onClick={() => handleStarClick(article)}
          />
        ))}
      </div>
      <p className="text-center mt-8 text-gray-700">Click stars to open research details in the constellation map.</p>
    </section>
  );
};

export default function MentalHealthPage() {
  return (
    <div className="font-sans">
      <Hero />
      <ResearchCards />
      <ExpertCarousel />
      <ConstellationMap />
    </div>
  );
}