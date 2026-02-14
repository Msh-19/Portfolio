"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, User, Mail, MessageSquare, Loader2 } from "lucide-react";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be under 100 characters"),
    email: z.string().email("Please enter a valid email address").max(254, "Email must be under 254 characters"),
    message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message must be under 2000 characters"),
    website: z.string().max(0).optional(), // Honeypot
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.error || "Something went wrong. Please try again.");
                return;
            }

            toast.success("Message sent successfully! I'll get back to you soon.");
            reset();
        } catch {
            toast.error("Network error. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto"
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
                className="glass rounded-2xl p-8 md:p-10 space-y-6"
            >
                {/* Name field */}
                <div className="space-y-2">
                    <label
                        htmlFor="contact-name"
                        className="flex items-center gap-2 text-sm font-medium text-white/70"
                    >
                        <User className="w-4 h-4 text-primary" />
                        Name
                    </label>
                    <input
                        id="contact-name"
                        type="text"
                        placeholder="Your name"
                        maxLength={100}
                        autoComplete="name"
                        {...register("name")}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                    />
                    {errors.name && (
                        <p className="text-sm text-red-400 pl-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Email field */}
                <div className="space-y-2">
                    <label
                        htmlFor="contact-email"
                        className="flex items-center gap-2 text-sm font-medium text-white/70"
                    >
                        <Mail className="w-4 h-4 text-primary" />
                        Email
                    </label>
                    <input
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        maxLength={254}
                        autoComplete="email"
                        {...register("email")}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-400 pl-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Message field */}
                <div className="space-y-2">
                    <label
                        htmlFor="contact-message"
                        className="flex items-center gap-2 text-sm font-medium text-white/70"
                    >
                        <MessageSquare className="w-4 h-4 text-primary" />
                        Message
                    </label>
                    <textarea
                        id="contact-message"
                        placeholder="Tell me about your project..."
                        rows={5}
                        maxLength={2000}
                        {...register("message")}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300 resize-none"
                    />
                    {errors.message && (
                        <p className="text-sm text-red-400 pl-1">
                            {errors.message.message}
                        </p>
                    )}
                </div>

                {/* Honeypot field — hidden from real users, bots auto-fill it */}
                <input
                    type="text"
                    {...register("website")}
                    className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
                    tabIndex={-1}
                    aria-hidden="true"
                    autoComplete="off"
                />

                {/* Submit button */}
                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full py-4 bg-primary text-black rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-[0_0_40px_-10px_rgba(255,157,0,0.4)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Send Message
                        </>
                    )}
                </motion.button>

                <p className="text-center text-xs text-white/30">
                    Your message will be sent directly to me via Telegram
                </p>
            </form>
        </motion.div>
    );
}
