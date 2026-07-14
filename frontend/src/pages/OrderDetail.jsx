import React from "react";
import MyOrderHero from "../Components/MyOrderComponent/MyOrderHero";
import OrderDetailContentSection from "../Components/OrderDetailComponent/OrderDetailContentSection";

function OrderDetail() {
  return (
    <div>
      <MyOrderHero title="My Orders" currentPage="Order Detail page" />

      <OrderDetailContentSection />
    </div>
  );
}

export default OrderDetail;
