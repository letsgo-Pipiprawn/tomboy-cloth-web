type WishlistCountResponse = {
  count: number;
  goal: number;
};

export async function fetchWishlistCount(slug: string): Promise<WishlistCountResponse | null> {
  try {
    const res = await fetch(`/api/wishlist/signup?slug=${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    return (await res.json()) as WishlistCountResponse;
  } catch {
    return null;
  }
}
