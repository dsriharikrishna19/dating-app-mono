import { Flame, Twitter, Instagram, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-border bg-surface-light py-12 mt-20">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <a href="#" className="flex items-center gap-2 text-2xl font-bold tracking-tight mb-4">
                        <Flame className="w-6 h-6 text-primary" />
                        <span>Aura</span>
                    </a>
                    <p className="text-text-muted text-sm mb-6 max-w-sm">
                        Redefining modern dating through authentic connections and stunning design.
                    </p>
                    <div className="flex items-center gap-4 text-text-muted">
                        <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Product</h4>
                    <ul className="space-y-2 text-sm text-text-muted">
                        <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Premium</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-text-muted">
                        <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-text-muted">
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>

            <div className="container mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-sm text-text-muted">
                <p>&copy; {new Date().getFullYear()} Aura Technologies Inc. All rights reserved.</p>
                <p className="mt-2 md:mt-0 flex items-center gap-1">
                    Designed with <Flame className="w-4 h-4 text-primary" /> for better connections.
                </p>
            </div>
        </footer>
    );
}
