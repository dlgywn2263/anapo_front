import MainBanner from "@/MainBanner";
import MainOffer from "@/MainOffer";
import { MessageCircle } from "lucide-react";
const Page = () => {
  return (
    <section className="relative">
      <MainBanner />
      <MainOffer />

      {/* <MessageCircle
        size={"70px"}
        color="#5CA0FF"
        className="absolute right-20 bottom-[70px]"
      /> */}
    </section>
  );
};

export default Page;
