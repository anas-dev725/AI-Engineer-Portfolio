import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  Calendar, 
  Settings, 
  Plus, 
  Send, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { researchTrendingTopics, generateMultiPlatformContent } from './services/geminiService';
import { Topic, ContentDraft, UserSettings } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'research' | 'content' | 'schedule' | 'settings'>('research');
  const [niche, setNiche] = useState('AI & Automation');
  const [isResearching, setIsResearching] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [drafts, setDrafts] = useState<ContentDraft[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [settings, setSettings] = useState<UserSettings>({
    niche: 'AI & Automation',
    audienceDescription: 'Tech-savvy professionals and business owners interested in efficiency.',
    tone: 'Professional yet approachable and insightful',
    platforms: {
      email: true,
      twitter: true,
      linkedin: true,
      instagram: true
    }
  });

  const handleResearch = async () => {
    setIsResearching(true);
    try {
      const results = await researchTrendingTopics(settings.niche);
      const formattedTopics = results.map((t: any, i: number) => ({
        ...t,
        id: `topic-${Date.now()}-${i}`,
        createdAt: new Date().toISOString()
      }));
      setTopics(formattedTopics);
    } catch (error) {
      console.error('Research failed:', error);
    } finally {
      setIsResearching(false);
    }
  };

  const handleGenerate = async (topic: Topic) => {
    setIsGenerating(true);
    setSelectedTopic(topic);
    try {
      const content = await generateMultiPlatformContent(topic, settings.audienceDescription, settings.tone);
      const newDraft: ContentDraft = {
        id: `draft-${Date.now()}`,
        topicId: topic.id,
        ...content,
        status: 'draft',
        createdAt: new Date().toISOString()
      };
      setDrafts([newDraft, ...drafts]);
      setActiveTab('content');
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#E4E3E0] text-[#141414] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#141414] flex flex-col">
        <div className="p-6 border-bottom border-[#141414]">
          <h1 className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <LayoutDashboard size={24} />
            CONTENTFLOW
          </h1>
          <p className="text-[10px] font-mono opacity-50 uppercase mt-1 tracking-widest">AI Content Agent v1.0</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'research', label: 'Research', icon: Search },
            { id: 'content', label: 'Content', icon: FileText },
            { id: 'schedule', label: 'Schedule', icon: Calendar },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 p-3 text-sm font-mono uppercase tracking-tight transition-all ${
                activeTab === item.id 
                ? 'bg-[#141414] text-[#E4E3E0]' 
                : 'hover:bg-[#141414]/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#141414]">
          <div className="flex items-center gap-3 p-3 bg-white border border-[#141414]">
            <div className="w-8 h-8 bg-[#141414] rounded-full flex items-center justify-center text-[#E4E3E0] text-xs font-bold">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">Anas Mobin</p>
              <p className="text-[10px] opacity-50 truncate">anasmobin0@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-[#141414] flex items-center justify-between px-8 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-mono opacity-50 uppercase tracking-widest">
            <span>Dashboard</span>
            <ChevronRight size={12} />
            <span className="text-[#141414] opacity-100 font-bold">{activeTab}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-[#141414]/5 transition-colors">
              <Plus size={20} />
            </button>
          </div>
        </header>

        {/* View Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'research' && (
              <motion.div
                key="research"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="flex items-end justify-between border-b border-[#141414] pb-4">
                  <div>
                    <h2 className="text-4xl font-serif italic tracking-tight">Market Research</h2>
                    <p className="text-sm opacity-60 mt-1">Discover trending topics in your niche using real-time search data.</p>
                  </div>
                  <button 
                    onClick={handleResearch}
                    disabled={isResearching}
                    className="btn-primary flex items-center gap-2"
                  >
                    {isResearching ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
                    {isResearching ? 'Analyzing...' : 'Start Research'}
                  </button>
                </div>

                <div className="grid gap-4">
                  <div className="data-row col-header">
                    <span>Score</span>
                    <span>Topic Title</span>
                    <span>Source</span>
                    <span>Action</span>
                  </div>
                  {topics.length === 0 && !isResearching && (
                    <div className="p-12 text-center border border-dashed border-[#141414]/30">
                      <p className="text-sm font-mono opacity-40">No research data available. Click "Start Research" to begin.</p>
                    </div>
                  )}
                  {topics.map((topic) => (
                    <div key={topic.id} className="data-row group">
                      <span className="data-value text-lg font-bold">{topic.relevanceScore}%</span>
                      <div className="flex flex-col">
                        <span className="font-bold">{topic.title}</span>
                        <span className="text-[10px] opacity-60 line-clamp-1">{topic.summary}</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-50 truncate max-w-[150px]">{topic.sourceUrl}</span>
                      <button 
                        onClick={() => handleGenerate(topic)}
                        className="text-[10px] font-mono uppercase tracking-widest hover:underline text-right"
                      >
                        Generate Content
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-5xl mx-auto space-y-8"
              >
                <div className="flex items-end justify-between border-b border-[#141414] pb-4">
                  <div>
                    <h2 className="text-4xl font-serif italic tracking-tight">Content Drafts</h2>
                    <p className="text-sm opacity-60 mt-1">AI-generated multi-platform content ready for review and publishing.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {drafts.map((draft) => (
                    <div key={draft.id} className="card space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono bg-[#141414] text-[#E4E3E0] px-2 py-1 uppercase">Draft</span>
                        <span className="text-[10px] font-mono opacity-40">{new Date(draft.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-lg font-bold">
                        {topics.find(t => t.id === draft.topicId)?.title || 'Untitled Topic'}
                      </h3>
                      
                      <div className="grid grid-cols-4 gap-2">
                        <div className="flex flex-col items-center p-2 border border-[#141414]/10">
                          <Mail size={16} className="opacity-40" />
                          <span className="text-[8px] font-mono mt-1">Email</span>
                        </div>
                        <div className="flex flex-col items-center p-2 border border-[#141414]/10">
                          <Twitter size={16} className="opacity-40" />
                          <span className="text-[8px] font-mono mt-1">X</span>
                        </div>
                        <div className="flex flex-col items-center p-2 border border-[#141414]/10">
                          <Linkedin size={16} className="opacity-40" />
                          <span className="text-[8px] font-mono mt-1">LinkedIn</span>
                        </div>
                        <div className="flex flex-col items-center p-2 border border-[#141414]/10">
                          <Instagram size={16} className="opacity-40" />
                          <span className="text-[8px] font-mono mt-1">IG</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button className="flex-1 btn-primary text-[10px]">Edit Draft</button>
                        <button className="p-2 border border-[#141414] hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors">
                          <Send size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {drafts.length === 0 && (
                    <div className="col-span-full p-12 text-center border border-dashed border-[#141414]/30">
                      <p className="text-sm font-mono opacity-40">No drafts yet. Start by researching topics.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto space-y-8"
              >
                <div className="border-b border-[#141414] pb-4">
                  <h2 className="text-4xl font-serif italic tracking-tight">Agent Config</h2>
                  <p className="text-sm opacity-60 mt-1">Configure your AI agent's niche, audience, and platform preferences.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest opacity-50">Target Niche</label>
                    <input 
                      type="text" 
                      value={settings.niche}
                      onChange={(e) => setSettings({...settings, niche: e.target.value})}
                      className="w-full p-4 bg-white border border-[#141414] font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#141414]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest opacity-50">Audience Description</label>
                    <textarea 
                      rows={3}
                      value={settings.audienceDescription}
                      onChange={(e) => setSettings({...settings, audienceDescription: e.target.value})}
                      className="w-full p-4 bg-white border border-[#141414] font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#141414]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest opacity-50">Content Tone</label>
                    <input 
                      type="text" 
                      value={settings.tone}
                      onChange={(e) => setSettings({...settings, tone: e.target.value})}
                      className="w-full p-4 bg-white border border-[#141414] font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#141414]"
                    />
                  </div>

                  <div className="space-y-4 pt-4">
                    <label className="text-[10px] font-mono uppercase tracking-widest opacity-50">Active Platforms</label>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(settings.platforms).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => setSettings({
                            ...settings, 
                            platforms: {...settings.platforms, [key]: !value}
                          })}
                          className={`flex items-center justify-between p-4 border border-[#141414] transition-all ${
                            value ? 'bg-[#141414] text-[#E4E3E0]' : 'bg-white'
                          }`}
                        >
                          <span className="text-xs font-mono uppercase">{key}</span>
                          {value ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 border border-[#141414]" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="w-full btn-primary py-4 text-sm mt-8">Save Configuration</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="border-b border-[#141414] pb-4">
                  <h2 className="text-4xl font-serif italic tracking-tight">Automation Pipeline</h2>
                  <p className="text-sm opacity-60 mt-1">Weekly content schedule and automated publishing status.</p>
                </div>

                <div className="p-12 text-center border border-dashed border-[#141414]/30">
                  <AlertCircle className="mx-auto opacity-20 mb-4" size={48} />
                  <p className="text-sm font-mono opacity-40">Scheduling features are currently in development.</p>
                  <p className="text-[10px] font-mono opacity-30 mt-2">Connect your platform APIs in Settings to enable automation.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Generation Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#E4E3E0]/90 backdrop-blur-md z-50 flex items-center justify-center p-8"
          >
            <div className="max-w-md w-full text-center space-y-6">
              <div className="relative w-24 h-24 mx-auto">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-[#141414] rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="animate-spin text-[#141414]" size={32} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif italic">Generating Content</h3>
                <p className="text-sm font-mono opacity-60 mt-2">
                  Our AI agent is crafting your newsletter and social media posts for:
                  <br />
                  <span className="font-bold text-[#141414] mt-1 block">"{selectedTopic?.title}"</span>
                </p>
              </div>
              <div className="space-y-2">
                <div className="h-1 bg-[#141414]/10 w-full overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="h-full bg-[#141414] w-1/2"
                  />
                </div>
                <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Optimizing for multi-platform engagement...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
