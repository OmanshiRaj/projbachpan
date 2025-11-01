import { Shield, MapPin, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Shield className="h-8 w-8" />
            <span className="text-xl font-bold">Child Protection Platform</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/investigator-dashboard" className="hover:opacity-80 transition-opacity">
              Dashboard
            </Link>
            <div className="flex items-center gap-4 pl-4 border-l border-primary-foreground/20">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary font-semibold">
                  JD
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">John Doe</span>
                  <div className="flex items-center gap-1 text-xs opacity-80">
                    <MapPin className="h-3 w-3" />
                    <span>Mumbai, Maharashtra</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="gap-2 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
