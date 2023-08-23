import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";

import Layout from "components/layout";
import FullpageSpinenr from "components/spinner/fullpage";
import { GET_PROJECTS_LIST } from "pages/api/portfolio";
import { useRouter } from "next/router";

type ProjectDataType = {
  attributes: {
    title: string;
  };
  id: string;
};

const PortfolioList = () => {
  const { replace } = useRouter();
  const { data, loading, error } = useQuery(GET_PROJECTS_LIST);

  const projects: ProjectDataType[] = data?.projects?.data;

  if (loading) {
    return (
      <Layout title={"Portfolio"}>
        <FullpageSpinenr />
      </Layout>
    );
  } else if (data) {
    return (
      <Layout title={"Portfolio"}>
        <div className="xl:ml-28">
          <h1 className="mb-8 text-lg font-bold">Portfolio</h1>
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
