import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginGif from "./g.gif"; // ✅ Import your local GIF

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const generateFakeJWT = (payload) => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const body = btoa(JSON.stringify(payload));
    const signature = btoa("fake-signature");
    return `${header}.${body}.${signature}`;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setFormError("All fields are required.");
      localStorage.removeItem("jwt");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("No user details found for this email.");
      localStorage.removeItem("jwt");
      return;
    }

    if (user.email === email && user.password !== password) {
      alert("Incorrect password. Please try again.");
      localStorage.removeItem("jwt");
      return;
    }

    if (user.email === email && user.password === password) {
      setFormError("");
      const fakeJWT = generateFakeJWT({ email, time: Date.now() });
      localStorage.setItem("jwt", fakeJWT);
      navigate("/dashboard");
    } else {
      setFormError("Invalid email or password.");
      localStorage.removeItem("jwt");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row items-center justify-center">
      {/* Left - Login Form */}
      <div className="lg:w-1/2 w-full max-w-lg px-6 py-12">
        <h2 className="mb-10 mt-6 text-4xl font-semibold">Hey There!</h2>
        <h2 className="mb-10 mt-6 text-4xl font-semibold">Let's Log you In!!!</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="p-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="block w-full rounded-lg outline-none py-2 px-2.5 mt-2 text-gray-dark shadow-sm border border-gray"
            />
          </div>
          <div>
            <span className="flex justify-between items-center">
              <label htmlFor="password" className="p-2">
                Password
              </label>
              <a
                href="#"
                className="text-sm text-tertiary-text hover:underline"
              >
                Forgot password?
              </a>
            </span>
            <input
              type="password"
              id="password"
              placeholder="***********"
              value={password}
              onChange={handlePasswordChange}
              required
              className="block w-full rounded-lg outline-none py-2 px-2.5 text-gray-dark shadow-sm border border-gray"
            />
          </div>
          {formError && (
            <div className="text-[#c93434] text-sm mt-2">{formError}</div>
          )}
          <div className="pt-4">
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-black p-3 text-sm font-semibold text-white mb-2"
            >
              Sign in
            </button>
            <p className="text-sm text-dark-gray">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline hover:no-underline">
                create one
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Right - GIF Section */}
      <div className="hidden lg:flex items-center justify-center w-1/2 h-full bg-gray-100">
        <img
          src={loginGif}
          alt="Login Animation"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
