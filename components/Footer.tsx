export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 py-10">
      <div className="max-w-6xl mx-auto px-6 flex justify-between text-sm text-neutral-400">
        <div>© {new Date().getFullYear()} XDays</div>

        <div className="flex gap-6">
          <a href="#">Twitter</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}
