import { useState } from "react";
import { useListEnrollments, useListGallery, useListEvents } from "@workspace/api-client-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Mail, BookOpen, Clock, CalendarDays, LogOut, ShieldCheck, AlertCircle, Trash2, Image as ImageIcon, Upload, CalendarPlus, Plus } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLogin } from "@/components/AdminLogin";

export function useListContact() {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error("Failed to fetch contacts. Ensure backend is restarted.");
      return res.json() as Promise<{
        id: number;
        name: string;
        email: string;
        phone: string | null;
        subject: string;
        message: string;
        createdAt: string;
      }[]>;
    }
  });
}

export default function Admin() {
  const { isAuthenticated, login, logout } = useAdminAuth();
  const queryClient = useQueryClient();

  const { data: contacts, isLoading: contactsLoading, isError: contactsError } = useListContact();
  const { data: enrollments, isLoading: enrollmentsLoading } = useListEnrollments();
  const { data: gallery, isLoading: galleryLoading } = useListGallery();
  const { data: events, isLoading: eventsLoading } = useListEvents();

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploadCategory, setUploadCategory] = useState("activities");

  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventType, setEventType] = useState("open-house");

  const deleteContactMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts"] })
  });

  const deleteEnrollmentMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/enrollments/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] })
  });

  const deleteGalleryMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/gallery"] })
  });

  const uploadGalleryMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`/api/gallery`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Failed to upload');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/gallery"] })
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete event');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/events"] })
  });

  const createEventMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/events', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data) 
      });
      if (!res.ok) throw new Error('Failed to create event');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setEventTitle("");
      setEventDescription("");
      setEventDate("");
      setEventTime("");
      setEventLocation("");
    }
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !uploadCaption) return;
    const formData = new FormData();
    formData.append("image", uploadFile);
    formData.append("caption", uploadCaption);
    formData.append("category", uploadCategory);
    uploadGalleryMutation.mutate(formData, {
      onSuccess: () => {
        setUploadFile(null);
        setUploadCaption("");
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      }
    });
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate) return;
    createEventMutation.mutate({
      title: eventTitle,
      description: eventDescription,
      date: new Date(eventDate).toISOString(),
      time: eventTime,
      location: eventLocation,
      type: eventType
    });
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-brand-yellow" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">Manage inbound parent communications and gallery.</p>
        </div>
        <Button variant="outline" onClick={logout} className="mt-4 md:mt-0 border-destructive/30 hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </div>

      {contactsError && (
        <div className="mb-8 p-4 bg-destructive/10 text-destructive rounded-xl border border-destructive flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-8 h-8 mb-2" />
          <h3 className="font-bold text-lg">API Connection Failed</h3>
          <p className="mt-2 text-base">We cannot fetch the data. Ensure the backend is running.</p>
        </div>
      )}

      <Tabs defaultValue="contact" className="max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted p-1 rounded-xl">
          <TabsTrigger value="contact" className="text-base py-3 rounded-lg">
            <Mail className="w-5 h-5 mr-2" /> Messages
            {contacts && <span className="ml-3 bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full text-xs">{contacts.length}</span>}
          </TabsTrigger>
          <TabsTrigger value="enrollments" className="text-base py-3 rounded-lg">
            <BookOpen className="w-5 h-5 mr-2" /> Enrollments
            {enrollments && <span className="ml-3 bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full text-xs">{enrollments.length}</span>}
          </TabsTrigger>
          <TabsTrigger value="events" className="text-base py-3 rounded-lg">
            <CalendarPlus className="w-5 h-5 mr-2" /> Events
            {events && <span className="ml-3 bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full text-xs">{events.length}</span>}
          </TabsTrigger>
          <TabsTrigger value="gallery" className="text-base py-3 rounded-lg">
            <ImageIcon className="w-5 h-5 mr-2" /> Gallery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="space-y-6">
          {contactsLoading && <div className="text-center py-20"><div className="animate-pulse flex flex-col items-center"><Mail className="w-12 h-12 text-muted-foreground/30 mb-4" /><p className="text-muted-foreground">Loading secure messages...</p></div></div>}
          {!contactsLoading && contacts?.length === 0 && (
             <div className="text-center py-20 bg-muted/30 rounded-xl border-2 border-dashed">
               <Mail className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
               <p className="text-muted-foreground text-lg">No contact messages yet!</p>
             </div>
          )}
          {contacts?.map(contact => (
            <Card key={`contact-${contact.id}`} className="shadow-sm border-l-4 border-l-brand-coral hover:shadow-md transition-shadow relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 text-destructive hover:bg-destructive/10" 
                disabled={deleteContactMutation.isPending}
                onClick={() => { if(confirm("Delete this message?")) deleteContactMutation.mutate(contact.id) }}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
              <CardHeader className="bg-muted/10 border-b pb-4 pr-16">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                  <div>
                    <CardTitle className="text-2xl text-primary">{contact.name}</CardTitle>
                    <CardDescription className="text-base mt-2 flex flex-col md:flex-row gap-2 md:gap-4 md:items-center text-foreground/70">
                      <a href={`mailto:${contact.email}`} className="text-brand-coral hover:underline font-medium hover:text-brand-coral/80 bg-brand-coral/10 px-3 py-1 rounded-full text-sm inline-flex items-center w-fit"><Mail className="w-3 h-3 mr-1.5"/> {contact.email}</a>
                      {contact.phone && <span className="bg-muted px-3 py-1 rounded-full text-sm font-medium w-fit">{contact.phone}</span>}
                    </CardDescription>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground flex items-center bg-muted px-3 py-1.5 rounded-full shrink-0">
                    <Clock className="w-4 h-4 mr-2" />
                    {format(new Date(contact.createdAt), "PPp")}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 bg-white/50">
                <h4 className="font-semibold mb-3 text-foreground tracking-tight">Subject: {contact.subject}</h4>
                <div className="bg-muted/40 p-4 rounded-xl border">
                  <p className="text-muted-foreground/90 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="enrollments" className="space-y-6">
          {enrollmentsLoading && <div className="text-center py-20"><div className="animate-pulse flex flex-col items-center"><BookOpen className="w-12 h-12 text-muted-foreground/30 mb-4" /><p className="text-muted-foreground">Loading enrollment applications...</p></div></div>}
          {!enrollmentsLoading && enrollments?.length === 0 && (
             <div className="text-center py-20 bg-muted/30 rounded-xl border-2 border-dashed">
               <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
               <p className="text-muted-foreground text-lg">No enrollments yet!</p>
             </div>
          )}
          {enrollments?.map(enroll => (
            <Card key={`enroll-${enroll.id}`} className="shadow-sm border-l-4 border-l-brand-yellow hover:shadow-md transition-shadow relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 text-destructive hover:bg-destructive/10"
                disabled={deleteEnrollmentMutation.isPending} 
                onClick={() => { if(confirm("Delete this enrollment?")) deleteEnrollmentMutation.mutate(enroll.id) }}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
              <CardHeader className="bg-muted/10 border-b pb-4 pr-16">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <CardTitle className="text-2xl text-primary">{enroll.parentName}</CardTitle>
                       <span className="px-3 py-1 bg-brand-yellow/20 text-brand-yellow rounded-full text-xs font-bold uppercase tracking-wider">
                         {enroll.status}
                       </span>
                    </div>
                    <CardDescription className="text-base flex flex-col md:flex-row gap-2 md:gap-4 md:items-center text-foreground/70">
                      <a href={`mailto:${enroll.parentEmail}`} className="text-brand-coral hover:underline font-medium hover:text-brand-coral/80 bg-brand-coral/10 px-3 py-1 rounded-full text-sm inline-flex items-center w-fit"><Mail className="w-3 h-3 mr-1.5"/> {enroll.parentEmail}</a>
                      <span className="bg-muted px-3 py-1 rounded-full text-sm font-medium w-fit">{enroll.parentPhone}</span>
                    </CardDescription>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground flex items-center bg-muted px-3 py-1.5 rounded-full shrink-0 h-fit">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    App Submitted: {format(new Date(enroll.createdAt), "PP")}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 bg-white/50">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-foreground mb-4 flex items-center gap-2 border-b pb-2"><div className="w-2 h-2 rounded-full bg-brand-coral"></div>Child Information</h4>
                    <ul className="space-y-3 text-[15px]">
                      <li className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Name</span> <span className="font-medium text-foreground">{enroll.childName}</span></li>
                      <li className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Age</span> <span className="font-medium text-foreground">{enroll.childAge} years old</span></li>
                      <li className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Date of Birth</span> <span className="font-medium text-foreground">{format(new Date(enroll.childDateOfBirth), "PP")}</span></li>
                      {enroll.specialNeeds && (
                        <li className="pt-2">
                          <span className="text-muted-foreground block mb-2">Special Needs / Allergies</span> 
                          <span className="font-medium text-destructive bg-destructive/10 px-3 py-2 rounded-lg block leading-relaxed">{enroll.specialNeeds}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-foreground mb-4 flex items-center gap-2 border-b pb-2"><div className="w-2 h-2 rounded-full bg-brand-yellow"></div>Program Request</h4>
                    <ul className="space-y-3 text-[15px]">
                      <li className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Selected Program</span> <span className="font-medium text-foreground">{enroll.programName}</span></li>
                      <li className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Internal ID</span> <span className="font-medium text-foreground font-mono">#{enroll.programId}</span></li>
                      <li className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Requested Start Date</span> <span className="font-medium text-foreground text-brand-coral">{format(new Date(enroll.startDate), "PP")}</span></li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader className="bg-brand-coral/10 border-b border-brand-coral/20">
              <CardTitle className="text-brand-coral">Publish New Event</CardTitle>
              <CardDescription>Instantly post an upcoming event to the public website.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
               <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                 <div className="space-y-2 lg:col-span-2">
                    <label className="text-sm font-medium">Event Title</label>
                    <Input placeholder="E.g. Spring Open House" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Category Type</label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open-house">Open House</SelectItem>
                        <SelectItem value="holiday">Holiday</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="field-trip">Field Trip</SelectItem>
                        <SelectItem value="celebration">Celebration</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2 lg:col-span-3">
                    <label className="text-sm font-medium">Description</label>
                    <Input placeholder="Short description of the event..." value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Time Window</label>
                    <Input placeholder="E.g. 10:00 AM - 1:00 PM" value={eventTime} onChange={(e) => setEventTime(e.target.value)} required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input placeholder="E.g. Main Campus" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} required />
                 </div>
                 <Button type="submit" disabled={createEventMutation.isPending} className="lg:col-span-3 bg-brand-coral hover:bg-brand-coral/90 text-white">
                   {createEventMutation.isPending ? "Publishing..." : <><Plus className="w-4 h-4 mr-2" /> Publish Event</>}
                 </Button>
               </form>
            </CardContent>
          </Card>

          {eventsLoading && <div className="text-center py-20"><div className="animate-pulse flex flex-col items-center"><CalendarDays className="w-12 h-12 text-muted-foreground/30 mb-4" /><p className="text-muted-foreground">Loading active events...</p></div></div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events?.map(ev => (
              <Card key={`ev-${ev.id}`} className="relative border-l-4 border-l-brand-coral shadow-sm">
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 text-destructive hover:bg-destructive/10" 
                    disabled={deleteEventMutation.isPending}
                    onClick={() => { if(confirm("Are you sure you want to delete this event? It will disappear from the website instantly.")) deleteEventMutation.mutate(ev.id) }}
                 >
                   <Trash2 className="w-5 h-5" />
                 </Button>
                 <CardHeader className="pb-2">
                   <div className="pr-12">
                     <span className="px-2 py-0.5 bg-muted rounded text-xs font-semibold uppercase mb-2 inline-block">{ev.type}</span>
                     <CardTitle className="text-lg">{ev.title}</CardTitle>
                   </div>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{ev.description}</p>
                   <div className="flex flex-wrap gap-3 text-sm font-medium">
                     <div className="flex items-center text-primary bg-primary/5 px-2 py-1 rounded"><CalendarDays className="w-4 h-4 mr-1.5" /> {format(new Date(ev.date), "MMM d, yyyy")}</div>
                     <div className="flex items-center text-primary bg-primary/5 px-2 py-1 rounded"><Clock className="w-4 h-4 mr-1.5" /> {ev.time}</div>
                   </div>
                 </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader className="bg-muted/10 border-b">
              <CardTitle>Upload New Photo</CardTitle>
              <CardDescription>Add a new photo to the public gallery.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
               <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Image File</label>
                    <Input id="file-upload" type="file" accept="image/*" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Caption</label>
                    <Input placeholder="E.g. Finger painting!" value={uploadCaption} onChange={(e) => setUploadCaption(e.target.value)} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={uploadCategory} onValueChange={setUploadCategory}>
                      <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="activities">Activities</SelectItem>
                        <SelectItem value="outdoor">Outdoor</SelectItem>
                        <SelectItem value="learning">Learning</SelectItem>
                        <SelectItem value="events">Events</SelectItem>
                        <SelectItem value="meals">Meals</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                 <Button type="submit" disabled={!uploadFile || !uploadCaption || uploadGalleryMutation.isPending} className="w-full">
                   {uploadGalleryMutation.isPending ? "Uploading..." : <><Upload className="w-4 h-4 mr-2" /> Upload</>}
                 </Button>
               </form>
            </CardContent>
          </Card>

          {galleryLoading && <div className="text-center py-20"><div className="animate-pulse flex flex-col items-center"><ImageIcon className="w-12 h-12 text-muted-foreground/30 mb-4" /><p className="text-muted-foreground">Loading gallery...</p></div></div>}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gallery?.map(photo => (
              <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden bg-muted group">
                 <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                    <p className="text-white font-bold text-center mb-1">{photo.caption}</p>
                    <p className="text-white/70 text-sm mb-4 capitalize">{photo.category}</p>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => { if(confirm("Delete this photo?")) deleteGalleryMutation.mutate(photo.id) }}
                      disabled={deleteGalleryMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                 </div>
              </div>
            ))}
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
