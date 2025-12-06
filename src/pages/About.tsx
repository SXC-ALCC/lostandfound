import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold mb-8">About This Portal</h1>

          <Card>
            <CardHeader>
              <CardTitle>Purpose</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The College Lost & Found Portal is designed to help students easily recover lost items 
                and return found items to their rightful owners. By creating a centralized platform, 
                we make it simple for students to post what they've lost or found, browse through items, 
                and connect with each other.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold mb-1">1. Post an Item</h3>
                <p className="text-sm text-muted-foreground">
                  Fill out a simple form with details about the lost or found item, including a photo if available.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">2. Admin Approval</h3>
                <p className="text-sm text-muted-foreground">
                  All posts are reviewed by administrators to ensure quality and prevent spam.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">3. Browse & Connect</h3>
                <p className="text-sm text-muted-foreground">
                  Search through approved posts and contact the poster directly via email to recover items.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Posting Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Provide accurate and detailed descriptions of items</li>
                <li>Include a clear photo when possible</li>
                <li>Use your college email address for verification</li>
                <li>No spam or irrelevant posts</li>
                <li>Be respectful and honest in all interactions</li>
              </ul>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default About;
