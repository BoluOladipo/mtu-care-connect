import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().split(" ")[0]; // HH:MM:SS

  // Mark past-date appointments as "missed"
  const { data: pastDate, error: err1 } = await supabase
    .from("appointments")
    .update({ status: "missed", notes: "Missed: student did not attend" })
    .eq("status", "scheduled")
    .lt("appointment_date", today)
    .select("id");

  // Mark today's past-time appointments as "missed"
  const { data: pastTime, error: err2 } = await supabase
    .from("appointments")
    .update({ status: "missed", notes: "Missed: student did not attend" })
    .eq("status", "scheduled")
    .eq("appointment_date", today)
    .lt("appointment_time", currentTime)
    .select("id");

  if (err1 || err2) {
    console.error("Error:", err1 || err2);
    return new Response(JSON.stringify({ error: (err1 || err2)?.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const total = (pastDate?.length ?? 0) + (pastTime?.length ?? 0);
  console.log(`Marked ${total} appointments as missed`);
  return new Response(JSON.stringify({ missed: total }), {
    status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
