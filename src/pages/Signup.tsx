import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

const DEPARTMENTS = [
  "Computer Science", "Information Technology", "Software Engineering", "Cyber Security",
  "Electrical Engineering", "Mechanical Engineering", "Civil Engineering",
  "Biochemistry", "Microbiology", "Physics", "Chemistry", "Mathematics",
  "Business Administration", "Accounting", "Economics",
  "Mass Communication", "International Relations",
  "Architecture", "Estate Management", "Building Technology",
];

const PROGRAMS = ["B.Sc.", "B.Tech.", "B.Eng.", "B.A.", "B.Arch."];
const LEVELS = ["100", "200", "300", "400", "500"];
const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const MATRIC_REGEX = /^(17|18|19|20|21|22|23|24|25)\d{9}$/;

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [program, setProgram] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const matricValid = MATRIC_REGEX.test(matricNumber);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.endsWith("@mtu.edu.ng")) {
      toast.error("Email must be an @mtu.edu.ng address");
      return;
    }

    if (!matricValid) {
      toast.error("Matric number must be 11 digits starting with 17-25");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!level || !department || !program) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(email, password, fullName);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Please check your @mtu.edu.ng email to verify your account.");
      navigate("/login");
    }
    setIsLoading(false);
  };

  const handleMatricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 11);
    setMatricNumber(val);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center space-y-4">
          <img src="/mtu-logo.png" alt="MTU" className="h-16 w-16 object-contain mx-auto" />
          <div>
            <CardTitle className="text-2xl font-bold">Student Registration</CardTitle>
            <CardDescription>Register with your MTU email address</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email (@mtu.edu.ng) *</Label>
              <Input id="email" type="email" placeholder="john.doe@mtu.edu.ng" value={email} onChange={(e) => setEmail(e.target.value)} required />
              {email && !email.endsWith("@mtu.edu.ng") && (
                <p className="text-xs text-destructive">Must use @mtu.edu.ng email</p>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="matricNumber">Matric Number (11 digits) *</Label>
                <Input
                  id="matricNumber"
                  placeholder="22010100001"
                  value={matricNumber}
                  onChange={handleMatricChange}
                  maxLength={11}
                  inputMode="numeric"
                  required
                />
                {matricNumber && !matricValid && (
                  <p className="text-xs text-destructive">Must be 11 digits starting with 17-25</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Level *</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                  <SelectContent>
                    {LEVELS.map((l) => (<SelectItem key={l} value={l}>{l} Level</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Department *</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => (<SelectItem key={d} value={d}>{d}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Program *</Label>
                <Select value={program} onValueChange={setProgram}>
                  <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
                  <SelectContent>
                    {PROGRAMS.map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Blood Type</Label>
                <Select value={bloodType} onValueChange={setBloodType}>
                  <SelectTrigger><SelectValue placeholder="Select blood type" /></SelectTrigger>
                  <SelectContent>
                    {BLOOD_TYPES.map((bt) => (<SelectItem key={bt} value={bt}>{bt}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Allergies</Label>
                <Input placeholder="e.g. Penicillin, Dust" value={allergies} onChange={(e) => setAllergies(e.target.value)} />
                <p className="text-xs text-muted-foreground">Comma-separated</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !email.endsWith("@mtu.edu.ng") || !matricValid}>
              {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating account...</>) : ("Create Account")}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </div>
          <div className="mt-2 text-center text-sm text-muted-foreground">
            Are you staff?{" "}
            <Link to="/signup/staff" className="text-primary font-medium hover:underline">Staff signup</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
