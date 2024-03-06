import Nav from "@/components/Nav";
import WaveIcon from "@/components/icons/Wave";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section className="max-w-screen-xl mx-auto w-full">
          <section className="text-center bg-blue-500 p-8 rounded text-white w-full space-y-4">
            <h1 className="text-3xl font-bold">
              NounsDAO is open to all Ideas
            </h1>
            <p>
              Apply with your big ideas! We will change the copy out from here.
            </p>
            <button className="bg-black px-6 py-2 text-sm rounded">
              Submit idea
            </button>
          </section>
          <section className="mt-12">
            <div className="flex flex-row space-x-8">
              <WaveIcon />
              <div>
                <h2 className="text-3xl font-semibold">Wave 6</h2>
                <p className="text-[#71717A]">
                  The top ideas will be submitted by x date.
                </p>
              </div>
            </div>
            <div className="border rounded p-2 mt-12"></div>
          </section>
        </section>
      </main>
    </>
  );
}
