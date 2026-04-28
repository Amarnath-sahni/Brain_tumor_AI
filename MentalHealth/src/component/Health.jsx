import React, { useState } from "react";
import {
  UploadCloud,
  Phone,
  Mail,
  RefreshCw,
} from "lucide-react";

// 🎯 Map backend response to UI
const tumorInfo = {
  glioma: {
    name: "Glioma",
    danger: "High Risk",
    color: "red",
    desc: "Aggressive tumor affecting brain tissue. Requires urgent evaluation.",
  },
  meningioma: {
    name: "Meningioma",
    danger: "Moderate Risk",
    color: "yellow",
    desc: "Usually slow-growing but may require surgery depending on size.",
  },
  no_tumor: {
    name: "No Tumor",
    danger: "Safe",
    color: "green",
    desc: "No abnormal growth detected. Scan appears normal.",
  },
  pituitary: {
    name: "Pituitary Tumor",
    danger: "Moderate Risk",
    color: "orange",
    desc: "Affects hormone levels. Needs medical monitoring.",
  },
};

const Health = () => {
  const [image, setImage] = useState(null);     // preview image
  const [file, setFile] = useState(null);       // actual file
  const [result, setResult] = useState(null);   // API response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 📤 Upload + API call
  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setImage(URL.createObjectURL(selectedFile));
    setFile(selectedFile);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);

      // ✅ FIXED URL → Node backend (NOT Flask directly)
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      // Handle server errors properly
      if (!response.status == 200) {
        const text = await response.text();
        console.error("Server Error:", text);
        throw new Error("Server error");
      }

      const data = await response.json();
      console.log("API Response:", data);

      setResult(data);

    } catch (err) {
      console.error("Error:", err);
      setError("❌ Failed to connect backend. Make sure Node & Flask are running.");
    } finally {
      setLoading(false);
    }
  };

  // 📧 Email report
  const openGmail = () => {
    if (!result) return;

    const subject = encodeURIComponent("Brain Tumor Detection Report");
    const body = encodeURIComponent(
      `Detected Tumor Type: ${result.result}
Confidence: ${result.confidence}%`
    );

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=director@aiims.gov.in&su=${subject}&body=${body}`,
      "_blank"
    );
  };

  // 🔄 Reset
  const resetHandler = () => {
    setImage(null);
    setFile(null);
    setResult(null);
    setError("");
  };

  const data = result ? tumorInfo[result.result] : null;
  const isTumor = result && result.result !== "no_tumor";

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 flex flex-col items-center justify-center">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 text-center">
        AI Brain Tumor Detection System
      </h1>

      <div className="bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-2xl p-6 w-full max-w-5xl border border-gray-700">

        {/* Upload */}
        {!image && (
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-10 cursor-pointer hover:border-blue-500 transition">
            <UploadCloud size={42} className="mb-3 text-blue-400" />
            Upload MRI Scan
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-center text-blue-400 animate-pulse">
            🔍 Analyzing MRI...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-400 mt-3">
            {error}
          </p>
        )}

        {/* Result */}
        {image && result && data && (
          <div className="grid md:grid-cols-2 gap-6 items-center">

            {/* Image */}
            <img
              src={image}
              alt="MRI"
              className="rounded-xl shadow-lg w-full max-h-[350px] object-cover"
            />

            {/* Result Box */}
            <div
              className={`p-6 rounded-xl border ${
                data.color === "red"
                  ? "border-red-500 bg-red-500/10"
                  : data.color === "yellow"
                  ? "border-yellow-500 bg-yellow-500/10"
                  : data.color === "orange"
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-green-500 bg-green-500/10"
              }`}
            >
              <h2 className="text-2xl font-bold mb-2">{data.name}</h2>

              <p className="font-semibold mb-2">
                {data.danger}
              </p>

              <p className="text-gray-300 text-sm mb-3">
                {data.desc}
              </p>

              {/* Confidence */}
              <p className="text-sm text-gray-400">
                Confidence: {result.confidence}%
              </p>

              {/* Actions */}
              {isTumor && (
                <div className="flex gap-3 mt-5 flex-wrap">

                  <a
                    href="tel:+911234567890"
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                  >
                    <Phone size={18} /> Call Hospital
                  </a>

                  <button
                    onClick={openGmail}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                  >
                    <Mail size={18} /> Email Report
                  </button>
                </div>
              )}

              {/* Reset */}
              <button
                onClick={resetHandler}
                className="mt-5 flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <RefreshCw size={18} /> Upload Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Health;