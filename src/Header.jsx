import React from "react";

function Header() {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-1">
        <img
          src="/globe_24dp_8C1AF6_FILL0_wght400_GRAD0_opsz24.svg"
          alt="Logo"
          className="w-6 h-6"
        />
        <h3 className="font-bold text-lg text-[#8C1AF6] ">roamla</h3>
      </div>
      <div>Sign In</div>
    </div>
  );
}

export default Header;
