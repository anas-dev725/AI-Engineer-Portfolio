import React, { useState } from 'react';
import { Send, Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { analyzeMessage } from '../services/geminiService';
import { ClassificationResult } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [analysis, setAnalysis] = useState<ClassificationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAnalysis = async () => {
    if (formData.message.length < 10) return;
    setIsAnalyzing(true);
    const result = await analyzeMessage(formData.message);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      setAnalysis(null);
      alert("Message sent! (Simulation)");
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
       {/* Decorative glow */}
       <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
       <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Have a project in mind? Let's discuss how we can automate your workflow.
            <br />
            <span className="text-indigo-600 dark:text-indigo-400 text-sm">Type a message and click "AI Analyze" to see my Email Classifier Agent in action.</span>
          </p>
        </div>

        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
              <div className="relative">
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  placeholder="I need help automating my lead generation process..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                
                {/* AI Analysis Button inside textarea area */}
                <button
                  type="button"
                  onClick={handleAnalysis}
                  disabled={formData.message.length < 10 || isAnalyzing}
                  className="absolute bottom-3 right-3 text-xs bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-500/30 px-3 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30 transition-all flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  {isAnalyzing ? "Analyzing..." : "AI Analyze"}
                </button>
              </div>
            </div>

            {/* AI Analysis Result Display */}
            {analysis && (
              <div className="bg-indigo-50 dark:bg-slate-900/80 rounded-lg border border-indigo-200 dark:border-indigo-500/30 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 mb-3 text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-wider">
                  <BotIcon /> Agent Classification Output
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="block text-slate-500 dark:text-slate-500 text-xs">Category</span>
                    <span className="text-slate-900 dark:text-white font-medium">{analysis.category}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 dark:text-slate-500 text-xs">Priority</span>
                    <span className={`font-medium ${analysis.priority === 'High' ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{analysis.priority}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 dark:text-slate-500 text-xs">Sentiment</span>
                    <span className="text-slate-900 dark:text-white font-medium">{analysis.sentiment}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 dark:text-slate-500 text-xs">Next Action</span>
                    <span className="text-slate-900 dark:text-white font-medium">{analysis.suggestedAction}</span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {submitted ? (
                <>Sent Successfully <CheckCircle size={20} /></>
              ) : (
                <>Send Message <Send size={20} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const BotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M9 3v18" />
    <path d="M15 9h.01" />
    <path d="M9 15h6" />
  </svg>
)

export default Contact;