import i882Img from "./assets/i882.png";
import backgroundImg from "./assets/background.png";
import airpodImg from "./assets/airpod.png";
import coin1Img from "./assets/1.png"; 
import coinFrontImg from "./assets/3.png";
import coinTiltImg from "./assets/4.png";
import registerImg from "./assets/register.png";
import depositImg from "./assets/deposit.png";
import playImg from "./assets/play.png";
import colaImg from "./assets/cola2.png";
import rewardEventImg from "./assets/reward-event.png";
import heroTextBoxImg from "./assets/hero-textbox.png";
import cola1Img from "./assets/cola1.png";
import heroTopTextImg from "./assets/text-2.png";
import heroFinalTextImg from "./assets/text.png";
import heroBackground1Img from "./assets/background1.png"; 

import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  CheckCircle2,
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  ChevronDown,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import React, { useState, useEffect, ReactNode, useMemo } from "react";

// *** High-Quality, Depth-of-Field Coins System ***
const coinInstances = [
  { id: 1, x: 10, y: 15, size: 40, blur: 6, opacity: 0.15, speed: 0.01, z: 1, rotate: 15 },
  { id: 2, x: 85, y: 10, size: 50, blur: 5, opacity: 0.2, speed: 0.012, z: 1, rotate: -20 },
  { id: 3, x: 50, y: 60, size: 35, blur: 7, opacity: 0.1, speed: 0.008, z: 1, rotate: 45 },
  { id: 4, x: 15, y: 55, size: 80, blur: 2.5, opacity: 0.35, speed: 0.025, z: 2, rotate: -10 },
  { id: 5, x: 75, y: 65, size: 90, blur: 2, opacity: 0.4, speed: 0.03, z: 2, rotate: 25 },
  { id: 6, x: 40, y: 10, size: 70, blur: 3, opacity: 0.3, speed: 0.02, z: 2, rotate: 180 },
  { id: 7, x: 5, y: 25, size: 120, blur: 0, opacity: 0.6, speed: 0.05, z: 3, rotate: 0, glow: "0 0 10px rgba(251,191,36,0.5)" },
  { id: 8, x: 90, y: 35, size: 140, blur: 0, opacity: 0.65, speed: 0.06, z: 3, rotate: -15, glow: "0 0 10px rgba(251,191,36,0.5)" },
];

const FloatingHeroCoins = ({ mousePos, liteMode }: { mousePos: { x: number; y: number }, liteMode: boolean }) => {
  const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const winHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  
  const offsetX = (mousePos.x - winWidth / 2);
  const offsetY = (mousePos.y - winHeight / 2);

  const visibleCoins = useMemo(() => {
    return liteMode ? coinInstances.slice(3, 7) : coinInstances;
  }, [liteMode]);

  const coinAssets = [coin1Img, coinFrontImg, coinTiltImg];

  return (
    <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
      {visibleCoins.map((coin, index) => (
        <motion.div
          key={coin.id}
          className="absolute"
          style={{
            width: `${coin.size}px`,
            left: `${coin.x}%`,
            top: `${coin.y}%`,
            opacity: coin.opacity,
            zIndex: coin.z,
            filter: `blur(${coin.blur}px) ${coin.glow ? `drop-shadow(${coin.glow})` : ''}`,
            willChange: 'transform',
          }}
          animate={{
            x: -offsetX * coin.speed,
            y: -offsetY * coin.speed,
            rotate: coin.rotate,
          }}
          transition={{
            type: "spring",
            stiffness: liteMode ? 20 : 10,
            damping: 30,
            mass: 1,
          }}
        >
          <img src={coinAssets[index % coinAssets.length]} alt="" className="w-full h-auto object-contain" />
        </motion.div>
      ))}
    </div>
  );
};

const HeroWord = ({
  children,
  className = "",
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) => (
  <span
    className={`relative inline-block font-semibold tracking-[-0.02em] text-white ${className}`}
    style={
      !light
        ? {
            textShadow:
              "0 1px 0 rgba(255,255,255,0.10), 0 2px 0 rgba(59,130,246,0.10), 0 10px 28px rgba(2,6,23,0.55)",
          }
        : {
            textShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }
    }
  >
    {children}
  </span>
);

const GoldConfetti = ({ liteMode = false }: { liteMode?: boolean }) => {
  const pieces = React.useMemo(
    () =>
      Array.from({ length: liteMode ? 8 : 26 }, (_, i) => {
        const width = 8 + (i % 4) * 4;
        const height = 2 + (i % 3);
        const left = 3 + ((i * 3.9) % 94);
        const delay = (i % 9) * 0.35;
        const duration = 7 + (i % 5) * 0.9;
        const drift = ((i % 7) - 3) * 18;
        const rotateEnd = (i % 2 === 0 ? 1 : -1) * (150 + i * 8);
        const scale = 0.82 + (i % 4) * 0.08;
        const opacity = 0.72 + (i % 3) * 0.08;

        const bgList = [
          "linear-gradient(135deg, #F8E27A 0%, #FFD84D 35%, #D4A72C 100%)",
          "linear-gradient(135deg, #E7C35A 0%, #C9961A 40%, #8C6110 100%)",
          "linear-gradient(135deg, #F2D98C 0%, #E1B94B 45%, #A36E1A 100%)",
        ];

        return {
          id: i,
          width,
          height,
          left,
          delay,
          duration,
          drift,
          rotateEnd,
          scale,
          opacity,
          bg: bgList[i % bgList.length],
        };
      }),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute top-0"
          style={{
            left: `${piece.left}%`,
            width: `${piece.width}px`,
            height: `${piece.height}px`,
            borderRadius: `${piece.height}px`,
            background: piece.bg,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.35), 0 2px 8px rgba(0,0,0,0.16)",
            willChange: "transform, opacity",
          }}
          initial={{
            y: -24,
            x: 0,
            opacity: 0,
            rotate: 0,
            scale: piece.scale,
          }}
          animate={{
            y: ["0vh", "28vh", "62vh", "108vh"],
            x: [0, piece.drift * 0.4, piece.drift, piece.drift * 0.2],
            rotate: [0, piece.rotateEnd * 0.45, piece.rotateEnd],
            opacity: [0, piece.opacity, piece.opacity, 0],
          }}
          transition={{
            duration: liteMode ? piece.duration * 1.6 : piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const RealisticBackground = ({ liteMode = false }: { liteMode?: boolean }) => (
 <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
  {/* Removed the solid bg-[#0a1580] div so your background image is visible */}

  {liteMode ? (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.12)_0%,rgba(125,211,252,0.10)_18%,rgba(59,130,246,0.08)_32%,transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.06),transparent_30%)]" />
    </>
  ) : (
    <>
      <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            animate={{
              opacity: [0.10, 0.2, 0.10],
              rotate: [i * 45, i * 45 + 10, i * 45],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 origin-center"
            style={{
              background: `conic-gradient(from ${i * 45}deg at 50% 50%, transparent 0%, rgba(34,211,238,0.15) 5%, transparent 15%)`,
              filter: "blur(20px)",
            }}
          />
        ))}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,rgba(125,211,252,0.2)_20%,rgba(143,177,233,0)_60%)] blur-[50px]"
        />
      </div>

      <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]" />
    </>
  )}
</div>
  );

const SectionSeam = ({
  className = "",
  fillColor = "#020f6a",
  shape = "dip",
}: {
  className?: string;
  fillColor?: string;
  shape?: "dome" | "dip";
}) => (
  <div
    className={`absolute left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none ${className}`}
  >
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="block w-full h-[76px] sm:h-[120px]"
    >
      {shape === "dome" ? (
        <>
          <path
            d="M0,120 L0,100 C480,0 720,0 1200,100 L1200,120 Z"
            fill={fillColor}
          />
          <path
            d="M0,100 C480,0 720,0 1200,100"
            fill="none"
            stroke="url(#line-glow)"
            strokeWidth="3"
          />
        </>
      ) : (
        <>
          <path
            d="M0,0 C480,100 720,100 1200,0 L1200,120 L0,120 Z"
            fill={fillColor}
          />
          <path
            d="M0,0 C480,100 720,100 1200,0"
            fill="none"
            stroke="url(#line-glow)"
            strokeWidth="3"
          />
        </>
      )}
      <defs>
        <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(8);
  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    fullName: "",
    agreedToTerms: false,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9]).{6,}$/;

  const handleNext = () => {
    if (formData.name && passwordRegex.test(formData.password)) {
      setStep(2);
    }
  };

  const isStep1Valid = formData.name && passwordRegex.test(formData.password);
  const isStep2Valid =
    formData.fullName &&
    formData.email &&
    emailRegex.test(formData.email) &&
    formData.phone &&
    formData.agreedToTerms;

  const handleFinalCTA = () => {
    if (!isStep2Valid) return;

    (window as any).trackCTA?.("final_complete_registration");

    (window as any).trackCustomEvent?.("Final_CTA_Click", {
      button_name: "Complete Registration",
      step: 2,
      username: formData.name,
    });

    setIsSuccess(true);
    setCountdown(8);
    setProgress(0);
  };

  useEffect(() => {
    if (!isSuccess) return;

    const totalDuration = 8000;
    const startTime = Date.now();

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(nextProgress);
    }, 50);

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          clearInterval(progressTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(countdownTimer);
    };
  }, [isSuccess]);

  return (
    <section
      id="registration-form"
      className="relative z-10 overflow-hidden px-6 py-24 sm:py-32 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.16),transparent_24%),radial-gradient(circle_at_85%_22%,rgba(59,130,246,0.20),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(56,189,248,0.08),transparent_30%),linear-gradient(180deg,#0B49B8_0%,#0A3D9D_35%,#082B78_72%,#03143E_100%)]"
    >
      <img
        src={i882Img}
        alt="i88"
        className="pointer-events-none absolute left-1/2 top-0 z-[9] w-[90px] -translate-x-1/2 -translate-y-2 object-contain opacity-95 sm:w-[110px] sm:-translate-y-3 md:w-[125px] md:-translate-y-4"
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[4%] top-[10%] h-[260px] w-[260px] rounded-full bg-cyan-300/12 blur-[120px]" />
        <div className="absolute right-[4%] top-[15%] h-[320px] w-[320px] rounded-full bg-blue-400/12 blur-[140px]" />
        <div className="absolute left-1/2 top-[45%] h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-white/5 blur-[110px]" />
        <div className="absolute bottom-[8%] left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-cyan-300/8 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]" />
      </div>

      <img
        src={coinTiltImg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[22px] top-[58px] z-[1] w-[82px] -rotate-[22deg] object-contain opacity-95 drop-shadow-[0_12px_24px_rgba(0,0,0,0.20)] sm:left-[34px] sm:top-[68px] sm:w-[96px]"
      />
      <img
        src={coinFrontImg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8px] top-[430px] z-[1] w-[118px] object-contain opacity-95 drop-shadow-[0_16px_30px_rgba(0,0,0,0.18)] sm:left-[0px] sm:top-[455px] sm:w-[132px]"
      />
      <img
        src={coinTiltImg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[18px] right-[6px] z-[1] w-[150px] rotate-[22deg] object-contain opacity-95 drop-shadow-[0_18px_36px_rgba(0,0,0,0.20)] sm:bottom-[26px] sm:right-[18px] sm:w-[176px]"
      />

      <div className="relative z-10 mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(180deg,rgba(19,73,180,0.52)_0%,rgba(14,53,143,0.58)_30%,rgba(9,35,109,0.70)_100%)] p-8 shadow-[0_35px_90px_rgba(0,0,0,0.42),0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-[28px] md:p-12"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[2.5rem]">
            <div className="absolute inset-0 rounded-[2.5rem] border border-[#5fd7ff]/22" />
            <div className="absolute inset-[1px] rounded-[2.45rem] border border-white/6" />
            <div
              className="absolute inset-x-[2px] top-[2px] h-[120px] rounded-t-[2.35rem]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 28%, rgba(255,255,255,0.00) 100%)",
                filter: "blur(0.2px)",
              }}
            />
            <div
              className="absolute bottom-[26px] left-[1px] top-[22px] w-[24px] rounded-l-[2.2rem]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.07) 38%, rgba(255,255,255,0.00) 100%)",
                filter: "blur(1.2px)",
              }}
            />
            <div
              className="absolute right-[6px] top-[8px] h-[92px] w-[92px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.00) 70%)",
                filter: "blur(10px)",
              }}
            />
            <div
              className="absolute bottom-[2px] left-[18px] right-[18px] h-[20px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.08) 100%)",
                filter: "blur(2px)",
              }}
            />
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -12 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-center"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(180deg,#22D3EE_0%,#2563EB_100%)] shadow-[0_18px_40px_rgba(37,99,235,0.35)]">
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </div>

                  <h2 className="text-3xl font-bold text-white sm:text-4xl">
                    Welcome to the Family
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-blue-100/85 sm:text-lg">
                    You have successfully joined our family,
                    <span className="font-bold text-white"> iClub88</span>, known as
                    <span className="font-bold text-cyan-200"> i88</span>.
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-blue-100/75 sm:text-base">
                    We will redirect you to our official home page in{" "}
                    <span className="font-bold text-white">{countdown}</span>{" "}
                    seconds.
                  </p>

                  <div className="mt-8">
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.06)]">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#22D3EE_0%,#38BDF8_35%,#2563EB_100%)] shadow-[0_0_12px_rgba(34,211,238,0.35)]"
                        style={{
                          width: `${progress}%`,
                          transition: "width 50ms linear",
                        }}
                      >
                        <div className="h-full w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.04),transparent)]" />
                      </div>
                    </div>
                  </div>

                </motion.div>
              ) : step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10 space-y-6"
                >
                  <div className="mb-8 text-center">
                    <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
                      Create Your Account
                    </h2>
                    <p className="text-blue-100/75">
                      Join the elite circle of high-rollers
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-medium text-white/92">
                      Username
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-white" />
                      <input
                        type="text"
                        placeholder="Your login id"
                        className="w-full rounded-2xl border border-white/18 bg-[linear-gradient(180deg,rgba(233,233,242,0.26),rgba(233,233,242,0.18))] py-4 pl-12 pr-4 text-sm font-medium leading-none text-white placeholder:text-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-white/18"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-medium text-white/92">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-white" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        className={`w-full rounded-2xl border py-4 pl-12 pr-4 text-sm font-medium leading-none text-white placeholder:text-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-white/18 ${
                          formData.password && !passwordRegex.test(formData.password)
                            ? "border-red-500/50 ring-1 ring-red-500/20 bg-[linear-gradient(180deg,rgba(233,233,242,0.26),rgba(233,233,242,0.18))]"
                            : "border-white/18 bg-[linear-gradient(180deg,rgba(233,233,242,0.26),rgba(233,233,242,0.18))]"
                        }`}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                    {formData.password && !passwordRegex.test(formData.password) && (
                      <p className="ml-1 mt-1 text-xs text-red-400">
                        Password must be at least 6 characters and contain a number
                      </p>
                    )}
                  </div>

                  <motion.button
                    whileHover={isStep1Valid ? { scale: 1.02 } : {}}
                    whileTap={isStep1Valid ? { scale: 0.98 } : {}}
                    onClick={handleNext}
                    disabled={!isStep1Valid}
                    className={`group flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#1D4ED8_0%,#2563EB_42%,#22D3EE_100%)] py-4 font-bold text-white shadow-[0_18px_40px_rgba(37,99,235,0.38)] transition-all ${
                      !isStep1Valid
                        ? "cursor-not-allowed opacity-40 grayscale-[0.5]"
                        : "hover:brightness-110 hover:shadow-[0_20px_50px_rgba(34,211,238,0.28)]"
                    }`}
                  >
                    Join Now
                    <ChevronRight
                      className={`h-5 w-5 transition-transform ${
                        isStep1Valid ? "group-hover:translate-x-1" : ""
                      }`}
                    />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10 space-y-6"
                >
                  <div className="mb-8 text-center">
                    <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
                      Create Your Account
                    </h2>
                    <p className="text-blue-100/75">
                      Join the elite circle of high-rollers
                    </p>

                    {formData.name && (
                      <p className="mt-3 text-sm font-medium text-cyan-100/90">
                        Hi <span className="font-bold text-white">{formData.name}</span>,
                        please fill in the form to start your journey
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-medium text-white/92">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserPlus className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full rounded-2xl border border-white/18 bg-[linear-gradient(180deg,rgba(233,233,242,0.26),rgba(233,233,242,0.18))] py-4 pl-12 pr-4 text-sm leading-none text-white placeholder:text-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-white/18"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 px-1 py-1"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                      <p className="text-[11px] italic leading-relaxed text-blue-100/72">
                        Reminder: Name must match your bank account name for faster
                        withdrawal processing.
                      </p>
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-medium text-white/92">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-white" />
                      <input
                        type="email"
                        placeholder="youremail@example.com"
                        className={`w-full rounded-2xl border py-4 pl-12 pr-4 text-sm font-medium leading-none text-white placeholder:text-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-white/18 ${
                          formData.email && !emailRegex.test(formData.email)
                            ? "border-red-500/50 ring-1 ring-red-500/20 bg-[linear-gradient(180deg,rgba(233,233,242,0.26),rgba(233,233,242,0.18))]"
                            : "border-white/18 bg-[linear-gradient(180deg,rgba(233,233,242,0.26),rgba(233,233,242,0.18))]"
                        }`}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    {formData.email && !emailRegex.test(formData.email) && (
                      <p className="ml-1 mt-1 text-xs text-red-400">
                        Please enter a valid email address
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-medium text-white/92">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white" />
                      <input
                        type="tel"
                        placeholder="+65 8000 0000"
                        className="w-full rounded-2xl border border-white/18 bg-[linear-gradient(180deg,rgba(233,233,242,0.26),rgba(233,233,242,0.18))] py-4 pl-12 pr-4 text-sm leading-none text-white placeholder:text-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-white/18"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <div className="relative flex h-5 items-center">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-5 w-5 cursor-pointer rounded border-cyan-200/20 bg-white/5 text-blue-600 accent-blue-600 transition-all focus:ring-cyan-400/35 focus:ring-offset-0"
                        checked={formData.agreedToTerms}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            agreedToTerms: e.target.checked,
                          })
                        }
                      />
                    </div>
                    <label
                      htmlFor="terms"
                      className="cursor-pointer select-none text-xs leading-relaxed text-blue-100/75"
                    >
                      I am over 21 years of age and have read and accepted the
                      general terms and conditions. I agree to receive information
                      from your company. I can cancel this service in my account at
                      any time.
                    </label>
                  </div>

                  <motion.button
                    whileHover={isStep2Valid ? { scale: 1.02 } : {}}
                    whileTap={isStep2Valid ? { scale: 0.98 } : {}}
                    onClick={handleFinalCTA}
                    disabled={!isStep2Valid}
                    className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#1D4ED8_0%,#2563EB_42%,#22D3EE_100%)] py-4 font-bold text-white shadow-[0_18px_40px_rgba(37,99,235,0.38)] transition-all ${
                      !isStep2Valid
                        ? "cursor-not-allowed opacity-40 grayscale-[0.5]"
                        : "hover:brightness-110 hover:shadow-[0_20px_50px_rgba(34,211,238,0.28)]"
                    }`}
                  >
                    Complete Registration
                    <CheckCircle2 className="h-5 w-5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ x: -5, scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setStep(1)}
                    className="group mx-auto mt-8 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/20 bg-white/5 text-cyan-300/60 backdrop-blur-md transition-all duration-300 hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-200 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                    title="Back to Step 1"
                  >
                    <ArrowLeft className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-1" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <SectionSeam className="bottom-0" fillColor="#020f6a" shape="dip" />
    </section>
  );
};


const FloatingGirl = ({ liteMode = false }: { liteMode?: boolean }) => {
  const [showFromSteps, setShowFromSteps] = useState(false);
  const [hideBubbleAtRegistration, setHideBubbleAtRegistration] = useState(false);
  const [isUserActive, setIsUserActive] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const stepsSection = document.getElementById("steps-to-claim");
      const regSection = document.getElementById("registration-form");

      if (stepsSection) {
        const stepsRect = stepsSection.getBoundingClientRect();
        setShowFromSteps(stepsRect.top < window.innerHeight - 100);
      }

      if (regSection) {
        const regRect = regSection.getBoundingClientRect();
        setHideBubbleAtRegistration(regRect.top < window.innerHeight - 200);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      setIsUserActive(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsUserActive(false), liteMode ? 6000 : 10000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [liteMode]);

  const handleInteract = () => {
    document
      .getElementById("registration-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const shouldShowBubble = showFromSteps && !hideBubbleAtRegistration && isUserActive;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed bottom-[-0.8rem] right-[-0.8rem] z-[25] select-none transition-opacity duration-300 ${
        showFromSteps ? "opacity-100" : "opacity-0"
      }`}
    >
      <AnimatePresence>
        {shouldShowBubble && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8, filter: "blur(5px)" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="pointer-events-auto absolute bottom-[82%] right-[48%] z-30 w-max max-w-[min(42vw,220px)]"
          >
            <div
              onClick={handleInteract}
              className="group relative cursor-pointer rounded-[20px] border border-cyan-400/60 bg-cyan-950/85 px-4 py-3 text-center shadow-[0_0_20px_rgba(34,211,238,0.3)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-cyan-900/95 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] sm:px-5 sm:py-3.5 sm:text-left"
            >
              <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                <p className="text-[11px] font-bold leading-tight tracking-wide text-white sm:whitespace-nowrap sm:text-sm">
                  Click here to register
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="pointer-events-auto relative cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
        onClick={handleInteract}
      >
        <img
          src={colaImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-auto w-[clamp(16rem,32vw,40rem)] object-contain"
          style={{
            opacity: 0.65,
            filter: liteMode
              ? "brightness(1.05) drop-shadow(0 0 8px rgba(56,189,248,0.35))"
              : "brightness(1.1) drop-shadow(0 0 10px rgba(56,189,248,0.7)) drop-shadow(0 0 20px rgba(59,130,246,0.5))",
          }}
        />

        <img
          src={colaImg}
          alt=""
          className="relative h-auto w-[clamp(16rem,32vw,40rem)] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
        />
      </div>
    </div>
  );
};


const HeroCTA = () => {
  const [isActive, setIsActive] = useState(false);
  const [exitSweepKey, setExitSweepKey] = useState(0);
  const [showExitSweep, setShowExitSweep] = useState(false);

  const scrollToRegister = () => {
    document
      .getElementById("registration-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleEnter = () => {
    setShowExitSweep(false);
    setIsActive(true);
  };

  const handleLeave = () => {
    setIsActive(false);
    setExitSweepKey((prev) => prev + 1);
    setShowExitSweep(true);

    setTimeout(() => {
      setShowExitSweep(false);
    }, 3000);
  };

  return (
    <div className="absolute left-1/2 z-[10] -translate-x-1/2"
  style={{
   bottom: "calc(clamp(3.25rem,4.8vw,7.8rem) - 6px)"
  }}
>
      <motion.button
        onClick={scrollToRegister}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onTouchStart={handleEnter}
        onTouchEnd={handleLeave}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.985 }}
        className="group pointer-events-auto relative isolate overflow-hidden rounded-[22px] border border-[#ffe7a3]/45 bg-[linear-gradient(180deg,#FFE08A_0%,#F7C948_30%,#D89A18_72%,#B9780C_100%)] px-[clamp(2.5rem,4vw,3.5rem)] py-[clamp(0.6rem,0.8vw,0.75rem)] text-[clamp(1rem,1.5vw,1.375rem)] font-extrabold tracking-wide text-[#fff7d1] shadow-[0_22px_44px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.46),inset_0_-10px_22px_rgba(120,70,0,0.24)] transition-all"
        style={{
          textShadow: "0 1px 2px rgba(120,70,0,0.35)",
        }}
      >
        <div className="pointer-events-none absolute inset-x-[4%] top-[3px] h-[42%] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.38),rgba(255,255,255,0.08),transparent)] blur-[1px]" />
        <div className="pointer-events-none absolute inset-[1px] rounded-[21px] border border-white/10" />
        <div className="pointer-events-none absolute -left-5 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-[#ffd76a]/22 blur-[18px]" />
        <div className="pointer-events-none absolute -right-5 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-[#ffcf53]/18 blur-[18px]" />

        <AnimatePresence>
          {isActive && (
            <motion.div
              key="active-full-sweep"
              aria-hidden="true"
              initial={{ x: "-130%", opacity: 0 }}
              animate={{ x: ["-130%", "180%"], opacity: [0, 0.95, 0.95, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none absolute inset-y-[-35%] left-[-45%] w-[60%] rotate-[16deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),rgba(255,255,255,0.30),rgba(255,255,255,0.78),rgba(255,255,255,0.30),rgba(255,255,255,0.08),transparent)] blur-[3px]"
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!isActive && showExitSweep && (
            <motion.div
              key={`exit-full-sweep-${exitSweepKey}`}
              aria-hidden="true"
              initial={{ x: "-130%", opacity: 0 }}
              animate={{ x: ["-130%", "180%"], opacity: [0, 0.95, 0.95, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none absolute inset-y-[-35%] left-[-45%] w-[60%] rotate-[16deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),rgba(255,255,255,0.30),rgba(255,255,255,0.78),rgba(255,255,255,0.30),rgba(255,255,255,0.08),transparent)] blur-[3px]"
            />
          )}
        </AnimatePresence>

        <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
          Join Now
          <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </motion.button>
    </div>
  );
};


export default function App() {
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
const [progressLevel, setProgressLevel] = useState(1);
const [liteMode, setLiteMode] = useState(false);
const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
useEffect(() => {
  setProgressLevel(1);

  const timeouts = [
    { level: 2, delay: 2000 },
    { level: 3, delay: 2000 },
  ];

  let totalDelay = 0;

  timeouts.forEach(({ level, delay }) => {
    totalDelay += delay;
    setTimeout(() => {
      setProgressLevel(level);
    }, totalDelay);
  });

}, []);

useEffect(() => {
  const detectLiteMode = () => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };

    const isSmallScreen = window.innerWidth < 768;
    const lowMemory =
      typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
    const lowCPU =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 4;
    const saveData = !!nav.connection?.saveData;
    const slowNetwork =
      nav.connection?.effectiveType === "2g" ||
      nav.connection?.effectiveType === "slow-2g";

    setLiteMode(isSmallScreen || lowMemory || lowCPU || saveData || slowNetwork);
  };

  detectLiteMode();
  window.addEventListener("resize", detectLiteMode);
  return () => window.removeEventListener("resize", detectLiteMode);
}, []);
  
 useEffect(() => {
  if (liteMode) return;

  let rafId = 0;

  const handleMouseMove = (e: MouseEvent) => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      setMousePos({ x: e.clientX, y: e.clientY });
    });
  };

  window.addEventListener("mousemove", handleMouseMove, { passive: true });

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, [liteMode]);

  const stepData = [
    { title: "Register", desc: "Create account", image: registerImg },
    {
      title: "Deposit",
      desc: "Deposit $50 to unlock rewards",
      image: depositImg,
    },
    { title: "Reward", desc: "Get 188 FS", image: playImg },
  ];

  const trackerItems = [
  { title: "REGISTER", sub: "With Us", type: "text" as const },
  { title: "188 FS", sub: "Deposit & Get FS", type: "text" as const },
  { title: "MORE REWARD AWAITS", type: "text" as const },
  { title: "", sub: "", type: "airpod" as const },
];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-brand-navy/70 font-sans text-slate-200 selection:bg-blue-500/30">
    {!liteMode && (
  <div
    className="pointer-events-none fixed inset-0 z-30 opacity-40 transition-opacity duration-300"
    style={{
      background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.08), transparent 80%)`,
    }}
  />
)}

{!liteMode && (
  <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
)}

      <main className="relative z-10">
        
        <section
          id="hero-section"
          className="relative flex min-h-screen items-center overflow-hidden"
          style={{
            backgroundImage: `url(${heroBackground1Img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <RealisticBackground liteMode={liteMode} />
          <GoldConfetti liteMode={liteMode} />
          <FloatingHeroCoins mousePos={mousePos} liteMode={liteMode} />

          <div className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center justify-center px-4 sm:px-6 lg:px-8">
            <div
              className="relative w-full"
              style={{
                minHeight: "max(112svh, 860px)",
              }}
            >
              <div
                className="relative mx-auto w-full max-w-[1500px]"
                style={{
                  aspectRatio: isDesktop ? "1440 / 980" : "1440 / 1280",
                  minHeight: isDesktop ? "clamp(760px, 68vw, 980px)" : "clamp(860px, 132vw, 1580px)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    width: isDesktop ? "min(1120px, 72vw)" : "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <img
                    src={i882Img}
                    alt="i88"
                    className="pointer-events-none absolute z-[30] object-contain"
                    style={{
                      width: "clamp(6.4rem, 13.5vw, 9.2rem)",
                      left: "50%",
                      top: "0%",
                      transform: "translate(-50%, -18%)",
                    }}
                  />

                  <img
                    src={rewardEventImg}
                    alt="AirPods Pro Reward Event"
                    className="pointer-events-none absolute left-1/2 z-[10] -translate-x-1/2 object-contain"
                    style={{
                      width: isDesktop ? "min(50rem, 94%)" : "min(84%, 47rem)",
                      top: "7.2%",
                    }}
                  />

                  <img
                    src={cola1Img}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute z-[8] object-contain"
                    style={{
                      width: isDesktop ? "clamp(29rem, 32vw, 35rem)" : "clamp(38rem, 58vw, 47.5rem)",
                      left: "50%",
                      top: "19.2%",
                      transform: "translateX(-50%)",
                      filter:
                        "drop-shadow(0 25px 40px rgba(0,0,0,0.35)) drop-shadow(0 12px 28px rgba(56,189,248,0.18))",
                    }}
                  />

                  <div
                    className="pointer-events-none absolute left-1/2 z-[9] -translate-x-1/2"
                    style={{
                      width: isDesktop ? "min(60rem, 96%)" : "min(78%, 1180px)",
                      top: isDesktop ? "48.8%" : "48.4%",
                    }}
                  >
                    <img
                      src={heroTextBoxImg}
                      alt=""
                      className="w-full object-contain"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4">
                      <img
                        src={heroTopTextImg}
                        alt="Your AirPods Awaits"
                        className="relative z-10 mb-1 max-h-[42%] w-[90%] object-contain sm:mb-2 sm:w-[92%]"
                      />

                      <img
                        src={heroFinalTextImg}
                        alt="Complete the final 1%"
                        className="relative z-10 max-h-[42%] w-[95%] object-contain sm:w-[96%]"
                      />
                    </div>
                  </div>

                  <motion.img
                    src={airpodImg}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute z-[15] object-contain"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, -2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      width: isDesktop ? "clamp(7rem, 8.4vw, 8.75rem)" : "clamp(8.75rem, 12.5vw, 10.75rem)",
                      left: isDesktop ? "58.5%" : "63.2%",
                      top: isDesktop ? "16.6%" : "16.2%",
                      transform: "translateX(-50%)",
                      filter:
                        "drop-shadow(0 18px 30px rgba(0,0,0,0.28)) drop-shadow(0 10px 24px rgba(56,189,248,0.16))",
                    }}
                  />
                </div>

                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 z-[12] -translate-x-1/2"
                  style={{ top: "51.8%" }}
                  animate={{
                    y: [0, 5, 0],
                    opacity: [0.16, 0.3, 0.16],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    style={{
                      color: "rgba(255,215,106,0.5)",
                      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.22))",
                    }}
                  />
                </motion.div>

                <div
  className="pointer-events-none absolute z-[9] w-full max-w-[1480px] px-3 sm:px-5 lg:px-8"
  style={{
    left: "50%",
    bottom: "22.2%",
    transform: "translateX(-50%)",
  }}
>
                  <div className={`mx-auto ${isDesktop ? "max-w-[1080px]" : "max-w-5xl"}`}>
                    <div className="mb-7 grid grid-cols-4 items-end gap-3 sm:gap-4 lg:gap-5 xl:gap-5 2xl:gap-6">
                      {trackerItems.map((item, i) => {
                        const stageNumber = i + 1;
                        const isReached = progressLevel >= stageNumber;
                        const isCurrent = progressLevel === stageNumber;

                        if (item.type === "airpod") {
                          const isUnlockedStage = progressLevel >= 3;

                          return (
                            <motion.div
                              key={i}
                              className="relative flex min-w-0 flex-col items-center justify-end"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <div className="relative flex h-[82px] w-full items-end justify-center sm:h-[86px] md:h-[92px]">
                                <motion.div
                                  className="absolute inset-0 flex items-end justify-center"
                                  animate={
                                    isUnlockedStage
                                      ? {
                                          y: [0, -4, 0],
                                          scale: [1, 1.02, 1],
                                        }
                                      : {}
                                  }
                                  transition={{
                                    duration: 2.6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                >
                                  <img
                                    src={airpodImg}
                                    alt="AirPods reward"
                                    className="relative z-10 w-[78px] object-contain sm:w-[92px] md:w-[106px] lg:w-[116px]"
                                    style={{
                                      filter:
                                        "grayscale(1) opacity(0.62) drop-shadow(0 12px 24px rgba(0,0,0,0.28))",
                                    }}
                                  />
                                </motion.div>

                                <div className="pointer-events-none absolute right-[24%] top-[22px] z-20 flex h-7 w-7 items-center justify-center rounded-full border border-[#FFE08A]/30 bg-[linear-gradient(180deg,rgba(17,24,39,0.95)_0%,rgba(10,15,28,0.95)_100%)] shadow-[0_10px_20px_rgba(0,0,0,0.35)]">
                                  <Lock className="h-3.5 w-3.5 text-[#FFD76A]" />
                                </div>
                              </div>

                              <motion.div
                                initial={false}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                className="mt-2 min-h-[34px] text-center"
                              >
                                <p
                                  className="text-[12px] font-extrabold leading-tight text-[#FFD76A] sm:text-[13px] md:text-[14px]"
                                  style={{
                                    textShadow:
                                      "0 1px 0 rgba(255,255,255,0.08), 0 2px 10px rgba(0,0,0,0.35)",
                                  }}
                                >
                                  Deposit &amp; Play To
                                  <br />
                                  Unlock
                                </p>
                              </motion.div>
                            </motion.div>
                          );
                        }

                        return (
                          <motion.div
                            key={i}
                            className="min-w-0"
                            initial={false}
                            animate={
                              isReached
                                ? {
                                    opacity: 1,
                                    y: 0,
                                    scale: isReached || isCurrent ? [1, 1.04, 1] : 1,
                                    rotate: 0,
                                  }
                                : {
                                    opacity: 0,
                                    y: 14,
                                    scale: 0.92,
                                    rotate: 0,
                                  }
                            }
                            transition={{
                              duration: 0.4,
                              ease: "easeOut",
                            }}
                          >
                            <div
                              className={`relative rounded-[22px] p-[2px] ${
                                isReached
                                  ? "bg-[linear-gradient(135deg,#FFE8A3_0%,#F7C948_25%,#C88A14_60%,#FFE08A_100%)]"
                                  : "bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))]"
                              } shadow-[0_14px_32px_rgba(0,0,0,0.28)]`}
                            >
                              <div className="relative h-[82px] overflow-hidden rounded-[20px] sm:h-[86px] md:h-[92px] lg:h-[92px] xl:h-[98px] 2xl:h-[104px]">
                                <motion.div
                                  className="absolute inset-0"
                                  animate={{
                                    scale: [1, 1.05, 1],
                                    x: [0, -6, 0],
                                    y: [0, -4, 0],
                                  }}
                                  transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                  style={{
                                    backgroundImage: `url(${heroBackground1Img})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                />

                                <div
                                  className={`absolute inset-0 ${
                                    isReached
                                      ? "bg-[linear-gradient(180deg,rgba(8,28,84,0.28)_0%,rgba(6,21,70,0.42)_100%)]"
                                      : "bg-[linear-gradient(180deg,rgba(8,28,84,0.42)_0%,rgba(6,21,70,0.58)_100%)]"
                                  }`}
                                />

                                <div className="pointer-events-none absolute inset-[1px] rounded-[19px] border border-white/10" />
                                <div className="pointer-events-none absolute inset-x-[8%] top-[3px] h-[28px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.14),transparent)] blur-[1px]" />
                                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[36%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.18))]" />
                                <div className="relative z-10 flex h-full flex-col items-center justify-center px-1.5 text-center sm:px-2">
                                  <div className="mb-1 sm:mb-1.5">
                                    <p
                                      className={`font-black uppercase leading-[0.9] tracking-[-0.04em] ${
                                        item.title === "MORE REWARD AWAITS"
                                          ? "text-[14px] sm:text-[18px] md:text-[21px] lg:text-[24px]"
                                          : "text-[16px] sm:text-[20px] md:text-[24px] lg:text-[27px]"
                                      }`}
                                      style={{
                                        color: isReached ? "#fffdf4" : "rgba(255,255,255,0.85)",
                                        textShadow: isReached
                                          ? "0 1px 0 rgba(255,255,255,0.18), 0 8px 18px rgba(0,0,0,0.30)"
                                          : "0 2px 10px rgba(0,0,0,0.28)",
                                      }}
                                    >
                                      {item.title}
                                    </p>
                                  </div>

                                  {item.sub ? (
                                    <p
                                      className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#D9EEFF] sm:text-[11px] md:text-[12px] lg:text-[13px]"
                                      style={{
                                        textShadow: isReached
                                          ? "0 2px 8px rgba(0,0,0,0.22)"
                                          : "none",
                                      }}
                                    >
                                      {item.sub}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="relative h-[56px] overflow-visible rounded-full border border-white/10 bg-[linear-gradient(180deg,#0A225E_0%,#061948_55%,#041232_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-12px_24px_rgba(0,0,0,0.30),0_22px_42px_rgba(0,0,0,0.24)] sm:h-[60px] md:h-[64px]">
                      <div className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02),transparent)]" />

                      <div className="absolute inset-y-[10px] left-1/4 w-[2px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.20),rgba(255,255,255,0.06))]" />
                      <div className="absolute inset-y-[10px] left-2/4 w-[2px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.20),rgba(255,255,255,0.06))]" />
                      <div className="absolute inset-y-[10px] left-3/4 w-[2px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.20),rgba(255,255,255,0.06))]" />

                      <motion.div
                        animate={{ width: `${progressLevel * 25}%` }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-y-0 left-0 overflow-hidden rounded-full bg-[linear-gradient(90deg,#FFF0B8_0%,#FFF8DE_20%,#FFD86A_52%,#F3BA24_100%)] shadow-[0_10px_24px_rgba(255,215,106,0.20),0_0_28px_rgba(255,215,106,0.12)]"
                      >
                        <div className="absolute inset-y-[7px] left-[10px] right-[10px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0.05),transparent)]" />
                        <div className="absolute inset-y-[10px] left-1/4 w-[2px] rounded-full bg-[linear-gradient(180deg,rgba(173,110,0,0.26),rgba(255,255,255,0.18),rgba(173,110,0,0.22))]" />
                        <div className="absolute inset-y-[10px] left-2/4 w-[2px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(173,110,0,0.26),rgba(255,255,255,0.18),rgba(173,110,0,0.22))]" />
                        <div className="absolute inset-y-[10px] left-3/4 w-[2px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(173,110,0,0.26),rgba(255,255,255,0.18),rgba(173,110,0,0.22))]" />

                        <motion.div
                          animate={{ x: ["-120%", "220%"] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-y-0 w-[28%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.42),transparent)] blur-[7px]"
                        />
                      </motion.div>

                      <motion.div
                        animate={{
                          left:
                            progressLevel === 4
                              ? "calc(100% - 76px)"
                              : `calc(${progressLevel * 25}% - 4px)`,
                        }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-1/2 z-10 -translate-y-1/2"
                      >
                        <motion.div
                          animate={{
                            scale: progressLevel === 4 ? [1, 1.1, 1] : [1, 1.03, 1],
                          }}
                          transition={{
                            duration: progressLevel === 4 ? 1.2 : 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="relative flex h-[50px] w-[50px] items-center justify-center rounded-full sm:h-[54px] sm:w-[54px] md:h-[58px] md:w-[58px]"
                        >
                          <div className="absolute inset-[-8px] rounded-full bg-yellow-300/20 blur-lg" />
                          <div className="absolute inset-[-2px] rounded-full border border-[#FFE6A3]/45" />

                          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/26 bg-[linear-gradient(180deg,#FFE27B_0%,#F3BA24_100%)] shadow-[0_12px_24px_rgba(0,0,0,0.30),0_0_0_6px_rgba(255,216,77,0.12)]">
                            <div className="absolute inset-[4px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.30),rgba(255,255,255,0.04))]" />
                            <div className="absolute inset-x-[18%] top-[5px] h-[32%] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.42),transparent)] blur-[1px]" />

                            <span
                              className="relative z-10 text-[16px] font-black text-white sm:text-[18px]"
                              style={{
                                textShadow:
                                  "0 1px 0 rgba(255,255,255,0.22), 0 4px 10px rgba(0,0,0,0.28)",
                              }}
                            >
                              ✦
                            </span>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div
                  className="pointer-events-none absolute left-1/2 z-[9] w-full max-w-6xl -translate-x-1/2 px-3 sm:px-6"
                  style={{ bottom: "12.4%" }}
                >
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
                    {[
                      "Trusted Since 2016",
                      "5,000+ Active Members",
                      "10+ Rewards For You",
                    ].map((text, i) => (
                      <motion.div
                        key={text}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.06 + i * 0.07 }}
                        className="group relative overflow-hidden rounded-[20px] sm:rounded-[26px]"
                      >
                        <div className="absolute inset-0 rounded-[20px] bg-[linear-gradient(135deg,rgba(130,205,255,0.28)_0%,rgba(80,150,255,0.16)_22%,rgba(255,220,120,0.18)_52%,rgba(35,115,255,0.14)_78%,rgba(140,225,255,0.18)_100%)] p-[1.5px] shadow-[0_16px_34px_rgba(0,0,0,0.22),0_0_18px_rgba(71,190,255,0.10)] sm:rounded-[26px]">
                          <div className="h-full w-full rounded-[19px] bg-[linear-gradient(180deg,rgba(46,92,215,0.95)_0%,rgba(33,67,180,0.97)_32%,rgba(25,43,141,0.98)_72%,rgba(18,29,110,0.99)_100%)] sm:rounded-[25px]" />
                        </div>

                        <motion.div
                          className="absolute inset-[1px] rounded-[19px] sm:rounded-[25px]"
                          animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          }}
                          transition={{
                            duration: 9,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{
                            backgroundImage: `
                              linear-gradient(135deg,
                                rgba(255,255,255,0.11) 0%,
                                rgba(255,255,255,0.03) 18%,
                                rgba(90,190,255,0.08) 32%,
                                rgba(255,255,255,0.02) 46%,
                                rgba(255,215,106,0.08) 62%,
                                rgba(255,255,255,0.03) 78%,
                                rgba(255,255,255,0.10) 100%
                              )
                            `,
                            backgroundSize: "220% 220%",
                            mixBlendMode: "screen",
                          }}
                        />

                        <div className="pointer-events-none absolute inset-x-[10%] top-[3px] h-[40%] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.06),transparent)] blur-[1px]" />
                        <div className="pointer-events-none absolute -left-4 top-1/2 h-14 w-8 -translate-y-1/2 rounded-full bg-cyan-200/12 blur-[14px]" />
                        <div className="pointer-events-none absolute -right-4 top-1/2 h-14 w-8 -translate-y-1/2 rounded-full bg-blue-200/10 blur-[14px]" />
                        <div className="pointer-events-none absolute inset-x-[6%] bottom-[4px] h-[34%] rounded-b-[18px] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.22))]" />
                        <div className="pointer-events-none absolute inset-[1px] rounded-[19px] border border-white/10 sm:rounded-[25px]" />

                        <div className="relative z-10 flex min-h-[58px] items-center justify-center px-3 py-3.5 text-center sm:min-h-[78px] sm:px-5 sm:py-5">
                          <p
                            className={`font-bold leading-[1.04] tracking-[-0.02em] text-white ${
                              i === 2
                                ? "text-[10px] sm:text-[15px] md:text-[19px] lg:text-[21px]"
                                : "text-[12px] sm:text-[16px] md:text-[21px] lg:text-[23px]"
                            }`}
                            style={{
                              textShadow:
                                "0 1px 0 rgba(255,255,255,0.10), 0 3px 8px rgba(0,0,0,0.22)",
                            }}
                          >
                            {i === 0 && (
                              <>
                                Trusted Since
                                <br />
                                2016
                              </>
                            )}
                            {i === 1 && (
                              <>
                                5,000+ Active
                                <br />
                                Members
                              </>
                            )}
                            {i === 2 && (
                              <>
                                10+ Rewards
                                <br />
                                To Unlock
                              </>
                            )}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <HeroCTA />
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-6xl" />

          <SectionSeam
            className="bottom-[-1px]"
            fillColor="#1E4FA3"
            shape="dip"
          />
        </section>


        <section
          id="steps-to-claim"
          className="relative z-10 -mt-2 overflow-hidden px-4 pt-16 pb-32 sm:px-6 sm:pt-20 sm:pb-36 md:pt-24 md:pb-40"
          style={{
            background:
              "linear-gradient(180deg, #1E4FA3 0%, #1B4DAE 38%, #1650B6 72%, #144FB9 100%)",
          }}
        >
          <SectionSeam
            className="top-[-1px]"
            fillColor="#1E4FA3" 
            shape="dome"
          />

          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[120px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(30,79,163,0.96) 0%, rgba(27,77,174,0.78) 60%, rgba(27,77,174,0) 100%)",
            }}
          />

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[180px] z-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(20,79,185,0) 0%, rgba(20,79,185,0.92) 100%)",
            }}
          />

          <div className="pointer-events-none absolute inset-0 z-[1]">
            <div className="absolute left-[18%] top-[16%] h-72 w-72 rounded-full bg-white/5 blur-[100px]" />
            <div className="absolute right-[14%] bottom-[18%] h-72 w-72 rounded-full bg-cyan-300/10 blur-[110px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl mt-8 sm:mt-12">
            <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(58,128,255,0.26)_0%,rgba(41,101,220,0.24)_38%,rgba(31,78,182,0.26)_100%)] px-4 pt-8 pb-12 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_16px_44px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-[26px] sm:px-6 sm:pt-10 sm:pb-14 md:px-8 md:pt-12 md:pb-16">
              <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-cyan-200/20" />
              <div className="pointer-events-none absolute inset-x-[8%] top-[2px] h-[46px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03),transparent)] blur-[1px]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.10))]" />

              <div className="relative z-10">
                <div className="mb-6 text-center sm:mb-8">
         <h2
  className="text-white font-black tracking-[-0.03em] text-[28px] sm:text-[32px] md:text-[36px]"
  style={{
    textShadow: "0 2px 12px rgba(0,0,0,0.28)",
  }}
>
  Steps to Claim
</h2>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-8">
                 {stepData.map((item, i) => (
  <motion.div
    key={item.title}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: i * 0.12 }}
    className="flex flex-col items-center text-center"
  >
    <div className="mb-3 flex h-[76px] w-[76px] items-center justify-center sm:h-[96px] sm:w-[96px] md:h-[116px] md:w-[116px]">
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.24)]"
      />
    </div>

    <h3
      className="text-[18px] font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-[24px] md:text-[28px]"
      style={{
        textShadow: "0 2px 8px rgba(0,0,0,0.25)",
      }}
    >
      {item.title}
    </h3>

    <p
      className="mt-2 h-auto min-h-[44px] max-w-[150px] text-[12px] font-semibold leading-[1.25] text-white/95 sm:max-w-[190px] sm:text-[14px] md:max-w-[220px] md:text-[16px]"
      style={{
        textShadow: "0 1px 4px rgba(0,0,0,0.18)",
      }}
    >
      {item.desc}
    </p>
  </motion.div>
))}
                </div>
              </div>
            </div>
          </div>

          <SectionSeam
            className="bottom-[-1px]"
            fillColor="#144FB9" 
            shape="dome"
          />
        </section>

        <RegistrationForm />
        <FloatingGirl />
      </main>
    </div>
  );
}
