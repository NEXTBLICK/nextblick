import React, { useState } from "react"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"

import Header from "./header"
import Footer from "./footer"
import Menu from "./menu"

import "../assets/style.css"

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuButtonToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <Wrapper
      css={
        isMenuOpen &&
        css`
          &:before {
            opacity: 0.5;
            visibility: visible;
          }
        `
      }
    >
      <Global
        styles={css`
          body {
            font-size: 20px;
            font-family: "Nunito Sans", sans-serif;
            font-weight: 200;
          }
          h1,
          h2.large {
            font-size: 2.75rem;
            font-weight: 600;
            line-height: 1.3;
            margin-bottom: 1rem;
            @media screen and (min-width: 768px) {
              font-size: 3.75rem;
              margin-bottom: 0;
            }
          }
          h1,
          h2 {
            &.small {
              font-size: 1rem;
              text-transform: uppercase;
              margin-bottom: 0.5rem;
              opacity: 0.8;
              @media screen and (min-width: 768px) {
                font-size: 1.2rem;
              }
            }
          }
          h2,
          h3.large {
            font-size: 2rem;
            font-weight: 200;
            line-height: 1.3;
            margin-bottom: 3rem;
            @media screen and (min-width: 768px) {
              font-size: 3rem;
            }
          }
          h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }
          p {
            margin-bottom: 1rem;
          }
          ul {
            list-style: none;
            padding-bottom: 1rem;
            li {
              margin-bottom: 1rem;
            }
          }
          address {
            font-style: normal;
            margin-bottom: 2rem;
          }
          hr {
            opacity: 0.2;
          }
          .intro {
            max-width: 960px;
            margin-bottom: 2rem;
          }
          .button {
            border: 2px solid #818592;
            padding: 0.5rem 1.5rem;
            font-size: 0.9rem;
            font-weight: 600;
            text-transform: uppercase;
            transition: all 0.3s ease-in-out;
            position: relative;
            cursor: pointer;
            &:focus,
            &:hover {
              border-color: #fff;
              color: #000;
              a {
                position: relative;
                z-index: 1;
              }
              &::after {
                height: 100%;
              }
            }
            &::after {
              content: "";
              position: absolute;
              left: 0;
              bottom: 0;
              height: 0;
              width: 100%;
              background-color: #fff;
              transition: all 0.3s ease-in-out;
              z-index: 0;
            }
          }
        `}
      />
      <Header
        isMenuOpen={isMenuOpen}
        handleMenuButtonToggle={handleMenuButtonToggle}
      />
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Main>{children}</Main>
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #040c26;
    opacity: 0;
    visibility: hidden;
    z-index: 9;
    transition: all 0.3s ease-in-out;
  }
`

const Main = styled.main``

export default Layout
