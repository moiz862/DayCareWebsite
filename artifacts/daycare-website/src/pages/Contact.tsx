import { useState } from "react";
import { useSubmitContact } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const submitContact = useSubmitContact();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    submitContact.mutate({ data }, {
      onSuccess: () => {
        setIsSuccess(true);
        form.reset();
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-24 text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-primary-foreground/90">
            We'd love to hear from you. Reach out with any questions, or schedule a tour of our beautiful facility.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-none shadow-lg bg-brand-yellow/10">
              <CardContent className="p-8 space-y-8">
                {[
                  { icon: MapPin, iconColor: "text-brand-coral", title: "Location", content: <>123 Sunshine Blvd<br />Springfield, ST 12345</> },
                  { icon: Phone, iconColor: "text-brand-blue", title: "Phone", content: "(555) 123-4567" },
                  { icon: Mail, iconColor: "text-brand-green", title: "Email", content: "hello@littlestars.com" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-primary">{item.title}</h3>
                      <p className="text-muted-foreground mt-1">{item.content}</p>
                    </div>
                  </motion.div>
                ))}

                <div className="flex items-start gap-4 pt-6 border-t border-brand-yellow/20">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-primary">Hours of Operation</h3>
                    <ul className="text-muted-foreground mt-1 space-y-1 text-sm">
                      <li className="flex justify-between gap-8"><span>Mon – Fri:</span> <span className="font-semibold text-foreground">7:00 AM – 6:00 PM</span></li>
                      <li className="flex justify-between gap-8"><span>Sat – Sun:</span> <span className="font-semibold text-foreground">Closed</span></li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Embed */}
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="h-64 bg-muted relative">
                <iframe
                  title="Little Stars Daycare Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-89.68%2C39.75%2C-89.62%2C39.81&layer=mapnik&marker=39.781%2C-89.649"
                  className="w-full h-full"
                  style={{ border: 0, filter: "saturate(0.8) contrast(0.9)" }}
                  loading="lazy"
                />
                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-white/90 px-2 py-1 rounded shadow-sm">
                  <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    © OpenStreetMap
                  </a>
                </div>
              </div>
              <CardContent className="p-4 bg-white">
                <p className="text-sm font-medium text-center text-muted-foreground">
                  📍 123 Sunshine Blvd, Springfield, ST 12345
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <Card className="border-none shadow-xl">
              <CardContent className="p-8 md:p-12">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-brand-green" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-primary">Message Sent!</h3>
                    <p className="text-muted-foreground text-lg">
                      Thank you for reaching out. Our team will be in touch within one business day.
                    </p>
                    <Button variant="outline" className="mt-8 rounded-full" onClick={() => setIsSuccess(false)}>
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Send Us a Message</h2>
                      <p className="text-muted-foreground">We typically respond within one business day.</p>
                    </div>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name</FormLabel>
                              <FormControl><Input placeholder="Jane Doe" {...field} className="bg-muted/50 h-12" /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl><Input type="email" placeholder="jane@example.com" {...field} className="bg-muted/50 h-12" /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl><Input type="tel" placeholder="(555) 123-4567" {...field} className="bg-muted/50 h-12" /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="subject" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl><Input placeholder="Schedule a tour" {...field} className="bg-muted/50 h-12" /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>

                        <FormField control={form.control} name="message" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="How can we help you?"
                                className="min-h-[150px] bg-muted/50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full rounded-full bg-brand-coral hover:bg-brand-coral/90 text-white h-14 text-lg"
                          disabled={submitContact.isPending}
                        >
                          {submitContact.isPending ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
