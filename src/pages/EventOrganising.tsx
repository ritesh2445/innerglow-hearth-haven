import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Users, Building, Heart, CheckCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const offerings = [
  {
    icon: Building,
    title: "Corporate Wellness Programs",
    description: "Bring mental health awareness to your workplace. We offer customized workshops and sessions for teams of all sizes.",
  },
  {
    icon: Users,
    title: "Community Events",
    description: "Partner with us to organize mental health awareness events in your community, schools, or organizations.",
  },
  {
    icon: Calendar,
    title: "Private Group Sessions",
    description: "Book dedicated sessions for your group, family, or friends. Tailored content to meet your specific needs.",
  },
  {
    icon: Heart,
    title: "Awareness Campaigns",
    description: "Collaborate with us on mental health awareness campaigns to reach and support more people.",
  },
];

const benefits = [
  "Experienced facilitators and trained volunteers",
  "Customizable content and duration",
  "Both in-person and virtual options available",
  "Follow-up resources and support",
  "Flexible scheduling",
  "Affordable pricing for non-profits",
];

const EventOrganising = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Event Organising
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
            Partner with ListeningClub to bring mental health support and awareness to your organization or community.
          </p>
        </div>
      </section>

      {/* Offerings Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {offerings.map((offering, index) => (
              <div
                key={offering.title}
                className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-large transition-glow border border-border hover-glow-strong neon-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-glow group-hover:shadow-[0_0_30px_rgba(255,127,107,0.5)]">
                  <offering.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-smooth">
                  {offering.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {offering.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Partner With Us?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-soft animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CheckCircle className="text-primary flex-shrink-0" size={24} />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Organize an Event?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get in touch with us to discuss how we can bring mental health support to your organization or community.
          </p>
          <Link to="/contact">
            <Button size="lg" className="shadow-medium">
              <Mail className="mr-2" size={20} />
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventOrganising;
