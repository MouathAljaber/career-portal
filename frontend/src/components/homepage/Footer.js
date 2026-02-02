import signature from "../../assets/Sign.png";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/kontakt' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Imprint', href: '/impressum' },
    { label: 'Privacy Policy', href: '/datenschutz' },
    { label: 'Terms of Service', href: '/agb' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Disclaimer', href: '/haftungsausschluss' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <a href="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <span className="text-2xl font-bold text-white">EVLEENE</span>
            </a>
            <p className="text-gray-400 text-sm mb-6 max-w-xs leading-relaxed">
              Germany's leading internship platform connecting talented students with top companies across the nation.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="mailto:hello@evleene.com" className="flex items-center gap-3 text-sm text-gray-400 hover:text-gray-200 transition-colors">
                <Mail className="w-4 h-4" />
                hello@evleene.com
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-gray-400 hover:text-gray-200 transition-colors">
                <Phone className="w-4 h-4" />
                +49 1776770131
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 shrink-0" />
                Germany
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center ring-1 ring-white/10 text-gray-300 hover:text-white hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-100 mb-4 text-sm">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-100 mb-4 text-sm">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2026 EVLEENE. All rights reserved.
            </p>
            {/* Subtle creator */}
<div className="mt-10 flex flex-col items-center opacity-30">
  <p className="text-xs text-gray-500 tracking-wide">
    Created & Designed by
  </p>

  <img
    src={signature}
    alt="Creator Signature"
    className="h-8 mt-1 grayscale"
  />
</div>

            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
