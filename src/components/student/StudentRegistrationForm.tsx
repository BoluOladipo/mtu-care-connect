import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Loader2, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface StudentRegistrationFormProps {
  onRegistered: () => void;
}

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const MATRIC_REGEX = /^(17|18|19|20|21|22|23|24|25)\d{9}$/;

const StudentRegistrationForm = ({ onRegistered }: StudentRegistrationFormProps) => {
  const { user, profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    student_id: "",
    first_name: profile?.full_name?.split(" ")[0] || "",
    last_name: profile?.full_name?.split(" ").slice(1).join(" ") || "",
    date_of_birth: "",
    gender: "",
    faculty: "",
    level: "",
    phone: "",
    blood_type: "",
    allergies: "",
  });

  const matricValid = MATRIC_REGEX.test(formData.student_id);

  const handleMatricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 11);
    setFormData({ ...formData, student_id: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;

    if (!matricValid) {
      toast.error("Matric number must be 11 digits starting with 17-25");
      return;
    }

    setIsSubmitting(true);
    try {
      const allergiesArray = formData.allergies
        ? formData.allergies.split(",").map((a) => a.trim()).filter(Boolean)
        : null;

      const { error } = await supabase.from("patients").insert({
        student_id: formData.student_id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        date_of_birth: formData.date_of_birth,
        gender: formData.gender,
        faculty: formData.faculty,
        level: formData.level,
        phone: formData.phone || null,
        email: user.email,
        blood_type: formData.blood_type || null,
        allergies: allergiesArray,
      });

      if (error) throw error;
      toast.success("Registration successful! You can now book appointments.");
      onRegistered();
    } catch (error: any) {
      toast.error(`Registration failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-primary" />
          Complete Your Registration
        </CardTitle>
        <CardDescription>Fill in your details to register as a patient.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Matric Number (11 digits) *</Label>
              <Input
                placeholder="22010100001"
                value={formData.student_id}
                onChange={handleMatricChange}
                maxLength={11}
                inputMode="numeric"
                required
              />
              {formData.student_id && !matricValid && (
                <p className="text-xs text-destructive">Must be 11 digits starting with 17-25</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>First Name *</Label>
              <Input value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Last Name *</Label>
              <Input value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Date of Birth *</Label>
              <Input type="date" value={formData.date_of_birth} onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Gender *</Label>
              <Select value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Faculty *</Label>
              <Select value={formData.faculty} onValueChange={(v) => setFormData({ ...formData, faculty: v })}>
                <SelectTrigger><SelectValue placeholder="Select faculty" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Environmental">Environmental</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Level *</Label>
              <Select value={formData.level} onValueChange={(v) => setFormData({ ...formData, level: v })}>
                <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                <SelectContent>
                  {["100", "200", "300", "400", "500"].map((l) => (
                    <SelectItem key={l} value={l}>{l} Level</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Blood Type</Label>
              <Select value={formData.blood_type} onValueChange={(v) => setFormData({ ...formData, blood_type: v })}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {BLOOD_TYPES.map((bt) => (<SelectItem key={bt} value={bt}>{bt}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Allergies</Label>
              <Input placeholder="e.g. Penicillin, Dust (comma-separated)" value={formData.allergies} onChange={(e) => setFormData({ ...formData, allergies: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Phone (Optional)</Label>
              <Input type="tel" placeholder="08012345678" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting || !matricValid}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register & Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentRegistrationForm;
