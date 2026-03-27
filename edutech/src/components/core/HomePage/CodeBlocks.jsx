import React, { useState, useEffect, useRef } from 'react';
import CTAButton from './CTAButton';

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const charIndex = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    // Reset when codeblock changes
    charIndex.current = 0;
    setDisplayedText('');
    setIsTyping(true);

    const typeChar = () => {
      if (charIndex.current < codeblock.length) {
        // Handle escape sequences: if we hit a backslash, grab next char too
        const currentChar = codeblock[charIndex.current];
        charIndex.current += 1;
        setDisplayedText(codeblock.slice(0, charIndex.current));

        // Vary speed: faster for spaces/symbols, slower for letters
        const delay = currentChar === '\n' ? 120 : currentChar === ' ' ? 30 : 50;
        timerRef.current = setTimeout(typeChar, delay);
      } else {
        setIsTyping(false);
        // After finishing, wait 3 seconds then restart
        timerRef.current = setTimeout(() => {
          charIndex.current = 0;
          setDisplayedText('');
          setIsTyping(true);
          timerRef.current = setTimeout(typeChar, 50);
        }, 3000);
      }
    };

    timerRef.current = setTimeout(typeChar, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [codeblock]);

  // Count lines in the full codeblock for line numbers
  const lineCount = codeblock.split('\n').length;

  return (
    <div className={`flex ${position} my-20 justify-between gap-10 flex-col lg:flex-row`}>
      {/* Text Section */}
      <div className="w-full lg:w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-bold text-base w-[85%] -mt-3">
          {subheading}
        </div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.icon}
              {ctabtn1.btnText}
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Code Block Section */}
      <div className="h-fit flex flex-row w-full lg:w-[500px] py-4 code-border relative">
        {/* Gradient glow */}
        <div
          className={`absolute w-[372px] h-[257px] rounded-full opacity-20 blur-[68px] -left-2 -top-2 code-glow-animation ${backgroundGradient}`}
        ></div>

        {/* Line Numbers */}
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold select-none">
          {[...Array(lineCount)].map((_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code with typing animation */}
        <div className={`w-[90%] flex flex-col gap-0 font-bold font-mono pr-2 relative ${codeColor}`}>
          <pre className="whitespace-pre-wrap text-sm leading-[1.65] font-bold font-mono">
            {displayedText}
            <span className="typing-cursor"></span>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;

