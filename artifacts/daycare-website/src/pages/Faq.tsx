import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    category: "Enrollment & Admissions",
    questions: [
      {
        q: "How do I enroll my child at Little Stars?",
        a: "Start by completing our online enrollment application — it takes about 10 minutes. Once submitted, our director will contact you within 2 business days to schedule a tour and discuss your child's specific needs and available program spots."
      },
      {
        q: "What age groups do you accept?",
        a: "We welcome children from 6 weeks old through 12 years old. We offer four programs: Infant Care (6 weeks – 12 months), Toddler Explorers (1–2 years), Preschool Program (2.5–5 years), and After School Care (5–12 years)."
      },
      {
        q: "Is there a waitlist?",
        a: "Our programs are very popular and spots fill up quickly, especially for our Infant Care room. We recommend applying as early as possible. Once we receive your application, we'll confirm availability or add you to our waitlist — waitlisted families are notified as soon as a space opens."
      },
      {
        q: "What documents are required for enrollment?",
        a: "You will need to provide your child's immunization records, a copy of their birth certificate, emergency contact information, a physician's health assessment (required within 30 days of enrollment), and a completed enrollment packet provided by our office."
      }
    ]
  },
  {
    category: "Daily Schedule & Operations",
    questions: [
      {
        q: "What are your hours of operation?",
        a: "We are open Monday through Friday, 7:00 AM to 6:00 PM. We are closed on all major federal holidays and observe a two-week winter break in late December. A full calendar of closures is provided at enrollment."
      },
      {
        q: "What does a typical day look like?",
        a: "Each day includes a structured balance of guided learning activities, free play, outdoor time, meals and snacks, rest/nap time for younger children, and circle time. A detailed daily schedule for each program is available on request and is posted in each classroom."
      },
      {
        q: "Do you provide meals and snacks?",
        a: "Yes! We provide a nutritious morning snack, a hot lunch, and an afternoon snack each day. Our meals are prepared fresh by our in-house nutritionist and meet or exceed USDA nutritional guidelines. We accommodate common allergies and dietary restrictions — please inform us during enrollment."
      },
      {
        q: "What is your pick-up policy?",
        a: "Safety is our top priority. Only authorized adults listed on your enrollment form may pick up your child. We require a valid photo ID for anyone we do not recognize. If someone other than the regular pick-up person will be collecting your child, please notify us in advance by phone or in writing."
      }
    ]
  },
  {
    category: "Safety & Health",
    questions: [
      {
        q: "How do you handle illness?",
        a: "Children who are ill should stay home to recover and to protect other children. We ask that your child be fever-free (without medication) and symptom-free for 24 hours before returning. If a child becomes ill during the day, parents are notified immediately and the child must be picked up within one hour."
      },
      {
        q: "What safety measures do you have in place?",
        a: "Our facility has keypad-secured entrances, 24/7 security cameras, and strict sign-in/sign-out protocols. All staff undergo comprehensive background checks, CPR and first aid certification, and regular safety training. We conduct monthly emergency drills and maintain a fully stocked first aid kit on every floor."
      },
      {
        q: "Are your staff background checked?",
        a: "Absolutely. All staff members, including volunteers and substitutes, are subject to thorough state and federal background checks before their first day. We also verify all certifications and references. Child safety is never a compromise."
      }
    ]
  },
  {
    category: "Tuition & Fees",
    questions: [
      {
        q: "What is included in the monthly tuition?",
        a: "Tuition covers all educational activities, materials, curriculum resources, meals and snacks (breakfast snack, lunch, afternoon snack), and use of all indoor and outdoor facilities. Special events, field trips, and enrichment programs may have additional costs — you will always be notified in advance."
      },
      {
        q: "Do you offer sibling discounts?",
        a: "Yes! Families enrolling two or more children receive a 10% sibling discount on the lower-priced tuition. Please mention this when speaking with our director during the enrollment consultation."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept check, ACH bank transfer, and major credit cards. Tuition is due on the 1st of each month. We also accept Child Care Assistance Program (CCAP) funding — please contact us to learn if you qualify."
      }
    ]
  }
];

export default function Faq() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-brand-yellow/20 py-24 border-b border-brand-yellow/30">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <HelpCircle className="w-12 h-12 text-brand-yellow mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-primary/80">
            Everything you need to know about Little Stars Daycare. Can't find your answer? We're always happy to help.
          </p>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="space-y-16">
          {faqs.map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: si * 0.1 }}
            >
              <h2 className="text-2xl font-serif font-bold text-primary mb-6 pb-3 border-b border-border">
                {section.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {section.questions.map((faq, qi) => (
                  <AccordionItem
                    key={qi}
                    value={`${si}-${qi}`}
                    className="border border-border/50 rounded-2xl px-6 shadow-sm bg-white overflow-hidden"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary py-5 [&[data-state=open]]:text-primary">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-base">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-24 text-center bg-primary/5 rounded-3xl p-12 border border-primary/10">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">Still have questions?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our team is always happy to answer any question you have. Reach out anytime — we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full shadow-md">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/enroll">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
