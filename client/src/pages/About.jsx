function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-6">
      <div className="max-w-3xl bg-white shadow-xl rounded-2xl p-10 text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us 🌟</h1>
        <p className="text-gray-700 text-lg">
          Welcome to our platform! We are dedicated to providing an amazing experience for users, leveraging the power of 
          **Redux** for state management to ensure smooth, efficient, and predictable app behavior.
        </p>

        {/* Features Section */}
        <div className="mt-6 text-left">
          <h2 className="text-2xl font-semibold text-gray-800">What We Offer:</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
            <li>🚀 Powerful state management with Redux</li>
            <li>🎯 Seamless user experience and performance optimization</li>
            <li>💡 Intuitive and user-friendly interface</li>
            <li>🔧 Continuous improvements and new features</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Get in Touch</h2>
          <p className="text-gray-700">
            Have questions or feedback? Reach out to us anytime!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;