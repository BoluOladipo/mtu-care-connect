import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Get all doctors
    const { data: doctorRoles, error: rolesError } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "doctor");

    if (rolesError) throw rolesError;
    if (!doctorRoles || doctorRoles.length === 0) {
      return new Response(JSON.stringify({ message: "No doctors found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const doctorIds = doctorRoles.map((r) => r.user_id);

    // Delete all existing schedules for these doctors
    const { error: deleteError } = await supabase
      .from("doctor_schedules")
      .delete()
      .in("doctor_id", doctorIds);
    if (deleteError) throw deleteError;

    // Strategy: 2 doctors per day (morning 8-14, night 14-20)
    // Each doctor should have 1-2 days off per week
    const days = [0, 1, 2, 3, 4, 5, 6];
    const newSchedules: any[] = [];

    if (doctorIds.length === 1) {
      // Single doctor: works all days, full shift
      for (const day of days) {
        newSchedules.push({
          doctor_id: doctorIds[0],
          day_of_week: day,
          start_time: "08:00",
          end_time: "20:00",
          is_available: true,
        });
      }
    } else {
      // Shuffle doctors
      const shuffled = [...doctorIds].sort(() => Math.random() - 0.5);
      const assignCount: Record<string, number> = {};
      doctorIds.forEach((id) => { assignCount[id] = 0; });

      // Cap at 5-6 shifts per doctor to ensure days off
      const maxShifts = Math.min(6, Math.ceil(14 / doctorIds.length));

      for (const day of days) {
        // Morning shift
        const availMorning = shuffled
          .filter((id) => assignCount[id] < maxShifts)
          .sort((a, b) => assignCount[a] - assignCount[b]);
        
        const morningDoc = availMorning[0];
        if (morningDoc) {
          newSchedules.push({
            doctor_id: morningDoc,
            day_of_week: day,
            start_time: "08:00",
            end_time: "14:00",
            is_available: true,
          });
          assignCount[morningDoc]++;
        }

        // Night shift - different doctor
        const availNight = shuffled
          .filter((id) => id !== morningDoc && assignCount[id] < maxShifts)
          .sort((a, b) => assignCount[a] - assignCount[b]);

        const nightDoc = availNight[0] || shuffled.find((id) => id !== morningDoc) || shuffled[0];
        if (nightDoc) {
          newSchedules.push({
            doctor_id: nightDoc,
            day_of_week: day,
            start_time: "14:00",
            end_time: "20:00",
            is_available: true,
          });
          if (nightDoc !== morningDoc) assignCount[nightDoc]++;
        }
      }
    }

    const { error: insertError } = await supabase
      .from("doctor_schedules")
      .insert(newSchedules);
    if (insertError) throw insertError;

    // Create notification
    await supabase.from("notifications").insert({
      type: "roster",
      title: "Monthly Roster Updated",
      message: `Doctor duty roster randomized for ${new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}. ${doctorIds.length} doctors, ${newSchedules.length} shifts assigned.`,
      user_id: null,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Roster randomized: ${newSchedules.length} shifts for ${doctorIds.length} doctors`,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
