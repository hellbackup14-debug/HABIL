import React, { useState, useEffect } from "react";


import SlideDeck from "@/components/SlideDeck";
import CarouselPanel from "@/components/CarouselPanel";
import WelcomeGate from "@/components/WelcomeGate";
import GiftButtonWithFullscreen from "./GiftButtonWithFullscreen";

function GiftFadeIn({ show, onShow }: { show: boolean; onShow: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
      onShow();
    }, 1200);
    return () => clearTimeout(timeout);
  }, []);

  const [showIframe, setShowIframe] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const handleClickMe = () => {
    setShowIframe(true);
    setTimeout(() => {
      const iframe = iframeRef.current;
      if (iframe && typeof iframe.requestFullscreen === 'function') {
        iframe.requestFullscreen();
      }
      onShow();
    }, 100);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] py-8">
      {visible && !showIframe && (
        <>
          <button
            className="rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-12 py-4 text-xl font-bold text-white shadow-2xl hover:scale-105 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-fuchsia-300/40 drop-shadow-lg"
            style={{ letterSpacing: '0.04em', boxShadow: '0 8px 32px 0 rgba(80,0,120,0.18)' }}
            onClick={handleClickMe}
          >
            <span className="inline-block align-middle mr-2 text-2xl">🎬</span>Klik ini yaa
          </button>
          <span className="inline-block align-middle mr-2 text-2xl"></span>
        </>
      )}
      {visible && showIframe && (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, width: '100%', maxWidth: 700 }} className="mx-auto mt-6 rounded-2xl overflow-hidden shadow-2xl border border-purple-400/20 bg-black/80">
          <iframe
            ref={iframeRef}
            id="js_video_iframe"
            src="https://jumpshare.com/embed/J2b6vPWJuq8frTjhCUK8"
            frameBorder="0"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: '1rem' }}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = opened ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [opened]);

  // Jumlah panel sebelum gift: 3, gift: 4, video: 5
  const handleGiftOpen = () => {
    setShowGift(true);
    setSlideIndex(4); // langsung ke panel video surprise (index ke-4, 0-based)
  };

  return (
    <>
      {/* Cinematic overlay for transition */}
      {showOverlay && (
        <div className="fixed inset-0 z-[200] bg-gradient-to-b from-black/95 via-black/80 to-black/95 animate-fadeout-up" style={{animationDuration:'1.1s'}} />
      )}
      {!opened && <WelcomeGate onStart={() => {
        setShowOverlay(true);
        setTimeout(() => {
          setOpened(true);
          setTimeout(() => setShowOverlay(false), 1100);
        }, 100);
      }} />}
      {opened && (
        <SlideDeck duration={950} initialIndex={slideIndex}>
          <CarouselPanel
            title="Hai, Muthia."
            subtitle="Beberapa kata dari hatiku."
            note="Geser perlahan, cerita ini untukmu."
          />
          <CarouselPanel
            title="Terima kasih."
            subtitle="Untuk kesabaranmu, kehangatanmu, dan caramu mencintai dengan lembut."
          />
          <CarouselPanel
            title="Harapanku untukmu."
            subtitle="Pagi yang lembut. Hari yang berani. Malam yang damai."
          />
          {/* Celebration scene before the video surprise */}
          <CarouselPanel
            title="Sedikit Hadiah Untukmu"
            subtitle="Sebelum kejutanmu, ini hadiah kecil."
            note="Klik hadiah untuk melanjutkan."
          >
            <GiftButtonWithFullscreen onOpen={handleGiftOpen} />
          </CarouselPanel>
          {/* Video surprise scene, only show after gift is opened */}
          {showGift && (
            <CarouselPanel
              title="Dan sekarang..."
              subtitle="Satu kejutan kecil untuk hari spesialmu."
              note="Klik tombol untuk melihat hadiah kecil."
            >
              <GiftFadeIn show={showGift} onShow={() => setShowGift(true)} />
            </CarouselPanel>
          )}
        </SlideDeck>
      )}
    </>
  );
}
