import { useState } from 'react';

const faqs = [
  {
    question: 'What is VocalAI and how does it work?',
    answer:
      'VocalAI is an AI-powered music coach that analyzes your singing in real time, providing instant feedback on pitch, articulation, and style. It uses advanced algorithms to help you improve your vocal skills and track your progress.',
  },
  {
    question: 'Is VocalAI suitable for beginners?',
    answer:
      'Absolutely! VocalAI is designed for all skill levels. Beginners get step-by-step guidance, while advanced users benefit from detailed analytics and personalized recommendations.',
  },
  {
    question: 'What kind of feedback does the AI provide?',
    answer:
      'The AI provides feedback on pitch accuracy, vocal range, articulation, timing, and overall performance. You also receive practice tips and a vocal score after each session.',
  },
  {
    question: 'Can I use VocalAI on my phone?',
    answer:
      'Yes, VocalAI is fully responsive and works on both desktop and mobile devices. You can practice and get feedback anywhere, anytime.',
  },
  {
    question: 'How does the free trial work?',
    answer:
      'The free trial gives you access to core features like real-time analysis and basic reports. Upgrade to Pro or Premium for unlimited feedback, exportable reports, and advanced tools.',
  },
  {
    question: 'Is my data and voice recording safe?',
    answer:
      'Yes, your privacy is our priority. All recordings and data are securely stored and never shared without your consent.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-8 px-4 md:px-16 max-w-3xl mx-auto" id="faq">
      <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="glass rounded-2xl shadow-lg">
            <button
              className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span className="text-lg font-semibold bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
                {faq.question}
              </span>
              <svg
                className={`w-6 h-6 text-accent-pink transform transition-transform duration-300 ${openIndex === idx ? 'rotate-45' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-40 py-2 px-6' : 'max-h-0 py-0 px-6'}`}
            >
              <p className="text-gray-300 text-base">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 