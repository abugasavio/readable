import React from "react";

const Header = () => {
  return (
    <div>
      <section class="hero is-primary is-medium">
        <div class="hero-head">
          <nav class="navbar">
            <div class="container">
              <div class="navbar-brand">
                <a class="navbar-item">
                  <img
                    src="http://bulma.io/images/bulma-type-white.png"
                    alt="Logo"
                  />
                </a>
                <span
                  class="navbar-burger burger"
                  data-target="navbarMenuHeroA"
                >
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <div id="navbarMenuHeroA" class="navbar-menu">
                <div class="navbar-end">
                  <a class="navbar-item is-active">Home</a>
                  <a class="navbar-item">Examples</a>
                  <a class="navbar-item">Documentation</a>
                  <span class="navbar-item">
                    <a class="button is-primary is-inverted">
                      <span class="icon">
                        <i class="fa fa-github" />
                      </span>
                      <span>Download</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">Title</h1>
            <h2 class="subtitle">Subtitle</h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
