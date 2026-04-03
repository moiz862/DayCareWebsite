import { useGetStats } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Shield, Heart, Star, Award, BookOpen, Users, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const timeline = [
  { year: "2009", title: "Little Stars Founded", desc: "Dr. Sarah Mitchell opens Little Stars with just 12 children and a dream of exceptional childcare." },
  { year: "2012", title: "NAEYC Accreditation", desc: "We earn our first National Association for the Education of Young Children accreditation." },
  { year: "2015", title: "Expanded Facility", desc: "A complete facility renovation doubles our capacity and adds dedicated outdoor learning gardens." },
  { year: "2018", title: "After School Program Launched", desc: "Community demand leads us to expand with our After School Care program serving local elementary students." },
  { year: "2022", title: "Award-Winning Curriculum", desc: "Our preschool curriculum receives the Springfield Early Education Excellence Award." },
  { year: "2024", title: "15 Years of Joyful Learning", desc: "We celebrate 15 years of nurturing hundreds of families and welcoming our 400th enrolled child." },
];

const accreditations = [
  { name: "NAEYC Accredited", desc: "National Association for the Education of Young Children — the gold standard in early childhood education.", icon: Award },
  { name: "State Licensed & Inspected", desc: "Fully licensed by the State Department of Children and Family Services, with regular facility inspections.", icon: CheckCircle2 },
  { name: "CPR/First Aid Certified Staff", desc: "100% of our staff hold current CPR and First Aid certifications, renewed every 2 years.", icon: Shield },
  { name: "STEM-Certified Curriculum", desc: "Our preschool curriculum is aligned with the National Science Teaching Association's early learning standards.", icon: BookOpen },
  { name: "Nutrition-Certified Kitchen", desc: "Our meal program is overseen by a Registered Dietitian and meets all USDA Child Nutrition guidelines.", icon: Heart },
  { name: "Director Credential Program", desc: "Our leadership team holds advanced Director Credentials from the National Child Care Association.", icon: Users },
];

export default function About() {
  const { data: stats } = useGetStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary py-28 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white">Our Story</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto">
              Founded with a simple mission: to provide a safe, nurturing, and joyful environment where every child can shine their brightest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="container mx-auto px-4 -mt-12 relative z-20">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-border/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: `${stats.yearsInOperation}+`, label: "Years Experience", color: "text-brand-blue" },
                { value: stats.totalChildren, label: "Children Taught", color: "text-brand-coral" },
                { value: stats.totalStaff, label: "Expert Educators", color: "text-brand-yellow" },
                { value: `${stats.satisfactionRate}%`, label: "Happy Parents", color: "text-brand-green" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`text-4xl font-serif font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission & Vision */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 aspect-square rounded-[3rem] overflow-hidden rotate-3 shadow-xl relative"
          >
            <img
              src="/images/hero.png"
              alt="Children playing at Little Stars"
              className="w-full h-full object-cover -rotate-3 scale-110"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80'; }}
            />
          </motion.div>
          <div className="w-full md:w-1/2 space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Little Stars, we believe that early childhood is the most critical period of development.
                Our play-based curriculum is thoughtfully designed to foster curiosity, creativity, and a lifelong love of learning —
                while ensuring each child feels genuinely safe, seen, and celebrated.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { icon: Heart, color: "bg-brand-coral/10", iconColor: "text-brand-coral", title: "Nurturing Growth", desc: "We focus on the whole child — cognitive, emotional, social, and physical development — guided by passionate educators." },
                { icon: Shield, color: "bg-brand-blue/10", iconColor: "text-brand-blue", title: "Safety First", desc: "Our facility and protocols are designed to give parents complete peace of mind every single day." },
                { icon: Star, color: "bg-brand-yellow/20", iconColor: "text-brand-yellow", title: "Joy in Learning", desc: "Learning should be joyful. Our classrooms are vibrant, warm spaces where children fall in love with discovering the world." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center shrink-0`}>
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our History Timeline */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">15 years of milestones, growth, and joyful moments.</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-start gap-8 relative ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} pl-12 md:pl-0`}
                >
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-border/50 hover:shadow-lg transition-shadow">
                      <span className="text-sm font-bold text-brand-coral uppercase tracking-wider">{item.year}</span>
                      <h3 className="text-xl font-serif font-bold text-primary mt-1 mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center -translate-x-0 md:-translate-x-4 mt-6 shadow-md border-4 border-background z-10">
                    <Star className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">The principles that guide everything we do.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Star, title: "Excellence", desc: "We hold ourselves to the highest standards in early childhood education, continuously improving our curriculum, environment, and care practices.", color: "text-brand-yellow", bg: "bg-brand-yellow/10" },
              { icon: Heart, title: "Compassion", desc: "Every child and every family is treated with genuine kindness, respect, and unconditional warmth. We meet children where they are.", color: "text-brand-coral", bg: "bg-brand-coral/10" },
              { icon: Award, title: "Integrity", desc: "We build trust through transparency and honest communication with families. We say what we mean, and we do what we say.", color: "text-brand-green", bg: "bg-brand-green/10" },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-none shadow-md bg-white h-full">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className={`w-16 h-16 ${value.bg} rounded-2xl flex items-center justify-center mx-auto`}>
                      <value.icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold font-serif">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations & Awards */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Accreditations & Standards</h2>
            <p className="text-lg text-muted-foreground">We hold ourselves to the highest standards so your family always can.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accreditations.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="border-none shadow-md bg-white h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-24 bg-brand-yellow/20">
        <div className="container mx-auto px-4 max-w-3xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Join Our Team</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We are always looking for passionate, dedicated educators to join the Little Stars family. If you love working with children and believe in the power of early learning, we would love to hear from you.
          </p>
          <Button asChild size="lg" className="rounded-full shadow-md">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
