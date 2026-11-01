import React from 'react';
import { FiAward, FiCheck, FiGlobe, FiHeart, FiTarget, FiUsers } from 'react-icons/fi';
import { HiOutlineAcademicCap, HiOutlineCube } from 'react-icons/hi';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-medium mb-6">
              About Pakistan Sign Language
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8">
              Revolutionizing Sign Language Learning Through
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"> AI Innovation</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              At Pakistan Sign Language, we're dedicated to breaking down communication barriers and making sign language learning accessible to everyone through cutting-edge AI technology and intuitive learning experiences. We believe that accessibility is a right, not a privilege. That’s why our system is designed with intuitive interfaces, high-accuracy gesture detection, and voice synthesis to support seamless interaction across mobile and web platforms. Whether you're a hearing-impaired user, a teacher, a family member, or a developer, Pakistan Sign Language is here to empower communication through technology.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-12 rounded-3xl text-white hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ">
                <FiTarget className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-blue-100 leading-relaxed">
                To empower individuals worldwide with the ability to learn and communicate through sign language, leveraging advanced AI technology to create an inclusive and accessible learning environment.
              </p>
            </div>
            <div className="bg-gray-50 p-12 rounded-3xl hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ">
                <FiHeart className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To create a world where sign language is universally recognized and learned, breaking down communication barriers and fostering inclusive communities through innovative technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide our mission and shape our commitment to excellence in sign language education.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <HiOutlineAcademicCap className="w-8 h-8" />,
                title: "Educational Excellence",
                description: "Committed to providing the highest quality sign language education through innovative teaching methods."
              },
              {
                icon: <FiUsers className="w-8 h-8" />,
                title: "Inclusive Community",
                description: "Building a supportive and diverse community where everyone can learn and grow together."
              },
              {
                icon: <HiOutlineCube className="w-8 h-8" />,
                title: "Technological Innovation",
                description: "Continuously advancing our AI technology to enhance the learning experience."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300">
                <div className="text-blue-600 mb-6 bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 ">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 ">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to revolutionizing sign language education.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 ">
            {[
              {
                name: "Saadat Ali",
                role: "Student",
                image: "data:image/png;base64,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",
                bio: "Bachelor in Computer Science with a passion for AI and accessibility."
              },
              {
                name: "Muhammad Abdullah",
                role: "Student",
                image: "data:image/png;base64,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",
                bio: "Bachelor in Computer Science with a passion for AI and accessibility."
              },
              {
                name: "Ayesha Daud",
                role: "Student",
                image: "data:image/png;base64,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",
                bio: "Bachelor in Computer Science with a passion for AI and accessibility."
              }
            ].map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Milestones that mark our journey in transforming sign language education.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiUsers className="w-6 h-6" />,
                number: "0+",
                label: "Active Learners"
              },
              {
                icon: <FiGlobe className="w-6 h-6" />,
                number: "0+",
                label: "Countries Reached"
              },
              {
                icon: <FiAward className="w-6 h-6" />,
                number: "0+",
                label: "Industry Awards"
              },
              {
                icon: <FiCheck className="w-6 h-6" />,
                number: "0%",
                label: "Success Rate"
              }
            ].map((achievement, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
                <div className="text-white mb-4 flex justify-center">{achievement.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">{achievement.number}</div>
                <div className="text-blue-100">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Technology</h2>
              <p className="text-xl text-gray-600">
                Powered by cutting-edge AI and machine learning algorithms to provide accurate, real-time sign language recognition.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Real-time Recognition",
                  description: "Advanced computer vision algorithms for instant sign language detection and feedback."
                },
                {
                  title: "Adaptive Learning",
                  description: "Personalized learning paths that adjust to each user's progress and needs."
                },
                {
                  title: "Multi-language Support",
                  description: "Support for multiple sign language variants and regional differences."
                },
                {
                  title: "Performance Analytics",
                  description: "Detailed progress tracking and performance metrics for learners."
                }
              ].map((tech, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{tech.title}</h3>
                  <p className="text-gray-600">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;