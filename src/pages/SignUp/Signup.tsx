import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    // Переходим на страницу логина
    navigate("/Login");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4 font-sans mt-[-50px]">
      <div className="w-full max-w-[400px] flex flex-col text-left">
        
        {/* Заголовок и подзаголовок */}
        <h1 className="text-3xl font-medium tracking-tight text-black mb-2">
          Create an account
        </h1>
        <p className="text-sm text-black mb-10">
          Enter your details below
        </p>

        {/* Форма */}
        <form className="flex flex-col w-full" onSubmit={(e) => e.preventDefault()}>
          
          {/* Инпуты */}
          <div className="flex flex-col gap-4 mb-10">
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-transparent border border-zinc-300 rounded-[4px] py-3 px-4 text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
            />
            <input
              type="text"
              placeholder="Email or phone number"
              className="w-full bg-transparent border border-zinc-300 rounded-[4px] py-3 px-4 text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent border border-zinc-300 rounded-[4px] py-3 px-4 text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-transparent border border-zinc-300 rounded-[4px] py-3 px-4 text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-col gap-4 w-full">
            
            {/* Кнопка создания аккаунта */}
            <button
              type="button"
              onClick={handleCreateAccount}
              className="w-full bg-[#DB4444] hover:bg-[#c23b3b] text-white font-medium py-4 rounded-[4px] text-sm transition-colors"
            >
              Create Account
            </button>

            {/* Кнопка регистрации через Google */}
            <button
              type="button"
              className="w-full bg-white border border-zinc-300 hover:bg-zinc-50 text-black font-normal py-4 rounded-[4px] text-sm flex items-center justify-center gap-4 transition-colors"
            >
              {/* Оригинальный цветной SVG Google */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>

          </div>
        </form>

        {/* Ссылка на авторизацию */}
        <div className="mt-8 text-center text-sm text-zinc-500">
          Already have account?{" "}
          <Link 
            to="/Login" 
            className="text-black font-medium underline underline-offset-4 hover:text-zinc-700 transition-colors ml-1"
          >
            Log in
          </Link>
        </div>

      </div>
    </div>
  );
}