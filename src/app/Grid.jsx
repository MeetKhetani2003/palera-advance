"use client";

const images = [
  "/Demo Post/Homeo1.jpg",
  "/Demo Post/Homeo2.jpg",
  "/Demo Post/Homeo3.jpg",
  "/Demo Post/Homeo4.jpg",
  "/Demo Post/Homeo5.jpg",

  "/Demo Post/Ayurved1.jpg",
  "/Demo Post/Ayurved2.jpg",
  "/Demo Post/Ayurved3.jpg",
  "/Demo Post/Ayurved4.jpg",
  "/Demo Post/Ayurved5.jpg",

  "/Demo Post/Cardio1.jpg",
  "/Demo Post/Cardio2.jpg",
  "/Demo Post/Cardio3.jpg",
  "/Demo Post/Cardio4.jpg",
  "/Demo Post/Cardio5.jpg",

  "/Demo Post/Cancer1.jpg",
  "/Demo Post/Cancer2.jpg",
  "/Demo Post/Cancer3.jpg",
  "/Demo Post/Cancer4.jpg",
  "/Demo Post/Cancer5.jpg",

  "/Demo Post/Children1.jpg",
  "/Demo Post/Children2.jpg",
  "/Demo Post/Children3.jpg",
  "/Demo Post/Children4.jpg",
  "/Demo Post/Children5.jpg",

  "/Demo Post/Dentist1.jpg",
  "/Demo Post/Dentist2.jpg",
  "/Demo Post/Dentist3.jpg",
  "/Demo Post/Dentist4.jpg",
  "/Demo Post/Dentist5.jpg",

  "/Demo Post/Diet1.jpg",
  "/Demo Post/Diet2.jpg",
  "/Demo Post/Diet3.jpg",
  "/Demo Post/Diet4.jpg",
  "/Demo Post/Diet5.jpg",

  "/Demo Post/Eye1.jpg",
  "/Demo Post/Eye2.jpg",
  "/Demo Post/Eye3.jpg",
  "/Demo Post/Eye4.jpg",
  "/Demo Post/Eye5.jpg",
];
const images2 = [
  "/Demo Post/Gynec1.jpg",
  "/Demo Post/Gynec2.jpg",
  "/Demo Post/Gynec3.jpg",
  "/Demo Post/Gynec4.jpg",
  "/Demo Post/Gynec5.jpg",

  "/Demo Post/Neuro1.jpg",
  "/Demo Post/Neuro2.jpg",
  "/Demo Post/Neuro3.jpg",
  "/Demo Post/Neuro4.jpg",
  "/Demo Post/Neuro5.jpg",

  "/Demo Post/Ortho1.jpg",
  "/Demo Post/Ortho2.jpg",
  "/Demo Post/Ortho3.jpg",
  "/Demo Post/Ortho4.jpg",
  "/Demo Post/Ortho5.jpg",

  "/Demo Post/Patho1.jpg",
  "/Demo Post/Patho2.jpg",
  "/Demo Post/Patho3.jpg",
  "/Demo Post/Patho4.jpg",
  "/Demo Post/Patho5.jpg",

  "/Demo Post/Physician1.jpg",
  "/Demo Post/Physician2.jpg",
  "/Demo Post/Physician3.jpg",
  "/Demo Post/Physician4.jpg",
  "/Demo Post/Physician5.jpg",

  "/Demo Post/Physiotherapist1.jpg",
  "/Demo Post/Physiotherapist2.jpg",
  "/Demo Post/Physiotherapist3.jpg",
  "/Demo Post/Physiotherapist4.jpg",
  "/Demo Post/Physiotherapist5.jpg",

  "/Demo Post/Radiologist1.jpg",
  "/Demo Post/Radiologist2.jpg",
  "/Demo Post/Radiologist3.jpg",
  "/Demo Post/Radiologist4.jpg",
  "/Demo Post/Radiologist5.jpg",

  "/Demo Post/Skin1.jpg",
  "/Demo Post/Skin2.jpg",
  "/Demo Post/Skin3.jpg",
  "/Demo Post/Skin4.jpg",
  "/Demo Post/Skin5.jpg",

  "/Demo Post/Spine1.jpg",
  "/Demo Post/Spine2.jpg",
  "/Demo Post/Spine3.jpg",
  "/Demo Post/Spine4.jpg",
  "/Demo Post/Spine5.jpg",
];
const videos = [
  "/Demo Doctor Video/Ayurved1.mp4",
  "/Demo Doctor Video/Ayurved2.mp4",
  "/Demo Doctor Video/Cancer1.mp4",
  "/Demo Doctor Video/Cancer2.mp4",
  "/Demo Doctor Video/Cardio1.mp4",
  "/Demo Doctor Video/Cardio2.mp4",
  "/Demo Doctor Video/Children1.mp4",
  "/Demo Doctor Video/Children2.mp4",
  "/Demo Doctor Video/Dentist1.mp4",
  "/Demo Doctor Video/Dentist2.mp4",
  "/Demo Doctor Video/Eye.mp4",
  "/Demo Doctor Video/Gynec1.mp4",
  "/Demo Doctor Video/Gynec2.mp4",
  "/Demo Doctor Video/Homeo1.mp4",
  "/Demo Doctor Video/Homeo2.mp4",
  "/Demo Doctor Video/Ortho1.mp4",
  "/Demo Doctor Video/Pathology1.mp4",
  "/Demo Doctor Video/Physician1.mp4",
  "/Demo Doctor Video/Physician2.mp4",
  "/Demo Doctor Video/Physio1.mp4",
  "/Demo Doctor Video/Physio2.mp4",
  "/Demo Doctor Video/Skin1.mp4",
  "/Demo Doctor Video/Skin2.mp4",
  "/Demo Doctor Video/Spine1.mp4",
  "/Demo Doctor Video/Spine2.mp4",
];

/* 🔁 Marquee wrapper */
function Marquee({ children, reverse = false }) {
  return (
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          animation: `${reverse ? "marqueeReverse" : "marquee"} 120s linear infinite`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

export default function FeaturesMarquee() {
  return (
    <section id="features" className="py-11">
      <div>
        {/* HEADER */}

        {/* 🔥 MARQUEE ROWS */}
        <div
          style={{
            marginTop: 24,
            marginBottom: 24,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Row 1 - Images */}
          <Marquee>
            {images.map((src, i) => (
              <div
                key={i}
                style={{
                  minWidth: 120,
                  height: 120,
                  overflow: "hidden",
                  background: "#eee",
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </Marquee>

          {/* Row 2 - Videos */}
          <Marquee reverse>
            {videos.map((src, i) => (
              <div
                key={i}
                style={{
                  minWidth: 120,
                  height: 213.33,
                  overflow: "hidden",
                  background: "#000",
                }}
              >
                <video
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </Marquee>

          {/* Row 3 - Images */}
          <Marquee>
            {images2.map((src, i) => (
              <div
                key={i}
                style={{
                  minWidth: 120,
                  height: 120,

                  overflow: "hidden",
                  background: "#eee",
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      {/* 🎬 ANIMATIONS */}
      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeReverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
