import { useState, useMemo } from "react";
import { Search, FileText, CheckCircle, Eye, Calendar, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SummaryCard from "@/components/SummaryCard";
import { mockCases } from "@/data/mockCases";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const InvestigatorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [urgencySort, setUrgencySort] = useState("All");

  const activeCases = mockCases.filter(c => c.status === "Active").length;
  const solvedCases = mockCases.filter(c => c.status === "Solved").length;

  const filteredCases = useMemo(() => {
    let cases = mockCases.filter(caseItem => {
      const matchesSearch = 
        caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.victimName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || caseItem.status === statusFilter;
      
      const matchesUrgency = urgencySort === "All" || caseItem.urgency === urgencySort;

      // Date filter logic
      let matchesDate = true;
      if (dateFilter !== "All") {
        const assignedDate = new Date(caseItem.assignedDate);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - assignedDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch(dateFilter) {
          case "Today":
            matchesDate = daysDiff === 0;
            break;
          case "Last 7 Days":
            matchesDate = daysDiff <= 7;
            break;
          case "Last 30 Days":
            matchesDate = daysDiff <= 30;
            break;
          case "Older":
            matchesDate = daysDiff > 30;
            break;
        }
      }
      
      return matchesSearch && matchesStatus && matchesUrgency && matchesDate;
    });

    // Sort by urgency
    if (urgencySort !== "All") {
      const urgencyOrder = { "High": 1, "Medium": 2, "Low": 3 };
      cases.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);
    }

    return cases;
  }, [searchTerm, statusFilter, dateFilter, urgencySort]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Investigator Dashboard – Child Labour Cases
          </h1>
          <p className="text-muted-foreground">
            Manage and review child protection cases
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <SummaryCard
            title="Active Cases"
            count={activeCases}
            icon={FileText}
            variant="active"
          />
          <SummaryCard
            title="Solved Cases"
            count={solvedCases}
            icon={CheckCircle}
            variant="solved"
          />
        </div>

        {/* Search and Filter */}
        <div className="bg-card rounded-lg p-6 shadow-[var(--shadow-card)] mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Case ID, Location, or Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Cases</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Solved">Solved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Dates</SelectItem>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                  <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                  <SelectItem value="Older">Older than 30 Days</SelectItem>
                </SelectContent>
              </Select>
              <Select value={urgencySort} onValueChange={setUrgencySort}>
                <SelectTrigger className="w-full md:w-48">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Urgency Levels</SelectItem>
                  <SelectItem value="High">High Priority</SelectItem>
                  <SelectItem value="Medium">Medium Priority</SelectItem>
                  <SelectItem value="Low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Cases Table */}
        <div className="bg-card rounded-lg shadow-[var(--shadow-card)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Case ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Victim Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Urgency</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Assigned Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCases.map((caseItem) => (
                  <tr 
                    key={caseItem.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {caseItem.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {caseItem.victimName}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {caseItem.location}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        caseItem.urgency === "High" 
                          ? "bg-destructive/10 text-destructive" 
                          : caseItem.urgency === "Medium"
                          ? "bg-accent/10 text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {caseItem.urgency}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        caseItem.status === "Active" 
                          ? "bg-accent/10 text-accent" 
                          : "bg-secondary/30 text-primary"
                      }`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(caseItem.assignedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/case-details/${caseItem.id}`}>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No cases found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InvestigatorDashboard;
