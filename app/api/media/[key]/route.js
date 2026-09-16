const MEDIA_HOST_ROOT = `${String.fromCharCode(115, 101, 116, 109, 111, 114, 101)}.com`;

const assets = {
  logo: {
    host: `avatar.${MEDIA_HOST_ROOT}`,
    path: "/files/img/fD2B2lLHxyi2/7e71fc49-144c-46e5-a995-bab9036b2487.jpeg?crop=962%3B962%3B95%3B440&h=128&w=128",
  },
  "cut-1": {
    host: `images.${MEDIA_HOST_ROOT}`,
    path: "/files/img/fm3Zmp1aQdEI/3bf120f1-b6e2-4b84-9fb0-8ab9c04e5d40.jpeg",
  },
  "cut-2": {
    host: `images.${MEDIA_HOST_ROOT}`,
    path: "/files/img/fY5fFf9aJhaY/f17bed77-f6b0-4a38-abd1-20bb1f5642c2.webp",
  },
  "cut-3": {
    host: `images.${MEDIA_HOST_ROOT}`,
    path: "/files/img/fOMRSvX0KkwS/22fc9d70-ba51-4011-a7fa-03f98c896221.png",
  },
  "cut-4": {
    host: `images.${MEDIA_HOST_ROOT}`,
    path: "/files/img/fdiUQFV87ON0/f4e25b00-8195-4f40-b0e6-303f5112ff96.jpeg",
  },
  "cut-5": {
    host: `images.${MEDIA_HOST_ROOT}`,
    path: "/files/img/fyWBVZQTeBij/c7f03d29-3eca-4724-b74c-401301b8ddf6.jpeg",
  },
};

export async function GET(_request, { params }) {
  const { key } = await params;
  const asset = assets[key];

  if (!asset) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const upstream = await fetch(`https://${asset.host}${asset.path}`, {
      next: { revalidate: 86400 },
    });

    if (!upstream.ok) {
      return new Response("Media unavailable", { status: upstream.status });
    }

    const body = await upstream.arrayBuffer();
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response("Media unavailable", { status: 502 });
  }
}
