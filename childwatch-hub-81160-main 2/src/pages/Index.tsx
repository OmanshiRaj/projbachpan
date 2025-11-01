import { Shield, FileText, Users, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Child Protection Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            A comprehensive system for managing and investigating child labour complaints. 
            Working together to protect children's rights and ensure their safety.
          </p>
          <Link to="/investigator-dashboard">
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              <FileText className="h-5 w-5" />
              Access Investigator Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card rounded-lg p-8 shadow-[var(--shadow-card)] text-center">
            <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-4">
              <FileText className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Case Management</h3>
            <p className="text-muted-foreground">
              Efficiently track and manage all child labour cases from report to resolution.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-[var(--shadow-card)] text-center">
            <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-4">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Investigator Tools</h3>
            <p className="text-muted-foreground">
              Powerful tools for investigators to analyze evidence and build comprehensive case reports.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-[var(--shadow-card)] text-center">
            <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-4">
              <AlertCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Real-time Tracking</h3>
            <p className="text-muted-foreground">
              Monitor case progress and status updates in real-time for faster resolution.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-4xl font-bold mb-2">12</p>
              <p className="text-primary-foreground/80">Active Cases</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">34</p>
              <p className="text-primary-foreground/80">Cases Resolved</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">5</p>
              <p className="text-primary-foreground/80">Active Investigators</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
