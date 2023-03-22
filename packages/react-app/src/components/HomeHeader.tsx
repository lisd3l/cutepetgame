import React from "react";

export default function HomeHeader() {
  return (
    <header>
      <div className="header home-header">
        <nav className="home-nav">
          <a href="#rules">Rules</a>
          <a href="#bouns">Bouns</a>
          <a href="#faireness">Fairness</a>
          <a href="#community">community</a>
          <a href="#rodemap">RodeMap</a>
          <a href="#mywallet">MYWallet</a>
          <a href="/mint">Mint</a>
        </nav>
      </div>
    </header>
  );
}
