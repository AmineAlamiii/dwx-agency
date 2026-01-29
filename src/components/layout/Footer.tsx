import { motion } from 'framer-motion';
import { Twitter, Linkedin, Instagram, Dribbble, Send } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Web Design', href: '#' },
    { label: 'Creative Dev', href: '#' },
    { label: 'Performance', href: '#' },
    { label: 'Branding', href: '#' },
  ],
  ecosystem: [
    { label: 'Case Studies', href: '#work' },
    { label: 'Our Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About Us', href: '#about' },
  ],
  support: [
    { label: 'Client Login', href: '#' },
    { label: 'Status Page', href: '#' },
    { label: 'Newsletter', href: '#' },
    { label: 'Contact', href: '#contact' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Dribbble, href: '#', label: 'Dribbble' },
];

const Footer = () => {
  return (
    <footer className="relative bg-transparent pt-24 pb-12 px-6 lg:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-24">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-3">
            <a href="#" className="inline-block mb-8">
              <span className="text-3xl font-display font-bold gradient-text tracking-tighter">DWX</span>
              <span className="text-xs text-muted-foreground ml-2 uppercase tracking-widest font-bold">Systems</span>
            </a>
            <p className="text-lg text-muted-foreground max-w-md mb-10 font-light leading-relaxed">
              We engineer digital dominance for the world's most ambitious brands.
              Join our network for exclusive insights into the future of the web.
            </p>

            <div className="relative max-w-md">
              <input
                type="email"
                placeholder="Secure email address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/30 font-light"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2">
                Subscribe <Send className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white underline decoration-primary decoration-2 underline-offset-8 mb-8">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors font-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white underline decoration-secondary decoration-2 underline-offset-8 mb-8">Ecosystem</h4>
            <ul className="space-y-4">
              {footerLinks.ecosystem.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-secondary transition-colors font-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white underline decoration-accent decoration-2 underline-offset-8 mb-8">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors font-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
          <div className="flex items-center gap-10">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} DWX — Architectural Digital Experiences
            </p>
          </div>

          <div className="flex gap-8">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
