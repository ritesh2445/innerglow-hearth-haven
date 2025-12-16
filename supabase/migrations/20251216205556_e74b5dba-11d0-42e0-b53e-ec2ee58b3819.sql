-- Create founders table
CREATE TABLE public.founders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.founders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active founders"
ON public.founders
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can insert founders"
ON public.founders
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update founders"
ON public.founders
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete founders"
ON public.founders
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at using existing function
CREATE TRIGGER update_founders_updated_at
BEFORE UPDATE ON public.founders
FOR EACH ROW
EXECUTE FUNCTION public.update_timestamp();

-- Create storage bucket for founder images
INSERT INTO storage.buckets (id, name, public) VALUES ('founder-images', 'founder-images', true);

-- Create storage policies for founder images
CREATE POLICY "Anyone can view founder images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'founder-images');

CREATE POLICY "Admins can upload founder images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'founder-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update founder images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'founder-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete founder images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'founder-images' AND has_role(auth.uid(), 'admin'::app_role));