import { motion } from 'framer-motion';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "How long does a typical project take?",
        answer: "Most projects take between 4 to 12 weeks, depending on complexity. Our Launch package can be delivered in as little as 3 weeks."
    },
    {
        question: "Do you offer post-launch support?",
        answer: "Absolutely. We provide monthly maintenance retainers and ongoing optimization services to ensure your platform stays ahead of the curve."
    },
    {
        question: "What technologies do you specialize in?",
        answer: "We are experts in the React ecosystem, specifically Next.js, along with Tailwind CSS, Framer Motion, and various headless CMS solutions like Sanity and Contentful."
    },
    {
        question: "Can you help with branding as well?",
        answer: "Yes, our team includes elite brand designers who can help craft your visual identity from scratch or refine your existing brand for the digital age."
    },
    {
        question: "Who will I be working with directly?",
        answer: "You'll have a dedicated account manager and direct line to our lead designers and developers throughout the entire process."
    }
];

const FAQ = () => {
    return (
        <section id="faq" className="section-padding relative bg-transparent">
            <div className="container-custom max-w-4xl relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Knowledge Base</span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Common <span className="gradient-text">Questions</span></h2>
                    <p className="text-muted-foreground text-lg font-light leading-relaxed">
                        Everything you need to know about our process and workflow.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass p-6 sm:p-8 rounded-3xl border-white/5 bg-white/[0.02]"
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-white/5 py-2">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-medium hover:text-primary hover:no-underline transition-colors py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-lg font-light leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
