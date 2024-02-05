// Styles
import styles from "../styles/Footer.module.css";

// External
import type { FC } from "react";
import clsx from "clsx";

// Internal
import { donationAddress } from "../utils";

export const Footer: FC = () => {
  return (
    <footer className={clsx(styles.footer, "flex-col")}>
      <a
        href="https://twitter.com/Lambdalf_dev"
        rel="noopener noreferrer"
        target="_blank"
      >
        Created by @lambdalf_dev (DM for help!)
      </a>
      <span>Donation(s): {donationAddress}</span>
      <span className="text-sm mt-4">Made with ❤️ by your frens at OF</span>
    </footer>
  );
};

export default Footer;
