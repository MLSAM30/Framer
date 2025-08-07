import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const generateDots = () => {
      const newDots = [];
      for (let i = 0; i < 50; i++) {
        newDots.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
        });
      }
      setDots(newDots);
    };

    generateDots();
    window.addEventListener('resize', generateDots);
    return () => window.removeEventListener('resize', generateDots);
  }, []);

  return (
    <div className="animated-background">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="dot"
          initial={{ 
            x: dot.x, 
            y: dot.y,
            scale: 0,
            opacity: 0
          }}
          animate={{ 
            x: [dot.x, dot.x + Math.random() * 200 - 100, dot.x],
            y: [dot.y, dot.y + Math.random() * 200 - 100, dot.y],
            scale: [0, 1, 0.8, 1],
            opacity: [0, 1, 0.7, 1]
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
          style={{
            width: dot.size,
            height: dot.size,
            left: 0,
            top: 0,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
