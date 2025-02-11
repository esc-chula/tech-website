'use client';

import {
  type HTMLMotionProps,
  motion,
  useAnimation,
  useInView,
} from 'framer-motion';
import { useEffect, useRef } from 'react';

interface ScrollRevealerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  initialTranslateY?: string;
}

const ScrollRevealer: React.FC<ScrollRevealerProps> = ({
  children,
  delay = 0.3,
  initialTranslateY = '20%',
  ...props
}) => {
  const ref = useRef(null);
  const isInview = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInview) {
      controls
        .start('visible')
        .catch((err: unknown) =>
          console.error(
            'ScrollRevealer, animation controls failed to start: ',
            err,
          ),
        );
    }
  }, [isInview, controls]);

  return (
    <motion.div
      {...props}
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{
        type: 'tween',
        duration: 0.5,
        delay,
        ease: 'easeOut',
      }}
      variants={{
        hidden: { opacity: 0, translateY: initialTranslateY },
        visible: { opacity: 1, translateY: 0 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealer;
