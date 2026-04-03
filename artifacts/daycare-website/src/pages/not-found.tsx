import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg space-y-8"
      >
        <div className="relative inline-block">
          <div className="text-[10rem] font-serif font-bold text-primary/10 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-brand-yellow rounded-3xl flex items-center justify-center rotate-6 shadow-lg">
              <Star className="w-12 h-12 text-primary fill-primary" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            It looks like this little star has wandered off the path. Let's get you back to where the fun is.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="rounded-full shadow-md">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/contact">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Contact Us
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
