import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import { Calendar, User, ArrowRight, Home } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Blog = () => {
  const navigate = useNavigate();
  const [displayedPosts, setDisplayedPosts] = useState(6);
  const [email, setEmail] = useState('');

  const allBlogPosts = [
    {
      id: 1,
      title: "5 Tips to Ace Your Internship Interview",
      author: "Sarah Johnson",
      date: "February 1, 2026",
      category: "Career Tips",
      excerpt: "Learn the essential techniques to impress your potential employer during your internship interview. From preparation to follow-up, we cover everything you need to know.",
      image: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      id: 2,
      title: "German Work Culture: What International Students Should Know",
      author: "Michael Weber",
      date: "January 28, 2026",
      category: "Culture",
      excerpt: "Discover the key aspects of German work culture, communication styles, and professional expectations. A comprehensive guide for international interns.",
      image: "bg-gradient-to-br from-red-400 to-red-600"
    },
    {
      id: 3,
      title: "Building Your Portfolio: A Student's Guide",
      author: "Emma Schmidt",
      date: "January 25, 2026",
      category: "Professional Development",
      excerpt: "Create an impressive portfolio that showcases your skills and projects. Learn what employers look for and how to present your best work.",
      image: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
      id: 4,
      title: "Networking Tips for Internship Success",
      author: "David Mueller",
      date: "January 20, 2026",
      category: "Networking",
      excerpt: "Master the art of professional networking during your internship. Build meaningful connections that can lead to future opportunities.",
      image: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      id: 5,
      title: "Remote Internships: Maximize Your Remote Work Experience",
      author: "Lisa Wagner",
      date: "January 15, 2026",
      category: "Remote Work",
      excerpt: "Thrive in a remote internship environment. Tips for staying productive, building relationships, and making the most of virtual opportunities.",
      image: "bg-gradient-to-br from-indigo-400 to-indigo-600"
    },
    {
      id: 6,
      title: "Tech Skills Every Intern Should Learn in 2026",
      author: "Alex Bauer",
      date: "January 10, 2026",
      category: "Technology",
      excerpt: "Stay ahead of the curve by learning the most in-demand tech skills. A roadmap for technical interns in the modern workplace.",
      image: "bg-gradient-to-br from-yellow-400 to-yellow-600"
    },
    {
      id: 7,
      title: "Salary Negotiation Tips for Interns",
      author: "Jessica Wolf",
      date: "January 5, 2026",
      category: "Career Tips",
      excerpt: "Learn how to negotiate your internship stipend fairly. Understanding your worth and market rates.",
      image: "bg-gradient-to-br from-pink-400 to-pink-600"
    },
    {
      id: 8,
      title: "Making Friends at Your Internship",
      author: "Thomas Richter",
      date: "December 30, 2025",
      category: "Culture",
      excerpt: "Build lasting relationships with your colleagues. Tips for socializing and networking in the workplace.",
      image: "bg-gradient-to-br from-cyan-400 to-cyan-600"
    },
    {
      id: 9,
      title: "Time Management for Busy Interns",
      author: "Maria Fischer",
      date: "December 25, 2025",
      category: "Professional Development",
      excerpt: "Juggle multiple tasks efficiently. Learn productivity hacks used by successful interns.",
      image: "bg-gradient-to-br from-orange-400 to-orange-600"
    },
  ];

  const categories = ["All", "Career Tips", "Culture", "Professional Development", "Networking", "Remote Work", "Technology"];

  const handleReadMore = (postId) => {
    navigate(`/blog/${postId}`);
  };

  const handleLoadMore = () => {
    setDisplayedPosts(displayedPosts + 3);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success(`Subscribed with ${email}!`);
      setEmail('');
    } else {
      toast.error('Please enter a valid email address');
    }
  };

  const blogPosts = allBlogPosts.slice(0, displayedPosts);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Back to Home Button */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">EVLEENE Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Insights, tips, and stories to help you succeed in your internship journey. From career advice to cultural tips, we've got you covered.
          </p>
        </section>

        {/* Categories */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  category === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* Featured Image */}
                <div className={`h-40 ${post.image}`} />

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-gray-700">
                    <User className="w-3.5 h-3.5" />
                    <span className="text-xs">{post.author}</span>
                  </div>

                  {/* Read More */}
                  <button 
                    onClick={() => handleReadMore(post.id)}
                    className="mt-4 w-full py-2 text-blue-600 font-semibold hover:text-blue-700 flex items-center justify-center gap-2 transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Load More */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          {displayedPosts < allBlogPosts.length && (
            <button 
              onClick={handleLoadMore}
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Load More Posts
            </button>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-blue-100 text-lg mb-6">
              Subscribe to our newsletter to get the latest career tips and internship opportunities delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
