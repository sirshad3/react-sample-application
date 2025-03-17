import React from "react";
import '../Footer/Footer.css'

const Footer = () => {
    return (
        <>
        <div className="mainFooter">
        <p className="footerVersion" ><span id="copyRightTxt" style={{float:'inline-start'}}> © 2025 Pfizer Inc. All Rights Reserved. </span>
        <span id="versionTxt" style={{float:'inline-end'}}> Version: 1.0 </span></p>
        </div>
    </>
    );
};
export default Footer;
