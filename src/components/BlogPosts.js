import React from "react";
import ButtonLink from "./ButtonLink";
import BlogPost from "./BlogPost";
import { graphql, useStaticQuery } from "gatsby";

const LatestBlogPosts = () => {
  const latestPosts = useStaticQuery(graphql`
    query {
      allMediumPost(limit: 3, sort: { fields: [createdAt], order: DESC }) {
        edges {
          node {
            id
            title
            uniqueSlug
            createdAt(formatString: "ll")
            virtuals {
              subtitle
              readingTime
              previewImage {
                imageId
              }
            }
            author {
              name
            }
          }
        }
      }
    }
  `);
  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <h2 className="title-m max-w-[15rem] md:title-l md:max-w-[26rem]">
          Latest blog posts
        </h2>
        <div className="hidden md:block">
          <ButtonLink link="https://blog.vega.xyz" text="View all posts" />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {latestPosts.allMediumPost.edges.map((post, index) => (
          <BlogPost key={index} post={post} />
        ))}
      </div>
      <div className="mt-8 md:hidden">
        <ButtonLink link="https://blog.vega.xyz" text="View all posts" />
      </div>
    </div>
  );
};

export default LatestBlogPosts;
