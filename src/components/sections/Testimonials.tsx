import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Sarah Anderson',
        role: 'CEO at TechPulse',
        content: 'DWX Agency transformed our vision into a digital masterpiece. Their attention to detail and technical prowess are unmatched.',
        rating: 5,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
        name: 'Michael Chen',
        role: 'Founder of Nexus AI',
        content: "Working with DWX was a game-changer. Our conversion rates increased by 150% after the relaunch. Simply the best.",
        rating: 5,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
    },
    {
        name: 'Elena Rodriguez',
        role: 'Marketing Director at Bloom',
        content: 'The cinematic feel and smooth animations they implemented for our brand are incredible. Our clients love the new site!',
        rating: 5,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena'
    },
    {
        name: 'David Smith',
        role: 'Product Manager at Zenith',
        content: 'Incredible speed, stunning design, and a perfectly clean codebase. DWX is the standard for modern agencies.',
        rating: 5,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
    },
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="section-padding relative bg-transparent overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Social Proof</span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Trusted by <span className="gradient-text">Leaders</span></h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
                        Don't just take our word for it. Hear from the founders and developers we've collaborated with.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            className="glass p-8 relative flex flex-col justify-between group border-white/5 hover:border-blue-500/30 transition-all duration-500"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            whileHover={{ y: -5 }}
                        >
                            <Quote className="absolute top-4 right-4 w-10 h-10 text-white/5 group-hover:text-blue-500/10 transition-colors" />

                            <div>
                                <div className="flex gap-1 mb-6">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-8 italic font-light leading-relaxed">
                                    "{t.content}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 bg-muted/30">
                                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white tracking-tight">{t.name}</h4>
                                    <p className="text-xs text-muted-foreground">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
