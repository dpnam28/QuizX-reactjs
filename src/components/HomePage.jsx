import Video from "../assets/video/video1.mp4";
export const HomePage = (props) => {
  return (
    <>
      <div className="container flex mt-10 w-[70%] md:w-[80%] md:pl-0 pl-10">
        <div className="md:w-[50%] md:pl-5 flex flex-col justify-center align-middle sm:mr-10">
          <p className="uppercase text-purple-600 text-sm font-semibold">
            Forms, surveys, and quizzes
          </p>
          <div className="sm:text-4xl sm:font-normal md:w-[80%] md:text-5xl md:leading-14 text-xl font-semibold">
            Get up to 3.5x more data about them
          </div>
          <div className="mt-3 text-lg leading-6 md:font-normal md:text-xl md:leading-8">
            When your forms break the norm,sm more people fill them out. Think
            branded designs, video content, and relevant follow-up questions.
          </div>
          <button className="mt-5 bg-gray-900 w-40 text-white px-6 py-3 rounded-2xl font-bold text-sm">
            Sign up
          </button>
        </div>
        <video
          loop
          autoPlay
          muted
          className="size-50 m-auto lg:size-100 sm:size-70 hidden sm:block"
        >
          <source src={Video} type="video/mp4" />
        </video>
      </div>
    </>
  );
};
