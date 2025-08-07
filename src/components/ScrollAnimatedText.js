import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollAnimatedText = () => {
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(setScrollProgress);
    return unsubscribe;
  }, [scrollYProgress]);

  // Smooth animation from very bottom to center
  const textY = useTransform(scrollYProgress, [0, 0.5], [window.innerHeight, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  // Slide 5: Original text moves up and vanishes (after all text is bright)
  const slide5ExitY = useTransform(scrollYProgress, [0.85, 0.9], [0, -300]);
  const slide5ExitOpacity = useTransform(scrollYProgress, [0.85, 0.9], [1, 0]);
  
  // Slide 5: New ZRIKA content from bottom (after first text vanishes)
  const slide5EntryY = useTransform(scrollYProgress, [0.9, 0.95], [window.innerHeight, 0]);
  const slide5EntryOpacity = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);
  
  // Final screen: Text becomes small and sticks to top
  const finalScale = useTransform(scrollYProgress, [0.95, 1], [1, 0.6]);
  const finalY = useTransform(scrollYProgress, [0.95, 1], [0, -window.innerHeight * 0.4]);
  
  // Final screen: Cards animation (RR1 faster than LL1)
  const bottomCardX = useTransform(scrollYProgress, [0.95, 0.98], [-500, 0]); // RR1 faster
  const topCardX = useTransform(scrollYProgress, [0.95, 1], [-500, 0]); // LL1 slower
  const bottomCardY = useTransform(scrollYProgress, [0.95, 0.98], [300, 0]);
  const topCardY = useTransform(scrollYProgress, [0.95, 1], [300, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);
  
  // Card rotation and image switching
  const cardRotation = useTransform(scrollYProgress, [1, 1.05], [0, 90]);
  
  // Card separation animation
  const topCardSeparateX = useTransform(scrollYProgress, [1.05, 1.08, 1.12, 1.15], [0, -150, -150, 0]); // Card moves left and returns
  const bottomCardSeparateX = useTransform(scrollYProgress, [1.05, 1.08, 1.12, 1.15], [0, 150, 150, 0]); // Charger moves right and returns
  const topCardRotateY = useTransform(scrollYProgress, [1.05, 1.08], [0, 15]); // Card tilts to show magnetic stripe
  const bottomCardRotateY = useTransform(scrollYProgress, [1.05, 1.08], [0, -15]); // Charger tilts opposite
  
  // LL1 smooth anti-clockwise rotation and increased separation from RR1
  const topCardVerticalRotate = useTransform(scrollYProgress, [1.15, 1.25], [0, -90]); // Smooth rotate anti-clockwise to left
  const topCardFinalSeparateX = useTransform(scrollYProgress, [1.15, 1.25], [0, -450]); // Move much further left for better separation
  
  // Complex 3D transformation for LL1 (further scrolling)
  const topCard3DX = useTransform(scrollYProgress, [1.25, 1.3], [-300, -150]); // x: -200 to -150
  const topCard3DY = useTransform(scrollYProgress, [1.25, 1.3], [0, -50]); // y: 0 to -50
  const topCard3DZ = useTransform(scrollYProgress, [1.25, 1.3], [0, -100]); // z: 0 to -100
  const topCard3DRotX = useTransform(scrollYProgress, [1.25, 1.3], [0, -5]); // rotX: 0 to -5
  const topCard3DRotY = useTransform(scrollYProgress, [1.25, 1.3], [0, 15]); // rotY: 0 to 15
  const topCard3DRotZ = useTransform(scrollYProgress, [1.25, 1.3], [-90, -87]); // rotZ: -90 to -87 (anti-clockwise)
  const topCard3DScale = useTransform(scrollYProgress, [1.25, 1.3], [1, 0.95]); // scale: 1.0 to 0.95
  const topCard3DOpacity = useTransform(scrollYProgress, [1.25, 1.3], [1, 0.9]); // opacity: 1.0 to 0.9
  
  // Futuristic left-to-right transition with parallax - maintaining anti-clockwise angle
  const llTransitionX = useTransform(scrollYProgress, [1.3, 1.35], [-200, -100]); // Keep more separated position
  const llTransitionOpacity = useTransform(scrollYProgress, [1.3, 1.32, 1.35], [0, 0.5, 1]); // Fade in
  const llParallaxY = useTransform(scrollYProgress, [1.3, 1.4], [0, -20]); // Slower parallax
  const llRightAngleRotate = useTransform(scrollYProgress, [1.3, 1.35], [-90, -90]); // Maintain anti-clockwise rotation
  
  const rrTransitionScale = useTransform(scrollYProgress, [1.32, 1.34, 1.37], [1, 1.2, 1]); // Scale up then down
  const rrTransitionRotate = useTransform(scrollYProgress, [1.32, 1.37], [0, 360]); // Full rotation
  const rrTransitionOpacity = useTransform(scrollYProgress, [1.32, 1.37], [1, 1]); // Stay visible
  const rrParallaxY = useTransform(scrollYProgress, [1.32, 1.4], [0, -40]); // Faster parallax

  const text = "Experience Effortless Banking at Your Fingertips";
  const words = text.split(' ');
  
  // Get current scroll progress for conditional rendering
  const currentProgress = scrollYProgress.get();
  
  return (
    <div className="scroll-content">
      <div className="text-container">
        <motion.div
          className="main-text"
          style={{ 
            y: currentProgress > 0.85 ? slide5ExitY : textY,
            opacity: currentProgress > 0.85 ? slide5ExitOpacity : textOpacity
          }}
        >
          {words.map((word, wordIndex) => {
            const wordStart = words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0);
            
            return (
              <span key={wordIndex} className="word">
                {word.split('').map((char, charIndex) => {
                  const charPosition = (wordStart + charIndex) / text.length;
                  const charDelay = charPosition * 0.5;
                  
                  const brightnessStart = 0.5 + charPosition * 0.3;
                  const charOpacity = scrollProgress < brightnessStart ? 0.3 : 
                    Math.min(1, (scrollProgress - brightnessStart) / 0.2 + 0.3);
                  
                  return (
                    <motion.span
                      key={charIndex}
                      className="char"
                      animate={{
                        opacity: charOpacity
                      }}
                      transition={{ duration: 0.1 }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
                {wordIndex < words.length - 1 && <span> </span>}
              </span>
            );
          })}
        </motion.div>
      </div>
      
      {/* Slide 5: New ZRIKA content */}
      <motion.div
        className="slide5-container"
        style={{
          y: currentProgress > 0.95 ? finalY : slide5EntryY,
          opacity: slide5EntryOpacity,
          scale: currentProgress > 0.95 ? finalScale : 1
        }}
      >
        <div className="slide5-content">
          <h1 className="slide5-heading">Step into the future with <span className="zrika-text">ZRIKA</span></h1>
          <p className="slide5-paragraph">We bridge the gap between your financial goals and innovative tools, delivering smart solutions for a seamless banking experience.</p>
        </div>
      </motion.div>
      
      {/* Final screen: Cards */}
      <motion.div
        className="final-card top-card"
        style={{
          x: currentProgress > 1.3 ? llTransitionX : (currentProgress > 1.25 ? topCard3DX : (currentProgress > 1.15 ? topCardFinalSeparateX : (currentProgress > 1.05 ? topCardSeparateX : topCardX))),
          y: currentProgress > 1.3 ? llParallaxY : (currentProgress > 1.25 ? topCard3DY : topCardY),
          opacity: currentProgress > 1.3 ? llTransitionOpacity : (currentProgress > 1.25 ? topCard3DOpacity : cardOpacity),
          rotateY: currentProgress > 1.25 ? topCard3DRotY : (currentProgress > 1.15 ? 0 : (currentProgress > 1.05 ? topCardRotateY : cardRotation)),
          rotateZ: currentProgress > 1.3 ? llRightAngleRotate : (currentProgress > 1.25 ? topCard3DRotZ : (currentProgress > 1.15 ? topCardVerticalRotate : 0)),
          scale: currentProgress > 1.25 ? topCard3DScale : 1
        }}
        whileHover={currentProgress > 1.35 ? { scale: 1.05 } : {}}
        animate={currentProgress > 1.15 ? {
          rotateZ: -90,
          boxShadow: currentProgress > 1.35 ? [
            "0 0 20px rgba(0, 204, 204, 0.3)",
            "0 0 40px rgba(0, 204, 204, 0.6)",
            "0 0 20px rgba(0, 204, 204, 0.3)"
          ] : "0 0 0px rgba(0, 0, 0, 0)"
        } : { rotateZ: 0 }}
        transition={{ 
          rotateZ: { duration: 1.2, ease: "easeInOut" },
          boxShadow: { duration: 2, repeat: Infinity }
        }}
      >
        <motion.img 
          src={currentProgress > 1.4 ? "./images/LL2.png" : "./images/LL1.png"} 
          alt="Top Card" 
          className="final-card-image"
          animate={{
            opacity: currentProgress > 1.4 ? [0.3, 1] : 1,
            scale: currentProgress > 1.4 ? [0.9, 1.1, 1] : 1,
            rotateY: currentProgress > 1.4 ? [0, 15, 0] : 0
          }}
          transition={{
            duration: 1,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <motion.div
        className="final-card bottom-card"
        style={{
          x: currentProgress > 1.05 ? bottomCardSeparateX : bottomCardX,
          y: currentProgress > 1.32 ? rrParallaxY : bottomCardY,
          opacity: currentProgress > 1.32 ? rrTransitionOpacity : cardOpacity,
          rotateY: currentProgress > 1.05 ? bottomCardRotateY : cardRotation,
          rotateZ: currentProgress > 1.32 ? rrTransitionRotate : 0,
          scale: currentProgress > 1.32 ? rrTransitionScale : 1
        }}
        whileHover={currentProgress > 1.37 ? { scale: 1.1 } : {}}
        animate={currentProgress > 1.37 ? {
          boxShadow: [
            "0 0 25px rgba(255, 165, 0, 0.4)",
            "0 0 50px rgba(255, 165, 0, 0.7)",
            "0 0 25px rgba(255, 165, 0, 0.4)"
          ]
        } : {}}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <img 
          src={currentProgress > 1.37 ? "./images/RR2.png" : "./images/RR1.png"} 
          alt="Bottom Card" 
          className="final-card-image" 
        />
      </motion.div>
      
      {/* Spacer div to enable scrolling */}
      <div className="scroll-spacer"></div>
    </div>
  );
};

export default ScrollAnimatedText;