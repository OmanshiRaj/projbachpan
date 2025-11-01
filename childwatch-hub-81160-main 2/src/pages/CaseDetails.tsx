import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, FileText, CheckCircle, Sparkles, Upload, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockCases } from "@/data/mockCases";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const CaseDetails = () => {
  const { caseId } = useParams();
  const { toast } = useToast();
  const caseData = mockCases.find(c => c.id === caseId);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ url: string; type: string; name: string }>>([]);

  if (!caseData) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Case Not Found</h1>
            <Link to="/investigator-dashboard">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleMarkSolved = () => {
    toast({
      title: "Case Status Updated",
      description: `Case ${caseData.id} has been marked as solved.`,
    });
  };

  const handleAIInvestigation = () => {
    toast({
      title: "AI Investigation Started",
      description: "Analyzing case details and evidence...",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 20MB limit`,
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedFiles(prev => [...prev, {
            url: e.target!.result as string,
            type: file.type.startsWith('video') ? 'video' : 'image',
            name: file.name
          }]);
        }
      };
      reader.readAsDataURL(file);
    });

    toast({
      title: "Evidence Uploaded",
      description: `${files.length} file(s) added to evidence`,
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/investigator-dashboard">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Case Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Case Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{caseData.id}</h2>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    caseData.status === "Active" 
                      ? "bg-accent/10 text-accent" 
                      : "bg-secondary/30 text-primary"
                  }`}>
                    {caseData.status}
                  </span>
                </div>
                {caseData.status === "Active" && (
                  <div className="flex gap-2">
                    <Button onClick={handleAIInvestigation} variant="outline" className="gap-2 border-primary/50 hover:bg-primary/10">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Investigate
                    </Button>
                    <Button onClick={handleMarkSolved} className="gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Mark as Solved
                    </Button>
                  </div>
                )}
              </div>

              {caseData.progressPercentage !== undefined && caseData.status === "Active" && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">Investigation Progress</span>
                    <span className="text-sm text-muted-foreground">{caseData.progressPercentage}%</span>
                  </div>
                  <Progress value={caseData.progressPercentage} className="h-2" />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">{caseData.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Report Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(caseData.reportDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Description</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {caseData.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Evidence & Case Info */}
          <div className="space-y-6">
            {/* Evidence Section */}
            <div className="bg-card rounded-lg p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Reported Evidence
              </h3>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    id="evidence-upload"
                    className="hidden"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="evidence-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">
                      Upload evidence
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      Images/Videos (Max 20MB)
                    </p>
                  </label>
                </div>

                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden bg-muted border border-border">
                      {file.type === 'image' ? (
                        <img src={file.url} alt={file.name} className="w-full h-48 object-cover" />
                      ) : (
                        <video src={file.url} className="w-full h-48 object-cover" controls />
                      )}
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white text-xs p-3">
                        <p className="truncate font-medium">{file.name}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {uploadedFiles.length === 0 && (
                  <p className="text-center text-xs text-muted-foreground py-3">
                    No evidence uploaded
                  </p>
                )}
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-semibold text-foreground mb-4">Case Summary</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs font-medium text-muted-foreground mb-1">Victim Name</dt>
                  <dd className="text-sm font-medium text-foreground">{caseData.victimName}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground mb-1">Assigned Date</dt>
                  <dd className="text-sm font-medium text-foreground">
                    {new Date(caseData.assignedDate).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground mb-1">Case Priority</dt>
                  <dd className="text-sm font-medium text-accent">High</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground mb-1">Assigned Investigator</dt>
                  <dd className="text-sm font-medium text-foreground">John Doe</dd>
                </div>
              </dl>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-foreground">Case Assigned</p>
                  <p className="text-xs text-muted-foreground">{new Date(caseData.assignedDate).toLocaleDateString()}</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">Report Filed</p>
                  <p className="text-xs text-muted-foreground">{new Date(caseData.reportDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseDetails;
