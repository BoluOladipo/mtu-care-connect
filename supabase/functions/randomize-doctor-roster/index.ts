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

    // Delete all existing schedules
    const { error: deleteError } = await supabase
      .from("doctor_schedules")
      .delete()
      .in("doctor_id", doctorIds);

    if (deleteError) throw deleteError;

    // Randomize: each doctor gets 3-5 random days, with random shift times
    const shifts = [
      { start: "08:00", end: "14:00" },
      { start: "10:00", end: "16:00" },
      { start: "08:00", end: "16:00" },
      { start: "09:00", end: "15:00" },
      { start: "07:00", end: "13:00" },
    ];

    const newSchedules: Array<{
      doctor_id: string;
      day_of_week: number;
      start_time: string;
      end_time: string;
      is_available: boolean;
    }> = [];

    for (const doctorId of doctorIds) {
      // Random number of duty days (3-5)
      const numDays = 3 + Math.floor(Math.random() * 3);
      
      // Shuffle days 0-6 and pick numDays
      const allDays = [0, 1, 2, 3, 4, 5, 6];
      for (let i = allDays.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allDays[i], allDays[j]] = [allDays[j], allDays[i]];
      }
      const dutyDays = allDays.slice(0, numDays);

      for (const day of dutyDays) {
        const shift = shifts[Math.floor(Math.random() * shifts.length)];
        newSchedules.push({
          doctor_id: doctorId,
          day_of_week: day,
          start_time: shift.start,
          end_time: shift.end,
          is_available: true,
        });
      }
    }

    const { error: insertError } = await supabase
      .from("doctor_schedules")
      .insert(newSchedules);

    if (insertError) throw insertError;

    // Create a notification about the roster change
    const { error: notifError } = await supabase.from("notifications").insert({
      type: "roster",
      title: "Monthly Roster Updated",
      message: `Doctor duty roster has been automatically randomized for ${new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}. ${doctorIds.length} doctors assigned.`,
      user_id: null,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Roster randomized for ${doctorIds.length} doctors`,
        schedulesCreated: newSchedules.length,
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
