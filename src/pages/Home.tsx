import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, FileText } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              College Lost & Found Portal
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A platform for students to report and find lost items within the college. 
              Post what you've lost or found, and help each other recover belongings easily.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/items">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <Search className="w-5 h-5" />
                  View Lost & Found Items
                </Button>
              </Link>
              
              <Link to="/post">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                  <FileText className="w-5 h-5" />
                  Post an Item
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              <div className="p-6 rounded-lg bg-card border hover:border-primary transition-colors">
                <h3 className="font-semibold text-lg mb-2">Report Lost Items</h3>
                <p className="text-sm text-muted-foreground">
                  Lost something? Create a post with details to help others identify your item.
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-card border hover:border-primary transition-colors">
                <h3 className="font-semibold text-lg mb-2">Post Found Items</h3>
                <p className="text-sm text-muted-foreground">
                  Found an item? Help reunite it with its owner by posting it here.
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-card border hover:border-primary transition-colors">
                <h3 className="font-semibold text-lg mb-2">Connect & Recover</h3>
                <p className="text-sm text-muted-foreground">
                  Browse posts and contact fellow students to recover lost belongings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
