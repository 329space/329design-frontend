import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import Layout from "components/layout";
import FullpageSpinenr from "components/spinner/fullpage";
import { GET_PROJECT_LIST_AXIOS } from "pages/api/portfolio";

type ProjectDataType = {
  attributes: {
    title: string;
  };
  id: string;
};

const PortfolioList = () => {
  const { replace } = useRouter();
  const { data, error } = useQuery(["portfolio"], GET_PROJECT_LIST_AXIOS);
  const projects: ProjectDataType[] = data?.data;

  // if (isLoading) {
  //   return (
  //     <Layout title={"Portfolio"}>
  //       <FullpageSpinenr />
  //     </Layout>
  //   );
  // } else
  if (data) {
    return (
      <Layout title={"Portfolio"}>
        <div className="xl:mx-28">
          <h1 className="mb-6 text-lg font-bold xl:mt-8">Portfolio</h1>
          <ul className="flex flex-col">
            {projects.map(({ id, attributes }) => (
              <Link key={id} href={`/portfolio/${id}`}>
                {attributes.title}
              </Link>
            ))}
          </ul>
        </div>
      </Layout>
    );
  } else if (error) {
    replace("/404");
    return (
      <Layout title={"Portfolio"}>
        <FullpageSpinenr />
      </Layout>
    );
  }
};

export default PortfolioList;
