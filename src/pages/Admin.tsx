import { Lock, Calendar, MessageSquare, Quote, Save } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const whatsappSchema = z.object({
  whatsapp_contact: z.string()
    .min(1, "WhatsApp contact is required")
    .max(100, "WhatsApp contact must be less than 100 characters")
    .trim(),
});

type WhatsAppFormValues = z.infer<typeof whatsappSchema>;

const Admin = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<WhatsAppFormValues>({
    resolver: zodResolver(whatsappSchema),
    defaultValues: {
      whatsapp_contact: "",
    },
  });

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
        form.reset({ whatsapp_contact: data.value });
      }
    } catch (error) {
      console.error("Error fetching WhatsApp contact:", error);
      toast({
        title: "Error",
        description: "Failed to load WhatsApp contact",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (values: WhatsAppFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("settings")
        .upsert({
          key: "whatsapp_contact",
          value: values.whatsapp_contact.trim(),
        }, {
          onConflict: "key",
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "WhatsApp contact updated successfully",
      });
    } catch (error) {
      console.error("Error updating WhatsApp contact:", error);
      toast({
        title: "Error",
        description: "Failed to update WhatsApp contact",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Header */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Lock className="mx-auto text-primary mb-6" size={64} />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Admin Dashboard
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
            Manage events, testimonials, and motivational quotes for the InnerGlow community.
          </p>
        </div>
      </section>

      {/* Admin Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Authentication Notice */}
            <div className="bg-secondary/30 rounded-2xl p-8 text-center border-2 border-dashed border-primary/30 animate-fade-in">
              <Lock className="mx-auto text-primary mb-4" size={48} />
              <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
              <p className="text-muted-foreground mb-6">
                This is a placeholder for the admin dashboard. Firebase Authentication will be integrated to protect this area.
              </p>
              <Button className="shadow-soft">
                Sign In (Coming Soon)
              </Button>
            </div>

            {/* WhatsApp Configuration */}
            <Card className="shadow-soft border-border animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="text-primary" size={24} />
                  WhatsApp Configuration
                </CardTitle>
                <CardDescription>
                  Set the WhatsApp phone number or link for event bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="whatsapp_contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp Contact</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="1234567890 or wa.me/1234567890"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter a phone number (e.g., 1234567890) or WhatsApp link
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full shadow-soft"
                    >
                      <Save className="mr-2" size={18} />
                      {isLoading ? "Saving..." : "Save Configuration"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Management Options */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-medium transition-smooth text-center animate-fade-in">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Manage Events</h3>
                <p className="text-sm text-muted-foreground">
                  Add, edit, or remove upcoming community events and workshops
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-medium transition-smooth text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Testimonials</h3>
                <p className="text-sm text-muted-foreground">
                  Review and publish community member testimonials
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-medium transition-smooth text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Quote className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Add Quotes</h3>
                <p className="text-sm text-muted-foreground">
                  Manage the rotating motivational quotes on the homepage
                </p>
              </div>
            </div>

            {/* Future Features */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/30 rounded-2xl p-8 animate-fade-in">
              <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Firebase Authentication integration
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Event CRUD operations
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Testimonial management system
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Quote rotation management
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Volunteer profile management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;
