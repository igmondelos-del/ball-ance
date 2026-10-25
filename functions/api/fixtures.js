export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json(
      { error: "Δώσε ημερομηνία με μορφή YYYY-MM-DD" },
      { status: 400 }
    );
  }

  if (!env.API_SPORTS_KEY) {
    return Response.json(
      { error: "Δεν έχει ρυθμιστεί το API key στο Pages" },
      { status: 500 }
    );
  }

  const response = await fetch(
    `https://v3.football.api-sports.io/fixtures?date=${date}`,
    {
      headers: {
        "x-apisports-key": env.API_SPORTS_KEY
      }
    }
  );

  const data = await response.json();

  return Response.json(data, {
    status: response.ok ? 200 : response.status
  });
}
