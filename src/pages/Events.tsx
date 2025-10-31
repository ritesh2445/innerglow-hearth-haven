import { Calendar, Clock, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  description: string;
  location: string;
}

const events: Event[] = [
  {
    id: 1,
    name: "Mindfulness & Meditation Circle",
    date: "2025-11-15",
    time: "6:00 PM - 7:30 PM",
    description: "Join us for a calming evening of guided meditation and mindfulness practices. Perfect for beginners and experienced practitioners alike.",
    location: "Online via Zoom",
  },
  {
    id: 2,
    name: "Mental Health Awareness Workshop",
    date: "2025-11-20",
    time: "3:00 PM - 5:00 PM",
    description: "Learn about mental health, coping strategies, and how to support loved ones. Interactive workshop with mental health professionals.",
    location: "Community Center",
  },
  {
    id: 3,
    name: "Peer Support Group Session",
    date: "2025-11-22",
    time: "7:00 PM - 8:30 PM",
    description: "A safe space to share experiences, challenges, and victories with others who understand. Facilitated by trained volunteers.",
    location: "Online via Zoom",
  },
  {
    id: 4,
    name: "Art Therapy & Creative Expression",
    date: "2025-11-28",
    time: "4:00 PM - 6:00 PM",
    description: "Express yourself through art in a supportive environment. No artistic experience required - just bring your authentic self.",
    location: "InnerGlow Studio",
  },
  {
    id: 5,
    name: "Stress Management Workshop",
    date: "2025-12-05",
    time: "5:30 PM - 7:00 PM",
    description: "Learn practical techniques to manage stress, anxiety, and overwhelming emotions in your daily life.",
    location: "Online via Zoom",
  },
  {
    id: 6,
    name: "Community Wellness Walk",
    date: "2025-12-08",
    time: "10:00 AM - 12:00 PM",
    description: "Join us for a peaceful walk in nature. Connect with community members while enjoying the healing power of movement and fresh air.",
    location: "City Park - Main Entrance",
  },
];

const Events = () => {
  const [whatsappContact, setWhatsappContact] = useState<string>("1234567890");

  useEffect(() => {
    fetchWhatsAppContact();
  }, []);

  const fetchWhatsAppContact = async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "whatsapp_contact")
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setWhatsappContact(data.value);
      }
    } catch (error) {
      console.error("Error fetching WhatsApp contact:", error);
    }
  };

  const handleBookWhatsApp = (event: Event) => {
    const message = `Hi! I'd like to book the event: ${event.name} on ${event.date} at ${event.time}`;
    const whatsappUrl = `https://wa.me/${whatsappContact}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Header */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Upcoming Events
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
            Join our community sessions, workshops, and support groups. Each event is designed to nurture your mental wellbeing.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-glow border border-border hover-glow-strong neon-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-br from-primary/20 to-secondary/30 h-32 flex items-center justify-center group-hover:shadow-[inset_0_0_40px_rgba(255,127,107,0.3)] transition-glow">
                  <Calendar className="text-primary group-hover:scale-110 transition-glow" size={48} />
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-smooth">
                    {event.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                  
                  <Button 
                    onClick={() => handleBookWhatsApp(event)}
                    className="w-full shadow-soft"
                  >
                    <MessageCircle className="mr-2" size={18} />
                    Book via WhatsApp
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
