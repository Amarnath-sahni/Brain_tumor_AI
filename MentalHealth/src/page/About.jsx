import React from "react";
import { useNavigate } from "react-router-dom";
import mind from "../assets/mind.png";
import depressMind from "../assets/depressMind.png";
import DepressMind2 from "../assets/depressMind2.png";
import depressMind3 from "../assets/depressMind3.png";
import positive1 from "../assets/healthy.png";
import positive2 from "../assets/positiveMind.png";
import positive3 from "../assets/MentalHealth.png";

const images = [
  { src: mind, text: "Understand your mind and thoughts.", link: "/mind" },
  { src: depressMind, text: "Mental health starts with self-care.", link: "/d" },
  { src: DepressMind2, text: "Recognize signs of depression early.", link: "/d2" },
  { src: depressMind3, text: "Reach out for help if you feel low.", link: "/d3" },
  { src: positive1, text: "Focus on positive habits daily.", link: "/p" },
  { src: positive2, text: "Surround yourself with support.", link: "/p2" },
  { src: positive3, text: "Celebrate small achievements.", link: "/p3" },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans bg-cream text-gray-900">

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${DepressMind2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-xl text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">
            Mental Wellness is a Journey, Not a Destination
          </h1>
          <p className="text-lg md:text-xl mb-4">{images[0].text}</p>
          <p className="italic text-gray-700">
            Have you ever felt lost in your own head? We have too. That’s why we built this.
          </p>
        </div>
      </section>

      {/* Real Talk Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {images.slice(1, 4).map((img, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.text}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4">
                <p className="text-white text-center">{img.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-2/3">
          <img
            src={images[4].src}
            alt={images[4].text}
            className="rounded-xl w-full shadow-lg"
          />
        </div>
        <div className="md:w-1/3 space-y-4">
          <img
            src={images[5].src}
            alt={images[5].text}
            className="rounded-xl w-full shadow-lg"
          />
          <p className="text-lg">
            Surround yourself with support and focus on positive habits.
          </p>
        </div>
      </section>

      {/* Community Section */}
      <section
        className="relative py-32 flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url(${images[6].src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-transparent backdrop-blur-md p-10 rounded-xl max-w-2xl">
          <h2 className="text-4xl text-purple-600 font-serif mb-6">Every Small Win is a Victory</h2>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          >
            Join Our Community
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
