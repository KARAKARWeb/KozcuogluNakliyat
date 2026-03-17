import PricingCalculator from "@/components/site/pricing-calculator";
import EmbedWrapper from "@/components/site/embed-wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nakliyat Fiyat Hesaplama | Kozcuoğlu Nakliyat",
  robots: { index: false, follow: false },
};

export default function EmbedFiyatHesaplamaPage() {
  return (
    <EmbedWrapper>
      <div className="mx-auto max-w-4xl p-2">
        <PricingCalculator isEmbed={true} />
      </div>
    </EmbedWrapper>
  );
}
