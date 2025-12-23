import React, { useState } from 'react';
import { Mail } from 'lucide-react';

// --- Directly declare the env variable for TypeScript ---
declare const importMetaEnv: {
    VITE_API_URL: string;
};

const getEnv = () => {
    return (import.meta as any).env as typeof importMetaEnv;
};

export const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return setStatus("Email cannot be empty.");

        try {
            const res = await fetch(`${getEnv().VITE_API_URL}/blog/newsletter.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            setStatus(data.message);

            if (data.status === 'success') {
                setEmail('');
                setShowModal(true); // Show success modal
            }
        } catch (err) {
            console.error(err);
            setStatus("Failed to subscribe. Please try again.");
        }
    };

    return (
        <section className="py-20 bg-slate-950">
            <div className="container mx-auto px-6">
                <div className="glass-panel p-10 md:p-16 rounded-3xl border border-primary-500/20 text-center relative overflow-hidden max-w-4xl mx-auto">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10">
                        <Mail className="w-12 h-12 text-primary-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with AI & Career Insights</h2>
                        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                            Join 5,000+ students and professionals getting weekly tips on AI tools, job market trends, and coding best practices.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-slate-950 border border-slate-700 rounded-full px-6 py-3 text-white focus:border-primary-500 focus:outline-none placeholder:text-slate-600 transition-all focus:scale-[1.02]"
                            />
                            <button className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-primary-500/25">
                                Subscribe
                            </button>
                        </form>

                        {status && !showModal && (
                            <p className="mt-4 text-sm text-white">{status}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center relative">
                        <h3 className="text-2xl font-bold text-green-600 mb-4">Success!</h3>
                        <p className="text-gray-700 mb-6">{status}</p>
                        <button
                            className="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-500 transition"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Newsletter;
