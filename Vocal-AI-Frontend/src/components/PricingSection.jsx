import { useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const monthlyTiers = [
    {
      name: "Free",
      price: "$0",
      features: [
        "3 recordings/day",
        "Basic pitch analysis",
        "Limited feedback",
        "1 report/month",
        "No practice section access",
        "No video post feature"
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "$12/mo",
      features: [
        "20 recordings/month",
        "Full vocal analysis",
        "Unlimited feedback",
        "Exportable reports",
        "Practice section access",
        "10 video posts/month"
      ],
      highlight: true,
    },
    {
      name: "Premium",
      price: "$29/mo",
      features: [
        "Unlimited recordings",
        "Full vocal analysis",
        "Unlimited feedback",
        "Exportable reports",
        "Advanced practice section access",
        "60 video posts/month"
      ],
      highlight: false,
    },
  ];
  
  const yearlyTiers = [
    {
      name: "Free",
      price: "$0",
      features: [
        "3 recordings/day",
        "Basic pitch analysis",
        "Limited feedback",
        "No report",
        "No practice section access",
        "No video post feature"
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "$110/yr",
      features: [
        "15 recordings/dau",
        "Full vocal analysis",
        "Unlimited feedback",
        "Exportable reports",
        "Practice section access",
        "10 video posts/month"
      ],
      highlight: true,
    },
    {
      name: "Premium",
      price: "$250/yr",
      features: [
        "Unlimited recordings",
        "Full vocal analysis",
        "Unlimited feedback",
        "Exportable reports",
        "Advanced practice section access",
        "60 video posts/month"
      ],
      highlight: false,
    },
  ];
  const comparison = [
    { feature: "Recordings Limit", free: "3/day", pro: "15/day", premium: "Unlimited" },
    { feature: "Pitch Analysis", free: "Basic", pro: "Full", premium: "Full" },
    { feature: "Feedback", free: "Limited", pro: "Unlimited", premium: "Unlimited" },
    { feature: "Reports", free: "No", pro: "Exportable", premium: "Exportable" },
    { feature: "Practice Access", free: "No", pro: "Yes", premium: "Advanced" },
    { feature: "Video Posts", free: "No", pro: "10/mo", premium: "60/mo" },
  ];

function renderCell(val) {
  if (val === 'Yes') return <CheckCircleIcon className="w-6 h-6 text-accent-blue mx-auto" />;
  if (val === 'No') return <XCircleIcon className="w-6 h-6 text-accent-pink mx-auto" />;
  if (val === 'Unlimited') return <span className="font-bold text-accent-purple">∞</span>;
  return <span>{val}</span>;
}

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const tiers = isYearly ? yearlyTiers : monthlyTiers;

  return (
   
<section className="py-8 px-2 sm:px-4 md:px-16" id="pricing">

      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">Pricing</h2>
      <div className="flex justify-center mb-12">
        <div className="flex items-center bg-dark/70 glass rounded-full p-2 gap-2">
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 text-sm md:text-base ${!isYearly ? 'bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white shadow-md scale-105' : 'text-gray-300 hover:text-white'}`}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 text-sm md:text-base ${isYearly ? 'bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white shadow-md scale-105' : 'text-gray-300 hover:text-white'}`}
            onClick={() => setIsYearly(true)}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 justify-center mb-12">
        {tiers.map((tier, i) => (
          <div key={tier.name} className={`glass p-8 rounded-2xl flex-1 min-w-[260px] max-w-xs mx-auto text-center border-2 ${tier.highlight ? 'border-accent-pink neon scale-105' : 'border-transparent'} transition-all duration-300 shadow-xl hover:scale-105`}> 
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">{tier.name}</h3>
            <div className="text-4xl font-extrabold mb-4 transition-all duration-300">
              {tier.price}
            </div>
            <ul className="mb-6 text-gray-300 text-sm space-y-1">
              {tier.features.map(f => <li key={f}>• {f}</li>)}
            </ul>
            <a href="#trial" className={`px-6 py-2 rounded-xl font-semibold ${tier.highlight ? 'bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink neon text-white' : 'border-2 border-accent-pink text-accent-pink hover:bg-accent-pink/10'} transition`}>Choose {tier.name}</a>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full glass rounded-2xl text-left shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white">
              <th className="p-4 rounded-tl-2xl">Feature</th>
              <th className="p-4">Free</th>
              <th className="p-4 bg-accent-pink/20">Pro</th>
              <th className="p-4 rounded-tr-2xl">Premium</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row, i) => (
              <tr key={row.feature} className="border-t border-gray-700 text-gray-300 hover:bg-dark/40 transition">
                <td className="p-4 font-medium text-white">{row.feature}</td>
                <td className="p-4 text-center">{renderCell(row.free)}</td>
                <td className="p-4 text-center bg-accent-pink/10 font-semibold">{renderCell(row.pro)}</td>
                <td className="p-4 text-center">{renderCell(row.premium)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
} 