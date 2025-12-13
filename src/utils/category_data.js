import ImageIcon from "@/icons/image.svg";
import PdfIcon from "@/icons/pdf.svg";
import VideoIcon from "@/icons/video.svg";
import MusicIcon from "@/icons/music.svg";
import BirthdayIcon from "@/icons/birthday.svg";
import FunIcon from "@/icons/fun.svg";

/* =====================================================
   LANDING – ASTRA SANGRAH
===================================================== */

export const landing_tools = {
  title: "Astra Sangrah",
  intro:
    "A curated collection of powerful digital astras — crafted to solve everyday problems with speed, simplicity, and precision.",

  tools: [
    {
      title: "Image Tools",
      description: "Edit, convert, compress, and enhance images online.",
      Icon: ImageIcon,
      href: "/tools/image",
    },
    {
      title: "PDF Tools",
      description: "Merge, split, compress, and convert PDF files.",
      Icon: PdfIcon,
      href: "/tools/pdf",
    },
    {
      title: "Video Tools",
      description: "Compress, trim, convert, and edit videos easily.",
      Icon: VideoIcon,
      href: "/tools/video",
    },
    {
      title: "Music Tools",
      description: "Edit, convert, and enhance audio files.",
      Icon: MusicIcon,
      href: "/tools/music",
    },
    {
      title: "Janmāstra 🎉",
      description: "Celebrate birthdays with joyful and creative tools.",
      Icon: BirthdayIcon,
      href: "/tools/birthday",
    },
    {
      title: "Fun Tools",
      description: "Lighthearted generators, games, and random utilities.",
      Icon: FunIcon,
      href: "/tools/fun",
    },
  ],
};

/* =====================================================
   IMAGE — CHITRĀSTRA
===================================================== */

export const image_tools = {
  title: "Chitrāstra 🖼️",
  intro:
    "Chitrāstra is a visual astra sangrah — designed to refine, enhance, and transform images with precision and ease.",

  tools: [
    {
      title: "Remove Background",
      description: "Automatically remove image backgrounds in one click.",
      Icon: ImageIcon,
      href: "/tools/image/remove-background",
    },
    {
      title: "Image Upscaler",
      description: "Increase image resolution without losing quality.",
      Icon: ImageIcon,
      href: "/tools/image/upscale",
    },
    {
      title: "Magic Eraser",
      description: "Remove unwanted objects or distractions from images.",
      Icon: ImageIcon,
      href: "/tools/image/magic-eraser",
    },
    {
      title: "Image Converter",
      description: "Convert images between JPG, PNG, WEBP, and more.",
      Icon: ImageIcon,
      href: "/tools/image/convert",
    },
    {
      title: "Compress Image",
      description: "Reduce image size while preserving clarity.",
      Icon: ImageIcon,
      href: "/tools/image/compress",
    },
  ],
};

/* =====================================================
   PDF — GRANTHĀSTRA
===================================================== */

export const pdf_tools = {
  title: "Granthāstra 📄",
  intro:
    "Granthāstra empowers you to shape, refine, and manage documents with ease — from merging to precision compression.",

  tools: [
    {
      title: "Merge PDF",
      description: "Combine multiple PDFs into one document.",
      Icon: PdfIcon,
      href: "/tools/pdf/merge",
    },
    {
      title: "Split PDF",
      description: "Split a PDF into pages or sections.",
      Icon: PdfIcon,
      href: "/tools/pdf/split",
    },
    {
      title: "Compress PDF",
      description: "Reduce PDF size without visible quality loss.",
      Icon: PdfIcon,
      href: "/tools/pdf/compress",
    },
    {
      title: "PDF to Image",
      description: "Convert PDF pages into image files.",
      Icon: PdfIcon,
      href: "/tools/pdf/to-image",
    },
    {
      title: "Image to PDF",
      description: "Create PDFs from image files.",
      Icon: PdfIcon,
      href: "/tools/pdf/from-image",
    },
  ],
};

/* =====================================================
   VIDEO — DRISHYĀSTRA
===================================================== */

export const video_tools = {
  title: "Drishyāstra 🎬",
  intro:
    "Drishyāstra brings control and clarity to video — trim, convert, and optimize visuals with powerful digital tools.",

  tools: [
    {
      title: "Video Compressor",
      description: "Reduce video size for faster sharing.",
      Icon: VideoIcon,
      href: "/tools/video/compress",
    },
    {
      title: "Video Trimmer",
      description: "Cut video clips with frame-level precision.",
      Icon: VideoIcon,
      href: "/tools/video/trim",
    },
    {
      title: "Video to GIF",
      description: "Turn video moments into animated GIFs.",
      Icon: VideoIcon,
      href: "/tools/video/to-gif",
    },
    {
      title: "Mute Video",
      description: "Remove audio tracks from videos.",
      Icon: VideoIcon,
      href: "/tools/video/mute",
    },
    {
      title: "Video Converter",
      description: "Convert videos between popular formats.",
      Icon: VideoIcon,
      href: "/tools/video/convert",
    },
  ],
};

/* =====================================================
   MUSIC — NĀDĀSTRA
===================================================== */

export const music_tools = {
  title: "Nādastra 🎵",
  intro:
    "Nādastra is a sound-focused astra — crafted to refine, transform, and enhance audio effortlessly.",

  tools: [
    {
      title: "Audio Converter",
      description: "Convert audio between MP3, WAV, and more.",
      Icon: MusicIcon,
      href: "/tools/music/convert",
    },
    {
      title: "Audio Trimmer",
      description: "Trim audio clips with precision.",
      Icon: MusicIcon,
      href: "/tools/music/trim",
    },
    {
      title: "Volume Booster",
      description: "Increase audio loudness without distortion.",
      Icon: MusicIcon,
      href: "/tools/music/boost",
    },
    {
      title: "Audio Compressor",
      description: "Compress audio while preserving quality.",
      Icon: MusicIcon,
      href: "/tools/music/compress",
    },
    {
      title: "Extract Audio",
      description: "Extract soundtracks from video files.",
      Icon: MusicIcon,
      href: "/tools/music/extract",
    },
  ],
};

/* =====================================================
   BIRTHDAY — JANMĀSTRA
===================================================== */

export const birthday_tools = {
  title: "Janmāstra 🎉",
  intro:
    "Janmāstra is a joyful astra sangrah — designed to celebrate birthdays with creativity, fun, and unforgettable moments.",

  tools: [
    {
      title: "Birthday Wish with Fun 😁",
      description: "Generate cheerful and personalized birthday wishes.",
      Icon: BirthdayIcon,
      href: "/tools/birthday/fun",
    },
    {
      title: "Birthday Card Generator",
      description: "Create beautiful custom birthday cards.",
      Icon: BirthdayIcon,
      href: "/tools/birthday/card",
    },
    {
      title: "Birthday Countdown",
      description: "Track days remaining until a birthday.",
      Icon: BirthdayIcon,
      href: "/tools/birthday/countdown",
    },
    {
      title: "Name on Cake",
      description: "Design virtual cakes with custom names.",
      Icon: BirthdayIcon,
      href: "/tools/birthday/cake-name",
    },
    {
      title: "Age Calculator",
      description: "Calculate age accurately from birth date.",
      Icon: BirthdayIcon,
      href: "/tools/birthday/age-calculator",
    },
  ],
};

/* =====================================================
   FUN — KAUTUKĀSTRA
===================================================== */

export const fun_tools = {
  title: "Kautukāstra 🎲",
  intro:
    "Kautukāstra is a playful astra collection — built for fun, randomness, and lighthearted moments.",

  tools: [
    {
      title: "Meme Generator",
      description: "Create and customize memes instantly.",
      Icon: FunIcon,
      href: "/tools/fun/meme-generator",
    },
    {
      title: "Random Quote",
      description: "Get motivational or fun quotes instantly.",
      Icon: FunIcon,
      href: "/tools/fun/quotes",
    },
    {
      title: "Spin the Wheel",
      description: "Spin a wheel to make random choices.",
      Icon: FunIcon,
      href: "/tools/fun/spin-wheel",
    },
    {
      title: "Random Name Picker",
      description: "Pick random names from a list.",
      Icon: FunIcon,
      href: "/tools/fun/name-picker",
    },
    {
      title: "Dice Roller",
      description: "Roll virtual dice for games or decisions.",
      Icon: FunIcon,
      href: "/tools/fun/dice",
    },
  ],
};
