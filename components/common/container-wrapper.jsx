const ContainerWrapper = ({ children, className = "" }) => {
  return <div className={`mx-auto w-full md:px-4 lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] ${className}`}>{children}</div>;
};

export default ContainerWrapper;
