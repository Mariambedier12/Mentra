export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      "https://mentraweb.runasp.net/api/Auth/verify-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return Response.json(
      { message: "Route crashed", error: String(err) },
      { status: 500 }
    );
  }
}