import MyOrdersContentSection from "../Components/MyOrderComponent/MyOrderContentSection";
import MyOrderHero from "../Components/MyOrderComponent/MyOrderHero";

const MyOrders = () => {
  return (
    <>
      <MyOrderHero title="My Orders" currentPage="My Orders" />

      <MyOrdersContentSection />
    </>
  );
};

export default MyOrders;
