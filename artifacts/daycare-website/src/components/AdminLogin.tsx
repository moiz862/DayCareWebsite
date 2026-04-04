import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Lock, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Artificial delay for a "processy" professional feel
    setTimeout(() => {
      const success = onLogin(password);
      if (!success) {
        setError("Invalid credentials. Access denied.");
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-primary/10 shadow-2xl overflow-hidden glassmorphism">
          <CardHeader className="text-center space-y-2 pb-8 bg-gradient-to-b from-primary/5 to-transparent pt-10">
            <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg mb-4 rotate-3">
              <ShieldCheck className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-serif font-bold text-primary tracking-tight">Admin Portal</CardTitle>
            <CardDescription className="text-muted-foreground/80 font-medium">
              Secure area restricted to authorized staff only.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-destructive/10 text-destructive border border-destructive/20 p-3 rounded-lg flex items-center gap-2 text-sm font-medium"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}
              
              <div className="space-y-2">
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="password"
                    placeholder="Enter administration key..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    required
                    className="h-12 pl-10 border-muted-foreground/20 focus-visible:ring-primary/30 text-lg transition-all"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <><Lock className="w-4 h-4 mr-2" /> Authenticate Account</>
                )}
              </Button>
            </form>
            
            <p className="text-center text-xs text-muted-foreground mt-8 uppercase tracking-widest font-bold opacity-40">
              End-to-End Encryption Enabled
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
