import React from "react"
import Img from "gatsby-image"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { Box, Flex } from "@chakra-ui/core"

import Section from "../components/section"

export default ({ bgColor, text, image, imagePosition }) => {
  return (
    <Section
      bg={bgColor}
      css={css`
        overflow: hidden;
      `}
    >
      <Flex
        flexDirection={[
          "column-reverse",
          "",
          "",
          "",
          imagePosition === "right" ? "row" : "row-reverse",
        ]}
      >
        <Box dangerouslySetInnerHTML={{ __html: text }} maxW="500px" />
        <Box
          w="100%"
          css={
            imagePosition === "right"
              ? css`
                  @media screen and (min-width: 1280px) {
                    margin-left: 4rem;
                  }
                `
              : css`
                  @media screen and (min-width: 1280px) {
                    margin-right: 4rem;
                  }
                `
          }
        >
          {image && <Image fixed={image.localFile.childImageSharp.fixed} />}
        </Box>
      </Flex>
    </Section>
  )
}

const Image = styled(Img)`
  width: 100% !important;
  margin-bottom: 3rem;
  @media screen and (min-width: 1280px) {
    margin-bottom: 0;
  }
`
