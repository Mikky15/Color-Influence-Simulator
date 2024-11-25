import { swirlingLogo } from "../assets";

const ThankYou = () => {
  return (
    <section className="bg-black">
      <div className="flex flex-col min-h-screen justify-around items-center space-y-4 p-6 rounded-md shadow-lg">
        <img src={swirlingLogo} width={100} alt="" className="rounded-xl" />
        <div className="text-center space-y-4">
        <h1 className="text-3xl lg:text-7xl font-bold">THANK YOU</h1>
        <p className="text-3xl">I really appreciate your contribution to my project</p>
        </div>
        <div className="flex gap-5">
        <a className="bg-cyan-500 mt-4 px-10 py-3 text-white rounded-full" href="/">TRY AGAIN</a>
        <a className="bg-cyan-500 mt-4 px-10 py-3 text-white rounded-full" href="/">CLOSE</a>
      </div>
      </div>

      
    </section>
  );
};

export default ThankYou;
