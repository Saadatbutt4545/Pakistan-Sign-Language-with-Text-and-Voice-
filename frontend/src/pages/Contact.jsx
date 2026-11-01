import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FiMail, FiMapPin, FiPhone, FiClock, FiSend } from 'react-icons/fi';

function Contact() {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_qmzly1s',     // Replace with your EmailJS Service ID
      'template_qfr7vks',    // Replace with your Template ID
      form.current,
      'MHJEG51ojjFnqrew7'      // Replace with your Public Key   // 🔹 Replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          alert('✅ Message sent successfully!');
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          alert('❌ Failed to send message. Please try again.');
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-medium mb-6">
              Get in Touch
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-8">
              We'd Love to
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"> Hear From You</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              At Pakistan Sign Language, we’re committed to building a bridge between the deaf community and the world through innovative sign language recognition. 
              If you have any questions, suggestions, or need support, feel free to reach out. 
              We value your feedback and are always here to help improve accessibility and communication.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white h-full hover:-translate-y-1 hover:shadow-lg transition">
                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <FiMail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-blue-100">saadatbutt786@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <FiPhone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-blue-100">+923221497552</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <FiMapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-blue-100">123 Street<br />Lahore, Pakistan</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <FiClock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-blue-100">Monday - Friday<br />9:00 AM - 6:00 PM PST</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows="6"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                      placeholder="Your message..."
                      required>
                    </textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:opacity-90 transition duration-300 flex items-center justify-center space-x-2 hover:-translate-y-1 hover:shadow-lg">
                    <span>Send Message</span>
                    <FiSend className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 ">
                Find quick answers to common questions about Pakistan Sign Language.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  question: "How does the AI recognition system work?",
                  answer: "Our AI system uses advanced computer vision to analyze hand movements and gestures in real-time, providing instant feedback on sign language accuracy."
                },
                {
                  question: "What sign languages are supported?",
                  answer: "We currently support Pakistan Sign Language, and in future we use several other major sign languages, with more being added regularly."
                },
                {
                  question: "Do I need special equipment to use Pakistan Sign Language?",
                  answer: "No, you only need a device with a camera (smartphone, tablet, or computer) to use Pakistan Sign Language recognition features."
                },
                {
                  question: "Is this system free or paid?",
                  answer: "Yes, This is completely free system with full access to all features, allowing you to experience the platform before committing."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
