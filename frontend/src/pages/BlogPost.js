import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2, Home } from 'lucide-react';
import toast from 'react-hot-toast';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blogPosts = {
    1: {
      title: "5 Tips to Ace Your Internship Interview",
      author: "Sarah Johnson",
      date: "February 1, 2026",
      category: "Career Tips",
      image: "bg-gradient-to-br from-blue-400 to-blue-600",
      content: `
        <p>Preparing for an internship interview can be daunting, but with the right approach and mindset, you can impress your potential employer. Here are five essential tips to help you ace your internship interview.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">1. Research the Company Thoroughly</h3>
        <p>Before your interview, take time to research the company. Understand their mission, values, recent projects, and the team you'll be working with. This shows genuine interest and helps you ask informed questions during the interview.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">2. Practice Common Interview Questions</h3>
        <p>Prepare answers for common questions like "Tell me about yourself," "Why are you interested in this internship?" and "What are your strengths and weaknesses?" Practice out loud to build confidence and ensure your responses are clear and concise.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">3. Prepare Specific Examples</h3>
        <p>Use the STAR method (Situation, Task, Action, Result) to prepare specific examples of your achievements. Have 3-5 stories ready that demonstrate your skills and how you've overcome challenges.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">4. Dress Appropriately and Arrive Early</h3>
        <p>First impressions matter. Dress professionally according to the company culture, and aim to arrive 10-15 minutes early. This shows respect for the interviewer's time and helps you settle in before the interview begins.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">5. Follow Up After the Interview</h3>
        <p>Send a thank-you email within 24 hours of your interview. Reference specific points from your conversation and reiterate your interest in the position. This leaves a positive lasting impression.</p>
        
        <p className="mt-6">Remember, interviewers want to learn about you as much as you want to learn about the company. Be authentic, enthusiastic, and ready to discuss how your skills and interests align with the internship role. Good luck!</p>
      `
    },
    2: {
      title: "German Work Culture: What International Students Should Know",
      author: "Michael Weber",
      date: "January 28, 2026",
      category: "Culture",
      image: "bg-gradient-to-br from-red-400 to-red-600",
      content: `
        <p>Interning in Germany? Understanding German work culture is key to making a great impression. Here's what you need to know about working in this professional environment.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Punctuality is Non-Negotiable</h3>
        <p>Germans take punctuality seriously. Arriving on time or slightly early is expected. Being late is considered disrespectful, so always plan to arrive with some buffer time.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Direct Communication</h3>
        <p>German communication style is direct and straightforward. This isn't seen as rude but rather as efficient and honest. Don't take criticism personally; it's meant to be constructive feedback.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Work-Life Balance is Respected</h3>
        <p>Germans value their personal time. After work hours, emails and work-related messages are often not expected until the next business day. Respect these boundaries and don't feel pressured to work beyond your hours.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Formal Titles and Hierarchy</h3>
        <p>Use formal titles (Herr, Frau) until invited to use first names. Germans respect hierarchy and clearly defined roles. Understanding this structure helps you navigate workplace dynamics smoothly.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Quality and Attention to Detail</h3>
        <p>German companies pride themselves on quality and precision. Pay attention to details in your work, as this is highly valued in German corporate culture.</p>
      `
    },
    3: {
      title: "Building Your Portfolio: A Student's Guide",
      author: "Emma Schmidt",
      date: "January 25, 2026",
      category: "Professional Development",
      image: "bg-gradient-to-br from-purple-400 to-purple-600",
      content: `
        <p>Your portfolio is your chance to showcase your skills and work to potential employers. Here's a comprehensive guide to building a portfolio that stands out.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Choose Quality Over Quantity</h3>
        <p>Include 5-10 of your best projects or pieces of work. It's better to showcase fewer high-quality items than to overwhelm with mediocre content. Each piece should demonstrate a key skill or achievement.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Tell the Story Behind Each Project</h3>
        <p>For each item in your portfolio, explain the context, your role, the challenges you faced, and the results. Use the STAR method to make your descriptions compelling and results-oriented.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Make It Visually Appealing</h3>
        <p>Whether digital or physical, your portfolio should be well-organized and visually appealing. Use consistent formatting, high-quality images, and clear typography to make a professional impression.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Include Diverse Work</h3>
        <p>Show the breadth of your skills. Include different types of projects that demonstrate versatility and adaptability. This shows employers that you can handle various challenges.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Keep It Updated</h3>
        <p>Regularly update your portfolio with new projects and achievements. Remove outdated work and replace it with more recent and relevant pieces to keep your portfolio fresh and current.</p>
      `
    },
    4: {
      title: "Networking Tips for Internship Success",
      author: "David Mueller",
      date: "January 20, 2026",
      category: "Networking",
      image: "bg-gradient-to-br from-green-400 to-green-600",
      content: `
        <p>Networking during your internship can open doors to future opportunities. Here are practical tips to help you build meaningful professional relationships.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Be Genuinely Interested</h3>
        <p>When networking, focus on building genuine relationships rather than just collecting contacts. Ask people about their work, their journey, and their interests. People appreciate authentic interest.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Attend Industry Events</h3>
        <p>Make an effort to attend industry conferences, meetups, and seminars. These events are great opportunities to meet professionals in your field and stay updated on industry trends.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Use Social Media Professionally</h3>
        <p>Maintain a professional LinkedIn profile and engage with industry content. Connect with people you meet at events and in your workplace. Social media is a powerful networking tool when used professionally.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Follow Up Consistently</h3>
        <p>After meeting someone, follow up with a message or email. Reference something specific from your conversation. Consistent follow-up helps turn initial connections into lasting professional relationships.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Offer Value</h3>
        <p>Networking isn't one-sided. Look for ways to help others, share useful information, or make introductions. Building a network is about mutual benefit and support.</p>
      `
    },
    5: {
      title: "Remote Internships: Maximize Your Remote Work Experience",
      author: "Lisa Wagner",
      date: "January 15, 2026",
      category: "Remote Work",
      image: "bg-gradient-to-br from-indigo-400 to-indigo-600",
      content: `
        <p>Remote internships offer flexibility and unique opportunities. Here's how to make the most of your remote internship experience.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Create a Dedicated Workspace</h3>
        <p>Set up a quiet, professional workspace for your internship. This helps you maintain focus and signals that you take your work seriously. A dedicated space also helps with work-life balance.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Maintain Regular Communication</h3>
        <p>In a remote setting, communication is crucial. Be proactive in updating your manager, ask clarifying questions when needed, and participate actively in virtual meetings.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Stick to a Schedule</h3>
        <p>Establish a routine and stick to your work hours. Starting and ending your day at consistent times helps you stay productive and sets clear boundaries between work and personal time.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Leverage Video Calls</h3>
        <p>Whenever possible, use video during meetings and one-on-ones. Face-to-face interaction (even virtual) helps build stronger relationships with your team and manager.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Stay Connected with Your Team</h3>
        <p>Participate in virtual team activities and informal chats. Remote work can feel isolating, so make an effort to connect with your colleagues beyond work tasks.</p>
      `
    },
    6: {
      title: "Tech Skills Every Intern Should Learn in 2026",
      author: "Alex Bauer",
      date: "January 10, 2026",
      category: "Technology",
      image: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      content: `
        <p>The tech landscape is constantly evolving. Here are the essential tech skills that will make you stand out as an intern in 2026.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">AI and Machine Learning Basics</h3>
        <p>Understanding AI and ML is becoming increasingly important. You don't need to be an expert, but familiarity with concepts and tools like ChatGPT, Python libraries, and basic ML workflows is valuable.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Cloud Technologies</h3>
        <p>Knowledge of cloud platforms like AWS, Google Cloud, or Azure is in high demand. Learn basic cloud concepts, deployment, and management to stay competitive.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Data Analysis and Visualization</h3>
        <p>Skills in tools like Excel, Tableau, or Power BI are valuable across industries. Being able to analyze data and present insights visually is a highly sought-after skill.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Version Control (Git)</h3>
        <p>Git is essential for any tech role. Learn Git basics, collaboration workflows, and GitHub to work effectively with development teams.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Cybersecurity Awareness</h3>
        <p>Understanding cybersecurity basics, data protection, and secure coding practices is crucial in today's environment. This knowledge is relevant across all technical roles.</p>
      `
    }
  };

  const post = blogPosts[id];

  const handleShare = () => {
    toast.success('Link copied to clipboard!');
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/blog')}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Blog
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/blog')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className={`h-96 ${post.image} mb-8`} />

        {/* Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <User className="w-4 h-4" />
              {post.author}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
            {post.title}
          </h1>

          {/* Share Button */}
          <div className="flex gap-3 mb-8 pb-8 border-b border-gray-200">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {post.content}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to find your next internship?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of students already finding their dream internships on EVLEENE.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
