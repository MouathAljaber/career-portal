import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * Professional Scroll Reveal Component
 * Reveals content with animation when it enters viewport
 * Usage: Wrap any component with this
 */
const ScrollReveal = ({ 
  children, 
  delay = 0,
  direction = 'up',
  className = ''
}) => {
  const [ref, isVisible] = useIntersectionObserver();

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0 transform translate-y-10';
    return 'opacity-100 transform translate-y-0';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${getAnimationClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
