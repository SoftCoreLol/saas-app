import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LogoLoop from "@/components/LogoLoop";

const LandingPage = async () => {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }



  return (
    <>

      <div className="min-h-screen bg-transparent">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <div className="mb-8">
              <Image
                src="/images/logo.svg"
                alt="Converso Logo"
                width={120}
                height={120}
                className="mx-auto"
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Learn with AI-Powered Companions
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
              Experience personalized learning with our AI teaching platform.
              Interact with intelligent companions tailored to your learning needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-in" className="w-full sm:w-auto">
                <Button size="lg" className="px-8 py-3 text-lg w-full cursor-pointer">
                  Get Started
                </Button>
              </Link>

              <Link href="/#features" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg w-full">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-20 max-w-5xl mx-auto mb-16">
            <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Choose a Companion</h3>
                  <p className="text-muted-foreground">Select from our library of AI companions tailored to your learning objectives</p>
                </div>

                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
                  <p className="text-muted-foreground">Engage in personalized conversations and interactive lessons</p>
                </div>

                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                  <p className="text-muted-foreground">Monitor your learning journey with detailed analytics</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-muted rounded-xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Ready to Start Learning?</h2>
              <p className="text-muted-foreground text-center mb-6 max-w-2xl mx-auto">
                Join thousands of students who are already learning with our AI companions
              </p>
            </div>
          </div>
          <LogoLoop logos={[]}/>
        </div>
      </div>

    </>
  );
};

export default LandingPage;