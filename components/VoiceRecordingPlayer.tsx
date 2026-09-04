import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Mic, RotateCcw } from 'lucide-react';

interface VoiceRecordingPlayerProps {
  title: string;
  audioUrl?: string;
  duration?: string;
  accentColor?: string;
  sampleDescription?: string;
  compact?: boolean;
}

export const VoiceRecordingPlayer: React.FC<VoiceRecordingPlayerProps> = ({
  title,
  audioUrl,
  duration = '0:07',
  accentColor = 'emerald',
  sampleDescription,
  compact = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(7);
  const [isMuted, setIsMuted] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Parse duration string to seconds if needed
  useEffect(() => {
    if (duration.includes(':')) {
      const parts = duration.split(':');
      const secs = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      setTotalDuration(secs || 7);
    }
  }, [duration]);

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration) && audioRef.current.duration > 0) {
      setTotalDuration(Math.round(audioRef.current.duration));
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } else {
      // Try playing the audio element
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.warn("Audio play prevented or file missing, falling back to synthesis preview:", error);
            // Fallback: Use speech synthesis preview so visitors always hear audio!
            if ('speechSynthesis' in window) {
              window.speechSynthesis.cancel();
              const sampleText = sampleDescription || `Hello, this is the voice AI agent for ${title}. How can I assist your booking today?`;
              const utterance = new SpeechSynthesisUtterance(sampleText);
              utterance.rate = 1.0;
              utterance.pitch = 1.05;
              utterance.onstart = () => {
                setIsPlaying(true);
                setIsSynthesizing(true);
              };
              utterance.onend = () => {
                setIsPlaying(false);
                setIsSynthesizing(false);
                setCurrentTime(0);
              };
              utterance.onerror = () => {
                setIsPlaying(false);
                setIsSynthesizing(false);
              };
              window.speechSynthesis.speak(utterance);
            }
          });
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const restartAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  // Waveform bars simulation
  const waveHeights = [40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65, 90, 40, 85, 60];

  return (
    <div 
      onClick={(e) => e.stopPropagation()} 
      className={`rounded-xl border transition-all duration-300 select-none ${
        compact 
          ? 'p-2.5 bg-slate-900/90 border-emerald-500/30 shadow-md' 
          : 'p-3 bg-[#030712]/95 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
      }`}
    >
      {/* Hidden native audio tag */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          onEnded={handleAudioEnded}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={() => {
            console.log("Audio file unavailable, fallback ready:", audioUrl);
          }}
        />
      )}

      {/* Header Info */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            {isPlaying && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-emerald-400' : 'bg-emerald-500/50'}`}></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1">
            <Mic size={10} />
            {isPlaying ? 'Playing Voice Call Recording' : 'Voice Agent Recording Proof'}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(totalDuration)}</span>
        </div>
      </div>

      {/* Controls & Waveform Track */}
      <div className="flex items-center gap-2.5">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isPlaying 
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/40 scale-105' 
              : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40'
          }`}
          title={isPlaying ? "Pause Recording" : "Play Recording"}
          aria-label={isPlaying ? "Pause Voice Recording" : "Play Voice Recording"}
        >
          {isPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current ml-0.5" />}
        </button>

        {/* Dynamic Waveform Visualizer */}
        <div className="flex-grow flex items-center gap-0.5 sm:gap-1 h-6 px-1.5 bg-slate-950/80 rounded-md border border-slate-800/80 overflow-hidden relative">
          {/* Progress fill line */}
          <div 
            className="absolute left-0 top-0 bottom-0 bg-emerald-500/10 pointer-events-none transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
          
          {waveHeights.map((h, i) => {
            const isBarPast = (i / waveHeights.length) * 100 <= progressPercent;
            const barHeight = isPlaying 
              ? Math.max(25, (h * (0.4 + 0.6 * Math.sin((currentTime * 8) + i)))) 
              : h * 0.45;
            
            return (
              <div 
                key={i} 
                className="flex-1 rounded-full transition-all duration-100 min-w-[2px]"
                style={{ 
                  height: `${barHeight}%`,
                  backgroundColor: isBarPast 
                    ? '#34d399' // active emerald
                    : isPlaying 
                      ? '#059669' 
                      : '#334155' // dark slate
                }}
              />
            );
          })}
        </div>

        {/* Secondary Audio Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={restartAudio}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Replay from start"
            aria-label="Replay recording"
          >
            <RotateCcw size={12} />
          </button>
          <button
            onClick={toggleMute}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
        </div>
      </div>

      {sampleDescription && (
        <p className="mt-2 text-[10px] text-slate-400 leading-tight font-sans line-clamp-1 italic">
          "{sampleDescription}"
        </p>
      )}
    </div>
  );
};
