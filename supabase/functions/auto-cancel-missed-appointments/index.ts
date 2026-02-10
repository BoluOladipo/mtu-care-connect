import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().split(" ")[0]; // HH:MM:SS

  // Cancel appointments that are scheduled but whose date/time has passed
  const { data, error } = await supabase
    .from("appointments")
    .update({ status: "cancelled", notes: "Auto-cancelled: student missed appointment" })
    .eq("status", "scheduled")
    .or(`appointment_date.lt.${today},and(appointment_date.eq.${today},appointment_time.lt.${currentTime})`)
    .select("id");

  if (error) {
    console.error("Error cancelling missed appointments:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  console.log(`Auto-cancelled ${data?.length ?? 0} missed appointments`);
  return new Response(JSON.stringify({ cancelled: data?.length ?? 0 }), { status: 200 });
});
