import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

import Layout from "components/layout";
import FullpageSpinenr from "components/spinner/fullpage";
import InfoSection from "components/portfolio/info";
import Thumbnails from "components/portfolio/thumbnails";
import ImageDialog from "components/portfolio/dialog";
import Modal from "components/modal";
import { GET_PROJECT_BY_ID_AXIOS } from "pages/api/portfolio";

export type ImgDataType = { id: number; attributes: { name: string; url: string } };

export type AttributeType = {
  area: string;
  description: string;
  location: string;
  photos: {
    data: ImgDataType[];
  };
  title: string;
  updatedAt: string;
};

type ProjectDataType = {
  attributes: AttributeType;
  id: string;
};

const Portfolio = () => {
  const { query } = useRouter();
  const { data } = useQuery(["project"], () => GET_PROJECT_BY_ID_AXIOS(query.id as string), {
    enabled: Boolean(query.id),
  });
  const project: ProjectDataType = data?.data[0];
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  // if (isLoading) {
  //   return (
  //     <Layout title={"Portfolio"}>
  //       <FullpageSpinenr />
  //     </Layout>
  //   );
  // } else
  if (project) {
    return (
      <>
        <Layout title={"Portfolio"}>
          <div className="xl:mx-28">
            <Link href={"/portfolio"} className="mb-8 flex items-center">
              <ChevronLeftIcon className="mr-1 h-6 w-6" />
              <h1 className="text-lg font-bold">Portfolio</h1>
            </Link>
            <main
              className={`flex flex-col justify-between gap-4 md:flex-row ${
                open ? "overflow-hidden" : ""
              }`}
            >
              <div className="w-full md:w-2/12">
                <InfoSection attributes={project.attributes} />
              </div>
              <div className="w-full md:w-10/12">
                <Thumbnails
                  images={project.attributes.photos.data}
                  setOpen={setOpen}
                  setImageIndex={setImageIndex}
                />
              </div>
            </main>
          </div>

          {open && (
            <Modal open={open} setOpen={setOpen}>
              <ImageDialog images={project.attributes.photos.data} imageIndex={imageIndex} />
            </Modal>
          )}
        </Layout>
      </>
    );
  } else {
    // replace("/portfolio");
    return (
      <Layout title={"Portfolio"}>
        <FullpageSpinenr />
      </Layout>
    );
  }
};

export default Portfolio;
