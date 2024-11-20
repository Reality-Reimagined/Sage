import React from 'react';
import { Mic, MicOff, Play, Square } from 'lucide-react';

interface VoiceControlsProps {
  isRecording: boolean;
  onToggleRecording: () => void;
}

export function VoiceControls({ isRecording, onToggleRecording }: VoiceControlsProps) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={onToggleRecording}
        className={`p-4 rounded-full transition-all ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isRecording ? (
          <MicOff className="h-6 w-6 text-white" />
        ) : (
          <Mic className="h-6 w-6 text-white" />
        )}
      </button>
      {isRecording && (
        <div className="text-sm text-red-500 animate-pulse">Recording...</div>
      )}
    </div>
  );
}