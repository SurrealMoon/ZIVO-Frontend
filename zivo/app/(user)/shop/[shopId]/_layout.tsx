// app/(user)/shop/[shopId]/_layout.tsx

import { Stack } from "expo-router";

export default function ShopLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
