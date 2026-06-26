import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

interface LoginFormData {
  email: string
  password: string
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()
  const [showPassword, setShowPassword] = useState(false)
  const { login, loading } = useAuth()

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    if (loading) {
      return
    }
    try {
      await login(data.email, data.password)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Login failed. Please try again.")
      }
    }
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');

          .mm-font-display { font-family: 'Fraunces', serif; }
          .mm-font-body { font-family: 'Inter', sans-serif; }

          @keyframes mm-fade-up {
            0% { opacity: 0; transform: translateY(16px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .mm-fade-up { animation: mm-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

          @keyframes mm-draw {
            to { stroke-dashoffset: 0; }
          }
          .mm-draw-path {
            stroke-dasharray: 1400;
            stroke-dashoffset: 1400;
            animation: mm-draw 2.4s cubic-bezier(0.65, 0, 0.35, 1) 0.3s forwards;
          }
          .mm-draw-path-2 {
            stroke-dasharray: 1400;
            stroke-dashoffset: 1400;
            animation: mm-draw 2.4s cubic-bezier(0.65, 0, 0.35, 1) 0.7s forwards;
          }

          @keyframes mm-dot-pulse {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.4); }
          }
          .mm-dot { animation: mm-dot-pulse 2.6s ease-in-out infinite; animation-delay: 2.6s; }

          .mm-input {
            background: #10172A;
            border: 1px solid #263150;
            transition: border-color 0.25s ease, box-shadow 0.25s ease;
          }
          .mm-input:focus {
            border-color: #C99A4B;
            box-shadow: 0 0 0 3px rgba(201, 154, 75, 0.15);
          }

          /* Stagger entrance animations */
          .mm-stagger-1 { animation: mm-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0s forwards; opacity: 0; }
          .mm-stagger-2 { animation: mm-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
          .mm-stagger-3 { animation: mm-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
          .mm-stagger-4 { animation: mm-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
          .mm-stagger-5 { animation: mm-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; opacity: 0; }
          .mm-stagger-6 { animation: mm-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; opacity: 0; }
          .mm-stagger-7 { animation: mm-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards; opacity: 0; }
          .mm-stagger-8 { animation: mm-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards; opacity: 0; }

          @media (prefers-reduced-motion: reduce) {
            .mm-fade-up, .mm-draw-path, .mm-draw-path-2, .mm-dot, 
            .mm-stagger-1, .mm-stagger-2, .mm-stagger-3, .mm-stagger-4,
            .mm-stagger-5, .mm-stagger-6, .mm-stagger-7, .mm-stagger-8 {
              animation: none !important;
              opacity: 1 !important;
              stroke-dashoffset: 0 !important;
            }
          }
        `}
      </style>

      <div className="min-h-screen w-full bg-[#080C18] flex items-center justify-center p-4 mm-font-body">
        {/* Watermark - Top Right */}
        <div className="fixed top-6 right-6 z-50 pointer-events-none select-none">
          <span className="text-[#D9B36C]/15 text-xs md:text-sm font-medium mm-font-body">
            #AdityaUlyaAnITGuy
          </span>
        </div>

        <div
          className="mm-fade-up relative flex flex-col md:flex-row w-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
          style={{ border: '1px solid #1C2540' }}
        >
          {/* Left panel — ledger texture + drawn growth contour (signature element) */}
          <div className="relative w-full md:w-5/12 bg-[#0B1020] p-10 lg:p-12 flex flex-col justify-between overflow-hidden">
            {/* Ledger rule lines */}
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, transparent, transparent 27px, #C99A4B 27px, #C99A4B 28px)',
              }}
            />
            {/* Warm vignette */}
            <div
              className="absolute -top-24 -left-16 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(201,154,75,0.18), transparent 70%)' }}
            />

            <div className="relative z-10">
              <p className="mm-stagger-2 mm-font-body text-[11px] tracking-[0.2em] text-[#C99A4B] font-semibold mb-8 uppercase">
                Wealth Management System
              </p>
              <h1 className="mm-stagger-3 mm-font-display text-[2.6rem] leading-[1.08] text-white font-medium mb-5">
                Unlock your
                <br />
                <span className="text-[#D9B36C]">financial future</span>
              </h1>
              <p className="mm-stagger-4 text-[#8C96B3] text-[13.5px] leading-relaxed max-w-[280px]">
                Pantau portofolio, atur tujuan finansial, dan amankan masa depan Anda
                dengan enkripsi JWT yang privat.
              </p>
            </div>

            {/* Signature: drawn contour / growth map */}
            <div className="mm-stagger-5 relative z-10 mt-10 h-28">
              <svg viewBox="0 0 280 100" className="w-full h-full overflow-visible" fill="none">
                <path
                  d="M0 78 C 30 78, 45 50, 65 55 C 90 61, 100 30, 125 35 C 150 40, 160 15, 185 18 C 210 21, 225 45, 250 38 C 265 34, 272 25, 280 22"
                  stroke="#324168"
                  strokeWidth="1.5"
                  className="mm-draw-path"
                />
                <path
                  d="M0 88 C 35 86, 50 70, 75 72 C 105 74, 115 50, 140 52 C 165 54, 175 35, 200 33 C 222 31, 235 50, 258 44 C 268 41, 274 35, 280 32"
                  stroke="#C99A4B"
                  strokeWidth="2"
                  className="mm-draw-path-2"
                />
                <circle cx="280" cy="32" r="3.5" fill="#D9B36C" className="mm-dot" />
              </svg>
            </div>
          </div>

          {/* Hairline divider */}
          <div className="hidden md:block w-px bg-[#1C2540]" />

          {/* Right panel — sign in form */}
          <div className="w-full md:w-7/12 bg-[#0C1224] p-10 lg:p-14 flex flex-col justify-center">
            {/* Logo + brand name */}
            <div className="mm-stagger-2 flex items-center gap-3 mb-10">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#10172A] border border-[#C99A4B]/40">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9B36C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17 L9 9 L13 13 L21 4" />
                  <path d="M15 4 H21 V10" />
                </svg>
              </div>
              <span className="mm-font-display text-2xl font-semibold text-white tracking-wide">
                Money<span className="text-[#D9B36C]">Map</span>
              </span>
            </div>

            <h3 className="mm-stagger-3 mm-font-display text-3xl text-white font-medium mb-2">Sign in to continue</h3>
            <p className="mm-stagger-4 text-base text-[#7E8AA8] mb-9">Masuk untuk mengelola portofolio investasi Anda</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div className="mm-stagger-5 space-y-1.5">
                <label className="text-xs font-medium text-[#8C96B3] tracking-wide uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg className="h-4.5 w-4.5 text-[#56628A]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="mm-input w-full pl-10 pr-4 py-3 rounded-xl text-[14px] text-white placeholder-[#56628A] focus:outline-none"
                    placeholder="nama@email.com"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>
                )}
              </div>

              {/* Password */}
              <div className="mm-stagger-6 space-y-1.5">
                <label className="text-xs font-medium text-[#8C96B3] tracking-wide uppercase">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg className="h-4.5 w-4.5 text-[#56628A]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: 'Password is required' })}
                    className="mm-input w-full pl-10 pr-11 py-3 rounded-xl text-[14px] text-white placeholder-[#56628A] focus:outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#56628A] hover:text-[#D9B36C] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-400 text-xs mt-1 block">{errors.password.message}</span>
                )}
              </div>

              {/* Sign in button */}
              <button
                type="submit"
                disabled={loading}
                className="mm-stagger-7 w-full py-3.5 rounded-xl text-[#0B1020] font-semibold text-[14.5px] tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.99] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(90deg, #D9B36C, #C99A4B)' }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Create account */}
            <div className="mm-stagger-8 mt-8 text-center">
              <p className="text-[#7E8AA8] text-sm">
                Don&apos;t have an account?{' '}
                <a href="#" className="text-[#D9B36C] font-medium hover:text-[#E8C988] hover:underline transition-colors">
                  Create Account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;