import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Переходим на главную страницу
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4 font-sans mt-[-60px]">
      <div className="w-full max-w-[400px] flex flex-col text-left">
        
        {/* Заголовок и подзаголовок */}
        <h1 className="text-3xl font-medium tracking-tight text-black mb-2">
          Log in to Exclusive
        </h1>
        <p className="text-sm text-black mb-10">
          Enter your details below
        </p>

        {/* Форма */}
        <form className="flex flex-col w-full" onSubmit={(e) => e.preventDefault()}>
          
          {/* Блок полей ввода */}
          <div className="flex flex-col gap-6 mb-6">
            
            {/* Поле Email or phone number */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-zinc-500">
                Email or phone number
              </label>
              <input
                type="text"
                defaultValue="rimel1111@gmail.com"
                className="w-full bg-transparent border border-zinc-300 rounded-[4px] py-3.5 px-4 text-sm text-black focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            {/* Поле Password */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-zinc-500">
                Password
              </label>
              <input
                type="password"
                defaultValue="lala1111lala" 
                className="w-full bg-transparent border border-zinc-300 rounded-[4px] py-3.5 pl-4 pr-12 text-sm text-black focus:outline-none focus:border-zinc-500 transition-colors"
              />
              {/* Иконка глаза справа */}
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black transition-colors"
                aria-label="Toggle password visibility"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>

          </div>

          {/* Ссылка "Забыли пароль" */}
          <div className="text-center mb-8">
            <Link 
              to="/forget-password" 
              className="text-[#DB4444] text-sm font-normal hover:underline transition-all"
            >
              Forget Password?
            </Link>
          </div>

          {/* Кнопка Логина */}
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-[#DB4444] hover:bg-[#c23b3b] text-white font-medium py-4 rounded-[4px] text-sm transition-colors"
          >
            Log In
          </button>

        </form>

        {/* Ссылка на регистрацию */}
        <div className="mt-6 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link 
            to="/SignUp" 
            className="text-black font-medium underline underline-offset-4 hover:text-zinc-700 transition-colors ml-1"
          >
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
}