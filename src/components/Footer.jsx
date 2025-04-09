import { Link } from "react-router-dom";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background border-secondary-brand">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 font-script-bold text-lg text-secondary-brand">
              Legal & Service
            </h3>
            <div className="flex flex-col space-y-2">
              <Link
                to="#"
                className="font-script text-secondary-brand hover:opacity-70 transition-transform"
              >
                Terms & Conditions
              </Link>
              <Link
                to="#"
                className="font-script text-secondary-brand hover:opacity-70 transition-transform"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="font-script text-secondary-brand hover:opacity-70 transition-transform"
              >
                Cookie Policy
              </Link>
              <Link
                to="#"
                className="font-script text-secondary-brand hover:opacity-70 transition-transform"
              >
                Support / Help Center
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-script-bold text-lg text-secondary-brand">
              Navigation
            </h3>
            <div className="flex flex-col space-y-2">
              <Link
                to="#"
                className="font-script text-secondary-brand hover:opacity-70 transition-transform"
              >
                About Quill Hive
              </Link>
              <Link
                to="#"
                className="font-script text-secondary-brand hover:opacity-70 transition-transform"
              >
                Contact Us
              </Link>
              <Link
                to="#"
                className="font-script text-secondary-brand hover:opacity-70 transition-transform"
              >
                Blog / News
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-script-bold text-lg text-secondary-brand">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 border-secondary-brand">
          <div className="flex flex-col items-center justify-between md:flex-row font-script text-secondary-brand">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-sm text-se">© Quill Hive – 2025</p>
              <p className="mt-2 text-sm italic font-script text-secondary-brand">
                "Bee Creative. Build stories together."
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
