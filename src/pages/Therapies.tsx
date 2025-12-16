import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Brain, Leaf, Music, Palette, BookOpen, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const therapies = [
  {
    icon: Brain,
    title: "Cognitive Behavioral Techniques",
    description: "Learn practical strategies to identify and change negative thought patterns. Our sessions incorporate evidence-based CBT principles to help manage anxiety, depression, and stress.",
  },
  {
    icon: Leaf,
    title: "Mindfulness & Meditation",
    description: "Discover the power of present-moment awareness. Our guided mindfulness sessions help reduce stress, improve focus, and cultivate inner peace.",
  },
  {
    icon: Music,
    title: "Sound & Music Therapy",
    description: "Experience the healing power of sound. Our sessions use music and sound vibrations to promote relaxation, emotional release, and mental clarity.",
  },
  {
    icon: Palette,
    title: "Art & Expression Therapy",
    description: "Express yourself through creative outlets. Art therapy provides a non-verbal way to process emotions and explore personal growth.",
  },
  {
    icon: BookOpen,
    title: "Journaling & Reflection",
    description: "Develop self-awareness through guided journaling. Learn techniques to process emotions, set intentions, and track your mental health journey.",
  },
  {
    icon: Sun,
    title: "Breathwork & Relaxation",
    description: "Master breathing techniques that calm the nervous system. Our breathwork sessions help reduce anxiety and promote overall wellbeing.",
  },
];

const Therapies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Therapeutic Approaches
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
            Explore various therapeutic modalities we incorporate into our sessions to support your mental health journey.
          </p>
        </div>
      </section>

      {/* Therapies Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {therapies.map((therapy, index) => (
              <div
                key={therapy.title}
                className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-large transition-glow border border-border hover-glow-strong neon-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-glow group-hover:shadow-[0_0_30px_rgba(255,127,107,0.5)]">
                  <therapy.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-smooth">
                  {therapy.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {therapy.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Important Note</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              ListeningClub provides peer support and wellness activities. While we incorporate therapeutic techniques, 
              we are not a replacement for professional mental health treatment. If you're experiencing severe symptoms, 
              please consult a licensed mental health professional.
            </p>
            <Link to="/events">
              <Button size="lg" className="shadow-medium">
                Explore Our Sessions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Therapies;
