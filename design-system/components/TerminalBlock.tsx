import { useState, useEffect } from 'react';

interface TerminalBlockProps {
  prompt?: string;
  command?: string;
  output?: string[];
  showCursor?: boolean;
}

export function TerminalBlock({
  prompt = 'auggie',
  command = '',
  output = [],
  showCursor = true,
}: TerminalBlockProps) {
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (command) {
      setIsTyping(true);
      let index = 0;
      const timer = setInterval(() => {
        if (index <= command.length) {
          setDisplayedCommand(command.slice(0, index));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [command]);

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-grey-dark/10 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-grey font-mono">bash</span>
      </div>
      
      {/* Terminal content */}
      <div className="p-4 font-mono text-code">
        {displayedCommand && (
          <div className="flex items-center gap-2">
            <span className="text-accent">{prompt}</span>
            <span className="text-primary">{displayedCommand}</span>
            {isTyping && <span className="animate-pulse">▋</span>}
          </div>
        )}
        
        {!isTyping && displayedCommand === command && output.map((line, index) => (
          <div key={index} className="text-grey-light mt-1">
            {line}
          </div>
        ))}
        
        {showCursor && !isTyping && !command && (
          <div className="flex items-center gap-2">
            <span className="text-accent">{prompt}</span>
            <span className="animate-pulse">▋</span>
          </div>
        )}
      </div>
    </div>
  );
}
