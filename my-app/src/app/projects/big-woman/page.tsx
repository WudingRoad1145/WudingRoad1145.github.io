import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function BigWomanPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-start px-24 py-16">
      {/* Navigation Bar */}
      <nav className="fixed top-8 right-8 flex gap-6">
        <Link href="/" className="text-black hover:underline uppercase">
          About
        </Link>
        <Link href="/projects" className="text-black hover:underline uppercase">
          Projects
        </Link>
        <Link href="/adventures" className="text-black hover:underline uppercase">
          Adventures
        </Link>
        <Link href="/humans" className="text-black hover:underline uppercase">
          Humans
        </Link>
      </nav>

      {/* Content Grid */}
      <div className="max-w-6xl w-full grid grid-cols-12 gap-10 rtl mt-16">
        {/* Title Section */}
        <h1 className="col-span-12 text-4xl font-bold text-left mb-6">
          Big Woman
        </h1>

        {/* Date and Try Here */}
        <div className="col-span-12 text-left mb-10">
          <p>
            <strong>Time:</strong> Lifelong
          </p>
          <p>
            <strong>Try Here:</strong>{" "}
            <span className="underline">
              Anytime, anywhere—you got this!
            </span>
          </p>
        </div>

        {/* Content Section */}
        <div className="col-span-12 text-lg text-left space-y-6">
          <p>
            Aesthetics are learned. This might seem obvious when discussing art,
            but it’s less apparent when we think about our own bodies.
          </p>
          <blockquote className="italic">
            “Your biceps scared me.”
          </blockquote>
          <p>
            Growing up in China, where slimness—often bordering on frailty—is
            considered the pinnacle of beauty for women, I was often labeled
            “boyish” or “壮.” In Chinese, “壮” means strong but in an unflattering
            way—chubby, muscular, and unrefined for a girl. While these remarks
            from friends and family were meant as harmless jokes, I internalized
            them and spent years wanting to change how my body looked.
          </p>
          <p>
            Fortunately, I never succeeded.
          </p>
          <p>
            Over time, I came to appreciate my body for what it could do, not
            just how it looked. I learned that starting around age 30, women lose
            3-5% of muscle mass per decade. This muscle loss contributes to the
            challenges many women face as they age—weakness, joint pain, and the
            inability to perform everyday tasks. My slim, delicate mother often
            suffers from such issues, and I realized the root cause wasn’t weight
            but a lack of strength.
          </p>
          <p>
            During my gap year, I began subtly introducing strength training to
            her life. Together, we discovered the freedom and confidence that
            comes with building strength.
          </p>
          <p>
            Today, I embrace my body.
          </p>
          <ul className="list-disc list-inside space-y-4">
            <li>
              I appreciate my biceps for helping me rain shots on the court.
            </li>
            <li>
              I appreciate my lats for powering me through the butterfly stroke
              in the pool.
            </li>
            <li>
              I appreciate my quads for propelling me across trails and finish
              lines.
            </li>
            <li>
              I appreciate my core for grounding me in everything I do, both
              physically and mentally.
            </li>
          </ul>
          <p>
            To me, strength is beauty, and I want to redefine femininity for
            myself and others. Strong women are capable, resilient, and free. I
            aspire to be one and to inspire others to experience the joy of
            strength.
          </p>
          <p>
            I’m now diving deeper into anatomy and kinesiology to support a long,
            healthy, and athletic life. If this resonates with you, I’ll be
            sharing my learnings and notes here. Let’s celebrate the power of
            strength together.
          </p>
        </div>
         {/* Image Section */}
         <div className="col-span-12 flex justify-center mb-10">
          <Image
            src="/images/big.jpg" // Replace with actual path
            alt="Me flexing"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>

      </div>
    </div>
  );
}
