import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Contact = ({ show, onClose }) => {
  const [theme, setTheme] = useState("dark");
  const [form, setForm] = useState({ name: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setSent(true);
        setForm({ name: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      })
      .catch(() => {
        setLoading(false);
        alert("Something went wrong. Please try again.");
      });
  };

  const isDark = theme === "dark";
  const bgColor = isDark
    ? "bg-gray-900/80 backdrop-blur-md"
    : "bg-white/80 backdrop-blur-md";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const buttonText = isDark ? "🌞 Mode" : "🌙 Mode";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
        >
          <div
            className={`relative w-[90%] max-w-md max-h-[90vh] rounded-2xl shadow-2xl border border-white/10 overflow-hidden ${bgColor}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 pt-6 pb-2 sticky top-0 z-10 bg-opacity-80 backdrop-blur-lg">
              <button
                onClick={onClose}
                className={`text-2xl transition hover:text-red-500 ${textColor}`}
              >
                ✕
              </button>
              <button
                onClick={toggleTheme}
                className="text-sm px-4 py-1 rounded-full bg-gradient-to-r from-teal-500 to-green-400 text-white hover:from-yellow-400 hover:to-pink-500 transition"
              >
                {buttonText}
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 pt-8 overflow-y-auto max-h-[80vh] scrollbar-hide">
              <h2
                className={`text-3xl font-bold mb-6 ${textColor} tracking-wide uppercase font-mono text-center`}
              >
                Let's Talk 💬
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="4"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold hover:from-pink-500 hover:to-yellow-500 transition-all shadow-md"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>

              {sent && (
                <p className="text-green-400 font-medium text-center mt-4">
                  Message sent successfully! ✅
                </p>
              )}

              {/* Social Icons */}
              <div className="flex justify-center gap-6 mt-10 text-3xl">
                <a
                  href="https://github.com/AarushiDaksh"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
                  title="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/aarushidaksh/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-blue-400 transition-transform transform hover:scale-110"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>

            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Contact;
