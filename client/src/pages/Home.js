import React from "react";
import { Container } from "../components/Grid";
import CookieModal from "../components/CookieModal";

function Home() {
  return (<div>
    <Container fluid>
      <div className="intro-block">
        <h1> Welcome to Weather Wear!</h1>
        <p>An application that gives clothing recommendations based on the weather forecast and your preferences</p>
      </div>

    </Container>
    <CookieModal/>
    </div>
  );
}
export default Home;



