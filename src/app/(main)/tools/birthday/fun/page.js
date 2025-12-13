import Cake from "@/components/Birthday/Cake";

export default function BirthdayPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>🎉 Happy Birthday! 🎂</h1>
      <p>Blow into your microphone to extinguish the candles!</p>

      <Cake />
    </div>
  );
}
