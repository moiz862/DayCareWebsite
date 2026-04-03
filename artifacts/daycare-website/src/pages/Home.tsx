import { useListPrograms, useListTestimonials, useGetStats } from "@workspace/api-client-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Shield, Heart, Users, ArrowRight, HelpCircle, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const { data: stats } = useGetStats();
  const { data: programs } = useListPrograms();
  const { data: testimonials } = useListTestimonials();

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-primary/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="Daycare classroom" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 space-y-8"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-yellow font-semibold text-sm">
              <Star className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
              Trusted by parents for 15+ years
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight">
              Where little stars <span className="text-primary">shine brightest.</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-foreground/70 max-w-lg leading-relaxed">
              A warm, nurturing environment where your child can safely explore, learn, and grow joyful memories every single day.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="xl" className="rounded-full text-lg h-14 px-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <Link href="/enroll">Enroll Your Child</Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-full text-lg h-14 px-8 bg-background/50 backdrop-blur-sm border-2">
                <Link href="/programs">Explore Programs</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="py-16 bg-white z-20 relative -mt-8 mx-4 md:mx-auto md:max-w-5xl rounded-3xl shadow-xl border border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-8">
            <div className="space-y-2">
              <h3 className="text-4xl font-serif font-bold text-primary">{stats.yearsInOperation}+</h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years of Care</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-serif font-bold text-brand-yellow">{stats.totalChildren}</h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Happy Children</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-serif font-bold text-brand-coral">{stats.totalStaff}</h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Expert Staff</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-serif font-bold text-brand-green">{stats.satisfactionRate}%</h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Parent Satisfaction</p>
            </div>
          </div>
        </section>
      )}

      {/* Trust Signals */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Why Parents Choose Us</h2>
            <p className="text-lg text-muted-foreground">We believe in providing more than just childcare. We provide a second home for your little ones.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Uncompromising Safety", desc: "Secure facilities with strict pickup protocols and comprehensive staff background checks.", color: "text-brand-blue", bg: "bg-brand-blue/10" },
              { icon: Heart, title: "Nurturing Environment", desc: "Low student-to-teacher ratios ensure your child gets the individual attention they deserve.", color: "text-brand-coral", bg: "bg-brand-coral/10" },
              { icon: Users, title: "Expert Educators", desc: "Our staff consists of certified early childhood educators passionate about development.", color: "text-brand-green", bg: "bg-brand-green/10" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.2 } }
                }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-8 text-center space-y-4 flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center rotate-3 ${feature.bg}`}>
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold font-serif">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl md:text-5xl font-serif font-bold">Programs for Every Stage</h2>
              <p className="text-lg text-muted-foreground">Tailored curriculum designed to support your child's cognitive, social, and emotional growth.</p>
            </div>
            <Button asChild variant="ghost" className="group">
              <Link href="/programs">
                View All Programs
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs?.slice(0, 4).map((program, i) => (
              <motion.div
                key={program.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { delay: i * 0.1 } }
                }}
              >
                <Link href={`/programs/${program.id}`} className="group block h-full">
                  <Card className="h-full overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 bg-white">
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10" />
                      <img 
                        src={program.imageUrl || `/images/program-${program.name.toLowerCase().split(' ')[0]}.png`} 
                        alt={program.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80';
                        }}
                      />
                      <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary">
                        {program.ageRange}
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-xl font-bold font-serif group-hover:text-primary transition-colors">{program.name}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{program.description}</p>
                      <div className="flex items-center text-sm font-medium text-brand-coral pt-2">
                        Learn more <ArrowRight className="ml-1 w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Hear from Our Families</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">Don't just take our word for it. Here's what parents have to say about their experience with Little Stars.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials?.slice(0, 3).map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.2 } }
                }}
              >
                <Card className="h-full bg-white/10 border-white/20 backdrop-blur-md text-white">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-5 h-5 ${j < testimonial.rating ? 'fill-brand-yellow text-brand-yellow' : 'text-white/30'}`} />
                      ))}
                    </div>
                    <p className="text-lg italic leading-relaxed">"{testimonial.review}"</p>
                    <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                      <Avatar className="h-12 w-12 border-2 border-white/30">
                        {testimonial.avatarUrl ? <AvatarImage src={testimonial.avatarUrl} /> : null}
                        <AvatarFallback className="bg-primary-foreground/20 text-white">
                          {testimonial.parentName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">{testimonial.parentName}</p>
                        <p className="text-sm text-primary-foreground/70">Parent of {testimonial.childName}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="md:w-2/5 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 text-primary font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                Common Questions
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                We know that choosing the right childcare is one of the biggest decisions you'll make. Here are some answers to the questions we hear most.
              </p>
              <Button asChild size="lg" variant="outline" className="rounded-full mt-4">
                <Link href="/faq">
                  View All FAQs <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="md:w-3/5 space-y-4">
              {[
                { q: "What age groups do you accept?", a: "We welcome children from 6 weeks to 12 years old across our Infant Care, Toddler, Preschool, and After School programs." },
                { q: "What are your hours of operation?", a: "We are open Monday through Friday, 7:00 AM to 6:00 PM. We are closed on federal holidays and observe a two-week winter break." },
                { q: "Is there a waitlist?", a: "Our programs fill quickly, especially Infant Care. We recommend applying early. Waitlisted families are contacted as soon as a spot opens." },
                { q: "Do you provide meals?", a: "Yes! We provide a morning snack, hot lunch, and afternoon snack daily. Meals meet USDA guidelines and accommodate dietary restrictions." },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-muted/50 rounded-2xl p-6 border border-border/50"
                >
                  <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-brand-green/10 border-y border-brand-green/20">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-6">
          <h2 className="text-3xl font-serif font-bold text-primary">Stay in the Loop</h2>
          <p className="text-muted-foreground text-lg">
            Get the latest news, upcoming events, and early learning tips delivered to your inbox monthly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 rounded-full px-6 border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
            <Button size="lg" className="rounded-full px-8 shrink-0">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">No spam, ever. Unsubscribe at any time.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-yellow relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary">Ready to join our family?</h2>
          <p className="text-xl text-primary/80">
            We'd love to meet you and your little one. Schedule a tour or start the enrollment process today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <Button asChild size="xl" className="rounded-full text-lg h-14 px-10 shadow-lg hover:shadow-xl transition-all">
              <Link href="/enroll">Enroll Now</Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="rounded-full text-lg h-14 px-10 border-primary text-primary hover:bg-primary/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
