import { Inter } from "@next/font/google";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={inter.className}>
      <ResponsiveAppBar />
    </div>
  );
}
