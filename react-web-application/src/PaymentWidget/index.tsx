// Remote component
import React, { useState } from "react";
import CheckBox from "../components/CheckBox";
import RadioButton from "../components/RedioButton";
import Button from "../components/Button";
import UserData from "../components/UserData";
import { SWRConfig } from "swr";
import swrConfig from "../libs/swrConfig";
import ProductData from "../components/ProductData";
import MyComponent from "../components/MyComponent";

interface PaymentWidgetProps {
  onClickCallback: (data: { paymentMethod: string; acceptedTerms: boolean }) => void;
}

const PaymentWidget: React.FC<PaymentWidgetProps> = ({ onClickCallback }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

  const handleSubmit = () => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }
  
    if (!isChecked) {
      alert("Please accept terms");
      return;
    }
  
    onClickCallback({
      paymentMethod: selectedPayment,
      acceptedTerms: isChecked,
    });
  };

  return (
    // <SWRConfig value={swrConfig}>
    <div>
      <RadioButton value={selectedPayment} onChange={setSelectedPayment} />
      <CheckBox
        label="I agree to the"
        linkText="Terms and Conditions"
        linkUrl="https://example.com/terms"
        checked={isChecked}
        onChange={setIsChecked}
      />
      <Button type="submit" onClick={handleSubmit} label="Submit" />
      {/* <UserData></UserData> */}
     {/* <ProductData></ProductData> */}
     <MyComponent></MyComponent>
    </div>
    // </SWRConfig>
    
  );
};

export default PaymentWidget;
