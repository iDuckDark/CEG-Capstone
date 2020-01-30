import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Logo from "../images/favicon.png"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi everyone! </h1>
    <p>Welcome to our CEG Captone Dashboard</p>
    <p>We are gonna build something great!</p>
    <p>Members: Divyang, Paul, Peter, Nevin</p>
    <div
      style={{
        textAlign: "center",
      }}
    >
      <img
        src={Logo}
        style={{
          maxWidth: `300px`,
          marginBottom: `1.45rem`,
          borderRadius: "20%",
        }}
        alt="logo"
      />
    </div>

    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

export default IndexPage
