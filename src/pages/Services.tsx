import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart, Users, Calendar, MessageCircle, Sparkles, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Users,
    title: "Group Support Sessions",
    description: "Join our facilitated group sessions where you can share experiences, learn from others, and find comfort in a supportive community environment.",
  },
  {
    icon: MessageCircle,
    title: "One-on-One Listening",
    description: "Connect with trained volunteers for personalized listening sessions. A safe space to express yourself without judgment.",
  },
  {
    icon: Calendar,
    title: "Workshops & Events",
    description: "Participate in educational workshops covering mental health topics, coping strategies, and personal development.",
  },
  {
    icon: Heart,
    title: "Peer Support Network",
    description: "Build meaningful connections with others who understand your journey. Our peer support network provides ongoing community and encouragement.",
  },
  {
    icon: Sparkles,
    title: "Wellness Resources",
    description: "Access curated resources including guided meditations, self-help materials, and expert-recommended mental health tools.",
  },
  {
    icon: Shield,
    title: "Crisis Support Guidance",
    description: "We provide guidance and resources for those in need, helping connect individuals with appropriate professional services when necessary.",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
            Comprehensive mental health support services designed to help you on your journey to emotional wellbeing.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-large transition-glow border border-border hover-glow-strong neon-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-glow group-hover:shadow-[0_0_30px_rgba(255,127,107,0.5)]">
                  <service.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-smooth">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the first step towards better mental health. Book a session or contact us to learn more about our services.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/events">
              <Button size="lg" className="shadow-medium">
                <Calendar className="mr-2" size={20} />
                Book a Session
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
