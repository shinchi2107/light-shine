import { Mulish, Baloo_2 } from "next/font/google";
import "../../globals.css";
import HeaderOrder from "@/components/layout/order/header-order";
import ContainerWrapper from "@/components/common/container-wrapper";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const baloo_2 = Baloo_2({
  variable: "--font-baloo_2",
  subsets: ["latin"],
});
export default function OrderLayout({ children }) {
    return (
        <div>
            <HeaderOrder />
            <ContainerWrapper>
              {children}
            </ContainerWrapper>
        </div>
    )
}