import { SignIn } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  
  useEffect(() => {
    
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white pt-20 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Side */}
          <div 
            className={`space-y-6 transition-all duration-1000 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="inline-block px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-medium mb-4">
              🎉 Welcome Back!
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Pakistan Sign Language with
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"> AI-Powered Recognition</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Experience real-time feedback and interactive lessons powered by cutting-edge AI technology. Learn at your own pace, anywhere, anytime.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Real-time Recognition</h3>
                  <p className="text-gray-600 text-sm">Get instant feedback on your signing accuracy</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Interactive Learning</h3>
                  <p className="text-gray-600 text-sm">Engage with interactive lessons and exercises</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Progress Tracking</h3>
                  <p className="text-gray-600 text-sm">Monitor your learning journey with detailed analytics</p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>

          {/* Sign-In Form - Right Side */}
          <div 
            className={`flex justify-center transition-all duration-1000 delay-300 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In to Continue</h2>
                  <p className="text-gray-600">Access all features and start your learning journey</p>
                </div>
                <SignIn 
                  appearance={{
                    elements: {
                      rootBox: "mx-auto w-full",
                      card: "shadow-none border-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

