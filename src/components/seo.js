/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import favicon from "./../assets/images/nextblick-favicon.svg"

const decodeHtmlEntity = function (str) {
  return str.replace(/&raquo;/g, "»")
}

const SEO = ({
  description,
  lang,
  meta,
  metaRobotsNoindex,
  metaRobotsNofollow,
  metaImage,
  title,
}) => {
  const { site, wp } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        wp {
          seo {
            openGraph {
              defaultImage {
                localFile {
                  publicURL
                }
              }
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaRobots = metaRobotsNoindex + ", " + metaRobotsNofollow
  const ogImage = metaImage || wp.seo.openGraph.defaultImage.localFile.publicURL

  return (
    <Helmet
      encodeSpecialCharacters={true}
      htmlAttributes={{
        lang,
      }}
      title={decodeHtmlEntity(title)}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `robots`,
          content: metaRobots,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: ogImage,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <link rel="icon" type="image/svg+xml" href={favicon} sizes="16x16" />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `de`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
