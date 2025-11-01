import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/FileUpload';
import { LocationTracker } from '@/components/LocationTracker';
import heroBanner from '@/assets/hero-banner.jpg';

const formSchema = z.object({
  labourType: z.string().min(1, 'Please select a type of child labour'),
  age: z.coerce.number().min(5, 'Age must be at least 5').max(17, 'Age must be 17 or younger'),
  description: z.string().min(10, 'Please provide at least 10 characters of description').max(1000, 'Description must be less than 1000 characters'),
  email: z.string().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
});

type FormValues = z.infer<typeof formSchema>;

const Index = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      labourType: '',
      age: undefined,
      description: '',
      email: '',
    },
  });

  

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Validate files
    if (files.length === 0) {
      toast({
        title: 'Files Required',
        description: 'Please upload at least one photo or video.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    // Validate location
    if (!location) {
      toast({
        title: 'Location Required',
        description: 'Please enable location access to submit your report.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate submission (replace with actual backend call)
    setTimeout(() => {
      console.log('Report submitted:', { ...data, files, location });
      
      toast({
        title: 'Report Submitted Successfully',
        description: 'Thank you for your report. Our team will review it shortly.',
      });

      // Reset form
      form.reset();
      setFiles([]);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroBanner} 
            alt="Children's Rights Protection" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Shield className="h-12 w-12 text-primary" />
              <Heart className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Report Child Labour – Help Us Protect Children
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Your report helps organizations take immediate action to protect children from exploitation. 
              Every submission is confidential and reviewed by our dedicated team to ensure child safety 
              and wellbeing.
            </p>
          </div>
        </div>
      </header>

      {/* Main Form Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border-2 border-border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* File Upload Section */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Upload Evidence</h2>
                  <p className="text-muted-foreground mb-4">
                    Please upload photos or videos that document the situation.
                  </p>
                  <FileUpload onFilesChange={setFiles} />
                </div>

                {/* Report Details */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Report Details</h2>

                  <FormField
                    control={form.control}
                    name="labourType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Child Labour</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type of labour" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="domestic">Domestic Work</SelectItem>
                            <SelectItem value="factory">Factory</SelectItem>
                            <SelectItem value="street">Street Vending</SelectItem>
                            <SelectItem value="construction">Construction</SelectItem>
                            <SelectItem value="agriculture">Agriculture</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Approximate Age of Child</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter age (5-17)" 
                            min={5} 
                            max={17}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Please provide the approximate age of the child involved.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe what you witnessed, including location details, working conditions, or any other relevant information..."
                            className="min-h-32 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide as much detail as possible to help our team investigate.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          We may need to contact you for additional information.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Location Tracking */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Location Information</h2>
                  <LocationTracker onLocationChange={setLocation} />
                </div>

                {/* Privacy Notice */}
                <div className="bg-muted/50 rounded-lg p-6 border-2 border-border">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Confidentiality
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your information is strictly confidential. We collect your email and location solely 
                    for investigation purposes and to verify the authenticity of reports. Your data will 
                    never be shared with unauthorized parties and is protected under our strict privacy policy.
                  </p>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
                </Button>
              </form>
            </Form>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              For urgent cases involving immediate danger, please contact local authorities or 
              emergency services directly.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
