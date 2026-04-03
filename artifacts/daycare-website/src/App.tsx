import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";

// Pages
import Home from "@/pages/Home";
import Programs from "@/pages/Programs";
import ProgramDetail from "@/pages/ProgramDetail";
import Enroll from "@/pages/Enroll";
import Staff from "@/pages/Staff";
import Gallery from "@/pages/Gallery";
import Events from "@/pages/Events";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Faq from "@/pages/Faq";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/programs" component={Programs} />
        <Route path="/programs/:id" component={ProgramDetail} />
        <Route path="/enroll" component={Enroll} />
        <Route path="/staff" component={Staff} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/events" component={Events} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/faq" component={Faq} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
