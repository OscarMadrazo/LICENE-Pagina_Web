export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/526631096525"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        items-center
        gap-3
        rounded-full
        bg-green-500
        px-6
        py-4
        font-bold
        text-white
        shadow-2xl
        transition
        hover:scale-105
        hover:bg-green-600
      "
    >
      💬 WhatsApp
    </a>
  );
}