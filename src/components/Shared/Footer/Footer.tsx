import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter section */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Subscribe to our newsletter</h3>
              <p>Get the latest updates on new products and upcoming sales</p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-700 border-gray-600 text-white min-w-[250px]"
              />
              <Button className="bg-red-600 hover:bg-red-700">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-red-600 text-white p-1 rounded mr-1">
                <span className="font-bold">Ten</span>
              </div>
              <span className="font-semibold text-white">Rus</span>
            </div>
            <p className="mb-6">
              TenRus offers premium quality products with fast shipping and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Youtube size={18} />} />
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-3">
              <FooterLink href="/new-arrivals">New Arrivals</FooterLink>
              <FooterLink href="/bestsellers">Bestsellers</FooterLink>
              <FooterLink href="/sale">Sale</FooterLink>
              <FooterLink href="/clothing">Clothing</FooterLink>
              <FooterLink href="/accessories">Accessories</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/faq">FAQs</FooterLink>
              <FooterLink href="/shipping">Shipping & Delivery</FooterLink>
              <FooterLink href="/returns">Returns & Exchanges</FooterLink>
              <FooterLink href="/terms">Terms & Conditions</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-red-500 flex-shrink-0 mt-0.5" />
                <span>123 Fashion Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-red-500 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-red-500 flex-shrink-0" />
                <span>support@tenrus.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} TenRus. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  )
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a
      href="#"
      className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-600 transition-colors"
    >
      {icon}
    </a>
  )
}