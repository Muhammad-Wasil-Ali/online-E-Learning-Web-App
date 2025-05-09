import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#f0f4f8] text-[#1E1E1E] py-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[#4A90E2] mb-4">EduSpark</h2>
          <p className="text-[#6B7280] text-sm leading-6">
            Empowering education with top-notch courses and expert knowledge.
            Join us to ignite your learning journey.
          </p>
          <div className="flex gap-4 mt-4">
            <Facebook className="hover:text-[#4A90E2] cursor-pointer" />
            <Twitter className="hover:text-[#4A90E2] cursor-pointer" />
            <Instagram className="hover:text-[#4A90E2] cursor-pointer" />
            <Linkedin className="hover:text-[#4A90E2] cursor-pointer" />
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-[#6B7280]">
            <li>
              <Link to="/" className="hover:text-[#4A90E2]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-[#4A90E2]">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-[#4A90E2]">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#4A90E2]">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">
            Contact Us
          </h3>
          <ul className="space-y-4 text-[#6B7280] text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#4A90E2]" /> support@eduspark.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#4A90E2]" /> +1 234 567 890
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#4A90E2]" /> 123 Learning St,
              Knowledge City
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">
            Newsletter
          </h3>
          <p className="text-[#6B7280] text-sm mb-4">
            Subscribe to get the latest updates.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-l-md bg-white border border-[#E2E8F0] text-sm w-full focus:outline-none"
            />
            <button className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-5 rounded-r-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E2E8F0] mt-10 pt-6 text-center text-[#6B7280] text-sm">
        © {new Date().getFullYear()} EduSpark. All rights reserved.
      </div>
    </footer>
  );
}
