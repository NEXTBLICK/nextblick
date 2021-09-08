import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled from "@emotion/styled"

import SEO from "../seo"
import Hero from "../hero"
import Layout from "../../components/layout"
import Section from "../section"
import { Grid } from "@chakra-ui/react"
import { PostItem } from "../postItem"
import { getJsonFromUrl } from "../../utils/get-json-from-url"

function PostsPage({ data, location }) {
  const { page } = data
  const { acfDefaultPageFields, excerpt, featuredImage, title, seo } = page

  const [filteredPosts, setFilteredPosts] = useState([])

  const { allWpCategory, allWpPost } = useStaticQuery(graphql`
    {
      allWpCategory {
        nodes {
          id
          name
          slug
        }
      }
      allWpPost(sort: { fields: [date] }) {
        nodes {
          id
          title
          excerpt
          uri
          categories {
            nodes {
              id
              name
              slug
            }
          }
          tags {
            nodes {
              id
              name
            }
          }
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  fluid(maxWidth: 400, quality: 50, cropFocus: CENTER) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    const params = getJsonFromUrl(location.search)
    const filteredAllWpPost = allWpPost.nodes.filter(({ categories }) => {
      if (params.category) {
        categories = categories.nodes.map((c) => c.slug)
        return categories.includes(params.category)
      }

      return true
    })
    setFilteredPosts(filteredAllWpPost)
  }, [allWpPost, location])

  return (
    <Layout>
      <SEO
        title={seo.title}
        description={seo.metaDesc}
        metaRobotsNoindex={seo.metaRobotsNoindex}
        metaRobotsNofollow={seo.metaRobotsNofollow}
        metaImage={featuredImage.node.localFile.publicURL}
      />
      <Hero
        title={title}
        subtitle={acfDefaultPageFields.subtitle}
        excerpt={excerpt}
        image={
          featuredImage && featuredImage.node.localFile.childImageSharp.fluid
        }
      />
      <Section bg="primary" id="a">
        <ul>
          {allWpCategory.nodes.map(({ name, slug }) => (
            <li>
              <a href={`?category=${slug}`}>{name}</a>
            </li>
          ))}
        </ul>
        <Grid templateColumns={"repeat(auto-fit, minmax(300px, 1fr))"} gap={10}>
          {filteredPosts.map(({ featuredImage, title, id, tags, excerpt }) => (
            <PostItem
              featuredImage={featuredImage}
              title={title}
              tags={tags}
              excerpt={excerpt}
              key={id}
            />
          ))}
        </Grid>
      </Section>
    </Layout>
  )
}

export default PostsPage

const Image = styled(Img)`
  margin-bottom: 1rem;
`
