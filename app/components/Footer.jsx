import Link from "next/link";
import React from "react";

import {
  PiCodeBold,
  PiGithubLogoLight,
} from "react-icons/pi";

import { RiTwitterXLine, RiGithubFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="justify-center gap-5 mt-14 font-bold flex flex-shrink-0 bottom-0 w-full h-full text-2xl">
      <Link href="https://twitter.com/Omegayon" target="_blank">
        <RiTwitterXLine />
      </Link>
      <Link href="https://clodron.com/" target="_blank">
        <PiCodeBold />
      </Link>
      <Link href="https://github.com/berkeguleryuz" target="_blank">
        <RiGithubFill />
      </Link>
    </div>
  );
};

export default Footer;
