import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { globalHistory } from "@reach/router";
import Navigation from "./Navigation";
import ScreenMode from "../components/ScreenMode";
import VegaLogo from "../components/Svg/VegaLogo";
import MobileMenu from "../components/Navigation/MobileMenu";
import MobileMenuButton from "../components/Navigation/MobileMenuButton";
import HeaderCta from "../components/HeaderCta";
// import SiteBanner from "../components/SiteBanner";

import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);

    if (menuIsOpen) {
      enableBodyScroll(document.querySelector("#mobileMenu"));
    } else {
      disableBodyScroll(document.querySelector("#mobileMenu"));
    }
  };

  useEffect(() => {
    return globalHistory.listen(({ action }) => {
      enableBodyScroll(document.querySelector("#mobileMenu"));
    });
  }, []);

  return (
    <div>
      {/* <SiteBanner /> */}

      <header className="relative z-30" id="header">
        <div className="px-4 w-full md:px-6 lg:px-8">
          <div className="header flex items-center justify-between py-4 lg:pt-6">
            <Link to="/">
              <VegaLogo />
            </Link>

            <Navigation />

            <div className="flex items-center">
              {!menuIsOpen && (
                <HeaderCta
                  link="https://console.fairground.wtf/"
                  text="Trade (Testnet)"
                  className="hidden md:block lg:hidden mr-3"
                />
              )}

              <MobileMenu toggleMenu={toggleMenu} isOpen={menuIsOpen} />

              <div className="flex items-center">
                <ScreenMode />
                <MobileMenuButton open={menuIsOpen} toggleMenu={toggleMenu} />

                {!menuIsOpen && (
                  <HeaderCta
                    link="https://console.fairground.wtf/"
                    text="Trade (Testnet)"
                    className="ml-3 hidden lg:block"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
