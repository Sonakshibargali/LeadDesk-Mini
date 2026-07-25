import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';
import { submitLead } from '../services/api.js';

function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Budget Tier Options
  const budgetOptions = ['<₹50k', '₹50k-₹2L', '₹2L-₹5L', '₹5L+'];

  const validateForm = () => {
    const tempErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      tempErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      tempErrors.email = 'Please enter a valid email address';
    }

    // Budget validation
    if (!formData.budget) {
      tempErrors.budget = 'Please select a budget range';
    }

    // Message validation
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error for field when typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please correct the validation errors in the form.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitLead(formData);
      if (result.success) {
        toast.success('Your message has been received! Our team will contact you shortly.');
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          budget: '',
          message: ''
        });
        setErrors({});
      }
    } catch (error) {
      console.error('Submission Error:', error);
      const serverErrors = error.response?.data?.errors;
      
      if (serverErrors && Array.isArray(serverErrors)) {
        // Map express-validator errors to fields
        const mappedErrors = {};
        serverErrors.forEach((err) => {
          if (err.field) {
            mappedErrors[err.field] = err.message;
          }
        });
        setErrors(mappedErrors);
        toast.error('Validation failed on server. Please check your entries.');
      } else {
        toast.error(error.response?.data?.message || 'Server connection failed. Try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-slow"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs font-semibold tracking-wider text-brand-blue uppercase mb-3">Get in Touch</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Discuss Your <span className="text-gradient">Project Goals</span>
          </p>
        </div>

        {/* Success Screen */}
        {isSubmitted ? (
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-dark-800 text-center space-y-6 bg-dark-900/30">
            <div className="mx-auto w-16 h-16 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-brand-purple" />
            </div>
            <h3 className="text-2xl font-bold text-white">Lead Submitted Successfully!</h3>
            <p className="text-dark-300 max-w-md mx-auto">
              Thank you for reaching out. We have logged your request and our digital agents will contact you within one business day.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2.5 rounded-full bg-dark-800 hover:bg-dark-700 text-white font-medium border border-dark-700 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          /* Form Screen */
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-dark-800 bg-dark-900/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-dark-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl glass-input transition-all ${
                    errors.name ? 'border-red-500/50 focus:border-red-500' : ''
                  }`}
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-dark-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl glass-input transition-all ${
                    errors.email ? 'border-red-500/50 focus:border-red-500' : ''
                  }`}
                  placeholder="john@agency.co"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Budget Range Selection */}
              <div>
                <label htmlFor="budget" className="block text-sm font-semibold text-dark-300 mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl glass-input transition-all cursor-pointer ${
                    errors.budget ? 'border-red-500/50 focus:border-red-500' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  <option value="" disabled className="bg-dark-950 text-dark-400">Select budget range...</option>
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-dark-950 text-white">
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.budget && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.budget}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-dark-300 mb-2">
                  Message / Requirements
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full px-4 py-3 rounded-xl glass-input transition-all resize-none ${
                    errors.message ? 'border-red-500/50 focus:border-red-500' : ''
                  }`}
                  placeholder="Tell us about your agency goals, timeline, and current lead flow..."
                  disabled={isSubmitting}
                ></textarea>
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white font-semibold transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-brand-blue/15"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting Lead...
                  </>
                ) : (
                  <>
                    Send Request
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default LeadForm;
