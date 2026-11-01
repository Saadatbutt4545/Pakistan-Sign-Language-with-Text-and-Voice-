import React from 'react';
import { FiArrowRight, FiCheck, FiFacebook, FiGithub, FiGlobe, FiInstagram, FiLinkedin, FiMail, FiStar, FiTwitter } from 'react-icons/fi';
import { HiOutlineChartBar, HiOutlineChatAlt, HiOutlineLightningBolt } from 'react-icons/hi';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="inline-block px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-medium mb-6">
                🎉 Revolutionizing Sign Language Learning
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Pakistan Sign Language with
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"> AI-Powered Recognition</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Experience real-time feedback and interactive lessons powered by cutting-edge AI technology. Learn at your own pace, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="inline-block bg-blue-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                 <a 
                 href="/recognition">
                  Start Learning Now 
                  </a>
                </button>

                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-blue-600 hover:text-blue-600 transition duration-300 flex items-center justify-center hover:-translate-y-1 hover:shadow-lg">
                 <a 
                 href="/recognition">
                  Watch Demo
                  </a>
                </button>
              </div>
              
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl p-8 relative z-10">
                <img 
                  src="https://thumbs.dreamstime.com/b/i-love-you-sign-language-image-hand-gesture-banner-59097331.jpg" 
                  alt="Sign Language Recognition Demo"
                  className="rounded-xl shadow-2xl"
                />
              </div>
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Pakistan Sign Language?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with expert-designed curriculum to make learning sign language accessible and effective.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <FiGlobe className="w-8 h-8" />,
                title: "Real-time Recognition",
                description: "Advanced AI technology provides instant feedback on your signing accuracy"
              },
              {
                icon: <HiOutlineChartBar className="w-8 h-8" />,
                title: "Progress Tracking",
                description: "Monitor your learning journey with detailed analytics and progress reports"
              },
              {
                icon: <HiOutlineChatAlt className="w-8 h-8" />,
                title: "Interactive Learning",
                description: "Engage with interactive lessons and practice exercises"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition duration-300">
                <div className="text-blue-600 mb-4 bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "0", label: "Active Users" },
              { number: "0+", label: "Sign Languages" },
              { number: "0%", label: "Success Rate" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "ABC",
                role: ".......",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAACUCAMAAABcK8BVAAAAzFBMVEX///8mpdBRUVFNTU3x8fGg0ONBQUGurq7q6upxcXEGocz///0mpc4Yos4AoM3///vI5vHU7PDy+fs0qc5CrdFGRkb79/Y6q9MAns/d7fTE4O+u2uXp8/d3wNru6u2u2eiTk5NRsdHQ0NBRSUpJz/eGxd1yvN684e6OzeBmu9nW4ua72OKByNzi6+vO3ebx8uaw0ebn+PW7u7s4ODiBgYBQRjxOQj9OS0VZPz1Qi6FK2v9RYWpPb3hQw+pJvtlRWlZNgZBMm6hHtMZOlrACED4RAAAG4klEQVR4nO2bi3KbOBSGwYaYIomLoAZqMCFeYojdtLm02aZJ292+/zutsAPmZpAtOenO8E+SyWAjPh8dcS7IgjBo0KBBgwYNGjRo0KBBgwb9LwVefv88AaI/jS2jwb5nGh+IDM/zcX70baUDwZwlaeRAVdUyIdGJLpOZCbKX3kibC/vLwEKuCqEIxRdBIoSgFYS+8EbG0wFeBSKx0h4hF6aE7i3Y/NjSEIT7yIj5RGK7xH9lNuJgMdL2U+2kqYH5mnAAr0W1w14V2yEn8F8LTMcyVOm4XuBEGeuvgualGqXFCjgt9U4/qzoINSonqwqp4clvcyA40GK51OC0XMB03OPICJttnpLNcI6YzBdBZBknAwNLuPfeTyMkLk/ib2TQpcVElsWH5WnQlkcugArcSdjMPpshsSui5mzc/Q0IN72zCS0KNmjxjvcAp273ZSGyV1eh1YuGUswXTVj3rgC0kqSp3B9c3TVPLiAYvWETwo9zZX5NkZBoXJeCb/deEIqrT/NPn93eKRWhzTNJuuwPAtC1PiufaZIlkocIvHIkYFIFTmQpFt2tzzU4rVKAbborWkr/vG8EbV6rdIZ4o2khnxnFtEGdGo0sZ8xhSoEQ0iZCB6BpIQ807NBcjNTr0FYiRP6hejsPbwPL/mtBV0vl1ZU3v7peyZFG4ZqQpCDsdkv70VB0rWw1n0vKyqYwHAwA80rw1Y4LwW3vJZYkZSdJIaVN9kL3x2Fvh+xdBAhp6gZNTD8qNVmb46rq7vc8N2Q1GrBbPz1SnUA2b7rPxTdLOd1b6EeMEwpuWmOPBmWPZokBAXux2245i7X2C5vjkrmKXy5MJRy3ZkpwxkYGkiYaggdGZxC2sakJGxqO6miWlh6YbpHPcSM22VCEmdao34ifyMHg8BFNp8lmsWWURm19wWNTVA81PqTL1tia1dHUY7NAueFv5M7GwhbXbrio0oqSLm4n+3V7IZXeixsBT0uYrFYbD8FSgaucj+/OunQ3mii7ocyG16YsZEJUmQWorndkt6P3ox6N348uiveDxmKPmNCqpRuyzCJfmNz1gW3hbgs0o+Zt0GEA04VKGgndqAgBF2MaMsI2KhzOr3dNLAY0AVTQULrKX5jeU6KN3t8XoxmpxQ9NKE+BNts59cVZfukvXx/+ruN8+br4+iVnHxdnTT/GkB9ayWokYdyhnb8sgcXo2+Oj/b02iU/Pj8/fFrnZJvlJkjKtrHgWNFBCg+KqhPZunFP8RRQ9VNAWP7KDP3O08/ykqaLMtFOgOVfzHVpO8fA7o3iuGu37c3bw16IF7aocXVhWKJnQnXNYrWjf9qE9Pj000aTrcjOMDW3nGxDK0ry44d7nt9ufP0oGyif0H3Ls36avEbSkhIZSphR8XfgGzMw2zY/f5it0Mfr1+6nqauTg0+9fOyMWAUGSjHLeprG1J8NS+wrZH4pOhbLDeHho3OIWRAXZqBgMzyq3ScaayiitKChqu4A86Q2gL7orIhVOtUqyy9hl86txD+7yyHd0bGfnxRlerR+ssmW5tdoAhUWrc3p/1g82LpEJSTX3gxFbIwsEVbRS0386uTsbd+tsPCmuDnAt71ADxs5CrQ6t9MWkyfm7Lp3flgYCSS0Bh6ydBaM6HrKqFZrUpfI4wKw1KKDI+LQK6LUqDQXHzYLu1HNcm41MaBYuqnzMKHhd78poMXPrz6yhZW3YwzYfZBV10GiFaRyePjaqDXV94AYr4AfNThbk0MxtPKyDWuQB6uYCyLY5NNuH8JKdDPjNDhtEMX1zzAzaWq7HuWwNTWh4cMYGgyUG3bYDWedvmcK2hjinDQK4tZuLNDUKErlLSRzBfU1q5p7kRiBub8cipCG1Q5uNk3vE65mo19IcYxWvZ3vJ8dt19oixFVNSI8owo/HalwUMyiei1FJjTmiCLh+9N6xdkD2C5gI2X7upbB3JsnSP8vk7pRA/NCAYPRt3DkXjRZaJ+jk3FRrX3TtCwtFu3G4eW+lrfnaDbC3muoDQ8iztWPFFI3ZLDtlg3SXo9DzmPVwh2x7THZrIfZOubkAuDsdchbYJB4duTm8V4pCA1wWw3LW9glbMHY92OD89MKBm38pBSCVJMcq2zkCR14anpvAH65BMBCFXVe3oMs4UpJFFknPknmSzuq4LOLSp9jURWyEnSpYe3hTx5Jf8YGyEa+cEzrYRADiM+n0OqlYcthco+FRfeMk+PTaCri1hxK3EwNh8qaXpVfTV/5F4gr8KbLWtpCM+b18Se73Ot21a2PRsuZpyamVrD5FFuJWGnFT2fLCp399UmfXMJanVt5Jn5s3bf82xECj93f73B8ENGjRo0KBBgwYNGjRo0KBBg06l/wCGwIuZu/zTfgAAAABJRU5ErkJggg=="
              },
              {
                name: "DEF",
                role: ".......",
                image: "data:image/png;base64,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"
              },
              {
                name: "XYZ",
                role: "......",
                image: "data:image/png;base64,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"
              }
            ].map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition duration-300">
                <div className="flex items-center mb-6">
                  <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <p className="text-gray-600 text-sm">{review.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {Array(5).fill(<FiStar className="fill-current" />)}
                </div>
                <p className="text-gray-600 leading-relaxed">
                "Real user stories and feedback will appear here after our launch. Stay tuned!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 p-12 text-white">
                <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
                <p className="text-blue-100 mb-6">
                  Get exclusive access to:
                </p>
                <ul className="space-y-4">
                  {['Weekly learning tips', 'New feature updates', 'Community events', 'Special offers'].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <FiCheck className="mr-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2 p-6 lg:p-12">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Subscribe to Our Newsletter</h3>
                  <p className="text-gray-600">Join our community and stay updated with the latest news.</p>
                </div>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center hover:-translate-y-1 hover:shadow-lg">
                    Subscribe <FiMail className="ml-2" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Sign Language Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already mastering sign language with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-lg" >            
              < a
                 href="/recognition">
                  Get Started Free 
                </a>
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                < a
                 href="/Contact">
                Schedule Demo
                </a>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;