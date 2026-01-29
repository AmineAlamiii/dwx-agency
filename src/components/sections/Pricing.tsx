import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import GlowButton from '../ui/GlowButton';

const plans = [
    {
        name: 'Launch',
        price: '2k',
        description: 'Perfect for startups needing a high-impact presence fast.',
        features: ['Single Page Design', 'Responsive Build', 'Motion Effects', 'Analytics Integration', 'SEO Basics'],
        isPopular: false,
    },
    {
        name: 'Elite',
        price: '5k',
        description: 'The standard for companies looking to dominate their market.',
        features: ['Multi-page Experience', 'Custom 3D Elements', 'Advanced Animations', 'Performance Tuning', 'Priority Support', 'Blog / CMS System'],
        isPopular: true,
    },
    {
        name: 'Custom',
        price: '10k+',
        description: 'Tailored solutions for complex product ecosystems.',
        features: ['Full Product Design', 'Strategic Branding', 'Interactive Tools', 'Backend Integration', 'Dedicated Team', 'Retainer Options'],
        isPopular: false,
    },
];

const Pricing = () => {
    return (
        <section id="pricing" className="section-padding relative bg-transparent">
            <div className="container-custom relative z-10">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Investment</span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Pricing <span className="gradient-text">Packages</span></h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Transparent pricing for elite digital craftsmanship. Choose the plan that fuels your brand's growth.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            className={`relative glass p-10 flex flex-col h-full border-white/5 transition-all duration-500 overflow-hidden group ${plan.isPopular ? 'border-primary/30 ring-1 ring-primary/20' : 'hover:border-white/10'
                                }`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                        >
                            {plan.isPopular && (
                                <div className="absolute top-0 right-10 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-b-xl z-20">
                                    Most Popular
                                </div>
                            )}

                            {/* Background Glow */}
                            <div className={`absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                            <div className="mb-10 relative z-10">
                                <h3 className="text-xl font-bold mb-4 tracking-tight">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-sm text-muted-foreground">$</span>
                                    <span className="text-5xl font-display font-bold text-white tracking-tighter">{plan.price}</span>
                                    <span className="text-sm text-muted-foreground">/project</span>
                                </div>
                                <p className="text-muted-foreground font-light text-sm">{plan.description}</p>
                            </div>

                            <div className="w-full h-px bg-white/5 mb-10" />

                            <ul className="space-y-4 mb-12 flex-grow relative z-10">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-400 font-light group-hover:text-gray-200 transition-colors">
                                        <Check className="w-4 h-4 text-primary shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <GlowButton
                                variant={plan.isPopular ? "primary" : "outline"}
                                className="w-full relative z-10 py-5 text-sm"
                            >
                                Get Started with {plan.name}
                            </GlowButton>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
