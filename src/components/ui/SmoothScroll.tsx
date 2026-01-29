import { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // Disable smooth scroll on mobile for better performance and native feel
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            // On mobile, use native scroll (no Lenis)
            return;
        }

        // Only enable Lenis on desktop
        const lenis = new Lenis({
            duration: 0.8, // Reduced from 1.2 for faster response
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
