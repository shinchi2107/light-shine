import "../../globals.css";
import HeaderOrder from "@/src/components/layout/order/header-order";
import ContainerWrapper from "@/src/components/common/container-wrapper";

export default function OrderLayout({ children }) {
    return (
        <div>
            <ContainerWrapper>
              {children}
            </ContainerWrapper>
        </div>
    )
}