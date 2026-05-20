import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#3b82f6,transparent_30%),radial-gradient(circle_at_bottom_left,#9333ea,transparent_30%)] opacity-20" />

      <div className="relative z-10">
        <nav className="flex justify-between items-center px-16 py-8">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            CareerPilot AI
          </h1>

          <div className="flex gap-6">
            <Link
              to="/login"
              className="px-8 py-3 rounded-2xl border border-zinc-700 hover:bg-zinc-800 transition-all"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 font-bold hover:scale-105 transition-all"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-16 py-24 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h1 className="text-7xl font-extrabold leading-tight">
              Build Your

              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                {" "}AI Career
              </span>

              <br />

              Journey 🚀
            </h1>

            <p className="text-zinc-400 text-2xl mt-10 leading-10">
              Analyze resumes, prepare interviews,
              track applications, and accelerate
              your software career using AI.
            </p>

            <div className="flex gap-6 mt-14">
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all"
              >
                Start Free
              </Link>

              <Link
                to="/login"
                className="border border-zinc-700 px-10 py-5 rounded-2xl text-xl hover:bg-zinc-800 transition-all"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[3rem] p-10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="career"
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;