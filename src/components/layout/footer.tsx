import React from "react";
import Image from "next/image";

const Footer = () => {
  const contents = [
    { key: "대표", value: "이현석" },
    { key: "전화", value: "010-6297-9911" },
    { key: "이메일", value: "329space@naver.com" },
    { key: "주소", value: "서울특별시 송파구 송파대로 222 인쇼 3층" },
  ];

  return (
    <footer className="border-t-[1px] border-solid border-gray-200 px-8 py-5 text-xs text-slate-800 xl:px-36">
      <Image
        src="/images/logo/nav.png"
        alt="logo"
        width={100}
        height={100}
        className="-mx-1 mb-1"
      />
      <div className="flex flex-wrap justify-between gap-y-2">
        <div>
          {contents.map((el) =>
            el.key !== "주소" ? (
              <span key={el.key} className={"block md:inline"}>
                <strong>{el.key}&nbsp;</strong>
                <span>{el.value}&nbsp;</span>
              </span>
            ) : (
              <p key={el.key}>
                <strong>{el.key}&nbsp;</strong>
                <span>{el.value}&nbsp;</span>
              </p>
            )
          )}
        </div>
        <div>
          <p>Copyright ©{new Date().getFullYear()} 329Design All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
