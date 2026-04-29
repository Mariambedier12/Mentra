export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch("https://mentraweb.runasp.net/api/Auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    console.log("STATUS:", res.status);
    console.log("BACKEND RAW:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }


    if (!res.ok) {
      return new Response(
        JSON.stringify({
          message:
            data?.message ||
            data?.errors?.[0] ||
            text ||
            "Account already exist",
        }),
        { status: res.status }
      );
    }


    return new Response(JSON.stringify(data), {
      status: 200,
    });

  } catch (err) {
    console.log("ROUTE ERROR:", err);

    return new Response(
      JSON.stringify({
        message: "Server crashed",
      }),
      { status: 500 }
    );
  }
}