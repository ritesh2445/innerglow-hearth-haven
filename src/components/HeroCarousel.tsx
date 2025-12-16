import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Users, Calendar, Heart } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: {
    text: string;
    link: string;
  };
  icon: React.ElementType;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Meet Our Founders",
    subtitle: "The Heart Behind ListeningClub",
    description: "Discover the passionate individuals who created ListeningClub to make mental health support accessible to everyone.",
    cta: { text: "Meet the Team", link: "/founders" },
    icon: Users,
  },
  {
    id: 2,
    title: "Upcoming Events",
    subtitle: "Join Our Community Sessions",
    description: "Participate in workshops, support groups, and wellness sessions designed to nurture your mental wellbeing.",
    cta: { text: "View Events", link: "/events" },
    icon: Calendar,
  },
  {
    id: 3,
    title: "Our Mission",
    subtitle: "A Space to Listen, Heal, and Grow",
    description: "ListeningClub is dedicated to creating safe, judgment-free spaces where everyone can find support on their mental health journey.",
    cta: { text: "Learn More", link: "/services" },
    icon: Heart,
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleManualNav = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    if (direction === 'prev') prevSlide();
    else nextSlide();
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative gradient-hero overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="relative min-h-[320px]">
            {slides.map((slide, index) => {
              const Icon = slide.icon;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 translate-x-0"
                      : index < currentSlide
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon className="text-primary" size={24} />
                      </div>
                      <span className="text-primary font-medium">{slide.subtitle}</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      <Link to={slide.cta.link}>
                        <Button size="lg" className="shadow-medium">
                          {slide.cta.text}
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button size="lg" variant="outline" className="shadow-soft">
                          Contact Us
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Image */}
          <div className="relative animate-scale-in">
            <img
              src={heroImage}
              alt="ListeningClub Community"
              className="rounded-3xl shadow-large w-full h-auto object-cover"
            />
            {/* Floating accents */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-float animate-pulse-glow"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/40 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => handleManualNav('prev')}
            className="p-2 rounded-full bg-card border border-border shadow-soft hover:shadow-medium hover:scale-105 transition-smooth"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary w-8 shadow-[0_0_15px_rgba(255,127,107,0.5)]"
                    : "bg-muted hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => handleManualNav('next')}
            className="p-2 rounded-full bg-card border border-border shadow-soft hover:shadow-medium hover:scale-105 transition-smooth"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
