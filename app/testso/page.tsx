"use client";
const Page = () => {
  return (
    <div className="bg-red-500 flex justify-center items-center h-screen w-screen">
      <div className="NavigationDesktop w-96 h-14 px-5 py-3 bg-gray-900 rounded-3xl flex-col justify-start items-center gap-2.5 inline-flex">
        <div className="NavigationWrapper self-stretch justify-between items-center inline-flex">
          <div className="LogoWrapper justify-start items-center gap-1 flex">
            <div className="LogoText text-center text-white text-xl font-bold font-['Product Sans'] tracking-wider">
              FutureSphere
            </div>
          </div>
          <div className="NavlinksCollection justify-start items-start gap-4 flex">
            <div className="Navlinks text-white text-base font-normal font-['Manrope']">
              About
            </div>
            <div className="Navlinks text-white text-base font-normal font-['Manrope']">
              Careers
            </div>
            <div className="Navlinks text-white text-base font-normal font-['Manrope']">
              Blogs
            </div>
            <div className="Navlinks text-white text-base font-normal font-['Manrope']">
              Pricing
            </div>
          </div>
          <div className="NavButtonWrapper px-7 py-2 bg-violet-500 rounded-2xl justify-start items-start gap-1 flex">
            <div className="NavButtonText text-white text-base font-normal font-['Inter']">
              Contact Us
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
