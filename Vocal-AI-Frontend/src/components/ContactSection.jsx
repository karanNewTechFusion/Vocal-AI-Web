export default function ContactSection() {
  return (
    <section className="py-24 px-4 md:px-16 flex flex-col items-center" id="contact">
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">Contact Us</h2>
      <form className="glass p-8 rounded-xl w-full max-w-lg flex flex-col gap-4">
        <input type="text" placeholder="Name" className="p-3 rounded-lg bg-dark/60 border border-gray-700 text-white focus:outline-none focus:border-accent-pink" />
        <input type="email" placeholder="Email" className="p-3 rounded-lg bg-dark/60 border border-gray-700 text-white focus:outline-none focus:border-accent-pink" />
        <textarea placeholder="Message" rows={4} className="p-3 rounded-lg bg-dark/60 border border-gray-700 text-white focus:outline-none focus:border-accent-pink" />
        <button type="submit" className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink neon text-white font-bold text-lg shadow-lg hover:scale-105 transition">Send Message</button>
      </form>
      
    </section>
  );
} 