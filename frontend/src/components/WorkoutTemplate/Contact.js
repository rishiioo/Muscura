import React from 'react';

const Contact = () => {
  return (
    <section id="contact-section" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First name" className="p-3 border rounded w-full" />
            <input type="text" placeholder="Last name" className="p-3 border rounded w-full" />
          </div>
          <input type="text" placeholder="Subject" className="p-3 border rounded w-full" />
          <input type="email" placeholder="Email" className="p-3 border rounded w-full" />
          <textarea placeholder="Message" className="p-3 border rounded w-full" rows="5"></textarea>
          <button className="w-full bg-primary-600 text-white p-3 rounded">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
